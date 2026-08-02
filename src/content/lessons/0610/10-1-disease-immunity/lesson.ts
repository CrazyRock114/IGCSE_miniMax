import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '10-1-disease-immunity',
  subject: '0610',
  syllabus: [
    '0610.10.1.1',
    '0610.10.1.2',
    '0610.10.1.3',
    '0610.10.1.4',
    '0610.10.1.5',
    '0610.10.1.6',
    '0610.10.1.7',
    '0610.10.1.8',
    '0610.10.1.9',
    '0610.10.1.10',
    '0610.10.1.11',
    '0610.10.1.12',
    '0610.10.1.13',
    '0610.10.1.14',
    '0610.10.1.15',
    '0610.10.1.16',
    '0610.10.1.17',
    '0610.15.1.1',
    '0610.15.1.2',
    '0610.15.1.3',
    '0610.15.1.4',
    '0610.15.1.5',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Disease, immunity and drugs', zh: '疾病、免疫与药物' },
  summary: {
    en: 'Being immune does not mean you cannot be infected. It means the memory cells are already there, so you deal with it before you notice.',
    zh: '免疫并不意味着你不会被感染，而是记忆细胞已经就位，你在察觉之前就把它解决了。',
  },

  objectives: [
    {
      en: 'Describe pathogens and transmissible diseases, and state the routes of transmission.',
      zh: '描述病原体与传染病，并说出传播途径。',
    },
    {
      en: 'Describe the body’s defences, and explain how hygiene and waste disposal control the spread of disease.',
      zh: '描述身体的防御，并解释卫生与废物处理如何控制疾病传播。',
    },
    {
      en: 'Describe active immunity, antigens, antibodies and their complementary shapes. (Extended)',
      zh: '描述主动免疫、抗原、抗体及其互补的形状。（Extended）',
    },
    {
      en: 'Outline vaccination and explain its role in controlling the spread of disease. (Extended)',
      zh: '概述接种疫苗，并解释其在控制疾病传播中的作用。（Extended）',
    },
    {
      en: 'Explain passive immunity, its importance in breast-feeding, and why no memory cells are made. (Extended)',
      zh: '解释被动免疫、它在母乳喂养中的重要性，以及为何不产生记忆细胞。（Extended）',
    },
    {
      en: 'Describe cholera and explain how its toxin causes diarrhoea and dehydration. (Extended)',
      zh: '描述霍乱，并解释其毒素如何引起腹泻与脱水。（Extended）',
    },
    {
      en: 'Describe the use of antibiotics, why they do not affect viruses, and how resistance arises.',
      zh: '描述抗生素的用途、它们为何对病毒无效，以及耐药性如何产生。',
    },
  ],

  glossary: [
    {
      en: 'pathogen',
      zh: '病原体',
      definition: { en: 'An organism that causes disease.', zh: '引起疾病的生物。' },
      syllabus: ['0610.10.1.1'],
    },
    {
      en: 'antigen',
      zh: '抗原',
      definition: {
        en: 'A molecule on the surface of a pathogen with a particular shape. Each pathogen has its own.',
        zh: '病原体表面具有特定形状的分子。每种病原体都有自己的抗原。',
      },
      syllabus: ['0610.10.1.7'],
    },
    {
      en: 'antibody',
      zh: '抗体',
      definition: {
        en: 'A protein made by lymphocytes, with a shape complementary to one specific antigen.',
        zh: '由淋巴细胞产生的蛋白质，其形状与某一特定抗原互补。',
      },
      syllabus: ['0610.10.1.8', '0610.10.1.9'],
    },
    {
      en: 'memory cell',
      zh: '记忆细胞',
      definition: {
        en: 'A long-lived lymphocyte left after an infection or vaccination. It is why the second response is so much faster.',
        zh: '感染或接种后留存下来的长寿淋巴细胞。第二次反应之所以快得多，原因就在于它。',
      },
      syllabus: ['0610.10.1.10', '0610.10.1.15'],
    },
    {
      en: 'passive immunity',
      zh: '被动免疫',
      definition: {
        en: 'Short-term protection by antibodies made elsewhere. Immediate, but no memory cells and so no lasting protection.',
        zh: '由别处产生的抗体提供的短期保护。立即起效，但不产生记忆细胞，因而不持久。',
      },
      syllabus: ['0610.10.1.13'],
    },
    {
      en: 'antibiotic',
      zh: '抗生素',
      definition: {
        en: 'A drug that kills bacteria by attacking structures they have and human cells do not. It has no effect on viruses.',
        zh: '通过攻击细菌有而人体细胞没有的结构来杀灭细菌的药物。对病毒无效。',
      },
      syllabus: ['0610.15.1.2', '0610.15.1.4'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'plot2d',
    kernel: '10-1-disease-immunity',
    hint: {
      en: 'Compare the two antibody peaks, then switch on passive immunity and watch the second one collapse.',
      zh: '先比较两个抗体峰，然后打开"被动免疫"，看第二个峰如何塌掉。',
    },
    params: [
      {
        key: 'secondExposure',
        label: { en: 'Day of the second exposure', zh: '第二次接触的日期' },
        unit: '',
        min: 10,
        max: 120,
        step: 5,
        default: 60,
      },
      {
        key: 'vaccinated',
        label: { en: 'First exposure was', zh: '第一次接触的形式' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'A live infection', zh: '真实感染' } },
          { value: 1, label: { en: 'A vaccination', zh: '接种疫苗' } },
        ],
      },
      {
        key: 'passive',
        label: { en: 'Antibodies were', zh: '抗体的来源' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Made by the body', zh: '由自身产生' } },
          { value: 1, label: { en: 'Given directly', zh: '直接给予' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'firstLag',
        label: { en: 'Days before the first antibodies', zh: '首次出现抗体前的天数' },
        unit: 'days',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'secondLag',
        label: { en: 'Days before the second', zh: '第二次出现抗体前的天数' },
        unit: 'days',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'firstPeak',
        label: { en: 'First antibody peak', zh: '第一次抗体峰值' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'secondPeak',
        label: { en: 'Second antibody peak', zh: '第二次抗体峰值' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'illness',
        label: { en: 'Worst the illness got', zh: '病情最重时' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Infected twice', zh: '两次感染' },
        params: { secondExposure: 60, vaccinated: 0, passive: 0 },
      },
      {
        label: { en: 'Vaccinated, then exposed', zh: '先接种，后接触' },
        params: { secondExposure: 60, vaccinated: 1, passive: 0 },
      },
      {
        label: { en: 'Exposed years later', zh: '很久以后才接触' },
        params: { secondExposure: 115, vaccinated: 1, passive: 0 },
      },
      {
        label: { en: 'Passive: no memory cells', zh: '被动免疫：没有记忆细胞' },
        params: { secondExposure: 60, vaccinated: 0, passive: 1 },
      },
      {
        label: { en: 'A quick second exposure', zh: '很快的第二次接触' },
        params: { secondExposure: 25, vaccinated: 0, passive: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-10-1-cp1',
      syllabus: ['0610.10.1.10', '0610.10.1.11'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'A graph shows antibody concentration after a first exposure to a pathogen and after a second exposure to the same pathogen. Describe the differences between the two responses and explain what causes them.',
      markScheme: [
        {
          text: 'The second response begins sooner — antibodies appear after a much shorter delay',
          marks: 1,
        },
        { text: 'It reaches a much higher concentration of antibodies', marks: 1 },
        { text: 'and the antibodies remain at a raised level for longer', marks: 1 },
        {
          text: 'because memory cells produced during the first response are already present, already specific to that antigen, and can divide and produce antibodies immediately',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Three differences and one cause. Students routinely give "it is bigger" and stop — faster and longer are separate marks.',
        zh: '三点差异加一个原因。学生常常只写"更强"就停下了——"更快"和"更持久"是各自独立的得分点。',
      },
    },
    {
      id: '0610-10-1-cp2',
      syllabus: ['0610.10.1.11', '0610.10.1.12'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how vaccination protects a person against a disease, and how vaccinating most of a population protects those who have not been vaccinated.',
      markScheme: [
        {
          text: 'The vaccine contains a weakened or dead pathogen, or its antigens, which cannot cause the disease',
          marks: 1,
        },
        {
          text: 'Lymphocytes recognise the antigens and produce antibodies, exactly as in a real infection',
          marks: 1,
        },
        {
          text: 'Memory cells remain, so a later infection by the real pathogen produces a rapid secondary response before symptoms develop',
          marks: 1,
        },
        {
          text: 'If most of the population is immune the pathogen cannot pass easily from host to host, so it does not spread to the unvaccinated',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The last mark is about transmission, not about the individual. And a vaccine does not "give you antibodies" — it makes you produce your own.',
        zh: '最后一分讲的是"传播"，不是个体。另外，疫苗并不是"给你抗体"——它是让你自己产生抗体。',
      },
    },
    {
      id: '0610-10-1-cp3',
      syllabus: ['0610.10.1.13', '0610.10.1.14', '0610.10.1.15'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare active and passive immunity, and state one situation in which passive immunity is important.',
      markScheme: [
        {
          text: 'In active immunity the body produces its own antibodies; in passive immunity antibodies are received from elsewhere',
          marks: 1,
        },
        {
          text: 'Active immunity is slow to develop but long-lasting because memory cells are made; passive immunity is immediate but short-lived because no memory cells are made',
          marks: 1,
        },
        {
          text: 'A newborn receives antibodies across the placenta and in breast milk, protecting it while its own immune system develops',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The memory cells are the reason for the difference in duration — say so rather than just stating that one lasts longer.',
        zh: '记忆细胞正是持续时间不同的原因——要写出这一点，而不只是说"一个更持久"。',
      },
    },
    {
      id: '0610-10-1-cp4',
      syllabus: ['0610.10.1.17'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the cholera bacterium causes severe diarrhoea and dehydration.',
      markScheme: [
        { text: 'The bacterium produces a toxin', marks: 1 },
        {
          text: 'which causes the cells lining the small intestine to secrete chloride ions into the gut',
          marks: 1,
        },
        {
          text: 'This lowers the water potential of the gut contents below that of the cells',
          marks: 1,
        },
        {
          text: 'so water moves out of the cells and into the intestine by osmosis, producing watery diarrhoea and dehydrating the body',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is an osmosis question in disguise, and the water potential mark is the one most often missed. The bacterium never leaves the gut — it is the toxin that does the damage.',
        zh: '这实际上是一道伪装成疾病题的渗透题，而"水势"这一分最常被漏掉。细菌从未离开肠道——造成损害的是毒素。',
      },
    },
    {
      id: '0610-10-1-cp5',
      syllabus: ['0610.15.1.3', '0610.15.1.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how a population of bacteria becomes resistant to an antibiotic, and why antibiotics should only be used when they are essential.',
      markScheme: [
        {
          text: 'Random mutation produces a few bacteria in the population that are resistant to the antibiotic',
          marks: 1,
        },
        {
          text: 'When the antibiotic is used, the non-resistant bacteria are killed but the resistant ones survive',
          marks: 1,
        },
        {
          text: 'The survivors reproduce and pass on the resistance allele, so the proportion of resistant bacteria in the population increases',
          marks: 1,
        },
        {
          text: 'Every unnecessary use repeats this selection, so limiting use slows the increase in resistance',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The mutation comes first and by chance — bacteria do not become resistant because they were exposed. Writing "they get used to it" describes Lamarck, not natural selection.',
        zh: '突变是先发生的、而且是偶然的——细菌不是因为接触了药物才变得耐药。写"它们逐渐适应了"讲的是拉马克，不是自然选择。',
      },
    },
    {
      id: '0610-10-1-cp6',
      syllabus: ['0610.15.1.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'A patient with a cold asks for antibiotics. Explain why they would not help.',
      markScheme: [
        { text: 'A cold is caused by a virus, not by bacteria', marks: 1 },
        {
          text: 'Antibiotics kill bacteria by attacking structures such as the cell wall, which a virus does not have — and a virus reproduces inside the body’s own cells',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say what a virus lacks. "Antibiotics do not work on viruses" restates the question; the mark is for the reason.',
        zh: '要说出病毒"缺什么"。写"抗生素对病毒无效"只是把题目重述一遍；得分点在于原因。',
      },
    },
    {
      id: '0610-10-1-cp7',
      syllabus: ['0610.10.1.4', '0610.10.1.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe two ways in which the human body prevents pathogens from entering, and state one way in which good hygiene reduces the spread of disease.',
      markScheme: [
        {
          text: 'Skin acts as a barrier; or hairs and mucus in the nose trap particles; or cilia sweep mucus out of the airways',
          marks: 1,
        },
        {
          text: 'Stomach acid kills pathogens in food; or blood clots seal wounds against entry',
          marks: 1,
        },
        {
          text: 'Washing hands, treating sewage, providing clean drinking water or covering food breaks the transmission route',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'These are barriers and traps, not the immune response. Antibodies come after a pathogen has already got in.',
        zh: '这些是屏障和拦截机制，不是免疫反应。抗体是在病原体已经进入之后才登场的。',
      },
    },
  ],
}

export default lesson
