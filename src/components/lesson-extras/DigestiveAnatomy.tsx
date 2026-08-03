import { useEffect, useMemo, useState } from 'react'
import type { AnatomyOrgan, DigestiveAnatomyExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DIGESTIVE_ANATOMY } from '@/lib/lessonExtrasStrings'

/**
 * Interactive anatomy of the human digestive system.
 *
 * The figure is a single SVG. Each organ is a path (or group) with a stable id, so the
 * data layer can mark which organs to draw and the click handler can resolve which
 * organ the user picked without bespoke coordinate math in the JSX. Selecting an organ
 * lights it up and fills the side panel; the body silhouette never moves, the
 * description does.
 *
 * Two modes:
 *  - "explore" (default): click any organ to read about it.
 *  - "follow": an animated dot traces the food's path from mouth to anus, pausing on
 *    each organ along the way so the same side panel drives the narration.
 *
 * The animation is plain setInterval + state updates — no library, no easing curves
 * beyond linear progress, because the point is to follow the path of a bolus of food,
 * not to be pretty. (Pretty is for games; lessons are for clarity.)
 */
export function DigestiveAnatomy({ extra }: { extra: DigestiveAnatomyExtra }) {
  const organs = extra.organs
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialOrgan ?? null)
  const [mode, setMode] = useState<'explore' | 'follow'>('explore')
  const [followStep, setFollowStep] = useState(0)

  // Memoize the ordered list of "follow" organs once. Sorting every render is fine for
  // eight items, but doing it once is the right thing to do.
  const orderedForFollow = useMemo(
    () => organs.filter((o) => typeof o.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [organs]
  )

  const selected = useMemo(
    () => organs.find((o) => o.id === selectedId) ?? null,
    [organs, selectedId]
  )

  // "Follow the food" mode — advance through the path of organs in `stop` order, pausing
  // on each. The interval drives a counter; the dot's coordinates are looked up from
  // the same organ list, so what the eye sees and what the description says cannot
  // disagree.
  useEffect(() => {
    if (mode !== 'follow') return
    if (orderedForFollow.length === 0) return
    const id = setInterval(() => {
      setFollowStep((s) => {
        const next = s + 1
        if (next >= orderedForFollow.length) {
          // Linger on the last organ for a moment, then stop — the user can replay
          // explicitly with the button. Auto-looping a digestive animation is a recipe
          // for nausea.
          setTimeout(() => {
            setMode('explore')
            setSelectedId(null)
          }, 2500)
          return s
        }
        setSelectedId(orderedForFollow[next]?.id ?? null)
        return next
      })
    }, 2200)
    return () => clearInterval(id)
  }, [mode, orderedForFollow])

  // Reset follow state *before* flipping the mode. Doing it in the effect would mean a
  // synchronous setState in an effect, which the linter rightly flags.
  const startFollow = () => {
    setFollowStep(0)
    setSelectedId(orderedForFollow[0]?.id ?? null)
    setMode('follow')
  }

  const stopFollow = () => {
    setMode('explore')
    setSelectedId(null)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ModeButton active={mode === 'explore'} onClick={stopFollow}>
            <T value={DIGESTIVE_ANATOMY.modeExplore} />
          </ModeButton>
          <ModeButton active={mode === 'follow'} onClick={startFollow}>
            <T value={DIGESTIVE_ANATOMY.modeFollow} />
          </ModeButton>
          {mode === 'follow' && (
            <span className="text-xs text-muted">
              <T value={DIGESTIVE_ANATOMY.followPrompt} />
            </span>
          )}
        </div>

        <AnatomySvg
          organs={organs}
          selectedId={selectedId}
          onSelect={(id) => {
            setMode('explore')
            setSelectedId(id)
          }}
          followStep={followStep}
        />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <OrganPanel organ={selected} />
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

function OrganPanel({ organ }: { organ: AnatomyOrgan }) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={organ.name} />
      </h3>
      <p className="mb-2 leading-relaxed text-ink-soft">
        <T value={organ.description} />
      </p>
      {organ.secretions && organ.secretions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {organ.secretions.map((s, i) => (
            <span
              key={i}
              className="rounded-full border border-line bg-surface px-2 py-0.5 text-xs text-ink-soft"
            >
              <T value={s} />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyHint({ mode }: { mode: 'explore' | 'follow' }) {
  return (
    <p className="text-muted">
      <T value={mode === 'follow' ? DIGESTIVE_ANATOMY.emptyFollow : DIGESTIVE_ANATOMY.emptyExplore} />
    </p>
  )
}

// ---------------------------------------------------------------------------
// SVG body
// ---------------------------------------------------------------------------

/**
 * Colours per organ. Two are pulled from the design tokens; the rest are hand-picked
 * to read clearly against a white surface and against each other, with the liver and
 * gall bladder a matching pair to make the connection obvious.
 */
const ORGAN_FILL: Record<string, { base: string; light: string; stroke: string }> = {
  mouth: { base: '#fda4af', light: '#fecdd3', stroke: '#be123c' },
  oesophagus: { base: '#fcd34d', light: '#fde68a', stroke: '#a16207' },
  stomach: { base: '#fb923c', light: '#fed7aa', stroke: '#c2410c' },
  liver: { base: '#a16207', light: '#d97706', stroke: '#78350f' },
  'gall-bladder': { base: '#16a34a', light: '#86efac', stroke: '#14532d' },
  pancreas: { base: '#f9a8d4', light: '#fbcfe8', stroke: '#9d174d' },
  'small-intestine': { base: '#fbbf24', light: '#fef3c7', stroke: '#92400e' },
  'large-intestine': { base: '#7c3aed', light: '#c4b5fd', stroke: '#4c1d95' },
  anus: { base: '#ef4444', light: '#fecaca', stroke: '#991b1b' },
}

function AnatomySvg({
  organs,
  selectedId,
  onSelect,
  followStep,
}: {
  organs: AnatomyOrgan[]
  selectedId: string | null
  onSelect: (id: string) => void
  followStep: number
}) {
  const ordered = useMemo(
    () => organs.filter((o) => typeof o.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [organs]
  )

  return (
    <svg
      viewBox="0 0 400 560"
      className="w-full"
      role="img"
      aria-label="Human digestive system"
    >
      <BodySilhouette />
      <Mouth selectedId={selectedId} onSelect={onSelect} />
      <Oesophagus selectedId={selectedId} onSelect={onSelect} />
      <Stomach selectedId={selectedId} onSelect={onSelect} />
      <Liver selectedId={selectedId} onSelect={onSelect} />
      <GallBladder selectedId={selectedId} onSelect={onSelect} />
      <Pancreas selectedId={selectedId} onSelect={onSelect} />
      <SmallIntestine selectedId={selectedId} onSelect={onSelect} />
      <LargeIntestine selectedId={selectedId} onSelect={onSelect} />
      <Anus selectedId={selectedId} onSelect={onSelect} />
      <FollowDot ordered={ordered} followStep={followStep} />
    </svg>
  )
}

function fillFor(id: string, selected: boolean): string {
  const c = ORGAN_FILL[id] ?? { base: '#94a3b8', light: '#cbd5e1', stroke: '#475569' }
  return selected ? c.light : c.base
}

function strokeFor(id: string): string {
  return ORGAN_FILL[id]?.stroke ?? '#334155'
}

function OrganShape({
  id,
  selectedId,
  onSelect,
  d,
  label,
  labelX,
  labelY,
  labelAnchor = 'middle',
}: {
  id: string
  selectedId: string | null
  onSelect: (id: string) => void
  d: string
  label: string
  labelX: number
  labelY: number
  labelAnchor?: 'middle' | 'start' | 'end'
}) {
  const selected = selectedId === id
  return (
    <g
      onClick={() => onSelect(id)}
      style={{ cursor: 'pointer' }}
      data-organ={id}
    >
      <path
        d={d}
        fill={fillFor(id, selected)}
        stroke={strokeFor(id)}
        strokeWidth={selected ? 2.5 : 1.5}
        opacity={selected ? 1 : 0.88}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor={labelAnchor}
        fontSize="11"
        fontWeight={selected ? 600 : 500}
        fill="var(--color-ink)"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {label}
      </text>
    </g>
  )
}

function BodySilhouette() {
  return (
    <g aria-hidden="true">
      <ellipse cx="200" cy="60" rx="55" ry="62" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="180" y="115" width="40" height="22" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <path
        d="M 110 138 L 290 138 L 300 175 L 295 360 Q 295 410 250 425 L 150 425 Q 105 410 105 360 L 100 175 Z"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />
      <path
        d="M 130 165 Q 200 150 270 165 M 130 195 Q 200 180 270 195 M 130 225 Q 200 210 270 225"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    </g>
  )
}

function Mouth({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="mouth"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 165 35 Q 200 25 235 35 L 235 55 Q 200 65 165 55 Z"
      label="Mouth"
      labelX={200}
      labelY={75}
    />
  )
}

function Oesophagus({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="oesophagus"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 192 135 L 208 135 L 210 220 L 190 220 Z"
      label="Oesophagus"
      labelX={155}
      labelY={185}
      labelAnchor="end"
    />
  )
}

function Stomach({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="stomach"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 185 220 Q 145 230 145 270 Q 145 310 185 315 Q 220 315 225 290 Q 230 260 215 235 Z"
      label="Stomach"
      labelX={120}
      labelY={275}
      labelAnchor="end"
    />
  )
}

function Liver({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="liver"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 215 220 Q 250 215 275 230 Q 280 250 270 265 Q 245 275 220 270 Q 210 250 215 220 Z"
      label="Liver"
      labelX={290}
      labelY={250}
      labelAnchor="start"
    />
  )
}

function GallBladder({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="gall-bladder"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 220 270 Q 235 268 235 282 Q 232 295 218 290 Q 213 280 220 270 Z"
      label="Gall bladder"
      labelX={275}
      labelY={295}
      labelAnchor="start"
    />
  )
}

function Pancreas({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="pancreas"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 165 320 Q 200 312 235 322 L 230 332 Q 200 326 170 332 Z"
      label="Pancreas"
      labelX={120}
      labelY={330}
      labelAnchor="end"
    />
  )
}

function SmallIntestine({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="small-intestine"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 160 345
         C 130 360 130 390 160 395
         C 190 400 200 380 175 365
         C 150 355 145 395 175 405
         C 205 415 225 395 200 380
         C 175 370 175 405 200 415
         C 230 420 235 385 215 370
         C 200 360 215 345 230 345
         C 250 345 250 405 220 415
         C 190 425 165 415 155 395"
      label="Small intestine"
      labelX={200}
      labelY={460}
    />
  )
}

function LargeIntestine({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="large-intestine"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 150 230
         L 135 230
         Q 120 240 120 280
         L 120 360
         Q 120 400 150 410
         L 250 410
         Q 280 400 280 360
         L 280 280
         Q 280 245 260 240
         L 245 240"
      label="Large intestine"
      labelX={305}
      labelY={400}
      labelAnchor="start"
    />
  )
}

function Anus({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <OrganShape
      id="anus"
      selectedId={selectedId}
      onSelect={onSelect}
      d="M 240 430 Q 250 430 250 442 Q 250 455 240 455 Q 230 455 230 442 Q 230 430 240 430 Z"
      label="Anus"
      labelX={285}
      labelY={445}
      labelAnchor="start"
    />
  )
}

/**
 * The little ball of food that travels through the digestive system in "follow" mode.
 * Drawn as a single SVG circle, with its (cx, cy) interpolated from the organ
 * positions in the table below — the same organ list drives the side panel, so the
 * narration and the visual cannot disagree.
 */
function FollowDot({
  ordered,
  followStep,
}: {
  ordered: AnatomyOrgan[]
  followStep: number
}) {
  // Where the dot sits for each organ. Approximate — the dot is small, the point is
  // "the food passes through here, then here", not pixel-accurate tracing.
  const POSITIONS: Record<string, [number, number]> = {
    mouth: [200, 45],
    oesophagus: [200, 180],
    stomach: [180, 270],
    'small-intestine': [200, 390],
    'large-intestine': [200, 415],
    anus: [240, 442],
  }

  const current = ordered[Math.min(followStep, ordered.length - 1)]
  if (!current) return null
  const pos = POSITIONS[current.id]
  if (!pos) return null

  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={pos[0]} cy={pos[1]} r="7" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5">
        <animate attributeName="r" values="7;9;7" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}
