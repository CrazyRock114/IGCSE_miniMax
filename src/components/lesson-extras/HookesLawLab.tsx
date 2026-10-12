import { useState } from 'react'
import type { HookesLawLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { HOOKES_LAW_LAB } from '@/lib/lessonExtrasStrings'
import { calculateSpringState } from '@/content/hookesLawLabData'

interface HookesLawLabProps {
  extra: HookesLawLabExtra
}

export function HookesLawLab({ extra }: HookesLawLabProps) {
  const [loadN, setLoadN] = useState<number>(2.0)

  const springState = calculateSpringState(
    loadN,
    extra.springConstantNPerM,
    extra.unloadedLengthCm,
    extra.limitOfProportionalityN,
  )

  const handleAddForce = (delta: number) => {
    setLoadN((prev) => Math.min(8.0, Math.max(0.0, Number((prev + delta).toFixed(1)))))
  }

  // Pre-generate standard curve points for graph
  const curvePoints = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((f) =>
    calculateSpringState(
      f,
      extra.springConstantNPerM,
      extra.unloadedLengthCm,
      extra.limitOfProportionalityN,
    ),
  )

  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-1 border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            Core & Extended Practical
          </span>
          <h3 className="text-xl font-bold text-content">
            <T value={extra.title} />
          </h3>
        </div>
        <p className="text-sm text-content-muted">
          <T value={extra.hint} />
        </p>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Visual Spring Apparatus (5 cols) */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-elevated p-4 lg:col-span-5">
          <svg viewBox="0 0 320 440" className="h-full w-full max-w-[280px]">
            {/* Stand Base & Clamp */}
            <rect x="20" y="410" width="120" height="15" fill="#475569" rx="2" />
            <rect x="30" y="20" width="12" height="390" fill="#64748B" />
            <rect x="30" y="30" width="100" height="10" fill="#64748B" />
            {/* Top Hook */}
            <circle cx="120" cy="45" r="4" fill="#0F172A" />

            {/* Metre Ruler on the right */}
            <rect x="200" y="30" width="40" height="370" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
            {[...Array(38)].map((_, i) => (
              <g key={`ruler-mark-${i}`}>
                <line
                  x1="200"
                  y1={40 + i * 9.5}
                  x2={i % 5 === 0 ? '220' : '210'}
                  y2={40 + i * 9.5}
                  stroke="#854D0E"
                  strokeWidth={i % 5 === 0 ? '1.5' : '1'}
                />
                {i % 5 === 0 && (
                  <text x="223" y={43 + i * 9.5} fontSize="9" fill="#854D0E" fontWeight="bold">
                    {i} cm
                  </text>
                )}
              </g>
            ))}

            {/* Original length reference line (dashed) */}
            <line
              x1="90"
              y1={40 + extra.unloadedLengthCm * 7.5}
              x2="200"
              y2={40 + extra.unloadedLengthCm * 7.5}
              stroke="#94A3B8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            <text x="70" y={35 + extra.unloadedLengthCm * 7.5} fontSize="8" fill="#64748B">
              l₀ = 15cm
            </text>

            {/* Dynamic Spring Coils */}
            {(() => {
              const springTopY = 45
              // Scale spring visually: each cm of length corresponds to ~7.5 SVG pixels
              const springBottomY = 40 + springState.lengthCm * 7.5
              const coilCount = 12
              const coilHeight = (springBottomY - springTopY) / coilCount
              const pathD = [`M 120,${springTopY}`]
              for (let c = 0; c < coilCount; c++) {
                const y1 = springTopY + c * coilHeight + coilHeight * 0.25
                const y2 = springTopY + c * coilHeight + coilHeight * 0.75
                pathD.push(`Q 105,${y1} 120,${springTopY + (c + 0.5) * coilHeight}`)
                pathD.push(`Q 135,${y2} 120,${springTopY + (c + 1) * coilHeight}`)
              }

              return (
                <g>
                  <path
                    d={pathD.join(' ')}
                    fill="none"
                    stroke={springState.isBeyondLimit ? '#EF4444' : '#0284C7'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Bottom loop */}
                  <circle cx="120" cy={springBottomY} r="3" fill="#0F172A" />

                  {/* Horizontal Pointer extending to ruler */}
                  <line
                    x1="120"
                    y1={springBottomY}
                    x2="205"
                    y2={springBottomY}
                    stroke="#DC2626"
                    strokeWidth="2.5"
                  />
                  <polygon
                    points={`205,${springBottomY} 197,${springBottomY - 4} 197,${springBottomY + 4}`}
                    fill="#DC2626"
                  />

                  {/* Mass Hanger Stem */}
                  <line
                    x1="120"
                    y1={springBottomY}
                    x2="120"
                    y2={springBottomY + 30}
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <line
                    x1="105"
                    y1={springBottomY + 30}
                    x2="135"
                    y2={springBottomY + 30}
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  {/* Slotted Masses Discs */}
                  {Array.from({ length: Math.round(loadN) }).map((_, mIdx) => (
                    <rect
                      key={`mass-disc-${mIdx}`}
                      x="102"
                      y={springBottomY + 24 - mIdx * 5}
                      width="36"
                      height="4.5"
                      fill="#94A3B8"
                      stroke="#475569"
                      rx="1"
                    />
                  ))}
                </g>
              )
            })()}
          </svg>
        </div>

        {/* Right Column: Controls, Readouts, and Live Graph (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Controls */}
          <div className="rounded-xl border border-line bg-surface-muted p-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase text-content-muted">
                <T value={HOOKES_LAW_LAB.hangerControl} /> {loadN.toFixed(1)} N (≈{springState.massG} g)
              </label>
              <button
                type="button"
                onClick={() => setLoadN(0)}
                className="text-xs font-medium text-accent hover:underline"
              >
                <T value={HOOKES_LAW_LAB.resetLoad} />
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={loadN}
              onChange={(e) => setLoadN(parseFloat(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAddForce(0.5)}
                className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
              >
                <T value={HOOKES_LAW_LAB.add50g} />
              </button>
              <button
                type="button"
                onClick={() => handleAddForce(1.0)}
                className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
              >
                <T value={HOOKES_LAW_LAB.add100g} />
              </button>
              <button
                type="button"
                onClick={() => handleAddForce(2.0)}
                className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
              >
                <T value={HOOKES_LAW_LAB.add200g} />
              </button>
            </div>
          </div>

          {/* Alert status banner */}
          <div
            className={`rounded-xl border p-3.5 text-xs font-medium leading-relaxed ${
              springState.isBeyondLimit
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            {springState.isBeyondLimit ? (
              <T value={HOOKES_LAW_LAB.limitReachedAlert} />
            ) : (
              <T value={HOOKES_LAW_LAB.linearRegionNotice} />
            )}
          </div>

          {/* Measurements summary card */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-surface-muted p-3">
              <span className="text-xs text-content-muted">
                <T value={HOOKES_LAW_LAB.unloadedLength} />
              </span>
              <p className="text-base font-bold text-content">{extra.unloadedLengthCm.toFixed(1)} cm</p>
            </div>
            <div className="rounded-xl border border-line bg-surface-muted p-3">
              <span className="text-xs text-content-muted">
                <T value={HOOKES_LAW_LAB.stretchedLength} />
              </span>
              <p className="text-base font-bold text-content">{springState.lengthCm.toFixed(1)} cm</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-3">
              <span className="text-xs text-accent">
                <T value={HOOKES_LAW_LAB.extensionCalculated} />
              </span>
              <p className="text-lg font-extrabold text-accent">{springState.extensionCm.toFixed(1)} cm</p>
            </div>
            <div className="rounded-xl border border-line bg-surface-muted p-3">
              <span className="text-xs text-content-muted">
                <T value={HOOKES_LAW_LAB.springConstantDisplay} />
              </span>
              <p className="text-base font-bold text-content">
                {loadN > 0 && !springState.isBeyondLimit
                  ? `${((loadN / (springState.extensionCm / 100))).toFixed(1)} N/m`
                  : `${extra.springConstantNPerM} N/m`}
              </p>
            </div>
          </div>

          {/* Live SVG Graph: Load (F) vs Extension (Δx) */}
          <div className="rounded-xl border border-line bg-surface-elevated p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">
              <T value={HOOKES_LAW_LAB.graphTitle} />
            </h4>
            <svg viewBox="0 0 360 200" className="w-full" aria-label="Load vs Extension Graph">
              {/* Axes */}
              <line x1="40" y1="170" x2="340" y2="170" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="40" y1="170" x2="40" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Axis labels */}
              <text x="310" y="190" fontSize="10" fill="#64748B" fontWeight="bold">
                Δx (cm)
              </text>
              <text x="10" y="25" fontSize="10" fill="#64748B" fontWeight="bold">
                F (N)
              </text>

              {/* Grid lines */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((fVal) => (
                <g key={`f-tick-${fVal}`}>
                  <line
                    x1="36"
                    y1={170 - fVal * 18}
                    x2="40"
                    y2={170 - fVal * 18}
                    stroke="#94A3B8"
                  />
                  <text x="22" y={173 - fVal * 18} fontSize="8" fill="#94A3B8">
                    {fVal}
                  </text>
                </g>
              ))}

              {/* Limit of Proportionality Marker (at F = 5N, ext = 20cm) */}
              <line
                x1={40 + 20 * 7}
                y1="170"
                x2={40 + 20 * 7}
                y2={170 - 5 * 18}
                stroke="#F59E0B"
                strokeDasharray="2 2"
              />
              <circle cx={40 + 20 * 7} cy={170 - 5 * 18} r="4" fill="#F59E0B" />
              <text x={40 + 20 * 7 + 6} y={170 - 5 * 18 - 4} fontSize="8" fill="#F59E0B" fontWeight="bold">
                Limit (5N, 20cm)
              </text>

              {/* Curve Line */}
              {(() => {
                const pathParts = [`M 40,170`]
                curvePoints.forEach((pt) => {
                  const x = 40 + Math.min(300, pt.extensionCm * 7)
                  const y = 170 - pt.loadN * 18
                  pathParts.push(`L ${x},${y}`)
                })
                return (
                  <path
                    d={pathParts.join(' ')}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                )
              })()}

              {/* Current state highlight point */}
              <circle
                cx={40 + Math.min(300, springState.extensionCm * 7)}
                cy={170 - springState.loadN * 18}
                r="6"
                fill={springState.isBeyondLimit ? '#EF4444' : '#3B82F6'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Examiner Notes */}
      <div className="mt-6 border-t border-line pt-4">
        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
          Examiner Practical Takeaway
        </h4>
        <p className="text-xs leading-relaxed text-content-muted">
          <T value={extra.examinerNotes} />
        </p>
      </div>
    </div>
  )
}
