/**
 * Hooke's Law & Elastic Deformation Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.1.5.1: State that a force may produce a change in size and shape of an object.
 * - 0625.1.5.2: Sketch, plot and interpret load–extension graphs, and describe the associated experimental procedure.
 * - 0625.1.5.3: Recall and use Hooke’s law F = k Δx where k is the spring constant.
 * - 0625.1.5.4: Recall that the limit of proportionality is the point beyond which load and extension are no longer proportional.
 * - Paper 5/6 Practical skills:
 *   - Clamped vertical metre ruler with pointer attached to spring.
 *   - Reading ruler at eye level to eliminate parallax error.
 *   - Calculating extension: extension = stretched length − original length (Δx = l − l₀).
 *   - Determining spring constant k from gradient of load-extension graph (k = ΔF / Δx).
 */

import type { HookesLawLabExtra } from '@/content/types'

export interface SpringExtensionPoint {
  massG: number
  loadN: number
  lengthCm: number
  extensionCm: number
  isBeyondLimit: boolean
}

/**
 * Calculates extension and total length for a given suspended load.
 * In linear region: Δx = (F / k) * 100 (in cm).
 * Beyond limit of proportionality: plastic deformation introduces nonlinear stretch.
 */
export function calculateSpringState(
  loadN: number,
  springConstantNPerM = 25,
  unloadedLengthCm = 15.0,
  limitOfProportionalityN = 5.0,
): SpringExtensionPoint {
  const kCm = springConstantNPerM / 100 // N/cm (e.g. 0.25 N/cm)
  const isBeyondLimit = loadN > limitOfProportionalityN

  let extensionCm = 0
  if (loadN <= limitOfProportionalityN) {
    extensionCm = loadN / kCm
  } else {
    const linearPart = limitOfProportionalityN / kCm
    const excessLoad = loadN - limitOfProportionalityN
    // Non-linear plastic stretching:
    const plasticPart = (excessLoad / kCm) + 1.2 * Math.pow(excessLoad, 1.8)
    extensionCm = linearPart + plasticPart
  }

  const lengthCm = unloadedLengthCm + extensionCm
  const massG = Math.round((loadN / 9.8) * 1000)

  return {
    massG,
    loadN: Number(loadN.toFixed(2)),
    lengthCm: Number(lengthCm.toFixed(2)),
    extensionCm: Number(extensionCm.toFixed(2)),
    isBeyondLimit,
  }
}

/**
 * Computes the spring constant k = ΔF / Δx (in N/m) from two points on the linear region.
 */
export function calculateSpringConstant(
  load1N: number,
  ext1Cm: number,
  load2N: number,
  ext2Cm: number,
): number {
  const deltaF = Math.abs(load2N - load1N)
  const deltaXMetres = Math.abs(ext2Cm - ext1Cm) / 100
  if (deltaXMetres === 0) return 0
  return Number((deltaF / deltaXMetres).toFixed(1))
}

export const HOOKES_LAW_LAB_DEFAULT: HookesLawLabExtra = {
  type: 'hookes-law-lab',
  id: 'extra-hookes-law-lab',
  title: {
    en: "Hooke's Law & Elastic Limit Workbench",
    zh: '胡克定律与比例极限实验工作台',
  },
  hint: {
    en: 'Add slotted masses to the hanger, observe pointer position on the mm ruler, and watch the load-extension graph delineate the linear limit of proportionality.',
    zh: '在挂钩上增减砝码，读取毫米刻度尺上的指针读数，实时观察伸长量—载荷图并找出正比例极限。',
  },
  springConstantNPerM: 25,
  unloadedLengthCm: 15.0,
  limitOfProportionalityN: 5.0,
  massPoints: [
    { massG: 0, loadN: 0.0, lengthCm: 15.0, extensionCm: 0.0 },
    { massG: 102, loadN: 1.0, lengthCm: 19.0, extensionCm: 4.0 },
    { massG: 204, loadN: 2.0, lengthCm: 23.0, extensionCm: 8.0 },
    { massG: 306, loadN: 3.0, lengthCm: 27.0, extensionCm: 12.0 },
    { massG: 408, loadN: 4.0, lengthCm: 31.0, extensionCm: 16.0 },
    { massG: 510, loadN: 5.0, lengthCm: 35.0, extensionCm: 20.0 },
    { massG: 612, loadN: 6.0, lengthCm: 40.2, extensionCm: 25.2 },
    { massG: 714, loadN: 7.0, lengthCm: 46.8, extensionCm: 31.8 },
  ],
  examinerNotes: {
    en: 'Key Cambridge Marking Criteria: 1. Extension must be calculated as (length − original length), never just recorded as total length. 2. A fiducial pointer attached to bottom of spring prevents parallax error with ruler. 3. Hooke’s law applies only up to limit of proportionality (straight line through origin).',
    zh: '剑桥实操得分要点：1. 伸长量必须用（实测长度 − 弹簧原长）计算，绝不能直接将总长当作伸长量。2. 弹簧底部水平指针贴近刻度尺可消除视差。3. 胡克定律仅在过原点的直线段（比例极限内）严格成立，超过后发生塑性形变。',
  },
}
