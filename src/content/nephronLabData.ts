/**
 * Nephron Ultrafiltration & Selective Reabsorption Laboratory Dataset.
 *
 * Syllabus anchors:
 * - 0610.13.1.2: Describe the structure and function of a nephron.
 * - 0610.13.1.3: Explain ultrafiltration in the glomerulus and Bowman's capsule.
 * - 0610.13.1.4: Explain selective reabsorption of glucose, water and ions in the tubules.
 * - 0610.13.1.5: Describe the role of ADH in osmoregulation.
 */

import type { Bilingual, NephronLabExtra } from '@/content/types'

export interface FluidComposition {
  substance: Bilingual
  plasmaPercent: number
  filtratePercent: number
  urinePercent: number
  statusNote: Bilingual
}

export const FLUID_COMPOSITION_MATRIX: FluidComposition[] = [
  {
    substance: { en: 'Glucose', zh: '葡萄糖' },
    plasmaPercent: 0.1,
    filtratePercent: 0.1,
    urinePercent: 0.0,
    statusNote: {
      en: 'Filtered into capsule, then 100% selectively reabsorbed in proximal convoluted tubule via active transport.',
      zh: '滤入肾小囊，随后在近曲小管被载体蛋白 100% 主动重吸收回毛细血管（健康人尿液中绝无葡萄糖）。',
    },
  },
  {
    substance: { en: 'Proteins (Albumin / Globulin)', zh: '大分子血浆蛋白' },
    plasmaPercent: 7.0,
    filtratePercent: 0.0,
    urinePercent: 0.0,
    statusNote: {
      en: 'Too large to cross the basement membrane pores; completely retained in glomerular capillaries.',
      zh: '分子量过大，无法通过肾小球基底膜孔隙，完全保留在血液中。',
    },
  },
  {
    substance: { en: 'Urea (Metabolic waste)', zh: '尿素（代谢废物）' },
    plasmaPercent: 0.03,
    filtratePercent: 0.03,
    urinePercent: 2.0,
    statusNote: {
      en: 'Small molecule, fully filtered. Not reabsorbed; concentrated ~65-fold as water is recovered.',
      zh: '小分子，完全滤过进入原尿。由于大部分水被重吸收，尿素浓度在终尿中浓缩约 65 倍。',
    },
  },
  {
    substance: { en: 'Mineral Salts (Na⁺, Cl⁻)', zh: '无机盐离子' },
    plasmaPercent: 0.72,
    filtratePercent: 0.72,
    urinePercent: 1.5,
    statusNote: {
      en: 'Small ions filtered freely; majority reabsorbed according to body osmoregulatory needs.',
      zh: '小离子自由滤过；机体根据体液渗透压调节需要重吸收大部分，多余部分随尿排出。',
    },
  },
]

export const NEPHRON_REGIONS = [
  {
    id: 'glomerulus' as const,
    name: { en: 'Glomerulus & Bowman\'s Capsule', zh: '肾小球与肾小囊（皮质）' },
    process: { en: 'Ultrafiltration under high hydrostatic pressure', zh: '高压超滤作用（分子微筛）' },
    substancesMoved: {
      en: 'Water, glucose, urea and mineral ions forced across basement membrane into capsule forming filtrate; blood cells and proteins stay behind.',
      zh: '水、葡萄糖、尿素与矿物离子在高静水压下穿过基底膜进入肾小囊形成原尿；红细胞与大蛋白留在血液中。',
    },
    keyFeature: {
      en: 'Afferent arteriole is wider than efferent arteriole, generating high pressure. Basement membrane acts as molecular sieve.',
      zh: '入球小动脉口径明显宽于出球小动脉，产生高滤过压；基底膜充当分子筛。',
    },
  },
  {
    id: 'proximal-tubule' as const,
    name: { en: 'Proximal Convoluted Tubule (PCT)', zh: '近端小管（近曲小管）' },
    process: { en: '100% Selective Reabsorption of Glucose', zh: '葡萄糖 100% 选择性主动重吸收' },
    substancesMoved: {
      en: 'All glucose actively transported into capillaries against gradient; water follows by osmosis, most salts reabsorbed.',
      zh: '所有葡萄糖经载体蛋白逆浓度梯度主动泵回毛细血管；水分伴随渗透重吸收，大部分无机盐被收回。',
    },
    keyFeature: {
      en: 'Epithelial cells have dense microvilli (vast surface area) and abundant mitochondria to generate ATP for active transport.',
      zh: '管壁上皮细胞具有致密微绒毛（极大化表面积）和大量线粒体，为主动运输提供充足 ATP。',
    },
  },
  {
    id: 'loop-of-henle' as const,
    name: { en: 'Loop of Henle', zh: '亨利氏套（肾小管髓袢）' },
    process: { en: 'Water Recovery & Hypertonic Medulla Creation', zh: '水分梯级回收与髓质高渗梯度' },
    substancesMoved: {
      en: 'Water exits descending limb by osmosis; salts actively pumped out of thick ascending limb into medulla tissue fluid.',
      zh: '降支水分靠渗透出流；粗升支主动向外泵盐，在肾髓质组织液中建立极高渗透压环境。',
    },
    keyFeature: {
      en: 'Dips deep into the medulla. Desert animals (e.g. kangaroo rats) have extra-long loops to produce ultra-concentrated urine.',
      zh: '深插肾髓质。干旱荒漠动物（如更格卢鼠）拥有超长亨利氏套，以极度浓缩尿液避免脱水。',
    },
  },
  {
    id: 'collecting-duct' as const,
    name: { en: 'Collecting Duct & ADH Regulation', zh: '集合管与抗利尿激素 (ADH) 调控' },
    process: { en: 'Final Osmoregulation & Urine Concentration', zh: '终末渗透压调节与终尿浓缩' },
    substancesMoved: {
      en: 'Under high ADH, water permeable channels (aquaporins) open, water leaves duct into blood; dilute fluid leaves if ADH low.',
      zh: '当 ADH 水平升高时，管壁水通道蛋白开放，大量水分重吸收回血液；低 ADH 时水分留在管内排出大量稀尿。',
    },
    keyFeature: {
      en: 'Hypothalamus detects blood concentration; pituitary releases ADH. High ADH = small volume concentrated urine.',
      zh: '下丘脑监测血浆渗透压，垂体后叶分泌 ADH。高 ADH = 少而浓的尿；低 ADH = 多而稀的尿。',
    },
  },
]

export function getAdhScenario(mode: 'dehydrated' | 'normal' | 'hydrated') {
  if (mode === 'dehydrated') {
    return {
      mode,
      adhLevel: 'High',
      bloodOsmolarity: 'High (concentrated blood)',
      ductPermeability: 'Very permeable to water',
      urineVolume: 'Small volume (~0.5 dm³/day)',
      urineConcentration: 'Highly concentrated (dark amber, ~1200 mOsm/kg)',
      explanation: {
        en: 'Body is dehydrated: Hypothalamus stimulates pituitary to secrete high ADH. Collecting duct reabsorbs maximum water back into blood to prevent dehydration.',
        zh: '机体缺水脱水：下丘脑刺激脑垂体大量释放 ADH。集合管管壁对水通透性极高，最大量重吸收水分回血液，排出少量深色浓缩尿。',
      },
    }
  }
  if (mode === 'hydrated') {
    return {
      mode,
      adhLevel: 'Low',
      bloodOsmolarity: 'Low (dilute blood after drinking lots of water)',
      ductPermeability: 'Impermeable to water',
      urineVolume: 'Large volume (~2.5 dm³/day)',
      urineConcentration: 'Very dilute (pale yellow/clear, ~100 mOsm/kg)',
      explanation: {
        en: 'Excess water intake: Hypothalamus inhibits ADH secretion. Collecting ducts remain impermeable to water, so surplus water is safely excreted as large volume dilute urine.',
        zh: '饮水过量：下丘脑抑制 ADH 释放。集合管壁对水不通透，多余水分随集合管流出，排出大量清亮稀薄尿液。',
      },
    }
  }
  return {
    mode: 'normal' as const,
    adhLevel: 'Moderate',
    bloodOsmolarity: 'Normal (balanced setpoint)',
    ductPermeability: 'Moderately permeable',
    urineVolume: 'Normal (~1.5 dm³/day)',
    urineConcentration: 'Standard concentration (~600 mOsm/kg)',
    explanation: {
      en: 'Homeostasis equilibrium: Normal ADH balances daily fluid intake and metabolic output.',
      zh: '稳态动态平衡：正常 ADH 水平精准平衡日常饮水与代谢水分散失。',
    },
  }
}

export const nephronLabData: NephronLabExtra = {
  type: 'nephron-lab',
  id: 'nephron-filtration-lab',
  title: {
    en: 'Nephron Workbench: Ultrafiltration, Selective Reabsorption & ADH',
    zh: '肾单位虚拟工作台：超滤过、葡萄糖100%重吸收与 ADH 渗透调节',
  },
  hint: {
    en: 'Trace fluid flow from the glomerulus down to the collecting duct. Switch between dehydration and excess hydration to see ADH change urine concentration in real time.',
    zh: '跟踪原尿从肾小球滤过至集合管的全程。切换脱水与多水状态，实时观察 ADH 如何改变终尿体积与浓缩倍数。',
  },
  regions: NEPHRON_REGIONS,
  examinerNotes: {
    en: 'Paper 4 Core Exam Traps: 1) Why is glucose absent from urine of a healthy person? 100% selectively reabsorbed in proximal convoluted tubule by active transport; 2) What causes high pressure in glomerulus? Afferent arteriole has a larger diameter than efferent arteriole; 3) What is retained in blood during ultrafiltration? Proteins and blood cells (too large); 4) High ADH = small volume of concentrated urine.',
    zh: 'Paper 4 压轴高频必背陷阱：1) 为什么健康人尿液中绝无葡萄糖？因为在近曲小管被载体蛋白 100% 选择性主动重吸收；2) 肾小球高压从何而来？入球小动脉口径明显大于出球小动脉；3) 超滤时哪些成分留在血液中？大分子蛋白质与血细胞（分子过大无法穿过基底膜）；4) 高 ADH = 浓缩、少量的终尿。',
  },
}
