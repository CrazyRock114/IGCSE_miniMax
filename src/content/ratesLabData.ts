import type { RatesLabExtra } from './types'

export const defaultRatesLabData: RatesLabExtra = {
  type: 'rates-lab',
  id: 'rates-workbench',
  title: {
    en: 'Rates of Reaction & Gas Syringe Practical Workbench',
    zh: '反应速率与气体注射器收集实操工作台'
  },
  hint: {
    en: 'Investigate how temperature, concentration, surface area, and catalysts alter collision frequency, initial rate tangents, and final gas volumes.',
    zh: '探究温度、浓度、表面积（颗粒大小）如何改变碰撞频率、初始切线速率及最终生成气体体积。'
  },
  reaction: {
    title: {
      en: 'Reaction of Calcium Carbonate with Hydrochloric Acid',
      zh: '碳酸钙与稀盐酸反应生成二氧化碳'
    },
    equation: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)'
  },
  presetRuns: [
    {
      id: 'baseline',
      name: {
        en: '1. Baseline Control (1.0 M HCl, 20°C, Medium chips, 2.0g CaCO₃)',
        zh: '1. 基准对照组（1.0 M 盐酸, 20°C, 中等颗粒, 2.0g 碳酸钙）'
      },
      tempC: 20,
      concM: 1.0,
      particleSize: 'medium',
      hasCatalyst: false,
      massReactantG: 2.0,
      kRate: 0.02,
      maxVolumeCm3: 48.0,
      notes: {
        en: 'Standard benchmark curve. Reaction starts briskly and levels off around 150 seconds as HCl is consumed.',
        zh: '标准对照曲线。反应开始平稳进行，约在 150 秒左右随盐酸消耗殆尽而趋于平缓。'
      }
    },
    {
      id: 'higher-temp',
      name: {
        en: '2. Higher Temperature (1.0 M HCl, 40°C, Medium chips, 2.0g CaCO₃)',
        zh: '2. 升高温度组（1.0 M 盐酸, 40°C, 中等颗粒, 2.0g 碳酸钙）'
      },
      tempC: 40,
      concM: 1.0,
      particleSize: 'medium',
      hasCatalyst: false,
      massReactantG: 2.0,
      kRate: 0.05,
      maxVolumeCm3: 48.0,
      notes: {
        en: 'Particles have higher average kinetic energy and move faster. A much greater proportion of collisions have energy ≥ activation energy (Eₐ). Initial gradient is more than double, but identical final volume (48 cm³).',
        zh: '分子热运动加剧，具有高于活化能（Eₐ）的有效碰撞比例显著跃升。初始切线斜率倍增，但由于反应物总量相同，最终体积严格保持 48 cm³。'
      }
    },
    {
      id: 'powder-surface-area',
      name: {
        en: '3. Fine Powder (1.0 M HCl, 20°C, Powdered CaCO₃, 2.0g)',
        zh: '3. 增大表面积组（1.0 M 盐酸, 20°C, 细粉末 CaCO₃, 2.0g）'
      },
      tempC: 20,
      concM: 1.0,
      particleSize: 'powder',
      hasCatalyst: false,
      massReactantG: 2.0,
      kRate: 0.08,
      maxVolumeCm3: 48.0,
      notes: {
        en: 'Crushing chips into fine powder exposes vastly greater surface area. Collision frequency per unit time spikes dramatically. Fastest initial rate; horizontal plateau reached in under 45 seconds.',
        zh: '将块状大理石研磨成细粉极大地增加了固液接触比表面积，单位时间碰撞频率暴增。初始斜率极陡，45秒内即可达到水平平衡，终点体积不变。'
      }
    },
    {
      id: 'double-concentration',
      name: {
        en: '4. Double Reactants (2.0 M HCl, 20°C, Medium chips, 4.0g CaCO₃)',
        zh: '4. 翻倍反应物量（2.0 M 盐酸, 20°C, 中等颗粒, 4.0g 碳酸钙）'
      },
      tempC: 20,
      concM: 2.0,
      particleSize: 'medium',
      hasCatalyst: false,
      massReactantG: 4.0,
      kRate: 0.042,
      maxVolumeCm3: 96.0,
      notes: {
        en: 'Doubling acid concentration increases particles per unit volume (more frequent collisions), AND doubling limiting mass doubles total CO₂ moles. The curve is both steeper AND reaches twice the final volume (96 cm³).',
        zh: '双倍盐酸浓度使单位体积反应粒子密度倍增，同时双倍反应物使最终生成 CO₂ 摩尔量翻倍。曲线初始斜率更陡峭，且最终水平线达到双倍体积（96 cm³）。'
      }
    }
  ],
  examinerNotes: {
    en: 'Cambridge 0620 Golden Rules: (1) Rate is steepest at t = 0 because reactant concentration is highest. (2) Gradient decreases as reactants are depleted, reducing collision frequency. (3) Curve flattens horizontally when limiting reactant is completely exhausted. (4) Temperature and surface area affect the RATE (speed to reach plateau), but NOT the final volume.',
    zh: '剑桥 0620 图像分析四大考点：(1) t = 0 时斜率最陡，反应速率最大，因反应物浓度最高；(2) 随反应物消耗，碰撞频率降低，曲线斜率逐渐减小；(3) 限量反应物完全耗尽时曲线呈水平直线；(4) 温度与表面积改变反应达到终点的速率（斜率），但绝对不改变最终收集气体总体积。'
  }
}

/**
 * Calculates gas volume collected at time t (seconds) using first-order approach:
 * V(t) = Vmax * (1 - e^(-k * t))
 */
export function calculateGasVolume(tSeconds: number, kRate: number, maxVolume: number): number {
  if (tSeconds <= 0) return 0
  const v = maxVolume * (1 - Math.exp(-kRate * tSeconds))
  return +(Math.min(v, maxVolume).toFixed(1))
}

/**
 * Calculates instantaneous reaction rate (dV/dt) at time t in cm³/s:
 * dV/dt = k * Vmax * e^(-k * t)
 */
export function calculateReactionRate(tSeconds: number, kRate: number, maxVolume: number): number {
  if (tSeconds < 0) return 0
  const rate = kRate * maxVolume * Math.exp(-kRate * tSeconds)
  return +(rate.toFixed(3))
}
