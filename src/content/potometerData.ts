/**
 * Bubble Potometer Virtual Investigation Dataset & Simulation Physics.
 *
 * Syllabus anchors:
 * - 0610.8.2.3: Investigate and describe the effects of variation of temperature,
 *   wind speed, light intensity and humidity on transpiration rate.
 * - 0610.8.2.4: Explain how water vapour loss is related to large internal surface area
 *   and interconnecting air spaces in the spongy mesophyll.
 * - Paper 6 Practical: Cut shoot underwater, apply petroleum jelly (Vaseline) for airtight
 *   seal, capillary scale reading, reservoir tap reset.
 */

import type { Bilingual, PotometerLabExtra } from '@/content/types'

export interface PotometerConditionSpec {
  id: string
  name: Bilingual
  bubbleSpeedMmMin: number // mm moved in 1 minute
  transpirationRate: 'very-high' | 'high' | 'normal' | 'low'
  stomataState: Bilingual
  gradientNote: Bilingual
  explanation: Bilingual
}

export const POTOMETER_CONDITIONS: PotometerConditionSpec[] = [
  {
    id: 'baseline',
    name: { en: 'Still Air / Normal Room', zh: '基准室温静风环境 (20°C, 50% 湿度)' },
    bubbleSpeedMmMin: 12,
    transpirationRate: 'normal',
    stomataState: { en: 'Partially open stomata', zh: '气孔正常部分张开' },
    gradientNote: { en: 'Moderate water vapour concentration gradient', zh: '水蒸气浓度梯度适中' },
    explanation: {
      en: 'Baseline control condition: Water evaporates from mesophyll cell walls into air spaces and diffuses through open stomata at standard rate.',
      zh: '基准对照条件：水从叶肉细胞壁蒸发至气室，经张开的气孔以标准速率扩散到空气中。',
    },
  },
  {
    id: 'wind',
    name: { en: 'Wind / Electric Fan', zh: '开启电风扇（微风吹拂）' },
    bubbleSpeedMmMin: 26,
    transpirationRate: 'very-high',
    stomataState: { en: 'Open stomata', zh: '气孔张开' },
    gradientNote: { en: 'Steepest gradient (boundary layer stripped away)', zh: '极陡浓度梯度（潮湿边界层被吹走）' },
    explanation: {
      en: 'Air movement blows away the layer of humid water vapour surrounding the leaf surface. This maintains a steep water potential gradient, drastically speeding up diffusion.',
      zh: '风力吹散了叶表附着的湿润水蒸气边界层，维持极陡的蒸气浓度梯度，扩散散失速率大幅激增。',
    },
  },
  {
    id: 'light',
    name: { en: 'Bright Light (Lamp Nearby)', zh: '强光照射（台灯靠近）' },
    bubbleSpeedMmMin: 22,
    transpirationRate: 'high',
    stomataState: { en: 'Stomata fully open for photosynthesis', zh: '气孔完全张大以吸收CO₂' },
    gradientNote: { en: 'High diffusion through wide pores', zh: '气孔开度最大，扩散阻力降至最低' },
    explanation: {
      en: 'Light stimulates guard cells to become turgid, opening stomata wide to allow CO₂ intake for photosynthesis. Wide open apertures dramatically increase transpiration.',
      zh: '强光刺激保卫细胞吸水膨胀，气孔孔径开至最大以便吸收光合作用所需的 CO₂，水蒸气扩散通道大开，蒸腾速率显著升高。',
    },
  },
  {
    id: 'warm',
    name: { en: 'Elevated Temperature (30°C)', zh: '加温环境 (30°C 暖风)' },
    bubbleSpeedMmMin: 20,
    transpirationRate: 'high',
    stomataState: { en: 'Open stomata', zh: '气孔张开' },
    gradientNote: { en: 'Higher kinetic energy increases evaporation', zh: '水分子动能增加，叶肉蒸发加速' },
    explanation: {
      en: 'Higher temperature provides kinetic energy, speeding up evaporation from spongy mesophyll cell surfaces and accelerating random diffusion of water vapour out of stomata.',
      zh: '温度升高赋予水分子更多热运动动能，海绵叶肉细胞表面的水分蒸发更快，且水分子扩散速率同步上升。',
    },
  },
  {
    id: 'humidity',
    name: { en: 'High Humidity (Plastic Bag)', zh: '高湿度环境（罩透明塑料袋）' },
    bubbleSpeedMmMin: 4,
    transpirationRate: 'low',
    stomataState: { en: 'Open but shallow gradient', zh: '气孔张开但外界湿度饱和' },
    gradientNote: { en: 'Shallow / negligible concentration gradient', zh: '内外浓度梯度近乎拉平' },
    explanation: {
      en: 'Covering the shoot with a clear plastic bag traps moisture. The air outside the leaf becomes saturated with water vapour, flattening the concentration gradient and virtually halting transpiration.',
      zh: '用透明塑料袋罩住枝条会聚集大量蒸腾出的水汽。叶外空气湿度接近饱和，叶内外水蒸气浓度梯度近乎抹平，扩散速率骤降。',
    },
  },
]

/**
 * Calculates bubble displacement in mm over elapsed seconds for a chosen condition.
 */
export function calculateBubbleDisplacement(bubbleSpeedMmMin: number, elapsedSec: number): number {
  const mmPerSec = bubbleSpeedMmMin / 60
  return Number((mmPerSec * elapsedSec).toFixed(1))
}

export const potometerLabData: PotometerLabExtra = {
  type: 'potometer-lab',
  id: 'bubble-potometer-simulation',
  title: {
    en: 'Bubble Potometer: Transpiration Rate & Microclimate Workbench',
    zh: '气泡式蒸腾测定仪：四重环境微气候与失水速率实验室',
  },
  hint: {
    en: 'Observe the capillary air bubble move as transpiration pulls water up the leafy shoot. Switch between wind, light, heat, and humidity, and tap the reservoir tap to reset.',
    zh: '观察毛细管中的气泡随蒸腾拉力向左移动。切换风速、光照、温度与湿度变量，点击储水池活塞即可重置气泡。',
  },
  conditions: POTOMETER_CONDITIONS,
  examinerNotes: {
    en: 'Paper 6 Must-knows: 1) Cut shoot underwater to prevent air entering xylem vessels; 2) Vaseline around joints ensures airtight seal; 3) Rate = distance moved / time; 4) Controlled variables: same leaf area, acclimatise for 5 mins between condition changes.',
    zh: 'Paper 6 必考陷阱与考点：1) 在水下斜切枝条，严防空气进入导管阻塞水流；2) 凡士林涂抹各连接缝隙确保气密性；3) 蒸腾速率 = 气泡移动距离 ÷ 计时时间；4) 控制变量：保持叶面积恒定，每次切换环境需静置 5 分钟待植物适应。',
  },
}
