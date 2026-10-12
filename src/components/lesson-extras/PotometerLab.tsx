import { useState, useEffect } from 'react'
import type { PotometerLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { POTOMETER_LAB } from '@/lib/lessonExtrasStrings'
import {
  POTOMETER_CONDITIONS,
  calculateBubbleDisplacement,
  type PotometerConditionSpec,
} from '@/content/potometerData'

type ActiveTab = 'bench' | 'comparison' | 'tips'

interface RecordedTrial {
  id: string
  conditionName: string
  timeSec: number
  distanceMm: number
  rateMmMin: number
}

export function PotometerLab({ extra }: { extra: PotometerLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bench')
  const [selectedConditionId, setSelectedConditionId] = useState<string>('baseline')
  const [elapsedSec, setElapsedSec] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [trials, setTrials] = useState<RecordedTrial[]>([])

  const currentCondition: PotometerConditionSpec =
    POTOMETER_CONDITIONS.find((c) => c.id === selectedConditionId) ?? POTOMETER_CONDITIONS[0]!

  // Stopwatch timer
  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(() => {
      setElapsedSec((prev) => {
        if (prev >= 60) {
          setIsRunning(false)
          return 60
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isRunning])

  const displacementMm = calculateBubbleDisplacement(currentCondition.bubbleSpeedMmMin, elapsedSec)
  const currentRateMmMin = elapsedSec > 0 ? Number(((displacementMm / elapsedSec) * 60).toFixed(1)) : 0

  const handleResetBubble = () => {
    setIsRunning(false)
    setElapsedSec(0)
  }

  const handleRecord = () => {
    const newTrial: RecordedTrial = {
      id: `${currentCondition.id}-${Date.now()}`,
      conditionName: currentCondition.name.en,
      timeSec: elapsedSec,
      distanceMm: displacementMm,
      rateMmMin: currentRateMmMin || currentCondition.bubbleSpeedMmMin,
    }
    setTrials((prev) => [newTrial, ...prev])
  }

  // Capillary X-mapping:
  // Ruler 0 to 30 mm mapped from x=240 to x=540 (10px per mm)
  const bubbleX = 240 + Math.min(30, displacementMm) * 10

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab('bench')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'bench'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={POTOMETER_LAB.tabBench} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('comparison')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'comparison'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={POTOMETER_LAB.tabComparison} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tips')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'tips'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={POTOMETER_LAB.tabExamTips} />
        </button>
      </div>

      {activeTab === 'bench' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Apparatus & Controls (8 cols) */}
          <div className="space-y-4 lg:col-span-8">
            {/* Environmental Condition Selector */}
            <div className="flex flex-wrap gap-2">
              {POTOMETER_CONDITIONS.map((cond) => {
                const isSelected = cond.id === selectedConditionId
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => {
                      setSelectedConditionId(cond.id)
                      handleResetBubble()
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-accent text-white shadow-sm'
                        : 'border border-line bg-surface text-ink/70 hover:bg-white/5 hover:text-ink'
                    }`}
                  >
                    <T value={cond.name} />
                  </button>
                )
              })}
            </div>

            {/* Virtual Potometer SVG Apparatus */}
            <div className="rounded-xl border border-line bg-surface p-4 shadow-sm select-none">
              <svg viewBox="0 0 620 320" className="w-full text-ink">
                {/* Background Grid & Labels */}
                <rect x="0" y="0" width="620" height="320" fill="currentColor" fillOpacity="0.02" rx="10" />

                {/* Environmental Microclimate Visual Effects */}
                {selectedConditionId === 'wind' && (
                  <g className="text-cyan-400 opacity-70">
                    <path d="M 30 50 Q 80 40 140 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                    <path d="M 20 70 Q 70 60 130 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 4" />
                    <path d="M 35 90 Q 85 80 145 90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 3" />
                    <text x="30" y="38" fontSize="11" fill="currentColor" fontWeight="700">💨 Fan Breeze (Strips boundary layer)</text>
                  </g>
                )}
                {selectedConditionId === 'light' && (
                  <g className="text-yellow-400 opacity-60">
                    <circle cx="60" cy="50" r="16" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                    <line x1="60" y1="20" x2="60" y2="10" stroke="currentColor" strokeWidth="2" />
                    <line x1="60" y1="80" x2="60" y2="90" stroke="currentColor" strokeWidth="2" />
                    <line x1="30" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="2" />
                    <line x1="90" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
                    <text x="25" y="110" fontSize="11" fill="currentColor" fontWeight="700">☀️ Bright Lamp (Stomata Wide Open)</text>
                  </g>
                )}
                {selectedConditionId === 'warm' && (
                  <g className="text-orange-400 opacity-60">
                    <path d="M 40 90 Q 50 70 40 50" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M 60 90 Q 70 70 60 50" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M 80 90 Q 90 70 80 50" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="30" y="110" fontSize="11" fill="currentColor" fontWeight="700">♨ 30°C Warm Air (Fast Evaporation)</text>
                  </g>
                )}
                {selectedConditionId === 'humidity' && (
                  <g className="text-sky-400 opacity-70">
                    {/* Clear plastic bag outline enclosing leafy shoot */}
                    <path
                      d="M 125 10 C 100 10 100 150 120 160 L 190 160 C 210 150 210 10 185 10 Z"
                      fill="currentColor"
                      fillOpacity="0.1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <text x="110" y="180" fontSize="10" fill="currentColor" fontWeight="600">💧 Plastic bag (Saturated humidity)</text>
                  </g>
                )}

                {/* Leafy Shoot */}
                <g transform="translate(150, 40)">
                  {/* Stem cut underwater */}
                  <line x1="5" y1="110" x2="5" y2="0" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
                  {/* Leaves */}
                  <path d="M 5 20 Q -40 -10 -5 10 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
                  <path d="M 5 40 Q 50 15 15 35 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
                  <path d="M 5 60 Q -45 40 -10 55 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
                  <path d="M 5 80 Q 45 60 12 75 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />
                  <circle cx="5" cy="5" r="4" fill="#86EFAC" />
                </g>

                {/* Rubber Bung & Vaseline Seal */}
                <rect x="142" y="150" width="26" height="20" fill="#78350F" rx="3" />
                {/* Vaseline seal collar */}
                <ellipse cx="155" cy="150" rx="16" ry="4" fill="#FDE047" fillOpacity="0.8" />
                <text x="80" y="152" fontSize="9" fill="currentColor" fillOpacity="0.6">Vaseline Seal</text>
                <line x1="125" y1="150" x2="139" y2="150" stroke="currentColor" strokeOpacity="0.3" />

                {/* Glass Tubing */}
                {/* Vertical stem tube under bung */}
                <rect x="148" y="170" width="14" height="60" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="1.5" />

                {/* Reservoir & Screw clip tap */}
                <g transform="translate(100, 160)">
                  {/* Syringe/Reservoir cylinder */}
                  <rect x="0" y="0" width="25" height="50" fill="#E2E8F0" fillOpacity="0.2" stroke="#64748B" strokeWidth="1.5" rx="2" />
                  {/* Water in reservoir */}
                  <rect x="2" y="10" width="21" height="38" fill="#38BDF8" fillOpacity="0.4" />
                  {/* Plunger */}
                  <rect x="4" y="-8" width="17" height="18" fill="#475569" rx="1" />
                  {/* Tap/Clip */}
                  <rect x="25" y="32" width="23" height="8" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="1.5" />
                  <circle cx="36" cy="36" r="5" fill="#EF4444" />
                  <text x="-35" y="28" fontSize="9" fill="currentColor" fillOpacity="0.6">Water Reservoir</text>
                </g>

                {/* T-junction to capillary */}
                <rect x="148" y="222" width="410" height="12" fill="#38BDF8" fillOpacity="0.25" stroke="#0284C7" strokeWidth="1.5" rx="2" />

                {/* Capillary Scale (Ruler) */}
                <g transform="translate(240, 240)">
                  <rect x="0" y="0" width="300" height="16" fill="#F8FAFC" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
                  {/* Ticks every 10px (1mm) */}
                  {Array.from({ length: 31 }, (_, i) => (
                    <g key={i}>
                      <line
                        x1={i * 10}
                        y1="0"
                        x2={i * 10}
                        y2={i % 5 === 0 ? 8 : 4}
                        stroke="currentColor"
                        strokeOpacity={i % 5 === 0 ? 0.8 : 0.3}
                      />
                      {i % 5 === 0 && (
                        <text x={i * 10} y="14" fontSize="8" textAnchor="middle" fill="currentColor" fillOpacity="0.7">
                          {i}
                        </text>
                      )}
                    </g>
                  ))}
                  <text x="150" y="25" fontSize="9" textAnchor="middle" fill="currentColor" fillOpacity="0.5">
                    Millimeter Scale (0 — 30 mm)
                  </text>
                </g>

                {/* Air Bubble in capillary */}
                <g transform={`translate(${bubbleX}, 223)`}>
                  {/* Bubble cylinder */}
                  <rect x="0" y="1" width="18" height="10" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.5" rx="3" />
                  {/* Meniscus curves */}
                  <path d="M 0 1 Q 3 6 0 11" fill="none" stroke="#EF4444" strokeWidth="1.5" />
                  <path d="M 18 1 Q 15 6 18 11" fill="none" stroke="#EF4444" strokeWidth="1.5" />
                  {/* Pin label */}
                  <line x1="9" y1="0" x2="9" y2="-12" stroke="#EF4444" strokeWidth="1.5" />
                  <polygon points="6,-12 12,-12 9,-18" fill="#EF4444" />
                  <text x="9" y="-22" fontSize="9" textAnchor="middle" fill="#EF4444" fontWeight="700">
                    Air Bubble ({displacementMm} mm)
                  </text>
                </g>

                {/* Flow direction arrow */}
                <g transform="translate(360, 205)" opacity="0.6">
                  <line x1="40" y1="0" x2="0" y2="0" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="0,-4 0,4 -6,0" fill="currentColor" />
                  <text x="20" y="-8" fontSize="9" textAnchor="middle" fill="currentColor">
                    Transpiration Pull ←
                  </text>
                </g>

                {/* Beaker of water on right */}
                <g transform="translate(558, 195)">
                  <rect x="0" y="0" width="40" height="55" fill="none" stroke="#64748B" strokeWidth="2" rx="2" />
                  <rect x="2" y="15" width="36" height="38" fill="#38BDF8" fillOpacity="0.4" />
                  <text x="20" y="65" fontSize="8" textAnchor="middle" fill="currentColor" fillOpacity="0.6">Water</text>
                </g>
              </svg>
            </div>

            {/* Practical Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsRunning(!isRunning)}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:opacity-90"
                >
                  <T value={isRunning ? POTOMETER_LAB.btnPause : POTOMETER_LAB.btnStart} />
                </button>
                <button
                  type="button"
                  onClick={handleResetBubble}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/10"
                >
                  <T value={POTOMETER_LAB.btnResetBubble} />
                </button>
                <button
                  type="button"
                  onClick={handleRecord}
                  disabled={elapsedSec === 0}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/10 disabled:opacity-40"
                >
                  <T value={POTOMETER_LAB.btnRecord} />
                </button>
              </div>

              {/* Stopwatch Readout */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink/60">
                  <T value={POTOMETER_LAB.elapsedTime} />:
                </span>
                <span className="font-mono text-lg font-bold text-accent">
                  {String(Math.floor(elapsedSec / 60)).padStart(2, '0')}:{String(elapsedSec % 60).padStart(2, '0')} s
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Telemetry & Biological State (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            {/* Live Measurements Card */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <h4 className="text-sm font-semibold text-ink">
                <T value={POTOMETER_LAB.transpirationRate} />
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-2.5">
                  <span className="text-xs text-ink/70">
                    <T value={POTOMETER_LAB.distanceMoved} />
                  </span>
                  <span className="font-mono text-base font-bold text-accent">
                    {displacementMm.toFixed(1)} mm
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-accent/10 p-2.5">
                  <span className="text-xs font-semibold text-accent">
                    <T value={POTOMETER_LAB.transpirationRate} />
                  </span>
                  <span className="font-mono text-base font-bold text-accent">
                    {currentCondition.bubbleSpeedMmMin} mm/min
                  </span>
                </div>
              </div>

              {/* Badges for Stomata & Gradient */}
              <div className="space-y-2 border-t border-line/50 pt-2 text-xs">
                <div>
                  <span className="text-ink/50 text-[11px] block">
                    <T value={POTOMETER_LAB.stomataStatus} />:
                  </span>
                  <span className="font-medium text-ink">
                    <T value={currentCondition.stomataState} />
                  </span>
                </div>
                <div>
                  <span className="text-ink/50 text-[11px] block">
                    <T value={POTOMETER_LAB.gradientStatus} />:
                  </span>
                  <span className="font-medium text-ink">
                    <T value={currentCondition.gradientNote} />
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="rounded-xl border border-line bg-surface p-4">
              <h5 className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                Mechanism in Spongy Mesophyll
              </h5>
              <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
                <T value={currentCondition.explanation} />
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {/* Comparison Bar Table */}
          <div className="rounded-xl border border-line bg-surface p-4 space-y-4">
            <h4 className="text-sm font-semibold text-ink">
              All 5 Environmental Variables Comparison (Expected Bubble Speed)
            </h4>
            <div className="space-y-3">
              {POTOMETER_CONDITIONS.map((cond) => {
                const percent = (cond.bubbleSpeedMmMin / 30) * 100
                return (
                  <div key={cond.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-ink">
                      <span><T value={cond.name} /></span>
                      <span className="font-mono font-bold text-accent">{cond.bubbleSpeedMmMin} mm/min</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cond.transpirationRate === 'very-high'
                            ? 'bg-cyan-500'
                            : cond.transpirationRate === 'high'
                              ? 'bg-emerald-500'
                              : cond.transpirationRate === 'low'
                                ? 'bg-rose-500'
                                : 'bg-blue-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Student Logged Trials Table */}
          <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-ink">
                <T value={POTOMETER_LAB.recordedTrials} /> ({trials.length})
              </h4>
              {trials.length > 0 && (
                <button
                  type="button"
                  onClick={() => setTrials([])}
                  className="text-xs text-rose-400 hover:underline"
                >
                  <T value={POTOMETER_LAB.clearRecords} />
                </button>
              )}
            </div>

            {trials.length === 0 ? (
              <p className="text-xs text-ink/50 italic py-2">
                No trials logged yet. Click &quot;Record Reading&quot; during or after a run on the bench tab.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-ink/60">
                      <th className="py-2">Condition</th>
                      <th className="py-2">Time (s)</th>
                      <th className="py-2">Distance (mm)</th>
                      <th className="py-2">Rate (mm/min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trials.map((t) => (
                      <tr key={t.id} className="border-b border-line/40">
                        <td className="py-2 font-medium text-ink">{t.conditionName}</td>
                        <td className="py-2 font-mono">{t.timeSec}s</td>
                        <td className="py-2 font-mono">{t.distanceMm.toFixed(1)}</td>
                        <td className="py-2 font-mono font-bold text-accent">{t.rateMmMin.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="rounded-xl border border-line bg-surface p-6 space-y-4">
          <h4 className="text-base font-semibold text-ink flex items-center gap-2">
            <span>🔬</span>
            Paper 6 Practical Setup & Experimental Design Essentials
          </h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-line bg-white/5 p-3.5 space-y-1.5">
              <strong className="text-accent block">1. Cut Shoot Underwater</strong>
              <p className="text-ink/80 leading-relaxed">
                Cutting the stem underwater prevents air bubbles from being sucked into the xylem vessels, which would break the continuous water column required for cohesion-tension.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white/5 p-3.5 space-y-1.5">
              <strong className="text-accent block">2. Petroleum Jelly (Vaseline) Seal</strong>
              <p className="text-ink/80 leading-relaxed">
                Applied around the rubber stopper and glass joint to make the entire apparatus airtight. Any air leak would prevent water from being drawn along the capillary tube.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white/5 p-3.5 space-y-1.5">
              <strong className="text-accent block">3. Acclimatisation Time</strong>
              <p className="text-ink/80 leading-relaxed">
                When changing conditions (e.g. moving the lamp or turning on a fan), allow the plant shoot 5 to 10 minutes to equilibrate before starting the stopwatch.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white/5 p-3.5 space-y-1.5">
              <strong className="text-accent block">4. Rate Formula & Controlled Variables</strong>
              <p className="text-ink/80 leading-relaxed">
                Rate = distance moved (d) ÷ time taken (t). Controlled variables: same shoot (leaf surface area), constant ambient temperature when testing light intensity.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3.5 text-xs text-ink/80 leading-relaxed">
            <strong className="text-accent block mb-1">Examiner Note:</strong>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
