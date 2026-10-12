import { useState } from 'react'
import type { BreedingGardenExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { BREEDING_GARDEN } from '@/lib/lessonExtrasStrings'
import {
  PEA_TRAITS,
  simulateHarvest,
  type PeaTraitSpec,
} from '@/content/breedingGardenData'

type ActiveTab = 'harvest' | 'stats' | 'crossTypes'

export function BreedingGarden({ extra }: { extra: BreedingGardenExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('harvest')
  const [selectedTraitId, setSelectedTraitId] = useState<string>('seed-shape')
  const [crossStrategy, setCrossStrategy] = useState<'3:1' | '1:1'>('3:1')
  const [sampleSize, setSampleSize] = useState<number>(100)
  const [seedModifier, setSeedModifier] = useState<number>(1)

  const currentTrait: PeaTraitSpec =
    PEA_TRAITS.find((t) => t.id === selectedTraitId) ?? PEA_TRAITS[0]!

  const harvest = simulateHarvest(sampleSize, crossStrategy, 123456 + seedModifier * 7919)

  const handleHarvestNew = () => {
    setSeedModifier((prev) => prev + 1)
  }

  const domRatio = (harvest.observedDominant / Math.max(1, harvest.observedRecessive)).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab('harvest')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'harvest'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={BREEDING_GARDEN.tabHarvest} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'stats'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={BREEDING_GARDEN.tabStats} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('crossTypes')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'crossTypes'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={BREEDING_GARDEN.tabCrossTypes} />
        </button>
      </div>

      {/* Top Configuration Toolbar */}
      <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
        {/* Trait Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {PEA_TRAITS.map((trait) => {
            const isSelected = trait.id === selectedTraitId
            return (
              <button
                key={trait.id}
                type="button"
                onClick={() => setSelectedTraitId(trait.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-accent text-white shadow-sm'
                    : 'border border-line bg-white/5 text-ink/70 hover:bg-white/10 hover:text-ink'
                }`}
              >
                <T value={trait.name} />
              </button>
            )
          })}
        </div>

        {/* Cross Strategy & Sample Size */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/50 pt-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink/60 font-medium">
              <T value={BREEDING_GARDEN.crossModeLabel} />:
            </span>
            <button
              type="button"
              onClick={() => setCrossStrategy('3:1')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                crossStrategy === '3:1' ? 'bg-accent text-white' : 'bg-white/5 text-ink/70 hover:bg-white/10'
              }`}
            >
              F₁ × F₁ (3:1)
            </button>
            <button
              type="button"
              onClick={() => setCrossStrategy('1:1')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                crossStrategy === '1:1' ? 'bg-accent text-white' : 'bg-white/5 text-ink/70 hover:bg-white/10'
              }`}
            >
              Test Cross (1:1)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink/60 font-medium">
              <T value={BREEDING_GARDEN.sampleSizeLabel} />:
            </span>
            {[20, 100, 500].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSampleSize(size)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors ${
                  sampleSize === size ? 'bg-accent text-white' : 'bg-white/5 text-ink/70 hover:bg-white/10'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleHarvestNew}
            className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow transition-all hover:bg-emerald-500"
          >
            <T value={BREEDING_GARDEN.btnHarvest} />
          </button>
        </div>
      </div>

      {activeTab === 'harvest' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Virtual Pods Display (7 cols) */}
          <div className="rounded-xl border border-line bg-surface p-4 space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink">
                Harvest Field ({sampleSize} Seeds Harvested)
              </span>
              <span className="text-ink/50 italic">
                {sampleSize === 20 ? 'Small batch: High random noise' : 'Large field: Tightly converging'}
              </span>
            </div>

            {/* Visual Pod Grid Representation (Shows sample of first 40 seeds) */}
            <div className="flex flex-wrap gap-1.5 p-3 rounded-lg border border-line bg-white/5 max-h-56 overflow-y-auto">
              {Array.from({ length: Math.min(80, sampleSize) }, (_, i) => {
                const isDominant = i < Math.round((harvest.observedDominant / sampleSize) * Math.min(80, sampleSize))
                return (
                  <div
                    key={i}
                    title={isDominant ? currentTrait.dominantPhenotype.en : currentTrait.recessivePhenotype.en}
                    className={`h-5 w-5 rounded-full transition-all flex items-center justify-center text-[9px] font-bold ${
                      isDominant
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-amber-300 text-amber-900 border border-amber-500/40'
                    }`}
                  >
                    {isDominant ? currentTrait.dominantAllele : currentTrait.recessiveAllele}
                  </div>
                )
              })}
            </div>

            {/* Proportion Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-ink">
                <span>
                  <T value={currentTrait.dominantPhenotype} />: {harvest.observedDominant} (
                  {((harvest.observedDominant / sampleSize) * 100).toFixed(1)}%)
                </span>
                <span>
                  <T value={currentTrait.recessivePhenotype} />: {harvest.observedRecessive} (
                  {((harvest.observedRecessive / sampleSize) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-amber-400 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(harvest.observedDominant / sampleSize) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Observed vs Theoretical Ratios Readout (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <h4 className="text-sm font-semibold text-ink">
                <T value={BREEDING_GARDEN.ratioLabel} />
              </h4>

              <div className="flex items-baseline justify-between rounded-lg bg-accent/10 p-3">
                <span className="text-xs font-semibold text-accent">Actual Observed:</span>
                <span className="font-mono text-xl font-bold text-accent">
                  {domRatio} : 1.00
                </span>
              </div>

              <div className="flex items-baseline justify-between rounded-lg bg-white/5 p-3">
                <span className="text-xs text-ink/70">Theoretical Expected:</span>
                <span className="font-mono text-base font-bold text-ink">
                  {crossStrategy === '3:1' ? '3.00 : 1.00 (75% : 25%)' : '1.00 : 1.00 (50% : 50%)'}
                </span>
              </div>

              {/* Chi-Square Validation Pill */}
              <div
                className={`rounded-lg p-3 text-xs leading-relaxed border ${
                  harvest.isMendelianConfirmed
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <span>{harvest.isMendelianConfirmed ? '✓' : '⚠️'}</span>
                  <span>χ² = {harvest.chiSquare} (Critical: 3.84)</span>
                </div>
                <T
                  value={
                    harvest.isMendelianConfirmed
                      ? BREEDING_GARDEN.hypothesisAccept
                      : BREEDING_GARDEN.hypothesisReject
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-ink">
              <T value={BREEDING_GARDEN.tabStats} /> (Degrees of Freedom df = 1)
            </h4>
            <span className="font-mono text-xs text-ink/60">
              <T value={BREEDING_GARDEN.formulaNote} />
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line text-ink/60">
                  <th className="py-2.5">Phenotype Class</th>
                  <th className="py-2.5">Observed (O)</th>
                  <th className="py-2.5">Expected (E)</th>
                  <th className="py-2.5">Difference (O - E)</th>
                  <th className="py-2.5">(O - E)² ÷ E</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line/40">
                  <td className="py-3 font-semibold text-ink">
                    <T value={currentTrait.dominantPhenotype} /> ({currentTrait.dominantAllele})
                  </td>
                  <td className="py-3 font-mono font-bold text-accent">{harvest.observedDominant}</td>
                  <td className="py-3 font-mono">{harvest.expectedDominant}</td>
                  <td className="py-3 font-mono">
                    {(harvest.observedDominant - harvest.expectedDominant).toFixed(1)}
                  </td>
                  <td className="py-3 font-mono">
                    {(Math.pow(harvest.observedDominant - harvest.expectedDominant, 2) / harvest.expectedDominant).toFixed(3)}
                  </td>
                </tr>
                <tr className="border-b border-line/40">
                  <td className="py-3 font-semibold text-ink">
                    <T value={currentTrait.recessivePhenotype} /> ({currentTrait.recessiveAllele})
                  </td>
                  <td className="py-3 font-mono font-bold text-amber-400">{harvest.observedRecessive}</td>
                  <td className="py-3 font-mono">{harvest.expectedRecessive}</td>
                  <td className="py-3 font-mono">
                    {(harvest.observedRecessive - harvest.expectedRecessive).toFixed(1)}
                  </td>
                  <td className="py-3 font-mono">
                    {(Math.pow(harvest.observedRecessive - harvest.expectedRecessive, 2) / harvest.expectedRecessive).toFixed(3)}
                  </td>
                </tr>
                <tr className="font-bold text-accent">
                  <td className="py-3">Total / Chi-square (χ²)</td>
                  <td className="py-3 font-mono">{harvest.sampleSize}</td>
                  <td className="py-3 font-mono">{harvest.sampleSize}</td>
                  <td className="py-3 font-mono">0.0</td>
                  <td className="py-3 font-mono text-sm">{harvest.chiSquare}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-white/5 p-3 text-xs text-ink/70 leading-relaxed">
            <strong>Statistical Conclusion:</strong> For 1 degree of freedom at significance level p = 0.05, the critical value is <strong>3.84</strong>. Since calculated χ² = {harvest.chiSquare} {harvest.isMendelianConfirmed ? '< 3.84' : '≥ 3.84'}, the deviation {harvest.isMendelianConfirmed ? 'is NOT statistically significant, confirming Mendelian inheritance.' : 'is significant due to sample randomness.'}
          </div>
        </div>
      )}

      {activeTab === 'crossTypes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-xs">
            {/* Monohybrid F1 x F1 */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <h5 className="font-bold text-accent">
                1. Monohybrid Self-Cross (F₁ × F₁ → 3:1)
              </h5>
              <p className="text-ink/80 leading-relaxed">
                Parents: Heterozygous {currentTrait.f1Genotype} × {currentTrait.f1Genotype}
              </p>
              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="rounded bg-accent/20 p-2 font-bold text-accent">
                  {currentTrait.dominantAllele}{currentTrait.dominantAllele} (Dominant)
                </div>
                <div className="rounded bg-accent/20 p-2 font-bold text-accent">
                  {currentTrait.dominantAllele}{currentTrait.recessiveAllele} (Dominant)
                </div>
                <div className="rounded bg-accent/20 p-2 font-bold text-accent">
                  {currentTrait.dominantAllele}{currentTrait.recessiveAllele} (Dominant)
                </div>
                <div className="rounded bg-amber-500/20 p-2 font-bold text-amber-400">
                  {currentTrait.recessiveAllele}{currentTrait.recessiveAllele} (Recessive)
                </div>
              </div>
              <div className="font-semibold text-ink">
                Ratio: 3 {currentTrait.dominantPhenotype.en} : 1 {currentTrait.recessivePhenotype.en}
              </div>
            </div>

            {/* Test Cross */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <h5 className="font-bold text-accent">
                2. Test Cross (Unknown Dominant × Homozygous Recessive)
              </h5>
              <p className="text-ink/80 leading-relaxed">
                Parents: Heterozygous {currentTrait.f1Genotype} × Homozygous {currentTrait.recessiveAllele}{currentTrait.recessiveAllele}
              </p>
              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="rounded bg-accent/20 p-2 font-bold text-accent">
                  {currentTrait.dominantAllele}{currentTrait.recessiveAllele} (Dominant)
                </div>
                <div className="rounded bg-amber-500/20 p-2 font-bold text-amber-400">
                  {currentTrait.recessiveAllele}{currentTrait.recessiveAllele} (Recessive)
                </div>
                <div className="rounded bg-accent/20 p-2 font-bold text-accent">
                  {currentTrait.dominantAllele}{currentTrait.recessiveAllele} (Dominant)
                </div>
                <div className="rounded bg-amber-500/20 p-2 font-bold text-amber-400">
                  {currentTrait.recessiveAllele}{currentTrait.recessiveAllele} (Recessive)
                </div>
              </div>
              <div className="font-semibold text-ink">
                Ratio: 1 {currentTrait.dominantPhenotype.en} : 1 {currentTrait.recessivePhenotype.en}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs text-ink/80 leading-relaxed">
            <strong className="text-accent block text-sm mb-1">
              📝 Cambridge IGCSE Paper 4 Examiner Traps & Model Answers:
            </strong>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
