import { useMemo } from 'react'
import { T } from '@/components/i18n/T'
import { groupByStatus, useWordBank } from '@/lib/useVocab'
import { VOCAB } from '@/lib/vocabStrings'
import type { VocabScope } from '@/pages/VocabPage'

/**
 * The user's word bank, grouped by status.
 *
 * Renders nothing useful on its own — this is the inventory view. The vocab
 * page uses it as the "what's in my bank right now" tab. The study mode and
 * the game both pull from the same `useWordBank()` data, so changes made
 * here show up there immediately.
 *
 * The optional `scope` prop restricts the view to a single subject and/or
 * lesson. When unset the bank shows everything the user has saved.
 */
export function WordBank({
  resolve,
  scope,
}: {
  /** Given a termId+subject+slug, return the matching Term + enrichment (if any). */
  resolve: (termId: string, subject: string, slug: string) => { term: import('@/content/types').Term; enrichment?: import('@/lib/vocabTypes').ConceptEnrichment } | null
  scope?: VocabScope
}) {
  const { words, setStatus, remove } = useWordBank()
  const filtered = useMemo(() => {
    if (!scope) return words
    return words.filter((w) => {
      if (scope.subject !== 'all' && w.subject !== scope.subject) return false
      if (scope.slug !== 'all' && w.slug !== scope.slug) return false
      return true
    })
  }, [words, scope])
  const grouped = useMemo(() => groupByStatus(filtered), [filtered])

  if (filtered.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={VOCAB.bankEmpty} />
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {(['new', 'learning', 'known'] as const).map((s) => (
        <section key={s}>
          <h3 className="mb-2 text-sm font-semibold text-ink-soft">
            <T value={s === 'new' ? VOCAB.statusNew : s === 'learning' ? VOCAB.statusLearning : VOCAB.statusKnown} />
            <span className="ml-2 font-mono text-xs text-muted">
              {grouped[s].length}
            </span>
          </h3>
          {grouped[s].length === 0 ? (
            <p className="rounded-md border border-dashed border-line bg-canvas p-3 text-center text-xs text-muted">
              <T value={VOCAB.bankNoneInGroup} />
            </p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {grouped[s].map((w) => {
                const r = resolve(w.termId, w.subject, w.slug)
                if (!r) return null
                return (
                  <li
                    key={w.termId}
                    className="flex items-start gap-2 rounded-lg border border-line bg-surface p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        <T value={{ en: r.term.en, zh: r.term.zh }} />
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                        {w.subject} · {w.slug}
                        {w.reviewCount > 0 ? ` · ${VOCAB.reviewedPrefix.en} ${w.reviewCount}` : ''}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {s !== 'known' && (
                        <button
                          type="button"
                          onClick={() => setStatus(w.termId, 'known')}
                          className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[10px] hover:border-emerald-500 hover:text-emerald-700"
                        >
                          <T value={VOCAB.markKnown} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => remove(w.termId)}
                        className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[10px] text-muted hover:border-rose-500 hover:text-rose-700"
                      >
                          <T value={VOCAB.removeFromBank} />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
