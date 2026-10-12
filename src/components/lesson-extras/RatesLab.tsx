import { useState, useEffect } from 'react'
import type { RatesLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { RATES_LAB } from '@/lib/lessonExtrasStrings'
import {
  defaultRatesLabData,
  calculateGasVolume,
  calculateReactionRate
} from '@/content/ratesLabData'

type ActiveTab = 'bench' | 'graph' | 'theory'

export function RatesLab({ extra }: { extra: RatesLabExtra }) {
  const fallbackRun = defaultRatesLabData.presetRuns![0]!
  const [activeTab, setActiveTab] = useState<ActiveTab>('bench')
  const [runId, setRunId] = useState<string>(
    extra.presetRuns?.[0]?.id ?? 'baseline'
  )
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [timeSeconds, setTimeSeconds] = useState<number>(0)
  const [tick, setTick] = useState<number>(0)
  const [scrubTime, setScrubTime] = useState<number>(0)

  const activeRun =
    extra.presetRuns?.find((r) => r.id === runId) ?? extra.presetRuns?.[0] ?? fallbackRun

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        setTimeSeconds((prev) => {
          if (prev >= 200) {
            setIsRunning(false)
            return 200
          }
          return prev + 1
        })
        setTick((prev) => (prev + 1) % 100)
      }, 250) // 1 second of experiment per 250ms for smooth interactive pace
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const effectiveTime = activeTab === 'graph' ? scrubTime : timeSeconds
  const currentV = calculateGasVolume(
    effectiveTime,
    activeRun.kRate,
    activeRun.maxVolumeCm3
  )
  const currentRate = calculateReactionRate(
    effectiveTime,
    activeRun.kRate,
    activeRun.maxVolumeCm3
  )
  const initialRate = calculateReactionRate(
    0,
    activeRun.kRate,
    activeRun.maxVolumeCm3
  )

  const isPlateau = currentV >= activeRun.maxVolumeCm3 * 0.98

  const handleReset = () => {
    setIsRunning(false)
    setTimeSeconds(0)
    setScrubTime(0)
  }

  // SVG coordinate conversions for Graph tab
  // Graph box: x from 60 to 560 (representing 0 to 200s), y from 260 to 40 (representing 0 to 100 cm3)
  const mapTimeToX = (t: number) => 60 + (t / 200) * 500
  const mapVolToY = (v: number) => 260 - (v / 100) * 220

  const generatePath = (k: number, maxV: number) => {
    const points: string[] = []
    for (let t = 0; t <= 200; t += 2) {
      const v = calculateGasVolume(t, k, maxV)
      const x = mapTimeToX(t)
      const y = mapVolToY(v)
      points.push(`${t === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return points.join(' ')
  }

  return (
    <div className="my-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-sm font-bold">
              ⚗️
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              <T value={extra.title} />
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            <T value={extra.hint} />
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-mono text-sky-300">
            <span>Equation:</span>
            <span className="font-bold">{extra.reaction.equation}</span>
          </div>
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
            <T value={RATES_LAB.tabBench} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('graph')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'graph'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={RATES_LAB.tabGraph} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'theory'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={RATES_LAB.tabTheory} />
          </button>
        </div>
      </div>

      {/* Preset Condition Selector */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          <T value={RATES_LAB.selectCondition} />
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {extra.presetRuns?.map((run) => {
            const isSelected = run.id === runId
            return (
              <button
                key={run.id}
                type="button"
                onClick={() => {
                  setRunId(run.id)
                  handleReset()
                }}
                className={`flex flex-col rounded-xl border p-2.5 text-left transition-all ${
                  isSelected
                    ? 'border-sky-400 bg-sky-950/40 text-white shadow-md shadow-sky-950/50'
                    : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                  <span>{run.tempC}°C · {run.concM}M</span>
                  <span className="font-bold">{run.maxVolumeCm3} cm³</span>
                </div>
                <span className="mt-1 text-xs font-semibold leading-snug line-clamp-2">
                  <T value={run.name} />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'bench' && (
        <div className="space-y-6">
          {/* Reaction Bench Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((prev) => !prev)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg transition-all ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                <T value={isRunning ? RATES_LAB.btnPause : RATES_LAB.btnStartReaction} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-600 bg-slate-700/40 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              >
                <T value={RATES_LAB.btnReset} />
              </button>
            </div>

            {/* Readouts */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">
                  <T value={RATES_LAB.timeElapsed} />:
                </span>
                <span className="font-bold text-amber-400">{timeSeconds} s</span>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">
                  <T value={RATES_LAB.currentVolume} />:
                </span>
                <span className="font-bold text-sky-400">{currentV.toFixed(1)} cm³</span>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">
                  <T value={RATES_LAB.instantRate} />:
                </span>
                <span className="font-bold text-emerald-400">{currentRate.toFixed(3)} cm³/s</span>
              </div>
            </div>
          </div>

          {/* SVG Experimental Setup */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 to-slate-900 p-4">
            <svg
              viewBox="0 0 700 280"
              className="w-full h-auto max-h-[380px]"
              role="img"
              aria-label="Reaction and Gas Syringe Apparatus"
            >
              {/* Table Surface */}
              <line x1="20" y1="250" x2="680" y2="250" stroke="#334155" strokeWidth="4" />

              {/* Conical Flask on Left (x ~ 60 to 180, base y=250) */}
              {/* Flask neck */}
              <path
                d="M 105 110 L 105 140 L 60 245 C 55 250, 65 250, 120 250 C 175 250, 185 250, 180 245 L 135 140 L 135 110 Z"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
              />
              {/* Acid Liquid inside flask */}
              <path
                d="M 85 190 L 65 242 C 60 248, 70 248, 120 248 C 170 248, 180 248, 175 242 L 155 190 Z"
                fill="rgba(56, 189, 248, 0.2)"
                stroke="#38bdf8"
                strokeWidth="1"
              />

              {/* Marble Chips at Bottom */}
              <circle cx="100" cy="242" r="6" fill="#cbd5e1" />
              <circle cx="115" cy="240" r="7" fill="#cbd5e1" />
              <circle cx="130" cy="243" r="5" fill="#cbd5e1" />
              <circle cx="142" cy="241" r="6" fill="#cbd5e1" />

              {/* Effervescence Bubbles when running */}
              {isRunning && !isPlateau && (
                <g>
                  <circle cx="105" cy={230 - ((tick * 3) % 40)} r="2.5" fill="#e2e8f0" opacity="0.8" />
                  <circle cx="120" cy={235 - (((tick + 20) * 3) % 45)} r="3" fill="#e2e8f0" opacity="0.8" />
                  <circle cx="135" cy={225 - (((tick + 40) * 3) % 35)} r="2" fill="#e2e8f0" opacity="0.8" />
                  <circle cx="115" cy={215 - (((tick + 60) * 3) % 40)} r="3.5" fill="#e2e8f0" opacity="0.8" />
                </g>
              )}

              {/* Rubber Bung in Flask Neck */}
              <polygon points="102,110 138,110 135,125 105,125" fill="#475569" stroke="#1e293b" strokeWidth="2" />

              {/* Delivery Tube from Bung to Gas Syringe */}
              <path
                d="M 120 115 L 120 70 L 250 70 L 250 145 L 300 145"
                fill="none"
                stroke="#64748b"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 120 115 L 120 70 L 250 70 L 250 145 L 300 145"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Gas Syringe Body (x: 300 to 580, y: 125 to 165) */}
              {/* Syringe barrel */}
              <rect
                x="300"
                y="125"
                width="280"
                height="40"
                rx="4"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              {/* Syringe nozzle */}
              <rect x="290" y="140" width="10" height="10" fill="#38bdf8" />

              {/* Syringe Volume Calibration Ticks (0 to 100 cm3) */}
              {[0, 20, 40, 60, 80, 100].map((v) => {
                const tickX = 300 + (v / 100) * 250
                return (
                  <g key={v}>
                    <line x1={tickX} y1="125" x2={tickX} y2="135" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x={tickX} y="120" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                      {v}
                    </text>
                  </g>
                )
              })}

              {/* Gas Filled Region (Light blue gas) */}
              {currentV > 0 && (
                <rect
                  x="300"
                  y="127"
                  width={(Math.min(currentV, 100) / 100) * 250}
                  height="36"
                  fill="rgba(56, 189, 248, 0.35)"
                />
              )}

              {/* Frictionless Plunger (moves right with volume) */}
              {/* Plunger head */}
              {(() => {
                const plungerX = 300 + (Math.min(currentV, 100) / 100) * 250
                return (
                  <g transform={`translate(${plungerX}, 0)`}>
                    {/* Plunger rubber stopper */}
                    <rect x="0" y="126" width="12" height="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="2" />
                    {/* Plunger rod extending right */}
                    <rect x="12" y="140" width="80" height="10" fill="#64748b" rx="2" />
                    {/* Plunger thumb flange */}
                    <rect x="92" y="130" width="6" height="30" fill="#94a3b8" rx="2" />
                  </g>
                )
              })()}

              {/* Labels on Diagram */}
              <text x="120" y="270" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Reaction Flask (CaCO₃ + HCl)
              </text>
              <text x="440" y="185" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                100 cm³ Gas Syringe (CO₂ gas collection)
              </text>
            </svg>

            {/* Plateau Notification if reached */}
            {isPlateau && (
              <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-2.5 text-center text-xs font-bold text-emerald-400">
                <T value={RATES_LAB.reactionPlateau} /> — Final Yield: {activeRun.maxVolumeCm3} cm³
              </div>
            )}
          </div>

          {/* Condition Notes */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 text-xs">
            <span className="font-bold text-sky-300 block mb-1">
              Collision Theory Analysis:
            </span>
            <p className="text-slate-300 leading-relaxed">
              <T value={activeRun.notes} />
            </p>
          </div>
        </div>
      )}

      {activeTab === 'graph' && (
        <div className="space-y-6">
          {/* Interactive Scrub Slider */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Inspect Time:</span>
                <span className="font-bold text-amber-400">{scrubTime} s</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={scrubTime}
                onChange={(e) => setScrubTime(Number(e.target.value))}
                className="w-full accent-sky-400"
              />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">Volume V(t):</span>
                <span className="font-bold text-sky-400">{currentV.toFixed(1)} cm³</span>
              </div>
              <div className="rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-700/50">
                <span className="text-slate-400 mr-2">Gradient (Rate):</span>
                <span className="font-bold text-emerald-400">{currentRate.toFixed(3)} cm³/s</span>
              </div>
            </div>
          </div>

          {/* Interactive Graph SVG */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 p-4">
            <svg
              viewBox="0 0 620 300"
              className="w-full h-auto max-h-[420px]"
              role="img"
              aria-label="Reaction Progress Curve (Volume of CO2 vs Time)"
            >
              {/* Grid Lines */}
              {[0, 20, 40, 60, 80, 100].map((v) => {
                const y = mapVolToY(v)
                return (
                  <g key={v}>
                    <line x1="60" y1={y} x2="560" y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x="50" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                      {v}
                    </text>
                  </g>
                )
              })}
              {[0, 50, 100, 150, 200].map((t) => {
                const x = mapTimeToX(t)
                return (
                  <g key={t}>
                    <line x1={x} y1="40" x2={x} y2="260" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={x} y="278" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {t}
                    </text>
                  </g>
                )
              })}

              {/* Axes */}
              <line x1="60" y1="260" x2="560" y2="260" stroke="#94a3b8" strokeWidth="2" />
              <line x1="60" y1="260" x2="60" y2="40" stroke="#94a3b8" strokeWidth="2" />

              {/* Axis Titles */}
              <text x="310" y="295" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                Time t (seconds)
              </text>
              <text x="25" y="150" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold" transform="rotate(-90 25 150)">
                Volume of CO₂ (cm³)
              </text>

              {/* Ghost Curves of Other Runs for Visual Comparison */}
              {extra.presetRuns?.map((otherRun) => {
                if (otherRun.id === runId) return null
                return (
                  <path
                    key={otherRun.id}
                    d={generatePath(otherRun.kRate, otherRun.maxVolumeCm3)}
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                )
              })}

              {/* Active Curve */}
              <path
                d={generatePath(activeRun.kRate, activeRun.maxVolumeCm3)}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
              />

              {/* Tangent line at scrubTime */}
              {(() => {
                const ptX = mapTimeToX(scrubTime)
                const ptY = mapVolToY(currentV)
                // Tangent line endpoints (+- 30s)
                const dt = 30
                const t1 = Math.max(0, scrubTime - dt)
                const t2 = Math.min(200, scrubTime + dt)
                const v1 = currentV + currentRate * (t1 - scrubTime)
                const v2 = currentV + currentRate * (t2 - scrubTime)

                const x1 = mapTimeToX(t1)
                const y1 = mapVolToY(Math.max(0, Math.min(100, v1)))
                const x2 = mapTimeToX(t2)
                const y2 = mapVolToY(Math.max(0, Math.min(100, v2)))

                return (
                  <g>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="2" />
                    <circle cx={ptX} cy={ptY} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  </g>
                )
              })()}
            </svg>
          </div>

          {/* Graph Legend & Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
              <span className="font-bold text-sky-300 block mb-1">
                Active Condition: <T value={activeRun.name} />
              </span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Initial gradient (at t=0): <span className="font-mono font-bold text-white">{initialRate.toFixed(3)} cm³/s</span></li>
                <li>Final gas volume plateau: <span className="font-mono font-bold text-white">{activeRun.maxVolumeCm3} cm³</span></li>
                <li>Dashed lines: Faint comparison traces of the other 3 test conditions.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
              <span className="font-bold text-amber-400 block mb-1">
                <T value={RATES_LAB.tangentLabel} />:
              </span>
              <p className="text-slate-300 leading-relaxed">
                The yellow line shows the tangent at t = {scrubTime} s. The slope of this tangent gives the instantaneous reaction rate. Notice how the tangent is steepest at t = 0 and becomes completely horizontal once the plateau is reached!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'theory' && (
        <div className="space-y-4 text-xs">
          {/* Collision Theory Essentials */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-4">
            <h4 className="text-sm font-bold text-white">
              Collision Theory Requirements (IGCSE Paper 4 Core Formula)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-sky-400 block mb-1">1. Collision Frequency</span>
                <p className="text-slate-300">
                  Particles must collide with one another. Higher concentration and greater surface area increase the frequency of collisions per unit time.
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-amber-400 block mb-1">2. Activation Energy (Eₐ)</span>
                <p className="text-slate-300">
                  Colliding particles must possess energy ≥ activation energy. Raising temperature exponentially increases the proportion of particles having E ≥ Eₐ.
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-700/40">
                <span className="font-bold text-emerald-400 block mb-1">3. Catalytic Pathway</span>
                <p className="text-slate-300">
                  A catalyst provides an alternative reaction pathway with lower activation energy, increasing successful collisions without being consumed.
                </p>
              </div>
            </div>
          </div>

          {/* Examiner Notes */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-amber-200">
            <span className="font-bold block mb-1 text-sm">💡 Cambridge Examiner Rules:</span>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
