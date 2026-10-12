import { useState } from 'react'
import type { EquilibriumLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { EQUILIBRIUM_LAB } from '@/lib/lessonExtrasStrings'
import {
  defaultEquilibriumLabData,
  predictEquilibriumShift
} from '@/content/equilibriumLabData'

type ActiveTab = 'lechatelier' | 'colorshift' | 'industrial'
type TempSetting = 'lower' | 'constant' | 'higher'
type PressureSetting = 'lower' | 'constant' | 'higher'

export function EquilibriumLab({ extra }: { extra: EquilibriumLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lechatelier')
  const [systemId, setSystemId] = useState<string>('haber-process')
  const [tempSetting, setTempSetting] = useState<TempSetting>('constant')
  const [pressureSetting, setPressureSetting] = useState<PressureSetting>('constant')
  const [catalystActive, setCatalystActive] = useState<boolean>(false)

  // Color shift tab specific state
  const [syringeTemp, setSyringeTemp] = useState<'ice' | 'room' | 'hot'>('room')
  const [syringePressure, setSyringePressure] = useState<'compressed' | 'normal' | 'expanded'>('normal')

  const systemsList = extra.systems ?? defaultEquilibriumLabData.systems
  const activeSystem =
    systemsList.find((s) => s.id === systemId) ?? systemsList[0]!

  const shiftResult = predictEquilibriumShift(
    activeSystem.id,
    tempSetting,
    pressureSetting,
    catalystActive
  )

  // Determine gas color in syringe
  let syringeGasOpacity = 0.5
  if (syringeTemp === 'ice') syringeGasOpacity = 0.15
  if (syringeTemp === 'hot') syringeGasOpacity = 0.9

  // Pressure adjustment on color
  if (syringePressure === 'compressed') {
    // Compressed shifts right towards colorless N2O4
    syringeGasOpacity = Math.max(0.1, syringeGasOpacity * 0.7)
  } else if (syringePressure === 'expanded') {
    // Expanded shifts left towards brown NO2
    syringeGasOpacity = Math.min(1.0, syringeGasOpacity * 1.3)
  }

  return (
    <div className="my-8 rounded-2xl border border-sky-500/20 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-sm font-bold">
              ⚖️
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
            onClick={() => setActiveTab('lechatelier')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'lechatelier'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={EQUILIBRIUM_LAB.tabLeChatelier} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colorshift')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'colorshift'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={EQUILIBRIUM_LAB.tabColorShift} />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('industrial')}
            className={`rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'industrial'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <T value={EQUILIBRIUM_LAB.tabIndustrial} />
          </button>
        </div>
      </div>

      {activeTab === 'lechatelier' && (
        <div className="space-y-6">
          {/* System Selection Bar */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              <T value={EQUILIBRIUM_LAB.selectSystem} />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {systemsList.map((sys) => {
                const isSelected = sys.id === systemId
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => {
                      setSystemId(sys.id)
                      setTempSetting('constant')
                      setPressureSetting('constant')
                      setCatalystActive(false)
                    }}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-950/40 text-white shadow-md'
                        : 'border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-sky-400 block">
                      {sys.equation}
                    </span>
                    <span className="mt-1 text-xs font-semibold block leading-tight line-clamp-2">
                      <T value={sys.name} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Condition Controls */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Temperature Control */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  <T value={EQUILIBRIUM_LAB.tempControl} />:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTempSetting('lower')}
                    className={`rounded-lg p-2 text-xs font-semibold border transition-all ${
                      tempSetting === 'lower'
                        ? 'border-sky-400 bg-sky-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <T value={EQUILIBRIUM_LAB.tempCold} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempSetting('constant')}
                    className={`rounded-lg p-2 text-xs font-semibold border transition-all ${
                      tempSetting === 'constant'
                        ? 'border-slate-400 bg-slate-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <T value={EQUILIBRIUM_LAB.tempModerate} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempSetting('higher')}
                    className={`rounded-lg p-2 text-xs font-semibold border transition-all ${
                      tempSetting === 'higher'
                        ? 'border-amber-400 bg-amber-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <T value={EQUILIBRIUM_LAB.tempHot} />
                  </button>
                </div>
              </div>

              {/* Pressure Control */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  <T value={EQUILIBRIUM_LAB.pressureControl} />:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPressureSetting('lower')}
                    className={`rounded-lg p-2 text-xs font-semibold border transition-all ${
                      pressureSetting === 'lower'
                        ? 'border-sky-400 bg-sky-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <T value={EQUILIBRIUM_LAB.pressureLow} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPressureSetting('constant')}
                    className={`rounded-lg p-2 text-xs font-semibold border transition-all ${
                      pressureSetting === 'constant'
                        ? 'border-slate-400 bg-slate-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <T value={EQUILIBRIUM_LAB.pressureModerate} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPressureSetting('higher')}
                    className={`rounded-lg p-2 text-xs font-semibold border transition-all ${
                      pressureSetting === 'higher'
                        ? 'border-indigo-400 bg-indigo-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <T value={EQUILIBRIUM_LAB.pressureHigh} />
                  </button>
                </div>
              </div>

              {/* Catalyst Control */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  <T value={EQUILIBRIUM_LAB.catalystControl} />:
                </span>
                <button
                  type="button"
                  onClick={() => setCatalystActive((prev) => !prev)}
                  className={`w-full rounded-lg p-2 text-xs font-semibold border transition-all ${
                    catalystActive
                      ? 'border-emerald-400 bg-emerald-600 text-white'
                      : 'border-slate-600 bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <T value={catalystActive ? EQUILIBRIUM_LAB.catalystOn : EQUILIBRIUM_LAB.catalystOff} />
                </button>
              </div>
            </div>
          </div>

          {/* Shift Prediction Result Banner */}
          <div
            className={`rounded-2xl border p-5 transition-all ${
              shiftResult.direction === 'forward'
                ? 'border-emerald-500/40 bg-emerald-950/30'
                : shiftResult.direction === 'reverse'
                  ? 'border-amber-500/40 bg-amber-950/30'
                  : 'border-sky-500/40 bg-sky-950/30'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/50 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                <T value={EQUILIBRIUM_LAB.shiftHeading} />:
              </span>
              <span
                className={`text-sm font-extrabold font-mono ${
                  shiftResult.direction === 'forward'
                    ? 'text-emerald-400'
                    : shiftResult.direction === 'reverse'
                      ? 'text-amber-400'
                      : 'text-sky-400'
                }`}
              >
                {shiftResult.direction === 'forward' && <T value={EQUILIBRIUM_LAB.shiftForward} />}
                {shiftResult.direction === 'reverse' && <T value={EQUILIBRIUM_LAB.shiftReverse} />}
                {shiftResult.direction === 'none' && <T value={EQUILIBRIUM_LAB.shiftNone} />}
              </span>
            </div>

            {/* Visual Dynamic Reaction Arrow */}
            <div className="my-4 flex items-center justify-center gap-6 text-center">
              <div className="rounded-xl bg-slate-900/80 px-4 py-2 border border-slate-700/50">
                <span className="text-xs text-slate-400 block">Reactants:</span>
                <span className="font-mono text-base font-bold text-white">
                  {activeSystem.gasMolesLeft} mol gas
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`text-2xl font-mono font-bold transition-transform ${
                    shiftResult.direction === 'forward'
                      ? 'text-emerald-400 scale-125'
                      : shiftResult.direction === 'reverse'
                        ? 'text-amber-400 scale-125'
                        : 'text-sky-400'
                  }`}
                >
                  {shiftResult.direction === 'forward' ? '➔ ➔' : shiftResult.direction === 'reverse' ? '⬅ ⬅' : '⇌'}
                </div>
                <span className="text-[11px] text-slate-400 font-mono mt-1">
                  ΔH = {activeSystem.deltaH}
                </span>
              </div>

              <div className="rounded-xl bg-slate-900/80 px-4 py-2 border border-slate-700/50">
                <span className="text-xs text-slate-400 block">Products:</span>
                <span className="font-mono text-base font-bold text-white">
                  {activeSystem.gasMolesRight} mol gas
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed pt-1">
              {shiftResult.explanation}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'colorshift' && (
        <div className="space-y-6">
          {/* Controls Bar for NO2/N2O4 Syringe */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bath temperature */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Water Bath Temperature:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSyringeTemp('ice')}
                    className={`rounded-lg p-2 font-semibold border ${
                      syringeTemp === 'ice'
                        ? 'border-sky-400 bg-sky-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    ❄️ Ice Bath (0°C)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyringeTemp('room')}
                    className={`rounded-lg p-2 font-semibold border ${
                      syringeTemp === 'room'
                        ? 'border-slate-400 bg-slate-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    🌡️ Room Temp (20°C)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyringeTemp('hot')}
                    className={`rounded-lg p-2 font-semibold border ${
                      syringeTemp === 'hot'
                        ? 'border-amber-400 bg-amber-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    🔥 Hot Bath (80°C)
                  </button>
                </div>
              </div>

              {/* Syringe Volume / Pressure */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  <T value={EQUILIBRIUM_LAB.plungerLabel} />:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSyringePressure('compressed')}
                    className={`rounded-lg p-2 font-semibold border ${
                      syringePressure === 'compressed'
                        ? 'border-indigo-400 bg-indigo-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    Compress Piston (High P)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyringePressure('normal')}
                    className={`rounded-lg p-2 font-semibold border ${
                      syringePressure === 'normal'
                        ? 'border-slate-400 bg-slate-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    Normal (1 atm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyringePressure('expanded')}
                    className={`rounded-lg p-2 font-semibold border ${
                      syringePressure === 'expanded'
                        ? 'border-slate-400 bg-slate-600 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    Pull Piston (Low P)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Gas Syringe with dynamic brown gas intensity */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-950 p-6 flex flex-col items-center">
            <svg
              viewBox="0 0 500 160"
              className="w-full max-w-lg h-auto"
              role="img"
              aria-label="Gas Syringe with Nitrogen Dioxide Equilibrium"
            >
              {/* Syringe Glass Tube */}
              <rect x="60" y="40" width="300" height="70" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="2.5" />
              {/* Sealed nozzle */}
              <rect x="40" y="65" width="20" height="20" fill="#64748b" rx="2" />

              {/* Gas Fill Region with dynamic reddish-brown opacity */}
              {(() => {
                const gasWidth =
                  syringePressure === 'compressed'
                    ? 140
                    : syringePressure === 'expanded'
                      ? 260
                      : 200
                return (
                  <rect
                    x="62"
                    y="42"
                    width={gasWidth}
                    height="66"
                    fill="#9a3412"
                    opacity={syringeGasOpacity}
                  />
                )
              })()}

              {/* Plunger */}
              {(() => {
                const plungerX =
                  syringePressure === 'compressed'
                    ? 202
                    : syringePressure === 'expanded'
                      ? 322
                      : 262
                return (
                  <g transform={`translate(${plungerX}, 0)`}>
                    <rect x="0" y="41" width="14" height="68" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
                    <rect x="14" y="67" width="100" height="16" fill="#64748b" rx="2" />
                    <rect x="114" y="55" width="8" height="40" fill="#94a3b8" rx="2" />
                  </g>
                )
              })()}
            </svg>

            {/* Dynamic Observation Readout */}
            <div className="mt-4 text-center text-xs space-y-1">
              <span className="text-slate-400 block">Equilibrium Gas Appearance:</span>
              <span className="font-bold text-sm text-white">
                {syringeGasOpacity < 0.25
                  ? 'Almost Completely Colorless (Dominant N₂O₄)'
                  : syringeGasOpacity > 0.7
                    ? 'Intense Dark Reddish-Brown (Dominant NO₂)'
                    : 'Pale Reddish-Brown Mixture (Dynamic Equilibrium)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'industrial' && (
        <div className="space-y-4 text-xs">
          {/* Haber Process Industrial Profile */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-2">
            <div className="flex justify-between items-center border-b border-slate-700/40 pb-2">
              <span className="font-bold text-white text-sm">Haber Process (Ammonia)</span>
              <span className="font-mono text-sky-400 font-bold">N₂ + 3H₂ ⇌ 2NH₃</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <T value={systemsList[0]!.industrialConditions} />
            </p>
          </div>

          {/* Contact Process Industrial Profile */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 space-y-2">
            <div className="flex justify-between items-center border-b border-slate-700/40 pb-2">
              <span className="font-bold text-white text-sm">Contact Process (Sulfur Trioxide)</span>
              <span className="font-mono text-sky-400 font-bold">2SO₂ + O₂ ⇌ 2SO₃</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <T value={systemsList[1]!.industrialConditions} />
            </p>
          </div>

          {/* Examiner Notes */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-amber-200">
            <span className="font-bold block mb-1 text-sm">💡 Cambridge Examiner Golden Rule:</span>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
