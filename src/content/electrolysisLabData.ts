import type { ElectrolysisLabExtra } from './types'

export const defaultElectrolysisLabData: ElectrolysisLabExtra = {
  type: 'electrolysis-lab',
  id: 'electrolysis-workbench',
  title: {
    en: 'Electrolysis & Half-Equation Practical Workbench',
    zh: '电解反应与半反应方程实操工作台'
  },
  hint: {
    en: 'Toggle DC power supply, observe ion migration towards electrodes, inspect half-equations, and verify products at anode and cathode.',
    zh: '开启直流电源，观察阴阳离子定向迁移、电极半反应与两极产物检验现象。'
  },
  scenarios: [
    {
      id: 'molten-lead-bromide',
      name: {
        en: 'Molten Lead(II) Bromide',
        zh: '熔融溴化铅 PbBr₂(l)'
      },
      electrolyteName: {
        en: 'Molten Lead(II) Bromide',
        zh: '熔融溴化铅'
      },
      electrolyteFormula: 'PbBr₂(l)',
      isAqueous: false,
      electrodes: {
        en: 'Inert Graphite (Carbon) Rods',
        zh: '惰性石墨（碳）电极棒'
      },
      ionsPresent: ['Pb²⁺', 'Br⁻'],
      cathodeProduct: {
        en: 'Lead metal (Pb, liquid beads)',
        zh: '金属铅（Pb，银灰色熔融液滴）'
      },
      anodeProduct: {
        en: 'Bromine gas (Br₂, red-brown vapor)',
        zh: '溴蒸气（Br₂，红棕色气体）'
      },
      cathodeHalfEquation: 'Pb²⁺ + 2e⁻ → Pb',
      anodeHalfEquation: '2Br⁻ → Br₂ + 2e⁻',
      observationCathode: {
        en: 'Silvery bead of dense molten lead forms at the base of the cathode',
        zh: '阴极棒底部汇聚生成银灰色熔融金属铅液滴并沉降'
      },
      observationAnode: {
        en: 'Pungent red-brown bromine vapor bubbles vigorously from the anode',
        zh: '阳极剧烈冒出刺激性红棕色溴蒸气气泡'
      },
      explanation: {
        en: 'In molten state with no water present, only Pb²⁺ cations and Br⁻ anions migrate. Cations gain electrons at cathode (reduction); anions lose electrons at anode (oxidation).',
        zh: '熔融态无水分子干扰，仅存在 Pb²⁺ 与 Br⁻。阳离子在阴极得电子被还原为单质铅；阴离子在阳极失电子被氧化为溴单质。'
      },
      solutionObservation: {
        en: 'Crucible requires continuous Bunsen heating to maintain molten ionic state',
        zh: '需要持续本生灯加热坩埚以维持熔融离子可流动状态'
      }
    },
    {
      id: 'concentrated-nacl',
      name: {
        en: 'Concentrated Aqueous Sodium Chloride (Brine)',
        zh: '浓氯化钠溶液（饱和食盐水）'
      },
      electrolyteName: {
        en: 'Brine (Conc. NaCl aq)',
        zh: '饱和食盐水'
      },
      electrolyteFormula: 'NaCl(aq) + H₂O(l)',
      isAqueous: true,
      electrodes: {
        en: 'Inert Graphite Rods',
        zh: '惰性石墨电极'
      },
      ionsPresent: ['Na⁺', 'Cl⁻', 'H⁺', 'OH⁻'],
      cathodeProduct: {
        en: 'Hydrogen gas (H₂)',
        zh: '氢气（H₂）'
      },
      anodeProduct: {
        en: 'Chlorine gas (Cl₂)',
        zh: '氯气（Cl₂）'
      },
      cathodeHalfEquation: '2H⁺ + 2e⁻ → H₂',
      anodeHalfEquation: '2Cl⁻ → Cl₂ + 2e⁻',
      observationCathode: {
        en: 'Rapid effervescence of colorless gas (gives squeaky pop with lighted splint)',
        zh: '剧烈冒出无色气体（点燃木条产生爆鸣声证明为氢气）'
      },
      observationAnode: {
        en: 'Pale yellow-green pungent gas evolved (bleaches damp blue litmus paper white)',
        zh: '冒出黄绿色刺激性氯气（使湿润蓝色石蕊试纸先变红后褪色漂白）'
      },
      explanation: {
        en: 'H⁺ is lower in the reactivity series than Na⁺, so H⁺ is preferentially reduced at cathode. High Cl⁻ concentration drives its preferential oxidation over OH⁻ at anode. Leaving Na⁺ and OH⁻ in solution as NaOH.',
        zh: 'H⁺ 在金属活动性顺序中远低于 Na⁺，在阴极优先得电子放电；高浓度 Cl⁻ 在阳极优先于 OH⁻ 放电。剩余 Na⁺ 与 OH⁻ 形成强碱性 NaOH 溶液。'
      },
      solutionObservation: {
        en: 'Remaining solution contains NaOH (turns universal indicator purple / phenolphthalein pink)',
        zh: '电解后溶液富集 NaOH，显强碱性（酚酞试剂变粉红，通用指示剂变紫色）'
      }
    },
    {
      id: 'dilute-sulfuric-acid',
      name: {
        en: 'Dilute Sulfuric Acid (Electrolysis of Water)',
        zh: '稀硫酸（电解水）'
      },
      electrolyteName: {
        en: 'Dilute Sulfuric Acid',
        zh: '稀硫酸'
      },
      electrolyteFormula: 'H₂SO₄(aq) + H₂O(l)',
      isAqueous: true,
      electrodes: {
        en: 'Inert Platinum or Graphite',
        zh: '惰性铂或石墨电极'
      },
      ionsPresent: ['H⁺', 'SO₄²⁻', 'OH⁻'],
      cathodeProduct: {
        en: 'Hydrogen gas (H₂, 2 volumes)',
        zh: '氢气（H₂，体积比 2）'
      },
      anodeProduct: {
        en: 'Oxygen gas (O₂, 1 volume)',
        zh: '氧气（O₂，体积比 1）'
      },
      cathodeHalfEquation: '2H⁺ + 2e⁻ → H₂',
      anodeHalfEquation: '4OH⁻ → O₂ + 2H₂O + 4e⁻',
      observationCathode: {
        en: 'Vigorous bubbling of colorless gas; volume collected is precisely twice that of anode',
        zh: '剧烈产生无色气体；收集管内气体体积为阳极氧气的两倍'
      },
      observationAnode: {
        en: 'Bubbling of colorless gas that relights a glowing splint (pure oxygen)',
        zh: '产生无色气体，使带火星的木条复燃（纯氧气检验）'
      },
      explanation: {
        en: 'Sulfate ions (SO₄²⁻) are never discharged in aqueous solution; OH⁻ is oxidized instead. Transfer of 4 moles of electrons yields 2 mol H₂ and 1 mol O₂, giving the classic 2:1 volume ratio.',
        zh: '硫酸根 SO₄²⁻ 在水溶液中永不放电，OH⁻ 优先失电子氧化生成 O₂。每转移 4 mol 电子生成 2 mol H₂ 与 1 mol O₂，产生严格的 2:1 气体体积比。'
      },
      solutionObservation: {
        en: 'Water is consumed, so concentration of sulfuric acid gradually increases',
        zh: '水被持续消耗分解，溶液中硫酸浓度略微增高'
      }
    },
    {
      id: 'copper-refining',
      name: {
        en: 'Purification of Copper (Active Electrodes)',
        zh: '铜的电解精炼（活性铜电极）'
      },
      electrolyteName: {
        en: 'Aqueous Copper(II) Sulfate',
        zh: '硫酸铜水溶液'
      },
      electrolyteFormula: 'CuSO₄(aq)',
      isAqueous: true,
      electrodes: {
        en: 'Anode: Impure Copper; Cathode: Pure Copper Foil',
        zh: '阳极：粗铜块；阴极：纯铜薄板'
      },
      ionsPresent: ['Cu²⁺', 'SO₄²⁻', 'H⁺', 'OH⁻'],
      cathodeProduct: {
        en: 'Pure refined Copper metal (Cu)',
        zh: '高纯金属铜（Cu）'
      },
      anodeProduct: {
        en: 'Cu²⁺ ions dissolve into solution',
        zh: '阳极铜溶解为 Cu²⁺ 离子'
      },
      cathodeHalfEquation: 'Cu²⁺ + 2e⁻ → Cu',
      anodeHalfEquation: 'Cu(s) → Cu²⁺ + 2e⁻',
      observationCathode: {
        en: 'Cathode grows noticeably thicker and heavier with salmon-pink copper deposits',
        zh: '阴极表面附着粉红色致密高纯铜，极板明显增重变厚'
      },
      observationAnode: {
        en: 'Impure copper anode dissolves, loses mass, and leaves precious anode sludge below',
        zh: '粗铜阳极逐渐溶蚀变薄脱落，底部沉淀金/银等贵金属阳极泥'
      },
      explanation: {
        en: 'Because active copper electrodes are used, anode copper oxidizes rather than water anions. Copper dissolves at anode at the identical rate it deposits at cathode, maintaining constant [Cu²⁺].',
        zh: '使用活性铜电极时，阳极铜本身优先于水中阴离子失电子氧化溶解。阳极溶解速率与阴极析出速率完全相同，溶液中 Cu²⁺ 浓度恒定，蓝色永不褪色。'
      },
      solutionObservation: {
        en: 'Intensity of blue solution remains completely unchanged throughout the process',
        zh: '溶液的蓝色深浅在整个电解过程中始终保持完全不变'
      }
    }
  ],
  examinerNotes: {
    en: 'Cambridge 0620 Invariant: PANIC (Positive Anode, Negative Is Cathode) & RED CAT / AN OX (Reduction at Cathode, Oxidation at Anode). In aqueous electrolytes, H⁺ from water discharges unless Cu²⁺, Ag⁺, or Au⁺ are present. Halides discharge at anode only when concentrated.',
    zh: '剑桥 0620 考纲口诀：PANIC（正极阳极，负极阴极）与 RED CAT / AN OX（阴极得电子发生还原，阳极失电子发生氧化）。水溶液中除非存在 Cu²⁺、Ag⁺ 等不活泼金属，否则阴极优先析出 H₂；阳极仅高浓度卤素优先析出，其余含氧酸根皆析出 O₂。'
  }
}

export interface GasYieldResult {
  chargeCoulombs: number
  molesElectrons: number
  cathodeGasMoles: number
  anodeGasMoles: number
  cathodeVolumeCm3: number
  anodeVolumeCm3: number
  ratioCathodeToAnode: string
}

export function calculateGasYield(
  scenarioId: string,
  currentAmps: number,
  timeSeconds: number
): GasYieldResult {
  const FARADAY = 96485
  const MOLAR_VOLUME_CM3 = 24000 // 24 dm3 = 24000 cm3 at r.t.p.

  const charge = currentAmps * timeSeconds
  const molesElectrons = charge / FARADAY

  let cathodeGasMoles = 0
  let anodeGasMoles = 0
  let ratioCathodeToAnode = 'N/A'

  if (scenarioId === 'dilute-sulfuric-acid') {
    // 2H+ + 2e- -> H2 => 1 mol H2 per 2 mol e-
    cathodeGasMoles = molesElectrons / 2
    // 4OH- -> O2 + 2H2O + 4e- => 1 mol O2 per 4 mol e-
    anodeGasMoles = molesElectrons / 4
    ratioCathodeToAnode = '2 : 1'
  } else if (scenarioId === 'concentrated-nacl') {
    // 2H+ + 2e- -> H2 => 1 mol H2 per 2 mol e-
    cathodeGasMoles = molesElectrons / 2
    // 2Cl- -> Cl2 + 2e- => 1 mol Cl2 per 2 mol e-
    anodeGasMoles = molesElectrons / 2
    ratioCathodeToAnode = '1 : 1'
  } else if (scenarioId === 'molten-lead-bromide') {
    // Anode makes Br2 gas: 2Br- -> Br2 + 2e-
    anodeGasMoles = molesElectrons / 2
    cathodeGasMoles = 0 // Lead is liquid/solid, not gas
    ratioCathodeToAnode = '0 : 1'
  } else if (scenarioId === 'copper-refining') {
    cathodeGasMoles = 0 // Cu is solid
    anodeGasMoles = 0 // Cu dissolves, no gas
    ratioCathodeToAnode = '0 : 0'
  }

  return {
    chargeCoulombs: charge,
    molesElectrons,
    cathodeGasMoles,
    anodeGasMoles,
    cathodeVolumeCm3: +(cathodeGasMoles * MOLAR_VOLUME_CM3).toFixed(2),
    anodeVolumeCm3: +(anodeGasMoles * MOLAR_VOLUME_CM3).toFixed(2),
    ratioCathodeToAnode
  }
}
