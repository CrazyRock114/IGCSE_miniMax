/**
 * Refraction, Snell's Law & Total Internal Reflection (TIR) Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.3.2.2.1: Describe refraction as light changing speed as it passes between media.
 * - 0625.3.2.2.2: Recall and use n = sin i / sin r.
 * - 0625.3.2.2.3: Recall and use n = c / v.
 * - 0625.3.2.2.4: Describe internal reflection and total internal reflection (TIR).
 * - 0625.3.2.2.5: Recall and use sin c = 1 / n (n = 1 / sin c).
 * - 0625.3.2.2.6: Describe optical fibres and endoscopy / telecommunications.
 * - Paper 5/6 Practical skills:
 *   - Semicircular glass block on circular protractor: ray aimed at flat face center enters curved surface normally (0° deviation).
 *   - Measuring incident angle i and refracted angle r from the normal line, not the interface!
 *   - Identifying critical angle where emergent ray grazes the flat edge at 90°.
 */

import type { RefractionLabExtra } from '@/content/types'

export type RayBehavior = 'refraction' | 'critical' | 'tir'

export interface RefractionRayResult {
  incidentAngleDeg: number
  refractiveIndex: number
  criticalAngleDeg: number
  refractedAngleDeg: number | null
  reflectedAngleDeg: number
  behavior: RayBehavior
  speedInMediumKmS: number
}

export function calculateRefractionRay(
  incidentAngleDeg: number,
  refractiveIndex: number,
): RefractionRayResult {
  const iRad = (incidentAngleDeg * Math.PI) / 180
  const cRad = Math.asin(1 / refractiveIndex)
  const criticalAngleDeg = Number(((cRad * 180) / Math.PI).toFixed(1))

  const speedInMediumKmS = Math.round(300000 / refractiveIndex)
  const reflectedAngleDeg = incidentAngleDeg

  if (incidentAngleDeg > criticalAngleDeg + 0.1) {
    return {
      incidentAngleDeg,
      refractiveIndex,
      criticalAngleDeg,
      refractedAngleDeg: null,
      reflectedAngleDeg,
      behavior: 'tir',
      speedInMediumKmS,
    }
  }

  if (Math.abs(incidentAngleDeg - criticalAngleDeg) <= 0.3) {
    return {
      incidentAngleDeg,
      refractiveIndex,
      criticalAngleDeg,
      refractedAngleDeg: 90.0,
      reflectedAngleDeg,
      behavior: 'critical',
      speedInMediumKmS,
    }
  }

  // Refraction: sin r = n * sin i
  const sinR = refractiveIndex * Math.sin(iRad)
  const rRad = Math.asin(Math.min(1.0, sinR))
  const refractedAngleDeg = Number(((rRad * 180) / Math.PI).toFixed(1))

  return {
    incidentAngleDeg,
    refractiveIndex,
    criticalAngleDeg,
    refractedAngleDeg,
    reflectedAngleDeg,
    behavior: 'refraction',
    speedInMediumKmS,
  }
}

export const REFRACTION_LAB_DEFAULT: RefractionLabExtra = {
  type: 'refraction-lab',
  id: 'extra-refraction-lab',
  title: {
    en: "Refraction, Snell's Law & TIR Bench",
    zh: '光的折射、斯涅尔定律与全反射实验台',
  },
  hint: {
    en: 'Rotate the laser beam through the semicircular block to explore refraction, critical angle grazing, and total internal reflection (TIR).',
    zh: '通过半圆形玻璃砖旋转入射激光束，探索光的折射、90°临界角掠射与全内反射（TIR）。',
  },
  materials: [
    {
      id: 'crown-glass',
      name: { en: 'Crown Glass (n = 1.50)', zh: '冕牌光学玻璃 (n = 1.50)' },
      refractiveIndex: 1.5,
      criticalAngleDeg: 41.8,
    },
    {
      id: 'acrylic-perspex',
      name: { en: 'Perspex / Acrylic (n = 1.49)', zh: '有机玻璃 / 亚克力 (n = 1.49)' },
      refractiveIndex: 1.49,
      criticalAngleDeg: 42.2,
    },
    {
      id: 'water',
      name: { en: 'Water (n = 1.33)', zh: '水介质 (n = 1.33)' },
      refractiveIndex: 1.33,
      criticalAngleDeg: 48.8,
    },
    {
      id: 'diamond',
      name: { en: 'Diamond (n = 2.42)', zh: '金刚石 / 钻石 (n = 2.42)' },
      refractiveIndex: 2.42,
      criticalAngleDeg: 24.4,
    },
  ],
  examinerNotes: {
    en: 'Paper 5/6 Key Rule: 1. Angles MUST always be measured to the NORMAL (perpendicular line), not to the glass surface! 2. Two conditions for TIR: light travels from optically denser to less dense medium, and angle of incidence i > critical angle c.',
    zh: '实验题必考得分准则：1. 入射角与折射角必须相对于法线（垂直界面的虚线）测量，绝不能量到玻璃砖表面！2. 发生全内反射（TIR）的两大充要条件：光线必须从光密介质射向光疏介质，且入射角 i 严格大于临界角 c。',
  },
}
