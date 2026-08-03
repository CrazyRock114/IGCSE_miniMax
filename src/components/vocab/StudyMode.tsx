import { useMemo, useState } from 'react'
import { T } from '@/components/i18n/T'
import type { StudyStatus, WordEntry } from '@/lib/vocabTypes'
import { dueForReview, useWordBank } from '@/lib/useVocab'
import { VOCAB } from '@/lib/vocabStrings'

/**
 * Card-flip study mode.
 *
 * Shows the English term (and image, if any) face-up; the student clicks to
 * flip and see the definition + mechanism. Then three buttons: "Know it",
 * "Still learning", "Don't know it". The status ladder maps onto a simple
 * self-assessment: know → known, don't know → new, unsure → stays.
 *
 * Queue is whatever is "due for review" today — the student's word bank
 * filtered by status, with 'known' words re-introduced after a week. The
 * shuffle is a Fisher–Yates on a snapshot of the queue, computed once per
 * session inside a child that mounts with a fresh key whenever the bank
 * changes — so re-renders don't reshuffle mid-session and the shuffle never
 * runs during render.
 */
export function StudyMode({
  resolve,
}: {
  resolve: (termId: string, subject: string, slug: string) => { term: import('@/content/types').Term; enrichment?: import('@/lib/vocabTypes').ConceptEnrichment } | null
}) {
  const { words } = useWordBank()

  // Pure: what is due. The shuffle lives in the child so the parent render
  // stays free of `Math.random`.
  const due = useMemo(() => dueForReview(words), [words])

  if (due.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={VOCAB.studyEmpty} />
      </p>
    )
  }

  // The session component remounts when the bank changes, so the shuffle
  // runs once per session — never in the parent render, never in an effect.
  return (
    <Session
      // Hash the bank so any add/remove/status change forces a fresh shuffle.
      // A new session starts on the first card of the new queue.
      key={bankHash(words)}
      due={due}
      resolve={resolve}
    />
  )
}

function bankHash(words: WordEntry[]): string {
  // Cheap, stable, order-insensitive — a content hash of the bank's identity.
  return words
    .map((w) => `${w.termId}:${w.status}:${w.lastReviewed}`)
    .sort()
    .join('|')
}

/**
 * One study session. Owns its own session counter and the shuffle (lazy
 * useState). Remounted by the parent via `key` when the word bank changes.
 */
function Session({
  due,
  resolve,
}: {
  due: WordEntry[]
  resolve: (termId: string, subject: string, slug: string) => { term: import('@/content/types').Term; enrichment?: import('@/lib/vocabTypes').ConceptEnrichment } | null
}) {
  const { setStatus } = useWordBank()
  const [queue] = useState(() => {
    const a = [...due]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j]!, a[i]!]
    }
    return a
  })
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [session, setSession] = useState({ done: 0, right: 0 })
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="rounded-xl border border-teal-600 bg-teal-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-ink">
          <T value={VOCAB.studyDone} />
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          {session.right}/{session.done} <T value={VOCAB.studyRight} />
        </p>
        <button
          type="button"
          onClick={() => {
            setIdx(0)
            setFlipped(false)
            setSession({ done: 0, right: 0 })
            setDone(false)
          }}
          className="mt-3 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <T value={VOCAB.studyAgain} />
        </button>
      </div>
    )
  }

  const current = queue[idx]
  if (!current) return null
  const resolved = resolve(current.termId, current.subject, current.slug)
  if (!resolved) return null

  const assess = (s: 'know' | 'unsure' | 'dont') => {
    const nextStatus: StudyStatus =
      s === 'know' ? 'known' : s === 'dont' ? 'new' : current.status === 'new' ? 'learning' : current.status
    setStatus(current.termId, nextStatus)
    setSession((p) => ({ done: p.done + 1, right: p.right + (s === 'know' ? 1 : 0) }))
    setFlipped(false)
    if (idx + 1 >= queue.length) {
      setDone(true)
    } else {
      setIdx((i) => i + 1)
    }
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted">
        <T value={VOCAB.studyProgress} />{' '}
        <span className="font-mono text-ink">
          {Math.min(idx + 1, queue.length)} / {queue.length}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="block w-full rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-teal-500"
        aria-pressed={flipped}
      >
        {resolved.enrichment?.image && (
          <img
            src={resolved.enrichment.image}
            alt={resolved.term.en}
            className="mx-auto mb-3 h-32 w-full max-w-md rounded object-cover"
          />
        )}
        <h3 className="text-center text-2xl font-semibold text-ink">
          <T value={{ en: resolved.term.en, zh: resolved.term.zh }} />
        </h3>
        {flipped ? (
          <div className="mt-3 space-y-2 border-t border-line pt-3">
            <p className="text-sm text-ink-soft">
              <T value={resolved.term.definition} />
            </p>
            {resolved.enrichment?.mechanism && (
              <p className="text-xs text-ink-soft">
                <strong className="text-muted">
                  <T value={VOCAB.mechanismTitle} />:{' '}
                </strong>
                <T value={resolved.enrichment.mechanism} />
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-center text-xs text-muted">
            <T value={VOCAB.studyFlipHint} />
          </p>
        )}
      </button>

      {flipped && (
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => assess('dont')}
            className="rounded-md border border-line bg-surface px-2 py-2 text-xs text-ink-soft hover:border-rose-500 hover:text-rose-700"
          >
            <T value={VOCAB.dontKnow} />
          </button>
          <button
            type="button"
            onClick={() => assess('unsure')}
            className="rounded-md border border-line bg-surface px-2 py-2 text-xs text-ink-soft hover:border-amber-500 hover:text-amber-700"
          >
            <T value={VOCAB.unsure} />
          </button>
          <button
            type="button"
            onClick={() => assess('know')}
            className="rounded-md border border-line bg-surface px-2 py-2 text-xs text-ink-soft hover:border-emerald-500 hover:text-emerald-700"
          >
            <T value={VOCAB.know} />
          </button>
        </div>
      )}
    </div>
  )
}
