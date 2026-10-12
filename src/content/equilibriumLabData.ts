import type { EquilibriumLabExtra } from './types'

export const defaultEquilibriumLabData: EquilibriumLabExtra = {
  type: 'equilibrium-lab',
  id: 'equilibrium-workbench',
  title: {
    en: "Reversible Reactions & Le Chatelier's Dynamic Equilibrium Workbench",
    zh: '可逆反应与勒夏特列动态化学平衡实操工作台'
  },
  hint: {
    en: 'Vary temperature, pressure, and catalysts to observe Le Chatelier shifts, gas syringe color transitions (NO₂ ⇌ N₂O₄), and Haber & Contact process industrial trade-offs.',
    zh: '调节温度、压强与催化剂，观察勒夏特列平衡移动、NO₂/N₂O₄ 气体色泽演变以及哈伯法与接触法工业折中条件。'
  },
  systems: [
    {
      id: 'haber-process',
      name: {
        en: 'The Haber Process (Ammonia Synthesis)',
        zh: '哈伯法工业合成氨反应'
      },
      equation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
      deltaH: '-92 kJ/mol (forward exothermic)',
      forwardExothermic: true,
      gasMolesLeft: 4,
      gasMolesRight: 2,
      industrialConditions: {
        en: '450°C, 200 atm (20,000 kPa), finely divided Iron (Fe) catalyst. Compromise: high temperature favours rate but lowers yield; high pressure favours yield (4 mol → 2 mol) but requires costly reinforced plant.',
        zh: '450°C，200 个标准大气压 (20,000 kPa)，细颗粒铁触媒。折中考量：升温加快反应速率但降低平衡产率；加压促使平衡向气体分子数较少侧 (4 mol → 2 mol) 移动提高产率，但受限于设备建造成本与安全性。'
      },
      temperatureEffect: {
        en: 'Higher temperature shifts equilibrium in the endothermic direction (reverse / left), decreasing ammonia yield.',
        zh: '升高温度使平衡向吸热方向（逆反应/左侧）移动，降低氨气产率。'
      },
      pressureEffect: {
        en: 'Higher pressure shifts equilibrium towards fewer gas moles (forward / right: 4 mol → 2 mol), increasing ammonia yield.',
        zh: '增大压强使平衡向气体摩尔数减少的方向（正反应/右侧：4 mol → 2 mol）移动，增加氨气产率。'
      }
    },
    {
      id: 'contact-process',
      name: {
        en: 'The Contact Process Stage 2 (Sulfur Trioxide Synthesis)',
        zh: '接触法制硫酸第二阶段（三氧化硫催化氧化）'
      },
      equation: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)',
      deltaH: '-197 kJ/mol (forward exothermic)',
      forwardExothermic: true,
      gasMolesLeft: 3,
      gasMolesRight: 2,
      industrialConditions: {
        en: '450°C, 1–2 atm, Vanadium(V) oxide (V₂O₅) catalyst. At 2 atm and 450°C, conversion is already 98%; extreme pressure is unnecessary and economically wasteful.',
        zh: '450°C，1–2 个大气压，五氧化二钒 (V₂O₅) 催化剂。在 2 个大气压和 450°C 下，SO₂ 转化率已高达 98%，因此无需昂贵的高压容器即可获得极高工业经济效益。'
      },
      temperatureEffect: {
        en: 'Higher temperature shifts equilibrium left (endothermic), lowering SO₃ yield; lower temperature increases yield but slows reaction.',
        zh: '升高温度促使平衡逆向移动，降低 SO₃ 平衡产率；降温虽利于平衡但速率过慢。'
      },
      pressureEffect: {
        en: 'Higher pressure shifts equilibrium right (3 mol → 2 mol), but 2 atm is already sufficient for 98% conversion.',
        zh: '增大压强利于正反应（3 mol → 2 mol），但在 2 个大气压下产率已达 98%，无需更高压强。'
      }
    },
    {
      id: 'no2-n2o4-system',
      name: {
        en: 'Dimerisation of Nitrogen Dioxide (Color Shift in Syringe)',
        zh: '二氧化氮二聚显色平衡（气体注射器演示）'
      },
      equation: '2NO₂(g) ⇌ N₂O₄(g)',
      deltaH: '-57 kJ/mol (forward exothermic)',
      forwardExothermic: true,
      gasMolesLeft: 2,
      gasMolesRight: 1,
      colorLeft: '#9a3412',
      colorRight: '#f8fafc',
      colorDescriptionLeft: {
        en: 'Dark Red-Brown Gas (NO₂)',
        zh: '深红棕色有毒气体 (NO₂)'
      },
      colorDescriptionRight: {
        en: 'Colorless Gas (N₂O₄)',
        zh: '无色二聚体气体 (N₂O₄)'
      },
      industrialConditions: {
        en: 'Gas syringe / sealed glass ampoule demo: Cooling in ice bath turns gas completely pale/colorless. Heating in hot water turns gas dark reddish-brown. Compressing piston shifts equilibrium right towards colorless N₂O₄.',
        zh: '密封试管/注射器演示：放入冰水浴中混合气体褪色至近乎无色；放入热水中颜色变深呈浓烈红棕色；压缩注射器活塞平衡向右移动变浅。'
      },
      temperatureEffect: {
        en: 'Cooling shifts forward (exothermic), converting brown NO₂ into colorless N₂O₄. Heating shifts reverse (endothermic), darkening into brown NO₂.',
        zh: '降温促使平衡正向移动（放热），红棕色变浅消失；升温促使平衡逆向移动（吸热），红棕色显著加深。'
      },
      pressureEffect: {
        en: 'Increasing pressure shifts equilibrium to the right (2 mol → 1 mol), forming more colorless N₂O₄.',
        zh: '加大压强促使平衡向分子数减少的右侧移动（2 mol → 1 mol），生成更多无色 N₂O₄。'
      }
    }
  ],
  examinerNotes: {
    en: "Cambridge 0620 Golden Equilibrium Rules: (1) Dynamic equilibrium requires a CLOSED system where rate of forward = rate of reverse reaction, and concentrations remain constant. (2) Temperature: shift always opposes the change (increase T favours endothermic; decrease T favours exothermic). (3) Pressure: shift opposes the change (increase P favours side with FEWER gas moles). (4) Catalyst: accelerates BOTH forward and reverse rates equally, so it NEVER shifts equilibrium position or increases yield!",
    zh: '剑桥 0620 动态化学平衡黄金法则：(1) 动态平衡必须在密闭系统中建立，此时正逆反应速率严格相等，各组分浓度保持恒定不变。(2) 温度：升高温度永远促使平衡向吸热方向移动，降低温度促使平衡向放热方向移动。(3) 压强：增大压强永远促使平衡向气体摩尔数更少的一侧移动。(4) 催化剂：同等程度提高正逆反应速率，仅缩短达到平衡所需时间，绝不改变平衡位置或产率！'
  }
}

export type ShiftResult = {
  direction: 'forward' | 'reverse' | 'none'
  yieldChange: 'increases' | 'decreases' | 'unchanged'
  explanation: string
}

export function predictEquilibriumShift(
  systemId: string,
  tempShift: 'higher' | 'lower' | 'constant',
  pressureShift: 'higher' | 'lower' | 'constant',
  catalystAdded: boolean
): ShiftResult {
  const sys = defaultEquilibriumLabData.systems.find((s) => s.id === systemId)!

  // If only catalyst is toggled
  if (tempShift === 'constant' && pressureShift === 'constant' && catalystAdded) {
    return {
      direction: 'none',
      yieldChange: 'unchanged',
      explanation: 'A catalyst increases the rates of forward and reverse reactions equally. It reaches equilibrium faster but does NOT alter equilibrium position or yield.'
    }
  }

  let forwardVotes = 0
  let reverseVotes = 0

  // Temperature analysis:
  // Forward is exothermic, reverse is endothermic
  if (tempShift === 'higher') {
    // Higher temp favours endothermic (reverse)
    reverseVotes += 2
  } else if (tempShift === 'lower') {
    // Lower temp favours exothermic (forward)
    forwardVotes += 2
  }

  // Pressure analysis:
  // Left moles vs Right moles
  const deltaGasMoles = sys.gasMolesRight - sys.gasMolesLeft // e.g. 2 - 4 = -2 (fewer on right)
  if (pressureShift === 'higher') {
    if (deltaGasMoles < 0) {
      forwardVotes += 2 // right has fewer moles
    } else if (deltaGasMoles > 0) {
      reverseVotes += 2
    }
  } else if (pressureShift === 'lower') {
    if (deltaGasMoles < 0) {
      reverseVotes += 2 // left has more moles
    } else if (deltaGasMoles > 0) {
      forwardVotes += 2
    }
  }

  if (forwardVotes > reverseVotes) {
    return {
      direction: 'forward',
      yieldChange: 'increases',
      explanation: 'Conditions favour the forward reaction according to Le Chatelier\'s Principle, shifting equilibrium to the right and increasing product yield.'
    }
  } else if (reverseVotes > forwardVotes) {
    return {
      direction: 'reverse',
      yieldChange: 'decreases',
      explanation: 'Conditions favour the reverse reaction according to Le Chatelier\'s Principle, shifting equilibrium to the left and decreasing product yield.'
    }
  }

  return {
    direction: 'none',
    yieldChange: 'unchanged',
    explanation: 'The system remains in dynamic equilibrium with constant reactant and product concentrations.'
  }
}
