import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-1-gas-exchange',
  subject: '0610',
  syllabus: [
    '0610.11.1.1',
    '0610.11.1.2',
    '0610.11.1.3',
    '0610.11.1.4',
    '0610.11.1.5',
    '0610.11.1.6',
    '0610.11.1.7',
    '0610.11.1.8',
    '0610.11.1.9',
    '0610.11.1.10',
    '0610.11.1.11',
    '0610.12.1.1',
    '0610.12.1.2',
    '0610.12.2.1',
    '0610.12.2.2',
    '0610.12.2.3',
    '0610.12.3.1',
    '0610.12.3.2',
    '0610.12.3.3',
    '0610.12.3.4',
    '0610.12.3.5',
    '0610.12.3.6',
    '0610.12.3.7',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Gas exchange and respiration', zh: '气体交换与呼吸作用' },
  summary: {
    en: 'Why do you keep panting after you have stopped running? Because the running is over and the debt is not.',
    zh: '为什么停下来之后还在喘？因为跑步结束了，债还没还完。',
  },

  objectives: [
    {
      en: 'Describe the features of gas exchange surfaces and identify the parts of the breathing system.',
      zh: '描述气体交换表面的特征，并识别呼吸系统的组成部分。',
    },
    {
      en: 'Describe and explain the differences in composition between inspired and expired air. (Extended)',
      zh: '描述并解释吸入与呼出气体成分的差异。（Extended）',
    },
    {
      en: 'Explain the roles of the ribs, intercostal muscles and diaphragm in breathing. (Extended)',
      zh: '解释肋骨、肋间肌与膈在呼吸中的作用。（Extended）',
    },
    {
      en: 'Explain the roles of goblet cells, mucus and ciliated cells in protecting the airways. (Extended)',
      zh: '解释杯状细胞、黏液与纤毛细胞对气道的保护作用。（Extended）',
    },
    {
      en: 'State the uses of the energy released by respiration, and the equations for aerobic respiration.',
      zh: '说出呼吸作用释放的能量的用途，以及有氧呼吸的方程式。',
    },
    {
      en: 'State the word equations for anaerobic respiration in muscles and in yeast.',
      zh: '写出肌肉与酵母中无氧呼吸的文字表达式。',
    },
    {
      en: 'Explain the oxygen debt and how it is removed after exercise. (Extended)',
      zh: '解释氧债，以及运动后如何偿还。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'alveolus',
      zh: '肺泡',
      definition: {
        en: 'A tiny air sac in the lung, one cell thick and wrapped in capillaries. Hundreds of millions give an enormous surface area.',
        zh: '肺内微小的气囊，壁仅一个细胞厚，外面缠绕着毛细血管。数亿个肺泡提供了极大的表面积。',
      },
      syllabus: ['0610.11.1.1'],
    },
    {
      en: 'respiration',
      zh: '呼吸作用',
      definition: {
        en: 'The release of energy from nutrient molecules in every living cell. Not the same thing as breathing.',
        zh: '在每个活细胞中从营养分子释放能量的过程。它与"呼吸（换气）"不是一回事。',
      },
      syllabus: ['0610.12.1.1'],
    },
    {
      en: 'anaerobic respiration',
      zh: '无氧呼吸',
      definition: {
        en: 'Releasing energy from glucose without oxygen. Far less energy per molecule — about 2 ATP against 32.',
        zh: '在无氧条件下从葡萄糖释放能量。每分子释放的能量少得多——约 2 个 ATP 对 32 个。',
      },
      syllabus: ['0610.12.3.1', '0610.12.3.2'],
    },
    {
      en: 'oxygen debt',
      zh: '氧债',
      definition: {
        en: 'The extra oxygen needed after exercise to break down the lactic acid built up during it.',
        zh: '运动后为分解运动中积累的乳酸所额外需要的氧。',
      },
      syllabus: ['0610.12.3.6', '0610.12.3.7'],
    },
    {
      en: 'goblet cell',
      zh: '杯状细胞',
      definition: {
        en: 'A cell in the airway lining that secretes mucus to trap dust and bacteria.',
        zh: '气道内衬中分泌黏液、粘住灰尘与细菌的细胞。',
      },
      syllabus: ['0610.11.1.11'],
    },
  ],

  equations: [
    {
      latex:
        '\\mathrm{C_6H_{12}O_6} + 6\\,\\mathrm{O_2} \\rightarrow 6\\,\\mathrm{CO_2} + 6\\,\\mathrm{H_2O}',
      meaning: {
        en: 'Aerobic respiration. The reverse of photosynthesis, atom for atom — and about 32 ATP per glucose.',
        zh: '有氧呼吸。逐个原子来看，它正是光合作用的逆过程——每分子葡萄糖约产生 32 个 ATP。',
      },
      substitute: (r) =>
        `\\text{aerobic ceiling } ${r['ceiling'] ?? 0} \\quad \\text{demand } ${r['demand'] ?? 0}`,
    },
    {
      latex: '\\mathrm{C_6H_{12}O_6} \\rightarrow 2\\,\\mathrm{C_2H_5OH} + 2\\,\\mathrm{CO_2}',
      meaning: {
        en: 'Anaerobic respiration in yeast: ethanol and carbon dioxide. In muscle the product is lactic acid instead. Either way, about 2 ATP per glucose.',
        zh: '酵母的无氧呼吸：生成乙醇和二氧化碳。在肌肉中产物则是乳酸。无论哪种，每分子葡萄糖约只产生 2 个 ATP。',
      },
      substitute: (r) =>
        `\\text{shortfall } ${r['shortfall'] ?? 0} \\quad \\text{peak lactic acid } ${r['peakLactate'] ?? 0} \\quad \\text{recovery } ${r['recovery'] ?? 0}\\ \\mathrm{min}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '11-1-gas-exchange',
    hint: {
      en: 'Push the intensity past the aerobic ceiling and watch the second graph lift off zero. Then watch the lactic acid after the exercise stops.',
      zh: '把强度推过有氧上限，看第二张图如何从零抬起。然后观察运动停止后的乳酸变化。',
    },
    params: [
      {
        key: 'intensity',
        label: { en: 'How hard the exercise is', zh: '运动强度' },
        unit: '%',
        min: 0,
        max: 150,
        step: 5,
        default: 80,
      },
      {
        key: 'duration',
        label: { en: 'How long it lasts', zh: '持续时间' },
        unit: 'min',
        min: 0,
        max: 15,
        step: 1,
        default: 4,
      },
      {
        key: 'fitness',
        label: { en: 'How well trained the person is', zh: '训练程度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 30,
      },
    ],
    readouts: [
      {
        key: 'ceiling',
        label: { en: 'Most that oxygen can supply', zh: '有氧供应的上限' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'demand',
        label: { en: 'Energy demanded', zh: '所需能量' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'shortfall',
        label: { en: 'Must come without oxygen', zh: '必须由无氧提供' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peakLactate',
        label: { en: 'Most lactic acid built up', zh: '乳酸积累的峰值' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'recovery',
        label: { en: 'Time to repay the debt', zh: '偿还氧债所需时间' },
        unit: 'min',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A gentle jog: all aerobic', zh: '慢跑：全部有氧' },
        params: { intensity: 60, duration: 6, fitness: 30 },
      },
      {
        label: { en: 'Right at the ceiling', zh: '正好达到上限' },
        params: { intensity: 100, duration: 6, fitness: 30 },
      },
      {
        label: { en: 'A hard sprint', zh: '全力冲刺' },
        params: { intensity: 150, duration: 2, fitness: 30 },
      },
      {
        label: { en: 'Too hard for too long', zh: '强度过大且持续过久' },
        params: { intensity: 145, duration: 10, fitness: 30 },
      },
      {
        label: { en: 'The same pace, but trained', zh: '同样的强度，但受过训练' },
        params: { intensity: 145, duration: 10, fitness: 100 },
      },
      {
        label: { en: 'Sitting still', zh: '静坐不动' },
        params: { intensity: 0, duration: 6, fitness: 30 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-11-1-cp1',
      syllabus: ['0610.12.3.6', '0610.12.3.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'After finishing a sprint, an athlete continues to breathe deeply and rapidly for several minutes. Explain why.',
      markScheme: [
        {
          text: 'During the sprint the demand for energy exceeded what aerobic respiration could supply, so muscles respired anaerobically',
          marks: 1,
        },
        { text: 'Anaerobic respiration in muscle produces lactic acid, which built up', marks: 1 },
        {
          text: 'Oxygen is needed to break the lactic acid down — this extra oxygen is the oxygen debt',
          marks: 1,
        },
        {
          text: 'So breathing stays deep and rapid until enough oxygen has been taken in to repay it',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Name the lactic acid and name the debt. "The body needs more oxygen" is true of the sprint itself, not of the minutes afterwards, and does not answer the question asked.',
        zh: '要点出乳酸，也要点出氧债。"身体需要更多氧气"说的是冲刺过程本身，而不是之后那几分钟，答的不是题目问的。',
      },
    },
    {
      id: '0610-11-1-cp2',
      syllabus: ['0610.12.3.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A muscle respiring anaerobically uses far more glucose than one respiring aerobically to release the same amount of energy. Explain why, and state the products of each.',
      markScheme: [
        {
          text: 'Aerobic respiration releases about 32 ATP per glucose molecule; anaerobic respiration in muscle releases only about 2',
          marks: 1,
        },
        {
          text: 'so many more glucose molecules must be broken down to release the same energy',
          marks: 1,
        },
        {
          text: 'Aerobic products are carbon dioxide and water; the anaerobic product in muscle is lactic acid',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Anaerobic respiration does not break glucose down completely — the lactic acid still contains most of the energy, which is why it can be oxidised later.',
        zh: '无氧呼吸并没有把葡萄糖彻底分解——乳酸中仍保有大部分能量，这正是它之后可以被氧化的原因。',
      },
    },
    {
      id: '0610-11-1-cp3',
      syllabus: ['0610.11.1.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how air is drawn into the lungs during inhalation.',
      markScheme: [
        {
          text: 'The external intercostal muscles contract, pulling the ribs upwards and outwards',
          marks: 1,
        },
        { text: 'The diaphragm muscle contracts and flattens, moving downwards', marks: 1 },
        { text: 'The volume of the thorax increases, so the pressure inside decreases', marks: 1 },
        {
          text: 'Air flows in from the atmosphere, down the pressure gradient, until the pressures are equal',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Volume changes and pressure follows — get them in that order. The diaphragm flattens when it contracts, which surprises students who expect a contracting muscle to bunch up.',
        zh: '先容积变化，压力随之改变——顺序不能反。膈肌收缩时是变平的，这一点常让以为"肌肉收缩就会隆起"的学生感到意外。',
      },
    },
    {
      id: '0610-11-1-cp4',
      syllabus: ['0610.11.1.9'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Expired air contains less oxygen and about a hundred times more carbon dioxide than inspired air. Explain why.',
      markScheme: [
        {
          text: 'Cells respire aerobically, using oxygen and producing carbon dioxide',
          marks: 1,
        },
        {
          text: 'Oxygen diffuses from the alveoli into the blood, down a concentration gradient, and is carried to the cells',
          marks: 1,
        },
        {
          text: 'Carbon dioxide diffuses from the blood into the alveoli, down its own gradient, and is breathed out',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The change happens in the cells, not in the lungs. The lungs are where the exchange occurs; respiration is what creates the gradients that drive it.',
        zh: '变化发生在细胞里，而不是肺里。肺是进行交换的场所；呼吸作用才是制造出驱动交换的浓度梯度的原因。',
      },
    },
    {
      id: '0610-11-1-cp5',
      syllabus: ['0610.11.1.11'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain how goblet cells and ciliated cells protect the lungs, and suggest why a smoker is more likely to develop a chest infection.',
      markScheme: [
        {
          text: 'Goblet cells secrete mucus, which traps dust particles and bacteria in the airway',
          marks: 1,
        },
        {
          text: 'Ciliated cells beat their cilia to sweep the mucus up towards the throat, where it is swallowed',
          marks: 1,
        },
        {
          text: 'Smoking paralyses or destroys the cilia, so mucus and trapped bacteria are not removed and accumulate in the lungs',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two cell types, two different jobs. And the smoking mark is about the cilia specifically, not about smoke being generally harmful.',
        zh: '两种细胞，两项不同的工作。而与吸烟有关的那一分，说的正是纤毛，而不是笼统的"烟有害"。',
      },
    },
    {
      id: '0610-11-1-cp6',
      syllabus: ['0610.12.1.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State three uses of the energy released by respiration in a mammal.',
      markScheme: [
        { text: 'Muscle contraction, giving movement', marks: 1 },
        { text: 'Active transport of substances across membranes', marks: 1 },
        {
          text: 'Building large molecules from small ones (such as proteins from amino acids), cell division and growth, or maintaining a constant body temperature',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Maintaining body temperature only applies to mammals and birds, and is worth including because the question says mammal.',
        zh: '"维持体温"只适用于哺乳动物和鸟类；因为题目说的是哺乳动物，写上它是值得的。',
      },
    },
    {
      id: '0610-11-1-cp7',
      syllabus: ['0610.12.1.2'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'Yeast is mixed with glucose solution and the volume of carbon dioxide produced is measured at temperatures from 10 °C to 60 °C. Predict the shape of the graph of rate against temperature, and explain it.',
      markScheme: [
        {
          text: 'The rate increases as the temperature rises from 10 °C, reaching a maximum at an optimum temperature',
          marks: 1,
        },
        {
          text: 'because the molecules have more kinetic energy, so there are more successful collisions between enzymes and substrate',
          marks: 1,
        },
        {
          text: 'Above the optimum the rate falls sharply, because the enzymes controlling respiration are denatured and their active sites change shape',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the enzyme curve again, in a new setting. Respiration is a series of enzyme-controlled reactions, so it has the same optimum and the same collapse.',
        zh: '这又是酶的曲线，只是换了场景。呼吸作用是一系列由酶控制的反应，因此有同样的最适点和同样的骤降。',
      },
    },
  ],
}

export default lesson
