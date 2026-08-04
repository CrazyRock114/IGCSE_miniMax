import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
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
 * Fullscreen 3D anatomy viewer. Reached from the in-lesson 3D tab via the
 * "Open in fullscreen" button, or directly from a bookmark.
 *
 * The route is `/anatomy/:subject/:slug`. We look up the lesson and use its
 * first `heart-anatomy` extra to source the model and hotspot data — this
 * way `position3d` lives in one place (the lesson) and both views stay in
 * sync.
 */
export function AnatomyPage() {
  const { subject, slug } = useParams<{ subject: string; slug: string }>()
  const lesson = subject && slug ? findLesson(subject, slug) : undefined
  // Call the lookup hook before any early return so React's hook order is stable
  // even when the lesson is missing.
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

  const selected: AnatomyOrgan | null = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  )

  // Keyboard shortcuts: arrow keys / 1..N to step through parts, Esc to clear.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
      else if (e.key === 'ArrowRight' || e.key === ']') {
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
    <div className="flex h-screen flex-col bg-canvas">
      <Header lesson={lesson} />

      <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="relative min-h-0">
          <Suspense fallback={<FullScreen3DFallback />}>
            <FullScreen3D
              extra={extra}
              parts={parts}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHover={setHoveredId}
            />
          </Suspense>

          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1.5 text-[11px] text-ink-soft shadow-sm">
            <T value={ANATOMY_3D.pageHint} />
          </div>
        </div>

        <aside className="overflow-y-auto border-l border-line bg-surface p-5">
          {selected ? (
            <PartPanel part={selected} parts={parts} onSelect={setSelectedId} />
          ) : (
            <PartList parts={parts} onSelect={setSelectedId} />
          )}
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Header({ lesson }: { lesson: Lesson }) {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line bg-surface px-5 py-3">
      <div className="min-w-0">
        <Link
          to={`/lesson/${lesson.subject}/${lesson.slug}`}
          className="text-xs text-accent hover:underline"
        >
          ← Back to lesson
        </Link>
        <h1 className="mt-1 text-lg font-semibold text-ink">
          <T value={lesson.title} />
          <span className="ml-2 text-sm font-normal text-muted">· 3D viewer</span>
        </h1>
      </div>
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
}: {
  extra: HeartAnatomyExtra
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
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

function PartPanel({
  part,
  parts,
  onSelect,
}: {
  part: AnatomyOrgan
  parts: AnatomyOrgan[]
  onSelect: (id: string) => void
}) {
  const idx = parts.findIndex((p) => p.id === part.id)
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-2">
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
        <div className="flex flex-wrap gap-1.5">
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

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={() => onSelect(parts[(idx - 1 + parts.length) % parts.length]!.id)}
          className="flex-1 rounded-md border border-line bg-canvas px-3 py-2 text-xs text-ink-soft hover:bg-surface"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => onSelect(parts[(idx + 1) % parts.length]!.id)}
          className="flex-1 rounded-md border border-line bg-canvas px-3 py-2 text-xs text-ink-soft hover:bg-surface"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

function PartList({
  parts,
  onSelect,
}: {
  parts: AnatomyOrgan[]
  onSelect: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-ink">
        <T value={ANATOMY_3D.partsHeading} />
      </h2>
      <p className="text-xs text-muted">
        <T value={ANATOMY_3D.listHint} />
      </p>
      <ul className="space-y-1.5">
        {parts.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-left text-sm text-ink-soft transition-colors hover:border-accent hover:bg-surface"
            >
              <span className="mr-2 text-[10px] font-mono text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <T value={p.name} />
            </button>
          </li>
        ))}
      </ul>
    </div>
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
