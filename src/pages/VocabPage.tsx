import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { LangToggle } from '@/components/i18n/LangToggle'
import { TranslatorToggle } from '@/components/translator/TranslatorToggle'
import { ConceptCard } from '@/components/vocab/ConceptCard'
import { WordBank } from '@/components/vocab/WordBank'
import { VocabHud } from '@/components/vocab/VocabHud'
import { StudyMode } from '@/components/vocab/StudyMode'
import { GamePicker } from '@/components/vocab/GamePicker'
import { MistakeList } from '@/components/vocab/MistakeList'
import { HooksTab } from '@/components/hooks/HooksTab'
import { lessons } from '@/lib/registry'
import { useWordBank } from '@/lib/useVocab'
import { SYLLABUSES } from '@/content/syllabus'
import type { Term } from '@/content/types'
import type { ConceptEnrichment } from '@/lib/vocabTypes'
import { getEnrichment } from '@/content/termEnrichments'
import { VOCAB } from '@/lib/vocabStrings'
import { HOOKS } from '@/lib/hooksStrings'

/**
 * The vocabulary page.
 *
 * Four tabs:
 *  - All terms: browses every glossary entry across every lesson
 *  - Word bank: the user's saved terms, grouped by status
 *  - Study: card-flip review session
 *  - Game: multiple-choice mini-game using the word bank
 *
 * The page reads lessons via the same `import.meta.glob` registry the home
 * page uses, so adding a new lesson automatically makes its terms appear
 * here — no central list to maintain.
 */
type Tab = 'all' | 'bank' | 'study' | 'game' | 'mistakes' | 'hooks'

const VALID_TABS: ReadonlySet<Tab> = new Set<Tab>([
  'all',
  'bank',
  'study',
  'game',
  'mistakes',
  'hooks',
])

export function VocabPage() {
  // `tab` is mirrored to the URL so a deep link like
  // `/vocab?tab=mistakes` lands on the right tab. Unknown values fall
  // back to 'all' rather than rendering nothing.
  // The `tab` is local state — the URL is a one-way mirror, not the source
  // of truth. Previously the URL was the source and a click only updated
  // it via setSearchParams, but the result was racy and the content
  // sometimes failed to re-render (the tab button got the new active
  // style but the tab body stayed on the previous one). Reading the URL
  // once on mount and using local state from there on is simpler and
  // doesn't lose deep links.
  const [searchParams, setSearchParams] = useSearchParams()
  const urlTab = searchParams.get('tab')
  const initialTab: Tab = urlTab && VALID_TABS.has(urlTab as Tab) ? (urlTab as Tab) : 'all'
  const [tab, setTab] = useState<Tab>(initialTab)

  // Keep the URL in sync when the tab changes. This is a one-way write
  // (state → URL) so we never get a feedback loop.
  useEffect(() => {
    const current = searchParams.get('tab')
    const want = tab === 'all' ? null : tab
    if (current === want || (current === null && want === null)) return
    setSearchParams(
      (prev) => {
        const out = new URLSearchParams(prev)
        if (want === null) out.delete('tab')
        else out.set('tab', want)
        return out
      },
      { replace: true }
    )
    // We intentionally only depend on `tab` — the previous URL state is
    // captured in the functional setter, so a stale `searchParams` won't
    // cause an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])
  const [subject, setSubject] = useState<string>('all')

  // Flatten every term from every lesson into a row with subject+slug+en
  // keys, sorted by lesson order then by the term's position in the glossary.
  const allTerms = useMemo(() => {
    const rows: Array<{
      term: Term
      subject: string
      slug: string
      enrichment: ConceptEnrichment | undefined
    }> = []
    for (const l of lessons) {
      if (subject !== 'all' && l.subject !== subject) continue
      for (const t of l.glossary) {
        rows.push({
          term: t,
          subject: l.subject,
          slug: l.slug,
          enrichment: getEnrichment(l.subject, l.slug, t.en),
        })
      }
    }
    return rows
  }, [subject])

  // The flat pool the game uses — same data, exposed as `term` so the
  // component can pick definitions.
  const pool = useMemo(() => allTerms.map((r) => ({ term: r.term })), [allTerms])

  const resolve = (termId: string, subject: string, slug: string): {
    term: Term
    enrichment?: ConceptEnrichment
  } | null => {
    const lesson = lessons.find((l) => l.subject === subject && l.slug === slug)
    if (!lesson) return null
    const term = lesson.glossary.find((t) => t.en === termId)
    if (!term) return null
    const enrichment = getEnrichment(subject, slug, termId)
    return enrichment ? { term, enrichment } : { term }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/" className="text-xs text-muted hover:text-ink-soft">
            ← <T value={{ en: 'All lessons', zh: '返回首页' }} />
          </Link>
          <h1 className="mt-1 text-3xl font-bold text-ink">
            <T value={VOCAB.pageTitle} />
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">
            <T value={VOCAB.pageSummary} />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <VocabHud />
          <TranslatorToggle />
          <LangToggle />
        </div>
      </header>

      <nav className="mb-4 flex flex-wrap gap-1 border-b border-line">
        {(
          [
            { id: 'all', label: VOCAB.tabAll },
            { id: 'bank', label: VOCAB.tabBank },
            { id: 'study', label: VOCAB.tabStudy },
            { id: 'game', label: VOCAB.tabGame },
            { id: 'mistakes', label: VOCAB.tabMistakes },
            { id: 'hooks', label: HOOKS.tabHooks },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              'rounded-t-md border-b-2 px-3 py-1.5 text-sm font-medium transition-colors ' +
              (tab === t.id
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-muted hover:text-ink-soft')
            }
          >
            <T value={t.label} />
          </button>
        ))}
      </nav>

      {tab === 'all' && (
        <div className="space-y-3">
          <SubjectFilter value={subject} onChange={setSubject} count={allTerms.length} />
          {allTerms.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
              <T value={VOCAB.bankNoneInGroup} />
            </p>
          ) : (
            <ul className="grid gap-3">
              {allTerms.map((r) => (
                <li key={`${r.subject}/${r.slug}/${r.term.en}`}>
                  {r.enrichment ? (
                    <ConceptCard term={r.term} enrichment={r.enrichment} variant="inline" />
                  ) : (
                    <ConceptCard term={r.term} variant="inline" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'bank' && <WordBank resolve={resolve} />}

      {tab === 'study' && <StudyMode resolve={resolve} />}

      {tab === 'game' && <GamePicker resolve={resolve} pool={pool} />}

      {tab === 'mistakes' && <MistakeList />}

      {tab === 'hooks' && <HooksTab />}

      <WordBankSeeder />
    </main>
  )
}

/**
 * Ensures every lesson's glossary terms exist in the user's bank. Called on
 * mount so the student has a starting set to interact with — without this
 * the bank is empty until they manually add each term, which feels broken.
 * Idempotent: terms the user has already removed are not re-added.
 */
function WordBankSeeder() {
  const { ensure, words } = useWordBank()
  // Run once on mount: any term not already in the bank gets a 'new' entry.
  // Has a side effect (writes to localStorage); deps are empty by design.
  const seed = useMemo(() => {
    const all = lessons.flatMap((l) => l.glossary.map((t) => ({ termId: t.en, subject: l.subject, slug: l.slug })))
    const have = new Set(words.map((w) => w.termId))
    return all.filter((a) => !have.has(a.termId))
  }, [words])
  if (seed.length > 0) ensure(seed)
  return null
}

function SubjectFilter({
  value,
  onChange,
  count,
}: {
  value: string
  onChange: (s: string) => void
  count: number
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
      <span>
        <T value={VOCAB.filterAll} /> ·
      </span>
      <button
        type="button"
        onClick={() => onChange('all')}
        className={
          'rounded-md border px-2 py-0.5 ' +
          (value === 'all' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-line bg-surface')
        }
      >
        All ({count})
      </button>
      {SYLLABUSES.map((s) => (
        <button
          key={s.code}
          type="button"
          onClick={() => onChange(s.code)}
          className={
            'rounded-md border px-2 py-0.5 ' +
            (value === s.code ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-line bg-surface')
          }
        >
          {s.code}
        </button>
      ))}
    </div>
  )
}
