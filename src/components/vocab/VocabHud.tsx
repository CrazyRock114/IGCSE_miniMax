/**
 * Vocab page HUD — the "today" chip strip that sits in the page header.
 *
 * Shows the streak, today's review count, and lifetime totals. Clicks
 * jump to the right tab. The HUD is the entry point: a student who
 * only glances at /vocab should still see "12 due today, 5-day streak"
 * and know what to do next.
 */
import { T } from '@/components/i18n/T'
import { useWordBank } from '@/lib/useVocab'
import { useStreak, streakLabel } from '@/lib/useStreak'
import { VOCAB } from '@/lib/vocabStrings'

export function VocabHud() {
  const { stats } = useWordBank()
  const streak = useStreak()

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs">
      <span title="Day streak (≥1 review per day)" className="font-mono text-base">
        🔥 <span className="text-ink">{streakLabel(streak)}</span>
      </span>
      <span className="text-muted">
        <T value={VOCAB.statDueToday} />{' '}
        <span
          className={
            'font-mono ' + (stats.dueToday > 0 ? 'text-amber-700' : 'text-ink-soft')
          }
        >
          {stats.dueToday}
        </span>
      </span>
      <span className="text-muted">
        XP <span className="font-mono text-ink">{streak.xp}</span>
      </span>
      {stats.lapsedCount > 0 && (
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
          <T value={VOCAB.statLapsed} /> {stats.lapsedCount}
        </span>
      )}
    </div>
  )
}
