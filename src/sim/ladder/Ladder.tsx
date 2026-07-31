import type { SimBody } from '@/content/types'
import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'

const W = 460
const ROW = 26
const TOP = 16

/**
 * An ordered series drawn as a ladder, with a line across it.
 *
 * The reactivity series is usually met as a list to memorise. Drawing it with a threshold
 * line turns it into something you can read an answer off: everything above the line
 * reacts, everything below it does not, and moving a metal past the line is a visible
 * event rather than a fact to recall.
 *
 * Rung labels arrive as `symbol|name`, since both are wanted — the symbol is how the
 * series is written down and the name is how it is said.
 */
export function Ladder({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  // Marker convention: [0] names what is being tested, [1] is the equation line and
  // [2] the observation. All three are prose, so they render as HTML rather than SVG text.
  const [, headline, note] = result.markers ?? []

  const rungs = bodies.filter((b) => b.kind !== 'threshold')
  const threshold = bodies.find((b) => b.kind === 'threshold')
  const height = TOP * 2 + rungs.length * ROW

  const y = (value: number) => TOP + (-value + 0.5) * ROW

  return (
    <figure className="m-0">
      {headline && (
        <p className="mb-2 text-center font-mono text-sm font-semibold text-ink">
          <T value={headline.label} />
        </p>
      )}

      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="w-full select-none"
        role="img"
        aria-label="The reactivity series, with a line marking which metals react"
      >
        <rect x={0} y={0} width={W} height={height} fill="#f8fafc" />

        {/* Reactivity increases up the page */}
        <defs>
          <marker id="ladder-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" fill="#94a3b8" />
          </marker>
        </defs>
        <line
          x1={26}
          y1={height - TOP - 6}
          x2={26}
          y2={TOP + 6}
          stroke="#94a3b8"
          strokeWidth={1.4}
          markerEnd="url(#ladder-arrow)"
        />
        <text
          x={16}
          y={height / 2}
          textAnchor="middle"
          fontSize={10}
          fill="#64748b"
          transform={`rotate(-90 16 ${height / 2})`}
        >
          more reactive
        </text>

        {rungs.map((b, i) => (
          <Rung key={i} body={b} y={y(b.y)} />
        ))}

        {threshold && (
          <g>
            <line
              x1={44}
              y1={y(threshold.y)}
              x2={W - 16}
              y2={y(threshold.y)}
              stroke="#dc2626"
              strokeWidth={2}
              strokeDasharray="7 4"
            />
            <text x={W - 16} y={y(threshold.y) - 5} textAnchor="end" fontSize={10} fill="#dc2626">
              above this line: reacts
            </text>
          </g>
        )}
      </svg>

      {note && (
        <p className="mt-2 text-center text-sm text-muted">
          <T value={note.label} />
        </p>
      )}
    </figure>
  )
}

function Rung({ body, y }: { body: SimBody; y: number }) {
  const [symbol = '', name = ''] = (body.label ?? '').split('|')
  const selected = body.kind === 'selected'
  // Carbon and hydrogen are landmarks on the series rather than metals to test, so they
  // are drawn in outline — visibly not one of the things you can pick.
  const reference = body.kind === 'reference'

  return (
    <g>
      {selected && <rect x={44} y={y - 11} width={W - 60} height={22} rx={5} fill="#ccfbf1" />}
      <text
        x={56}
        y={y + 5}
        fontSize={14}
        fontWeight={selected ? 700 : 600}
        fill={reference ? '#94a3b8' : selected ? '#0f766e' : '#334155'}
      >
        {symbol}
      </text>
      <text
        x={92}
        y={y + 5}
        fontSize={13}
        fontStyle={reference ? 'italic' : undefined}
        fill={reference ? '#94a3b8' : selected ? '#0f766e' : '#64748b'}
      >
        {name}
        {reference ? ' (not a metal)' : ''}
      </text>
    </g>
  )
}
