import { useState } from 'react'
import type { EnergeticsLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { ENERGETICS_LAB } from '@/lib/lessonExtrasStrings'
import {
  defaultEnergeticsLabData,
  calculateEnthalpyChange
} from '@/content/energeticsLabData'

type ActiveTab = 'profile' | 'bonds' | 'catalyst'

export function EnergeticsLab({ extra }: { extra: EnergeticsLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile')
  const [reactionId, setReactionId] = useState<string>('methane-combustion')
  const [showCatalyst, setShowCatalyst] = useState<boolean>(false)

  const reactionsList = extra.reactions ?? defaultEnergeticsLabData.reactions
  const activeReaction =
    reactionsList.find((r) => r.id === reactionId) ?? reactionsList[0]!

  const bondCalc = calculateEnthalpyChange(
    activeReaction.bondsBroken,
    activeReaction.bondsFormed
  )

  // Energy profile diagram coordinates in SVG (viewBox 0 0 600 320)
  // Reactants level: y = 200
  // Peak (uncatalysed): y = 60
  // Peak (catalysed): y = 110
  // Products level: if exothermic, y = 250; if endothermic, y = 140
  const isExo = activeReaction.isExothermic
  const reactantsY = isExo ? 180 : 230
  const productsY = isExo ? 250 : 130
  const peakY = 50
  const catalysedPeakY = 100

  // Bezier curve paths
  const uncatCurve = `M 60 ${reactantsY} L 160 ${reactantsY} C 220 ${reactantsY}, 240 ${peakY}, 300 ${peakY} C 360 ${peakY}, 380 ${productsY}, 440 ${productsY} L 540 ${productsY}`
  const catCurve = `M 60 ${reactantsY} L 160 ${reactantsY} C 220 ${reactantsY}, 240 ${catalysedPeakY}, 300 ${catalysedPeakY} C 360 ${catalysedPeakY}, 380 ${productsY}, 440 ${productsY} L 540 ${productsY}`

  return (
    <div className="my-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-sm font-bold">
              🔥
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              <T value={extra.title} />
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            <T value={extra.hint} />
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-lg bg-slate-800/80 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'profile'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={ENERGETICS_LAB.tabProfile} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bonds')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'bonds'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={ENERGETICS_LAB.tabBonds} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('catalyst')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'catalyst'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={ENERGETICS_LAB.tabCatalyst} />
          </button>
        </div>
      </div>

      {/* Reaction Selector */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          <T value={ENERGETICS_LAB.selectReaction} />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {reactionsList.map((rxn) => {
            const isSelected = rxn.id === reactionId
            return (
              <button
                key={rxn.id}
                type="button"
                onClick={() => setReactionId(rxn.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-sky-400 bg-sky-950/40 text-white shadow-md'
                    : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={rxn.isExothermic ? 'text-amber-400' : 'text-sky-400'}>
                    {rxn.isExothermic ? 'EXOTHERMIC' : 'ENDOTHERMIC'}
                  </span>
                  <span className="font-bold text-white">
                    ΔH = {rxn.deltaH > 0 ? `+${rxn.deltaH}` : rxn.deltaH} kJ/mol
                  </span>
                </div>
                <div className="mt-1 text-xs font-semibold leading-tight line-clamp-2">
                  <T value={rxn.name} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Reaction Equation & Catalyst Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
            <div>
              <span className="text-xs text-slate-400 block">Chemical Reaction:</span>
              <span className="font-mono text-sm font-bold text-sky-300">
                {activeReaction.equation}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowCatalyst((prev) => !prev)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
                showCatalyst
                  ? 'border-emerald-400 bg-emerald-500 text-slate-950 shadow-emerald-500/20 shadow-md'
                  : 'border-slate-600 bg-slate-700/50 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <T value={ENERGETICS_LAB.btnToggleCatalyst} /> ({showCatalyst ? 'Active' : 'Inactive'})
            </button>
          </div>

          {/* SVG Energy Profile Diagram */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 p-4">
            <svg
              viewBox="0 0 600 320"
              className="w-full h-auto max-h-[380px]"
              role="img"
              aria-label="Reaction Energy Level Diagram"
            >
              {/* Axes */}
              <line x1="50" y1="280" x2="560" y2="280" stroke="#475569" strokeWidth="2" />
              <line x1="50" y1="280" x2="50" y2="30" stroke="#475569" strokeWidth="2" />

              {/* Axis Arrowheads */}
              <polygon points="560,280 550,275 550,285" fill="#475569" />
              <polygon points="50,30 45,40 55,40" fill="#475569" />

              {/* Axis Labels */}
              <text x="310" y="305" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Progress of Reaction
              </text>
              <text x="25" y="160" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform="rotate(-90 25 160)">
                Enthalpy / Potential Energy (H)
              </text>

              {/* Uncatalysed Curve */}
              <path
                d={uncatCurve}
                fill="none"
                stroke={isExo ? '#f59e0b' : '#38bdf8'}
                strokeWidth="3.5"
              />

              {/* Catalysed Curve if toggled */}
              {showCatalyst && (
                <path
                  d={catCurve}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                />
              )}

              {/* Reactants Plateau Label */}
              <text x="110" y={reactantsY - 12} fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                Reactants
              </text>
              {/* Products Plateau Label */}
              <text x="490" y={productsY - 12} fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                Products
              </text>

              {/* Activation Energy Ea Arrow (from Reactants level to Peak) */}
              <line x1="200" y1={reactantsY} x2="300" y2={reactantsY} stroke="#64748b" strokeDasharray="3 3" />
              <line x1="300" y1={reactantsY} x2="300" y2={peakY} stroke="#ef4444" strokeWidth="2" />
              <polygon points="300,peakY 296,peakY+8 304,peakY+8" fill="#ef4444" />
              <text x="312" y={(reactantsY + peakY) / 2} fill="#ef4444" fontSize="10" fontWeight="bold">
                Eₐ (Uncatalysed)
              </text>

              {/* Catalysed Ea Arrow if active */}
              {showCatalyst && (
                <g>
                  <line x1="280" y1={reactantsY} x2="280" y2={catalysedPeakY} stroke="#10b981" strokeWidth="2" />
                  <polygon points="280,catalysedPeakY 276,catalysedPeakY+8 284,catalysedPeakY+8" fill="#10b981" />
                  <text x="210" y={(reactantsY + catalysedPeakY) / 2} fill="#10b981" fontSize="10" fontWeight="bold">
                    Eₐ (Catalysed)
                  </text>
                </g>
              )}

              {/* Enthalpy Change ΔH Arrow (from Reactants to Products) */}
              <line x1="440" y1={reactantsY} x2="480" y2={reactantsY} stroke="#64748b" strokeDasharray="3 3" />
              <line x1="480" y1={reactantsY} x2="480" y2={productsY} stroke="#38bdf8" strokeWidth="2.5" />
              <polygon
                points={
                  isExo
                    ? `480,${productsY} 476,${productsY - 8} 484,${productsY - 8}`
                    : `480,${productsY} 476,${productsY + 8} 484,${productsY + 8}`
                }
                fill="#38bdf8"
              />
              <text x="492" y={(reactantsY + productsY) / 2 + 4} fill="#38bdf8" fontSize="11" fontWeight="bold">
                ΔH = {activeReaction.deltaH} kJ/mol
              </text>
            </svg>
          </div>

          {/* Exothermic / Endothermic Rule Banner */}
          <div
            className={`rounded-xl border p-4 text-xs ${
              isExo
                ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
                : 'border-sky-500/30 bg-sky-950/20 text-sky-200'
            }`}
          >
            <T
              value={
                isExo
                  ? ENERGETICS_LAB.exothermicNotice
                  : ENERGETICS_LAB.endothermicNotice
              }
            />
          </div>
        </div>
      )}

      {activeTab === 'bonds' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700/40 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Formula: <T value={ENERGETICS_LAB.bondFormula} />
              </span>
              <span className="font-mono text-sm font-bold text-white">
                ΔH = {bondCalc.totalBroken} - {bondCalc.totalFormed} = {bondCalc.deltaH} kJ/mol
              </span>
            </div>

            {/* Side-by-side Bonds Broken vs Bonds Formed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Bonds Broken (ENDO) */}
              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 space-y-3">
                <span className="font-bold text-red-400 uppercase tracking-wider block">
                  <T value={ENERGETICS_LAB.bondsBrokenTitle} />
                </span>
                <div className="space-y-2">
                  {activeReaction.bondsBroken.map((b) => (
                    <div
                      key={b.bond}
                      className="flex justify-between items-center rounded-lg bg-slate-900/60 p-2.5 border border-slate-700/40 font-mono"
                    >
                      <span className="text-slate-200">
                        {b.count} × {b.bond} ({b.energy} kJ/mol)
                      </span>
                      <span className="font-bold text-red-300">
                        +{b.count * b.energy} kJ
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-red-500/20 flex justify-between font-mono font-bold">
                  <span className="text-red-400">Total Energy IN:</span>
                  <span className="text-white">+{bondCalc.totalBroken} kJ/mol</span>
                </div>
              </div>

              {/* Bonds Formed (EXO) */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3">
                <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                  <T value={ENERGETICS_LAB.bondsFormedTitle} />
                </span>
                <div className="space-y-2">
                  {activeReaction.bondsFormed.map((b) => (
                    <div
                      key={b.bond}
                      className="flex justify-between items-center rounded-lg bg-slate-900/60 p-2.5 border border-slate-700/40 font-mono"
                    >
                      <span className="text-slate-200">
                        {b.count} × {b.bond} ({b.energy} kJ/mol)
                      </span>
                      <span className="font-bold text-emerald-300">
                        +{b.count * b.energy} kJ
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-emerald-500/20 flex justify-between font-mono font-bold">
                  <span className="text-emerald-400">Total Energy OUT:</span>
                  <span className="text-white">-{bondCalc.totalFormed} kJ/mol</span>
                </div>
              </div>
            </div>

            {/* Mnemonic callout */}
            <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/50 text-xs text-slate-300">
              <span className="font-bold text-amber-300 mr-2">Mnemonic:</span>
              <strong>BENDO MEXO</strong> — <u>B</u>reaking bonds is <u>ENDO</u>thermic (requires energy), <u>M</u>aking bonds is <u>EXO</u>thermic (releases energy).
            </div>
          </div>
        </div>
      )}

      {activeTab === 'catalyst' && (
        <div className="space-y-4 text-xs">
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-3 leading-relaxed text-slate-300">
            <h4 className="text-sm font-bold text-white">
              How Catalysts Accelerate Chemical Reactions
            </h4>
            <p>
              A catalyst provides an alternative reaction pathway that possesses a significantly lower activation energy (<code className="font-mono text-emerald-300">Eₐ</code>).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-sky-400 block mb-1">Effect on Activation Energy (Eₐ):</span>
                <p>
                  Because the energy threshold is lowered, a vastly greater fraction of colliding particles have kinetic energy <code className="font-mono text-white">E ≥ Eₐ</code>, resulting in far more frequent successful collisions per second.
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-amber-400 block mb-1">Effect on Enthalpy Change (ΔH):</span>
                <p>
                  Crucially, the energies of initial reactants and final products are completely unchanged. Therefore, <code className="font-mono text-white">ΔH</code> is <strong>NEVER</strong> altered by a catalyst!
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-amber-200">
            <span className="font-bold block mb-1 text-sm">💡 Cambridge Examiner Note:</span>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
