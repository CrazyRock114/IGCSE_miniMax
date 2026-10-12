import { useState, useEffect } from 'react'
import type { ElectrolysisLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { ELECTROLYSIS_LAB } from '@/lib/lessonExtrasStrings'
import { calculateGasYield } from '@/content/electrolysisLabData'

type ActiveTab = 'bench' | 'equations' | 'rules'

export function ElectrolysisLab({ extra }: { extra: ElectrolysisLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bench')
  const [scenarioId, setScenarioId] = useState<string>(
    extra.scenarios[0]?.id ?? 'molten-lead-bromide'
  )
  const [powerOn, setPowerOn] = useState<boolean>(false)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)
  const [tick, setTick] = useState<number>(0)

  const activeScenario =
    extra.scenarios.find((s) => s.id === scenarioId) ?? extra.scenarios[0]!

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (powerOn) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
        setTick((prev) => (prev + 1) % 100)
      }, 500)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [powerOn])

  const currentAmps = powerOn ? 2.0 : 0.0
  const yieldResult = calculateGasYield(scenarioId, currentAmps, elapsedSeconds)

  const handleReset = () => {
    setPowerOn(false)
    setElapsedSeconds(0)
  }

  // Visual cues based on scenario
  const isMolten = !activeScenario.isAqueous
  const isCopperRefining = scenarioId === 'copper-refining'
  const electrolyteBgColor = isMolten
    ? 'rgba(234, 88, 12, 0.25)' // Molten orange
    : isCopperRefining
      ? 'rgba(14, 165, 233, 0.4)' // Bright CuSO4 blue
      : 'rgba(203, 213, 225, 0.2)' // Clear aqueous

  const cathodeProductColor =
    scenarioId === 'molten-lead-bromide'
      ? '#94a3b8' // Silvery lead
      : scenarioId === 'copper-refining'
        ? '#b45309' // Pinkish-brown copper
        : '#38bdf8' // H2 gas

  const anodeProductColor =
    scenarioId === 'molten-lead-bromide'
      ? '#b91c1c' // Red-brown bromine
      : scenarioId === 'concentrated-nacl'
        ? '#84cc16' // Pale yellow-green chlorine
        : scenarioId === 'dilute-sulfuric-acid'
          ? '#67e8f9' // Oxygen gas
          : '#0284c7' // Cu2+ dissolving

  return (
    <div className="my-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-sm font-bold">
              ⚡
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
            onClick={() => setActiveTab('bench')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'bench'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={ELECTROLYSIS_LAB.tabBench} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('equations')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'equations'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={ELECTROLYSIS_LAB.tabEquations} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'rules'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={ELECTROLYSIS_LAB.tabRules} />
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          <T value={ELECTROLYSIS_LAB.selectScenario} />
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {extra.scenarios.map((sc) => {
            const isSelected = sc.id === scenarioId
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setScenarioId(sc.id)
                  handleReset()
                }}
                className={`flex flex-col rounded-xl border p-2.5 text-left transition-all ${
                  isSelected
                    ? 'border-sky-400 bg-sky-950/40 text-white shadow-md shadow-sky-950/50'
                    : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
                }`}
              >
                <span className="font-mono text-xs text-sky-400 font-bold">
                  {sc.electrolyteFormula}
                </span>
                <span className="mt-1 text-xs font-semibold leading-snug line-clamp-2">
                  <T value={sc.name} />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'bench' && (
        <div className="space-y-6">
          {/* Controls & Power Pack Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPowerOn((prev) => !prev)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg transition-all ${
                  powerOn
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                <T value={powerOn ? ELECTROLYSIS_LAB.powerOff : ELECTROLYSIS_LAB.powerOn} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-600 bg-slate-700/40 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              >
                ↺ Reset
              </button>
            </div>

            {/* Readouts */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">
                  <T value={ELECTROLYSIS_LAB.voltageLabel} />:
                </span>
                <span className="font-bold text-amber-400">{powerOn ? '6.0 V' : '0.0 V'}</span>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">
                  <T value={ELECTROLYSIS_LAB.currentLabel} />:
                </span>
                <span className="font-bold text-sky-400">{currentAmps.toFixed(1)} A</span>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">
                  <T value={ELECTROLYSIS_LAB.elapsedTime} />:
                </span>
                <span className="font-bold text-emerald-400">{elapsedSeconds} s</span>
              </div>
            </div>
          </div>

          {/* Interactive Cell SVG Graphic */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 to-slate-900 p-4">
            {/* External Circuit Electron Flow Banner */}
            <div className="mb-2 text-center text-xs font-mono text-slate-400">
              <T value={ELECTROLYSIS_LAB.electronFlow} />
            </div>

            <svg
              viewBox="0 0 700 360"
              className="w-full h-auto max-h-[420px]"
              role="img"
              aria-label="Electrolytic Cell Simulation Diagram"
            >
              <defs>
                <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="cathodeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Power Supply Box at Top */}
              <rect
                x="260"
                y="15"
                width="180"
                height="60"
                rx="8"
                fill="#0f172a"
                stroke={powerOn ? '#38bdf8' : '#475569'}
                strokeWidth="2"
              />
              <text x="350" y="40" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                DC POWER PACK (6V)
              </text>
              <circle cx="310" cy="55" r="5" fill={powerOn ? '#ef4444' : '#64748b'} />
              <text x="325" y="58" fill="#ef4444" fontSize="12" fontWeight="bold">
                + (Anode)
              </text>
              <circle cx="390" cy="55" r="5" fill={powerOn ? '#3b82f6' : '#64748b'} />
              <text x="375" y="58" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="end">
                - (Cathode)
              </text>

              {/* Connecting Wires */}
              <path
                d="M 310 55 L 190 55 L 190 120"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray={powerOn ? '6 4' : 'none'}
              />
              <path
                d="M 390 55 L 510 55 L 510 120"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray={powerOn ? '6 4' : 'none'}
              />

              {/* Beaker / Electrolytic Cell Body */}
              <rect
                x="120"
                y="110"
                width="460"
                height="220"
                rx="16"
                fill="none"
                stroke="#475569"
                strokeWidth="4"
              />
              {/* Electrolyte Fluid Level */}
              <rect
                x="124"
                y="140"
                width="452"
                height="186"
                rx="12"
                fill={electrolyteBgColor}
              />
              <line x1="124" y1="140" x2="576" y2="140" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

              {/* ANODE (+) on Left (x=175) */}
              <rect
                x="175"
                y="90"
                width="32"
                height="190"
                rx="4"
                fill="url(#anodeGrad)"
                stroke="#ef4444"
                strokeWidth="2"
              />
              {/* CATHODE (-) on Right (x=495) */}
              <rect
                x="493"
                y="90"
                width="32"
                height="190"
                rx="4"
                fill="url(#cathodeGrad)"
                stroke="#38bdf8"
                strokeWidth="2"
              />

              {/* Labels on Electrodes */}
              <text x="191" y="80" fill="#f87171" fontSize="13" textAnchor="middle" fontWeight="bold">
                ANODE (+)
              </text>
              <text x="509" y="80" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">
                CATHODE (-)
              </text>

              {/* Anode Active Bubbles / Products when Power On */}
              {powerOn && (
                <g>
                  {/* Bubbles on Anode */}
                  <circle cx="170" cy={230 - ((tick * 3) % 80)} r="4" fill={anodeProductColor} opacity="0.8" />
                  <circle cx="212" cy={250 - (((tick + 20) * 3) % 90)} r="5" fill={anodeProductColor} opacity="0.8" />
                  <circle cx="191" cy={210 - (((tick + 40) * 3) % 70)} r="3.5" fill={anodeProductColor} opacity="0.8" />
                  <circle cx="215" cy={180 - (((tick + 60) * 3) % 60)} r="4.5" fill={anodeProductColor} opacity="0.8" />

                  {/* Bubbles / Deposition on Cathode */}
                  {scenarioId === 'copper-refining' ? (
                    <rect
                      x="490"
                      y="145"
                      width="38"
                      height="135"
                      fill="#b45309"
                      opacity="0.85"
                      rx="3"
                    />
                  ) : scenarioId === 'molten-lead-bromide' ? (
                    <g>
                      <circle cx="509" cy="275" r="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="498" cy="282" r="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="520" cy="282" r="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                    </g>
                  ) : (
                    <g>
                      <circle cx="488" cy={230 - ((tick * 4) % 80)} r="4" fill={cathodeProductColor} opacity="0.8" />
                      <circle cx="530" cy={250 - (((tick + 15) * 4) % 90)} r="4.5" fill={cathodeProductColor} opacity="0.8" />
                      <circle cx="509" cy={210 - (((tick + 35) * 4) % 70)} r="3.5" fill={cathodeProductColor} opacity="0.8" />
                      <circle cx="485" cy={175 - (((tick + 55) * 4) % 55)} r="5" fill={cathodeProductColor} opacity="0.8" />
                    </g>
                  )}
                </g>
              )}

              {/* Mobile Ions in Solution */}
              {activeScenario.ionsPresent?.map((ion, idx) => {
                const isCation = ion.includes('+') || ion.includes('²⁺')
                const baseX = isCation ? 380 + (idx % 2) * 50 : 250 + (idx % 2) * 50
                const baseY = 180 + Math.floor(idx / 2) * 45
                const driftX = powerOn ? (isCation ? (tick % 20) : -(tick % 20)) : 0

                return (
                  <g key={ion} transform={`translate(${baseX + driftX}, ${baseY})`}>
                    <circle cx="0" cy="0" r="14" fill="#0f172a" stroke={isCation ? '#38bdf8' : '#ef4444'} strokeWidth="1.5" />
                    <text
                      x="0"
                      y="4"
                      fill={isCation ? '#38bdf8' : '#f87171'}
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {ion}
                    </text>
                  </g>
                )
              })}

              {/* Crucible Flame Indicator if Molten */}
              {isMolten && (
                <g transform="translate(350, 345)">
                  <polygon points="-20,0 0,-15 20,0 10,10 -10,10" fill="#f97316" opacity="0.9" />
                  <polygon points="-10,0 0,-8 10,0 5,6 -5,6" fill="#fde047" opacity="0.9" />
                  <text x="0" y="25" fill="#f97316" fontSize="10" textAnchor="middle" fontWeight="bold">
                    BUNSEN HEAT (Maintains molten PbBr₂)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Quick Observations Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Anode Card */}
            <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  <T value={ELECTROLYSIS_LAB.anodeLabel} />
                </span>
                <span className="font-mono text-xs font-bold text-red-300">
                  <T value={activeScenario.anodeProduct} />
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="font-mono font-bold text-red-200">
                  {activeScenario.anodeHalfEquation}
                </div>
                <p className="text-slate-300">
                  <T value={activeScenario.observationAnode} />
                </p>
                {yieldResult.anodeVolumeCm3 > 0 && (
                  <div className="pt-1 text-slate-400">
                    Gas yield: <span className="font-bold text-white">{yieldResult.anodeVolumeCm3} cm³</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cathode Card */}
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  <T value={ELECTROLYSIS_LAB.cathodeLabel} />
                </span>
                <span className="font-mono text-xs font-bold text-sky-300">
                  <T value={activeScenario.cathodeProduct} />
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="font-mono font-bold text-sky-200">
                  {activeScenario.cathodeHalfEquation}
                </div>
                <p className="text-slate-300">
                  <T value={activeScenario.observationCathode} />
                </p>
                {yieldResult.cathodeVolumeCm3 > 0 && (
                  <div className="pt-1 text-slate-400">
                    Gas yield: <span className="font-bold text-white">{yieldResult.cathodeVolumeCm3} cm³</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'equations' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-4">
            <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
              <T value={activeScenario.name} />
              <span className="text-slate-400 font-normal">— Mechanism &amp; Half-Equations</span>
            </h4>

            {/* Detail rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-semibold text-slate-400">
                  <T value={ELECTROLYSIS_LAB.electrodesUsed} />
                </span>
                <p className="font-medium text-slate-200">
                  {activeScenario.electrodes ? <T value={activeScenario.electrodes} /> : 'Inert Carbon'}
                </p>
              </div>

              <div className="space-y-1 rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-semibold text-slate-400">
                  <T value={ELECTROLYSIS_LAB.ionsInElectrolyte} />
                </span>
                <p className="font-mono font-bold text-sky-300">
                  {activeScenario.ionsPresent?.join(', ') ?? 'N/A'}
                </p>
              </div>
            </div>

            {/* Half equations side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  <T value={ELECTROLYSIS_LAB.anodeLabel} />
                </span>
                <div className="my-2 text-base font-mono font-extrabold text-white">
                  {activeScenario.anodeHalfEquation}
                </div>
                <p className="text-xs text-slate-300">
                  <T value={activeScenario.observationAnode} />
                </p>
              </div>

              <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <T value={ELECTROLYSIS_LAB.cathodeLabel} />
                </span>
                <div className="my-2 text-base font-mono font-extrabold text-white">
                  {activeScenario.cathodeHalfEquation}
                </div>
                <p className="text-xs text-slate-300">
                  <T value={activeScenario.observationCathode} />
                </p>
              </div>
            </div>

            {/* Stoichiometric Gas Ratio if applicable */}
            {yieldResult.ratioCathodeToAnode !== 'N/A' && (
              <div className="rounded-lg border border-sky-500/30 bg-sky-950/30 p-3 text-xs flex items-center justify-between">
                <span className="font-semibold text-sky-300">
                  <T value={ELECTROLYSIS_LAB.gasRatioLabel} />
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {yieldResult.ratioCathodeToAnode}
                </span>
              </div>
            )}

            {/* Solution Change */}
            {activeScenario.solutionObservation && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-3 text-xs">
                <span className="font-bold text-amber-400 block mb-1">
                  <T value={ELECTROLYSIS_LAB.solutionChange} />:
                </span>
                <p className="text-slate-300">
                  <T value={activeScenario.solutionObservation} />
                </p>
              </div>
            )}

            {/* Scientific explanation */}
            <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-700/50 text-xs leading-relaxed text-slate-300">
              <span className="font-bold text-white block mb-1">IGCSE Examiner Explanation:</span>
              <T value={activeScenario.explanation} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-4">
          {/* Mnemonics Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
              <div className="font-mono text-base font-extrabold text-sky-300">P.A.N.I.C.</div>
              <p className="mt-1 text-xs text-slate-300">
                <T value={ELECTROLYSIS_LAB.panicMnemonic} />
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="font-mono text-base font-extrabold text-emerald-300">RED CAT &amp; AN OX</div>
              <p className="mt-1 text-xs text-slate-300">
                <T value={ELECTROLYSIS_LAB.redCatMnemonic} />
              </p>
            </div>
          </div>

          {/* Selective Discharge Rules */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-4 text-xs">
            <h4 className="text-sm font-bold text-white">
              Selective Discharge In Aqueous Solutions (Cambridge 0620 Hierarchy)
            </h4>

            <div className="space-y-3 leading-relaxed text-slate-300">
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-sky-400 block mb-1">
                  1. At the Cathode (Negative Electrode - Reduction):
                </span>
                <p>
                  Metals lower than hydrogen in the reactivity series (Cu²⁺, Ag⁺) are discharged as pure metal.
                  If the metal is more reactive than hydrogen (K⁺, Na⁺, Ca²⁺, Mg²⁺, Al³⁺, Zn²⁺, Fe²⁺), H⁺ is discharged preferentially, yielding <strong>hydrogen gas (H₂)</strong>.
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-red-400 block mb-1">
                  2. At the Anode (Positive Electrode - Oxidation):
                </span>
                <p>
                  In concentrated solutions of halides (Cl⁻, Br⁻, I⁻), the halogen gas is discharged preferentially (Cl₂, Br₂, I₂).
                  In all other cases (sulfates SO₄²⁻, nitrates NO₃⁻, or dilute solutions), hydroxide (OH⁻) is discharged preferentially, yielding <strong>oxygen gas (O₂)</strong>.
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-amber-400 block mb-1">
                  3. Active vs Inert Electrodes:
                </span>
                <p>
                  Inert electrodes (graphite / carbon or platinum) do not participate in the reaction.
                  Active electrodes (such as copper in copper refining) dissolve at the anode: <code className="font-mono text-amber-300">Cu(s) → Cu²⁺ + 2e⁻</code>, replenishing the electrolyte continuously.
                </p>
              </div>
            </div>

            {/* Examiner Notes */}
            <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-amber-200">
              <span className="font-bold block mb-1">💡 Examiner Pitfall:</span>
              <T value={extra.examinerNotes} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
