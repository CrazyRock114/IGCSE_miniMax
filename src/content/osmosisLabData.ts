/**
 * Dataset and experiment specifications for the Potato Cylinder Osmosis Practical.
 *
 * Core syllabus anchors:
 * - 0610.3.2.4: Describe the effect of osmosis on plant tissue.
 * - 0610.3.2.5: Investigate and describe the effects on plant tissues of immersing them
 *   in solutions of different concentrations.
 * - 0610.3.2.6: Explain the terms turgid, turgor pressure, plasmolysis and flaccid.
 * - Paper 6 Practical Skills: Controlled variables, % mass change formula, blotting dry,
 *   plotting points and finding the isotonic intercept.
 */

import type { OsmosisLabExtra, PotatoTubeSpec } from '@/content/types'

export const POTATO_TUBES: PotatoTubeSpec[] = [
  {
    id: 'tube-0',
    concMol: 0.0,
    initialMassG: 3.0,
    finalMassG: 3.6,
    percentChange: 20.0,
    cellState: 'turgid',
    note: {
      en: 'Distilled water (highest water potential): Water enters down gradient. Maximum turgor pressure reached; cell wall stops further expansion.',
      zh: '蒸馏水（最高水势）：水顺梯度大量净进入细胞。达到最大膨压，刚性细胞壁阻止细胞继续吸水胀破。',
    },
  },
  {
    id: 'tube-1',
    concMol: 0.2,
    initialMassG: 3.0,
    finalMassG: 3.25,
    percentChange: 8.3,
    cellState: 'turgid',
    note: {
      en: 'Dilute sucrose: Water potential outside is still higher than cell sap. Net entry of water increases cylinder mass and firmness.',
      zh: '低浓度蔗糖：外界水势仍高于细胞液。水分净进入使马铃薯条质量增加且手感挺拔硬脆。',
    },
  },
  {
    id: 'tube-2',
    concMol: 0.35,
    initialMassG: 3.0,
    finalMassG: 3.0,
    percentChange: 0.0,
    cellState: 'equilibrium',
    note: {
      en: 'ISOTONIC POINT (x-intercept): Water potential outside = inside. No net movement of water; mass does not change. Cell sap concentration is exactly 0.35 mol/dm³!',
      zh: '等渗点（x 轴截距）：外界水势 = 细胞液水势。水分子进出速率相等，质量零变化。测定出马铃薯细胞液浓度恰好为 0.35 mol/dm³！',
    },
  },
  {
    id: 'tube-3',
    concMol: 0.5,
    initialMassG: 3.0,
    finalMassG: 2.75,
    percentChange: -8.3,
    cellState: 'flaccid',
    note: {
      en: 'Concentrated sucrose: Solution has lower water potential than cell sap. Water leaves the vacuole; cylinder becomes flaccid and flexible.',
      zh: '中高浓度蔗糖：外界水势低于细胞液。水分从液泡净流出，膨压下降，薯条变软、可弯曲。',
    },
  },
  {
    id: 'tube-4',
    concMol: 0.7,
    initialMassG: 3.0,
    finalMassG: 2.42,
    percentChange: -19.3,
    cellState: 'plasmolysed',
    note: {
      en: 'Hypertonic sucrose: Substantial water loss causes plasmolysis — cell membrane pulls away from the cell wall, vacuole shrinks.',
      zh: '高渗蔗糖：大量水分流失导致质壁分离——细胞膜与细胞壁发生分离，液泡急剧缩小。',
    },
  },
  {
    id: 'tube-5',
    concMol: 1.0,
    initialMassG: 3.0,
    finalMassG: 1.95,
    percentChange: -35.0,
    cellState: 'plasmolysed',
    note: {
      en: 'Strong sucrose: Extreme water exit. The cylinder shrinks noticeably in diameter and length, feeling completely floppy.',
      zh: '极高浓度蔗糖：极度脱水。马铃薯条直径与长度肉眼可见收缩，手感极度干瘪柔软。',
    },
  },
]

export const osmosisLabData: OsmosisLabExtra = {
  type: 'osmosis-lab',
  id: 'osmosis-potato-bench',
  title: {
    en: 'Potato cylinder osmosis bench (Paper 5/6)',
    zh: '马铃薯组织渗透作用与等渗浓度测定实验台',
  },
  hint: {
    en: 'Immerse cylinders across 6 sucrose concentrations, blot dry, weigh, and find the isotonic x-intercept where mass change is zero.',
    zh: '将马铃薯条浸入 6 种浓度蔗糖溶液，吸干后称重，通过寻找质量变化率为 0 的 x 轴截距确定细胞液浓度。',
  },
  cellSapConc: 0.35,
  tubes: POTATO_TUBES,
  controlVariables: [
    { en: 'Same diameter (cork borer size 5)', zh: '相同直径（使用 5 号打孔器打出圆柱）' },
    { en: 'Same length (cut with scalpel to 40 mm)', zh: '相同长度（用手术刀截断为 40 mm）' },
    { en: 'Same volume of solution (25 cm³ in each tube)', zh: '相同溶液体积（每管注入 25 cm³）' },
    { en: 'Same immersion time (45 minutes)', zh: '相同浸泡时间（均为 45 分钟）' },
    { en: 'Same potato tuber (controls cell sap variation)', zh: '同一颗马铃薯（控制组织天然含糖量一致）' },
    { en: 'Blotted dry before weighing (removes surface liquid)', zh: '称量前吸干（去除附着在表面而非组织内的水）' },
  ],
  examinerNotes: {
    en: 'Paper 6 Key Tip: Always plot percentage change in mass, never raw grams! Because starting cylinders cannot be cut to exactly identical masses, percentage change normalises the data for a valid comparison. The x-intercept is where external water potential equals internal cell sap.',
    zh: 'Paper 6 核心答题要点：务必绘制百分比质量变化，决不能只画克数！因为薯条起始质量无法做到绝对均一，百分比变化实现了数据归一化。曲线穿过零点（x 轴截距）对应着外界水势等于马铃薯细胞液水势。',
  },
}
