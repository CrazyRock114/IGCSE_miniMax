import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReflexArcExtra, AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { BIOLOGY_TOUR, REFLEX_ARC } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'
import { createBiologyTour, type BiologyTourController } from '@/lib/driverTour'
import { REFLEX_ARC_TOUR } from '@/content/biologyToursData'

/**
 * A reflex arc, on G8 Figure B9.04 — the hand-on-a-hot-plate diagram.
 *
 * Same pattern as `AirwayPathway`: base image with an SVG overlay of clickable
 * hotspots, side panel describing the selected part, and a "follow the
 * impulse" mode that animates a dot along the reflex arc in the order the
 * impulse actually travels.
 *
 * The point of the extra is the order, not the parts: receptor → sensory
 * neurone → relay neurone (in the spinal cord) → motor neurone → effector.
 * The brain is *not* on the path, and the part-by-part panel reinforces that.
 *
 * Coordinates: figure-b9-04 is 1040 × 502 px. Overlay SVG uses the same
 * viewBox so hotspot positions are in image-pixel space and scale with the
 * figure.
 */
const IMG_W = 1040
const IMG_H = 502

type Hotspot = { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

const HOTSPOTS: Record<string, Hotspot> = {
  // The hand is on the left; the hot plate is at the bottom. The receptor is
  // the small spot in the palm of the hand where the heat is felt first.
  'pain-receptor': { type: 'circle', x: 155, y: 315, r: 28 },
  // The sensory neurone runs from the receptor up the arm to the spinal cord
  // — the long lower blue line in the figure.
  'sensory-neurone': { type: 'ellipse', x: 570, y: 380, rx: 200, ry: 22 },
  // The effector is the bicep muscle in the upper arm — the dark red shape.
  effector: { type: 'ellipse', x: 440, y: 205, rx: 70, ry: 35 },
  // The motor neurone runs from the spinal cord back down to the muscle.
  'motor-neurone': { type: 'ellipse', x: 580, y: 220, rx: 200, ry: 22 },
  // The relay neurone is inside the spinal cord (the small connecting loop).
  'relay-neurone': { type: 'ellipse', x: 815, y: 175, rx: 50, ry: 30 },
  // The spinal cord is the H-shaped structure on the right.
  'spinal-cord': { type: 'ellipse', x: 925, y: 210, rx: 90, ry: 80 },
}

export function ReflexArc({ extra }: { extra: ReflexArcExtra }) {
  const parts = extra.parts
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mode, setMode] = useState<'explore' | 'follow'>('explore')
  const [followStep, setFollowStep] = useState(0)
  const tourRef = useRef<BiologyTourController | null>(null)

  useEffect(() => {
    return () => {
      tourRef.current?.destroy()
    }
  }, [])

  const orderedForFollow = useMemo(
    () => parts.filter((p) => typeof p.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [parts]
  )

  const selected = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  )

  const startDriverTour = (autoPlay: boolean) => {
    tourRef.current?.destroy()
    setMode('follow')
    tourRef.current = createBiologyTour(REFLEX_ARC_TOUR, {
      autoPlay,
      autoPlayIntervalMs: 3800,
      onStepChange: (stepId, index) => {
        setSelectedId(stepId)
        setFollowStep(index)
      },
      onDestroy: () => {
        setMode('explore')
      },
    })
    tourRef.current.drive(0)
  }

  const stopFollow = () => {
    tourRef.current?.destroy()
    setMode('explore')
    setSelectedId(null)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <ModeButton active={mode === 'explore'} onClick={stopFollow}>
              <T value={REFLEX_ARC.modeExplore} />
            </ModeButton>
            <button
              type="button"
              onClick={() => startDriverTour(false)}
              className="flex items-center gap-1 rounded-md border border-teal-500 bg-surface px-2.5 py-1 text-xs font-medium text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-95"
            >
              <span>▶</span>
              <T value={BIOLOGY_TOUR.reflexArcBtn} />
            </button>
            <button
              type="button"
              onClick={() => startDriverTour(true)}
              className="flex items-center gap-1 rounded-md bg-teal-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-teal-700 active:scale-95"
            >
              <span>⚡</span>
              <T value={BIOLOGY_TOUR.btnAutoPlay} />
            </button>
          </div>
          {mode === 'follow' && (
            <span className="text-xs text-muted">
              <T value={REFLEX_ARC.followPrompt} />
            </span>
          )}
        </div>

        <FigureWithHotspots
          parts={parts}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={(id) => {
            setMode('explore')
            setSelectedId(id)
          }}
          onHover={setHoveredId}
          followStep={followStep}
          orderedForFollow={orderedForFollow}
        />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <PartPanel part={selected} />
        ) : (
          <EmptyHint mode={mode} />
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
        (active
          ? 'bg-ink text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      {children}
    </button>
  )
}

function PartPanel({ part }: { part: AnatomyOrgan }) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={part.name} />
      </h3>
      <p className="leading-relaxed text-ink-soft">
        <T value={part.description} />
      </p>
    </div>
  )
}

function EmptyHint({ mode }: { mode: 'explore' | 'follow' }) {
  return (
    <p className="text-muted">
      <T value={mode === 'follow' ? REFLEX_ARC.emptyFollow : REFLEX_ARC.emptyExplore} />
    </p>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithHotspots({
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
}) {
  const followTarget = orderedForFollow[Math.min(followStep, Math.max(0, orderedForFollow.length - 1))]
  const followHotspot = followTarget ? HOTSPOTS[followTarget.id] : null

  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <img
        src={assetUrl('/figures/g8/14-1-nervous-system/figure-b9-04.png')}
        alt="A reflex arc: a hand touching a hot plate, with sensory and motor neurones connecting through the spinal cord"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.50, Figure B9.04 · click a part to read about it
      </figcaption>

      <svg
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {parts.map((p) => {
          const h = HOTSPOTS[p.id]
          if (!h) return null
          const isSelected = selectedId === p.id
          const isHovered = hoveredId === p.id
          return (
            <HotspotShape
              key={p.id}
              id={p.id}
              h={h}
              isSelected={isSelected}
              isHovered={isHovered}
              label={p.name.en}
              onSelect={() => onSelect(p.id)}
              onHover={(v) => onHover(v ? p.id : null)}
            />
          )
        })}

        {followHotspot && <FollowDot hotspot={followHotspot} />}
      </svg>
    </figure>
  )
}

function HotspotShape({
  id,
  h,
  isSelected,
  isHovered,
  label,
  onSelect,
  onHover,
}: {
  id: string
  h: Hotspot
  isSelected: boolean
  isHovered: boolean
  label: string
  onSelect: () => void
  onHover: (v: boolean) => void
}) {
  const showRing = isSelected || isHovered
  const ringStroke = isSelected ? '#0d9488' : '#0f172a'
  const ringFill = isSelected ? 'rgba(13,148,136,0.18)' : 'rgba(15,23,42,0.06)'
  const labelBg = isSelected ? '#0d9488' : '#0f172a'

  return (
    <g
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      data-reflex-hotspot={id}
      data-part={id}
    >
      {h.type === 'circle' ? (
        <circle
          cx={h.x}
          cy={h.y}
          r={showRing ? h.r : Math.max(h.r - 4, 6)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      ) : (
        <ellipse
          cx={h.x}
          cy={h.y}
          rx={showRing ? h.rx : Math.max(h.rx - 3, 10)}
          ry={showRing ? h.ry : Math.max(h.ry - 3, 10)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      )}

      {(isSelected || isHovered) && (
        <g style={{ pointerEvents: 'none' }}>
          <LabelTag hotspot={h} label={label} labelBg={labelBg} />
        </g>
      )}
    </g>
  )
}

function FollowDot({ hotspot }: { hotspot: Hotspot }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={hotspot.x} cy={hotspot.y} r="11" fill="#0284c7" stroke="#0c4a6e" strokeWidth="2">
        <animate attributeName="r" values="11;15;11" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={hotspot.x} cy={hotspot.y} r="4" fill="white" />
    </g>
  )
}

function LabelTag({
  hotspot,
  label,
  labelBg,
}: {
  hotspot: Hotspot
  label: string
  labelBg: string
}) {
  const top = hotspot.type === 'circle' ? hotspot.y - hotspot.r : hotspot.y - hotspot.ry
  return (
    <>
      <rect x={hotspot.x - 60} y={top - 28} width="120" height="22" rx="4" fill={labelBg} />
      <text x={hotspot.x} y={top - 13} textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
        {label}
      </text>
    </>
  )
}
