/**
 * Mendelian Pea Breeding Garden & Chi-Square Statistical Validator.
 *
 * Syllabus anchors:
 * - 0610.17.2.1: Use genetic diagrams to predict the results of monohybrid crosses
 *   and calculate phenotypic and genotypic ratios (3:1 and 1:1).
 * - 0610.17.2.2: Explain why observed phenotypic ratios often differ from expected
 *   ratios due to the random nature of fertilisation, especially in small sample sizes.
 * - 0610.17.2.3: Use test crosses to determine unknown genotypes.
 */

import type { Bilingual, BreedingGardenExtra } from '@/content/types'

export interface PeaTraitSpec {
  id: string
  name: Bilingual
  dominantAllele: string
  recessiveAllele: string
  dominantPhenotype: Bilingual
  recessivePhenotype: Bilingual
  f1Genotype: string
}

export const PEA_TRAITS: PeaTraitSpec[] = [
  {
    id: 'seed-shape',
    name: { en: 'Seed Shape', zh: '种子形状（圆粒 vs 皱粒）' },
    dominantAllele: 'R',
    recessiveAllele: 'r',
    dominantPhenotype: { en: 'Smooth Round Seed', zh: '光滑圆粒种子' },
    recessivePhenotype: { en: 'Wrinkled Seed', zh: '皱缩皱粒种子' },
    f1Genotype: 'Rr',
  },
  {
    id: 'seed-color',
    name: { en: 'Seed Cotyledon Colour', zh: '子叶颜色（黄色 vs 绿色）' },
    dominantAllele: 'Y',
    recessiveAllele: 'y',
    dominantPhenotype: { en: 'Yellow Seed', zh: '黄色子叶' },
    recessivePhenotype: { en: 'Green Seed', zh: '绿色子叶' },
    f1Genotype: 'Yy',
  },
  {
    id: 'flower-color',
    name: { en: 'Flower Colour', zh: '花色（紫花 vs 白花）' },
    dominantAllele: 'P',
    recessiveAllele: 'p',
    dominantPhenotype: { en: 'Purple Flower', zh: '显性紫花' },
    recessivePhenotype: { en: 'White Flower', zh: '隐性白花' },
    f1Genotype: 'Pp',
  },
  {
    id: 'stem-height',
    name: { en: 'Plant Height', zh: '植株高矮（高茎 vs 矮茎）' },
    dominantAllele: 'T',
    recessiveAllele: 't',
    dominantPhenotype: { en: 'Tall Stem (~2m)', zh: '高茎植株' },
    recessivePhenotype: { en: 'Dwarf Stem (~0.3m)', zh: '矮茎植株' },
    f1Genotype: 'Tt',
  },
]

export interface HarvestSimulationResult {
  sampleSize: number
  observedDominant: number
  observedRecessive: number
  expectedDominant: number
  expectedRecessive: number
  chiSquare: number
  degreesOfFreedom: number
  criticalValue95: number // 3.84 for df=1 at p=0.05
  isMendelianConfirmed: boolean // true if chiSquare < 3.84
}

/**
 * Deterministic pseudo-random number generator for reproducible sampling in tests.
 */
function pseudoRandom(seed: number): () => number {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Simulates random fertilisation events for a given cross ratio.
 */
export function simulateHarvest(
  sampleSize: number,
  expectedRatio: '3:1' | '1:1' = '3:1',
  seed = Date.now()
): HarvestSimulationResult {
  const probDominant = expectedRatio === '3:1' ? 0.75 : 0.50
  const rand = pseudoRandom(seed)

  let obsDominant = 0
  for (let i = 0; i < sampleSize; i++) {
    if (rand() < probDominant) {
      obsDominant++
    }
  }
  const obsRecessive = sampleSize - obsDominant

  const expDominant = Number((sampleSize * probDominant).toFixed(1))
  const expRecessive = Number((sampleSize * (1 - probDominant)).toFixed(1))

  const chiDom = Math.pow(obsDominant - expDominant, 2) / expDominant
  const chiRec = Math.pow(obsRecessive - expRecessive, 2) / expRecessive
  const chiSquare = Number((chiDom + chiRec).toFixed(3))

  const criticalValue95 = 3.84 // df=1, p=0.05
  const isMendelianConfirmed = chiSquare < criticalValue95

  return {
    sampleSize,
    observedDominant: obsDominant,
    observedRecessive: obsRecessive,
    expectedDominant: expDominant,
    expectedRecessive: expRecessive,
    chiSquare,
    degreesOfFreedom: 1,
    criticalValue95,
    isMendelianConfirmed,
  }
}

export const breedingGardenData: BreedingGardenExtra = {
  type: 'breeding-garden',
  id: 'mendel-pea-breeding-garden',
  title: {
    en: 'Mendel\'s Pea Garden: Harvest Simulation & Chi-Square Validator',
    zh: '孟德尔豌豆杂交花园：虚拟采摘模拟与卡方统计量检验',
  },
  hint: {
    en: 'Harvest pea pods in batches of 20, 100, or 500. Observe how small samples show wide random fluctuations, while large numbers converge precisely to Mendel\'s 3:1 ratio.',
    zh: '以 20、100 或 500 粒的批量采摘豌豆。观察小样本由于受精随机性带来的显著偏差，以及大样本如何精密收敛至经典的 3:1 孟德尔理论比。',
  },
  traitName: PEA_TRAITS[0]!.name,
  dominantAllele: PEA_TRAITS[0]!.dominantAllele,
  recessiveAllele: PEA_TRAITS[0]!.recessiveAllele,
  dominantPhenotype: PEA_TRAITS[0]!.dominantPhenotype,
  recessivePhenotype: PEA_TRAITS[0]!.recessivePhenotype,
  f1Phenotype: { en: 'All Round (Rr)', zh: '全为圆粒杂合体 (Rr)' },
  expectedRatio: '3:1',
  sampleTotal: 100,
  examinerNotes: {
    en: 'Paper 4 Model Answer: 1) Why do actual offspring numbers differ from 3:1? Fertilisation is a random process, and gamete fusion is due to chance; 2) Small samples have large percentage variance; 3) A test cross uses a homozygous recessive parent (rr) to discover if a dominant phenotype is RR or Rr (1:1 ratio if heterozygous).',
    zh: 'Paper 4 压轴采分点：1) 为什么实际子代数目往往偏离 3:1？受精是一个随机过程，配子随机结合存在偶然性；2) 小样本百分比随机波动极大；3) 测交 (Test Cross) 必须与纯合隐性个体 (rr) 杂交以确定显性个体的基因型（若产生 1:1 分离比则为杂合体 Rr）。',
  },
}
