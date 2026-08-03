import { useState } from 'react'
import type { Bilingual, TeethAnatomyExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { TEETH_ANATOMY } from '@/lib/lessonExtrasStrings'

/**
 * Two-part dental view: a cross-section of a single tooth, and a row of the four tooth
 * types an adult has.
 *
 * The cross-section answers "what is a tooth made of". The row answers "what are the
 * four shapes for". Both are clickable; the description panel switches to match the
 * selected layer or tooth. A student who can label both diagrams can answer any IGCSE
 * question on the topic.
 *
 * Drawn as a single SVG so the same coordinate system serves the inset panel showing
 * the selected layer at a useful scale.
 */
export function TeethAnatomy({ extra }: { extra: TeethAnatomyExtra }) {
  const [selectedLayer, setSelectedLayer] = useState<string>(extra.layers[0]?.id ?? '')
  const [selectedKind, setSelectedKind] = useState<string>(extra.kinds[0]?.id ?? '')

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <ToothSection selected={selectedLayer} onSelect={setSelectedLayer} />
        <ToothRow selected={selectedKind} onSelect={setSelectedKind} kinds={extra.kinds} />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        <ToothPanel
          layer={extra.layers.find((l) => l.id === selectedLayer)}
          kind={extra.kinds.find((k) => k.id === selectedKind)}
        />
      </aside>
    </div>
  )
}

function ToothSection({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  // Layers, outside-in. The id doubles as the click target on the SVG, so the data
  // can be reordered without the renderer caring.
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="Cross-section of a tooth">
      {/* Gum line for context */}
      <rect x="40" y="60" width="240" height="14" fill="#f9a8d4" opacity="0.7" />
      <text x="280" y="71" fontSize="9" fill="#9d174d" textAnchor="end">
        <T value={TEETH_ANATOMY.gumLabel} />
      </text>

      <Layer
        id="enamel"
        selected={selected}
        onSelect={onSelect}
        d="M 100 60 L 220 60 L 215 130 Q 160 145 105 130 Z"
        fill="#f5f5f4"
        stroke="#78716c"
        label="enamel"
        labelX={160}
        labelY={95}
      />
      <Layer
        id="dentine"
        selected={selected}
        onSelect={onSelect}
        d="M 115 100 L 205 100 L 200 140 Q 160 152 120 140 Z"
        fill="#fde68a"
        stroke="#a16207"
        label="dentine"
        labelX={120}
        labelY={150}
        labelAnchor="end"
      />
      <Layer
        id="pulp"
        selected={selected}
        onSelect={onSelect}
        d="M 140 110 L 180 110 L 178 145 Q 160 152 142 145 Z"
        fill="#fca5a5"
        stroke="#dc2626"
        label="pulp"
        labelX={205}
        labelY={128}
        labelAnchor="start"
      />
      <Layer
        id="cementum"
        selected={selected}
        onSelect={onSelect}
        d="M 113 140 Q 160 152 207 140 L 215 180 Q 160 200 105 180 Z"
        fill="#d6d3d1"
        stroke="#57534e"
        label="cementum"
        labelX={160}
        labelY={195}
      />

      {/* Nerve poking out the bottom of the pulp — a little anatomical detail that
          makes "this is the bit that hurts" obvious. */}
      <path d="M 160 150 L 160 200" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <text x="170" y="195" fontSize="9" fill="#7f1d1d">
        <T value={TEETH_ANATOMY.nerveLabel} />
      </text>
    </svg>
  )
}

function Layer({
  id,
  selected,
  onSelect,
  d,
  fill,
  stroke,
  label,
  labelX,
  labelY,
  labelAnchor = 'middle',
}: {
  id: string
  selected: string
  onSelect: (id: string) => void
  d: string
  fill: string
  stroke: string
  label: string
  labelX: number
  labelY: number
  labelAnchor?: 'middle' | 'start' | 'end'
}) {
  const isSel = selected === id
  return (
    <g onClick={() => onSelect(id)} style={{ cursor: 'pointer' }}>
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={isSel ? 3 : 1.5}
        opacity={isSel ? 1 : 0.85}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor={labelAnchor}
        fontSize="11"
        fontWeight={isSel ? 600 : 500}
        fill="var(--color-ink)"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {label}
      </text>
    </g>
  )
}

/**
 * The four tooth types. Each is a stylised crown on a gum line, with the shape drawn
 * to suggest the actual anatomy: incisor flat, canine pointed, premolar two-cusped,
 * molar four-cusped.
 */
function ToothRow({
  selected,
  onSelect,
  kinds,
}: {
  selected: string
  onSelect: (id: string) => void
  kinds: TeethAnatomyExtra['kinds']
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs text-muted">Click a tooth to see what it does.</p>
      <div className="grid grid-cols-4 gap-2">
        {kinds.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => onSelect(k.id)}
            className={
              'flex flex-col items-center rounded-lg border p-2 text-center transition-colors ' +
              (selected === k.id
                ? 'border-teal-600 bg-teal-50 text-ink'
                : 'border-line bg-surface text-ink-soft hover:bg-canvas')
            }
          >
            <ToothIcon kind={k.id} active={selected === k.id} />
            <span className="mt-1 text-xs font-medium">
              <T value={k.name} />
            </span>
            <span className="text-[10px] text-muted">×{k.count}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ToothIcon({ kind, active }: { kind: string; active: boolean }) {
  const fill = active ? '#fde68a' : '#fef3c7'
  const stroke = active ? '#a16207' : '#d97706'

  // A gum strip behind every tooth, then the crown shape unique to the type.
  return (
    <svg viewBox="0 0 60 70" className="h-14 w-14">
      <rect x="0" y="48" width="60" height="14" fill="#f9a8d4" opacity="0.7" />
      {kind === 'incisor' && (
        // Flat, chisel-shaped.
        <path d="M 18 18 L 42 18 L 40 50 L 20 50 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
      )}
      {kind === 'canine' && (
        // Pointed, fang-like.
        <path d="M 30 6 L 42 24 L 40 50 L 20 50 L 18 24 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
      )}
      {kind === 'premolar' && (
        // Two-cusped, slightly wider.
        <>
          <path d="M 16 20 L 30 14 L 44 20 L 42 50 L 18 50 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <path d="M 24 22 L 24 30 M 36 22 L 36 30" stroke={stroke} strokeWidth="1" />
        </>
      )}
      {kind === 'molar' && (
        // Four-cusped, biggest.
        <>
          <path d="M 12 22 L 22 14 L 38 14 L 48 22 L 46 50 L 14 50 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <path d="M 22 22 L 22 32 M 30 18 L 30 32 M 38 22 L 38 32" stroke={stroke} strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

function ToothPanel({
  layer,
  kind,
}: {
  layer: { id: string; name: Bilingual; description: Bilingual } | undefined
  kind: { name: Bilingual; count: number; role: Bilingual } | undefined
}) {
  return (
    <div className="space-y-3">
      {layer && (
        <div>
          <h3 className="text-base font-semibold text-ink">
            <T value={layer.name} />
          </h3>
          <p className="leading-relaxed text-ink-soft">
            <T value={layer.description} />
          </p>
        </div>
      )}
      {kind && (
        <div className="border-t border-line pt-3">
          <h3 className="text-base font-semibold text-ink">
            <T value={kind.name} /> <span className="text-sm font-normal text-muted">×{kind.count}</span>
          </h3>
          <p className="leading-relaxed text-ink-soft">
            <T value={kind.role} />
          </p>
        </div>
      )}
    </div>
  )
}
