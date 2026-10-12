import type { GroupTrendsLabExtra } from './types'

export const defaultGroupTrendsLabData: GroupTrendsLabExtra = {
  type: 'group-trends-lab',
  id: 'group-trends-workbench',
  title: {
    en: 'Periodic Trends & Halogen Displacement Reactions Workbench',
    zh: '元素周期律与卤素置换反应实操工作台'
  },
  hint: {
    en: 'Explore Group I alkali metal water reactions, physical trends (melting point & density), and test the 3×3 halogen displacement matrix with redox explanations.',
    zh: '探究第一主族碱金属与水剧烈反应规律、物理熔点密度趋势，并交互实测卤素 3×3 置换反应矩阵与氧化还原机理。'
  },
  group1Metals: [
    {
      name: { en: 'Lithium (Li)', zh: '锂 (Li)' },
      symbol: 'Li',
      atomicNumber: 3,
      meltingPointC: 181,
      densityGcm3: 0.53,
      reactionWithWater: {
        en: 'Floats on water, fizzes steadily, evolves hydrogen gas, slowly dissolves to form alkaline LiOH (turns universal indicator purple). Does not melt.',
        zh: '浮在水面上，持续平稳冒出无色氢气泡，缓慢溶解生成强碱性 LiOH（通用指示剂变紫色）。反应放热不足以使其熔化成球。'
      },
      flameColor: { en: 'Red (Crimson)', zh: '红色（洋红）' },
      vigorRank: 1
    },
    {
      name: { en: 'Sodium (Na)', zh: '钠 (Na)' },
      symbol: 'Na',
      atomicNumber: 11,
      meltingPointC: 98,
      densityGcm3: 0.97,
      reactionWithWater: {
        en: 'Melts instantly into a silvery spherical bead due to reaction heat; darts frantically across water surface with vigorous effervescence.',
        zh: '放热迅速使其熔化成闪亮银白小球；小球在水表面极速游动，发出咝咝剧烈放气声，周围水溶液变强碱性。'
      },
      flameColor: { en: 'Yellow / Orange-Yellow', zh: '黄色 / 橙黄色' },
      vigorRank: 2
    },
    {
      name: { en: 'Potassium (K)', zh: '钾 (K)' },
      symbol: 'K',
      atomicNumber: 19,
      meltingPointC: 63,
      densityGcm3: 0.86,
      reactionWithWater: {
        en: 'Reacts violently; heat generated immediately ignites the hydrogen gas with a characteristic lilac flame; crackles and ends with a sharp pop.',
        zh: '反应极其剧烈；产生的巨大热量瞬间引燃氢气，迸发出特征丁香紫色火焰；伴随噼啪剧烈爆响并最终微爆结束。'
      },
      flameColor: { en: 'Lilac (Pale Violet)', zh: '丁香紫色（淡紫）' },
      vigorRank: 3
    },
    {
      name: { en: 'Rubidium (Rb)', zh: '铷 (Rb)' },
      symbol: 'Rb',
      atomicNumber: 37,
      meltingPointC: 39,
      densityGcm3: 1.53,
      reactionWithWater: {
        en: 'Extremely violent, explosive reaction immediately upon touching water; shockwave shatters glass beaker.',
        zh: '入水瞬间即发生剧烈冲击性爆炸；巨大冲击波直接击碎玻璃反应水槽。'
      },
      flameColor: { en: 'Red-Violet', zh: '红紫色' },
      vigorRank: 4
    },
    {
      name: { en: 'Caesium (Cs)', zh: '铯 (Cs)' },
      symbol: 'Cs',
      atomicNumber: 55,
      meltingPointC: 28,
      densityGcm3: 1.93,
      reactionWithWater: {
        en: 'Instant detonation explosion upon contact with water; highly destructive.',
        zh: '入水瞬间发生灾难性瞬爆；极度危险。'
      },
      flameColor: { en: 'Blue', zh: '蓝色' },
      vigorRank: 5
    }
  ],
  halogensList: [
    {
      name: { en: 'Chlorine (Cl₂)', zh: '氯气 (Cl₂)' },
      formula: 'Cl₂',
      stateAtRtp: { en: 'Pale yellow-green gas', zh: '黄绿色刺激性气体' },
      colorAtRtp: '#84cc16',
      colorDescription: { en: 'Pale green in solution', zh: '水溶液呈微黄绿色' },
      reactivityRank: 1
    },
    {
      name: { en: 'Bromine (Br₂)', zh: '溴单质 (Br₂)' },
      formula: 'Br₂',
      stateAtRtp: { en: 'Red-brown dense liquid', zh: '红棕色挥发性挥发液体' },
      colorAtRtp: '#ea580c',
      colorDescription: { en: 'Orange-red in solution', zh: '水溶液呈橙色 / 橙红色' },
      reactivityRank: 2
    },
    {
      name: { en: 'Iodine (I₂)', zh: '碘单质 (I₂)' },
      formula: 'I₂',
      stateAtRtp: { en: 'Grey-black solid (purple vapor)', zh: '灰黑片状固体（升华得紫色蒸气）' },
      colorAtRtp: '#475569',
      colorDescription: { en: 'Dark brown in solution', zh: '水溶液呈深红棕色' },
      reactivityRank: 3
    }
  ],
  halogenDisplacements: [
    {
      halogen: 'Cl₂',
      halide: 'KBr',
      occurs: true,
      colorChange: {
        en: 'Colourless solution turns orange/yellow due to formation of aqueous Bromine (Br₂)',
        zh: '无色溴化钾溶液变为橙色/红棕色，表明置换出游离态溴单质 (Br₂)'
      },
      equation: 'Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)'
    },
    {
      halogen: 'Cl₂',
      halide: 'KI',
      occurs: true,
      colorChange: {
        en: 'Colourless solution turns dark brown due to formation of aqueous Iodine (I₂)',
        zh: '无色碘化钾溶液变为深红褐色，表明置换出游离态碘单质 (I₂)'
      },
      equation: 'Cl₂(aq) + 2KI(aq) → 2KCl(aq) + I₂(aq)'
    },
    {
      halogen: 'Br₂',
      halide: 'KCl',
      occurs: false,
      colorChange: {
        en: 'No reaction occurs; solution remains pale orange (Bromine is less reactive than Chlorine)',
        zh: '不发生置换反应；溶液维持溴水原有的淡橙色（溴的非金属性弱于氯）'
      },
      equation: 'Br₂(aq) + KCl(aq) → No Reaction'
    },
    {
      halogen: 'Br₂',
      halide: 'KI',
      occurs: true,
      colorChange: {
        en: 'Orange solution turns dark brown due to formation of aqueous Iodine (I₂)',
        zh: '橙色溶液迅速转变为深褐色，表明置换出游离态碘单质 (I₂)'
      },
      equation: 'Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(aq)'
    },
    {
      halogen: 'I₂',
      halide: 'KCl',
      occurs: false,
      colorChange: {
        en: 'No reaction; solution remains brown (Iodine cannot displace Chloride)',
        zh: '不反应；溶液维持碘水原有深褐色（碘无法置换出氯）'
      },
      equation: 'I₂(aq) + KCl(aq) → No Reaction'
    },
    {
      halogen: 'I₂',
      halide: 'KBr',
      occurs: false,
      colorChange: {
        en: 'No reaction; solution remains brown (Iodine cannot displace Bromide)',
        zh: '不反应；溶液维持碘水原有深褐色（碘无法置换出溴）'
      },
      equation: 'I₂(aq) + KBr(aq) → No Reaction'
    }
  ],
  examinerNotes: {
    en: 'Cambridge 0620 Golden Periodic Trends: (1) Group I reactivity INCREASES down the group: larger atomic radius, more shielding, weaker attraction for outer electron, so 1 valence electron is lost more readily (easier oxidation). (2) Group VII reactivity DECREASES down the group: larger atomic radius, more shielding, incoming electron is less strongly attracted into outer shell (harder reduction). (3) A more reactive halogen displaces a less reactive halide from aqueous solution. Ionic: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ (Cl₂ is reduced, Br⁻ is oxidized).',
    zh: '剑桥 0620 周期律核心真题因果律：(1) 第一主族碱金属越往下反应越剧烈：原子半径增大，电子屏蔽层增多，原子核对最外层单电子引力变弱，越容易失电子发生氧化；(2) 第七主族卤素越往下反应活性越弱：原子半径增大，原子核对外界吸纳电子引力减弱，越难得电子被还原；(3) 强卤素置换弱卤化物离子。净离子方程：Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ (Cl₂ 得电子被还原为氧化剂，Br⁻ 失电子被氧化为还原剂)。'
  }
}

export function checkDisplacement(halogen: string, halide: string) {
  const match = defaultGroupTrendsLabData.halogenDisplacements.find(
    (d) => d.halogen === halogen && d.halide === halide
  )
  if (match) return match

  return {
    halogen,
    halide,
    occurs: false,
    colorChange: {
      en: 'No reaction (Identical halogen and halide)',
      zh: '无反应（同种卤素与卤化物）'
    },
    equation: `${halogen} + ${halide} → No Reaction`
  }
}
