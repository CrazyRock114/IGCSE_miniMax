import { useState, useEffect } from 'react'
import type { GroupTrendsLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { GROUP_TRENDS_LAB } from '@/lib/lessonExtrasStrings'
import {
  defaultGroupTrendsLabData,
  checkDisplacement
} from '@/content/groupTrendsLabData'

type ActiveTab = 'group1' | 'halogens' | 'trends'

export function GroupTrendsLab({ extra }: { extra: GroupTrendsLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('group1')
  const [metalSymbol, setMetalSymbol] = useState<string>('Na')
  const [isReacting, setIsReacting] = useState<boolean>(false)
  const [reactTick, setReactTick] = useState<number>(0)

  // Halogens state
  const [selectedHalogen, setSelectedHalogen] = useState<string>('Cl₂')
  const [selectedHalide, setSelectedHalide] = useState<string>('KBr')

  const metalsList = extra.group1Metals ?? defaultGroupTrendsLabData.group1Metals
  const activeMetal =
    metalsList.find((m) => m.symbol === metalSymbol) ?? metalsList[1]!

  const displacement = checkDisplacement(selectedHalogen, selectedHalide)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isReacting) {
      interval = setInterval(() => {
        setReactTick((prev) => (prev + 1) % 100)
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isReacting])

  const handleDropMetal = () => {
    setIsReacting(true)
  }

  const handleResetTrough = () => {
    setIsReacting(false)
    setReactTick(0)
  }

  // Displacement test tube color
  let displacementColor = 'rgba(241, 245, 249, 0.15)' // Clear
  if (selectedHalogen === 'Cl₂') {
    if (selectedHalide === 'KBr') displacementColor = '#ea580c' // Orange (Br2)
    if (selectedHalide === 'KI') displacementColor = '#78350f' // Dark brown (I2)
  } else if (selectedHalogen === 'Br₂') {
    if (selectedHalide === 'KI') displacementColor = '#78350f' // Dark brown (I2)
    else displacementColor = '#fdba74' // Orange unreacted Br2
  } else if (selectedHalogen === 'I₂') {
    displacementColor = '#78350f' // Brown unreacted I2
  }

  return (
    <div className="my-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-sm font-bold">
              ⚛️
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
            onClick={() => setActiveTab('group1')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'group1'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={GROUP_TRENDS_LAB.tabGroup1} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('halogens')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'halogens'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={GROUP_TRENDS_LAB.tabHalogens} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trends')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'trends'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={GROUP_TRENDS_LAB.tabTrends} />
          </button>
        </div>
      </div>

      {activeTab === 'group1' && (
        <div className="space-y-6">
          {/* Metal Selector Bar */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              <T value={GROUP_TRENDS_LAB.selectMetal} />
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {metalsList.map((m) => {
                const isSelected = m.symbol === metalSymbol
                return (
                  <button
                    key={m.symbol}
                    type="button"
                    onClick={() => {
                      setMetalSymbol(m.symbol)
                      handleResetTrough()
                    }}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-950/40 text-white shadow-md'
                        : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-mono text-base font-bold text-sky-400 block">
                      {m.symbol} (Z={m.atomicNumber})
                    </span>
                    <span className="text-xs font-semibold mt-1 block truncate">
                      <T value={m.name} />
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono block mt-0.5">
                      Vigor: {m.vigorRank}/5
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Water Trough Simulation SVG */}
          <div className="rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 to-slate-900 p-6 flex flex-col items-center">
            {/* Control Buttons */}
            <div className="mb-4 flex gap-3">
              <button
                type="button"
                onClick={handleDropMetal}
                className="rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
              >
                <T value={GROUP_TRENDS_LAB.btnDropInWater} />
              </button>
              <button
                type="button"
                onClick={handleResetTrough}
                className="rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <T value={GROUP_TRENDS_LAB.btnResetTrough} />
              </button>
            </div>

            <svg
              viewBox="0 0 500 200"
              className="w-full max-w-lg h-auto"
              role="img"
              aria-label="Alkali Metal Reaction with Water Trough"
            >
              {/* Glass Trough Basin */}
              <rect x="50" y="60" width="400" height="110" rx="12" fill="none" stroke="#64748b" strokeWidth="4" />
              {/* Water in trough (turns purple as MOH forms) */}
              <rect
                x="54"
                y="85"
                width="392"
                height="81"
                rx="8"
                fill={isReacting ? 'rgba(168, 85, 247, 0.35)' : 'rgba(56, 189, 248, 0.25)'}
              />
              <line x1="54" y1="85" x2="446" y2="85" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

              {/* Water Meniscus Indicator */}
              <text x="65" y="105" fill="#94a3b8" fontSize="10" fontWeight="bold">
                {isReacting ? 'Alkaline MOH (pH > 13, Universal Indicator: Purple)' : 'Water + Indicator (pH 7, Green)'}
              </text>

              {/* Floating Metal Simulation */}
              {isReacting && (
                <g>
                  {/* Metal piece darting across surface */}
                  {(() => {
                    const posX = 160 + ((reactTick * 6) % 180)
                    const isPotassiumOrWorse = activeMetal.vigorRank >= 3
                    const isSodium = activeMetal.symbol === 'Na'
                    const isLithium = activeMetal.symbol === 'Li'

                    return (
                      <g transform={`translate(${posX}, 80)`}>
                        {/* Metal ball */}
                        <circle
                          cx="0"
                          cy="0"
                          r={isSodium ? '8' : isLithium ? '7' : '9'}
                          fill="#e2e8f0"
                          stroke="#94a3b8"
                          strokeWidth="2"
                        />

                        {/* Bubbles of H2 */}
                        <circle cx="-10" cy="5" r="3" fill="#cbd5e1" opacity="0.8" />
                        <circle cx="-16" cy="2" r="2.5" fill="#cbd5e1" opacity="0.7" />
                        <circle cx="-22" cy="6" r="3.5" fill="#cbd5e1" opacity="0.6" />

                        {/* Lilac flame if Potassium or violent explosion flash */}
                        {isPotassiumOrWorse && (
                          <g>
                            <path
                              d="M -5 -5 C -10 -25, 0 -35, 2 -30 C 5 -35, 12 -25, 5 -5 Z"
                              fill="#c084fc"
                              opacity="0.9"
                            />
                            <circle cx="0" cy="-18" r="4" fill="#fde047" opacity="0.8" />
                            <text x="0" y="-38" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">
                              Lilac Flame 🔥
                            </text>
                          </g>
                        )}
                      </g>
                    )
                  })()}
                </g>
              )}
            </svg>

            {/* Metal Properties & Water Reaction Details */}
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-1">
                <span className="font-bold text-sky-400 block mb-1">
                  Physical Trends (Group I):
                </span>
                <p className="text-slate-300">
                  Melting Point: <span className="font-mono font-bold text-white">{activeMetal.meltingPointC}°C</span> (Decreases down group)
                </p>
                <p className="text-slate-300">
                  Density: <span className="font-mono font-bold text-white">{activeMetal.densityGcm3} g/cm³</span> (Li, Na, K float on water!)
                </p>
                <p className="text-slate-300">
                  Flame emission: <span className="font-bold text-amber-300"><T value={activeMetal.flameColor} /></span>
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1">
                <span className="font-bold text-amber-400 block mb-1">
                  <T value={GROUP_TRENDS_LAB.reactionObservation} />:
                </span>
                <p className="text-slate-200 leading-relaxed">
                  <T value={activeMetal.reactionWithWater} />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'halogens' && (
        <div className="space-y-6">
          {/* Halogen Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                <T value={GROUP_TRENDS_LAB.selectHalogen} />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Cl₂', 'Br₂', 'I₂'].map((hal) => (
                  <button
                    key={hal}
                    type="button"
                    onClick={() => setSelectedHalogen(hal)}
                    className={`rounded-xl border p-2.5 text-center font-mono font-bold text-xs transition-all ${
                      selectedHalogen === hal
                        ? 'border-sky-400 bg-sky-950/50 text-white shadow-md'
                        : 'border-slate-700/60 bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    {hal} (aq)
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                <T value={GROUP_TRENDS_LAB.selectHalide} />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['KCl', 'KBr', 'KI'].map((halide) => (
                  <button
                    key={halide}
                    type="button"
                    onClick={() => setSelectedHalide(halide)}
                    className={`rounded-xl border p-2.5 text-center font-mono font-bold text-xs transition-all ${
                      selectedHalide === halide
                        ? 'border-sky-400 bg-sky-950/50 text-white shadow-md'
                        : 'border-slate-700/60 bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    {halide} (aq)
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Displacement Reaction Workbench Visual */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-950 p-6 flex flex-col md:flex-row items-center justify-around gap-6">
            {/* SVG Test Tube showing color change */}
            <div className="flex flex-col items-center">
              <svg
                viewBox="0 0 100 220"
                className="w-28 h-56"
                role="img"
                aria-label="Halogen Displacement Reaction Tube"
              >
                <rect x="25" y="10" width="50" height="180" rx="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
                <path d="M 25 190 A 25 25 0 0 0 75 190 Z" fill="none" stroke="#94a3b8" strokeWidth="3" />
                <ellipse cx="50" cy="10" rx="28" ry="4" fill="#64748b" />

                {/* Liquid fill */}
                <rect x="27" y="60" width="46" height="130" fill={displacementColor} />
                <path d="M 27 190 A 23 23 0 0 0 73 190 Z" fill={displacementColor} />
                <ellipse cx="50" cy="60" rx="23" ry="3" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
              </svg>
              <span className="mt-2 text-xs font-mono font-bold text-slate-300">
                {selectedHalogen} + {selectedHalide}
              </span>
            </div>

            {/* Outcome Details Card */}
            <div className="flex-1 space-y-3 text-xs">
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-2">
                <span className="font-bold text-sm block">
                  {displacement.occurs ? (
                    <span className="text-emerald-400">
                      <T value={GROUP_TRENDS_LAB.reactionOccurs} />
                    </span>
                  ) : (
                    <span className="text-amber-400">
                      <T value={GROUP_TRENDS_LAB.noReaction} />
                    </span>
                  )}
                </span>
                <div className="text-slate-300 leading-relaxed">
                  <T value={displacement.colorChange} />
                </div>
                <div className="pt-2 border-t border-slate-700/40">
                  <span className="text-slate-400 block mb-1">
                    <T value={GROUP_TRENDS_LAB.netIonicEquation} />:
                  </span>
                  <code className="rounded bg-slate-900/80 px-2.5 py-1 font-mono font-bold text-sky-300 border border-slate-700/50 block">
                    {displacement.equation}
                  </code>
                </div>
              </div>

              {/* Redox role note */}
              {displacement.occurs && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-emerald-200">
                  <T value={GROUP_TRENDS_LAB.redoxRole} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-4 text-xs">
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-4">
            <h4 className="text-sm font-bold text-white">
              Why Group I &amp; Group VII Reactivity Trends Move in Opposite Directions
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-700/40 space-y-2">
                <span className="font-bold text-sky-400 text-sm block">
                  Group I (Alkali Metals): Reactivity INCREASES Down
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Metals react by <strong>losing</strong> 1 outer valence electron. Going down the group:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Atomic radius increases (more electron shells).</li>
                  <li>Shielding effect from inner shells increases.</li>
                  <li>Electrostatic attraction between positive nucleus and valence electron becomes much weaker.</li>
                  <li>Electron is lost much more readily → Reactivity increases (<code className="text-sky-300 font-mono">Li &lt; Na &lt; K &lt; Rb &lt; Cs</code>).</li>
                </ul>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-700/40 space-y-2">
                <span className="font-bold text-amber-400 text-sm block">
                  Group VII (Halogens): Reactivity DECREASES Down
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Halogens react by <strong>gaining</strong> 1 electron to complete octet. Going down the group:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Atomic radius increases and shielding increases.</li>
                  <li>Incoming electron is further from positive nucleus.</li>
                  <li>Attractive pull for the incoming electron is much weaker.</li>
                  <li>Electron is gained less readily → Reactivity decreases (<code className="text-amber-300 font-mono">F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂</code>).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examiner Notes */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-amber-200">
            <span className="font-bold block mb-1 text-sm">💡 Cambridge Examiner Note:</span>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
