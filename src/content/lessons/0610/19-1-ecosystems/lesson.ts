import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '19-1-ecosystems',
  subject: '0610',
  syllabus: [
    '0610.19.1.1',
    '0610.19.1.2',
    '0610.19.2.1',
    '0610.19.2.2',
    '0610.19.2.3',
    '0610.19.2.4',
    '0610.19.2.5',
    '0610.19.2.6',
    '0610.19.2.7',
    '0610.19.2.8',
    '0610.19.2.9',
    '0610.19.2.10',
    '0610.19.2.11',
    '0610.19.2.12',
    '0610.19.2.13',
    '0610.19.2.14',
    '0610.19.2.15',
    '0610.19.2.16',
    '0610.19.2.17',
    '0610.19.2.18',
    '0610.19.2.19',
    '0610.19.3.1',
    '0610.19.3.2',
    '0610.19.3.3',
    '0610.19.4.1',
    '0610.19.4.2',
    '0610.19.4.3',
    '0610.19.4.4',
    '0610.19.4.5',
    '0610.19.4.6',
    '0610.19.4.7',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Organisms and their environment', zh: '生物与环境' },
  summary: {
    en: 'One oak tree supports half a million insects, so counting them gives a pyramid standing on its point. Weigh them instead and it turns the right way up.',
    zh: '一棵橡树养活着五十万只昆虫，因此按数量画出的金字塔是立在尖端上的。改为称重，它立刻就正了过来。',
  },

  objectives: [
    {
      en: 'State that the Sun is the principal source of energy for biological systems, and describe how energy flows through organisms.',
      zh: '说明太阳是生物系统的主要能量来源，并描述能量如何在生物之间流动。',
    },
    {
      en: 'Construct and interpret food chains and food webs, and use them to describe the impact of overharvesting and introduced species.',
      zh: '构建并解读食物链与食物网，并用它们说明过度捕捞与引入物种的影响。',
    },
    {
      en: 'Define producer, consumer, herbivore, carnivore, decomposer and trophic level.',
      zh: '给生产者、消费者、植食动物、肉食动物、分解者与营养级下定义。',
    },
    {
      en: 'Draw and interpret pyramids of numbers and of biomass, and discuss the advantages of each.',
      zh: '绘制并解读数量金字塔与生物量金字塔，并讨论各自的优点。',
    },
    {
      en: 'Draw and interpret pyramids of energy, and explain why they are preferred. (Extended)',
      zh: '绘制并解读能量金字塔，并解释为何它更受青睐。（Extended）',
    },
    {
      en: 'Explain why energy transfer between trophic levels is inefficient, why food chains are short, and why eating crops is more efficient than eating livestock. (Extended)',
      zh: '解释营养级间能量传递为何低效、食物链为何短，以及为何食用作物比食用牲畜更节能。（Extended）',
    },
    {
      en: 'Describe the carbon cycle, and the nitrogen cycle including the roles of microorganisms. (Extended)',
      zh: '描述碳循环，以及包含微生物作用的氮循环。（Extended）',
    },
    {
      en: 'Define population, community and ecosystem, and identify and explain the phases of a sigmoid growth curve.',
      zh: '给种群、群落与生态系统下定义，并识别与解释 S 形增长曲线的各阶段。',
    },
  ],

  glossary: [
    {
      en: 'trophic level',
      zh: '营养级',
      definition: {
        en: 'An organism’s position in a food chain — producer, primary consumer, secondary consumer, and so on.',
        zh: '生物在食物链中所处的位置——生产者、初级消费者、次级消费者，依此类推。',
      },
      syllabus: ['0610.19.2.13'],
    },
    {
      en: 'producer',
      zh: '生产者',
      definition: {
        en: 'An organism that makes its own organic nutrients, usually by photosynthesis. Always the first trophic level.',
        zh: '能自己制造有机养料的生物，通常通过光合作用。它永远是第一营养级。',
      },
      syllabus: ['0610.19.2.4'],
    },
    {
      en: 'decomposer',
      zh: '分解者',
      definition: {
        en: 'An organism that feeds on dead or waste organic matter, returning its nutrients to the environment.',
        zh: '以死亡或废弃有机物为食的生物，把其中的养分归还给环境。',
      },
      syllabus: ['0610.19.2.9'],
    },
    {
      en: 'biomass',
      zh: '生物量',
      definition: {
        en: 'The dry mass of living material. Better than a count because it does not treat an oak tree and a greenfly as equals.',
        zh: '生物体的干重。它优于计数，因为它不会把橡树和蚜虫等量齐观。',
      },
      syllabus: ['0610.19.2.11'],
    },
    {
      en: 'carrying capacity',
      zh: '环境容纳量',
      definition: {
        en: 'The population a habitat can support indefinitely. The stationary phase of a growth curve sits at it.',
        zh: '一个生境能长期维持的种群数量。增长曲线的稳定期正处于这一水平。',
      },
      syllabus: ['0610.19.4.7'],
    },
    {
      en: 'ecosystem',
      zh: '生态系统',
      definition: {
        en: 'A community of populations together with the physical environment they live in.',
        zh: '由各种群构成的群落，连同它们所处的物理环境。',
      },
      syllabus: ['0610.19.4.3'],
    },
  ],

  equations: [
    {
      latex: 'E_{n} = E_{1} \\times t^{\\,n-1}',
      meaning: {
        en: 'Energy at the nth trophic level, where t is the fraction passed on at each step. Because t is about a tenth, the fall is not steady — it is a factor of ten every level.',
        zh: '第 n 营养级的能量，其中 t 是每一步传递的比例。由于 t 约为十分之一，下降不是匀速的——而是每升高一级就减少到十分之一。',
      },
      substitute: (r) =>
        `\\text{top level } ${r['top'] ?? 0}\\ \\mathrm{kJ\\,m^{-2}\\,yr^{-1}} \\quad (${r['efficiency'] ?? 0}\\%)`,
    },
    {
      latex: '\\text{people fed} \\;\\propto\\; \\dfrac{1}{t}',
      meaning: {
        en: 'Feed a crop to an animal and you get back only the fraction t of its energy. Eating the crop directly feeds 1/t times as many people from the same land.',
        zh: '把作物喂给动物，你只能取回其能量的 t 倍。直接食用作物，同样的土地能养活 1/t 倍的人。',
      },
      substitute: (r) =>
        `\\dfrac{1}{t} = ${r['cropAdvantage'] ?? 0} \\quad \\text{5th level: } ${r['fifth'] ?? 0}\\ \\mathrm{kJ\\,m^{-2}\\,yr^{-1}}`,
    },
  ],

  sim: {
    primitive: 'pyramid',
    kernel: '19-1-ecosystems',
    hint: {
      en: 'Draw the woodland as numbers, then as biomass. The ecosystem has not changed — only what you measured.',
      zh: '先按数量画出橡树林，再按生物量画一次。生态系统没有变，变的只是你测量的东西。',
    },
    params: [
      {
        key: 'ecosystem',
        label: { en: 'Food chain', zh: '食物链' },
        unit: '',
        min: 1,
        max: 2,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Grassland', zh: '草地' } },
          { value: 2, label: { en: 'Oak woodland', zh: '橡树林' } },
        ],
      },
      {
        key: 'kind',
        label: { en: 'Measured as', zh: '衡量方式' },
        unit: '',
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Numbers', zh: '数量' } },
          { value: 2, label: { en: 'Biomass', zh: '生物量' } },
          { value: 3, label: { en: 'Energy', zh: '能量' } },
        ],
      },
      {
        key: 'transfer',
        label: { en: 'Energy passed to the next level', zh: '传给下一营养级的能量' },
        unit: '%',
        min: 1,
        max: 30,
        step: 1,
        default: 10,
      },
    ],
    readouts: [
      {
        key: 'top',
        label: { en: 'Energy at the top level', zh: '顶级营养级的能量' },
        unit: 'kJ/m²/yr',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'efficiency',
        label: { en: 'Fraction of the producers’ energy', zh: '占生产者能量的比例' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'fifth',
        label: { en: 'Left for a fifth level', zh: '留给第五营养级的能量' },
        unit: 'kJ/m²/yr',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'cropAdvantage',
        label: { en: 'Crops feed this many times more', zh: '直接吃作物可多养活的倍数' },
        unit: '×',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Grassland, counted', zh: '草地，按数量' },
        params: { ecosystem: 1, kind: 1, transfer: 10 },
      },
      {
        label: { en: 'Woodland, counted: inverted', zh: '橡树林，按数量：倒置' },
        params: { ecosystem: 2, kind: 1, transfer: 10 },
      },
      {
        label: { en: 'The same woodland, weighed', zh: '同一片林，按重量' },
        params: { ecosystem: 2, kind: 2, transfer: 10 },
      },
      {
        label: { en: 'Woodland energy', zh: '橡树林的能量' },
        params: { ecosystem: 2, kind: 3, transfer: 10 },
      },
      {
        label: { en: 'A wasteful chain (5%)', zh: '低效的食物链（5%）' },
        params: { ecosystem: 2, kind: 3, transfer: 5 },
      },
      {
        label: { en: 'An efficient one (25%)', zh: '高效的食物链（25%）' },
        params: { ecosystem: 2, kind: 3, transfer: 25 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-19-1-cp1',
      syllabus: ['0610.19.2.17'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Only about 10% of the energy in one trophic level is transferred to the next. Explain what happens to the rest.',
      markScheme: [
        {
          text: 'Much of it is released by respiration and lost to the surroundings as heat',
          marks: 1,
        },
        { text: 'Some is lost in excretion as urea, and in egestion as undigested faeces', marks: 1 },
        {
          text: 'Not all of the organism is eaten — roots, bones and other parts are left',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Energy is not "used up" or "destroyed" — say where it went. Heat from respiration is the largest share and the one most often left out.',
        zh: '能量不会被"用光"或"消灭"——要说清它去了哪里。呼吸作用产生的热量占最大份额，也是最常被漏掉的一项。',
      },
    },
    {
      id: '0610-19-1-cp2',
      syllabus: ['0610.19.2.12'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A pyramid of numbers for the food chain oak tree → insects → small birds → hawks is not pyramid-shaped. Explain why, and explain why a pyramid of biomass for the same food chain is a better diagram.',
      markScheme: [
        {
          text: 'There is only one oak tree but very many insects, so the second level is wider than the first',
          marks: 1,
        },
        {
          text: 'A pyramid of numbers counts every organism as one, regardless of its size',
          marks: 1,
        },
        {
          text: 'A pyramid of biomass measures the mass of living material instead, so the single large tree outweighs all the insects and the diagram is the right way up',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The fault is in the counting, not in the woodland. Saying "there are more insects than trees" describes the diagram; the mark is for saying why counting misleads.',
        zh: '问题出在"计数"这件事上，而不在橡树林。写"昆虫比树多"只是描述图形；得分点在于说明计数为何具有误导性。',
      },
    },
    {
      id: '0610-19-1-cp3',
      syllabus: ['0610.19.2.18'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Food chains rarely have more than four or five trophic levels. Explain why, using figures.',
      markScheme: [
        { text: 'Only about 10% of the energy passes from one level to the next', marks: 1 },
        {
          text: 'So a fifth trophic level receives about 0.01% of the energy the producers captured',
          marks: 1,
        },
        {
          text: 'There would not be enough energy to support a viable population at that level',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Using figures" is an instruction. Multiply the 10% out and quote the result; an answer with no numbers in it cannot get full marks here.',
        zh: '"用数字说明"是一项要求。把 10% 逐级乘下去并给出结果；不含任何数字的答案在这里拿不到满分。',
      },
    },
    {
      id: '0610-19-1-cp4',
      syllabus: ['0610.19.2.19'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A country with limited farmland wants to feed more people from the same area. Suggest why growing crops for people to eat directly is more efficient than using the land to raise cattle for meat.',
      markScheme: [
        {
          text: 'Eating the crop directly makes people the primary consumers, so there is one trophic level instead of two',
          marks: 1,
        },
        {
          text: 'About 90% of the energy is lost at each transfer, mostly as heat from respiration by the cattle',
          marks: 1,
        },
        {
          text: 'So roughly ten times as much energy from the same area reaches people, feeding about ten times as many',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the 10% rule applied to a real decision. Answers about cattle being expensive or needing water miss the point — the argument is about trophic levels.',
        zh: '这是把 10% 规律用在一个现实决策上。写"养牛成本高"或"牛需要水"都没有抓住要点——论证的核心是营养级。',
      },
    },
    {
      id: '0610-19-1-cp5',
      syllabus: ['0610.19.4.5', '0610.19.4.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Bacteria are grown in a closed flask of nutrient broth. Their population follows a sigmoid curve. Explain what causes the lag phase, the exponential phase and the stationary phase.',
      markScheme: [
        {
          text: 'Lag phase: few organisms are present and they are adjusting to the conditions and synthesising enzymes before they begin to divide',
          marks: 1,
        },
        {
          text: 'Exponential phase: nutrients are plentiful and there is little competition or waste, and every organism can reproduce, so numbers double repeatedly',
          marks: 1,
        },
        {
          text: 'Stationary phase: nutrients run short and toxic waste accumulates',
          marks: 1,
        },
        {
          text: 'so the birth rate falls until it equals the death rate and the population stops increasing',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The stationary phase is a balance of births and deaths, not a stop in reproduction. Writing "they stop reproducing" loses the last mark.',
        zh: '稳定期是出生与死亡之间的平衡，而不是繁殖停止。写"它们停止繁殖"会丢掉最后一分。',
      },
    },
    {
      id: '0610-19-1-cp6',
      syllabus: ['0610.19.3.3'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe the roles of four types of microorganism in the nitrogen cycle.',
      markScheme: [
        {
          text: 'Nitrogen-fixing bacteria convert nitrogen gas into nitrogen compounds plants can use',
          marks: 1,
        },
        {
          text: 'Decomposers break down proteins in dead organisms and waste, releasing ammonium compounds',
          marks: 1,
        },
        {
          text: 'Nitrifying bacteria oxidise ammonium to nitrite and then to nitrate, the form roots absorb',
          marks: 1,
        },
        { text: 'Denitrifying bacteria convert nitrate back to nitrogen gas', marks: 1 },
      ],
      examinerNote: {
        en: 'Four groups, four different jobs. The commonest error is to swap nitrifying and denitrifying — nitrifying builds nitrate up, denitrifying takes it away.',
        zh: '四类微生物，四种不同的作用。最常见的错误是把硝化与反硝化搞反——硝化生成硝酸盐，反硝化则把它带走。',
      },
    },
    {
      id: '0610-19-1-cp7',
      syllabus: ['0610.19.2.10'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'In a food web, seals eat cod, and cod eat herring. Predict the effect on the numbers of seals and of herring if cod are overharvested by fishing, and explain your answer.',
      markScheme: [
        { text: 'The number of seals would fall', marks: 1 },
        { text: 'because cod are a food source for them, so less food is available', marks: 1 },
        {
          text: 'The number of herring would rise, because fewer cod are eating them',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Work outwards in both directions: what eats it, and what it eats. Answering only about the seals leaves half the food web untouched.',
        zh: '要向两个方向推：谁吃它，以及它吃谁。只回答海豹的部分，就漏掉了食物网的另一半。',
      },
    },
  ],
}

export default lesson
