import type { ElementType, ReactNode } from 'react'
import type { Bilingual } from '@/content/types'
import { useAssistLevel } from '@/lib/i18n'

/** Above this length a value is prose, not a label, and gets no underline hint. */
const HOVER_UNDERLINE_MAX_CHARS = 48

interface TProps {
  value: Bilingual
  /** Element to render as. Defaults to a fragment-ish <span>. */
  as?: ElementType
  className?: string
  /** Class applied to the Chinese scaffold block in `inline` mode. */
  zhClassName?: string
}

/**
 * Renders a bilingual value according to the current assist level.
 *
 * - `off`    → English only
 * - `hover`  → English, with Chinese in a `title` tooltip and an underline hint
 * - `inline` → English, with Chinese rendered underneath
 *
 * English is always in the DOM, so search, copy-paste and screen readers get the
 * exam language regardless of the setting.
 */
export function T({ value, as: As = 'span', className, zhClassName }: TProps): ReactNode {
  const [level] = useAssistLevel()
  const hasZh = Boolean(value.zh)

  if (level === 'inline' && hasZh) {
    return (
      <As className={className}>
        <span>{value.en}</span>
        <span className={zhClassName ?? 'zh-scaffold mt-0.5 block'} lang="zh-CN">
          {value.zh}
        </span>
      </As>
    )
  }

  if (level === 'hover' && hasZh) {
    // The dotted underline is a useful "there is Chinese behind this" hint on a
    // heading or label, but on a paragraph it underlines several lines of prose and
    // makes the page look broken. Long values get the tooltip without the rule.
    const marked = value.en.length <= HOVER_UNDERLINE_MAX_CHARS
    return (
      <As
        className={className}
        title={value.zh}
        style={
          marked
            ? { textDecoration: 'underline dotted', textUnderlineOffset: '0.25em' }
            : undefined
        }
      >
        {value.en}
      </As>
    )
  }

  return <As className={className}>{value.en}</As>
}

/**
 * Same rules as `T`, but returns plain strings — for `alt`, `aria-label`, `title`
 * and other places where JSX is not allowed.
 */
export function useBilingualText(value: Bilingual): string {
  const [level] = useAssistLevel()
  if (level === 'inline' && value.zh) return `${value.en} — ${value.zh}`
  return value.en
}
