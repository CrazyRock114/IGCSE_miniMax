import { useState } from 'react'
import type { RadioactivityLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { RADIOACTIVITY_LAB } from '@/lib/lessonExtrasStrings'
import {
  calculateRadioactiveDecay,
  calculateAbsorption,
  type RadiationType,
  type AbsorberMaterial,
} from '@/content/radioactivityLabData'

interface RadioactivityLabProps {
  extra: RadioactivityLabExtra
}

export function RadioactivityLab({ extra }: RadioactivityLabProps) {
  const [activeTab, setActiveTab] = useState<'decay' | 'penetration'>('decay')

  // Decay tab state
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(20)
  const decayState = calculateRadioactiveDecay(
    elapsedMinutes,
    extra.halfLifeSeconds,
    extra.initialCountRateBq,
    extra.backgroundCountRateBq,
  )

  // Penetration tab state
  const [selectedSource, setSelectedSource] = useState<RadiationType>('alpha')
  const [selectedAbsorber, setSelectedAbsorber] = useState<AbsorberMaterial>('none')
  const absorption = calculateAbsorption(
    selectedSource,
    selectedAbsorber,
    extra.initialCountRateBq,
    extra.backgroundCountRateBq,
  )

  const activeRadiationInfo =
    extra.radiations.find((r) => r.type === selectedSource) ?? extra.radiations[0]!

  // Generate 25 points for decay curve
  const curvePoints = Array.from({ length: 26 }, (_, i) => {
    const t = i * 4
    return calculateRadioactiveDecay(
      t,
      extra.halfLifeSeconds,
      extra.initialCountRateBq,
      extra.backgroundCountRateBq,
    )
  })

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

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('decay')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'decay'
              ? 'bg-accent text-white shadow-sm'
              : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
          }`}
        >
          <T value={RADIOACTIVITY_LAB.tabDecay} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('penetration')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'penetration'
              ? 'bg-accent text-white shadow-sm'
              : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
          }`}
        >
          <T value={RADIOACTIVITY_LAB.tabPenetration} />
        </button>
      </div>

      {/* Tab 1: Decay Curve & Background Subtraction */}
      {activeTab === 'decay' && (
        <div className="space-y-6">
          {/* Quick Half-Life Step Buttons */}
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((n) => {
              const t = n * extra.halfLifeSeconds
              return (
                <button
                  key={`hl-btn-${n}`}
                  type="button"
                  onClick={() => setElapsedMinutes(t)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    elapsedMinutes === t
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface-elevated text-content hover:bg-surface-muted'
                  }`}
                >
                  {n === 0 ? 't = 0 (Initial)' : `t = ${n} × t½ (${t} min)`}
                </button>
              )
            })}
          </div>

          {/* Decay Graph SVG */}
          <div className="overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">
              <T value={RADIOACTIVITY_LAB.graphTitle} />
            </h4>
            <svg viewBox="0 0 680 260" className="mx-auto w-full max-w-[640px]" aria-label="Decay Curve">
              {/* Axes */}
              <line x1="50" y1="210" x2="640" y2="210" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="50" y1="210" x2="50" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Axis labels */}
              <text x="590" y="226" fontSize="10" fill="#64748B" fontWeight="bold">
                Time (min)
              </text>
              <text x="12" y="25" fontSize="10" fill="#64748B" fontWeight="bold">
                Count Rate (Bq)
              </text>

              {/* Time axis half-life intervals */}
              {[0, 20, 40, 60, 80, 100].map((t) => (
                <g key={`time-tick-${t}`}>
                  <line x1={50 + t * 5.6} y1="210" x2={50 + t * 5.6} y2="215" stroke="#94A3B8" />
                  <text x={44 + t * 5.6} y="225" fontSize="9" fill="#64748B">
                    {t}
                  </text>
                  {t > 0 && t % 20 === 0 && (
                    <text x={42 + t * 5.6} y="238" fontSize="8" fill="#F59E0B" fontWeight="bold">
                      {t / 20} t½
                    </text>
                  )}
                </g>
              ))}

              {/* Background radiation horizontal baseline (20 Bq -> y = 210 - 20 * 0.26 ≈ 204.8) */}
              <line x1="50" y1="205" x2="640" y2="205" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="490" y="200" fontSize="9" fill="#EF4444" fontWeight="bold">
                Background Baseline (20 Bq)
              </text>

              {/* Decay Curve Path */}
              {(() => {
                const dParts: string[] = []
                curvePoints.forEach((pt, idx) => {
                  const x = 50 + pt.timeMinutes * 5.6
                  const y = 210 - pt.rawCountRateBq * 0.26
                  dParts.push(`${idx === 0 ? 'M' : 'L'} ${x},${y}`)
                })
                return (
                  <path
                    d={dParts.join(' ')}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                  />
                )
              })()}

              {/* Current operating point & crosshairs */}
              {(() => {
                const curX = 50 + elapsedMinutes * 5.6
                const curY = 210 - decayState.rawCountRateBq * 0.26
                return (
                  <g>
                    <line x1={curX} y1="210" x2={curX} y2={curY} stroke="#F59E0B" strokeDasharray="2 2" />
                    <line x1="50" y1={curY} x2={curX} y2={curY} stroke="#F59E0B" strokeDasharray="2 2" />
                    <circle cx={curX} cy={curY} r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                    <text x={curX + 8} y={curY - 6} fontSize="10" fill="#0F172A" fontWeight="bold">
                      {decayState.rawCountRateBq} Bq (Net: {decayState.correctedCountRateBq} Bq)
                    </text>
                  </g>
                )
              })()}
            </svg>
          </div>

          {/* Time Slider Control */}
          <div className="rounded-xl border border-line bg-surface-muted p-4">
            <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
              <T value={RADIOACTIVITY_LAB.timeSlider} /> {elapsedMinutes} min ({decayState.halfLivesElapsed} half-lives)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="2"
              value={elapsedMinutes}
              onChange={(e) => setElapsedMinutes(parseInt(e.target.value, 10))}
              className="w-full accent-accent"
            />
          </div>

          {/* Count Rate Breakdown Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-surface-muted p-3">
              <span className="text-xs text-content-muted">
                <T value={RADIOACTIVITY_LAB.measuredCount} />
              </span>
              <p className="text-lg font-bold text-content">{decayState.rawCountRateBq} Bq</p>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3">
              <span className="text-xs text-red-600 dark:text-red-400">
                <T value={RADIOACTIVITY_LAB.backgroundCount} />
              </span>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">− {extra.backgroundCountRateBq} Bq</p>
            </div>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-3 sm:col-span-2">
              <span className="text-xs text-accent">
                <T value={RADIOACTIVITY_LAB.correctedCount} />
              </span>
              <p className="text-2xl font-extrabold text-accent">
                {decayState.correctedCountRateBq} Bq
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Penetrating Power & Field Deflection Test */}
      {activeTab === 'penetration' && (
        <div className="space-y-6">
          {/* Controls: Source & Absorber */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={RADIOACTIVITY_LAB.selectSource} />
              </label>
              <div className="flex gap-2">
                {(['alpha', 'beta', 'gamma'] as RadiationType[]).map((st) => (
                  <button
                    key={`source-${st}`}
                    type="button"
                    onClick={() => setSelectedSource(st)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold uppercase transition-colors ${
                      selectedSource === st
                        ? 'bg-accent text-white shadow-sm'
                        : 'border border-line bg-surface text-content hover:bg-surface-elevated'
                    }`}
                  >
                    {st === 'alpha' ? 'α Alpha' : st === 'beta' ? 'β Beta' : 'γ Gamma'}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={RADIOACTIVITY_LAB.selectAbsorber} />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAbsorber('none')}
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    selectedAbsorber === 'none'
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface text-content hover:bg-surface-elevated'
                  }`}
                >
                  <T value={RADIOACTIVITY_LAB.absorberNone} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAbsorber('paper')}
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    selectedAbsorber === 'paper'
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface text-content hover:bg-surface-elevated'
                  }`}
                >
                  <T value={RADIOACTIVITY_LAB.absorberPaper} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAbsorber('aluminium')}
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    selectedAbsorber === 'aluminium'
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface text-content hover:bg-surface-elevated'
                  }`}
                >
                  <T value={RADIOACTIVITY_LAB.absorberAluminium} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAbsorber('lead')}
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    selectedAbsorber === 'lead'
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface text-content hover:bg-surface-elevated'
                  }`}
                >
                  <T value={RADIOACTIVITY_LAB.absorberLead} />
                </button>
              </div>
            </div>
          </div>

          {/* Penetration Bench SVG Diagram */}
          <div className="overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
            <svg viewBox="0 0 640 180" className="mx-auto w-full max-w-[600px]" aria-label="Penetration Apparatus">
              {/* Lead Shielded Radioactive Source Box on Left (x=40, y=50) */}
              <rect x="40" y="50" width="70" height="80" fill="#334155" stroke="#1E293B" strokeWidth="2" rx="4" />
              <rect x="50" y="60" width="50" height="60" fill="#475569" />
              {/* Radiation Symbol Icon */}
              <circle cx="75" cy="90" r="14" fill="#FACC15" />
              <circle cx="75" cy="90" r="4" fill="#0F172A" />
              <polygon points="75,86 68,74 82,74" fill="#0F172A" />
              <polygon points="71,92 59,99 66,111" fill="#0F172A" />
              <polygon points="79,92 91,99 84,111" fill="#0F172A" />
              {/* Collimator aperture */}
              <rect x="110" y="80" width="15" height="20" fill="#1E293B" />
              <text x="45" y="148" fontSize="10" fill="#64748B" fontWeight="bold">
                Source: {selectedSource.toUpperCase()}
              </text>

              {/* Radiation Beam Trajectory (x=125 to 300) */}
              <line
                x1="125"
                y1="90"
                x2="300"
                y2="90"
                stroke={selectedSource === 'alpha' ? '#EF4444' : selectedSource === 'beta' ? '#3B82F6' : '#10B981'}
                strokeWidth="3.5"
                strokeDasharray={selectedSource === 'gamma' ? 'none' : '4 4'}
              />

              {/* Absorber Barrier (x=300, y=40, width=20, height=100) */}
              {selectedAbsorber !== 'none' && (
                <g>
                  <rect
                    x="300"
                    y="40"
                    width={selectedAbsorber === 'lead' ? '28' : selectedAbsorber === 'aluminium' ? '18' : '8'}
                    height="100"
                    fill={selectedAbsorber === 'lead' ? '#475569' : selectedAbsorber === 'aluminium' ? '#CBD5E1' : '#FEF08A'}
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    rx="2"
                  />
                  <text x="290" y="155" fontSize="10" fill="#0F172A" fontWeight="bold">
                    {selectedAbsorber.toUpperCase()}
                  </text>
                </g>
              )}

              {/* Trajectory After Absorber to GM tube (x=330 to 480) */}
              {!absorption.isStopped && (
                <line
                  x1="330"
                  y1="90"
                  x2="480"
                  y2="90"
                  stroke={selectedSource === 'alpha' ? '#EF4444' : selectedSource === 'beta' ? '#3B82F6' : '#10B981'}
                  strokeWidth={selectedAbsorber === 'lead' ? '1.5' : '3.5'}
                  strokeDasharray={selectedSource === 'gamma' ? 'none' : '4 4'}
                  opacity={selectedAbsorber === 'lead' ? 0.4 : 1.0}
                />
              )}

              {/* Geiger-Müller (GM) Tube on Right (x=480, y=65) */}
              <rect x="480" y="65" width="110" height="50" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
              <rect x="480" y="70" width="12" height="40" fill="#94A3B8" />
              <text x="500" y="95" fontSize="12" fill="#0F172A" fontWeight="bold">
                GM TUBE
              </text>
              <line x1="590" y1="90" x2="630" y2="90" stroke="#475569" strokeWidth="2" />
              <circle cx="630" cy="90" r="4" fill="#DC2626" />
              <text x="495" y="130" fontSize="10" fill="#0F172A" fontWeight="bold">
                Rate: {absorption.detectedCountRateBq} Bq
              </text>
            </svg>
          </div>

          {/* Absorption Result Alert */}
          <div
            className={`rounded-xl border p-4 text-sm font-semibold ${
              absorption.isStopped
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            }`}
          >
            {absorption.isStopped ? (
              <T value={RADIOACTIVITY_LAB.absorbedStatusBlocked} />
            ) : (
              <T value={RADIOACTIVITY_LAB.absorbedStatusTransmitted} />
            )}
          </div>

          {/* Properties & Deflection Specs Card */}
          <div className="rounded-xl border border-line bg-surface-muted p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <T value={RADIOACTIVITY_LAB.deflectionHeading} /> ({activeRadiationInfo.name.en})
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-lg border border-line bg-surface p-3">
                <span className="font-semibold text-content">Physical Nature:</span>{' '}
                <T value={activeRadiationInfo.nature} />
              </div>
              <div className="rounded-lg border border-line bg-surface p-3">
                <span className="font-semibold text-content">Ionising Power:</span>{' '}
                <T value={activeRadiationInfo.ionisingPower} />
              </div>
              <div className="rounded-lg border border-line bg-surface p-3">
                <span className="font-semibold text-content">Electric Field Deflection:</span>{' '}
                <T value={activeRadiationInfo.electricDeflection} />
              </div>
              <div className="rounded-lg border border-line bg-surface p-3">
                <span className="font-semibold text-content">Magnetic Field Deflection:</span>{' '}
                <T value={activeRadiationInfo.magneticDeflection} />
              </div>
            </div>
          </div>
        </div>
      )}

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
