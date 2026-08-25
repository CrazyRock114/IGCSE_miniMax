/**
 * RelatedChips — the row of "see also" terms that appears at the
 * bottom of a concept card and at the bottom of a flipped study card.
 *
 * Each chip is a Link to `/vocab?tab=all&focus=<termId>` and sets
 * `subject` and `slug` URL params so the destination page lands
 * already filtered to the term's lesson. The user lands on the
 * all-terms tab scrolled to the term, in the right lesson.
 *
 * On hover, a small tooltip shows the Chinese translation (looked
 * up via `findTermChinese`). The hover works on touch too — a
 * tap-and-hold shows the tooltip via CSS focus-within.
 */
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { VOCAB } from '@/lib/vocabStrings'
import { findFirstTerm, findTermChinese } from '@/lib/termIndex'

export function RelatedChips({
  termIds,
  current,
}: {
  termIds: string[]
  current: string
}) {
  const [, setSearchParams] = useSearchParams()
  const [openTermId, setOpenTermId] = useState<string | null>(null)

  const filtered = termIds.filter((t) => t !== current)
  if (filtered.length === 0) return null

  const goToTerm = (termId: string) => {
    const loc = findFirstTerm(termId)
    setSearchParams(
      (prev) => {
        const out = new URLSearchParams(prev)
        out.set('tab', 'all')
        out.set('subject', loc?.subject ?? 'all')
        out.set('slug', loc?.slug ?? 'all')
        out.set('focus', termId)
        return out
      },
      { replace: true }
    )
    // The anchor scroll happens after the next paint; clear the focus
    // param once we've scrolled so a hard refresh doesn't open straight
    // to that term.
    setTimeout(() => {
      setSearchParams(
        (prev) => {
          const out = new URLSearchParams(prev)
          out.delete('focus')
          return out
        },
        { replace: true }
      )
    }, 800)
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-line pt-2">
      <span className="text-[10px] uppercase tracking-wide text-muted">
        <T value={VOCAB.relatedLabel} />
      </span>
      {filtered.map((t) => {
        const zh = findTermChinese(t, current)
        return (
          <span
            key={t}
            className="relative"
            onMouseEnter={() => setOpenTermId(t)}
            onMouseLeave={() => setOpenTermId((cur) => (cur === t ? null : cur))}
            onFocus={() => setOpenTermId(t)}
            onBlur={() => setOpenTermId((cur) => (cur === t ? null : cur))}
          >
            <Link
              to={`#term-${t}`}
              onClick={(e) => {
                // Take over the navigation so we can also pin the page
                // filter to the term's lesson.
                e.preventDefault()
                goToTerm(t)
                // Defer to the next frame so the DOM has the new
                // filter applied; the all-terms list will re-render
                // with the term visible, and the anchor scroll lands.
                requestAnimationFrame(() => {
                  const el = document.getElementById(`term-${t}`)
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                })
              }}
              className="inline-flex items-center gap-1 rounded-full border border-teal-300 bg-teal-50 px-2.5 py-0.5 text-[11px] text-teal-800 transition-colors hover:border-teal-500 hover:bg-teal-100 hover:text-teal-900"
              title={zh ?? t}
            >
              {t}
              {zh && zh !== t && (
                <span className="text-[10px] text-teal-700/70">译</span>
              )}
            </Link>
            {openTermId === t && zh && (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-ink px-2 py-1 text-[11px] text-white shadow-md"
              >
                {zh}
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

// Re-export for legacy imports — some files import from this module
// under the same name as before.
export { RelatedChips as default }
