import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { AnatomyOrgan, HeartAnatomyExtra, Lesson } from '@/content/types'
import { findLesson } from '@/lib/registry'
import { T } from '@/components/i18n/T'
import { ANATOMY_3D } from '@/lib/lessonExtrasStrings'

// Same lazy chunk as the in-lesson 3D tab — only downloads the first time
// the student opens either the tab or this page.
const Anatomy3D = lazy(() =>
  import('@/components/lesson-extras/Anatomy3D').then((m) => ({ default: m.Anatomy3D }))
)

/**
 * Fullscreen 3D anatomy viewer. The whole page is the canvas; the part
 * details and the part list float over it as overlay panels, the way a
 * gallery viewer does. Modelled on the Anatomy Atelier layout — heart
 * centred, fills ~70% of the viewport, no fixed sidebar eating space.
 */
export function AnatomyPage() {
  const { subject, slug } = useParams<{ subject: string; slug: string }>()
  const lesson = subject && slug ? findLesson(subject, slug) : undefined
  const extra = useMemo(
    () => (lesson ? findAnatomyExtra(lesson) : undefined),
    [lesson]
  )

  if (!lesson) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link
          to={`/lesson/${subject ?? ''}/${slug ?? ''}`}
          className="mt-4 inline-block text-accent hover:underline"
        >
          ← Back to all lessons
        </Link>
      </main>
    )
  }

  if (!extra || !extra.model3d) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold">No 3D model for this lesson</h1>
        <p className="mt-2 text-sm text-muted">
          This lesson doesn't have a GLB viewer wired up yet.
        </p>
        <Link
          to={`/lesson/${lesson.subject}/${lesson.slug}`}
          className="mt-4 inline-block text-accent hover:underline"
        >
          ← Back to the lesson
        </Link>
      </main>
    )
  }

  return <AnatomyView lesson={lesson} extra={extra} />
}

function AnatomyView({ lesson, extra }: { lesson: Lesson; extra: HeartAnatomyExtra }) {
  const parts = extra.parts
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [selectedScreenPos, setSelectedScreenPos] = useState<{ x: number; y: number } | null>(null)
  // Canvas viewport size in pixels (updated by the canvas resize observer).
  const [viewport, setViewport] = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  const selected: AnatomyOrgan | null = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  )

  // Track the canvas wrapper's size so the screen→viewport math matches
  // what the renderer sees.
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (r) setViewport({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Keyboard shortcuts: arrow keys step through parts, Esc clears.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null)
        setListOpen(false)
      } else if (e.key === 'ArrowRight' || e.key === ']') {
        const i = parts.findIndex((p) => p.id === selectedId)
        setSelectedId(parts[(i + 1) % parts.length]?.id ?? null)
      } else if (e.key === 'ArrowLeft' || e.key === '[') {
        const i = parts.findIndex((p) => p.id === selectedId)
        setSelectedId(parts[(i - 1 + parts.length) % parts.length]?.id ?? null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [parts, selectedId])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-canvas">
      <div ref={canvasWrapRef} className="absolute inset-0">
        <Suspense fallback={<FullScreen3DFallback />}>
          <FullScreen3D
            extra={extra}
            parts={parts}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
            autoRotate={autoRotate}
            onAutoRotateChange={setAutoRotate}
            onSelectedScreenPos={setSelectedScreenPos}
          />
        </Suspense>
      </div>

      <Header
        lesson={lesson}
        onToggleList={() => setListOpen((v) => !v)}
        listOpen={listOpen}
      />

      {/* Floating part list (left). Toggle from the header. */}
      {listOpen && (
        <PartListOverlay
          parts={parts}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id)
            setListOpen(false)
          }}
          onClose={() => setListOpen(false)}
        />
      )}

      {/* Floating callout (right of the selected dot) with a leader line
          drawn to the dot. Hidden when nothing is selected or the dot is
          off-screen. */}
      {selected && selectedScreenPos && viewport.w > 0 && (
        <Callout
          part={selected}
          parts={parts}
          screenPos={selectedScreenPos}
          viewport={viewport}
          onSelect={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Header({
  lesson,
  onToggleList,
  listOpen,
}: {
  lesson: Lesson
  onToggleList: () => void
  listOpen: boolean
}) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-3 p-4">
      <div className="pointer-events-auto rounded-lg border border-line bg-canvas/85 px-3 py-2 shadow-sm backdrop-blur">
        <Link
          to={`/lesson/${lesson.subject}/${lesson.slug}`}
          className="text-[11px] text-accent hover:underline"
        >
          ← Back to lesson
        </Link>
        <h1 className="mt-0.5 text-sm font-semibold text-ink">
          <T value={lesson.title} />
        </h1>
      </div>

      <button
        type="button"
        onClick={onToggleList}
        className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/85 px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur transition-colors hover:bg-surface"
      >
        <span aria-hidden="true">☰</span>
        <span>
          <T value={listOpen ? ANATOMY_3D.hideAllParts : ANATOMY_3D.showAllParts} />
        </span>
      </button>
    </header>
  )
}

function FullScreen3D({
  extra,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  autoRotate,
  onAutoRotateChange,
  onSelectedScreenPos,
}: {
  extra: HeartAnatomyExtra
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  autoRotate: boolean
  onAutoRotateChange: (v: boolean) => void
  onSelectedScreenPos: (pos: { x: number; y: number } | null) => void
}) {
  return (
    <Anatomy3D
      modelUrl={extra.model3d!}
      parts={parts}
      selectedId={selectedId}
      hoveredId={hoveredId}
      onSelect={onSelect}
      onHover={onHover}
      followStep={-1}
      orderedForFollow={[]}
      autoRotate={autoRotate}
      onAutoRotateChange={onAutoRotateChange}
      onSelectedScreenPos={onSelectedScreenPos}
    />
  )
}

function FullScreen3DFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted">
      Loading 3D viewer…
    </div>
  )
}

const CALLOUT_WIDTH = 360
const CALLOUT_GAP = 16

function Callout({
  part,
  parts,
  screenPos,
  viewport,
  onSelect,
  onClose,
}: {
  part: AnatomyOrgan
  parts: AnatomyOrgan[]
  screenPos: { x: number; y: number }
  viewport: { w: number; h: number }
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const idx = parts.findIndex((p) => p.id === part.id)

  // Position the callout to the right of the dot, but if that would push
  // it off the right edge, flip it to the left. Same for vertical.
  const rightX = screenPos.x + CALLOUT_GAP + 8 // +8 to clear the dot itself
  const leftX = screenPos.x - CALLOUT_GAP - 8 - CALLOUT_WIDTH
  const placeRight = rightX + CALLOUT_WIDTH <= viewport.w
  const calloutX = placeRight ? rightX : Math.max(8, leftX)
  const calloutY = Math.max(8, Math.min(screenPos.y - 80, viewport.h - 320))

  // The leader line goes from the dot to the nearest callout edge.
  // When the callout is to the right of the dot, the line starts from the
  // callout's left edge; when it's to the left, from the right edge.
  const lineStartX = placeRight ? calloutX : calloutX + CALLOUT_WIDTH
  const lineStartY = Math.max(40, Math.min(screenPos.y, calloutY + 80))
  const lineEndX = screenPos.x
  const lineEndY = screenPos.y

  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 z-10"
        width={viewport.w}
        height={viewport.h}
        aria-hidden="true"
      >
        <line
          x1={lineStartX}
          y1={lineStartY}
          x2={lineEndX}
          y2={lineEndY}
          stroke="#0d9488"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          opacity={0.8}
        />
        <circle cx={lineStartX} cy={lineStartY} r={3} fill="#0d9488" />
      </svg>

      <aside
        className="pointer-events-auto absolute z-10 rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur"
        style={{ left: calloutX, top: calloutY, width: CALLOUT_WIDTH }}
      >
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold text-ink">
            <T value={part.name} />
          </h2>
          <span className="text-[10px] uppercase tracking-wide text-muted">
            {idx + 1} / {parts.length}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-soft">
          <T value={part.description} />
        </p>

        {part.secretions && part.secretions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {part.secretions.map((s, i) => (
              <span
                key={i}
                className="rounded-full border border-line bg-canvas px-2 py-0.5 text-xs text-ink-soft"
              >
                <T value={s} />
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(parts[(idx - 1 + parts.length) % parts.length]!.id)}
            className="flex-1 rounded-md border border-line bg-canvas px-2 py-1.5 text-xs text-ink-soft hover:bg-surface"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => onSelect(parts[(idx + 1) % parts.length]!.id)}
            className="flex-1 rounded-md border border-line bg-canvas px-2 py-1.5 text-xs text-ink-soft hover:bg-surface"
          >
            Next →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line bg-canvas px-2 py-1.5 text-xs text-ink-soft hover:bg-surface"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </aside>
    </>
  )
}

function PartListOverlay({
  parts,
  selectedId,
  onSelect,
  onClose,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  onSelect: (id: string) => void
  onClose: () => void
}) {
  return (
    <aside className="pointer-events-auto absolute left-4 top-20 z-10 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-ink">
          <T value={ANATOMY_3D.partsHeading} />
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-1.5 py-0.5 text-xs text-muted hover:bg-canvas"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <p className="mb-2 text-[11px] text-muted">
        <T value={ANATOMY_3D.listHint} />
      </p>
      <ul className="max-h-[60vh] space-y-1 overflow-y-auto pr-1">
        {parts.map((p, i) => {
          const isActive = selectedId === p.id
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={
                  'w-full rounded-md border px-2.5 py-1.5 text-left text-sm transition-colors ' +
                  (isActive
                    ? 'border-accent bg-accent/10 text-ink'
                    : 'border-line bg-canvas text-ink-soft hover:border-accent hover:bg-surface')
                }
              >
                <span className="mr-2 text-[10px] font-mono text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <T value={p.name} />
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** First `heart-anatomy` extra in a lesson that has a 3D model. */
function findAnatomyExtra(lesson: Lesson): HeartAnatomyExtra | undefined {
  return lesson.extras?.find(
    (e): e is HeartAnatomyExtra => e.type === 'heart-anatomy' && Boolean(e.model3d)
  )
}
