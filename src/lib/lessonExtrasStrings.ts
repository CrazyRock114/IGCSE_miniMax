/**
 * UI chrome strings for the lesson-extras interactive modules.
 *
 * Course copy (organ descriptions, tooth kinds, food names) lives in the lesson's
 * `extras` data, so it can be edited without touching components and so the bilingual
 * invariant is enforced at the type level. This file is for the buttons, empty-state
 * messages, and other UI strings that the renderer owns and the lesson author
 * should not need to think about.
 *
 * Kept separate from the components to satisfy the `no-Chinese-in-components`
 * ESLint rule, which exists to keep course copy translatable. The glyphs in
 * `src/lib/translatorGlyphs.ts` follow the same pattern.
 */

import type { Bilingual } from '@/content/types'

export const DIGESTIVE_ANATOMY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the food', zh: '跟着食物走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A ball of food is travelling mouth → anus. The right-hand panel follows along.',
    zh: '一团食物正从口腔走向肛门。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click an organ in the picture to read what happens there.',
    zh: '点击图中任意器官，查看那里发生什么。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first organ will appear on the right in a moment.',
    zh: '旅程即将开始，第一个器官马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const TEETH_ANATOMY = {
  layerHint: {
    en: 'Click a layer of the tooth to read what it does.',
    zh: '点击牙齿任一层，了解它的作用。',
  } satisfies Bilingual,
  kindHint: {
    en: 'Click a tooth below to see what it does.',
    zh: '点击下方任一牙齿，了解它的作用。',
  } satisfies Bilingual,
  gumLabel: { en: 'gum', zh: '牙龈' } satisfies Bilingual,
  nerveLabel: { en: 'nerve & blood vessels', zh: '神经与血管' } satisfies Bilingual,
} as const

export const VILLI_SURFACE_AREA = {
  hint: {
    en: 'Every finger is a villus, every patch of fuzz on a villus is microvilli. Absorption happens across all of it.',
    zh: '每一根指状突起是绒毛，绒毛上的每一片小绒毛是微绒毛。吸收就在这全部的表面上进行。',
  } satisfies Bilingual,
  sliderLabel: { en: 'Villi per cm²', zh: '每平方厘米的绒毛数' } satisfies Bilingual,
  bare: { en: 'Bare tube', zh: '光管' } satisfies Bilingual,
  withVilli: { en: 'With villi', zh: '有绒毛' } satisfies Bilingual,
  bareNote: { en: 'Just length × circumference', zh: '仅长 × 周长' } satisfies Bilingual,
  withVilliNote: { en: 'fold factor', zh: '皱褶系数' } satisfies Bilingual,
  withMicrovilli: { en: 'With microvilli', zh: '有微绒毛' } satisfies Bilingual,
  withMicrovilliNote: { en: '≈ a tennis court', zh: '≈ 一个网球场' } satisfies Bilingual,
  bareCaption: { en: 'Surface area = circumference × length', zh: '表面积 = 周长 × 长度' } satisfies Bilingual,
} as const

export const BILE_EMULSIFICATION = {
  hint: {
    en: 'Click "Add bile" to see what emulsification looks like.',
    zh: '点"+ 加入胆汁"看看乳化的样子。',
  } satisfies Bilingual,
  before: { en: 'Before bile', zh: '加入胆汁前' } satisfies Bilingual,
  after: { en: 'After bile', zh: '加入胆汁后' } satisfies Bilingual,
  add: { en: '+ Add bile', zh: '+ 加入胆汁' } satisfies Bilingual,
  reset: { en: '↺ Reset', zh: '↺ 重置' } satisfies Bilingual,
  on: {
    en: 'Many tiny drops. Lipase has a much larger surface to work on — that is the whole point of bile.',
    zh: '许多小液滴。脂肪酶可接触的表面积大得多——这就是胆汁的全部意义。',
  } satisfies Bilingual,
  off: {
    en: 'Click "Add bile" to see what emulsification looks like.',
    zh: '点"+ 加入胆汁"看看乳化的样子。',
  } satisfies Bilingual,
} as const

export const BALANCED_PLATE = {
  cardsHint: {
    en: 'Click a food to add it. Click again to take it off.',
    zh: '点击食物加入餐盘。再点一次则移除。',
  } satisfies Bilingual,
  totalLabel: { en: 'servings on the plate', zh: '份已上盘' } satisfies Bilingual,
  empty: { en: 'Your plate is empty.', zh: '餐盘是空的。' } satisfies Bilingual,
  balanced: { en: 'Balanced — all groups covered.', zh: '均衡——各组都有。' } satisfies Bilingual,
  reset: { en: 'Clear plate', zh: '清空餐盘' } satisfies Bilingual,
  groupLabel: {
    veg: { en: 'Vegetables', zh: '蔬菜' } satisfies Bilingual,
    fruit: { en: 'Fruit', zh: '水果' } satisfies Bilingual,
    protein: { en: 'Protein', zh: '蛋白质' } satisfies Bilingual,
    carb: { en: 'Carbs', zh: '碳水' } satisfies Bilingual,
    dairy: { en: 'Dairy', zh: '乳制品' } satisfies Bilingual,
    fat: { en: 'Healthy fats', zh: '健康脂肪' } satisfies Bilingual,
  },
} as const

export const DIGESTION_FLOW = {
  reveal: { en: 'Show definition', zh: '查看释义' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
} as const

export const VILLUS_DETAIL = {
  clickHint: {
    en: 'Click any labelled part of the villus to read what it does.',
    zh: '点击绒毛上任意标号部分，了解其作用。',
  } satisfies Bilingual,
  empty: {
    en: 'Click a part of the villus to read about it.',
    zh: '点击绒毛任一部分了解作用。',
  } satisfies Bilingual,
  transportTitle: {
    en: 'Where each nutrient goes',
    zh: '各种营养物质去哪里',
  } satisfies Bilingual,
  lumenLabel: { en: 'lumen of the small intestine', zh: '小肠肠腔' } satisfies Bilingual,
  lactealTag: { en: 'lacteal', zh: '乳糜管' } satisfies Bilingual,
  wallLabel: { en: 'gut wall (one cell thick)', zh: '肠壁（单层细胞）' } satisfies Bilingual,
} as const

export const FOOD_ENERGY = {
  colFood: { en: 'Food', zh: '食物' } satisfies Bilingual,
  colGroup: { en: 'Group', zh: '类别' } satisfies Bilingual,
  colEnergy: { en: 'Energy', zh: '能量' } satisfies Bilingual,
  colBar: { en: 'Relative', zh: '相对量' } satisfies Bilingual,
  pinnedHint: {
    en: 'Pinned for comparison:',
    zh: '已选中用于对比：',
  } satisfies Bilingual,
  clickHint: {
    en: 'Click a row to pin it; click again to clear. Fat carries more than twice the energy of the same mass of carbohydrate or protein.',
    zh: '点击任一行选中对比，再次点击取消。脂肪的能量是同质量碳水或蛋白的两倍以上。',
  } satisfies Bilingual,
  groupLabel: {
    carb: { en: 'Carb', zh: '碳水' } satisfies Bilingual,
    protein: { en: 'Protein', zh: '蛋白质' } satisfies Bilingual,
    fat: { en: 'Fat', zh: '脂肪' } satisfies Bilingual,
    'fruit-veg': { en: 'Fruit / Veg', zh: '果蔬' } satisfies Bilingual,
    dairy: { en: 'Dairy', zh: '乳制品' } satisfies Bilingual,
    mixed: { en: 'Mixed meal', zh: '混合餐' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// 9-1 Transport in animals — Chapter 2 (B7) extras
// ---------------------------------------------------------------------------

export const HEART_ANATOMY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the blood', zh: '跟着血液走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A red blood cell is travelling body → right heart → lungs → left heart → body. The right-hand panel follows along.',
    zh: '一个红细胞正从全身→右心→肺→左心→全身。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click a part of the heart in the picture to read what happens there.',
    zh: '点击图中任意心脏结构，查看那里发生什么。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first stop will appear on the right in a moment.',
    zh: '旅程即将开始，第一站马上会出现在右侧。',
  } satisfies Bilingual,
  openFullscreen: { en: 'Open fullscreen', zh: '全屏查看' } satisfies Bilingual,
} as const

export const BLOOD_VESSELS_COMPARE = {
  tableHeading: { en: 'Side by side', zh: '并排比较' } satisfies Bilingual,
  yes: { en: 'yes', zh: '有' } satisfies Bilingual,
  no: { en: 'no', zh: '无' } satisfies Bilingual,
  rowLabel: {
    wall: { en: 'Wall', zh: '管壁' } satisfies Bilingual,
    lumen: { en: 'Lumen', zh: '管腔' } satisfies Bilingual,
    hasValves: { en: 'Valves', zh: '瓣膜' } satisfies Bilingual,
    direction: { en: 'Flow direction', zh: '血流方向' } satisfies Bilingual,
    pressure: { en: 'Pressure', zh: '压力' } satisfies Bilingual,
  },
} as const

export const DOUBLE_CIRCULATION = {
  reveal: { en: 'Show definition', zh: '查看释义' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
  definitionsHeading: {
    en: 'The terms the syllabus uses',
    zh: '考纲里的术语',
  } satisfies Bilingual,
  connector: {
    en: 'the heart pumps again',
    zh: '心脏再次泵血',
  } satisfies Bilingual,
  rowLabel: {
    pulmonary: { en: 'Pulmonary loop', zh: '肺循环' } satisfies Bilingual,
    systemic: { en: 'Systemic loop', zh: '体循环' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// 11-1 Gas exchange and respiration — Chapter 3 (B8) extras
// ---------------------------------------------------------------------------

export const AIRWAY_PATHWAY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the air', zh: '跟着空气走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A breath is travelling larynx → trachea → bronchus → bronchiole → alveoli. The right-hand panel follows along.',
    zh: '一缕空气正从喉→气管→支气管→细支气管→肺泡。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click a part of the breathing system in the picture to read what it does.',
    zh: '点击图中任一呼吸系统结构，查看它的作用。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first stop will appear on the right in a moment.',
    zh: '旅程即将开始，第一站马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const RESPIRATION_COMPARE = {
  heading: { en: 'Aerobic vs anaerobic', zh: '有氧 vs 无氧' } satisfies Bilingual,
  aerobic: { en: 'Aerobic respiration', zh: '有氧呼吸' } satisfies Bilingual,
  anaerobic: { en: 'Anaerobic respiration', zh: '无氧呼吸' } satisfies Bilingual,
  equationsHeading: { en: 'The word equations', zh: '文字表达式' } satisfies Bilingual,
  anaerobicMuscle: { en: 'Anaerobic in muscle', zh: '肌肉中的无氧呼吸' } satisfies Bilingual,
  anaerobicYeast: { en: 'Anaerobic in yeast', zh: '酵母中的无氧呼吸' } satisfies Bilingual,
} as const

export const GAS_EXCHANGE_FEATURES = {
  featureLabel: { en: 'The feature', zh: '特征' } satisfies Bilingual,
  whyLabel: { en: 'Why it matters', zh: '为何重要' } satisfies Bilingual,
} as const

export const SMOKING_EFFECTS = {
  heroAlt: {
    en: 'A burning cigarette, with four arrows pointing at the four things in cigarette smoke that cause harm',
    zh: '一支燃烧的香烟，四支箭头分别指向烟雾中四种有害物质',
  } satisfies Bilingual,
  substancesHeading: {
    en: 'What is in cigarette smoke',
    zh: '香烟烟雾里有什么',
  } satisfies Bilingual,
  substancesIntro: {
    en: 'Four substances in the smoke. Each one does a different kind of damage — together they cause the diseases below.',
    zh: '烟雾中有四种物质。各自造成不同损害——共同引发了下面的疾病。',
  } satisfies Bilingual,
  diseasesHeading: {
    en: 'What smoking does to the body',
    zh: '吸烟对身体的影响',
  } satisfies Bilingual,
  diseasesIntro: {
    en: 'Four diseases the syllabus names. Each card carries a real figure and the mechanism linking the substance above to the disease here.',
    zh: '考纲点名的四种疾病。每张卡片配以真实图示，以及连接上方物质与下方疾病的机理。',
  } satisfies Bilingual,
  mechanismLabel: { en: 'How it harms', zh: '如何伤害' } satisfies Bilingual,
  clinicalLabel: { en: 'What it looks like', zh: '临床表现' } satisfies Bilingual,
  evidenceHeading: {
    en: 'The evidence: a century of data',
    zh: '证据：一个世纪的数据',
  } satisfies Bilingual,
  evidenceBody: {
    en: 'In the 1950s, the British doctor Richard Doll noticed that lung-cancer cases were rising year on year. He interviewed lung-cancer patients in twenty London hospitals, and almost all of them were smokers. The graph below — annual UK cigarette consumption against annual lung-cancer deaths, 1911 to 2001 — is what settled the question for the rest of the century.',
    zh: '1950 年代,英国医生 Richard Doll 注意到肺癌病例年年攀升。他在伦敦二十家医院访谈肺癌患者,几乎全是吸烟者。下面这张图——英国每年香烟消耗量与每年肺癌死亡数,1911 至 2001 年——让这个问题在之后的几十年中不再有争议。',
  } satisfies Bilingual,
  evidenceLag: {
    en: 'The lung-cancer curve trails the smoking curve by roughly twenty years. That is the lag between damaging the DNA in a cell and that cell becoming a tumour — the smoking that rose in 1950 became the cancer that was diagnosed in 1970.',
    zh: '肺癌曲线比吸烟曲线晚约 20 年。这正是 DNA 损伤与肿瘤形成之间的时滞——1950 年上升的吸烟量,要等到 1970 年才表现为被诊断的癌症。',
  } satisfies Bilingual,
} as const

/**
 * Shared by 14-1 reflex-arc + eye-anatomy. Same idea as AIRWAY_PATHWAY:
 * an explore mode (free) and a follow mode (animated sequence).
 */
export const REFLEX_ARC = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the impulse', zh: '跟着脉冲走' } satisfies Bilingual,
  followPrompt: {
    en: 'Receptor → sensory neurone → relay neurone → motor neurone → effector. Note what the impulse does *not* visit.',
    zh: '感受器→感觉神经→中间神经→运动神经→效应器。注意脉冲*不*经过什么。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click any part of the reflex arc on the left. Or press "Follow the impulse" to walk through the reflex step by step.',
    zh: '点击左侧反射弧的任一部分。或按"跟着脉冲走"逐步走一遍反射。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Watch the dot. The reflex turns round at the spinal cord — your hand is off the hot plate before your brain knows you have been hurt.',
    zh: '看着圆点走。反射在脊髓折返——手离开热盘比大脑知道烫还快。',
  } satisfies Bilingual,
} as const

export const EYE_ANATOMY = {
  empty: {
    en: 'Click any labelled part of the eye. The cornea and lens focus light on the retina; the iris controls how much.',
    zh: '点击眼的任一标注部分。角膜和晶状体把光聚焦到视网膜；虹膜控制进光量。',
  } satisfies Bilingual,
  followPrompt: {
    en: 'Light → cornea → aqueous humour → pupil → lens → vitreous humour → retina → optic nerve. The image is upside down and back to front at first — the brain flips it.',
    zh: '光→角膜→房水→瞳孔→晶状体→玻璃体→视网膜→视神经。最初的像是倒置的——是大脑把它翻正的。',
  } satisfies Bilingual,
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the light', zh: '跟着光走' } satisfies Bilingual,
  modeProtect: { en: 'Protect the eye', zh: '眼睛的防护' } satisfies Bilingual,
  protectPrompt: {
    en: 'The eye is exposed to the air directly, so it needs a layer of protection. The list on the right is the four-part defence: bone, membrane, fluid, lid.',
    zh: '眼球直接暴露在空气中，所以需要一套防护。右侧列表是四道防线：骨头、薄膜、液体、眼睑。',
  } satisfies Bilingual,
  protectEmpty: {
    en: 'Pick a part from the list to read what it does.',
    zh: '从列表中选一个部分查看它的作用。',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// NeuroneStructure + ThreeNeurones — G8 Figures B9.01 and B9.05.
// One diagram each, drawn inline in SVG; the lesson author only carries
// the bilingual labels and a few key facts about each part. The renderer
// owns the figure geometry.
// ---------------------------------------------------------------------------

export const NEURONE_STRUCTURE = {
  figcaption: {
    en: 'G8 Science · p.47, Figure B9.01 · click a part to read about it',
    zh: 'G8 Science · 第 47 页，图 B9.01 · 点击任一部分查看',
  } satisfies Bilingual,
  empty: {
    en: 'Click any part of the motor neurone to read what it does.',
    zh: '点击运动神经元任一部分，查看它的作用。',
  } satisfies Bilingual,
} as const

export const THREE_NEURONES = {
  figcaption: {
    en: 'G8 Science · p.50, Figure B9.05 · pick a neurone to read about its shape',
    zh: 'G8 Science · 第 50 页，图 B9.05 · 选一种神经元查看它的形态',
  } satisfies Bilingual,
  empty: {
    en: 'Pick a neurone type to see its structure.',
    zh: '选一种神经元查看它的形态。',
  } satisfies Bilingual,
} as const

export const GLUCOSE_LOOP = {
  modeHigh: { en: 'After a meal (high)', zh: '饭后（血糖高）' } satisfies Bilingual,
  modeNormal: { en: 'Normal', zh: '正常' } satisfies Bilingual,
  modeLow: { en: 'After exercise (low)', zh: '运动后（血糖低）' } satisfies Bilingual,
  intro: {
    en: 'Three snapshots of the same loop. The pancreas watches the blood glucose concentration; the liver is the store. The arrows that fire depend on which way the level has moved.',
    zh: '同一个环的三种状态。胰腺监测血糖浓度，肝脏是糖的仓库。哪条箭头动作，取决于血糖是高了还是低了。',
  } satisfies Bilingual,
  insulinLabel: { en: 'insulin', zh: '胰岛素' } satisfies Bilingual,
  glucagonLabel: { en: 'glucagon', zh: '胰高血糖素' } satisfies Bilingual,
  insulinEffect: {
    en: 'Insulin is secreted by the islets of Langerhans. It tells the liver to take glucose out of the blood and store it as glycogen. Blood glucose falls.',
    zh: '胰岛素由胰岛分泌。它告诉肝脏把血糖取走并以糖原形式贮存起来。血糖下降。',
  } satisfies Bilingual,
  glucagonEffect: {
    en: 'Glucagon is also secreted by the islets of Langerhans. It tells the liver to break glycogen back down into glucose and release it into the blood. Blood glucose rises.',
    zh: '胰高血糖素也由胰岛分泌。它告诉肝脏把糖原分解为葡萄糖并释放到血液中。血糖上升。',
  } satisfies Bilingual,
  setPoint: {
    en: 'Set point ≈ 5 mmol/dm³. The pancreas secretes insulin or glucagon to bring the level back to this value, whichever side of it the blood has moved to.',
    zh: '设定点约 5 mmol/dm³。无论血糖偏向哪一侧，胰腺都会通过分泌胰岛素或胰高血糖素把它拉回此值。',
  } satisfies Bilingual,
} as const

export const TEMPERATURE_CONTROL = {
  modeHot: { en: 'Body too hot', zh: '太热时' } satisfies Bilingual,
  modeNormal: { en: 'Normal (≈ 37 °C)', zh: '正常（≈ 37 °C）' } satisfies Bilingual,
  modeCold: { en: 'Body too cold', zh: '太冷时' } satisfies Bilingual,
  intro: {
    en: 'The hypothalamus watches the temperature of the blood running through it. When the temperature moves off the set point, it sends impulses to the skin — and the skin does four things, each one a knob the body can turn up or down.',
    zh: '下丘脑监测流经它的血液温度。当温度偏离设定点时，它向皮肤发出脉冲——皮肤有四件事可做，每一件都是一个可调旋钮。',
  } satisfies Bilingual,
  hypothalamus: { en: 'Hypothalamus (control centre)', zh: '下丘脑（控制中心）' } satisfies Bilingual,
  arteriole: { en: 'Arterioles in the skin', zh: '皮肤内小动脉' } satisfies Bilingual,
  sweat: { en: 'Sweat glands', zh: '汗腺' } satisfies Bilingual,
  hair: { en: 'Hair + erector muscles', zh: '毛发与立毛肌' } satisfies Bilingual,
  shiver: { en: 'Skeletal muscle (shivering)', zh: '骨骼肌（寒战）' } satisfies Bilingual,
} as const

export const REPRODUCTIVE_ANATOMY = {
  tabFemale: { en: 'Female', zh: '女性' } satisfies Bilingual,
  tabMale: { en: 'Male', zh: '男性' } satisfies Bilingual,
  emptyFemale: {
    en: 'Click any labelled part of the female reproductive system. The egg is made in the ovary; fertilisation happens in the oviduct; the fetus develops in the uterus.',
    zh: '点击女性生殖系统的任一标注部分。卵子在卵巢中产生，受精发生在输卵管，胎儿在子宫中发育。',
  } satisfies Bilingual,
  emptyMale: {
    en: 'Click any labelled part of the male reproductive system. Sperm are made in the testes, mature in the epididymis, and travel out through the sperm duct and urethra.',
    zh: '点击男性生殖系统的任一标注部分。精子在睾丸中产生，在附睾中成熟，经输精管和尿道排出。',
  } satisfies Bilingual,
} as const

export const SPERM_VS_EGG = {
  heading: { en: 'How the two gametes differ', zh: '两种配子的不同之处' } satisfies Bilingual,
  spermHeading: { en: 'Sperm', zh: '精子' } satisfies Bilingual,
  eggHeading: { en: 'Egg', zh: '卵细胞' } satisfies Bilingual,
  featureLabel: { en: 'Feature', zh: '特征' } satisfies Bilingual,
  spermSizeLabel: { en: 'Size', zh: '大小' } satisfies Bilingual,
  spermMotilityLabel: { en: 'Motility', zh: '运动能力' } satisfies Bilingual,
  spermCytoplasmLabel: { en: 'Cytoplasm', zh: '细胞质' } satisfies Bilingual,
  spermFoodLabel: { en: 'Food store', zh: '营养储备' } satisfies Bilingual,
  spermAcrosomeLabel: { en: 'Acrosome', zh: '顶体' } satisfies Bilingual,
  spermCountLabel: { en: 'Numbers made', zh: '产出数量' } satisfies Bilingual,
} as const

export const FERTILISATION_JOURNEY = {
  intro: {
    en: 'Three snapshots, in the order they happen. Each figure is the textbook one; the highlight moves from step to step.',
    zh: '三个时刻按发生顺序排列。每张图都是教材原图，高亮随步骤切换。',
  } satisfies Bilingual,
  stepLabel: { en: 'Step', zh: '第' } satisfies Bilingual,
  ofLabel: { en: 'of', zh: '共' } satisfies Bilingual,
} as const

export const PLACENTA_EXCHANGE = {
  intro: {
    en: 'Click any part of the placenta. The two blood supplies never mix; they only come close enough to exchange materials by diffusion.',
    zh: '点击胎盘的任一部分。两套血液系统从不混合——只靠扩散隔着薄膜交换物质。',
  } satisfies Bilingual,
  toFetusHeading: { en: 'What passes to the fetus', zh: '哪些物质从母体到胎儿' } satisfies Bilingual,
  toMotherHeading: { en: 'What passes to the mother', zh: '哪些物质从胎儿到母体' } satisfies Bilingual,
  exchangeNote: {
    en: 'The two bloods do not mix — that would risk agglutination and the higher maternal pressure would damage fetal vessels. Substances cross the placenta by diffusion through a thin membrane, in the direction of their concentration gradient.',
    zh: '两套血液并不混合——一旦混合会有凝集风险，且母体血压更高会损伤胎儿血管。物质靠扩散穿过薄膜，按浓度梯度方向移动。',
  } satisfies Bilingual,
} as const

// Shared by the 3D anatomy viewer (`Anatomy3D`). One block because the
// component is the only consumer; if more 3D scenes appear, split it.
export const ANATOMY_3D = {
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a pin to read',
    zh: '拖动旋转·滚轮缩放·点击标记查看',
  } satisfies Bilingual,
  pageHint: {
    en: 'Click pins in the model · ← → keys to step · Esc to clear',
    zh: '点击模型上的标记·← → 键切换·Esc 清除',
  } satisfies Bilingual,
  partsHeading: {
    en: 'All parts',
    zh: '全部结构',
  } satisfies Bilingual,
  listHint: {
    en: 'Or pick one from the list to highlight it without rotating.',
    zh: '也可以从这里选一个标记，无需旋转模型。',
  } satisfies Bilingual,
  startRotate: { en: 'Auto-rotate', zh: '自动旋转' } satisfies Bilingual,
  pauseRotate: { en: 'Pause', zh: '暂停' } satisfies Bilingual,
  calloutHint: {
    en: 'Click another pin, or press Esc to close',
    zh: '点其他标记继续，或按 Esc 关闭',
  } satisfies Bilingual,
  showAllParts: { en: 'All parts', zh: '全部结构' } satisfies Bilingual,
  hideAllParts: { en: 'Hide list', zh: '收起列表' } satisfies Bilingual,
  editingOn: { en: 'Editing', zh: '编辑中' } satisfies Bilingual,
  editingOff: { en: 'Edit positions', zh: '编辑坐标' } satisfies Bilingual,
  editHint: {
    en: 'Pick a pin tab above or click a pin in the model, then drag a slider. Click Copy JSON to grab the { id: [x, y, z] } map for the lesson file.',
    zh: '在顶部选一个 pin 或点 3D 中的标记，再拖动滑块。点 Copy JSON 复制 { id: [x, y, z] } 格式用于 lesson 文件。',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Chapter 6 (17 Inheritance) extras
// ---------------------------------------------------------------------------

export const DNA_TO_PROTEIN = {
  transcriptionLabel: { en: 'Transcription', zh: '转录' } satisfies Bilingual,
  translationLabel: { en: 'Translation', zh: '翻译' } satisfies Bilingual,
} as const

export const MITOSIS_VS_MEIOSIS = {
  mitosisShort: { en: 'Mitosis', zh: '有丝分裂' } satisfies Bilingual,
  meiosisShort: { en: 'Meiosis', zh: '减数分裂' } satisfies Bilingual,
} as const

export const PUNNETT_GRID = {
  crossLabel: { en: 'Cross type', zh: '杂交类型' } satisfies Bilingual,
  fatherLabel: { en: 'Father', zh: '父亲' } satisfies Bilingual,
  motherLabel: { en: 'Mother', zh: '母亲' } satisfies Bilingual,
  monohybrid: { en: 'Monohybrid (dominant / recessive)', zh: '单基因（显/隐）' } satisfies Bilingual,
  codominant: { en: 'Codominant (both alleles show)', zh: '共显性（两等位基因都表达）' } satisfies Bilingual,
  sexLinked: { en: 'Sex-linked (X chromosome)', zh: '伴性（X 染色体）' } satisfies Bilingual,
  gridHeading: { en: 'Punnett square', zh: '棋盘格' } satisfies Bilingual,
  summaryHeading: { en: 'Offspring ratios', zh: '子代比例' } satisfies Bilingual,
  // Parent genotype option labels — the actual Punnett calculations
  // also need the genotype string itself, so we keep both.
  autosomalParents: {
    AA: { en: 'AA (homozygous dominant)', zh: 'AA（纯合显性）' } satisfies Bilingual,
    Aa: { en: 'Aa (heterozygous)', zh: 'Aa（杂合）' } satisfies Bilingual,
    aa: { en: 'aa (homozygous recessive)', zh: 'aa（纯合隐性）' } satisfies Bilingual,
  },
  sexLinkedParents: {
    XY: { en: 'XY — male (no allele on Y)', zh: 'XY——男性（Y 上无等位基因）' } satisfies Bilingual,
    XX: { en: 'XX — female, two Xs', zh: 'XX——女性，两条 X' } satisfies Bilingual,
    Xy: { en: 'Xy — affected male (X carries the allele)', zh: 'Xy——患病男性（X 携带该等位基因）' } satisfies Bilingual,
    Xx: { en: 'Xx — carrier female', zh: 'Xx——携带者女性' } satisfies Bilingual,
    xx: { en: 'xx — affected female (rare)', zh: 'xx——患病女性（罕见）' } satisfies Bilingual,
  },
  subtitleMonohybrid: {
    en: 'Monohybrid cross — capital letter is dominant',
    zh: '单基因杂交——大写字母为显性',
  } satisfies Bilingual,
  subtitleCodominant: {
    en: 'Codominance — both alleles visible in the heterozygote',
    zh: '共显性——两个等位基因都在杂合体中表现出来',
  } satisfies Bilingual,
  subtitleSexLinked: {
    en: 'X-linked recessive — the Y has no allele to mask it',
    zh: 'X 伴性隐性——Y 上无等位基因来掩盖',
  } satisfies Bilingual,
} as const

export const PEDIGREE_TRACE = {
  autosomalLabel: { en: 'Autosomal recessive', zh: '常染色体隐性' } satisfies Bilingual,
  sexLinkedLabel: { en: 'Sex-linked recessive (X)', zh: 'X 伴性隐性' } satisfies Bilingual,
  deductionHeading: { en: 'Deduction', zh: '推断' } satisfies Bilingual,
  statusAffected: { en: 'Affected (homozygous, aa)', zh: '患病（纯合 aa）' } satisfies Bilingual,
  statusCarrier: { en: 'Carrier (heterozygous, Aa)', zh: '携带者（杂合 Aa）' } satisfies Bilingual,
  statusUnaffected: { en: 'Unaffected (AA or Aa)', zh: '未患病（AA 或 Aa）' } satisfies Bilingual,
  statusUnknown: { en: 'Unknown genotype', zh: '基因型未知' } satisfies Bilingual,
  /** Deduction shown for an affected male in sex-linked mode. */
  sexLinkedAffectedMale: {
    en: 'A male has only one X. If that X carries the allele, the condition shows — there is no second X to mask it.',
    zh: '男性只有一条 X。那条 X 若携带该等位基因，症状就表现出来——没有第二条 X 来掩盖。',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Chapter 7 (19 Organisms and their environment) extras
// ---------------------------------------------------------------------------

export const FOOD_WEB = {
  empty: {
    en: 'Click any organism in the web to see its trophic level, what it eats, and what eats it.',
    zh: '点击食物网中的任一生物，查看其营养级、它的食物和它的天敌。',
  } satisfies Bilingual,
  normal: { en: 'Web intact', zh: '完整食物网' } satisfies Bilingual,
  removeFox: { en: 'Remove the fox', zh: '去掉狐狸' } satisfies Bilingual,
  removeRabbit: { en: 'Remove the rabbit', zh: '去掉兔子' } satisfies Bilingual,
  trophicProducer: { en: 'Producer', zh: '生产者' } satisfies Bilingual,
  trophicPrimary: { en: 'Primary consumer', zh: '初级消费者' } satisfies Bilingual,
  trophicSecondary: { en: 'Secondary consumer', zh: '次级消费者' } satisfies Bilingual,
  trophicTertiary: { en: 'Tertiary consumer', zh: '三级消费者' } satisfies Bilingual,
  eatsHeading: { en: 'Eats', zh: '食物' } satisfies Bilingual,
  eatenByHeading: { en: 'Eaten by', zh: '天敌' } satisfies Bilingual,
  eatsNothing: { en: '— (producer)', zh: '——（生产者）' } satisfies Bilingual,
  eatenByNothing: { en: '— (top predator)', zh: '——（顶级捕食者）' } satisfies Bilingual,
  affectedNote: {
    en: 'Affected by the removal — its food source is gone, or its predator has been removed.',
    zh: '受移除影响——它失去了食物来源，或它的捕食者被去掉了。',
  } satisfies Bilingual,
} as const

export const PYRAMID_COMPARE = {
  numbers: { en: 'Pyramid of numbers', zh: '数量金字塔' } satisfies Bilingual,
  biomass: { en: 'Pyramid of biomass', zh: '生物量金字塔' } satisfies Bilingual,
  energy: { en: 'Pyramid of energy', zh: '能量金字塔' } satisfies Bilingual,
} as const

export const NUTRIENT_CYCLE = {
  empty: {
    en: 'Click any arrow to see which process it shows and an example of where it happens.',
    zh: '点击任一箭头查看它代表的过程及发生的具体例子。',
  } satisfies Bilingual,
  showReservoirs: { en: 'Show carbon stocks', zh: '显示碳储量' } satisfies Bilingual,
  hideReservoirs: { en: 'Hide carbon stocks', zh: '隐藏碳储量' } satisfies Bilingual,
  exampleHeading: { en: 'Example', zh: '实例' } satisfies Bilingual,
} as const

export const POPULATION_CURVE = {
  empty: {
    en: 'Click any dot on the curve to see what is happening in that phase.',
    zh: '点击曲线上的任一点查看该阶段的情况。',
  } satisfies Bilingual,
  factorsHeading: { en: 'Key factors', zh: '关键因素' } satisfies Bilingual,
  carryingCapacityLabel: { en: 'Carrying capacity (K)', zh: '环境容纳量 (K)' } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Organ anatomy viewer (3D, shared by 8 organs: lungs, liver, intestine,
// kidneys, brain, eyeball, pancreas, skin — heart has its own
// HeartAnatomy with deeper content).
// ---------------------------------------------------------------------------

export const ORGAN_ANATOMY = {
  loading: { en: 'Loading 3D model…', zh: '正在加载 3D 模型…' } satisfies Bilingual,
  systemLabel: { en: 'Body system', zh: '所属系统' } satisfies Bilingual,
} as const

export const DNA_HELIX_3D = {
  loading: { en: 'Drawing the helix…', zh: '正在绘制螺旋…' } satisfies Bilingual,
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a rung to read the base pair',
    zh: '拖动旋转 · 滚轮缩放 · 点击碱基对查看说明',
  } satisfies Bilingual,
  pairLabel: { en: 'Base pair', zh: '碱基对' } satisfies Bilingual,
  positionLabel: { en: 'Position', zh: '位置' } satisfies Bilingual,
  pairDefault: {
    en: 'Each letter pairs with only one partner: A with T, G with C. The two backbones hold the pairs in a regular helix.',
    zh: '每个字母只能与一个配对：A 配 T，G 配 C。两条主链把碱基对固定在规则的螺旋中。',
  } satisfies Bilingual,
  tapRungHint: {
    en: 'Click any rung to read the base pair.',
    zh: '点击任一碱基对查看说明。',
  } satisfies Bilingual,
} as const

export const FOOD_WEB_3D = {
  loading: { en: 'Drawing the web…', zh: '正在绘制食物网…' } satisfies Bilingual,
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a node to read about it',
    zh: '拖动旋转 · 滚轮缩放 · 点击节点查看说明',
  } satisfies Bilingual,
  tapNodeHint: {
    en: 'Click any node to read about that species.',
    zh: '点击任一节点查看该物种的说明。',
  } satisfies Bilingual,
  eatsLabel: { en: 'Eats', zh: '捕食' } satisfies Bilingual,
  eatenByLabel: { en: 'Eaten by', zh: '被…捕食' } satisfies Bilingual,
  trophic: {
    producer: { en: 'Producer', zh: '生产者' } satisfies Bilingual,
    primary: { en: 'Primary consumer', zh: '初级消费者' } satisfies Bilingual,
    secondary: { en: 'Secondary consumer', zh: '次级消费者' } satisfies Bilingual,
    tertiary: { en: 'Tertiary consumer', zh: '顶级消费者' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// Concept explainer — a vertical stack of "hook → mechanism → why-it-matters"
// blocks. Used for the lesson extensions that came out of the G8 classroom
// transcripts: telomere / Hayflick / HeLa (17-1), the hygiene hypothesis
// (14-1), and the fog / haze / PM2.5 distinction (11-1).
// ---------------------------------------------------------------------------

export const CONCEPT_EXPLAINER = {
  sectionHook: { en: 'The hook', zh: '开场故事' } satisfies Bilingual,
  sectionMechanism: { en: 'The science', zh: '科学原理' } satisfies Bilingual,
  sectionWhy: { en: 'Why it matters', zh: '为什么重要' } satisfies Bilingual,
  sectionStory: { en: 'Classroom story', zh: '课堂故事' } satisfies Bilingual,
  /**
   * Alt text for an optional hero figure (see `ConceptExplainerExtra.heroImage`).
   * Kept here so the i18n is in one place — figure alt text is short and
   * describes what the student is looking at, not what they should learn.
   */
  heroAlt: {
    en: 'A textbook figure that anchors the explainer',
    zh: '作为本解释器主图示的教科书插图',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Food tests virtual laboratory (Paper 5/6 practical skills)
// ---------------------------------------------------------------------------

export const FOOD_TESTS_LAB = {
  tabBench: { en: 'Virtual Testbench', zh: '虚拟实验台' } satisfies Bilingual,
  tabGuide: { en: 'Paper 6 Practical Exam Guide', zh: 'Paper 6 实验考点速记' } satisfies Bilingual,
  tabSummary: { en: 'Results Matrix', zh: '结果速查表' } satisfies Bilingual,
  selectSample: { en: 'Step 1: Choose Food Sample', zh: '第一步：选择待测食物样本' } satisfies Bilingual,
  selectTest: { en: 'Step 2: Choose Biochemical Test', zh: '第二步：选择生化检验项目' } satisfies Bilingual,
  addReagent: { en: 'Add Reagent', zh: '加入检测试剂' } satisfies Bilingual,
  heatWaterBath: { en: 'Heat in Water Bath (80°C)', zh: '水浴加热（80°C）' } satisfies Bilingual,
  shakeTube: { en: 'Shake with Water', zh: '倒入冷水剧烈震荡' } satisfies Bilingual,
  reset: { en: 'Reset Tube', zh: '重置试管' } satisfies Bilingual,
  currentStatus: { en: 'Current Status', zh: '当前状态' } satisfies Bilingual,
  reagentAdded: { en: 'Reagent Added', zh: '已加试剂' } satisfies Bilingual,
  heated: { en: 'Heated in Water Bath', zh: '已水浴加热' } satisfies Bilingual,
  observation: { en: 'Observation', zh: '实验现象' } satisfies Bilingual,
  conclusion: { en: 'Conclusion', zh: '实验结论' } satisfies Bilingual,
  positive: { en: 'Positive', zh: '呈阳性 (+)' } satisfies Bilingual,
  negative: { en: 'Negative', zh: '呈阴性 (-)' } satisfies Bilingual,
  needsReagent: { en: 'Sample placed in tube. Click "Add Reagent" to proceed.', zh: '样本已置入试管。请点击"加入检测试剂"。' } satisfies Bilingual,
  needsHeat: { en: 'Benedict\'s reagent added. Heat in hot water bath (80°C) to develop color!', zh: '已加入本尼迪克特试剂。必须在 80°C 热水浴中加热方可显色！' } satisfies Bilingual,
  needsShake: { en: 'Ethanol added. Pour into water and shake to observe emulsion!', zh: '已加入乙醇。倒入冷水中并充分震荡以观察乳状液！' } satisfies Bilingual,
  safetyTitle: { en: 'Safety Precautions (Paper 6 Essential)', zh: '安全注意事项（实验考卷必背）' } satisfies Bilingual,
  controlTitle: { en: 'Control Variables', zh: '控制变量' } satisfies Bilingual,
  trapTitle: { en: 'High-Frequency Exam Traps', zh: '高频失分陷阱' } satisfies Bilingual,
  blankControl: { en: 'Negative Control (Distilled Water)', zh: '阴性空白对照（蒸馏水）' } satisfies Bilingual,
  semiQuantLabel: { en: 'Semi-quantitative Color Scale (Benedict\'s)', zh: '半定量颜色梯度（本尼迪克特检验）' } satisfies Bilingual,
  lowSugar: { en: 'Traces / Low sugar (Green/Yellow)', zh: '微量 / 低浓度（绿/黄色）' } satisfies Bilingual,
  mediumSugar: { en: 'Moderate sugar (Orange)', zh: '中等浓度（橙色）' } satisfies Bilingual,
  highSugar: { en: 'High sugar (Brick red)', zh: '高浓度（砖红色）' } satisfies Bilingual,
  reagentLabel: { en: 'Reagent', zh: '试剂' } satisfies Bilingual,
  testLabel: { en: 'Test', zh: '检验项目' } satisfies Bilingual,
  positiveResult: { en: 'Positive Result', zh: '阳性结果' } satisfies Bilingual,
  negativeResult: { en: 'Negative Result', zh: '阴性结果' } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Driver.js animated guided tours
// ---------------------------------------------------------------------------

export const BIOLOGY_TOUR = {
  btnStartTour: { en: 'Animation Tour', zh: '步骤动画导览' } satisfies Bilingual,
  btnAutoPlay: { en: 'Auto-Play Tour', zh: '自动播放动画' } satisfies Bilingual,
  btnPause: { en: 'Pause', zh: '暂停' } satisfies Bilingual,
  tourPrompt: {
    en: 'Step-by-step interactive focal animation powered by Driver.js',
    zh: '由 Driver.js 驱动的生理机制步骤聚焦动画',
  } satisfies Bilingual,
  doubleCirculationBtn: {
    en: 'Blood Circulation Tour',
    zh: '血液循环路径动画导览',
  } satisfies Bilingual,
  reflexArcBtn: {
    en: 'Impulse Transmission Tour',
    zh: '神经冲动传导动画导览',
  } satisfies Bilingual,
  digestiveBtn: {
    en: 'Digestive Journey Tour',
    zh: '消化吸收全程动画导览',
  } satisfies Bilingual,
  airwayBtn: {
    en: 'Airflow & Gas Exchange Tour',
    zh: '气道与气体交换动画导览',
  } satisfies Bilingual,
} as const

export const OSMOSIS_LAB = {
  tabBench: { en: 'Experimental Bench', zh: '实验台操作' } satisfies Bilingual,
  tabGraph: { en: 'Results & Isotonic Plot', zh: '数据表与等渗拟合图' } satisfies Bilingual,
  tabControls: { en: 'Controlled Variables', zh: '控制变量清单 (Paper 6)' } satisfies Bilingual,
  stepSelectTube: { en: '1. Select boiling tube', zh: '1. 选择试管' } satisfies Bilingual,
  stepImmerse: { en: '2. Immerse cylinder (45 min)', zh: '2. 浸泡马铃薯条 (45分钟)' } satisfies Bilingual,
  stepBlotDry: { en: '3. Blot dry with paper towel', zh: '3. 滤纸吸干表面' } satisfies Bilingual,
  stepWeigh: { en: '4. Weigh on digital balance', zh: '4. 电子天平称量' } satisfies Bilingual,
  blotPrompt: { en: 'Tap to blot surface liquid', zh: '点击用吸水纸吸干表面液体' } satisfies Bilingual,
  blottedSuccess: { en: 'Blotted dry! Ready to weigh.', zh: '已吸干！可以上秤称量。' } satisfies Bilingual,
  weighPrompt: { en: 'Place on balance', zh: '放上天平称重' } satisfies Bilingual,
  initialMass: { en: 'Initial mass (m₁)', zh: '初始质量 (m₁)' } satisfies Bilingual,
  finalMass: { en: 'Final mass (m₂)', zh: '最终质量 (m₂)' } satisfies Bilingual,
  percentChange: { en: 'Percentage change (%Δm)', zh: '质量百分比变化 (%Δm)' } satisfies Bilingual,
  sucroseConc: { en: 'Sucrose concentration', zh: '外界蔗糖浓度' } satisfies Bilingual,
  cellState: { en: 'Tissue state', zh: '组织质地状态' } satisfies Bilingual,
  isotonicFound: { en: 'Isotonic point found at 0.35 mol/dm³ (0% change)', zh: '测得等渗点为 0.35 mol/dm³ (零质量变化)' } satisfies Bilingual,
  turgidLabel: { en: 'Turgid & firm', zh: '细胞吸水膨胀，质地挺硬' } satisfies Bilingual,
  flaccidLabel: { en: 'Flaccid & soft', zh: '失水萎蔫松软' } satisfies Bilingual,
  plasmolysedLabel: { en: 'Plasmolysed & floppy', zh: '质壁分离，极度柔软弯曲' } satisfies Bilingual,
  equilibriumLabel: { en: 'Isotonic equilibrium', zh: '等渗动态平衡' } satisfies Bilingual,
  formulaHint: { en: '% change = [(m_final - m_initial) ÷ m_initial] × 100', zh: '% 变化 = [(最终质量 - 初始质量) ÷ 初始质量] × 100' } satisfies Bilingual,
} as const

export const MENSTRUAL_TIMELINE = {
  dayLabel: { en: 'Day', zh: '第' } satisfies Bilingual,
  daySuffix: { en: '', zh: '天' } satisfies Bilingual,
  dayOfCycle: { en: 'of 28 days', zh: '天 / 共28天' } satisfies Bilingual,
  btnPlay: { en: '▶ Play cycle', zh: '▶ 播放周期' } satisfies Bilingual,
  btnPause: { en: '⏸ Pause', zh: '⏸ 暂停' } satisfies Bilingual,
  btnReset: { en: '↺ Day 1', zh: '↺ 第1天' } satisfies Bilingual,
  pregnantToggle: { en: 'Simulate Pregnancy (Fertilisation)', zh: '模拟受精受孕状态' } satisfies Bilingual,
  normalToggle: { en: 'Normal Menstrual Cycle', zh: '正常未受孕月经周期' } satisfies Bilingual,
  hormonesHeading: { en: 'Blood Hormone Concentrations', zh: '血液中四种激素浓度曲线' } satisfies Bilingual,
  ovaryHeading: { en: 'Ovary & Follicle Development', zh: '卵巢卵泡发育阶段' } satisfies Bilingual,
  uterusHeading: { en: 'Endometrium (Uterine Lining)', zh: '子宫内膜厚度剖面' } satisfies Bilingual,
  liningThickness: { en: 'Lining thickness', zh: '内膜厚度' } satisfies Bilingual,
  ovaryPhaseLabel: { en: 'Ovarian state', zh: '卵巢状态' } satisfies Bilingual,
  uterusPhaseLabel: { en: 'Uterine state', zh: '子宫状态' } satisfies Bilingual,
  keyEvents: { en: 'Biological Mechanism & Events', zh: '当前生理机制与事件' } satisfies Bilingual,
  fshDesc: { en: 'FSH (Pituitary): Stimulates follicle maturation', zh: 'FSH (垂体): 刺激卵泡成熟' } satisfies Bilingual,
  oestrogenDesc: { en: 'Oestrogen (Ovary): Repairs lining, stimulates LH', zh: '雌激素 (卵巢): 修复子宫内膜，诱发 LH' } satisfies Bilingual,
  lhDesc: { en: 'LH (Pituitary): Sharp surge triggers ovulation', zh: 'LH (垂体): 陡升尖峰诱发第14天排卵' } satisfies Bilingual,
  progesteroneDesc: { en: 'Progesterone (Corpus luteum): Maintains lining, inhibits FSH/LH', zh: '孕激素 (黄体): 维持内膜厚度，抑制 FSH/LH' } satisfies Bilingual,
  positiveFeedback: { en: 'Positive feedback: High oestrogen triggers LH surge (Day 12-13)', zh: '正反馈：高雌激素触发 LH 陡增（第12-13天）' } satisfies Bilingual,
  negativeFeedback: { en: 'Negative feedback: Progesterone inhibits FSH and LH release', zh: '负反馈：孕激素抑制 FSH 与 LH 分泌，防止新卵泡发育' } satisfies Bilingual,
  examTipTitle: { en: 'IGCSE Paper 4 Model Answer', zh: 'IGCSE Paper 4 考题标准因果链' } satisfies Bilingual,
} as const

export const POTOMETER_LAB = {
  tabBench: { en: 'Virtual Potometer Bench', zh: '虚拟测定仪实验台' } satisfies Bilingual,
  tabComparison: { en: '4 Variables Data Dock', zh: '四重变量对比与作图' } satisfies Bilingual,
  tabExamTips: { en: 'Paper 6 Setup Essentials', zh: 'Paper 6 装置陷阱与控制变量' } satisfies Bilingual,
  btnStart: { en: '▶ Start Stopwatch (60s)', zh: '▶ 启动秒表 (60秒)' } satisfies Bilingual,
  btnPause: { en: '⏸ Pause Timer', zh: '⏸ 暂停计时' } satisfies Bilingual,
  btnResetBubble: { en: '💧 Tap Reservoir (Reset Bubble to 0mm)', zh: '💧 开启储水阀（重置气泡至0mm）' } satisfies Bilingual,
  shootLabel: { en: 'Leafy Shoot in Bung', zh: '紧密插入胶塞的带叶枝条' } satisfies Bilingual,
  sealLabel: { en: 'Petroleum jelly (Vaseline) airtight seal', zh: '凡士林气密密封' } satisfies Bilingual,
  reservoirLabel: { en: 'Water reservoir with screw clip / tap', zh: '带螺旋夹的水槽/储水管' } satisfies Bilingual,
  capillaryLabel: { en: 'Capillary tube with millimeter ruler', zh: '带毫米刻度的毛细管' } satisfies Bilingual,
  airBubble: { en: 'Air bubble (meniscus)', zh: '空气泡（弯月面）' } satisfies Bilingual,
  beakerLabel: { en: 'Beaker of water', zh: '装水烧杯' } satisfies Bilingual,
  elapsedTime: { en: 'Elapsed Time', zh: '实验计时' } satisfies Bilingual,
  distanceMoved: { en: 'Bubble Distance (d)', zh: '气泡位移距离 (d)' } satisfies Bilingual,
  transpirationRate: { en: 'Transpiration Rate', zh: '测得蒸腾失水速率' } satisfies Bilingual,
  envCondition: { en: 'Environmental Variable', zh: '外界环境控制条件' } satisfies Bilingual,
  gradientStatus: { en: 'Diffusion Gradient', zh: '水蒸气扩散浓度梯度' } satisfies Bilingual,
  stomataStatus: { en: 'Stomata Aperture', zh: '气孔开度状态' } satisfies Bilingual,
  recordedTrials: { en: 'Recorded Trials', zh: '已测定数据记录' } satisfies Bilingual,
  btnRecord: { en: '📌 Record Reading', zh: '📌 记录当前读数' } satisfies Bilingual,
  clearRecords: { en: 'Clear Data', zh: '清空记录' } satisfies Bilingual,
} as const

export const CARDIAC_CYCLE = {
  tabAnimation: { en: 'Heart & Valves Animation', zh: '心脏剖面与瓣膜动画' } satisfies Bilingual,
  tabPressure: { en: 'Pressure Curves (Wiggers)', zh: '心腔压力变化曲线' } satisfies Bilingual,
  tabValvesTable: { en: 'Valve State Matrix', zh: '瓣膜启闭状态速查表' } satisfies Bilingual,
  btnPlay: { en: '▶ Play Heartbeat', zh: '▶ 播放心跳循环' } satisfies Bilingual,
  btnPause: { en: '⏸ Pause', zh: '⏸ 暂停' } satisfies Bilingual,
  btnReset: { en: '↺ Reset (0.0s)', zh: '↺ 重置 (0.0s)' } satisfies Bilingual,
  phaseLabel: { en: 'Current Phase', zh: '当前心动时期' } satisfies Bilingual,
  timeLabel: { en: 'Time in cycle', zh: '周期时刻' } satisfies Bilingual,
  avValvesLabel: { en: 'Atrioventricular (AV) Valves', zh: '房室瓣 (二尖瓣/三尖瓣)' } satisfies Bilingual,
  slValvesLabel: { en: 'Semilunar (SL) Valves', zh: '半月瓣 (主动脉瓣/肺动脉瓣)' } satisfies Bilingual,
  valveOpen: { en: 'OPEN', zh: '张开' } satisfies Bilingual,
  valveClosed: { en: 'CLOSED', zh: '关闭' } satisfies Bilingual,
  heartSoundLabel: { en: 'Auscultation (Heart Sound)', zh: '听诊心音' } satisfies Bilingual,
  lubSound: { en: 'LUB (1st Sound)', zh: '咚 (第一心音)' } satisfies Bilingual,
  dubSound: { en: 'DUB (2nd Sound)', zh: '哒 (第二心音)' } satisfies Bilingual,
  bloodFlowLabel: { en: 'Blood Flow Direction', zh: '血液流动方向' } satisfies Bilingual,
  pressureChangesLabel: { en: 'Chamber Pressure Dynamics', zh: '心腔与大动脉压力机制' } satisfies Bilingual,
  lvPressure: { en: 'Left Ventricle Pressure', zh: '左心室压力' } satisfies Bilingual,
  aortaPressure: { en: 'Aortic Pressure', zh: '主动脉压力' } satisfies Bilingual,
  laPressure: { en: 'Left Atrium Pressure', zh: '左心房压力' } satisfies Bilingual,
  wallThicknessNote: { en: 'Thick muscular left ventricle wall pumps blood to whole body', zh: '左心室心肌壁厚，负责将血液泵向体循环全身' } satisfies Bilingual,
} as const

export const NEPHRON_LAB = {
  tabNephron: { en: 'Nephron Anatomy & Flow', zh: '肾单位结构与滤过流动' } satisfies Bilingual,
  tabFluids: { en: 'Composition Matrix (Blood vs Urine)', zh: '原尿与终尿成分对照表' } satisfies Bilingual,
  tabAdh: { en: 'ADH & Osmoregulation Simulator', zh: 'ADH 渗透压负反馈模拟' } satisfies Bilingual,
  tabExamTips: { en: 'Paper 4 Core Traps', zh: 'Paper 4 核心陷阱与考点' } satisfies Bilingual,
  selectRegionPrompt: { en: 'Click any nephron section below to inspect what crosses the membrane:', zh: '点击下方任一肾单位结构，查看物质如何穿膜移动：' } satisfies Bilingual,
  dehydratedMode: { en: 'Dehydrated (Exercise / Low Water)', zh: '严重脱水（出汗剧烈/缺水）' } satisfies Bilingual,
  normalMode: { en: 'Normal Hydration (Setpoint)', zh: '正常水平衡（稳态基准）' } satisfies Bilingual,
  hydratedMode: { en: 'Excess Water Intake', zh: '大量饮水（水过量）' } satisfies Bilingual,
  colSubstance: { en: 'Substance', zh: '成分物质' } satisfies Bilingual,
  colPlasma: { en: 'Blood Plasma (%)', zh: '血浆浓度 (%)' } satisfies Bilingual,
  colFiltrate: { en: 'Glomerular Filtrate (%)', zh: '原尿浓度 (%)' } satisfies Bilingual,
  colUrine: { en: 'Final Urine (%)', zh: '终尿浓度 (%)' } satisfies Bilingual,
  colExplanation: { en: 'Physiological Mechanism', zh: '生理机理与去向' } satisfies Bilingual,
  adhLevelLabel: { en: 'Pituitary ADH Secretion', zh: '垂体 ADH 分泌量' } satisfies Bilingual,
  permeabilityLabel: { en: 'Duct Water Permeability', zh: '集合管壁水通透性' } satisfies Bilingual,
  urineVolumeLabel: { en: 'Urine Output Volume', zh: '排尿总体积' } satisfies Bilingual,
  urineConcLabel: { en: 'Urine Concentration', zh: '尿液渗透浓度与色泽' } satisfies Bilingual,
} as const

export const BREEDING_GARDEN = {
  tabHarvest: { en: 'Pea Garden Harvest', zh: '豌豆田采摘与表型统计' } satisfies Bilingual,
  tabStats: { en: 'Chi-Square (χ²) Validator', zh: '卡方检验与理论比对' } satisfies Bilingual,
  tabCrossTypes: { en: 'Cross Diagrams (F₁ vs Test Cross)', zh: '遗传图解（自交 vs 测交）' } satisfies Bilingual,
  btnHarvest: { en: '🌱 Harvest New Crop', zh: '🌱 采摘新一茬豆荚' } satisfies Bilingual,
  sampleSizeLabel: { en: 'Sample Size (Seeds harvested)', zh: '采摘样本量（收获种子总数）' } satisfies Bilingual,
  crossModeLabel: { en: 'Cross Strategy', zh: '杂交方案' } satisfies Bilingual,
  monohybridCross: { en: 'F₁ × F₁ Heterozygous Cross (Rr × Rr → 3:1)', zh: 'F₁ 自交 (Rr × Rr → 预期 3:1)' } satisfies Bilingual,
  testCross: { en: 'Test Cross (Rr × rr → 1:1)', zh: '测交验证 (Rr × rr → 预期 1:1)' } satisfies Bilingual,
  observedCount: { en: 'Observed (O)', zh: '实际观察数 (O)' } satisfies Bilingual,
  expectedCount: { en: 'Expected (E)', zh: '理论期望数 (E)' } satisfies Bilingual,
  ratioLabel: { en: 'Observed Ratio', zh: '实测分离比' } satisfies Bilingual,
  chiSquareStat: { en: 'Chi-Square Statistic (χ²)', zh: '计算卡方值 (χ²)' } satisfies Bilingual,
  criticalValue: { en: 'Critical Value (p=0.05, df=1)', zh: '临界值 (p=0.05, 自由度=1)' } satisfies Bilingual,
  hypothesisAccept: { en: 'Confirmed! No significant difference from Mendelian ratio (p > 0.05)', zh: '检验通过！偏差纯属偶然，符合孟德尔理论遗传比 (p > 0.05)' } satisfies Bilingual,
  hypothesisReject: { en: 'Significant deviation due to small sample randomness (p ≤ 0.05)', zh: '存在显著偏差：小样本随机偶然性过大，请增加样本量 (p ≤ 0.05)' } satisfies Bilingual,
  formulaNote: { en: 'χ² = Σ [ (O - E)² ÷ E ]', zh: 'χ² = Σ [ (O - E)² ÷ E ]' } satisfies Bilingual,
} as const

export const SYNAPSE_TRANSMISSION = {
  tabInteractive: { en: 'Synaptic Relay Animation', zh: '突触传递动画与结构' } satisfies Bilingual,
  tabUnidirectional: { en: 'Why Impulses Travel One-Way', zh: '单向传导因果证明' } satisfies Bilingual,
  tabExamTips: { en: 'Paper 4 Model Sequence', zh: 'Paper 4 考题标准答题模板' } satisfies Bilingual,
  stepLabel: { en: 'Step', zh: '第' } satisfies Bilingual,
  stepSuffix: { en: 'of 6', zh: '步 / 共6步' } satisfies Bilingual,
  btnNext: { en: 'Next Step →', zh: '下一步 →' } satisfies Bilingual,
  btnPrev: { en: '← Previous', zh: '← 上一步' } satisfies Bilingual,
  btnAutoPlay: { en: '▶ Auto-Play 6 Steps', zh: '▶ 自动连贯播放6步' } satisfies Bilingual,
  btnPause: { en: '⏸ Pause', zh: '⏸ 暂停' } satisfies Bilingual,
  preSynapticTerminal: { en: 'Pre-synaptic Knob (Axon Terminal)', zh: '突触前小体（轴突末梢）' } satisfies Bilingual,
  synapticVesicles: { en: 'Synaptic Vesicles (Acetylcholine)', zh: '突触小泡（内含乙酰胆碱递质）' } satisfies Bilingual,
  synapticCleft: { en: 'Synaptic Cleft (~20 nm gap)', zh: '突触间隙（约20纳米微观缝隙）' } satisfies Bilingual,
  postSynapticMembrane: { en: 'Post-synaptic Membrane', zh: '突触后膜（树突/胞体膜）' } satisfies Bilingual,
  receptors: { en: 'Specific Complementary Receptors', zh: '特异性互补受体蛋白' } satisfies Bilingual,
  newImpulse: { en: 'New Action Potential (Nerve Impulse)', zh: '新生成的电神经冲动' } satisfies Bilingual,
} as const

export const TITRATION_LAB = {
  tabBench: { en: 'Virtual Titration Testbench', zh: '虚拟酸碱滴定实验台' } satisfies Bilingual,
  tabConcordance: { en: 'Results & Concordant Table', zh: '滴定结果与重合体积计算' } satisfies Bilingual,
  tabTechnique: { en: 'Paper 5/6 Technique & Traps', zh: 'Paper 5/6 装置操作与高频失分点' } satisfies Bilingual,
  btnDrop: { en: '💧 Add 0.05 cm³ (Dropwise)', zh: '💧 滴入 0.05 cm³（精细逐滴）' } satisfies Bilingual,
  btnDeliver1: { en: '+ Add 1.0 cm³', zh: '+ 加入 1.0 cm³' } satisfies Bilingual,
  btnDeliver5: { en: '+ Add 5.0 cm³ (Fast)', zh: '+ 加入 5.0 cm³（快速放流）' } satisfies Bilingual,
  btnResetBurette: { en: '↺ Refill Burette (Reset)', zh: '↺ 重新注满滴定管（重置）' } satisfies Bilingual,
  btnRecordTitre: { en: '📌 Record Titre to Table', zh: '📌 记录本次滴定读数' } satisfies Bilingual,
  indicatorChoice: { en: 'Indicator Choice', zh: '指示剂选择' } satisfies Bilingual,
  buretteReading: { en: 'Burette Reading', zh: '滴定管实时读数' } satisfies Bilingual,
  volumeAdded: { en: 'Volume Added (Titre)', zh: '已滴入酸液体积 (Titre)' } satisfies Bilingual,
  flaskContents: { en: 'Conical Flask (25.0 cm³ NaOH)', zh: '锥形瓶内待测液 (25.0 cm³ NaOH)' } satisfies Bilingual,
  whiteTileLabel: { en: 'White tile under flask (enhances color detection)', zh: '底垫白瓷板（清晰衬托指示剂变色）' } satisfies Bilingual,
  meniscusReadingHint: { en: 'Read bottom of meniscus at eye level (avoid parallax)', zh: '视线平视凹液面最低处（避免视差）' } satisfies Bilingual,
  endPointReached: { en: '⚡ END POINT REACHED! Sharp color transition!', zh: '⚡ 达到滴定终点！指示剂发生敏锐变色！' } satisfies Bilingual,
  concordantNotice: { en: 'Concordant titres are within 0.10 cm³ of each other', zh: '重合读数 (Concordant titres) 彼此相差不超过 0.10 cm³' } satisfies Bilingual,
  calcFormula: { en: 'Concentration Calculation: c₁V₁ = c₂V₂', zh: '浓度定量计算：c₁V₁ = c₂V₂' } satisfies Bilingual,
} as const

export const ELECTROLYSIS_LAB = {
  tabBench: { en: 'Electrolysis Cell Bench', zh: '电解池实操实验台' } satisfies Bilingual,
  tabEquations: { en: 'Half-Equations & Observations', zh: '电极半反应与实验现象' } satisfies Bilingual,
  tabRules: { en: 'Discharge Rules & Selective Discharge', zh: '考纲离子选择性放电规律' } satisfies Bilingual,
  selectScenario: { en: 'Electrolyte System', zh: '选择电解体系' } satisfies Bilingual,
  powerSupply: { en: 'DC Power Pack', zh: '直流电源控制' } satisfies Bilingual,
  powerOn: { en: '⚡ Power ON (Current flowing)', zh: '⚡ 接通电源（电流流动）' } satisfies Bilingual,
  powerOff: { en: '⏹ Power OFF (Circuit open)', zh: '⏹ 断开电源（回路断开）' } satisfies Bilingual,
  voltageLabel: { en: 'Operating Voltage (6V DC)', zh: '工作电压 (6V 直流)' } satisfies Bilingual,
  currentLabel: { en: 'Ammeter Current', zh: '电流表读数' } satisfies Bilingual,
  elapsedTime: { en: 'Electrolysis Time', zh: '通电电解时间' } satisfies Bilingual,
  anodeLabel: { en: 'Anode (+) [Oxidation / AN OX]', zh: '阳极 (+) [失电子氧化 / AN OX]' } satisfies Bilingual,
  cathodeLabel: { en: 'Cathode (-) [Reduction / RED CAT]', zh: '阴极 (-) [得电子还原 / RED CAT]' } satisfies Bilingual,
  electronFlow: { en: 'Electron flow: Anode (+) → Wire → Cathode (-)', zh: '外电路电子流向：阳极 (+) → 导线 → 阴极 (-)' } satisfies Bilingual,
  ionsInElectrolyte: { en: 'Mobile Ions Present', zh: '体系内自由移动离子' } satisfies Bilingual,
  electrodesUsed: { en: 'Electrodes in use', zh: '所用电极材料' } satisfies Bilingual,
  productFormed: { en: 'Discharged Product', zh: '电极放电生成产物' } satisfies Bilingual,
  halfEquation: { en: 'Electrode Half-Equation', zh: '电极半反应方程' } satisfies Bilingual,
  observation: { en: 'Observable Phenonemon', zh: '肉眼可观察实验现象' } satisfies Bilingual,
  solutionChange: { en: 'Electrolyte Solution Change', zh: '电解液浓度与性状演变' } satisfies Bilingual,
  gasRatioLabel: { en: 'Gas Volume Ratio (Cathode : Anode)', zh: '产气体积比（阴极 : 阳极）' } satisfies Bilingual,
  panicMnemonic: { en: 'PANIC: Positive Anode, Negative Is Cathode', zh: '口诀 PANIC：正极是阳极，负极是阴极' } satisfies Bilingual,
  redCatMnemonic: { en: 'RED CAT: Reduction occurs at Cathode; AN OX: Oxidation at Anode', zh: '口诀 RED CAT / AN OX：阴极发生还原，阳极发生氧化' } satisfies Bilingual,
} as const

export const RATES_LAB = {
  tabBench: { en: 'Gas Syringe Reaction Bench', zh: '气体注射器反应实验台' } satisfies Bilingual,
  tabGraph: { en: 'V-t Reaction Curves & Tangents', zh: 'V-t 反应曲线与切线分析' } satisfies Bilingual,
  tabTheory: { en: 'Collision Theory & Core Rules', zh: '碰撞理论与图像核心考点' } satisfies Bilingual,
  selectCondition: { en: 'Experimental Condition Set', zh: '对比实验变量组' } satisfies Bilingual,
  btnStartReaction: { en: '▶ Drop CaCO₃ & Start Stopwatch', zh: '▶ 投入碳酸钙并启动秒表' } satisfies Bilingual,
  btnPause: { en: '⏸ Pause Reaction', zh: '⏸ 暂停反应' } satisfies Bilingual,
  btnReset: { en: '↺ Wash Flask & Reset Syringe', zh: '↺ 清洗锥形瓶与重置注射器' } satisfies Bilingual,
  timeElapsed: { en: 'Reaction Time', zh: '秒表计时' } satisfies Bilingual,
  currentVolume: { en: 'CO₂ Volume in Syringe', zh: '注射器内收集 CO₂ 体积' } satisfies Bilingual,
  instantRate: { en: 'Instantaneous Rate (dV/dt)', zh: '当前瞬时反应速率 (切线斜率)' } satisfies Bilingual,
  initialRateLabel: { en: 'Initial Rate (at t = 0)', zh: '初始最大速率 (t = 0 处切线)' } satisfies Bilingual,
  reactionPlateau: { en: 'Reaction Finished (Horizontal plateau reached)', zh: '反应已结束（达到水平平衡平台）' } satisfies Bilingual,
  deliveryTube: { en: 'Rubber bung & delivery tube to gas syringe', zh: '胶塞与气密玻璃导管' } satisfies Bilingual,
  gasSyringeLabel: { en: '100 cm³ Gas Syringe with frictionless plunger', zh: '100 cm³ 润滑气体注射器' } satisfies Bilingual,
  conicalFlaskLabel: { en: 'Conical flask with effervescing reaction mixture', zh: '锥形瓶内剧烈反应混合液' } satisfies Bilingual,
  tangentLabel: { en: 'Tangent Line (Rate = ΔV / Δt)', zh: '切线斜率 (速率 = ΔV / Δt)' } satisfies Bilingual,
} as const

export const QUALITATIVE_LAB = {
  tabCations: { en: 'Cation Tests (NaOH & NH₃)', zh: '阳离子沉淀反应 (NaOH 与 NH₃)' } satisfies Bilingual,
  tabAnions: { en: 'Anion Tests (Acids & Precipitates)', zh: '阴离子特征检验' } satisfies Bilingual,
  tabGases: { en: 'Gas Identification', zh: '常见气体检验' } satisfies Bilingual,
  tabFlame: { en: 'Flame Tests (Bunsen Burner)', zh: '焰色反应' } satisfies Bilingual,
  selectCation: { en: 'Select Cation Solution', zh: '选择待测阳离子' } satisfies Bilingual,
  reagentFewNaOH: { en: '+ Few Drops NaOH', zh: '+ 滴加少量 NaOH' } satisfies Bilingual,
  reagentExcessNaOH: { en: '+ Excess NaOH', zh: '+ 过量 NaOH' } satisfies Bilingual,
  reagentFewNH3: { en: '+ Few Drops NH₃(aq)', zh: '+ 滴加少量氨水' } satisfies Bilingual,
  reagentExcessNH3: { en: '+ Excess NH₃(aq)', zh: '+ 过量氨水' } satisfies Bilingual,
  btnResetTube: { en: '↺ Wash Test Tube', zh: '↺ 清洗试管（重置）' } satisfies Bilingual,
  reagentAddedLabel: { en: 'Reagent In Tube', zh: '当前加入试剂' } satisfies Bilingual,
  observationLabel: { en: 'Experimental Observation', zh: '实验现象' } satisfies Bilingual,
  precipitateSolubility: { en: 'Solubility in Excess', zh: '过量试剂溶解性' } satisfies Bilingual,
  solubilitySoluble: { en: 'SOLUBLE (Dissolves in excess)', zh: '沉淀溶解消失' } satisfies Bilingual,
  solubilityInsoluble: { en: 'INSOLUBLE (Precipitate remains)', zh: '沉淀不溶' } satisfies Bilingual,
  examTrapNote: { en: 'Paper 6 Al³⁺ vs Zn²⁺ vs Ca²⁺ Discrimination', zh: 'Paper 6 核心难点：区分 Al³⁺ / Zn²⁺ / Ca²⁺' } satisfies Bilingual,
} as const

export const ENERGETICS_LAB = {
  tabProfile: { en: 'Reaction Energy Profile', zh: '反应能级与活化能曲线' } satisfies Bilingual,
  tabBonds: { en: 'Bond Energy Calculations', zh: '键能定量计算与焓变' } satisfies Bilingual,
  tabCatalyst: { en: 'Catalytic Lowering of Ea', zh: '催化剂对活化能的作用' } satisfies Bilingual,
  selectReaction: { en: 'Select Reaction System', zh: '选择化学反应体系' } satisfies Bilingual,
  reactantsLabel: { en: 'Reactants Energy Level', zh: '反应物能量水平' } satisfies Bilingual,
  productsLabel: { en: 'Products Energy Level', zh: '生成物能量水平' } satisfies Bilingual,
  activationEnergyLabel: { en: 'Activation Energy (Ea)', zh: '活化能 (Ea)' } satisfies Bilingual,
  catalysedEaLabel: { en: 'Catalysed Path (Lower Ea)', zh: '催化路径 (更低 Ea)' } satisfies Bilingual,
  overallDeltaH: { en: 'Enthalpy Change (ΔH)', zh: '反应焓变 (ΔH)' } satisfies Bilingual,
  bondsBrokenTitle: { en: 'Bonds Broken (Energy in / BENDO)', zh: '断裂吸收总键能 (吸热)' } satisfies Bilingual,
  bondsFormedTitle: { en: 'Bonds Formed (Energy out / MEXO)', zh: '成键释放总能量 (放热)' } satisfies Bilingual,
  bondFormula: { en: 'ΔH = Σ(Broken) - Σ(Formed)', zh: 'ΔH = 吸收总键能 - 释放总键能' } satisfies Bilingual,
  exothermicNotice: { en: 'EXOTHERMIC: Products are at lower energy than reactants (ΔH < 0, heat released)', zh: '放热反应：生成物能量低于反应物（ΔH < 0，向环境释放热量）' } satisfies Bilingual,
  endothermicNotice: { en: 'ENDOTHERMIC: Products are at higher energy than reactants (ΔH > 0, heat absorbed)', zh: '吸热反应：生成物能量高于反应物（ΔH > 0，从环境吸收热量）' } satisfies Bilingual,
  btnToggleCatalyst: { en: 'Toggle Catalyst Pathway', zh: '添加 / 移除催化剂路径' } satisfies Bilingual,
} as const

export const EQUILIBRIUM_LAB = {
  tabLeChatelier: { en: 'Le Chatelier Shift Simulator', zh: '勒夏特列平衡移动模拟器' } satisfies Bilingual,
  tabColorShift: { en: 'Color Shift (NO₂ ⇌ N₂O₄)', zh: 'NO₂/N₂O₄ 显色与活塞压缩' } satisfies Bilingual,
  tabIndustrial: { en: 'Haber & Contact Compromises', zh: '哈伯法与接触法工业折中' } satisfies Bilingual,
  selectSystem: { en: 'Select Equilibrium System', zh: '选择平衡反应体系' } satisfies Bilingual,
  tempControl: { en: 'Temperature Setting', zh: '温度调控' } satisfies Bilingual,
  tempCold: { en: '❄️ Cold (0°C Ice bath)', zh: '❄️ 冰水浴 (0°C)' } satisfies Bilingual,
  tempModerate: { en: '🌡️ Moderate (Default)', zh: '🌡️ 常温/基准' } satisfies Bilingual,
  tempHot: { en: '🔥 Hot (100°C Boiling)', zh: '🔥 热水浴 (100°C)' } satisfies Bilingual,
  pressureControl: { en: 'Pressure Setting', zh: '压强调控' } satisfies Bilingual,
  pressureLow: { en: 'Low Pressure (1 atm / Expanded)', zh: '低压 (1 atm / 膨胀)' } satisfies Bilingual,
  pressureModerate: { en: 'Moderate Pressure', zh: '常压基准' } satisfies Bilingual,
  pressureHigh: { en: 'High Pressure (200 atm / Compressed)', zh: '高压 (200 atm / 压缩)' } satisfies Bilingual,
  catalystControl: { en: 'Catalyst (Iron / V₂O₅)', zh: '催化剂调控' } satisfies Bilingual,
  catalystOn: { en: 'Catalyst Present', zh: '添加催化剂' } satisfies Bilingual,
  catalystOff: { en: 'No Catalyst', zh: '无催化剂' } satisfies Bilingual,
  shiftHeading: { en: 'Le Chatelier Prediction', zh: '平衡移动判定结果' } satisfies Bilingual,
  shiftForward: { en: 'SHIFTS FORWARD (Right) → Higher Yield', zh: '平衡正向移动（向右）→ 产率升高' } satisfies Bilingual,
  shiftReverse: { en: 'SHIFTS REVERSE (Left) → Lower Yield', zh: '平衡逆向移动（向左）→ 产率降低' } satisfies Bilingual,
  shiftNone: { en: 'NO SHIFT in position (Yield unchanged)', zh: '平衡位置不移动（产率不变，仅速率加快）' } satisfies Bilingual,
  gasMolesComparison: { en: 'Gas Molecules Moles', zh: '两端气体分子数之比' } satisfies Bilingual,
  plungerLabel: { en: 'Gas Syringe Plunger (Compress or Expand)', zh: '气体注射器活塞（压缩或拉伸）' } satisfies Bilingual,
} as const

export const GROUP_TRENDS_LAB = {
  tabGroup1: { en: 'Group I Alkali Metals (Water Reactions)', zh: '第一主族碱金属与水反应' } satisfies Bilingual,
  tabHalogens: { en: 'Group VII Halogen Displacement Matrix', zh: '第七主族卤素置换反应矩阵' } satisfies Bilingual,
  tabTrends: { en: 'Atomic Periodic Trends & Shielding', zh: '原子结构屏蔽与周期律机理' } satisfies Bilingual,
  selectMetal: { en: 'Select Alkali Metal (Group I)', zh: '选择第一主族碱金属' } satisfies Bilingual,
  btnDropInWater: { en: 'Drop Metal into Water', zh: '将金属投入盛水水槽' } satisfies Bilingual,
  btnResetTrough: { en: '↺ Reset Water Trough', zh: '↺ 重置水槽' } satisfies Bilingual,
  reactionObservation: { en: 'Reaction with Water Observation', zh: '与水反应剧烈现象' } satisfies Bilingual,
  selectHalogen: { en: 'Step 1: Choose Halogen Solution (Added)', zh: '第一步：选择加入的卤素单质溶液' } satisfies Bilingual,
  selectHalide: { en: 'Step 2: Choose Halide Salt Solution (In tube)', zh: '第二步：选择试管底物卤化物溶液' } satisfies Bilingual,
  displacementResult: { en: 'Displacement Outcome', zh: '置换反应判定结果' } satisfies Bilingual,
  reactionOccurs: { en: '✅ DISPLACEMENT OCCURS (More reactive halogen displaces halide)', zh: '✅ 发生置换反应（强活性卤素置换弱卤素离子）' } satisfies Bilingual,
  noReaction: { en: '❌ NO REACTION (Halogen is less reactive than halide)', zh: '❌ 不发生反应（外加卤素活性较弱，无法置换）' } satisfies Bilingual,
  netIonicEquation: { en: 'Net Ionic Equation', zh: '净离子方程式' } satisfies Bilingual,
  redoxRole: { en: 'Redox Roles: Halogen is reduced; Halide is oxidized', zh: '氧化还原分析：卤素单质被还原（氧化剂），卤离子被氧化（还原剂）' } satisfies Bilingual,
} as const

export const MEASUREMENT_LAB = {
  tabMicrometer: { en: 'Micrometer Screw Gauge (0.01 mm)', zh: '螺旋测微器 (0.01 mm 精度)' } satisfies Bilingual,
  tabVernier: { en: 'Vernier Callipers (0.1 mm)', zh: '游标卡尺 (0.1 mm 精度)' } satisfies Bilingual,
  tabPendulum: { en: 'Simple Pendulum Timing (T = t₂₀ / 20)', zh: '单摆周期计时 (20次平均法)' } satisfies Bilingual,
  sleeveReading: { en: 'Main Sleeve Scale (mm):', zh: '主尺套筒毫米刻度:' } satisfies Bilingual,
  thimbleReading: { en: 'Thimble Head Divisions (0.01 mm):', zh: '可动微分筒格数 (0.01 mm):' } satisfies Bilingual,
  zeroErrorSetting: { en: 'Zero Error Calibration (mm):', zh: '零误差校准值 (mm):' } satisfies Bilingual,
  zeroErrorHint: { en: 'True Reading = Raw Reading − Zero Error', zh: '真实读数 = 表面读数 − 零误差' } satisfies Bilingual,
  rawReading: { en: 'Raw Observed Reading:', zh: '仪器直接读数:' } satisfies Bilingual,
  correctedReading: { en: 'Corrected Value:', zh: '扣除零差后校正值:' } satisfies Bilingual,
  mainScale: { en: 'Main Scale Reading (whole mm):', zh: '主尺整毫米读数:' } satisfies Bilingual,
  vernierCoincidence: { en: 'Vernier Line Coincidence (0.1 mm):', zh: '游标对齐刻度 (0.1 mm):' } satisfies Bilingual,
  pendulumLength: { en: 'Pendulum String Length L (m):', zh: '摆线长度 L (m):' } satisfies Bilingual,
  startStopwatch: { en: '▶ Start 20-Oscillation Timer', zh: '▶ 开始 20 次振动秒表' } satisfies Bilingual,
  resetStopwatch: { en: '↺ Reset Timer', zh: '↺ 重置秒表' } satisfies Bilingual,
  totalTime20: { en: 'Total Time for 20 Swings (t₂₀):', zh: '20次全振动总耗时 (t₂₀):' } satisfies Bilingual,
  periodCalculated: { en: 'Calculated Period T = t₂₀ / 20:', zh: '单摆计算周期 T = t₂₀ / 20:' } satisfies Bilingual,
  reactionTimeNotice: {
    en: 'Why 20 swings? Human reaction time error (±0.2 s) is divided by 20, dropping to only ±0.01 s per cycle!',
    zh: '为什么测20次？人类反应时间误差（约±0.2秒）被20等分，分摊到每个周期的误差仅剩约±0.01秒！',
  } satisfies Bilingual,
  btnPresetWire: { en: 'Sample: Copper Wire (2.38 mm)', zh: '预设样例：细铜丝 (2.38 mm)' } satisfies Bilingual,
  btnPresetBearing: { en: 'Sample: Ball Bearing (6.84 mm)', zh: '预设样例：金属滚珠 (6.84 mm)' } satisfies Bilingual,
  btnPresetTube: { en: 'Sample: Boiling Tube OD (24.7 mm)', zh: '预设样例：大试管外径 (24.7 mm)' } satisfies Bilingual,
} as const

export const HOOKES_LAW_LAB = {
  hangerControl: { en: 'Slotted Mass Hanger (Load F):', zh: '钩码载荷 F (重力):' } satisfies Bilingual,
  add50g: { en: '+0.5 N (≈50g)', zh: '+0.5 N (约50g)' } satisfies Bilingual,
  add100g: { en: '+1.0 N (≈100g)', zh: '+1.0 N (约100g)' } satisfies Bilingual,
  add200g: { en: '+2.0 N (≈200g)', zh: '+2.0 N (约200g)' } satisfies Bilingual,
  resetLoad: { en: '↺ Remove All Masses', zh: '↺ 卸下载荷' } satisfies Bilingual,
  unloadedLength: { en: 'Original Length l₀:', zh: '弹簧原长 l₀:' } satisfies Bilingual,
  stretchedLength: { en: 'Stretched Pointer Reading l:', zh: '指针当前实测长度 l:' } satisfies Bilingual,
  extensionCalculated: { en: 'Calculated Extension Δx = l − l₀:', zh: '计算伸长量 Δx = l − l₀:' } satisfies Bilingual,
  springConstantDisplay: { en: 'Spring Constant k = F / Δx:', zh: '弹簧劲度系数 k = F / Δx:' } satisfies Bilingual,
  limitReachedAlert: {
    en: '⚠️ LIMIT OF PROPORTIONALITY EXCEEDED: Elastic behavior lost! Plastic deformation has occurred; line curves.',
    zh: '⚠️ 已超过比例极限（Limit of Proportionality）：失去弹性正比关系！发生塑性形变，曲线弯曲。',
  },
  linearRegionNotice: {
    en: '✅ Hooke’s Law holds: Extension is directly proportional to load (straight line through origin).',
    zh: '✅ 处于胡克定律区间：伸长量与外加载荷成正比（图线为过原点直线）。',
  },
  graphTitle: { en: 'Load–Extension Graph (F vs Δx)', zh: '载荷—伸长量关系图 (F vs Δx)' } satisfies Bilingual,
} as const

export const MOMENTS_LAB = {
  anticlockwiseHeading: { en: 'Anticlockwise Moments (Left of Pivot)', zh: '逆时针力矩（支点左侧）' } satisfies Bilingual,
  clockwiseHeading: { en: 'Clockwise Moments (Right of Pivot)', zh: '顺时针力矩（支点右侧）' } satisfies Bilingual,
  load1Mass: { en: 'Left Load Mass (g):', zh: '左侧重物质量 (g):' } satisfies Bilingual,
  load1Dist: { en: 'Left Distance from Pivot d₁ (cm):', zh: '左侧距支点距离 d₁ (cm):' } satisfies Bilingual,
  load2Mass: { en: 'Right Load Mass (g):', zh: '右侧重物质量 (g):' } satisfies Bilingual,
  load2Dist: { en: 'Right Distance from Pivot d₂ (cm):', zh: '右侧距支点距离 d₂ (cm):' } satisfies Bilingual,
  presetBalanced: { en: 'Preset: Perfectly Balanced (200g @ 30cm vs 300g @ 20cm)', zh: '平衡范例：200g @ 30cm vs 300g @ 20cm' } satisfies Bilingual,
  presetTilted: { en: 'Preset: Clockwise Tilted (100g @ 20cm vs 400g @ 25cm)', zh: '倾斜范例：100g @ 20cm vs 400g @ 25cm' } satisfies Bilingual,
  equilibriumBalanced: {
    en: '⚖️ IN EQUILIBRIUM: Total Anticlockwise Moment = Total Clockwise Moment (No resultant turning effect).',
    zh: '⚖️ 处于平衡状态：逆时针总力矩 = 顺时针总力矩（合力矩为零，杠杆保持水平静止）。',
  },
  equilibriumUnbalancedCw: {
    en: '⤵️ UNBALANCED: Net Clockwise Moment tilts beam to the right!',
    zh: '⤵️ 不平衡状态：顺时针力矩过大，杠杆向右侧倾斜！',
  },
  equilibriumUnbalancedAcw: {
    en: '⤴️ UNBALANCED: Net Anticlockwise Moment tilts beam to the left!',
    zh: '⤴️ 不平衡状态：逆时针力矩过大，杠杆向左侧倾斜！',
  },
  pivotForce: { en: 'Upward Reaction Force at Pivot (R = ΣW):', zh: '支点向上支持力 (R = ΣW):' } satisfies Bilingual,
} as const

export const REFRACTION_LAB = {
  selectMaterial: { en: 'Select Optical Medium:', zh: '选择光学介质:' } satisfies Bilingual,
  incidentAngleSlider: { en: 'Angle of Incidence i (° inside medium):', zh: '介质内入射角 i (°):' } satisfies Bilingual,
  normalLine: { en: 'Normal (0° Line)', zh: '法线 (0° 基准)' } satisfies Bilingual,
  criticalAngleLabel: { en: 'Critical Angle c = arcsin(1/n):', zh: '全反射临界角 c = arcsin(1/n):' } satisfies Bilingual,
  refractedAngleLabel: { en: 'Angle of Refraction r (° in air):', zh: '空气中折射角 r (°):' } satisfies Bilingual,
  reflectedAngleLabel: { en: 'Angle of Reflection (°):', zh: '反射角 (°):' } satisfies Bilingual,
  speedInMedium: { en: 'Speed of Light in Medium v = c₀ / n:', zh: '介质中光速 v = c₀ / n:' } satisfies Bilingual,
  modeRefraction: {
    en: '🌈 REFRACTION OCCURS: Light speeds up into air and bends AWAY from normal (sin r = n · sin i).',
    zh: '🌈 发生折射：光进入空气后速率加快，折射光线偏离法线（sin r = n · sin i）。',
  },
  modeCritical: {
    en: '⚠️ CRITICAL ANGLE REACHED (i = c): Refracted ray emerges grazing along the glass surface at r = 90°!',
    zh: '⚠️ 达到临界角（i = c）：折射光线沿玻璃砖平面以 r = 90° 掠射逸出！',
  },
  modeTir: {
    en: '💎 TOTAL INTERNAL REFLECTION (TIR): i > c! NO light escapes into air. 100% of light reflects internally.',
    zh: '💎 发生全内反射 (TIR)：i > c！没有光线逃逸折射至空气中，100% 光能量在界面发生内反射。',
  },
  applicationFibre: {
    en: 'Application: Optical fibres transmit broadband data across oceans using continuous TIR with zero light leakage!',
    zh: '实际应用：光纤通信与医用内窥镜利用光线在纤芯内连续全反射传输信号，光能几乎无泄漏！',
  } satisfies Bilingual,
} as const

export const LENS_LAB = {
  objectDistanceSlider: { en: 'Object Distance u from Lens (cm):', zh: '物距 u（物至透镜光心距离 cm）:' } satisfies Bilingual,
  objectHeightSlider: { en: 'Object Arrow Height h₀ (cm):', zh: '物体高度 h₀ (cm):' } satisfies Bilingual,
  focalLengthInfo: { en: 'Focal Length f = 10.0 cm (2f = 20.0 cm)', zh: '透镜焦距 f = 10.0 cm (两倍焦距 2f = 20.0 cm)' } satisfies Bilingual,
  imageDistanceLabel: { en: 'Image Distance v (cm):', zh: '像距 v (cm):' } satisfies Bilingual,
  imageHeightLabel: { en: 'Image Height hᵢ (cm):', zh: '像高 hᵢ (cm):' } satisfies Bilingual,
  magnificationLabel: { en: 'Linear Magnification M = v / u:', zh: '放大率 M = v / u:' } satisfies Bilingual,
  natureRealInverted: {
    en: '📷 REAL & INVERTED IMAGE: Rays converge on screen on opposite side (1/v = 1/f − 1/u).',
    zh: '📷 倒立实像：光线在透镜另一侧会聚在光屏上 (1/v = 1/f − 1/u)。',
  },
  natureVirtualUpright: {
    en: '🔍 VIRTUAL & UPRIGHT IMAGE (Magnifying Glass): Rays diverge! Eye perceives virtual enlarged image behind object.',
    zh: '🔍 正立放大虚像（放大镜模式）：折射光线发散！人眼逆着光线反向延长线看到物体后方的放大虚像。',
  },
  natureInfinity: {
    en: '🔦 RAYS PARALLEL AT FOCUS (u = f): Refracted rays emerge parallel to each other. Image formed at infinity (spotlight).',
    zh: '🔦 焦点处平行出射（u = f）：折射光线相互平行，在无穷远处成平行光束（探照灯模式）。',
  },
  ray1Desc: { en: 'Ray 1: Parallel to axis → refracts through focal point F', zh: '光线 1：平行于主光轴 → 经透镜折射后过焦点 F' } satisfies Bilingual,
  ray2Desc: { en: 'Ray 2: Straight through optical center C without bending', zh: '光线 2：通过光心 C，传播方向不偏折' } satisfies Bilingual,
} as const

export const RESISTANCE_LAB = {
  selectComponent: { en: 'Select Component under Test:', zh: '选择待测电学元件:' } satisfies Bilingual,
  voltageControl: { en: 'Variable DC Power Supply (V):', zh: '可调直流电源输出电压 (V):' } satisfies Bilingual,
  ammeterReadout: { en: 'Series Ammeter Current I (A):', zh: '串联电流表读数 I (A):' } satisfies Bilingual,
  voltmeterReadout: { en: 'Parallel Voltmeter Voltage V (V):', zh: '并联电压表读数 V (V):' } satisfies Bilingual,
  resistanceCalculated: { en: 'Calculated Resistance R = V / I (Ω):', zh: '计算实时电阻 R = V / I (Ω):' } satisfies Bilingual,
  circuitHeading: { en: 'Standard Practical Circuit Schematic', zh: '标准实验电路接线示意图' } satisfies Bilingual,
  graphHeading: { en: 'I–V Characteristic Curve', zh: '伏安特性曲线 (I–V Graph)' } satisfies Bilingual,
  ammeterPlacementNotice: {
    en: 'Ammeter in series (low R); Voltmeter in parallel (high R).',
    zh: '电流表串联（极低内阻）；电压表并联（极高内阻）。',
  } satisfies Bilingual,
} as const

export const TRANSFORMER_LAB = {
  primaryTurnsSlider: { en: 'Primary Coil Turns Nₚ:', zh: '原线圈匝数 Nₚ:' } satisfies Bilingual,
  secondaryTurnsSlider: { en: 'Secondary Coil Turns Nₛ:', zh: '副线圈匝数 Nₛ:' } satisfies Bilingual,
  primaryVoltageSlider: { en: 'Primary A.C. Voltage Vₚ (V):', zh: '原线圈输入交流电压 Vₚ (V):' } satisfies Bilingual,
  secondaryVoltageLabel: { en: 'Secondary Output Voltage Vₛ (V):', zh: '副线圈输出电压 Vₛ (V):' } satisfies Bilingual,
  turnsRatioLabel: { en: 'Turns Ratio (Nₛ / Nₚ):', zh: '变压比 (Nₛ / Nₚ):' } satisfies Bilingual,
  primaryCurrentLabel: { en: 'Primary Current Iₚ (A):', zh: '原线圈电流 Iₚ (A):' } satisfies Bilingual,
  secondaryCurrentLabel: { en: 'Secondary Current Iₛ (A):', zh: '副线圈电流 Iₛ (A):' } satisfies Bilingual,
  softIronCoreLabel: { en: 'Laminated Soft Iron Core (Confines Flux)', zh: '叠片软铁芯（导磁减小涡流）' } satisfies Bilingual,
  badgeStepUp: { en: '⚡ STEP-UP TRANSFORMER (Vₛ > Vₚ)', zh: '⚡ 升压变压器 (Vₛ > Vₚ)' } satisfies Bilingual,
  badgeStepDown: { en: '🔌 STEP-DOWN TRANSFORMER (Vₛ < Vₚ)', zh: '🔌 降压变压器 (Vₛ < Vₚ)' } satisfies Bilingual,
  gridLossHeading: { en: 'National Grid High-Voltage Transmission Impact', zh: '国家电网高压远距离输电能效对比' } satisfies Bilingual,
  gridLossCompare: {
    en: 'Transmitting at higher V cuts current I, reducing cable heat dissipation (P = I²R) by factor of (Vₛ/Vₚ)²!',
    zh: '高压输电大幅降低输电电流 I，使输电线 I²R 发热损耗按 (Vₛ/Vₚ)² 倍数急剧减少！',
  } satisfies Bilingual,
  acNotice: {
    en: 'Must use alternating current (A.C.). Steady D.C. creates no changing magnetic flux, resulting in 0V output!',
    zh: '必须接入交流电 (A.C.)。若输入恒定直流电，铁芯内无变化的磁通量，副线圈感应电压恒为 0V！',
  } satisfies Bilingual,
} as const

export const RADIOACTIVITY_LAB = {
  tabDecay: { en: 'Half-Life Decay Curve & Background Subtraction', zh: '半衰期衰变曲线与本底扣除' } satisfies Bilingual,
  tabPenetration: { en: 'Penetrating Power & Deflection Test', zh: '粒子穿透性与电磁场偏转' } satisfies Bilingual,
  timeSlider: { en: 'Elapsed Time t (minutes):', zh: '流逝时间 t (分钟):' } satisfies Bilingual,
  measuredCount: { en: 'Measured Raw Count Rate (Bq):', zh: 'GM 计数器表面测得读数 (Bq):' } satisfies Bilingual,
  backgroundCount: { en: 'Background Count Rate (Bq):', zh: '环境本底辐射计数率 (Bq):' } satisfies Bilingual,
  correctedCount: { en: 'Corrected Count Rate = Raw − Background:', zh: '校正真实计数率 = 测量值 − 本底:' } satisfies Bilingual,
  halfLivesCount: { en: 'Half-Lives Elapsed (t / t½):', zh: '流逝半衰期个数 (t / t½):' } satisfies Bilingual,
  graphTitle: { en: 'Exponential Decay Curve (with Background Baseline)', zh: '指数衰变曲线（含环境本底基线）' } satisfies Bilingual,
  selectSource: { en: 'Select Radioactive Source:', zh: '选择放射源种类:' } satisfies Bilingual,
  selectAbsorber: { en: 'Select Absorber Material:', zh: '插入阻挡吸收介质:' } satisfies Bilingual,
  absorberNone: { en: 'None (Air only)', zh: '无阻挡（空气）' } satisfies Bilingual,
  absorberPaper: { en: 'Thin Paper (0.1 mm)', zh: '薄纸张 (0.1 mm)' } satisfies Bilingual,
  absorberAluminium: { en: 'Aluminium Plate (5 mm)', zh: '铝板 (5 mm)' } satisfies Bilingual,
  absorberLead: { en: 'Thick Lead Block (25 mm)', zh: '厚铅板 (25 mm)' } satisfies Bilingual,
  gmDetected: { en: 'GM Counter Detected Rate:', zh: 'GM 计数器探测计数率:' } satisfies Bilingual,
  absorbedStatusBlocked: { en: '🛑 RADIATION BLOCKED by absorber!', zh: '🛑 辐射被该介质完全阻挡吸收！' } satisfies Bilingual,
  absorbedStatusTransmitted: { en: '⚡ RADIATION PENETRATES through absorber!', zh: '⚡ 辐射成功穿透该介质！' } satisfies Bilingual,
  deflectionHeading: { en: 'Electric & Magnetic Field Deflection', zh: '电场与磁场偏转特性' } satisfies Bilingual,
} as const

export const G8_ACIDS_BASES_GUIDE = {
  headerTag: { en: 'Cambridge G8 Chemistry · Intensive Handout Guide', zh: '剑桥 G8 化学 · 官方讲义与原图精讲' } satisfies Bilingual,
  selectModulePrompt: { en: 'Select a Core Lesson Topic to Explore:', zh: '选择核心课时主题进行深入探索：' } satisfies Bilingual,
  officialDiagramTitle: { en: 'Curriculum Textbook / PPT Original Diagram', zh: '官方讲义 / PPT 原版图示' } satisfies Bilingual,
  clickToEnlarge: { en: '🔍 Click to view full high-res figure', zh: '🔍 点击查看高清大图' } satisfies Bilingual,
  coreMechanismTitle: { en: 'Core Reaction Mechanism & Principles', zh: '核心反应机理与关键要点' } satisfies Bilingual,
  keyEquationTitle: { en: 'Chemical Equation', zh: '化学方程式' } satisfies Bilingual,
  examTakeawayTitle: { en: 'Exam & Memory Takeaway', zh: '考点精要与高分铁律' } satisfies Bilingual,
  checkpointQuizTitle: { en: 'Interactive Knowledge Check', zh: '课堂即问即答自测' } satisfies Bilingual,
  questionLabel: { en: 'Question:', zh: '思考题：' } satisfies Bilingual,
  checkAnswerBtn: { en: 'Check Answer', zh: '核对答案' } satisfies Bilingual,
  answeredCorrect: { en: '✓ Correct! Excellent reasoning.', zh: '✓ 完全正确！解题思路精准。' } satisfies Bilingual,
  answeredIncorrect: { en: '✗ Not quite. Review the explanation above!', zh: '✗ 答错了，请结合上方知识点再思考一下！' } satisfies Bilingual,
  modalClose: { en: 'Close Preview', zh: '关闭全屏大图' } satisfies Bilingual,
} as const








