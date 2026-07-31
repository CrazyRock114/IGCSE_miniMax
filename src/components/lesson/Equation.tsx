import { useMemo } from 'react'
import katex from 'katex'
import type { EquationBlock } from '@/content/types'
import { T } from '@/components/i18n/T'

interface EquationProps {
  block: EquationBlock
  /** Current simulation readouts, for the live substitution line. */
  readouts?: Record<string, number>
}

function renderLatex(latex: string): string {
  try {
    return katex.renderToString(latex, { displayMode: true, throwOnError: false })
  } catch {
    // A malformed formula should degrade to visible source, not blank the page.
    return `<code>${latex}</code>`
  }
}

/**
 * A formula with its plain-language meaning and, where the lesson provides one, the
 * same formula with the student's current values substituted in.
 *
 * The substitution is what makes the equation feel connected to the graph: drag a
 * slider and the numbers in the formula move with it.
 */
export function Equation({ block, readouts }: EquationProps) {
  const main = useMemo(() => renderLatex(block.latex), [block.latex])
  const substituted = useMemo(() => {
    if (!block.substitute || !readouts) return null
    return renderLatex(block.substitute(readouts))
  }, [block, readouts])

  return (
    <div className="rounded-lg border border-line bg-surface px-4 py-3">
      <div dangerouslySetInnerHTML={{ __html: main }} />
      <p className="mt-1 text-sm text-ink-soft">
        <T value={block.meaning} />
      </p>
      {substituted && (
        <div className="mt-2 border-t border-line pt-2 text-teal-800">
          <div dangerouslySetInnerHTML={{ __html: substituted }} />
        </div>
      )}
    </div>
  )
}
