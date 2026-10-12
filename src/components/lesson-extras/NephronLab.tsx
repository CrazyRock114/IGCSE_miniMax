import { useState } from 'react'
import type { NephronLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { NEPHRON_LAB } from '@/lib/lessonExtrasStrings'
import {
  NEPHRON_REGIONS,
  FLUID_COMPOSITION_MATRIX,
  getAdhScenario,
} from '@/content/nephronLabData'

type ActiveTab = 'nephron' | 'fluids' | 'adh' | 'tips'
type AdhMode = 'dehydrated' | 'normal' | 'hydrated'

export function NephronLab({ extra }: { extra: NephronLabExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('nephron')
  const [selectedRegionId, setSelectedRegionId] = useState<string>('glomerulus')
  const [adhMode, setAdhMode] = useState<AdhMode>('dehydrated')

  const currentRegion =
    NEPHRON_REGIONS.find((r) => r.id === selectedRegionId) ?? NEPHRON_REGIONS[0]!

  const adhState = getAdhScenario(adhMode)

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab('nephron')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'nephron'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={NEPHRON_LAB.tabNephron} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('fluids')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'fluids'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={NEPHRON_LAB.tabFluids} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('adh')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'adh'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={NEPHRON_LAB.tabAdh} />
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
          <T value={NEPHRON_LAB.tabExamTips} />
        </button>
      </div>

      {activeTab === 'nephron' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Nephron SVG Interactive Canvas (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-xl border border-line bg-surface p-4 select-none">
              <div className="mb-2 flex items-center justify-between text-xs text-ink/60">
                <T value={NEPHRON_LAB.selectRegionPrompt} />
              </div>

              <svg viewBox="0 0 540 360" className="w-full text-ink">
                {/* Background cortex vs medulla division */}
                <rect x="0" y="0" width="540" height="190" fill="#BE123C" fillOpacity="0.05" />
                <rect x="0" y="190" width="540" height="170" fill="#BE123C" fillOpacity="0.12" />
                <line x1="0" y1="190" x2="540" y2="190" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 4" />
                <text x="10" y="25" fontSize="10" fill="currentColor" fillOpacity="0.4" fontWeight="bold">Renal Cortex (Outer)</text>
                <text x="10" y="210" fontSize="10" fill="currentColor" fillOpacity="0.4" fontWeight="bold">Renal Medulla (Inner)</text>

                {/* 1. Glomerulus & Bowman's Capsule (x=80, y=70) */}
                <g
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => setSelectedRegionId('glomerulus')}
                >
                  {/* Afferent arteriole (wider) */}
                  <line x1="25" y1="50" x2="65" y2="70" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
                  <text x="18" y="42" fontSize="8" fill="#DC2626" fontWeight="bold">Afferent (wide)</text>

                  {/* Efferent arteriole (narrower) */}
                  <line x1="65" y1="70" x2="35" y2="95" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
                  <text x="12" y="110" fontSize="8" fill="#DC2626">Efferent (narrow)</text>

                  {/* Glomerulus capillary knot */}
                  <circle cx="75" cy="72" r="14" fill="#EF4444" fillOpacity="0.4" stroke="#DC2626" strokeWidth="2" />
                  <path d="M 68 68 Q 75 80 82 66" fill="none" stroke="#DC2626" strokeWidth="2.5" />

                  {/* Bowman's capsule cup surrounding knot */}
                  <path
                    d="M 60 55 C 95 45 105 100 60 90"
                    fill="none"
                    stroke={selectedRegionId === 'glomerulus' ? '#F59E0B' : '#E2E8F0'}
                    strokeWidth={selectedRegionId === 'glomerulus' ? 5 : 3.5}
                  />
                  {selectedRegionId === 'glomerulus' && (
                    <circle cx="75" cy="72" r="22" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
                  )}
                  <text x="80" y="38" fontSize="9" textAnchor="middle" fill="currentColor" fontWeight="bold">
                    1. Glomerulus
                  </text>
                </g>

                {/* 2. Proximal Convoluted Tubule (PCT) (x=110 to 220, y=70) */}
                <g
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => setSelectedRegionId('proximal-tubule')}
                >
                  <path
                    d="M 98 80 C 130 50 140 120 180 80 C 200 60 220 90 230 140"
                    fill="none"
                    stroke={selectedRegionId === 'proximal-tubule' ? '#F59E0B' : '#38BDF8'}
                    strokeWidth={selectedRegionId === 'proximal-tubule' ? 6 : 4}
                  />
                  {/* Glucose Active Transport Arrows */}
                  <g fill="#10B981" stroke="#10B981" strokeWidth="1.5">
                    <line x1="150" y1="70" x2="165" y2="55" />
                    <polygon points="165,55 158,58 162,63" />
                    <text x="170" y="52" fontSize="8" fontWeight="bold">100% Glucose Reabsorbed</text>
                  </g>
                  <text x="160" y="115" fontSize="9" textAnchor="middle" fill="currentColor" fontWeight="bold">
                    2. Proximal Tubule (PCT)
                  </text>
                </g>

                {/* 3. Loop of Henle (descends deep into medulla) */}
                <g
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => setSelectedRegionId('loop-of-henle')}
                >
                  {/* Hairpin loop */}
                  <path
                    d="M 230 140 L 230 320 C 230 345 270 345 270 320 L 270 140"
                    fill="none"
                    stroke={selectedRegionId === 'loop-of-henle' ? '#F59E0B' : '#0284C7'}
                    strokeWidth={selectedRegionId === 'loop-of-henle' ? 6 : 4}
                  />
                  {/* Water osmosis arrows on descending limb */}
                  <g fill="#38BDF8" stroke="#38BDF8" strokeWidth="1.5">
                    <line x1="225" y1="230" x2="205" y2="230" />
                    <polygon points="205,230 210,227 210,233" />
                    <text x="180" y="233" fontSize="8">H₂O out</text>
                  </g>
                  {/* Salt pump arrows on ascending limb */}
                  <g fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5">
                    <line x1="275" y1="250" x2="295" y2="250" />
                    <polygon points="295,250 290,247 290,253" />
                    <text x="300" y="253" fontSize="8">Na⁺, Cl⁻ out</text>
                  </g>
                  <text x="250" y="340" fontSize="9" textAnchor="middle" fill="currentColor" fontWeight="bold">
                    3. Loop of Henle
                  </text>
                </g>

                {/* Distal Convoluted Tubule (DCT) */}
                <path
                  d="M 270 140 C 290 80 340 70 370 110"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="4"
                />
                <text x="320" y="80" fontSize="8" textAnchor="middle" fill="currentColor" fillOpacity="0.7">
                  Distal Tubule
                </text>

                {/* 4. Collecting Duct (x=370 to 450, vertical tube) */}
                <g
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => setSelectedRegionId('collecting-duct')}
                >
                  <path
                    d="M 370 110 L 410 110 L 410 340"
                    fill="none"
                    stroke={selectedRegionId === 'collecting-duct' ? '#F59E0B' : '#A855F7'}
                    strokeWidth={selectedRegionId === 'collecting-duct' ? 7 : 5}
                  />
                  {/* ADH water reabsorption */}
                  <g fill="#A855F7" stroke="#A855F7" strokeWidth="1.5">
                    <line x1="415" y1="230" x2="435" y2="230" />
                    <polygon points="435,230 430,227 430,233" />
                    <text x="440" y="233" fontSize="8" fontWeight="bold">ADH Water Osmosis</text>
                  </g>
                  <text x="410" y="95" fontSize="9" textAnchor="middle" fill="currentColor" fontWeight="bold">
                    4. Collecting Duct
                  </text>
                  <text x="410" y="355" fontSize="9" textAnchor="middle" fill="#EAB308" fontWeight="bold">
                    ↓ To Ureter (Urine)
                  </text>
                </g>
              </svg>
            </div>

            {/* Region selection buttons */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {NEPHRON_REGIONS.map((region) => {
                const isSelected = region.id === selectedRegionId
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`rounded-lg p-2 text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-accent text-white shadow-sm'
                        : 'border border-line bg-surface text-ink/70 hover:bg-white/5 hover:text-ink'
                    }`}
                  >
                    <T value={region.name} />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Region Details Inspector (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Region Inspector
              </span>
              <h4 className="text-base font-bold text-ink">
                <T value={currentRegion.name} />
              </h4>

              <div className="rounded-lg bg-accent/10 p-2.5 text-xs">
                <span className="font-semibold text-accent block mb-0.5">Primary Process:</span>
                <span className="text-ink font-medium">
                  <T value={currentRegion.process} />
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-ink/60 block mb-0.5">Substances Moving Across Epithelium:</strong>
                  <p className="leading-relaxed text-ink/90">
                    <T value={currentRegion.substancesMoved} />
                  </p>
                </div>

                <div className="border-t border-line/50 pt-2">
                  <strong className="text-ink/60 block mb-0.5">Structural & Microscopic Adaptations:</strong>
                  <p className="leading-relaxed text-ink/90">
                    <T value={currentRegion.keyFeature} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fluids' && (
        <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-ink">
              <T value={NEPHRON_LAB.tabFluids} />
            </h4>
            <span className="text-xs text-emerald-400 font-semibold">
              ✓ 100% Glucose Reabsorption · 0% Protein Leak
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line text-ink/60">
                  <th className="py-2.5"><T value={NEPHRON_LAB.colSubstance} /></th>
                  <th className="py-2.5"><T value={NEPHRON_LAB.colPlasma} /></th>
                  <th className="py-2.5"><T value={NEPHRON_LAB.colFiltrate} /></th>
                  <th className="py-2.5"><T value={NEPHRON_LAB.colUrine} /></th>
                  <th className="py-2.5"><T value={NEPHRON_LAB.colExplanation} /></th>
                </tr>
              </thead>
              <tbody>
                {FLUID_COMPOSITION_MATRIX.map((item, idx) => (
                  <tr key={idx} className="border-b border-line/40">
                    <td className="py-3 font-semibold text-ink">
                      <T value={item.substance} />
                    </td>
                    <td className="py-3 font-mono">{item.plasmaPercent}%</td>
                    <td className="py-3 font-mono">
                      {item.filtratePercent === 0.0 ? (
                        <span className="font-bold text-rose-400">0.0% (blocked)</span>
                      ) : (
                        `${item.filtratePercent}%`
                      )}
                    </td>
                    <td className="py-3 font-mono">
                      {item.urinePercent === 0.0 ? (
                        <span className="font-bold text-emerald-400">0.0% (reabsorbed)</span>
                      ) : (
                        <span className="font-bold text-accent">{item.urinePercent}%</span>
                      )}
                    </td>
                    <td className="py-3 text-ink/80 leading-relaxed max-w-xs">
                      <T value={item.statusNote} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'adh' && (
        <div className="space-y-6">
          {/* Mode Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAdhMode('dehydrated')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                adhMode === 'dehydrated'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'border border-line bg-surface text-ink/70 hover:bg-white/5'
              }`}
            >
              <T value={NEPHRON_LAB.dehydratedMode} />
            </button>
            <button
              type="button"
              onClick={() => setAdhMode('normal')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                adhMode === 'normal'
                  ? 'bg-accent text-white shadow-sm'
                  : 'border border-line bg-surface text-ink/70 hover:bg-white/5'
              }`}
            >
              <T value={NEPHRON_LAB.normalMode} />
            </button>
            <button
              type="button"
              onClick={() => setAdhMode('hydrated')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                adhMode === 'hydrated'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'border border-line bg-surface text-ink/70 hover:bg-white/5'
              }`}
            >
              <T value={NEPHRON_LAB.hydratedMode} />
            </button>
          </div>

          {/* ADH Negative Feedback Telemetry Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-xl border border-line bg-surface p-4 space-y-1">
              <span className="text-ink/60 text-[11px] block">
                <T value={NEPHRON_LAB.adhLevelLabel} />:
              </span>
              <strong className="text-base text-accent font-mono block">
                {adhState.adhLevel}
              </strong>
              <span className="text-[11px] text-ink/50">{adhState.bloodOsmolarity}</span>
            </div>

            <div className="rounded-xl border border-line bg-surface p-4 space-y-1">
              <span className="text-ink/60 text-[11px] block">
                <T value={NEPHRON_LAB.permeabilityLabel} />:
              </span>
              <strong className="text-sm text-ink block">
                {adhState.ductPermeability}
              </strong>
              <span className="text-[11px] text-ink/50">Aquaporin water channels open</span>
            </div>

            <div className="rounded-xl border border-line bg-surface p-4 space-y-1">
              <span className="text-ink/60 text-[11px] block">
                <T value={NEPHRON_LAB.urineVolumeLabel} />:
              </span>
              <strong className="text-sm text-ink block">
                {adhState.urineVolume}
              </strong>
            </div>

            <div className="rounded-xl border border-line bg-surface p-4 space-y-1">
              <span className="text-ink/60 text-[11px] block">
                <T value={NEPHRON_LAB.urineConcLabel} />:
              </span>
              <strong
                className={`text-sm block ${
                  adhMode === 'dehydrated'
                    ? 'text-amber-400'
                    : adhMode === 'hydrated'
                      ? 'text-sky-300'
                      : 'text-emerald-400'
                }`}
              >
                {adhState.urineConcentration}
              </strong>
            </div>
          </div>

          {/* Physiological Narrative */}
          <div className="rounded-xl border border-line bg-surface p-4 text-xs leading-relaxed text-ink/90">
            <strong className="text-accent block text-sm mb-1">
              Negative Feedback Loop Mechanism:
            </strong>
            <T value={adhState.explanation} />
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-xs text-ink/80 leading-relaxed space-y-2">
          <strong className="text-accent block text-sm">
            📝 Cambridge IGCSE Paper 4 Examiner Traps & Model Answers:
          </strong>
          <T value={extra.examinerNotes} />
        </div>
      )}
    </div>
  )
}
