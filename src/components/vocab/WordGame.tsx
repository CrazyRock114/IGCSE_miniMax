import { useMemo, useState } from 'react'
import { T } from '@/components/i18n/T'
import { useWordBank } from '@/lib/useVocab'
import { recordReview, useStreak, streakLabel } from '@/lib/useStreak'
import { VOCAB } from '@/lib/vocabStrings'
import { assetUrl } from '@/lib/assetUrl'
import { SpeakButton } from './SpeakButton'
import type { Term } from '@/content/types'
import type { ConceptEnrichment } from '@/lib/vocabTypes'

/**
 * A small multiple-choice game using the student's word bank.
 *
 * The card shows an English term; the four options are four random terms
 * from the bank (one correct). On wrong answer, the question is re-shuffled
 * (so the same wrong option doesn't always appear in the same place); on
 * right answer, the question advances.
 *
 * Implementation note: shuffling lives inside the `QuestionCard` child, whose
 * `useState` lazy-init runs once per mount. A changing `key` on the parent
 * forces a remount, which is how we re-shuffle — without ever calling
 * setState in an effect, and without invoking `Math.random` during render.
 */
export function WordGame({
  resolve,
  pool,
}: {
  resolve: (termId: string, subject: string, slug: string) => { term: Term; enrichment?: ConceptEnrichment } | null
  /** All terms across all lessons — needed to build distractors. */
  pool: Array<{ term: Term }>
}) {
  const { words, assess } = useWordBank()
  const dayStreak = useStreak()
  const [score, setScore] = useState({ right: 0, wrong: 0 })
  const [streak, setStreak] = useState(0)
  const [lastWasRight, setLastWasRight] = useState<boolean | null>(null)

  // The queue: the user's bank resolved to terms, with terms the user has
  // marked 'known' filtered out — no point drilling what you know.
  const queue = useMemo(() => {
    const inBank = new Set(words.filter((w) => w.status !== 'known').map((w) => w.termId))
    return pool.filter((p) => inBank.has(p.term.en))
  }, [words, pool])

  if (queue.length < 2) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={VOCAB.gameEmpty} />
      </p>
    )
  }

  const idx = (score.right + score.wrong) % queue.length
  const correct = queue[idx]
  if (!correct) return null

  // The image is keyed on the enrichment, not the queue row — look it up.
  const correctWithMeta = resolve(correct.term.en, '', '')

  const answer = (t: Term) => {
    const isRight = t.en === correct.term.en
    if (isRight) {
      setScore((s) => ({ ...s, right: s.right + 1 }))
      setStreak((s) => s + 1)
      // Drive the SRS — the user got it right in a multiple-choice game
      // counts as a "know" assessment (mid-strength). The bank row's
      // interval bumps up; next session that word waits longer.
      const bankEntry = words.find((w) => w.termId === correct.term.en)
      if (bankEntry) {
        assess(bankEntry.termId, 'know')
        recordReview('know')
      }
    } else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }))
      setStreak(0)
      const bankEntry = words.find((w) => w.termId === correct.term.en)
      if (bankEntry) {
        assess(bankEntry.termId, 'dont')
        recordReview('dont')
      }
    }
    setLastWasRight(isRight)
  }

  // The key changes on every answer (right or wrong), so the child remounts
  // and its lazy useState re-runs — that's how we get a fresh shuffle without
  // using setState in an effect.
  const attempt = score.right + score.wrong

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between text-xs text-muted">
        <span>
          <T value={VOCAB.gameScore} />:{' '}
          <span className="font-mono text-emerald-700">{score.right}</span> /{' '}
          <span className="font-mono text-rose-700">{score.wrong}</span>
        </span>
        <span>
          🔥 <span className="font-mono text-ink">{streakLabel(dayStreak)}</span> ·{' '}
          <T value={VOCAB.gameStreak} />: <span className="font-mono text-ink">{streak}</span>
        </span>
      </div>

      {correctWithMeta?.enrichment?.image && (
        <img
          src={assetUrl(correctWithMeta.enrichment.image)}
          alt={correct.term.en}
          className="mx-auto h-32 w-full max-w-md rounded object-cover"
        />
      )}
      <div className="flex items-center justify-center gap-2">
        <p className="text-center text-lg font-semibold text-ink">
          <T value={VOCAB.gamePrompt} />:{' '}
          <span className="text-teal-700">
            <T value={{ en: correct.term.en, zh: correct.term.zh }} />
          </span>
        </p>
        <SpeakButton text={correct.term.en} />
      </div>

      <QuestionCard key={`${correct.term.en}-${attempt}`} correct={correct.term} pool={pool} onAnswer={answer} />

      {lastWasRight !== null && (
        <p
          className={
            'rounded-md border p-2 text-center text-xs ' +
            (lastWasRight
              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
              : 'border-rose-500 bg-rose-50 text-rose-800')
          }
        >
          <T value={lastWasRight ? VOCAB.gameRight : VOCAB.gameWrong} />
        </p>
      )}
    </div>
  )
}

/**
 * The 4-option card. Owns the shuffle (lazy useState). The parent supplies a
 * fresh `key` per attempt to force re-shuffling.
 */
function QuestionCard({
  correct,
  pool,
  onAnswer,
}: {
  correct: Term
  pool: Array<{ term: Term }>
  onAnswer: (t: Term) => void
}) {
  const options = useBuildOptions(pool, correct)
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((t, i) => (
        <button
          key={t.en + i}
          type="button"
          onClick={() => onAnswer(t)}
          className="rounded-lg border border-line bg-surface p-3 text-left text-sm text-ink-soft transition-colors hover:border-teal-500 hover:bg-canvas"
        >
          {/* Show the full definition — the option is a card, it can be
             tall. Truncating at 90 chars (the previous behaviour) cut
             off exactly the kind of clinical/mechanism detail the
             student needs to discriminate similar terms. CSS will wrap
             the long English naturally; Chinese wraps the same way. */}
          <T
            value={{
              en: t.definition.en,
              zh: t.definition.zh ?? '',
            }}
          />
        </button>
      ))}
    </div>
  )
}

/**
 * Custom hook wrapping the 4-option build. Lives in its own function so the
 * `useState` lazy init is a one-liner the linter is happy with. The lazy
 * initializer runs once per mount; the parent remounts this hook via a
 * `key` change, so this is the only place shuffling happens.
 */
function useBuildOptions(pool: Array<{ term: Term }>, correct: Term): Term[] {
  const [options] = useState(() => {
    const others = pool.filter((p) => p.term.en !== correct.en)
    const a = [...others]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j]!, a[i]!]
    }
    const distractorTerms = a.slice(0, 3).map((d) => d.term)
    const all = [...distractorTerms, correct]
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j]!, all[i]!]
    }
    return all
  })
  return options
}
