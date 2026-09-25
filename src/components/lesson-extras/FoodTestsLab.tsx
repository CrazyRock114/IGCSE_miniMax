import { useState } from 'react'
import type { FoodTestsLabExtra, FoodTestItem } from '@/content/types'
import { T } from '@/components/i18n/T'
import { FOOD_TESTS_LAB } from '@/lib/lessonExtrasStrings'

type ActiveTab = 'bench' | 'guide' | 'summary'

export function FoodTestsLab({ extra }: { extra: FoodTestsLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bench')
  const [selectedSampleId, setSelectedSampleId] = useState<string>(extra.samples[0]?.id ?? 'potato')
  const [selectedTestId, setSelectedTestId] = useState<FoodTestItem['id']>('starch')
  const [reagentAdded, setReagentAdded] = useState<boolean>(false)
  const [isHeated, setIsHeated] = useState<boolean>(false)
  const [isShaken, setIsShaken] = useState<boolean>(false)
  const [dcpipDrops, setDcpipDrops] = useState<number>(0)

  const currentSample = extra.samples.find((s) => s.id === selectedSampleId) ?? extra.samples[0]
  const currentTest = extra.tests.find((t) => t.id === selectedTestId) ?? extra.tests[0]

  if (!currentTest) return null

  const isPositive = currentSample?.contains.includes(currentTest.id) ?? false

  const handleReset = () => {
    setReagentAdded(false)
    setIsHeated(false)
    setIsShaken(false)
    setDcpipDrops(0)
  }

  const handleSampleChange = (id: string) => {
    setSelectedSampleId(id)
    handleReset()
  }

  const handleTestChange = (id: FoodTestItem['id']) => {
    setSelectedTestId(id)
    handleReset()
  }

  // Determine current tube appearance
  let liquidColor = '#e2e8f0' // default neutral sample liquid
  let hasPrecipitate = false
  let isCloudy = false
  let statusText = FOOD_TESTS_LAB.needsReagent
  let isComplete = false

  if (!reagentAdded) {
    liquidColor = selectedSampleId === 'water' ? '#f0f9ff' : '#f8fafc'
  } else {
    // Reagent has been added
    if (currentTest.id === 'starch') {
      isComplete = true
      liquidColor = isPositive ? currentTest.colorCodePositive : currentTest.colorCodeNegative
    } else if (currentTest.id === 'reducing_sugar') {
      if (!isHeated) {
        liquidColor = currentTest.colorCodeInitial
        statusText = FOOD_TESTS_LAB.needsHeat
      } else {
        isComplete = true
        liquidColor = isPositive ? currentTest.colorCodePositive : currentTest.colorCodeNegative
        hasPrecipitate = isPositive
      }
    } else if (currentTest.id === 'protein') {
      isComplete = true
      liquidColor = isPositive ? currentTest.colorCodePositive : currentTest.colorCodeNegative
    } else if (currentTest.id === 'lipids') {
      if (!isShaken) {
        liquidColor = '#ffffff'
        statusText = FOOD_TESTS_LAB.needsShake
      } else {
        isComplete = true
        liquidColor = isPositive ? currentTest.colorCodePositive : currentTest.colorCodeNegative
        isCloudy = isPositive
      }
    } else if (currentTest.id === 'vitamin_c') {
      if (dcpipDrops === 0) {
        liquidColor = currentTest.colorCodeInitial
      } else {
        isComplete = true
        liquidColor = isPositive ? currentTest.colorCodePositive : currentTest.colorCodeNegative
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Sub-tab navigation */}
      <nav className="flex gap-2 border-b border-line pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('bench')}
          className={
            'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ' +
            (activeTab === 'bench'
              ? 'bg-teal-600 text-white'
              : 'bg-canvas text-muted hover:text-ink')
          }
        >
          <T value={FOOD_TESTS_LAB.tabBench} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('guide')}
          className={
            'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ' +
            (activeTab === 'guide'
              ? 'bg-teal-600 text-white'
              : 'bg-canvas text-muted hover:text-ink')
          }
        >
          <T value={FOOD_TESTS_LAB.tabGuide} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('summary')}
          className={
            'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ' +
            (activeTab === 'summary'
              ? 'bg-teal-600 text-white'
              : 'bg-canvas text-muted hover:text-ink')
          }
        >
          <T value={FOOD_TESTS_LAB.tabSummary} />
        </button>
      </nav>

      {/* Tab 1: Virtual Testbench */}
      {activeTab === 'bench' && (
        <div className="grid gap-6 md:grid-cols-12">
          {/* Controls: Left Panel (7 cols) */}
          <div className="space-y-4 md:col-span-7">
            {/* Step 1: Sample selection */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                <T value={FOOD_TESTS_LAB.selectSample} />
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {extra.samples.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSampleChange(sample.id)}
                    className={
                      'rounded-lg border p-2 text-left text-xs transition-all ' +
                      (selectedSampleId === sample.id
                        ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-xs'
                        : 'border-line bg-canvas text-ink hover:border-teal-300')
                    }
                  >
                    <span className="font-medium block">
                      <T value={sample.name} />
                    </span>
                    {sample.notes && (
                      <span className="text-[10px] text-muted block mt-0.5">
                        <T value={sample.notes} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Test selection */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                <T value={FOOD_TESTS_LAB.selectTest} />
              </label>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {extra.tests.map((test) => (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => handleTestChange(test.id)}
                    className={
                      'flex items-center justify-between rounded-lg border p-2.5 text-xs transition-all ' +
                      (selectedTestId === test.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-xs'
                        : 'border-line bg-canvas text-ink hover:border-teal-300')
                    }
                  >
                    <div>
                      <div className="font-semibold">
                        <T value={test.name} />
                      </div>
                      <div className="text-[10px] text-muted">
                        <T value={test.reagent} />
                      </div>
                    </div>
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: test.colorCodePositive }}
                      title="Positive indicator color"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Interactive Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                disabled={reagentAdded}
                onClick={() => {
                  setReagentAdded(true)
                  if (currentTest.id === 'vitamin_c') setDcpipDrops(3)
                }}
                className={
                  'rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all ' +
                  (reagentAdded
                    ? 'cursor-not-allowed bg-slate-400 opacity-60'
                    : 'bg-teal-600 hover:bg-teal-700 active:scale-95')
                }
              >
                <T value={FOOD_TESTS_LAB.addReagent} />
              </button>

              {currentTest.heatingRequired && reagentAdded && (
                <button
                  type="button"
                  disabled={isHeated}
                  onClick={() => setIsHeated(true)}
                  className={
                    'rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all ' +
                    (isHeated
                      ? 'cursor-not-allowed bg-slate-400 opacity-60'
                      : 'bg-amber-600 hover:bg-amber-700 active:scale-95')
                  }
                >
                  <T value={FOOD_TESTS_LAB.heatWaterBath} />
                </button>
              )}

              {currentTest.mixingRequired && reagentAdded && (
                <button
                  type="button"
                  disabled={isShaken}
                  onClick={() => setIsShaken(true)}
                  className={
                    'rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all ' +
                    (isShaken
                      ? 'cursor-not-allowed bg-slate-400 opacity-60'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95')
                  }
                >
                  <T value={FOOD_TESTS_LAB.shakeTube} />
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs font-medium text-ink hover:bg-surface"
              >
                <T value={FOOD_TESTS_LAB.reset} />
              </button>
            </div>

            {/* Test Instructions & Procedure Card */}
            <div className="rounded-lg border border-line bg-canvas p-3 text-xs space-y-1.5">
              <div className="font-semibold text-ink flex items-center gap-1.5">
                <span>🧪</span>
                <T value={currentTest.name} />
                <span className="text-muted">·</span>
                <span className="font-normal text-muted">
                  <T value={currentTest.targetMolecule} />
                </span>
              </div>
              <p className="text-ink-soft">
                <T value={currentTest.procedure} />
              </p>
            </div>
          </div>

          {/* Test Tube Visualization & Live Readout: Right Panel (5 cols) */}
          <div className="space-y-4 md:col-span-5">
            <div className="relative flex flex-col items-center justify-center rounded-xl border border-line bg-gradient-to-b from-slate-50 to-slate-100 p-6 shadow-inner">
              {/* Heating water bath indicator */}
              {isHeated && (
                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                  <span>♨️</span>
                  <span>80°C Water Bath</span>
                </div>
              )}

              {/* SVG Test Tube & Rack */}
              <svg width="180" height="240" viewBox="0 0 180 240" className="overflow-visible">
                <defs>
                  <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                  </linearGradient>
                  {isCloudy && (
                    <pattern id="cloudyPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#ffffff" opacity="0.6" />
                      <circle cx="7" cy="7" r="2" fill="#ffffff" opacity="0.4" />
                    </pattern>
                  )}
                </defs>

                {/* Dropper / Pipette animation when reagent added */}
                {reagentAdded && (
                  <g className="animate-bounce" opacity="0.8">
                    <path d="M 90 5 L 90 25 M 88 25 L 92 25 L 90 30 Z" stroke="#334155" strokeWidth="2" fill="#334155" />
                    <circle cx="90" cy="40" r="3" fill={currentTest.colorCodeInitial} opacity="0.9" />
                  </g>
                )}

                {/* Wooden Rack behind tube */}
                <rect x="20" y="195" width="140" height="10" rx="3" fill="#b45309" opacity="0.8" />
                <rect x="40" y="205" width="12" height="30" fill="#78350f" opacity="0.8" />
                <rect x="128" y="205" width="12" height="30" fill="#78350f" opacity="0.8" />
                <rect x="10" y="235" width="160" height="6" rx="2" fill="#92400e" opacity="0.9" />

                {/* Test Tube Body */}
                <rect x="65" y="45" width="50" height="150" rx="25" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />

                {/* Test Tube Liquid */}
                <path
                  d="M 66 110 L 114 110 L 114 170 A 24 24 0 0 1 66 170 Z"
                  fill={liquidColor}
                  className="transition-colors duration-700"
                />

                {/* Cloudy Emulsion Overlay if lipids test */}
                {isCloudy && (
                  <path
                    d="M 66 110 L 114 110 L 114 170 A 24 24 0 0 1 66 170 Z"
                    fill="url(#cloudyPattern)"
                  />
                )}

                {/* Precipitate particles at bottom if Benedict's positive */}
                {hasPrecipitate && (
                  <g fill="#991b1b">
                    <circle cx="80" cy="188" r="2.5" />
                    <circle cx="87" cy="191" r="3" />
                    <circle cx="93" cy="189" r="2" />
                    <circle cx="98" cy="190" r="2.5" />
                    <circle cx="103" cy="187" r="2" />
                    <circle cx="90" cy="193" r="2" />
                  </g>
                )}

                {/* Liquid Meniscus */}
                <ellipse cx="90" cy="110" rx="24" ry="4" fill={liquidColor} opacity="0.9" stroke="#64748b" strokeWidth="0.8" />

                {/* Glass Highlights */}
                <rect x="66" y="45" width="48" height="150" rx="24" fill="url(#glassReflection)" />
                <rect x="62" y="42" width="56" height="5" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Test Tube Measurement Markings */}
                <line x1="72" y1="90" x2="80" y2="90" stroke="#94a3b8" strokeWidth="1" />
                <line x1="72" y1="120" x2="84" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="72" y1="150" x2="80" y2="150" stroke="#94a3b8" strokeWidth="1" />
              </svg>

              {/* Status and Conclusion readout */}
              <div className="mt-2 w-full rounded-lg border border-line bg-surface p-3 text-center">
                <div className="text-[10px] font-semibold tracking-wider text-muted uppercase">
                  <T value={FOOD_TESTS_LAB.observation} />
                </div>
                <div className="mt-1 text-xs font-semibold text-ink">
                  {isComplete ? (
                    <T value={isPositive ? currentTest.positiveColor : currentTest.negativeColor} />
                  ) : (
                    <T value={statusText} />
                  )}
                </div>

                <div className="mt-2 pt-2 border-t border-line flex items-center justify-between text-xs">
                  <span className="text-muted">
                    <T value={FOOD_TESTS_LAB.conclusion} />:
                  </span>
                  {isComplete ? (
                    <span
                      className={
                        'font-bold px-2 py-0.5 rounded-full text-[11px] ' +
                        (isPositive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800')
                      }
                    >
                      <T value={isPositive ? FOOD_TESTS_LAB.positive : FOOD_TESTS_LAB.negative} />
                    </span>
                  ) : (
                    <span className="text-muted italic">...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Benedict's semi-quantitative indicator */}
            {currentTest.id === 'reducing_sugar' && (
              <div className="rounded-lg border border-line bg-canvas p-3 text-xs space-y-1.5">
                <div className="font-semibold text-ink">
                  <T value={FOOD_TESTS_LAB.semiQuantLabel} />
                </div>
                <div className="flex h-4 w-full rounded-md overflow-hidden text-[9px] font-bold text-white text-center">
                  <div className="w-1/4 bg-blue-500 flex items-center justify-center">None</div>
                  <div className="w-1/4 bg-green-500 flex items-center justify-center">Low</div>
                  <div className="w-1/4 bg-amber-500 flex items-center justify-center">Mod</div>
                  <div className="w-1/4 bg-red-600 flex items-center justify-center">High</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Paper 6 Practical Exam Guide */}
      {activeTab === 'guide' && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Safety */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <span>⚠️</span>
                <T value={FOOD_TESTS_LAB.safetyTitle} />
              </div>
              <p className="text-amber-800 leading-relaxed">
                <T value={currentTest.safetyNote} />
              </p>
            </div>

            {/* Control variables */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-blue-900">
                <span>⚖️</span>
                <T value={FOOD_TESTS_LAB.controlTitle} />
              </div>
              <p className="text-blue-800 leading-relaxed">
                <T value={currentTest.controlVariable} />
              </p>
            </div>

            {/* Exam traps */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-rose-900">
                <span>🎯</span>
                <T value={FOOD_TESTS_LAB.trapTitle} />
              </div>
              <p className="text-rose-800 leading-relaxed">
                <T value={currentTest.paper6Notes} />
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-canvas p-4 text-xs space-y-2">
            <h4 className="font-semibold text-ink flex items-center gap-2">
              <span>💧</span>
              <T value={FOOD_TESTS_LAB.blankControl} />
            </h4>
            <p className="text-ink-soft leading-relaxed">
              In IGCSE Paper 6, you are frequently asked to state the purpose of running the test with distilled water.
              The mark scheme always looks for: <strong>to act as a negative control</strong> to prove that the reagent
              does not change colour in the absence of the nutrient, ensuring that any colour change is solely due to the food substance.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Summary Results Matrix */}
      {activeTab === 'summary' && (
        <div className="overflow-x-auto rounded-xl border border-line bg-canvas">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-surface text-muted">
              <tr>
                <th className="p-3"><T value={FOOD_TESTS_LAB.testLabel} /></th>
                <th className="p-3"><T value={FOOD_TESTS_LAB.reagentLabel} /></th>
                <th className="p-3"><T value={FOOD_TESTS_LAB.currentStatus} /></th>
                <th className="p-3"><T value={FOOD_TESTS_LAB.positiveResult} /></th>
                <th className="p-3"><T value={FOOD_TESTS_LAB.negativeResult} /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {extra.tests.map((t) => (
                <tr key={t.id} className="hover:bg-surface/50">
                  <td className="p-3 font-semibold text-ink">
                    <T value={t.name} />
                  </td>
                  <td className="p-3 text-ink-soft">
                    <T value={t.reagent} />
                  </td>
                  <td className="p-3 text-muted">
                    {t.heatingRequired ? 'Hot water bath (80°C)' : 'Room temp'}
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.colorCodePositive }} />
                      <T value={t.positiveColor} />
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.colorCodeNegative }} />
                      <T value={t.negativeColor} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
