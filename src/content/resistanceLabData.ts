/**
 * Electrical Resistance & I-V Characteristics Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.4.2.4.1: Recall and use R = V / I.
 * - 0625.4.2.4.2: Describe an experiment to determine resistance using a voltmeter and an ammeter.
 * - 0625.4.2.4.3: State qualitatively how resistance of a metallic wire depends on length and cross-sectional area (R ∝ l, R ∝ 1/A).
 * - 0625.4.2.4.4: Sketch and explain I–V graphs for a fixed resistor, a filament lamp and a diode.
 * - Paper 5/6 Practical skills:
 *   - Circuit connection: Ammeter in series (low resistance), Voltmeter in parallel across component (high resistance).
 *   - Using a rheostat (variable resistor) to vary current and p.d. smoothly across 6 to 8 values.
 *   - Avoiding overheating by switching off circuit between readings.
 */

import type { ResistanceLabExtra } from '@/content/types'

export type ComponentKind = 'resistor' | 'filament' | 'diode' | 'thermistor'

export interface ComponentIVState {
  componentId: ComponentKind
  voltageV: number
  currentA: number
  resistanceOhm: number
  isOhmic: boolean
  physicalExplanation: {
    en: string
    zh: string
  }
}

export function calculateComponentIV(
  componentId: ComponentKind,
  voltageV: number,
): ComponentIVState {
  const v = Math.max(0, voltageV)
  let currentA = 0
  let isOhmic = false
  let explanation = { en: '', zh: '' }

  switch (componentId) {
    case 'resistor': {
      // Constant R = 10 Ohms
      isOhmic = true
      currentA = v / 10
      explanation = {
        en: 'Ohmic Conductor: Constant temperature keeps resistance constant (10.0 Ω). Straight line through origin (I ∝ V).',
        zh: '欧姆导体：恒定温度下电阻保持恒定 (10.0 Ω)。图线为过原点的正比例直线 (I ∝ V)。',
      }
      break
    }
    case 'filament': {
      // Filament lamp: I = 0.28 * V^0.65
      isOhmic = false
      currentA = v === 0 ? 0 : 0.28 * Math.pow(v, 0.65)
      explanation = {
        en: 'Filament Lamp: Higher voltage causes higher temperature. Metal lattice ions vibrate faster, impeding electron flow, so resistance INCREASES with p.d. (gradient decreases).',
        zh: '灯丝灯泡：电压增大引起温度升高，金属晶格离子热振动加剧增加对自由电子的碰撞阻碍，电阻随电压升高而增大（图线斜率变缓）。',
      }
      break
    }
    case 'diode': {
      // Forward threshold around 0.6V
      isOhmic = false
      if (v < 0.6) {
        currentA = 0
      } else {
        currentA = 0.45 * Math.pow(v - 0.6, 1.6)
      }
      explanation = {
        en: 'Semiconductor Diode: Extremely high resistance in reverse / low forward bias. Conducts strongly once threshold voltage (~0.6 V) is reached, resistance drops to near zero.',
        zh: '半导体二极管：单向导电性。低于开启门限电压 (~0.6 V) 时电流近乎为零，达到开启电压后电阻急剧下降至极低。',
      }
      break
    }
    case 'thermistor': {
      // NTC Thermistor: I = 0.06 * V^1.35
      isOhmic = false
      currentA = v === 0 ? 0 : 0.06 * Math.pow(v, 1.35)
      explanation = {
        en: 'NTC Thermistor: Higher voltage and current heat the semiconductor. More charge carriers are freed, so resistance DECREASES (gradient steepens).',
        zh: '负温度系数 (NTC) 热敏电阻：发热升温激发更多半导体载流子，导致电阻随温度升高而减小（图线斜率变陡）。',
      }
      break
    }
  }

  const resistanceOhm = currentA > 0.001 ? Number((v / currentA).toFixed(1)) : 999.9

  return {
    componentId,
    voltageV: Number(v.toFixed(2)),
    currentA: Number(currentA.toFixed(3)),
    resistanceOhm,
    isOhmic,
    physicalExplanation: explanation,
  }
}

export const RESISTANCE_LAB_DEFAULT: ResistanceLabExtra = {
  type: 'resistance-lab',
  id: 'extra-resistance-lab',
  title: {
    en: 'I-V Characteristics & Resistance Workbench',
    zh: '电阻与伏安特性 (I-V) 曲线实验台',
  },
  hint: {
    en: 'Adjust the DC power supply across the component. Compare the Ohmic straight line with the heating curvature of a filament lamp and the threshold behavior of a diode.',
    zh: '调节直流电源输出电压，对比定值电阻的欧姆直线、灯丝发热增阻曲线与二极管单向导通门限。',
  },
  components: [
    {
      id: 'resistor',
      name: { en: 'Fixed Resistor (Ohmic)', zh: '定值电阻 (欧姆导体)' },
      description: {
        en: 'Resistance R remains constant regardless of voltage.',
        zh: '遵循欧姆定律，无论电压如何变化，阻值均保持恒定。',
      },
      symbol: '[   ]',
      ivCurveData: [
        { v: 0, i: 0 },
        { v: 2, i: 0.2 },
        { v: 4, i: 0.4 },
        { v: 6, i: 0.6 },
        { v: 8, i: 0.8 },
        { v: 10, i: 1.0 },
      ],
    },
    {
      id: 'filament',
      name: { en: 'Filament Lamp (Non-Ohmic)', zh: '灯丝灯泡 (发热非欧姆)' },
      description: {
        en: 'Resistance increases as temperature rises with current.',
        zh: '随着电流流过灯丝发热升温，电阻显著增大。',
      },
      symbol: '( X )',
      ivCurveData: [
        { v: 0, i: 0 },
        { v: 2, i: 0.44 },
        { v: 4, i: 0.69 },
        { v: 6, i: 0.90 },
        { v: 8, i: 1.08 },
        { v: 10, i: 1.25 },
      ],
    },
    {
      id: 'diode',
      name: { en: 'Semiconductor Diode', zh: '半导体二极管 (单向导电)' },
      description: {
        en: 'Conducts current in one direction only above ~0.6V threshold.',
        zh: '单向导电，仅在正向偏压达到约 0.6V 门限后导通。',
      },
      symbol: '|>|',
      ivCurveData: [
        { v: 0, i: 0 },
        { v: 0.5, i: 0 },
        { v: 1.0, i: 0.11 },
        { v: 1.5, i: 0.38 },
        { v: 2.0, i: 0.77 },
        { v: 2.5, i: 1.27 },
      ],
    },
    {
      id: 'thermistor',
      name: { en: 'NTC Thermistor', zh: 'NTC 热敏电阻 (升温降阻)' },
      description: {
        en: 'Resistance decreases as temperature increases.',
        zh: '负温度系数，发热升温时自由载流子激增，电阻下降。',
      },
      symbol: '[ / ]',
      ivCurveData: [
        { v: 0, i: 0 },
        { v: 2, i: 0.15 },
        { v: 4, i: 0.39 },
        { v: 6, i: 0.67 },
        { v: 8, i: 0.99 },
        { v: 10, i: 1.34 },
      ],
    },
  ],
  examinerNotes: {
    en: 'Key Practical Rules: 1. Ammeter has near-zero resistance and MUST be connected in series. 2. Voltmeter has near-infinite resistance and MUST be connected in parallel. 3. For a filament lamp, the curve bends towards the voltage axis (decreasing gradient) because resistance increases with temperature.',
    zh: '电学实验核心避错准则：1. 电流表内阻极小，必须串联在电路中。2. 电压表内阻极大，必须并联在待测元件两端。3. 灯丝灯泡的 I-V 图像斜率逐渐变平（弯向电压轴），体现其电阻随温度上升而增大。',
  },
}
