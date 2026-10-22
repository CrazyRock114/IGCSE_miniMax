/**
 * Acid-Base Titration & Volumetric Analysis Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0620.7.1.3: Describe the characteristic properties of acids and bases in aqueous solutions.
 * - 0620.7.1.4: Describe how to use a burette and pipette in volumetric titration.
 * - Paper 5/6 Practical:
 *   - Read bottom of meniscus at eye level to nearest 0.05 cm³.
 *   - Use of a white tile to observe subtle indicator color change.
 *   - Swirling the conical flask during addition.
 *   - Identifying concordant titres (within 0.10 cm³ of each other) to calculate mean titre.
 */

import type { Bilingual, TitrationLabExtra } from '@/content/types'

export interface IndicatorSpec {
  id: 'methyl-orange' | 'thymolphthalein' | 'phenolphthalein'
  name: Bilingual
  colorInAlkali: Bilingual
  colorAtEndPoint: Bilingual
  colorInAcid: Bilingual
  hexInAlkali: string
  hexAtEndPoint: string
  hexInAcid: string
}

export const TITRATION_INDICATORS: IndicatorSpec[] = [
  {
    id: 'methyl-orange',
    name: { en: 'Methyl Orange', zh: '甲基橙指示剂' },
    colorInAlkali: { en: 'Yellow', zh: '黄色（碱性）' },
    colorAtEndPoint: { en: 'Orange / Peach', zh: '橙色/桃红色（滴定终点）' },
    colorInAcid: { en: 'Red', zh: '红色（酸性过量）' },
    hexInAlkali: '#EAB308',
    hexAtEndPoint: '#F97316',
    hexInAcid: '#EF4444',
  },
  {
    id: 'thymolphthalein',
    name: { en: 'Thymolphthalein', zh: '百里酚酞指示剂' },
    colorInAlkali: { en: 'Blue', zh: '蓝色（碱性）' },
    colorAtEndPoint: { en: 'Pale Blue / Just colourless', zh: '淡蓝色至极淡（滴定终点）' },
    colorInAcid: { en: 'Colourless', zh: '无色（酸性/中性）' },
    hexInAlkali: '#3B82F6',
    hexAtEndPoint: '#BFDBFE',
    hexInAcid: '#F1F5F9',
  },
  {
    id: 'phenolphthalein',
    name: { en: 'Phenolphthalein', zh: '酚酞指示剂' },
    colorInAlkali: { en: 'Pink', zh: '粉红色（碱性）' },
    colorAtEndPoint: { en: 'Pale Pink / Just colourless', zh: '极淡粉红至无色（滴定终点）' },
    colorInAcid: { en: 'Colourless', zh: '无色（酸性）' },
    hexInAlkali: '#EC4899',
    hexAtEndPoint: '#FBCFE8',
    hexInAcid: '#F1F5F9',
  },
]

export interface TitrationTrialRecord {
  trialNumber: number
  isRough: boolean
  initialBuretteCm3: number
  finalBuretteCm3: number
  titreCm3: number
  isConcordant: boolean
}

/**
 * Calculates current solution color and pH state as titrant is added from burette.
 * Neutralization point occurs when addedVolume == equivalencePointVolume.
 */
export function getTitrationVisualState(
  addedVolumeCm3: number,
  equivalenceVolumeCm3: number,
  indicatorId: 'methyl-orange' | 'thymolphthalein' | 'phenolphthalein'
) {
  const indicator = TITRATION_INDICATORS.find((i) => i.id === indicatorId) ?? TITRATION_INDICATORS[0]!
  const delta = addedVolumeCm3 - equivalenceVolumeCm3

  let hexColor: string
  let stateDescription: Bilingual
  let pHEstimate: number

  if (delta < -0.2) {
    // Distinct alkali
    hexColor = indicator.hexInAlkali
    stateDescription = indicator.colorInAlkali
    pHEstimate = 12.0 - (addedVolumeCm3 / equivalenceVolumeCm3) * 3
  } else if (Math.abs(delta) <= 0.2) {
    // Sharp End Point transition
    hexColor = indicator.hexAtEndPoint
    stateDescription = indicator.colorAtEndPoint
    pHEstimate = 7.0
  } else {
    // Excess acid
    hexColor = indicator.hexInAcid
    stateDescription = indicator.colorInAcid
    pHEstimate = Math.max(1.0, 4.0 - delta * 0.5)
  }

  return {
    hexColor,
    stateDescription,
    pH: Number(pHEstimate.toFixed(1)),
    isNeutralised: Math.abs(delta) <= 0.2,
  }
}

/**
 * Checks whether two titres are concordant according to Cambridge IGCSE standard (<= 0.10 cm³ difference).
 */
export function areTitresConcordant(titre1: number, titre2: number): boolean {
  return Math.abs(titre1 - titre2) <= 0.10 + 1e-6
}

export const titrationLabData: TitrationLabExtra = {
  type: 'titration-lab',
  id: 'acid-base-titration-bench',
  title: {
    en: 'Acid-Base Titration: Volumetric Analysis & Concordant Titre Workbench',
    zh: '酸碱滴定：容量分析测定与重合体积 (Concordant Titres) 实验台',
  },
  hint: {
    en: 'Deliver acid from the burette into conical flask containing 25.0 cm³ of NaOH and indicator. Drop slowly near the end-point to catch the sharp color change, and record concordant titres within 0.10 cm³.',
    zh: '从酸式滴定管向装有 25.0 cm³ NaOH 待测液的锥形瓶滴加盐酸。在终点前逐滴慢加观察敏锐变色，记录相差不超过 0.10 cm³ 的重合体积。',
  },
  analyte: {
    name: { en: 'Sodium Hydroxide solution', zh: '氢氧化钠待测溶液' },
    formula: 'NaOH(aq)',
    volumeCm3: 25.0,
    unknownConcentration: 0.100, // 0.100 mol/dm³
  },
  titrant: {
    name: { en: 'Hydrochloric Acid standard solution', zh: '盐酸标准滴定溶液' },
    formula: 'HCl(aq)',
    knownConcentration: 0.125, // 0.125 mol/dm³ -> equivalence at exactly 20.00 cm³
  },
  stoichiometryRatio: 1.0, // 1 HCl : 1 NaOH
  examinerNotes: {
    en: 'Paper 5/6 Core Essentials: 1) Rinse burette with the acid (not water, which dilutes it); 2) Read bottom of meniscus at eye level to avoid parallax error; 3) White tile placed beneath flask makes color change distinct; 4) Swirl flask continuously; 5) Concordant titres must be within 0.10 cm³ of each other; 6) Do NOT include rough titre in average.',
    zh: 'Paper 5/6 必考陷阱与采分点：1) 滴定管必须先用待装酸液润洗（用水洗残留会稀释酸液带来误差）；2) 视线必须平视弯月面最低处，严防视差；3) 锥形瓶下垫白瓷板使变色敏锐易见；4) 滴定时需持续摇动锥形瓶；5) 重合读数 (Concordant) 误差必须 ≤ 0.10 cm³；6) 粗滴 (Rough) 绝对不能计入平均值计算。',
  },
}
