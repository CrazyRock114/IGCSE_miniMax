import { useState } from 'react'
import type { TitrationLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { TITRATION_LAB } from '@/lib/lessonExtrasStrings'
import {
  TITRATION_INDICATORS,
  getTitrationVisualState,
  areTitresConcordant,
  type TitrationTrialRecord,
} from '@/content/titrationLabData'

type ActiveTab = 'bench' | 'concordance' | 'technique'

export function TitrationLab({ extra }: { extra: TitrationLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bench')
  const [indicatorId, setIndicatorId] = useState<'methyl-orange' | 'thymolphthalein' | 'phenolphthalein'>('methyl-orange')
  const [addedVolumeCm3, setAddedVolumeCm3] = useState<number>(0.0)
  const [trials, setTrials] = useState<TitrationTrialRecord[]>([])

  // Theoretical equivalence point is at 20.00 cm³
  const equivalenceVolume = 20.0

  const visualState = getTitrationVisualState(addedVolumeCm3, equivalenceVolume, indicatorId)

  const handleAddVolume = (vol: number) => {
    setAddedVolumeCm3((prev) => Math.min(50.0, Number((prev + vol).toFixed(2))))
  }

  const handleReset = () => {
    setAddedVolumeCm3(0.0)
  }

  const handleRecord = () => {
    const isRough = trials.length === 0
    const newRecord: TitrationTrialRecord = {
      trialNumber: trials.length + 1,
      isRough,
      initialBuretteCm3: 0.0,
      finalBuretteCm3: addedVolumeCm3,
      titreCm3: addedVolumeCm3,
      isConcordant: false,
    }

    const updated = [...trials, newRecord]
    // Check concordance among non-rough trials
    const accurateTrials = updated.filter((t) => !t.isRough)
    if (accurateTrials.length >= 2) {
      for (let i = 0; i < updated.length; i++) {
        const t1 = updated[i]!
        if (t1.isRough) continue
        const hasMatch = accurateTrials.some(
          (t2) => t2.trialNumber !== t1.trialNumber && areTitresConcordant(t1.titreCm3, t2.titreCm3)
        )
        t1.isConcordant = hasMatch
      }
    }
    setTrials(updated)
    setAddedVolumeCm3(0.0)
  }

  // Calculate mean concordant titre
  const concordantTrials = trials.filter((t) => !t.isRough && t.isConcordant)
  const meanTitre =
    concordantTrials.length > 0
      ? Number(
          (
            concordantTrials.reduce((sum, t) => sum + t.titreCm3, 0) /
            concordantTrials.length
          ).toFixed(2)
        )
      : null

  // Calculated concentration of NaOH: c(NaOH) = (c(HCl) * V_mean) / 25.0
  const calculatedConcentration =
    meanTitre !== null
      ? Number(((extra.titrant.knownConcentration * meanTitre) / extra.analyte.volumeCm3).toFixed(3))
      : null

  // Liquid height in burette: 0 to 50 cm³ mapped from y=40 to y=190
  const liquidY = 40 + (addedVolumeCm3 / 50.0) * 150

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
          <T value={TITRATION_LAB.tabBench} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('concordance')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'concordance'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={TITRATION_LAB.tabConcordance} /> ({trials.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('technique')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'technique'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={TITRATION_LAB.tabTechnique} />
        </button>
      </div>

      {activeTab === 'bench' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Apparatus & Interactive Canvas (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            {/* Indicator Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink/60 font-medium">
                <T value={TITRATION_LAB.indicatorChoice} />:
              </span>
              {TITRATION_INDICATORS.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setIndicatorId(ind.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    indicatorId === ind.id
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface text-ink/70 hover:bg-white/5 hover:text-ink'
                  }`}
                >
                  <T value={ind.name} />
                </button>
              ))}
            </div>

            {/* SVG Titration Rig */}
            <div className="rounded-xl border border-line bg-surface p-4 select-none">
              <svg viewBox="0 0 520 380" className="w-full text-ink">
                <rect x="0" y="0" width="520" height="380" fill="currentColor" fillOpacity="0.02" rx="10" />

                {/* Retort Stand & Clamp (left) */}
                <rect x="60" y="340" width="120" height="15" fill="#475569" rx="2" />
                <rect x="75" y="20" width="8" height="320" fill="#64748B" />
                {/* Clamp arms */}
                <rect x="75" y="70" width="120" height="6" fill="#94A3B8" />
                <rect x="75" y="150" width="120" height="6" fill="#94A3B8" />

                {/* Burette Tube (x=190, y=30 to y=220) */}
                <rect x="188" y="30" width="14" height="170" fill="#E2E8F0" fillOpacity="0.15" stroke="#64748B" strokeWidth="1.5" />
                {/* Acid solution inside burette */}
                <rect
                  x="189"
                  y={liquidY}
                  width="12"
                  height={Math.max(0, 200 - liquidY)}
                  fill="#93C5FD"
                  fillOpacity="0.5"
                />
                {/* Burette Millimeter Ticks */}
                {[0, 10, 20, 30, 40, 50].map((v) => {
                  const ty = 40 + (v / 50) * 150
                  return (
                    <g key={v}>
                      <line x1="202" y1={ty} x2="208" y2={ty} stroke="currentColor" strokeOpacity="0.4" />
                      <text x="212" y={ty + 3} fontSize="7" fill="currentColor" fillOpacity="0.6">
                        {v}
                      </text>
                    </g>
                  )
                })}

                {/* Stopcock (Tap) at y=200 */}
                <rect x="192" y="200" width="6" height="12" fill="#64748B" />
                <ellipse cx="195" cy="206" rx="6" ry="3" fill="#EF4444" />
                {/* Jet tip below tap */}
                <path d="M 193 212 L 197 212 L 195 222 Z" fill="#64748B" />

                {/* Droplets when dispensing */}
                {addedVolumeCm3 > 0 && addedVolumeCm3 < 50 && (
                  <ellipse cx="195" cy="232" rx="2" ry="3" fill="#93C5FD" className="animate-ping" />
                )}

                {/* White Tile under conical flask (y=320) */}
                <rect x="130" y="325" width="130" height="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="1" />
                <text x="195" y="348" fontSize="8" textAnchor="middle" fill="currentColor" fillOpacity="0.5">
                  White Tile
                </text>

                {/* Conical Flask (x=150 to 240, y=240 to 325) */}
                <path
                  d="M 188 240 L 202 240 L 202 260 L 235 325 L 155 325 L 188 260 Z"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="2"
                />
                {/* Liquid inside flask with dynamic color */}
                <path
                  d="M 172 290 L 218 290 L 233 323 L 157 323 Z"
                  fill={visualState.hexColor}
                  fillOpacity="0.75"
                  className="transition-colors duration-300"
                />
                {/* Swirl effect */}
                <ellipse cx="195" cy="292" rx="20" ry="3" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" />

                {/* Meniscus Zoom Bubble Inset (Right top) */}
                <g transform="translate(320, 50)">
                  <circle cx="65" cy="65" r="55" fill="#1E293B" stroke="#3B82F6" strokeWidth="2.5" />
                  <rect x="40" y="20" width="50" height="90" fill="#E2E8F0" fillOpacity="0.1" stroke="#94A3B8" strokeWidth="1" />
                  {/* Graduations in zoom */}
                  <line x1="75" y1="45" x2="90" y2="45" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="94" y="48" fontSize="8" fill="#FFFFFF">19.0</text>
                  <line x1="75" y1="65" x2="90" y2="65" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="94" y="68" fontSize="8" fill="#FFFFFF">20.0</text>
                  <line x1="75" y1="85" x2="90" y2="85" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="94" y="88" fontSize="8" fill="#FFFFFF">21.0</text>
                  {/* Curved Meniscus */}
                  <path
                    d={`M 45 ${50 + (addedVolumeCm3 % 5) * 6} Q 65 ${56 + (addedVolumeCm3 % 5) * 6} 85 ${50 + (addedVolumeCm3 % 5) * 6}`}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3"
                  />
                  {/* Red eyelevel guide */}
                  <line x1="30" y1="65" x2="100" y2="65" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="65" y="112" fontSize="9" textAnchor="middle" fill="#93C5FD" fontWeight="bold">
                    {addedVolumeCm3.toFixed(2)} cm³
                  </text>
                  <text x="65" y="132" fontSize="8" textAnchor="middle" fill="currentColor" fillOpacity="0.5">
                    Eye-level Meniscus
                  </text>
                </g>

                {/* End Point Alert Callout */}
                {visualState.isNeutralised && (
                  <g transform="translate(260, 245)" className="animate-bounce">
                    <rect x="0" y="0" width="170" height="28" rx="6" fill="#F97316" />
                    <text x="85" y="17" fontSize="10" textAnchor="middle" fill="#FFFFFF" fontWeight="bold">
                      ⚡ END POINT REACHED!
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Delivery Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddVolume(5.0)}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-white/10"
                >
                  <T value={TITRATION_LAB.btnDeliver5} />
                </button>
                <button
                  type="button"
                  onClick={() => handleAddVolume(1.0)}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-white/10"
                >
                  <T value={TITRATION_LAB.btnDeliver1} />
                </button>
                <button
                  type="button"
                  onClick={() => handleAddVolume(0.05)}
                  className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-white shadow transition-all hover:opacity-90"
                >
                  <T value={TITRATION_LAB.btnDrop} />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-white/10"
                >
                  <T value={TITRATION_LAB.btnResetBurette} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleRecord}
                disabled={addedVolumeCm3 === 0}
                className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow transition-all hover:bg-emerald-500 disabled:opacity-40"
              >
                <T value={TITRATION_LAB.btnRecordTitre} />
              </button>
            </div>
          </div>

          {/* Telemetry & Readout Panel (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            {/* Live Burette Readout Card */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                <T value={TITRATION_LAB.buretteReading} />
              </span>
              <div className="flex items-baseline justify-between rounded-lg bg-white/5 p-3">
                <span className="text-xs text-ink/70">
                  <T value={TITRATION_LAB.volumeAdded} />:
                </span>
                <span className="font-mono text-2xl font-bold text-accent">
                  {addedVolumeCm3.toFixed(2)} cm³
                </span>
              </div>

              {/* Indicator Color Swatch */}
              <div className="flex items-center gap-3 rounded-lg border border-line bg-white/5 p-3">
                <div
                  className="h-8 w-8 rounded-full border border-white/20 shadow-inner transition-colors duration-300"
                  style={{ backgroundColor: visualState.hexColor }}
                />
                <div className="text-xs">
                  <span className="text-ink/60 block text-[11px]">Current Flask Color:</span>
                  <span className="font-bold text-ink">
                    <T value={visualState.stateDescription} />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-line/50">
                <span className="text-ink/60">Estimated Solution pH:</span>
                <span className="font-mono font-bold text-ink">pH ≈ {visualState.pH}</span>
              </div>
            </div>

            {/* Practical Notes */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-2 text-xs">
              <h5 className="font-semibold text-accent uppercase tracking-wide">
                Key Experimental Techniques
              </h5>
              <p className="leading-relaxed text-ink/80">
                <T value={TITRATION_LAB.whiteTileLabel} />
              </p>
              <p className="leading-relaxed text-ink/80">
                <T value={TITRATION_LAB.meniscusReadingHint} />
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'concordance' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-surface p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-ink">
                Titration Table of Results (Paper 5/6 Standard Format)
              </h4>
              <span className="text-xs text-accent font-medium">
                <T value={TITRATION_LAB.concordantNotice} />
              </span>
            </div>

            {trials.length === 0 ? (
              <p className="text-xs text-ink/50 italic py-4">
                No trials recorded yet. Deliver acid on the testbench and click &quot;Record Titre to Table&quot;.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-ink/60">
                      <th className="py-2.5">Trial</th>
                      <th className="py-2.5">Type</th>
                      <th className="py-2.5">Initial (cm³)</th>
                      <th className="py-2.5">Final (cm³)</th>
                      <th className="py-2.5">Titre (cm³)</th>
                      <th className="py-2.5">Concordant?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trials.map((t) => (
                      <tr key={t.trialNumber} className="border-b border-line/40">
                        <td className="py-3 font-semibold text-ink">Trial {t.trialNumber}</td>
                        <td className="py-3">
                          <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${t.isRough ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {t.isRough ? 'Rough' : 'Accurate'}
                          </span>
                        </td>
                        <td className="py-3 font-mono">{t.initialBuretteCm3.toFixed(2)}</td>
                        <td className="py-3 font-mono">{t.finalBuretteCm3.toFixed(2)}</td>
                        <td className="py-3 font-mono font-bold text-accent">{t.titreCm3.toFixed(2)}</td>
                        <td className="py-3">
                          {t.isRough ? (
                            <span className="text-ink/40 italic">Excluded (Rough)</span>
                          ) : t.isConcordant ? (
                            <span className="text-emerald-400 font-bold">✓ Concordant (±0.10)</span>
                          ) : (
                            <span className="text-ink/40">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quantitative Calculation Card */}
          {meanTitre !== null && calculatedConcentration !== null && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-3 text-xs">
              <h5 className="font-bold text-emerald-400 text-sm">
                Volumetric Concentration Calculation
              </h5>
              <div className="space-y-1.5 text-ink/90 leading-relaxed">
                <div>
                  <strong>Mean Concordant Titre:</strong>{' '}
                  <span className="font-mono text-accent font-bold">{meanTitre.toFixed(2)} cm³</span>
                </div>
                <div>
                  <strong>1. Moles of HCl:</strong> n(HCl) = c × V = 0.125 mol/dm³ × ({meanTitre.toFixed(2)} ÷ 1000) dm³ ={' '}
                  <span className="font-mono font-bold">{((0.125 * meanTitre) / 1000).toFixed(5)} mol</span>
                </div>
                <div>
                  <strong>2. Stoichiometry:</strong> HCl + NaOH → NaCl + H₂O (1:1 ratio)
                </div>
                <div>
                  <strong>3. Concentration of NaOH:</strong> c(NaOH) = n ÷ V = {((0.125 * meanTitre) / 1000).toFixed(5)} mol ÷ 0.025 dm³ ={' '}
                  <strong className="text-emerald-400 font-mono text-sm">{calculatedConcentration.toFixed(3)} mol/dm³</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'technique' && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-xs text-ink/80 leading-relaxed space-y-2">
          <strong className="text-accent block text-sm">
            📝 Cambridge IGCSE Paper 5/6 Examiner Traps & Marking Scheme:
          </strong>
          <T value={extra.examinerNotes} />
        </div>
      )}
    </div>
  )
}
