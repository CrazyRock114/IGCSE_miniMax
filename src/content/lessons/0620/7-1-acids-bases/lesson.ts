import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'
import { titrationLabData } from '@/content/titrationLabData'
import { g8AcidsBasesGuideData } from './g8GuideData'

const lesson: Lesson = {
  slug: '7-1-acids-bases',
  subject: '0620',
  syllabus: [
    '0620.7.1.1',
    '0620.7.1.2',
    '0620.7.1.3',
    '0620.7.1.4',
    '0620.7.1.5',
    '0620.7.1.6',
    '0620.7.1.7',
    '0620.7.1.8',
    '0620.7.1.9',
    '0620.7.1.10',
    '0620.7.1.11',
    '0620.7.1.12',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Acids, bases and pH', zh: '酸、碱与 pH' },
  summary: {
    en: 'Titrate a strong and a weak acid side by side. Same concentration, very different pH — because "strong" and "concentrated" are not the same thing.',
    zh: '并排滴定强酸与弱酸。浓度相同，pH 却大不相同——因为"强"和"浓"不是一回事。',
  },

  objectives: [
    {
      en: 'Describe the characteristic reactions of acids with metals, bases and carbonates.',
      zh: '描述酸与金属、碱和碳酸盐的特征反应。',
    },
    {
      en: 'Describe the effect of acids and alkalis on litmus, thymolphthalein and methyl orange.',
      zh: '描述酸碱对石蕊、百里酚酞与甲基橙的作用。',
    },
    {
      en: 'State that bases are metal oxides or hydroxides, and that alkalis are soluble bases.',
      zh: '说明碱是金属氧化物或氢氧化物，可溶的碱称为强碱溶液。',
    },
    {
      en: 'State that acidic solutions contain H⁺ ions and alkaline solutions contain OH⁻ ions.',
      zh: '说明酸性溶液含 H⁺，碱性溶液含 OH⁻。',
    },
    {
      en: 'Compare hydrogen ion concentration and neutrality using the pH scale.',
      zh: '用 pH 比较氢离子浓度并判断中性。',
    },
    {
      en: 'Describe the neutralisation reaction between an acid and an alkali.',
      zh: '描述酸与碱的中和反应。',
    },
    {
      en: 'Define acids as proton donors and bases as proton acceptors. (Extended)',
      zh: '把酸定义为质子给体、碱定义为质子受体。（Extended）',
    },
    {
      en: 'Define strong and weak acids in terms of complete and partial dissociation. (Extended)',
      zh: '用完全电离与部分电离定义强酸与弱酸。（Extended）',
    },
    {
      en: 'Describe how to distinguish a strong acid from a weak acid. (Extended)',
      zh: '说明如何区分强酸与弱酸。（Extended）',
    },
    {
      en: 'Explain the pH difference between strong and weak acids of the same concentration. (Extended)',
      zh: '解释同浓度强酸与弱酸的 pH 差异。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'acid',
      zh: '酸',
      definition: {
        en: 'A substance that releases hydrogen ions in aqueous solution. In Brønsted terms, a proton donor.',
        zh: '在水溶液中释放氢离子的物质。按布朗斯特理论，即质子给体。',
      },
      syllabus: ['0620.7.1.6', '0620.7.1.9'],
    },
    {
      en: 'base',
      zh: '碱',
      definition: {
        en: 'A metal oxide or hydroxide that neutralises an acid. In Brønsted terms, a proton acceptor.',
        zh: '能中和酸的金属氧化物或氢氧化物。按布朗斯特理论，即质子受体。',
      },
      syllabus: ['0620.7.1.3', '0620.7.1.9'],
    },
    {
      en: 'alkali',
      zh: '可溶性碱',
      definition: {
        en: 'A base that dissolves in water, giving a solution containing hydroxide ions.',
        zh: '能溶于水的碱，其溶液含氢氧根离子。',
      },
      syllabus: ['0620.7.1.3'],
    },
    {
      en: 'strong acid',
      zh: '强酸',
      definition: {
        en: 'An acid that is fully dissociated in solution — every molecule releases its proton. Nothing to do with how concentrated it is.',
        zh: '在溶液中完全电离的酸——每个分子都释放质子。与浓度无关。',
      },
      syllabus: ['0620.7.1.10'],
    },
    {
      en: 'weak acid',
      zh: '弱酸',
      definition: {
        en: 'An acid that is only partly dissociated, so most molecules stay intact and fewer H⁺ ions are released.',
        zh: '只部分电离的酸，大多数分子保持完整，释放的 H⁺ 较少。',
      },
      syllabus: ['0620.7.1.10'],
    },
    {
      en: 'neutralisation',
      zh: '中和',
      definition: {
        en: 'The reaction of H⁺ with OH⁻ to form water, giving a salt as the other product.',
        zh: 'H⁺ 与 OH⁻ 结合生成水的反应，另一产物为盐。',
      },
      syllabus: ['0620.7.1.8'],
    },
    {
      en: 'pH scale',
      zh: 'pH 值',
      definition: {
        en: 'A measure of hydrogen ion concentration. Each unit is a factor of ten; 7 is neutral.',
        zh: '氢离子浓度的量度。每差一个单位相差十倍；7 为中性。',
      },
      syllabus: ['0620.7.1.7'],
    },
    {
      en: 'citric acid',
      zh: '柠檬酸',
      definition: {
        en: 'A natural weak organic acid found in citrus fruits like lemons and oranges.',
        zh: '存在于柠檬和橙子等柑橘类水果中的天然弱有机酸。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'ethanoic acid',
      zh: '乙酸 (醋酸)',
      definition: {
        en: 'A weak organic acid present in vinegar, formed by the oxidation of ethanol.',
        zh: '食用醋中所含的弱有机酸，由乙醇氧化而成。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'carbonic acid',
      zh: '碳酸',
      definition: {
        en: 'A weak acid formed when carbon dioxide gas dissolves in water under pressure.',
        zh: '二氧化碳气体在高压下溶解于水中形成的弱酸。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'effervescence',
      zh: '冒泡 / 沸腾放气',
      definition: {
        en: 'The rapid formation and release of gas bubbles from a liquid reaction mixture.',
        zh: '液体反应混合物中迅速产生并逸出大量气体气泡的现象。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'exothermic',
      zh: '放热反应',
      definition: {
        en: 'A chemical reaction that releases thermal energy to the surroundings, causing the temperature to rise.',
        zh: '向周围环境释放热能、导致体系温度上升的化学反应。',
      },
      syllabus: ['0620.7.1.8'],
    },
    {
      en: 'squeaky pop test',
      zh: '氢气爆鸣检验',
      definition: {
        en: 'The diagnostic test for hydrogen gas: introducing a lighted splint to the tube mouth produces a sharp squeaky pop.',
        zh: '氢气的特征检验法：将点燃的木条移至试管口，引燃微量氢气发出清脆的爆鸣声。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'reactivity series',
      zh: '金属活动性顺序',
      definition: {
        en: 'A ranking of metals in order of their reactivity based on electron-losing tendency; metals above hydrogen displace it from acids.',
        zh: '金属依据失电子能力从强到弱的排列顺序；排在氢前面的金属能从酸中置换出氢气。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'limewater',
      zh: '澄清石灰水',
      definition: {
        en: 'A clear aqueous solution of calcium hydroxide (Ca(OH)₂) that turns cloudy white when carbon dioxide is bubbled through it.',
        zh: '氢氧化钙（Ca(OH)₂）的澄清饱和水溶液，通入二氧化碳气体会生成白色沉淀变浑浊。',
      },
      syllabus: ['0620.7.1.1'],
    },
    {
      en: 'litmus',
      zh: '石蕊指示剂',
      definition: {
        en: 'An indicator dye that is red in acidic solutions and blue in alkaline solutions.',
        zh: '一种指示剂染料，在酸性溶液中显红色，在碱性溶液中显蓝色。',
      },
      syllabus: ['0620.7.1.2'],
    },
    {
      en: 'methyl orange',
      zh: '甲基橙指示剂',
      definition: {
        en: 'A synthetic indicator: red in acid (pH < 3.1), peach/orange at end point, and yellow in alkali (pH > 4.4).',
        zh: '一种合成指示剂：酸中显红色（pH < 3.1），滴定终点显橙色，碱中显黄色（pH > 4.4）。',
      },
      syllabus: ['0620.7.1.2'],
    },
    {
      en: 'thymolphthalein',
      zh: '百里酚酞指示剂',
      definition: {
        en: 'An indicator that is colourless in acidic and neutral solutions and turns vibrant blue in alkaline solutions (pH > 10.5).',
        zh: '一种指示剂：在酸性与中性环境中无色透明，在强碱性溶液中（pH > 10.5）显鲜蓝色。',
      },
      syllabus: ['0620.7.1.2'],
    },
    {
      en: 'universal indicator',
      zh: '广范指示剂',
      definition: {
        en: 'A mixture of several indicators that exhibits a continuous rainbow of colors across the full pH range from 0 to 14.',
        zh: '多种指示剂的混合溶液，在 pH 0 至 14 的全部范围内呈现连续的彩虹变色。',
      },
      syllabus: ['0620.7.1.7'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{H^{+}(aq) + OH^{-}(aq) \\rightarrow H_2O(l)}',
      meaning: {
        en: 'The ionic equation for every acid–alkali neutralisation, whichever acid and alkali are used.',
        zh: '任何酸碱中和的离子方程式，与所用的具体酸碱无关。',
      },
      substitute: (r) =>
        `\\text{equivalence at } ${formatSigFigs(r['equivalenceVolume'] ?? 0, 3)}\\ \\text{cm}^3`,
    },
    {
      latex: '\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water}',
      meaning: {
        en: 'The general pattern. With a carbonate you also get carbon dioxide; with a metal you get hydrogen.',
        zh: '通式。与碳酸盐反应还生成二氧化碳；与金属反应生成氢气。',
      },
      substitute: (r) =>
        `\\text{start: strong pH } ${formatSigFigs(r['strongStartPh'] ?? 0, 2)},\\ \\text{weak pH } ${formatSigFigs(
          r['weakStartPh'] ?? 0,
          2
        )}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '7-1-acids-bases',
    hint: {
      en: 'Both acids are at the same concentration — yet they start three pH units apart. That gap is dissociation.',
      zh: '两种酸浓度完全相同——起始 pH 却相差三个单位。这个差距就是电离程度。',
    },
    params: [
      {
        key: 'acidConcentration',
        label: { en: 'Acid concentration', zh: '酸的浓度' },
        unit: 'mol / dm³',
        min: 0.01,
        max: 1,
        step: 0.01,
        default: 0.1,
      },
      {
        key: 'alkaliConcentration',
        label: { en: 'Alkali concentration', zh: '碱的浓度' },
        unit: 'mol / dm³',
        min: 0.01,
        max: 1,
        step: 0.01,
        default: 0.1,
      },
      {
        key: 'acidVolume',
        label: { en: 'Volume of acid', zh: '酸的体积' },
        unit: 'cm³',
        min: 10,
        max: 50,
        step: 5,
        default: 25,
      },
      {
        key: 'maxVolume',
        label: { en: 'Alkali added (max)', zh: '加入碱的最大体积' },
        unit: 'cm³',
        min: 20,
        max: 100,
        step: 10,
        default: 50,
      },
    ],
    readouts: [
      {
        key: 'equivalenceVolume',
        label: { en: 'Equivalence point', zh: '等当点' },
        unit: 'cm³',
        sigFigs: 3,
      },
      {
        key: 'strongStartPh',
        label: { en: 'Strong acid start pH', zh: '强酸初始 pH' },
        unit: '',
        sigFigs: 2,
      },
      {
        key: 'weakStartPh',
        label: { en: 'Weak acid start pH', zh: '弱酸初始 pH' },
        unit: '',
        sigFigs: 2,
      },
      {
        key: 'weakEquivalencePh',
        label: { en: 'Weak acid pH at equivalence', zh: '弱酸等当点 pH' },
        unit: '',
        sigFigs: 2,
      },
    ],
    presets: [
      {
        label: { en: 'Equal concentrations', zh: '浓度相同' },
        params: { acidConcentration: 0.1, alkaliConcentration: 0.1, acidVolume: 25, maxVolume: 50 },
      },
      {
        label: { en: 'Double the alkali', zh: '碱浓度加倍' },
        params: { acidConcentration: 0.1, alkaliConcentration: 0.2, acidVolume: 25, maxVolume: 50 },
      },
      {
        label: { en: 'Dilute acid', zh: '稀酸' },
        params: { acidConcentration: 0.01, alkaliConcentration: 0.1, acidVolume: 25, maxVolume: 50 },
      },
      {
        label: { en: 'More acid in the flask', zh: '烧瓶中酸更多' },
        params: { acidConcentration: 0.1, alkaliConcentration: 0.1, acidVolume: 50, maxVolume: 100 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-7-1-cp1',
      syllabus: ['0620.7.1.10', '0620.7.1.12'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Hydrochloric acid and ethanoic acid both have a concentration of 0.1 mol / dm³. The hydrochloric acid has a pH of 1 and the ethanoic acid has a pH of about 3. Explain this difference.',
      markScheme: [
        {
          text: 'Hydrochloric acid is a strong acid and is fully dissociated into ions',
          marks: 1,
        },
        {
          text: 'Ethanoic acid is a weak acid and is only partially dissociated',
          marks: 1,
        },
        {
          text: 'so the ethanoic acid has a lower concentration of hydrogen ions, giving a higher pH',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The concentrations are identical — this question is entirely about dissociation. Answering "the ethanoic acid is more dilute" is the classic error and scores zero.',
        zh: '两者浓度完全相同——本题只考电离程度。答"乙酸更稀"是典型错误，得零分。',
      },
    },
    {
      id: '0620-7-1-cp2',
      syllabus: ['0620.7.1.8'],
      tier: 'core',
      commandWord: 'State',
      marks: 1,
      stem: 'State the ionic equation for the neutralisation of any acid by any alkali.',
      options: [
        'H⁺(aq) + OH⁻(aq) → H₂O(l)',
        'H⁺(aq) + Cl⁻(aq) → HCl(aq)',
        'Na⁺(aq) + OH⁻(aq) → NaOH(aq)',
        'H₂O(l) → H⁺(aq) + OH⁻(aq)',
      ],
      answerIndex: 0,
      markScheme: [{ text: 'H⁺(aq) + OH⁻(aq) → H₂O(l)', marks: 1 }],
      examinerNote: {
        en: 'The spectator ions cancel, which is why one equation covers every acid–alkali pair. State symbols are expected.',
        zh: '旁观离子相互抵消，所以一个方程式适用于所有酸碱组合。需要写状态符号。',
      },
    },
    {
      id: '0620-7-1-cp3',
      syllabus: ['0620.7.1.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what you would observe, and name the products, when dilute hydrochloric acid is added to solid calcium carbonate.',
      markScheme: [
        { text: 'Effervescence / bubbles of gas are seen and the solid dissolves', marks: 1 },
        { text: 'The gas produced is carbon dioxide', marks: 1 },
        {
          text: 'The other products are calcium chloride and water',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Acid + carbonate always gives salt + water + carbon dioxide. Name the salt from the acid used: hydrochloric gives a chloride, sulfuric a sulfate, nitric a nitrate.',
        zh: '酸 + 碳酸盐永远生成盐 + 水 + 二氧化碳。盐由所用的酸决定：盐酸生成氯化物，硫酸生成硫酸盐，硝酸生成硝酸盐。',
      },
    },
    {
      id: '0620-7-1-cp4',
      syllabus: ['0620.7.1.11'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'Suggest one experiment, other than measuring pH, that would distinguish a strong acid from a weak acid of the same concentration.',
      markScheme: [
        {
          text: 'Add the same piece of magnesium to each and compare the rate of effervescence',
          marks: 1,
          alternatives: ['compare the electrical conductivity of the two solutions'],
        },
        {
          text: 'The strong acid reacts faster / conducts better, because it has a higher concentration of ions',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Both acids will eventually produce the same volume of hydrogen — the same amount of acid is present. Only the rate differs, because only the H⁺ concentration differs.',
        zh: '两种酸最终生成的氢气体积相同——酸的总量相同。只有速率不同，因为只有 H⁺ 浓度不同。',
      },
    },
    {
      id: '0620-7-1-cp5',
      syllabus: ['0620.7.1.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A student adds dilute hydrochloric acid separately to pieces of magnesium and copper. Describe what is observed in each test tube and state the test for any gas produced.',
      markScheme: [
        {
          text: 'Magnesium: rapid effervescence / bubbles and solid dissolves (test tube feels warm)',
          marks: 1,
        },
        {
          text: 'Copper: no reaction / no effervescence / solid remains unchanged',
          marks: 1,
        },
        {
          text: 'Gas test: lighted splint at the mouth of the tube gives a squeaky pop (confirms hydrogen)',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Magnesium is above hydrogen in the reactivity series and reacts vigorously, while copper is below hydrogen and does not react. Remember: for hydrogen, the splint must be lighted, not glowing.',
        zh: '镁在金属活动性顺序中排在氢前面，反应剧烈；而铜排在氢后面，不发生反应。切记：检验氢气必须用点燃的木条，不能用带火星的木条。',
      },
    },
    {
      id: '0620-7-1-cp6',
      syllabus: ['0620.7.1.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'When dilute nitric acid is added to solid calcium carbonate, a gas is evolved. State the chemical name of the gas, state the reagent used to test for it and its positive observation, and state the name of the salt produced.',
      markScheme: [
        { text: 'Gas: carbon dioxide', marks: 1 },
        {
          text: 'Reagent and observation: bubble through limewater and it turns cloudy / milky',
          marks: 1,
        },
        { text: 'Salt: calcium nitrate', marks: 1 },
      ],
      examinerNote: {
        en: 'Acid + carbonate always yields salt + water + carbon dioxide. Nitric acid always makes a nitrate salt. The limewater test must specify turning cloudy/milky.',
        zh: '酸 + 碳酸盐永远生成盐 + 水 + 二氧化碳。硝酸生成硝酸盐，故生成的盐为硝酸钙。澄清石灰水检验必须说明变浑浊/乳白色。',
      },
    },
  ],
  extras: [g8AcidsBasesGuideData, titrationLabData],
}

export default lesson
