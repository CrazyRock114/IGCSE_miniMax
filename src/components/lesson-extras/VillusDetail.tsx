import { useState } from 'react'
import type { VillusDetailExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { VILLUS_DETAIL } from '@/lib/lessonExtrasStrings'

/**
 * A labelled cross-section of a single villus. Where `VilliSurfaceArea` is the
 * numeric "how big is the multiplier" exercise, this one shows the *named* structures
 * and the direction each type of nutrient takes across the wall.
 *
 * The SVG is a single finger with a capillary network (red), a lacteal (yellow) in
 * the core, an epithelial layer (one cell thick) wrapping the outside, and microvilli
 * as a fuzzy brush on the surface. Clicking a part highlights it and fills the side
 * panel with its description.
 */
export function VillusDetail({ extra }: { extra: VillusDetailExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = extra.parts.find((p) => p.id === selectedId) ?? null

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div>
        <VillusSvg
          parts={extra.parts}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId((cur) => (cur === id ? null : id))}
        />
        <p className="mt-2 text-[11px] text-muted">
          <T value={VILLUS_DETAIL.clickHint} />
        </p>
      </div>

      <div className="space-y-3">
        <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
          {selected ? (
            <PartPanel part={selected} />
          ) : (
            <p className="text-muted">
              <T value={VILLUS_DETAIL.empty} />
            </p>
          )}
        </aside>

        <TransportList transport={extra.transport} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Part panel
// ---------------------------------------------------------------------------

function PartPanel({
  part,
}: {
  part: VillusDetailExtra['parts'][number]
}) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={part.name} />
      </h3>
      <p className="leading-relaxed text-ink-soft">
        <T value={part.description} />
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Transport list
// ---------------------------------------------------------------------------

/**
 * Two-column table: nutrient, where it goes. The whole point of the villus: amino
 * acids and glucose leave via the blood (capillaries), fatty acids and glycerol via
 * the lymph (lacteal). One route, two destinations.
 */
function TransportList({ transport }: { transport: VillusDetailExtra['transport'] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={VILLUS_DETAIL.transportTitle} />
      </h4>
      <ul className="space-y-1.5">
        {transport.map((t) => (
          <li
            key={t.id}
            data-transport-id={t.id}
            className="flex items-baseline justify-between gap-2 text-xs"
          >
            <span className="font-medium text-ink-soft">
              <T value={t.name} />
            </span>
            <span className="text-muted">
              → <T value={t.destination} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SVG cross-section
// ---------------------------------------------------------------------------

/**
 * The drawing has four named layers, each clickable:
 *  - microvilli: brush on the outside (surface)
 *  - epithelium: thin wall, one cell thick (outside)
 *  - capillary network: red mesh, carries blood (inside)
 *  - lacteal: central yellow tube, carries lymph (core)
 *
 * Label positions are driven by `side`, so the same renderer can serve any future
 * cross-section that follows the outside → surface → inside → core convention.
 */
function VillusSvg({
  parts,
  selectedId,
  onSelect,
}: {
  parts: VillusDetailExtra['parts']
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const partOf = (id: string) => parts.find((p) => p.id === id)
  const isOn = (id: string) => selectedId === id
  const ep = partOf('epithelium')
  const cap = partOf('capillary')
  const lact = partOf('lacteal')
  const micro = partOf('microvilli')

  // Label positions per side, in a 320 × 320 viewBox.
  const labelPos: Record<VillusDetailExtra['parts'][number]['side'], { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
    outside: { x: 30, y: 110, anchor: 'end' },
    surface: { x: 30, y: 60, anchor: 'end' },
    inside: { x: 290, y: 110, anchor: 'start' },
    core: { x: 290, y: 220, anchor: 'start' },
  }

  return (
    <svg viewBox="0 0 320 320" className="w-full" role="img" aria-label="Cross-section of a single villus">
      {/* Lumen (gut interior) — drawn first so the finger sits on top */}
      <rect x="0" y="0" width="320" height="40" fill="#fef3c7" />
      <text x="160" y="24" textAnchor="middle" fontSize="11" fill="#92400e">
        <T value={VILLUS_DETAIL.lumenLabel} />
      </text>

      {/* The villus finger — pill shape from (110, 50) to (210, 300) */}
      <g>
        {/* Body fill (epithelium) */}
        <path
          d="M 110 50 Q 110 40 160 40 Q 210 40 210 50 L 210 280 Q 210 310 160 310 Q 110 310 110 280 Z"
          fill={isOn('epithelium') ? '#fde68a' : '#fef9c3'}
          stroke={isOn('epithelium') ? '#a16207' : '#ca8a04'}
          strokeWidth={isOn('epithelium') ? 2.5 : 1.5}
          onClick={() => ep && onSelect(ep.id)}
          style={{ cursor: 'pointer' }}
          data-part="epithelium"
        />

        {/* Microvilli — brush on the outside surface */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 113 + i * 7
          return (
            <line
              key={i}
              x1={x}
              y1={50}
              x2={x}
              y2={36 + (i % 3) * 2}
              stroke={isOn('microvilli') ? '#7c3aed' : '#a78bfa'}
              strokeWidth={isOn('microvilli') ? 1.6 : 1}
              strokeLinecap="round"
              onClick={() => micro && onSelect(micro.id)}
              style={{ cursor: 'pointer' }}
              data-part="microvilli"
            />
          )
        })}

        {/* Capillary network — red mesh just inside the wall */}
        <g onClick={() => cap && onSelect(cap.id)} style={{ cursor: 'pointer' }} data-part="capillary">
          <path
            d="M 118 90 Q 130 95 130 110 Q 130 130 118 140 Q 110 150 118 170 Q 130 185 130 205 Q 130 225 118 240 Q 110 250 122 265 Q 130 275 130 280"
            fill="none"
            stroke={isOn('capillary') ? '#dc2626' : '#f87171'}
            strokeWidth={isOn('capillary') ? 2.5 : 1.5}
          />
          <path
            d="M 202 90 Q 190 95 190 110 Q 190 130 202 140 Q 210 150 202 170 Q 190 185 190 205 Q 190 225 202 240 Q 210 250 198 265 Q 190 275 190 280"
            fill="none"
            stroke={isOn('capillary') ? '#dc2626' : '#f87171'}
            strokeWidth={isOn('capillary') ? 2.5 : 1.5}
          />
          {/* Capillary loops at top — where blood flows in/out */}
          <path
            d="M 118 80 Q 160 70 202 80"
            fill="none"
            stroke={isOn('capillary') ? '#dc2626' : '#f87171'}
            strokeWidth={isOn('capillary') ? 2.5 : 1.5}
          />
        </g>

        {/* Lacteal — central yellow tube */}
        <rect
          x={146}
          y={150}
          width={28}
          height={110}
          rx={14}
          fill={isOn('lacteal') ? '#fde047' : '#fef08a'}
          stroke={isOn('lacteal') ? '#a16207' : '#ca8a04'}
          strokeWidth={isOn('lacteal') ? 2.5 : 1.5}
          onClick={() => lact && onSelect(lact.id)}
          style={{ cursor: 'pointer' }}
          data-part="lacteal"
        />
        <text x="160" y="210" textAnchor="middle" fontSize="9" fill="#854d0e" style={{ pointerEvents: 'none' }}>
          <T value={VILLUS_DETAIL.lactealTag} />
        </text>
      </g>

      {/* Labels with leader lines, positioned by `side` */}
      {parts.map((p) => {
        const pos = labelPos[p.side]
        return (
          <g key={p.id} onClick={() => onSelect(p.id)} style={{ cursor: 'pointer' }}>
            <line
              x1={pos.x < 160 ? 100 : 220}
              y1={pos.y}
              x2={pos.x < 160 ? 50 : 270}
              y2={pos.y}
              stroke={isOn(p.id) ? '#0f766e' : '#94a3b8'}
              strokeWidth={isOn(p.id) ? 1.4 : 0.8}
              strokeDasharray={isOn(p.id) ? '0' : '2 2'}
            />
            <text
              x={pos.x}
              y={pos.y + 4}
              textAnchor={pos.anchor}
              fontSize="11"
              fontWeight={isOn(p.id) ? 600 : 500}
              fill={isOn(p.id) ? '#0f766e' : 'var(--color-ink-soft)'}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <T value={p.name} />
            </text>
          </g>
        )
      })}

      {/* Base of the villus, showing the gut wall below */}
      <rect x="0" y="300" width="320" height="20" fill="#e0e7ff" />
      <text x="160" y="313" textAnchor="middle" fontSize="10" fill="#3730a3">
        <T value={VILLUS_DETAIL.wallLabel} />
      </text>
    </svg>
  )
}
