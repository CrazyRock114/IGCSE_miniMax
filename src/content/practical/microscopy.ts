/**
 * Microscopy and magnification dataset & pure scientific kernel for Paper 5/6 practical skills.
 *
 * Core syllabus anchors:
 * - 0610.2.1.7: Calculate magnification and size of biological specimens using millimetres
 *   as units: M = I / A, converting between millimetres and micrometres.
 * - Paper 6 Practical Skills: Eyepiece graticule calibration with a stage micrometer,
 *   biological drawing measurements, specimen observation & cell structures.
 */

import type { Bilingual } from '@/content/types'

export interface MicroscopeObjective {
  power: number
  label: string
  /** Field of view diameter in micrometres (µm) */
  fovUm: number
  /** True micrometres per graticule division (0-100 scale) */
  umPerGraticuleDiv: number
}

export const OBJECTIVES: MicroscopeObjective[] = [
  { power: 4, label: '4× (Scanning)', fovUm: 4500, umPerGraticuleDiv: 25.0 },
  { power: 10, label: '10× (Low power)', fovUm: 1800, umPerGraticuleDiv: 10.0 },
  { power: 40, label: '40× (High power)', fovUm: 450, umPerGraticuleDiv: 2.5 },
]

export interface SpecimenSlide {
  id: string
  name: Bilingual
  scientificName: string
  stain: Bilingual
  description: Bilingual
  /** Target feature to measure */
  featureName: Bilingual
  /** True size of target feature in micrometres (µm) */
  targetActualSizeUm: number
  /** Recommended objective power for measuring this feature */
  recommendedPower: number
  /** Length of the drawing on an exam paper in millimetres (mm) for M = I / A drill */
  examDrawingSizeMm: number
  /** Examiner tips for Paper 5/6 */
  examinerTip: Bilingual
}

export const SPECIMEN_SLIDES: SpecimenSlide[] = [
  {
    id: 'onion-epidermis',
    name: { en: 'Onion epidermal cells', zh: '洋葱鳞片叶内表皮细胞' },
    scientificName: 'Allium cepa',
    stain: { en: 'Iodine solution (stains nucleus yellow-brown, wall clear)', zh: '碘液染色（细胞核呈棕黄色，细胞壁清晰）' },
    description: {
      en: 'Inner epidermis peel mounted in water with iodine stain added by irrigation. Brick-like cells with clear cell walls and prominent nuclei.',
      zh: '洋葱内表皮装片，以引流法滴加碘液染色。长方形砖块状排列，细胞壁清晰，细胞核明显。',
    },
    featureName: { en: 'Length of highlighted cell A', zh: '高亮细胞 A 的长度' },
    targetActualSizeUm: 200,
    recommendedPower: 10,
    examDrawingSizeMm: 80,
    examinerTip: {
      en: 'Convert millimetres to micrometres by multiplying by 1000 before dividing: M = I ÷ A = (80 × 1000) ÷ 200 = ×400. Never put units on magnification!',
      zh: '计算前务必将毫米乘以 1000 换算为微米：M = I ÷ A = (80 × 1000) ÷ 200 = ×400。放大倍数绝对不能带单位！',
    },
  },
  {
    id: 'stomata-guard-cells',
    name: { en: 'Leaf lower epidermis & stomata', zh: '植物叶片下表皮与气孔' },
    scientificName: 'Vicia faba',
    stain: { en: 'Unstained fresh peel in water', zh: '清水未染色临时装片' },
    description: {
      en: 'Lower epidermis of broad bean leaf showing jigsaw-shaped epidermal cells and kidney-shaped guard cells surrounding open stomata pores.',
      zh: '蚕豆叶下表皮，可见拼图状表皮细胞与围成气孔的成对肾形保卫细胞。',
    },
    featureName: { en: 'Length of guard cell pair', zh: '保卫细胞对的总长度' },
    targetActualSizeUm: 50,
    recommendedPower: 40,
    examDrawingSizeMm: 75,
    examinerTip: {
      en: 'Guard cells contain chloroplasts while surrounding epidermal cells do not. When drawing stomata, examiners check that inner cell walls are drawn thicker than outer walls.',
      zh: '保卫细胞含有叶绿体而普通表皮细胞没有。画气孔时，考官重点检查内侧壁是否明显画得比外侧壁更厚。',
    },
  },
  {
    id: 'plasmolysed-cells',
    name: { en: 'Plasmolysed purple onion cells', zh: '紫色洋葱质壁分离细胞' },
    scientificName: 'Allium cepa var. agrogatum',
    stain: { en: 'Mounted in 0.3 g/cm³ sucrose solution', zh: '置于 0.3 g/cm³ 蔗糖溶液中' },
    description: {
      en: 'Epidermal cells after immersion in concentrated sucrose. Water has left the cell by osmosis; cytoplasm and vacuole shrink away from the rigid cell wall.',
      zh: '浸泡在高浓度蔗糖溶液中的表皮细胞。水通过渗透作用流出细胞，原生质体与刚性细胞壁脱离，紫色液泡体积缩小。',
    },
    featureName: { en: 'Length of shrunken protoplast', zh: '收缩后原生质体的长度' },
    targetActualSizeUm: 110,
    recommendedPower: 10,
    examDrawingSizeMm: 66,
    examinerTip: {
      en: 'The space between the cell wall and the shrunken cell membrane is filled with the surrounding sucrose solution, NOT air, because the cell wall is freely permeable!',
      zh: '细胞壁与细胞膜之间的空隙充满着外界蔗糖溶液，而不是空气，因为植物细胞壁是全透性的！',
    },
  },
  {
    id: 'human-blood-smear',
    name: { en: 'Human blood smear', zh: '人血涂片' },
    scientificName: 'Homo sapiens',
    stain: { en: "Wright's stain (nuclei purple, RBCs pink)", zh: '瑞氏染色（细胞核呈紫蓝色，红细胞呈粉红）' },
    description: {
      en: 'Biconcave disc red blood cells without nuclei, with a large polymorphonuclear neutrophil white blood cell showing a 3-lobed nucleus.',
      zh: '成熟红细胞呈双凹圆盘状无核，中央较薄；中性粒细胞体积较大，具有明显的三叶分叶核。',
    },
    featureName: { en: 'Diameter of red blood cell', zh: '红细胞平均直径' },
    targetActualSizeUm: 7.5,
    recommendedPower: 40,
    examDrawingSizeMm: 60,
    examinerTip: {
      en: 'Human RBCs average 7–8 µm in diameter. In drawings, do not draw a nucleus in human RBCs, but remember frog/bird RBCs do have oval nuclei.',
      zh: '人红细胞平均直径为 7–8 µm。绘制人红细胞时切勿画核，但请记住蛙和鸟类的红细胞具有椭圆形细胞核。',
    },
  },
]

// ---------------------------------------------------------------------------
// Scientific Calculation & Grading Kernels
// ---------------------------------------------------------------------------

/**
 * Calibrate graticule against stage micrometer.
 * Stage micrometer has divisions of 10 µm each.
 *
 * @param stageDivisions Number of small stage divisions (each 10 µm)
 * @param graticuleDivisions Number of eyepiece graticule units spanning that distance
 * @returns Micrometres (µm) per eyepiece graticule division
 */
export function calibrateGraticule(stageDivisions: number, graticuleDivisions: number): number {
  if (graticuleDivisions <= 0) return 0
  const totalDistanceUm = stageDivisions * 10
  return Number((totalDistanceUm / graticuleDivisions).toFixed(2))
}

/**
 * Calculate actual size from image size and magnification.
 * A = I / M
 *
 * @param imageSizeMm Image size measured in millimetres
 * @param magnification Magnification (e.g. 400 for ×400)
 * @returns Actual size in micrometres (µm)
 */
export function calculateActualSizeUm(imageSizeMm: number, magnification: number): number {
  if (magnification <= 0) return 0
  const imageSizeUm = imageSizeMm * 1000
  return Number((imageSizeUm / magnification).toFixed(2))
}

/**
 * Calculate magnification from drawing size and actual size.
 * M = I / A
 *
 * @param imageSizeMm Drawing size on exam paper in millimetres (mm)
 * @param actualSizeUm True biological specimen size in micrometres (µm)
 * @returns Magnification factor (dimensionless)
 */
export function calculateMagnification(imageSizeMm: number, actualSizeUm: number): number {
  if (actualSizeUm <= 0) return 0
  const imageSizeUm = imageSizeMm * 1000
  return Math.round(imageSizeUm / actualSizeUm)
}

/**
 * Check a numeric answer within an acceptable percentage tolerance (default ±5%).
 */
export function checkNumericAnswer(userVal: number, expectedVal: number, tolerancePct = 5): boolean {
  if (Number.isNaN(userVal) || Number.isNaN(expectedVal) || expectedVal <= 0) return false
  const diffPct = Math.abs((userVal - expectedVal) / expectedVal) * 100
  return diffPct <= tolerancePct
}
