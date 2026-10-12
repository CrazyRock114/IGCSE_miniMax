/**
 * Radioactive Decay, Half-Life & Nuclear Radiation Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.5.2.1.1: Detection of radioactivity (Geiger-Müller tube and counter).
 * - 0625.5.2.1.2: Background radiation sources and background count subtraction:
 *                 Corrected Count Rate = Total Count Rate − Background Count Rate.
 * - 0625.5.2.2.1: Types of nuclear radiation:
 *                 - Alpha (α): helium nucleus (²⁺), high ionising, stopped by paper / skin.
 *                 - Beta (β): fast electron (⁻), moderate ionising, stopped by aluminium (5 mm).
 *                 - Gamma (γ): high frequency EM wave, low ionising, stopped by several cm of lead.
 * - 0625.5.2.2.4: Deflection in electric and magnetic fields (α towards negative, β towards positive, γ undeflected).
 * - 0625.5.2.3.1: Half-life definition: time taken for half the nuclei of that isotope to decay.
 * - 0625.5.2.3.2: Half-life decay curves and activity calculations.
 */

import type { RadioactivityLabExtra } from '@/content/types'

export type RadiationType = 'alpha' | 'beta' | 'gamma'
export type AbsorberMaterial = 'none' | 'paper' | 'aluminium' | 'lead'

export interface DecayCurvePoint {
  timeMinutes: number
  halfLivesElapsed: number
  rawCountRateBq: number
  backgroundCountRateBq: number
  correctedCountRateBq: number
}

export function calculateRadioactiveDecay(
  timeMinutes: number,
  halfLifeMinutes = 20,
  initialBq = 640,
  backgroundBq = 20,
): DecayCurvePoint {
  const halfLivesElapsed = timeMinutes / Math.max(1, halfLifeMinutes)
  const correctedCountRateBq = Math.round(initialBq * Math.pow(0.5, halfLivesElapsed))
  const rawCountRateBq = correctedCountRateBq + backgroundBq

  return {
    timeMinutes,
    halfLivesElapsed: Number(halfLivesElapsed.toFixed(2)),
    rawCountRateBq,
    backgroundCountRateBq: backgroundBq,
    correctedCountRateBq,
  }
}

export interface AbsorptionResult {
  transmittedFraction: number
  detectedCountRateBq: number
  isStopped: boolean
}

export function calculateAbsorption(
  sourceType: RadiationType,
  absorber: AbsorberMaterial,
  baseSourceBq = 500,
  backgroundBq = 20,
): AbsorptionResult {
  let fraction = 1.0

  if (sourceType === 'alpha') {
    fraction = absorber === 'none' ? 1.0 : 0.0
  } else if (sourceType === 'beta') {
    if (absorber === 'none') fraction = 1.0
    else if (absorber === 'paper') fraction = 0.95
    else fraction = 0.0 // aluminium or lead stops beta
  } else {
    // gamma
    if (absorber === 'none') fraction = 1.0
    else if (absorber === 'paper') fraction = 1.0
    else if (absorber === 'aluminium') fraction = 0.95
    else fraction = 0.15 // attenuated by lead
  }

  const detectedCountRateBq = Math.round(baseSourceBq * fraction) + backgroundBq
  const isStopped = fraction <= 0.05

  return {
    transmittedFraction: fraction,
    detectedCountRateBq,
    isStopped,
  }
}

export const RADIOACTIVITY_LAB_DEFAULT: RadioactivityLabExtra = {
  type: 'radioactivity-lab',
  id: 'extra-radioactivity-lab',
  title: {
    en: 'Radioactive Decay & Penetrating Power Workbench',
    zh: '放射性衰变、半衰期与穿透偏转实验工作台',
  },
  hint: {
    en: 'Step through the decay timeline to watch activity halve and subtract background radiation; insert absorbers (paper, Al, Pb) to test penetration of α, β, and γ rays.',
    zh: '调节衰变时间轴观察计数率按半衰期倍减并扣除环境本底辐射；插入纸片、铝板或铅板探究 α、β、γ 射线穿透力。',
  },
  halfLifeSeconds: 20,
  initialCountRateBq: 640,
  backgroundCountRateBq: 20,
  radiations: [
    {
      type: 'alpha',
      name: { en: 'Alpha Particle (α)', zh: 'α 粒子 (氦核 ⁴₂He)' },
      nature: { en: 'Helium-4 nucleus (2 protons + 2 neutrons, +2e)', zh: '氦-4 原子核（2质子+2中子，带+2e正电）' },
      ionisingPower: { en: 'Most strongly ionising (massive +2 charge)', zh: '最强电离能力（质量大、带2个正电荷）' },
      penetratingPower: { en: 'Least penetrating (range 3-5 cm in air)', zh: '穿透力最弱（空气中射程仅3-5厘米）' },
      stoppedBy: { en: 'Stopped by a single sheet of paper or skin', zh: '薄纸片或人体皮肤即可完全阻挡' },
      electricDeflection: { en: 'Deflects slightly towards negative plate', zh: '因带正电向负极板轻微偏转（质量大偏转小）' },
      magneticDeflection: { en: 'Weak deflection according to Fleming’s LHR', zh: '按左手定则微弱偏转' },
    },
    {
      type: 'beta',
      name: { en: 'Beta Particle (β)', zh: 'β 粒子 (高速电子 ⁰₋₁e)' },
      nature: { en: 'High-speed fast electron (-1e, negligible mass)', zh: '核内中子转变生成的高速电子（带-1e负电）' },
      ionisingPower: { en: 'Moderately ionising', zh: '中等电离能力' },
      penetratingPower: { en: 'Moderately penetrating (range ~1 m in air)', zh: '中等穿透力（空气中射程约1米）' },
      stoppedBy: { en: 'Penetrates paper; stopped by ~5 mm Aluminium', zh: '穿透纸张，被约 5 mm 铝板完全吸收阻挡' },
      electricDeflection: { en: 'Deflects strongly towards positive plate', zh: '因带负电且质量极小，向正极板剧烈偏转' },
      magneticDeflection: { en: 'Strong deflection opposite to alpha', zh: '磁场中偏转方向与 α 相反，偏转曲率极大' },
    },
    {
      type: 'gamma',
      name: { en: 'Gamma Ray (γ)', zh: 'γ 射线 (高频电磁波)' },
      nature: { en: 'High-energy electromagnetic photon (uncharged)', zh: '高频高能电磁光子（不带电荷、无静质量）' },
      ionisingPower: { en: 'Least ionising', zh: '电离能力最弱' },
      penetratingPower: { en: 'Most penetrating (infinite range in air)', zh: '穿透力最强（在空气中射程极远）' },
      stoppedBy: { en: 'Attenuated only by several cm of Lead or concrete', zh: '需数厘米厚铅板或厚混凝土墙方可大部分阻挡' },
      electricDeflection: { en: 'Undeflected (no electric charge)', zh: '不发生偏转（不带电荷）' },
      magneticDeflection: { en: 'Undeflected (straight line path)', zh: '不发生偏转（沿直线无阻穿过）' },
    },
  ],
  examinerNotes: {
    en: 'Cambridge Paper 5/6 Crucial Rule: Always subtract background radiation before reading half-life! True half-life is the time for (Measured Count − Background) to halve. Without subtraction, you will overestimate the half-life and lose method marks.',
    zh: '中考/剑桥 Paper 5/6 拿分命门：读半衰期前务必先扣除环境本底辐射！真正的半衰期是（测量计数率 − 本底计数率）减半所需的时间。若未扣除本底，读出的半衰期将显著偏大并丢掉过程分！',
  },
}
