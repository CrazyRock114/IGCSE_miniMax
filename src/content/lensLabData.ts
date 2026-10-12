/**
 * Ray Optics & Thin Converging Lens Image Formation Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.3.2.3.1: Describe the action of a thin converging lens on a beam of light.
 * - 0625.3.2.3.2: Use the terms principal axis, principal focus (focal point F), and focal length f.
 * - 0625.3.2.3.3: Draw and interpret ray diagrams for real and virtual images.
 * - 0625.3.2.3.4: Describe characteristics of an image: enlarged/diminished, upright/inverted, real/virtual.
 * - 0625.3.2.3.5: Linear magnification M = image height / object height = v / u.
 * - 0625.3.2.3.6: Describe the use of a single lens as a magnifying glass (u < f).
 * - Paper 5/6 Practical skills:
 *   - Illuminating object (cross-wire or illuminated arrow on lamp box).
 *   - Adjusting translucent screen until a sharp inverted focused image is caught.
 *   - Measuring object distance u and image distance v from lens center.
 */

import type { LensLabExtra } from '@/content/types'

export type ImageNature = 'real-inverted' | 'virtual-upright' | 'infinity-parallel'
export type ImageSize = 'magnified' | 'diminished' | 'same-size'

export interface LensImageResult {
  objectDistanceCm: number
  focalLengthCm: number
  imageDistanceCm: number | null
  magnification: number | null
  nature: ImageNature
  size: ImageSize
  imageHeightCm: number | null
  objectHeightCm: number
}

/**
 * Calculates image position, magnification, and characteristics using thin lens formula:
 * 1/f = 1/u + 1/v => v = (u * f) / (u - f).
 */
export function calculateLensImage(
  uCm: number,
  fCm = 10,
  hoCm = 4,
): LensImageResult {
  if (Math.abs(uCm - fCm) < 0.1) {
    return {
      objectDistanceCm: uCm,
      focalLengthCm: fCm,
      imageDistanceCm: null,
      magnification: null,
      nature: 'infinity-parallel',
      size: 'magnified',
      imageHeightCm: null,
      objectHeightCm: hoCm,
    }
  }

  if (uCm > fCm) {
    const v = (uCm * fCm) / (uCm - fCm)
    const m = v / uCm
    const hi = m * hoCm
    const size: ImageSize = m > 1.05 ? 'magnified' : m < 0.95 ? 'diminished' : 'same-size'

    return {
      objectDistanceCm: uCm,
      focalLengthCm: fCm,
      imageDistanceCm: Number(v.toFixed(1)),
      magnification: Number(m.toFixed(2)),
      nature: 'real-inverted',
      size,
      imageHeightCm: Number(hi.toFixed(1)),
      objectHeightCm: hoCm,
    }
  }

  // Virtual image (u < f)
  const vAbs = (uCm * fCm) / (fCm - uCm)
  const m = vAbs / uCm
  const hi = m * hoCm

  return {
    objectDistanceCm: uCm,
    focalLengthCm: fCm,
    imageDistanceCm: Number((-vAbs).toFixed(1)), // negative indicates virtual image on same side
    magnification: Number(m.toFixed(2)),
    nature: 'virtual-upright',
    size: 'magnified',
    imageHeightCm: Number(hi.toFixed(1)),
    objectHeightCm: hoCm,
  }
}

export const LENS_LAB_DEFAULT: LensLabExtra = {
  type: 'lens-lab',
  id: 'extra-lens-lab',
  title: {
    en: 'Thin Converging Lens Optical Bench',
    zh: '凸透镜成像光具座实验工作台',
  },
  hint: {
    en: 'Slide the illuminated object arrow along the principal axis. Watch real inverted images form on the screen, or step inside the focal length for an upright virtual magnifying glass.',
    zh: '在主光轴上滑动发光物箭头，观察光屏上倒立实像的生成规律；或移入一倍焦距内，体验放大镜的正立虚像。',
  },
  focalLengthCm: 10,
  presets: [
    {
      id: 'camera',
      name: { en: 'Camera / Eye (u > 2f = 30cm)', zh: '照相机 / 人眼 (u > 2f = 30cm)' },
      objectDistanceCm: 30,
      imageDistanceCm: 15,
      magnification: 0.5,
      nature: { en: 'Real, Inverted, Diminished', zh: '倒立、缩小、实像' },
    },
    {
      id: 'photocopier',
      name: { en: '1:1 Photocopier (u = 2f = 20cm)', zh: '复印机等大成倍 (u = 2f = 20cm)' },
      objectDistanceCm: 20,
      imageDistanceCm: 20,
      magnification: 1.0,
      nature: { en: 'Real, Inverted, Same Size', zh: '倒立、等大、实像' },
    },
    {
      id: 'projector',
      name: { en: 'Projector / Cinema (f < u < 2f = 15cm)', zh: '投影仪 / 幻灯机 (f < u < 2f = 15cm)' },
      objectDistanceCm: 15,
      imageDistanceCm: 30,
      magnification: 2.0,
      nature: { en: 'Real, Inverted, Magnified', zh: '倒立、放大、实像' },
    },
    {
      id: 'magnifier',
      name: { en: 'Magnifying Glass (u < f = 6cm)', zh: '放大镜 (u < f = 6cm)' },
      objectDistanceCm: 6,
      imageDistanceCm: -15,
      magnification: 2.5,
      nature: { en: 'Virtual, Upright, Magnified', zh: '正立、放大、虚像' },
    },
  ],
  examinerNotes: {
    en: 'Marking Scheme Essentials: 1. When drawing principal rays: Ray 1 parallel to axis refracts through focal point F; Ray 2 passes straight through optical center without deviation. 2. Virtual rays MUST be drawn with dashed lines and virtual images with dashed arrows! 3. Real images can be projected onto a screen; virtual images cannot.',
    zh: '中考/剑桥作图与答题铁律：1. 两条核心作图光线：平行于主光轴的光线经透镜折射后过焦点 F；过光心的光线传播方向不改变。2. 虚像与反向延长线必须使用虚线绘制！3. 实像能呈现在光屏上，而虚像只能用眼睛透过透镜观察。',
  },
}
