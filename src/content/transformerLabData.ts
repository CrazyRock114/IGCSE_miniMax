/**
 * Electromagnetic Transformer & High-Voltage Transmission Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0625.4.5.6.1: Describe transformer construction: primary & secondary insulated coils on a soft iron core.
 * - 0625.4.5.6.2: State the role of the soft iron core (easily magnetised and demagnetised).
 * - 0625.4.5.6.3: Recall and use Vp / Vs = Np / Ns.
 * - 0625.4.5.6.4: Understand step-up (Vs > Vp, Ns > Np) and step-down (Vs < Vp, Ns < Np).
 * - 0625.4.5.6.5: Recall and use Ip Vp = Is Vs for 100% efficiency.
 * - 0625.4.5.6.6: Explain why grid transmission uses high voltages: P_loss = I² R.
 */

import type { TransformerLabExtra } from '@/content/types'

export interface TransformerCalculationResult {
  primaryTurns: number
  secondaryTurns: number
  primaryVoltageV: number
  secondaryVoltageV: number
  primaryCurrentA: number
  secondaryCurrentA: number
  turnsRatio: number
  isStepUp: boolean
  transmissionPowerW: number
  cableResistanceOhm: number
  lossAtVpW: number
  lossAtVsW: number
  lossReductionRatio: number
}

export function calculateTransformer(
  Np: number,
  Ns: number,
  Vp: number,
  transmissionPowerW = 500,
  cableResistanceOhm = 4,
): TransformerCalculationResult {
  const turnsRatio = Ns / Math.max(1, Np)
  const Vs = Vp * turnsRatio
  const isStepUp = Vs > Vp

  // 100% efficient transformer: Pp = Ps = transmissionPowerW
  const Ip = transmissionPowerW / Math.max(0.1, Vp)
  const Is = transmissionPowerW / Math.max(0.1, Vs)

  // Cable power loss: P_loss = I^2 * R
  const lossAtVpW = Math.pow(Ip, 2) * cableResistanceOhm
  const lossAtVsW = Math.pow(Is, 2) * cableResistanceOhm
  const lossReductionRatio = lossAtVsW > 0 ? Number((lossAtVpW / lossAtVsW).toFixed(1)) : 1

  return {
    primaryTurns: Np,
    secondaryTurns: Ns,
    primaryVoltageV: Number(Vp.toFixed(1)),
    secondaryVoltageV: Number(Vs.toFixed(1)),
    primaryCurrentA: Number(Ip.toFixed(2)),
    secondaryCurrentA: Number(Is.toFixed(2)),
    turnsRatio: Number(turnsRatio.toFixed(2)),
    isStepUp,
    transmissionPowerW,
    cableResistanceOhm,
    lossAtVpW: Number(lossAtVpW.toFixed(1)),
    lossAtVsW: Number(lossAtVsW.toFixed(1)),
    lossReductionRatio,
  }
}

export const TRANSFORMER_LAB_DEFAULT: TransformerLabExtra = {
  type: 'transformer-lab',
  id: 'extra-transformer-lab',
  title: {
    en: 'Transformer & National Grid Transmission Sandbox',
    zh: '变压器与国家电网高压输电实验模拟舱',
  },
  hint: {
    en: 'Adjust coil turns and input a.c. voltage. See the magnetic flux linkage in the soft iron core and observe how stepping up voltage slashes cable I²R heat losses.',
    zh: '调节原副线圈匝数与输入交流电压，观察软铁芯磁通量交变耦合，验证升压输电如何几何级数缩减电缆 I²R 发热损耗。',
  },
  presets: [
    {
      id: 'step-up-grid',
      name: { en: 'Power Station Step-Up Grid (25V → 250V)', zh: '发电厂升压电网 (25V → 250V)' },
      primaryTurns: 100,
      secondaryTurns: 1000,
      primaryVoltageV: 25,
      secondaryVoltageV: 250,
      isStepUp: true,
      useCase: {
        en: 'Step-up at power stations: Current drops 10×, cable I²R heat losses slashed by 100×!',
        zh: '发电厂出站升压：电流降为 1/10，输电缆 I²R 热损耗暴降至 1/100！',
      },
    },
    {
      id: 'step-down-substation',
      name: { en: 'Substation Step-Down (240V → 24V)', zh: '变电站降压配电 (240V → 24V)' },
      primaryTurns: 400,
      secondaryTurns: 40,
      primaryVoltageV: 240,
      secondaryVoltageV: 24,
      isStepUp: false,
      useCase: {
        en: 'Step-down substation: Lowers dangerous high transmission voltages to safe working levels.',
        zh: '城镇配电降压：将危险的高压降低为安全可用工业与生活供电电压。',
      },
    },
    {
      id: 'phone-charger',
      name: { en: 'Mobile Phone Charger (230V → 5V)', zh: '手机便携充电适配器 (230V → 5V)' },
      primaryTurns: 460,
      secondaryTurns: 10,
      primaryVoltageV: 230,
      secondaryVoltageV: 5,
      isStepUp: false,
      useCase: {
        en: 'Domestic electronics: Greatly steps down mains 230V a.c. for rectification to 5V USB.',
        zh: '家用数码供电：将 230V 交流市电大幅降压以整流为 5V 手机充电直流电。',
      },
    },
  ],
  examinerNotes: {
    en: 'Key Cambridge Marking Criteria: 1. Transformers ONLY work on A.C., never on steady D.C., because induction requires a CHANGING magnetic field (dΦ/dt). 2. Doubling transmission voltage cuts current in half, cutting I²R cable loss to ONE-QUARTER (factor of 4).',
    zh: '剑桥考官核心评分标准：1. 变压器只能使用交流电 (A.C.) 工作，在恒定直流电 (D.C.) 下副线圈无感应电压，因为电磁感应依赖于变化的磁场！2. 输电电压加倍使输电电流减半，根据 P_loss = I²R，电缆发热损耗缩减至原来的四分之一。',
  },
}
