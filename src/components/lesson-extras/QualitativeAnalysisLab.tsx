import { useState } from 'react'
import type { QualitativeAnalysisLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { QUALITATIVE_LAB } from '@/lib/lessonExtrasStrings'
import { defaultQualitativeAnalysisLabData } from '@/content/qualitativeAnalysisData'

type ActiveTab = 'cations' | 'anions' | 'gases' | 'flame'
type ReagentState = 'none' | 'few-naoh' | 'excess-naoh' | 'few-nh3' | 'excess-nh3'

export function QualitativeAnalysisLab({
  extra
}: {
  extra: QualitativeAnalysisLabExtra
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cations')
  const [cationId, setCationId] = useState<string>('al3')
  const [reagentState, setReagentState] = useState<ReagentState>('none')
  const [flameIon, setFlameIon] = useState<string>('cu')

  const cationsList = extra.cations ?? defaultQualitativeAnalysisLabData.cations!
  const anionsList = extra.anions ?? defaultQualitativeAnalysisLabData.anions!
  const gasesList = extra.gases ?? defaultQualitativeAnalysisLabData.gases!
  const flameList = extra.flameTests ?? defaultQualitativeAnalysisLabData.flameTests!

  const activeCation =
    cationsList.find((c) => c.id === cationId) ?? cationsList[0]!
  const activeFlame =
    flameList.find((f) => f.id === flameIon) ?? flameList[0]!

  // Determine precipitate appearance in test tube
  let tubePrecipitateColor = 'transparent'
  let tubeLiquidColor = 'rgba(241, 245, 249, 0.15)'
  let precipitateVisible = false
  let isDissolved = false

  if (reagentState === 'few-naoh') {
    if (activeCation.formula !== 'NH₄⁺') {
      precipitateVisible = true
      tubePrecipitateColor = activeCation.precipitateColor
    }
  } else if (reagentState === 'excess-naoh') {
    if (activeCation.isSolubleExcessNaOH) {
      isDissolved = true
      precipitateVisible = false
      tubeLiquidColor =
        activeCation.formula === 'Cr³⁺'
          ? 'rgba(16, 185, 129, 0.3)'
          : 'rgba(241, 245, 249, 0.2)'
    } else if (activeCation.formula !== 'NH₄⁺') {
      precipitateVisible = true
      tubePrecipitateColor = activeCation.precipitateColor
    }
  } else if (reagentState === 'few-nh3') {
    if (activeCation.formula !== 'NH₄⁺' && activeCation.formula !== 'Ca²⁺') {
      precipitateVisible = true
      tubePrecipitateColor = activeCation.precipitateColor
    }
  } else if (reagentState === 'excess-nh3') {
    if (activeCation.isSolubleExcessNH3) {
      isDissolved = true
      precipitateVisible = false
      tubeLiquidColor =
        activeCation.formula === 'Cu²⁺'
          ? 'rgba(30, 58, 138, 0.85)' // Royal deep blue!
          : 'rgba(241, 245, 249, 0.2)'
    } else if (activeCation.formula !== 'NH₄⁺' && activeCation.formula !== 'Ca²⁺') {
      precipitateVisible = true
      tubePrecipitateColor = activeCation.precipitateColor
    }
  }

  return (
    <div className="my-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-sm font-bold">
              🧪
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
            onClick={() => setActiveTab('cations')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'cations'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={QUALITATIVE_LAB.tabCations} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('anions')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'anions'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={QUALITATIVE_LAB.tabAnions} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gases')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'gases'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={QUALITATIVE_LAB.tabGases} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flame')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'flame'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={QUALITATIVE_LAB.tabFlame} />
          </button>
        </div>
      </div>

      {activeTab === 'cations' && (
        <div className="space-y-6">
          {/* Cation Selector Grid */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              <T value={QUALITATIVE_LAB.selectCation} />
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-8">
              {cationsList.map((cat) => {
                const isSelected = cat.id === cationId
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCationId(cat.id)
                      setReagentState('none')
                    }}
                    className={`rounded-xl border p-2 text-center transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-950/50 text-white shadow-md shadow-sky-950/60'
                        : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
                    }`}
                  >
                    <span className="block font-mono text-xs font-bold text-sky-400">
                      {cat.formula}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium leading-tight truncate">
                      <T value={cat.name} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Test Tube Workbench & Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Controls & Actions */}
            <div className="md:col-span-5 space-y-3">
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Add Reagent to Test Tube:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReagentState('few-naoh')}
                    className={`rounded-lg p-2.5 text-xs font-semibold border transition-all ${
                      reagentState === 'few-naoh'
                        ? 'border-sky-400 bg-sky-500 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <T value={QUALITATIVE_LAB.reagentFewNaOH} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReagentState('excess-naoh')}
                    className={`rounded-lg p-2.5 text-xs font-semibold border transition-all ${
                      reagentState === 'excess-naoh'
                        ? 'border-sky-400 bg-sky-500 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <T value={QUALITATIVE_LAB.reagentExcessNaOH} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReagentState('few-nh3')}
                    className={`rounded-lg p-2.5 text-xs font-semibold border transition-all ${
                      reagentState === 'few-nh3'
                        ? 'border-emerald-400 bg-emerald-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <T value={QUALITATIVE_LAB.reagentFewNH3} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReagentState('excess-nh3')}
                    className={`rounded-lg p-2.5 text-xs font-semibold border transition-all ${
                      reagentState === 'excess-nh3'
                        ? 'border-emerald-400 bg-emerald-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <T value={QUALITATIVE_LAB.reagentExcessNH3} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setReagentState('none')}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/60 p-2 text-xs font-medium text-slate-400 hover:text-white transition-all"
                >
                  <T value={QUALITATIVE_LAB.btnResetTube} />
                </button>
              </div>

              {/* Observation Summary Card */}
              <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="font-semibold">
                    <T value={QUALITATIVE_LAB.reagentAddedLabel} />:
                  </span>
                  <span className="font-mono font-bold text-sky-400">
                    {reagentState === 'none'
                      ? 'Distilled Water Only'
                      : reagentState.toUpperCase()}
                  </span>
                </div>
                <div className="border-t border-slate-700/50 pt-2">
                  <span className="font-bold text-white block mb-1">
                    <T value={QUALITATIVE_LAB.observationLabel} />:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {reagentState === 'none' && 'Clear aqueous solution before adding reagent.'}
                    {reagentState === 'few-naoh' && <T value={activeCation.naohFew} />}
                    {reagentState === 'excess-naoh' && <T value={activeCation.naohExcess} />}
                    {reagentState === 'few-nh3' && <T value={activeCation.nh3Few} />}
                    {reagentState === 'excess-nh3' && <T value={activeCation.nh3Excess} />}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Test Tube Visual in SVG */}
            <div className="md:col-span-7 flex justify-center">
              <div className="relative rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 to-slate-900 p-6 flex flex-col items-center">
                <svg
                  viewBox="0 0 200 320"
                  className="w-48 h-72"
                  role="img"
                  aria-label="Qualitative Analysis Test Tube"
                >
                  {/* Test tube rack clip */}
                  <rect x="20" y="100" width="160" height="12" fill="#334155" rx="3" />
                  <rect x="20" y="240" width="160" height="12" fill="#334155" rx="3" />

                  {/* Test tube glass outline (width: 50, height: 260) */}
                  <rect x="75" y="20" width="50" height="240" rx="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
                  {/* Test tube rounded bottom */}
                  <path d="M 75 260 A 25 25 0 0 0 125 260 Z" fill="none" stroke="#94a3b8" strokeWidth="3" />
                  {/* Rim top */}
                  <ellipse cx="100" cy="20" rx="28" ry="4" fill="#64748b" />

                  {/* Liquid inside tube */}
                  <rect
                    x="77"
                    y={reagentState === 'none' ? '180' : '110'}
                    width="46"
                    height={reagentState === 'none' ? '80' : '150'}
                    fill={tubeLiquidColor}
                  />
                  <path
                    d={`M 77 260 A 23 23 0 0 0 123 260 Z`}
                    fill={tubeLiquidColor}
                  />
                  {/* Meniscus line */}
                  <ellipse
                    cx="100"
                    cy={reagentState === 'none' ? '180' : '110'}
                    rx="23"
                    ry="3"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />

                  {/* Precipitate Layer (formed at bottom or suspended) */}
                  {precipitateVisible && (
                    <g>
                      {/* Flocculent precipitate particles */}
                      <path
                        d="M 77 245 C 85 240, 115 240, 123 245 L 123 260 A 23 23 0 0 1 77 260 Z"
                        fill={tubePrecipitateColor}
                        opacity="0.9"
                      />
                      <circle cx="90" cy="225" r="4" fill={tubePrecipitateColor} opacity="0.8" />
                      <circle cx="110" cy="230" r="3.5" fill={tubePrecipitateColor} opacity="0.8" />
                      <circle cx="100" cy="215" r="4.5" fill={tubePrecipitateColor} opacity="0.8" />
                      <circle cx="85" cy="238" r="3" fill={tubePrecipitateColor} opacity="0.8" />
                      <circle cx="115" cy="235" r="4" fill={tubePrecipitateColor} opacity="0.8" />
                    </g>
                  )}

                  {/* Ammonia gas effervescence / vapors if NH4+ */}
                  {activeCation.formula === 'NH₄⁺' && reagentState.includes('naoh') && (
                    <g>
                      <circle cx="100" cy="90" r="3" fill="#cbd5e1" opacity="0.8" />
                      <circle cx="95" cy="70" r="4" fill="#cbd5e1" opacity="0.7" />
                      <circle cx="105" cy="50" r="3.5" fill="#cbd5e1" opacity="0.6" />
                      <text x="100" y="40" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
                        NH₃ (g) ↑
                      </text>
                    </g>
                  )}

                  {/* Dissolved label if precipitate cleared */}
                  {isDissolved && (
                    <text x="100" y="190" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                      Precipitate Dissolved
                    </text>
                  )}
                </svg>

                <div className="mt-3 text-center text-xs font-mono text-slate-400">
                  <span className="font-bold text-white">{activeCation.formula}</span> solution in test tube
                </div>
              </div>
            </div>
          </div>

          {/* Discrimination Rules Banner */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs">
            <span className="font-bold text-amber-400 block mb-1">
              <T value={QUALITATIVE_LAB.examTrapNote} />:
            </span>
            <p className="text-slate-300 leading-relaxed">
              <T value={extra.examinerNotes} />
            </p>
          </div>
        </div>
      )}

      {activeTab === 'anions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anionsList.map((anion) => (
              <div
                key={anion.id}
                className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-700/40 pb-2">
                  <span className="font-bold text-white text-sm">
                    <T value={anion.name} />
                  </span>
                  <span className="font-mono text-xs font-bold text-sky-400">
                    {anion.formula}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400">Test Reagent: </span>
                  <span className="text-slate-200">
                    <T value={anion.reagent} />
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400">Observation: </span>
                  <span className="text-emerald-300 font-medium">
                    <T value={anion.observation} />
                  </span>
                </div>
                <div className="pt-1">
                  <span className="font-mono text-[11px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/40 block">
                    {anion.equation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'gases' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gasesList.map((gas) => (
              <div
                key={gas.id}
                className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-700/40 pb-2">
                  <span className="font-bold text-white text-sm">
                    <T value={gas.name} />
                  </span>
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${gas.colorHint}25`, color: gas.colorHint }}
                  >
                    {gas.formula}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400">Test Method: </span>
                  <p className="text-slate-200 mt-0.5">
                    <T value={gas.test} />
                  </p>
                </div>
                <div className="border-t border-slate-700/30 pt-1.5">
                  <span className="font-semibold text-sky-400">Positive Result: </span>
                  <p className="text-white font-medium mt-0.5">
                    <T value={gas.result} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'flame' && (
        <div className="space-y-6">
          {/* Flame test metal selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {flameList.map((f) => {
              const isSelected = f.id === flameIon
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlameIon(f.id)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 text-white shadow-md'
                      : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="font-mono text-sm font-bold block" style={{ color: f.flameColor }}>
                    {f.ion}
                  </span>
                  <span className="text-xs mt-1 block truncate">
                    <T value={f.name} />
                  </span>
                </button>
              )
            })}
          </div>

          {/* Interactive Bunsen Burner Flame Simulation */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-950 p-6 flex flex-col items-center">
            <svg
              viewBox="0 0 240 260"
              className="w-56 h-64"
              role="img"
              aria-label="Bunsen Burner Flame Simulation"
            >
              {/* Bunsen Burner base and chimney */}
              <rect x="70" y="235" width="100" height="15" fill="#475569" rx="3" />
              <rect x="105" y="150" width="30" height="85" fill="#64748b" />
              <rect x="100" y="145" width="40" height="8" fill="#334155" rx="2" />

              {/* Platinum wire loop held in flame */}
              <line x1="20" y1="95" x2="115" y2="105" stroke="#cbd5e1" strokeWidth="2.5" />
              <circle cx="118" cy="106" r="4" fill="none" stroke="#cbd5e1" strokeWidth="2" />

              {/* Outer roaring flame colored by metal salt emission */}
              <path
                d="M 120 40 C 145 90, 140 145, 120 145 C 100 145, 95 90, 120 40 Z"
                fill={activeFlame.flameColor}
                opacity="0.85"
              />
              {/* Inner hotter cone */}
              <path
                d="M 120 75 C 133 105, 130 145, 120 145 C 110 145, 107 105, 120 75 Z"
                fill="#ffffff"
                opacity="0.6"
              />
            </svg>

            {/* Flame Color Description */}
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 block">
                Characteristic Flame Emission Color:
              </span>
              <span className="text-lg font-bold" style={{ color: activeFlame.flameColor }}>
                <T value={activeFlame.flameDescription} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
