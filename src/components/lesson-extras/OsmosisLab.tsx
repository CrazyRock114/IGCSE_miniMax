import { useState } from 'react'
import type { OsmosisLabExtra, PotatoTubeSpec } from '@/content/types'
import { T } from '@/components/i18n/T'
import { OSMOSIS_LAB } from '@/lib/lessonExtrasStrings'

type ActiveTab = 'bench' | 'graph' | 'controls'

export function OsmosisLab({ extra }: { extra: OsmosisLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bench')
  const [selectedTubeId, setSelectedTubeId] = useState<string>(extra.tubes[0]?.id ?? 'tube-0')
  const isImmersed = true
  const [isBlotted, setIsBlotted] = useState<boolean>(false)
  const [isWeighed, setIsWeighed] = useState<boolean>(false)

  // Track which tubes student has weighed
  const [weighedTubeIds, setWeighedTubeIds] = useState<string[]>([extra.tubes[0]?.id ?? 'tube-0'])

  const currentTube: PotatoTubeSpec =
    extra.tubes.find((t) => t.id === selectedTubeId) ?? extra.tubes[0]!

  const handleSelectTube = (id: string) => {
    setSelectedTubeId(id)
    setIsBlotted(false)
    setIsWeighed(weighedTubeIds.includes(id))
  }

  const handleBlot = () => {
    setIsBlotted(true)
  }

  const handleWeigh = () => {
    setIsWeighed(true)
    if (!weighedTubeIds.includes(currentTube.id)) {
      setWeighedTubeIds((prev) => [...prev, currentTube.id])
    }
  }

  // Graph coordinate calculations
  // X: 0.0 to 1.0 mol/dm³ -> map to 60px to 440px
  // Y: -40% to +25% -> map to 260px (bottom) to 40px (top), zero line is at:
  // total range = 65%, zero is 25% from top -> 40 + (25/65) * 220 = 124.6px
  const mapX = (conc: number) => 60 + conc * 380
  const mapY = (pct: number) => 40 + ((25 - pct) / 65) * 220
  const zeroY = mapY(0)

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-2" role="tablist">
        {(['bench', 'graph', 'controls'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-ink text-white'
                : 'border border-line bg-white/5 text-ink/70 hover:bg-white/10'
            }`}
          >
            <T
              value={
                tab === 'bench'
                  ? OSMOSIS_LAB.tabBench
                  : tab === 'graph'
                    ? OSMOSIS_LAB.tabGraph
                    : OSMOSIS_LAB.tabControls
              }
            />
          </button>
        ))}
      </div>

      {/* Tab 1: Practical Bench */}
      {activeTab === 'bench' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Test Tube Rack (7 cols) */}
          <div className="flex flex-col items-center rounded-xl border border-line bg-surface p-5 lg:col-span-7">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60 mb-3">
              <T value={OSMOSIS_LAB.stepSelectTube} />
            </h4>

            {/* Test Tube Rack SVG */}
            <div className="w-full flex justify-center py-2">
              <svg viewBox="0 0 460 220" className="h-48 w-full max-w-md">
                {/* Wooden Rack Shelf */}
                <rect x="20" y="150" width="420" height="12" fill="#78350f" rx="3" opacity="0.9" />
                <rect x="20" y="60" width="420" height="10" fill="#92400e" rx="2" opacity="0.8" />
                <rect x="30" y="70" width="12" height="120" fill="#78350f" rx="2" />
                <rect x="418" y="70" width="12" height="120" fill="#78350f" rx="2" />
                <rect x="15" y="185" width="430" height="16" fill="#451a03" rx="4" />

                {/* 6 Boiling Tubes */}
                {extra.tubes.map((tube, idx) => {
                  const tx = 55 + idx * 65
                  const isSelected = tube.id === selectedTubeId
                  const isDone = weighedTubeIds.includes(tube.id)
                  // Liquid opacity / tone slightly deeper for higher sucrose
                  const liquidOpacity = 0.2 + tube.concMol * 0.4

                  return (
                    <g
                      key={tube.id}
                      onClick={() => handleSelectTube(tube.id)}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      {/* Tube rim highlight if selected */}
                      {isSelected && (
                        <rect x={tx - 18} y="15" width="36" height="165" fill="#38bdf8" opacity="0.15" rx="16" />
                      )}

                      {/* Glass Tube Body */}
                      <path
                        d={`M${tx - 12} 25 L${tx - 12} 160 Q${tx - 12} 175 ${tx} 175 Q${tx + 12} 175 ${tx + 12} 160 L${tx + 12} 25 Z`}
                        fill="none"
                        stroke={isSelected ? '#0284c7' : '#94a3b8'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                      />
                      {/* Rim Lip */}
                      <ellipse cx={tx} cy="25" rx="14" ry="4" fill="none" stroke={isSelected ? '#0284c7' : '#94a3b8'} strokeWidth="1.5" />

                      {/* Sucrose Solution Liquid */}
                      <path
                        d={`M${tx - 11} 70 L${tx - 11} 160 Q${tx - 11} 174 ${tx} 174 Q${tx + 11} 174 ${tx + 11} 160 L${tx + 11} 70 Z`}
                        fill="#0284c7"
                        opacity={liquidOpacity}
                      />
                      <ellipse cx={tx} cy="70" rx="11" ry="3" fill="#38bdf8" opacity="0.6" />

                      {/* Potato Cylinder inside tube */}
                      {isImmersed && (
                        <g>
                          <rect
                            x={tx - 6}
                            y="85"
                            width="12"
                            height="75"
                            fill="#fef08a"
                            stroke="#ca8a04"
                            strokeWidth="1.2"
                            rx="4"
                          />
                          {/* Shrunken/wrinkled lines for plasmolysed tubes */}
                          {tube.percentChange < -15 && (
                            <>
                              <line x1={tx - 4} y1="100" x2={tx + 4} y2="105" stroke="#a16207" strokeWidth="1" opacity="0.7" />
                              <line x1={tx - 4} y1="125" x2={tx + 4} y2="130" stroke="#a16207" strokeWidth="1" opacity="0.7" />
                            </>
                          )}
                        </g>
                      )}

                      {/* Label on tube */}
                      <rect x={tx - 24} y="195" width="48" height="18" fill={isSelected ? '#0284c7' : '#f1f5f9'} rx="3" stroke="#cbd5e1" strokeWidth="1" />
                      <text
                        x={tx}
                        y="208"
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#0f172a'}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {tube.concMol}M
                      </text>

                      {/* Check mark badge if weighed */}
                      {isDone && (
                        <circle cx={tx + 14} cy="30" r="6" fill="#10b981" />
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Cylinder condition & Action steps */}
            <div className="mt-4 w-full grid grid-cols-2 gap-3">
              {/* Blot Station */}
              <div className="rounded-lg border border-line bg-white/5 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-ink">
                    <T value={OSMOSIS_LAB.stepBlotDry} />
                  </span>
                  <p className="mt-1 text-xs text-ink/70">
                    {isBlotted ? <T value={OSMOSIS_LAB.blottedSuccess} /> : <T value={OSMOSIS_LAB.blotPrompt} />}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBlot}
                  className={`mt-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    isBlotted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-ink text-white hover:opacity-90'
                  }`}
                >
                  {isBlotted ? '✓ Blotted Dry' : '🧻 Blot Dry'}
                </button>
              </div>

              {/* Digital Balance Station */}
              <div className="rounded-lg border border-line bg-white/5 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-ink">
                    <T value={OSMOSIS_LAB.stepWeigh} />
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-lg font-bold text-accent">
                      {isWeighed ? `${currentTube.finalMassG.toFixed(2)} g` : '0.00 g'}
                    </span>
                    <span className="text-xs text-ink/50">(m₂)</span>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!isBlotted}
                  onClick={handleWeigh}
                  className={`mt-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    !isBlotted
                      ? 'opacity-40 cursor-not-allowed bg-white/10 text-ink/40'
                      : isWeighed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-accent text-white hover:opacity-90'
                  }`}
                >
                  {isWeighed ? '✓ Recorded' : '⚖️ Weigh on Balance'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Telemetry & Results Readout (5 cols) */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* Real-time Math Card */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <h4 className="text-sm font-semibold text-ink flex items-center justify-between">
                <span>{currentTube.concMol} mol/dm³ Sucrose</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    currentTube.percentChange > 0
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : currentTube.percentChange === 0
                        ? 'bg-sky-500/15 text-sky-400'
                        : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {currentTube.percentChange > 0
                    ? `+${currentTube.percentChange}%`
                    : `${currentTube.percentChange}%`}
                </span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-white/5 p-2 border border-line/60">
                  <span className="text-ink/60"><T value={OSMOSIS_LAB.initialMass} />:</span>
                  <p className="font-mono text-sm font-bold text-ink">{currentTube.initialMassG.toFixed(2)} g</p>
                </div>
                <div className="rounded bg-white/5 p-2 border border-line/60">
                  <span className="text-ink/60"><T value={OSMOSIS_LAB.finalMass} />:</span>
                  <p className="font-mono text-sm font-bold text-ink">
                    {isWeighed ? `${currentTube.finalMassG.toFixed(2)} g` : '—'}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-accent/10 border border-accent/20 p-2.5 text-xs text-accent">
                <p className="font-mono font-semibold">
                  <T value={OSMOSIS_LAB.formulaHint} />
                </p>
                {isWeighed && (
                  <p className="mt-1 font-mono">
                    %Δm = [({currentTube.finalMassG} - {currentTube.initialMassG}) ÷ {currentTube.initialMassG}] × 100 ={' '}
                    <strong>{currentTube.percentChange}%</strong>
                  </p>
                )}
              </div>

              {/* Tissue State Note */}
              <div className="rounded bg-white/5 p-2.5 text-xs text-ink/80 border border-line/60 space-y-1">
                <p className="font-semibold text-ink">
                  <T
                    value={
                      currentTube.cellState === 'turgid'
                        ? OSMOSIS_LAB.turgidLabel
                        : currentTube.cellState === 'equilibrium'
                          ? OSMOSIS_LAB.equilibriumLabel
                          : currentTube.cellState === 'flaccid'
                            ? OSMOSIS_LAB.flaccidLabel
                            : OSMOSIS_LAB.plasmolysedLabel
                    }
                  />
                </p>
                <p>{currentTube.note.en}</p>
                <p className="text-ink/50" data-zh>{currentTube.note.zh}</p>
              </div>
            </div>

            {/* Isotonic Callout Banner */}
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3.5 text-xs text-sky-400 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <span>🎯</span> <T value={OSMOSIS_LAB.isotonicFound} />
              </p>
              <p className="text-sky-300/80">
                Notice: At 0.35 mol/dm³, the line crosses the zero axis. This proves that potato cell sap has a concentration of exactly 0.35 mol/dm³!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Graph Plot & Results Table */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          {/* Data Table */}
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-line bg-white/5 text-ink/60 uppercase font-semibold">
                <tr>
                  <th className="p-3">Tube</th>
                  <th className="p-3">Sucrose (mol/dm³)</th>
                  <th className="p-3">Initial Mass (g)</th>
                  <th className="p-3">Final Mass (g)</th>
                  <th className="p-3">Change in Mass (%)</th>
                  <th className="p-3">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 font-mono">
                {extra.tubes.map((tube) => (
                  <tr
                    key={tube.id}
                    className={tube.concMol === extra.cellSapConc ? 'bg-sky-500/10 font-bold' : ''}
                  >
                    <td className="p-3 text-ink font-sans">{tube.id}</td>
                    <td className="p-3 text-ink">{tube.concMol.toFixed(2)}</td>
                    <td className="p-3 text-ink/80">{tube.initialMassG.toFixed(2)}</td>
                    <td className="p-3 text-ink/80">{tube.finalMassG.toFixed(2)}</td>
                    <td
                      className={`p-3 ${
                        tube.percentChange > 0
                          ? 'text-emerald-500'
                          : tube.percentChange === 0
                            ? 'text-sky-500 font-bold'
                            : 'text-rose-500'
                      }`}
                    >
                      {tube.percentChange > 0 ? `+${tube.percentChange}%` : `${tube.percentChange}%`}
                    </td>
                    <td className="p-3 text-ink/70 font-sans capitalize">{tube.cellState}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paper 5/6 Coordinate Plot */}
          <div className="rounded-xl border border-line bg-surface p-5">
            <h4 className="text-sm font-semibold text-ink mb-1">
              Percentage Change in Mass vs. Sucrose Concentration
            </h4>
            <p className="text-xs text-ink/60 mb-4">
              The x-intercept identifies the exact concentration of cell sap (no net water movement).
            </p>

            <div className="flex justify-center">
              <svg viewBox="0 0 500 300" className="w-full max-w-xl bg-white/5 rounded-lg border border-line p-2">
                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const x = 60 + i * 76
                  return (
                    <line key={`gx-${i}`} x1={x} y1="30" x2={x} y2="270" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                  )
                })}
                {Array.from({ length: 6 }).map((_, i) => {
                  const y = 40 + i * 44
                  return (
                    <line key={`gy-${i}`} x1="50" y1={y} x2="450" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                  )
                })}

                {/* X Axis */}
                <line x1="50" y1="270" x2="460" y2="270" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="255" y="295" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                  Sucrose concentration (mol/dm³)
                </text>

                {/* Y Axis */}
                <line x1="60" y1="30" x2="60" y2="270" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="20" y="150" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" transform="rotate(-90 20 150)">
                  % Change in Mass
                </text>

                {/* ZERO LINE Highlight */}
                <line x1="50" y1={zeroY} x2="450" y2={zeroY} stroke="#38bdf8" strokeWidth="2" />
                <text x="45" y={zeroY + 4} textAnchor="end" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  0%
                </text>

                {/* X-axis tick labels */}
                {[0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map((c) => (
                  <text key={c} x={mapX(c)} y="284" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    {c.toFixed(1)}
                  </text>
                ))}

                {/* Best Fit Curve */}
                <path
                  d={`M${mapX(0.0)} ${mapY(20.0)} Q${mapX(0.18)} ${mapY(10.0)} ${mapX(0.35)} ${mapY(0)} T${mapX(0.7)} ${mapY(-19.3)} T${mapX(1.0)} ${mapY(-35.0)}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />

                {/* Plotted Points */}
                {extra.tubes.map((tube) => {
                  const px = mapX(tube.concMol)
                  const py = mapY(tube.percentChange)
                  return (
                    <g key={tube.id}>
                      <line x1={px - 4} y1={py - 4} x2={px + 4} y2={py + 4} stroke="#ef4444" strokeWidth="2" />
                      <line x1={px - 4} y1={py + 4} x2={px + 4} y2={py - 4} stroke="#ef4444" strokeWidth="2" />
                      <circle cx={px} cy={py} r="4" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                    </g>
                  )
                })}

                {/* Highlighted Intercept */}
                <circle cx={mapX(0.35)} cy={zeroY} r="7" fill="#38bdf8" opacity="0.4" />
                <circle cx={mapX(0.35)} cy={zeroY} r="3" fill="#0284c7" />
                <line x1={mapX(0.35)} y1={zeroY} x2={mapX(0.35) + 40} y2={zeroY - 35} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                <rect x={mapX(0.35) + 45} y={zeroY - 48} width="165" height="24" fill="#0f172a" rx="4" stroke="#38bdf8" strokeWidth="1" />
                <text x={mapX(0.35) + 52} y={zeroY - 32} fill="#38bdf8" fontSize="10" fontWeight="bold">
                  Cell sap conc = 0.35 mol/dm³
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Controlled Variables & Paper 6 Tips */}
      {activeTab === 'controls' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-5 space-y-3">
            <h4 className="text-sm font-semibold text-ink">
              <T value={OSMOSIS_LAB.tabControls} />
            </h4>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {extra.controlVariables.map((ctrl, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-lg border border-line bg-white/5 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400 font-bold">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-ink">{ctrl.en}</p>
                    <p className="text-xs text-ink/60" data-zh>{ctrl.zh}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs space-y-2">
            <h4 className="font-semibold text-accent flex items-center gap-1.5">
              <span>💡</span> Paper 6 Mark Scheme Guidance
            </h4>
            <p className="font-medium text-ink">{extra.examinerNotes.en}</p>
            <p className="text-ink/60" data-zh>{extra.examinerNotes.zh}</p>
          </div>
        </div>
      )}
    </div>
  )
}
