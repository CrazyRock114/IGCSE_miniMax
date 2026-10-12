import type { EnergeticsLabExtra } from './types'

export const defaultEnergeticsLabData: EnergeticsLabExtra = {
  type: 'energetics-lab',
  id: 'energetics-workbench',
  title: {
    en: 'Chemical Energetics & Bond Energy Profile Workbench',
    zh: '化学能量学与键能反应进程工作台'
  },
  hint: {
    en: 'Calculate enthalpy changes from bond energies (ΔH = ΣBroken - ΣFormed), explore energy level profiles, and see how catalysts lower activation energy Ea.',
    zh: '根据化学键能定量计算反应焓变 (ΔH = 吸收总键能 - 释放总键能)，观察吸热放热能级曲线与催化剂对活化能 Ea 的降低作用。'
  },
  reactions: [
    {
      id: 'methane-combustion',
      name: {
        en: 'Combustion of Methane (Exothermic, ΔH < 0)',
        zh: '甲烷完全燃烧反应（放热，ΔH < 0）'
      },
      equation: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
      deltaH: -818,
      activationEnergy: 650,
      isExothermic: true,
      bondsBroken: [
        { bond: 'C-H', count: 4, energy: 412 },
        { bond: 'O=O', count: 2, energy: 498 }
      ],
      bondsFormed: [
        { bond: 'C=O (in CO₂)', count: 2, energy: 805 },
        { bond: 'O-H', count: 4, energy: 464 }
      ]
    },
    {
      id: 'hydrogen-combustion',
      name: {
        en: 'Combustion of Hydrogen Fuel (Exothermic, ΔH < 0)',
        zh: '氢气燃料燃烧生成水蒸气（放热，ΔH < 0）'
      },
      equation: '2H₂(g) + O₂(g) → 2H₂O(g)',
      deltaH: -486,
      activationEnergy: 436,
      isExothermic: true,
      bondsBroken: [
        { bond: 'H-H', count: 2, energy: 436 },
        { bond: 'O=O', count: 1, energy: 498 }
      ],
      bondsFormed: [
        { bond: 'O-H', count: 4, energy: 464 }
      ]
    },
    {
      id: 'nitrogen-monoxide-synthesis',
      name: {
        en: 'Formation of Nitrogen Monoxide in Car Engine (Endothermic, ΔH > 0)',
        zh: '高温合成一氧化氮（吸热反应，ΔH > 0）'
      },
      equation: 'N₂(g) + O₂(g) → 2NO(g)',
      deltaH: 181,
      activationEnergy: 945,
      isExothermic: false,
      bondsBroken: [
        { bond: 'N≡N (triple bond)', count: 1, energy: 945 },
        { bond: 'O=O', count: 1, energy: 498 }
      ],
      bondsFormed: [
        { bond: 'N=O', count: 2, energy: 631 }
      ]
    }
  ],
  examinerNotes: {
    en: 'Cambridge 0620 Golden Rule: "BENDO MEXO" — Bond Breaking is ENDOthermic (takes in energy, +), Bond Making is EXOthermic (releases energy, -). ΔH = Σ(bonds broken) - Σ(bonds formed). A catalyst lowers the activation energy hump Ea, but leaves the overall ΔH completely unchanged!',
    zh: '剑桥 0620 核心口诀："BENDO MEXO"——断键吸收能量属吸热（+），成键释放能量属放热（-）。ΔH = 断裂吸收总能 - 形成释放总能。催化剂仅降低活化能能垒峰值 Ea，而反应总焓变 ΔH 始终严格保持不变！'
  }
}

export interface BondEnergyCalculation {
  totalBroken: number
  totalFormed: number
  deltaH: number
  isExothermic: boolean
}

export function calculateEnthalpyChange(
  bondsBroken: Array<{ count: number; energy: number }>,
  bondsFormed: Array<{ count: number; energy: number }>
): BondEnergyCalculation {
  const totalBroken = bondsBroken.reduce((sum, b) => sum + b.count * b.energy, 0)
  const totalFormed = bondsFormed.reduce((sum, b) => sum + b.count * b.energy, 0)
  const deltaH = totalBroken - totalFormed
  return {
    totalBroken,
    totalFormed,
    deltaH,
    isExothermic: deltaH < 0
  }
}
