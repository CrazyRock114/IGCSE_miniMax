import type { LessonExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DigestiveAnatomy } from './DigestiveAnatomy'
import { TeethAnatomy } from './TeethAnatomy'
import { VilliSurfaceArea } from './VilliSurfaceArea'
import { BileEmulsification } from './BileEmulsification'
import { BalancedPlate } from './BalancedPlate'
import { DigestionFlow } from './DigestionFlow'
import { VillusDetail } from './VillusDetail'
import { FoodEnergy } from './FoodEnergy'
import { DiseaseCards } from './DiseaseCards'
import { EnergyNeeds } from './EnergyNeeds'
import { HeartAnatomy } from './HeartAnatomy'
import { BloodComponents } from './BloodComponents'
import { BloodVesselsCompare } from './BloodVesselsCompare'
import { DoubleCirculation } from './DoubleCirculation'
import { RespirationCompare } from './RespirationCompare'
import { AirwayPathway } from './AirwayPathway'
import { GasExchangeFeatures } from './GasExchangeFeatures'
import { SmokingEffects } from './SmokingEffects'

/**
 * Dispatches the lesson's `extras` to the right component.
 *
 * Each extra is its own section, with a title, hint, and a card. The wrapper just
 * does the dispatch and the chrome — the work lives in the per-type components.
 *
 * No Chinese literals in JSX: titles, hints and labels all come from the data layer
 * as `Bilingual` values, rendered through the `T` helper.
 */
export function LessonExtras({ extras }: { extras: LessonExtra[] }) {
  return (
    <section className="space-y-6">
      {extras.map((extra) => (
        <ExtraCard key={extra.id} extra={extra} />
      ))}
    </section>
  )
}

function ExtraCard({ extra }: { extra: LessonExtra }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-4">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-ink">
          <T value={extra.title} />
        </h2>
        <p className="text-xs text-muted">
          <T value={extra.hint} />
        </p>
      </header>
      {renderExtra(extra)}
    </article>
  )
}

function renderExtra(extra: LessonExtra) {
  switch (extra.type) {
    case 'digestive-anatomy':
      return <DigestiveAnatomy extra={extra} />
    case 'teeth-anatomy':
      return <TeethAnatomy extra={extra} />
    case 'villi-surface-area':
      return <VilliSurfaceArea extra={extra} />
    case 'bile-emulsification':
      return <BileEmulsification extra={extra} />
    case 'balanced-plate':
      return <BalancedPlate extra={extra} />
    case 'digestion-flow':
      return <DigestionFlow extra={extra} />
    case 'villus-detail':
      return <VillusDetail extra={extra} />
    case 'food-energy':
      return <FoodEnergy extra={extra} />
    case 'disease-cards':
      return <DiseaseCards extra={extra} />
    case 'energy-needs':
      return <EnergyNeeds extra={extra} />
    case 'heart-anatomy':
      return <HeartAnatomy extra={extra} />
    case 'blood-components':
      return <BloodComponents extra={extra} />
    case 'blood-vessels-compare':
      return <BloodVesselsCompare extra={extra} />
    case 'double-circulation':
      return <DoubleCirculation extra={extra} />
    case 'respiration-compare':
      return <RespirationCompare extra={extra} />
    case 'airway-pathway':
      return <AirwayPathway extra={extra} />
    case 'gas-exchange-features':
      return <GasExchangeFeatures extra={extra} />
    case 'smoking-effects':
      return <SmokingEffects extra={extra} />
  }
}
