/**
 * Principle of Moments & Seesaw Rotational Equilibrium Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.1.5.2.1: Describe the moment of a force as a measure of its turning effect.
 * - 0625.1.5.2.2: Moment of a force = force × perpendicular distance from pivot (M = F × d).
 * - 0625.1.5.2.3: Principle of moments: For equilibrium, total clockwise moment = total anticlockwise moment.
 * - 0625.1.5.2.4: Conditions for equilibrium: no resultant force and no resultant moment.
 * - Paper 5/6 Practical skills:
 *   - Meter rule balanced on a triangular knife-edge fulcrum at 50.0 cm mark.
 *   - Suspending slotted masses by light thread loops.
 *   - Measuring distance from pivot to center of mass loop.
 *   - Repeating with multiple weights on each side.
 */

import type { MomentsLabExtra } from '@/content/types'

export interface MomentLoadItem {
  id: string
  massG: number
  distanceCm: number
  side: 'left' | 'right'
}

export interface MomentsCalculationResult {
  anticlockwiseMomentNCm: number
  clockwiseMomentNCm: number
  netMomentNCm: number
  isBalanced: boolean
  tiltAngleDeg: number
  totalDownwardForceN: number
}

/**
 * Calculates clockwise and anticlockwise moments about central pivot.
 * Standard IGCSE gravity g = 9.8 N/kg.
 */
export function calculateMomentsEquilibrium(
  loads: MomentLoadItem[],
  g = 9.8,
): MomentsCalculationResult {
  let acwMomentNCm = 0
  let cwMomentNCm = 0
  let totalForceN = 0

  for (const load of loads) {
    const forceN = (load.massG / 1000) * g
    totalForceN += forceN
    const momentNCm = forceN * load.distanceCm
    if (load.side === 'left') {
      acwMomentNCm += momentNCm
    } else {
      cwMomentNCm += momentNCm
    }
  }

  const rawNet = cwMomentNCm - acwMomentNCm
  const netMomentNCm = Math.abs(rawNet) < 0.0001 ? 0 : Number(rawNet.toFixed(2))
  const isBalanced = Math.abs(netMomentNCm) < 0.2
  // Tilt angle clamped between -12 and +12 degrees
  const tiltAngleDeg = isBalanced
    ? 0
    : Math.max(-12, Math.min(12, netMomentNCm * 0.25))

  return {
    anticlockwiseMomentNCm: Number(acwMomentNCm.toFixed(2)),
    clockwiseMomentNCm: Number(cwMomentNCm.toFixed(2)),
    netMomentNCm,
    isBalanced,
    tiltAngleDeg: Number(tiltAngleDeg.toFixed(1)),
    totalDownwardForceN: Number(totalForceN.toFixed(2)),
  }
}

export const MOMENTS_LAB_DEFAULT: MomentsLabExtra = {
  type: 'moments-lab',
  id: 'extra-moments-lab',
  title: {
    en: 'Principle of Moments & Seesaw Balance Bench',
    zh: '杠杆力矩平衡原理与跷跷板实验台',
  },
  hint: {
    en: 'Adjust masses and distances on either side of the pivot. Observe whether total anticlockwise moment equals total clockwise moment.',
    zh: '调节支点两侧的悬挂质量与距支点力臂，观察逆时针总力矩是否严格等于顺时针总力矩。',
  },
  rulerLengthCm: 100,
  defaultLoads: [
    { id: 'load-l1', massG: 200, positionCm: 30, side: 'left' },
    { id: 'load-r1', massG: 300, positionCm: 20, side: 'right' },
  ],
  examinerNotes: {
    en: 'Paper 5/6 Key Rule: The distance d MUST be measured perpendicular from the knife-edge pivot, NOT from the 0cm end of the ruler! When multiple masses are on one side, calculate each F × d individually and add them up.',
    zh: '实验题扣分警示：距离 d 必须从刀口支点（如 50.0 cm 刻度）量起，绝对不能直接从直尺 0 cm 端读取！当一侧挂有多个重物时，必须分别计算各力矩（F₁d₁ + F₂d₂）后再求和。',
  },
}
