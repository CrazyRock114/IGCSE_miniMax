import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '14-3-homeostasis',
  subject: '0610',
  syllabus: [
    '0610.14.3.1',
    '0610.14.3.2',
    '0610.14.3.3',
    '0610.14.3.4',
    '0610.14.3.5',
    '0610.14.3.6',
    '0610.14.4.1',
    '0610.14.4.2',
    '0610.14.4.3',
    '0610.14.4.4',
    '0610.14.4.5',
    '0610.14.4.6',
    '0610.14.4.7',
    '0610.14.4.8',
    '0610.14.5.1',
    '0610.14.5.2',
    '0610.14.5.3',
    '0610.14.5.4',
    '0610.14.5.5',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'Hormones, homeostasis and tropisms', zh: '激素、稳态与向性' },
  summary: {
    en: 'Homeostasis does not hold a value at the set point. It chases one — always correcting something that has already happened, which is why the graph wobbles instead of going flat.',
    zh: '稳态并不是把数值"保持"在设定点上，而是在"追赶"它——永远在校正已经发生的偏离。这正是曲线总在波动、而不是变平的原因。',
  },

  objectives: [
    {
      en: 'Describe a hormone as a chemical made by a gland and carried in the blood, and identify the endocrine glands and their hormones.',
      zh: '把激素描述为由腺体产生、经血液运输的化学物质，并识别内分泌腺及其分泌的激素。',
    },
    {
      en: 'Describe adrenaline as the fight-or-flight hormone and state its effects.',
      zh: '把肾上腺素描述为"战或逃"激素，并说明其作用。',
    },
    { en: 'Compare nervous and hormonal control.', zh: '比较神经调节与激素调节。' },
    {
      en: 'Describe homeostasis as maintaining a constant internal environment, and explain it as negative feedback around a set point. (Extended)',
      zh: '把稳态描述为维持内环境恒定，并用围绕设定点的负反馈加以解释。（Extended）',
    },
    {
      en: 'Describe the control of blood glucose by insulin and glucagon, and outline the treatment of Type 1 diabetes. (Extended)',
      zh: '描述胰岛素与胰高血糖素对血糖的调控，并概述 1 型糖尿病的治疗。（Extended）',
    },
    {
      en: 'Identify the structures of the skin and describe temperature control by sweating, vasodilation, vasoconstriction and shivering. (Extended)',
      zh: '识别皮肤的结构，并用出汗、血管舒张与收缩、寒战描述体温调节。（Extended）',
    },
    {
      en: 'Describe gravitropism and phototropism, and investigate them in shoots and roots.',
      zh: '描述向重力性与向光性，并在茎与根中加以探究。',
    },
    {
      en: 'Explain the role of auxin in controlling shoot growth. (Extended)',
      zh: '解释生长素在控制茎生长中的作用。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'homeostasis',
      zh: '稳态',
      definition: {
        en: 'Maintaining a constant internal environment. Not holding a value exactly, but correcting departures from it.',
        zh: '维持内环境的恒定。不是把数值精确地固定住，而是不断校正对它的偏离。',
      },
      syllabus: ['0610.14.4.1'],
    },
    {
      en: 'negative feedback',
      zh: '负反馈',
      definition: {
        en: 'A response that opposes the change that produced it. A rise triggers what lowers it; a fall triggers what raises it.',
        zh: '一种与引起它的变化方向相反的反应。升高时触发降低它的机制，降低时触发升高它的机制。',
      },
      syllabus: ['0610.14.4.3'],
    },
    {
      en: 'set point',
      zh: '设定点',
      definition: {
        en: 'The value the body defends. For blood glucose about 5 mmol/dm³; for core temperature 37 °C.',
        zh: '身体所维护的数值。血糖约为 5 mmol/dm³，核心体温为 37 °C。',
      },
      syllabus: ['0610.14.4.3'],
    },
    {
      en: 'glycogen',
      zh: '糖原',
      definition: {
        en: 'The store the liver and muscles keep glucose in. Insulin puts glucose into it; glucagon takes it back out.',
        zh: '肝脏与肌肉贮存葡萄糖的形式。胰岛素把葡萄糖存进去，胰高血糖素把它取出来。',
      },
      syllabus: ['0610.14.4.4'],
    },
    {
      en: 'vasodilation',
      zh: '血管舒张',
      definition: {
        en: 'Widening of the arterioles supplying the surface capillaries, so more blood flows near the skin and more energy is lost. The capillaries themselves do not move.',
        zh: '供应体表毛细血管的小动脉舒张，使更多血液流经皮肤附近，散失更多热量。毛细血管本身并不移动。',
      },
      syllabus: ['0610.14.4.7'],
    },
    {
      en: 'auxin',
      zh: '生长素',
      definition: {
        en: 'A plant hormone made at a shoot tip that makes cells elongate. Light moves it to the shaded side.',
        zh: '在茎尖产生、使细胞伸长的植物激素。光使它移向背光的一侧。',
      },
      syllabus: ['0610.14.5.5'],
    },
    {
      en: 'tropism',
      zh: '向性',
      definition: {
        en: 'A growth response in which the direction of growth depends on the direction of the stimulus.',
        zh: '一种生长反应，其生长方向取决于刺激的方向。',
      },
      syllabus: ['0610.14.5.1', '0610.14.5.2'],
    },
  ],

  equations: [
    {
      latex: '\\text{glucose} \\;\\xrightarrow{\\;\\text{insulin}\\;}\\; \\text{glycogen}',
      meaning: {
        en: 'Insulin makes the liver and muscles take glucose out of the blood and store it. It lowers blood glucose.',
        zh: '胰岛素促使肝脏和肌肉把葡萄糖从血液中取走并贮存起来。它降低血糖。',
      },
      substitute: (r) =>
        `\\text{peak } ${r['peak'] ?? 0}\\ \\mathrm{mmol\\,dm^{-3}} \\quad \\text{trough } ${r['trough'] ?? 0}\\ \\mathrm{mmol\\,dm^{-3}}`,
    },
    {
      latex: '\\text{glycogen} \\;\\xrightarrow{\\;\\text{glucagon}\\;}\\; \\text{glucose}',
      meaning: {
        en: 'Glucagon does the reverse, releasing stored glucose back into the blood. It raises blood glucose.',
        zh: '胰高血糖素做相反的事，把贮存的葡萄糖释放回血液。它升高血糖。',
      },
      substitute: (r) =>
        `\\text{above } 10\\ \\mathrm{mmol\\,dm^{-3}}\\text{: } ${r['urine'] ?? 0}\\ \\mathrm{min} \\quad \\text{back to normal: } ${r['settle'] ?? 0}\\ \\mathrm{min}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '14-3-homeostasis',
    hint: {
      en: 'Eat a meal with a healthy pancreas first. Then set the insulin response to zero, and try to treat it with an injection.',
      zh: '先用健康的胰腺吃一餐。然后把胰岛素反应设为零，再试着用注射来治疗。',
    },
    params: [
      {
        key: 'meal',
        label: { en: 'Carbohydrate in the meal', zh: '这一餐的糖类' },
        unit: 'g',
        min: 0,
        max: 120,
        step: 10,
        default: 60,
      },
      {
        key: 'insulin',
        label: { en: 'Insulin the pancreas can make', zh: '胰腺能分泌的胰岛素' },
        unit: '%',
        min: 0,
        max: 150,
        step: 5,
        default: 100,
      },
      {
        key: 'injection',
        label: { en: 'Insulin injected', zh: '注射的胰岛素' },
        unit: '%',
        min: 0,
        max: 250,
        step: 10,
        default: 0,
      },
      {
        key: 'delay',
        label: { en: 'Delay before the pancreas responds', zh: '胰腺作出反应前的延迟' },
        unit: 'min',
        min: 0,
        // Beyond about 25 minutes this stops being a body correcting itself late and
        // becomes an oscillator that never settles — true of the maths, not of a person.
        max: 25,
        step: 1,
        default: 10,
      },
    ],
    readouts: [
      {
        key: 'peak',
        label: { en: 'Highest glucose', zh: '血糖最高值' },
        unit: 'mmol/dm³',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'trough',
        label: { en: 'Lowest glucose', zh: '血糖最低值' },
        unit: 'mmol/dm³',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'urine',
        label: { en: 'Time with glucose in the urine', zh: '尿中含葡萄糖的时长' },
        unit: 'min',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'settle',
        label: { en: 'Time back to normal', zh: '恢复正常所需时间' },
        unit: 'min',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A normal meal', zh: '普通的一餐' },
        params: { meal: 60, insulin: 100, injection: 0, delay: 10 },
      },
      {
        label: { en: 'A very large meal', zh: '很大的一餐' },
        params: { meal: 120, insulin: 100, injection: 0, delay: 10 },
      },
      {
        label: { en: 'A slow pancreas: overshoot', zh: '反应迟缓的胰腺：过冲' },
        params: { meal: 60, insulin: 100, injection: 0, delay: 25 },
      },
      {
        label: { en: 'Type 1 diabetes, untreated', zh: '未经治疗的 1 型糖尿病' },
        params: { meal: 60, insulin: 0, injection: 0, delay: 10 },
      },
      {
        label: { en: 'Treated with an injection', zh: '用注射治疗' },
        params: { meal: 60, insulin: 0, injection: 100, delay: 10 },
      },
      {
        label: { en: 'Too much insulin: a hypo', zh: '胰岛素过量：低血糖' },
        params: { meal: 60, insulin: 0, injection: 250, delay: 10 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-14-3-cp1',
      syllabus: ['0610.14.4.3', '0610.14.4.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the concentration of glucose in the blood is returned to normal after a meal.',
      markScheme: [
        { text: 'The blood glucose concentration rises above the set point', marks: 1 },
        { text: 'This is detected by the pancreas, which secretes insulin into the blood', marks: 1 },
        {
          text: 'Insulin causes the liver and muscles to take up glucose and convert it to glycogen for storage',
          marks: 1,
        },
        {
          text: 'So the blood glucose concentration falls back towards the set point — the response opposes the change, which is negative feedback',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Four links: change, detector, response, effect. Naming insulin alone is one mark out of four — the marks are in the chain, not in the word.',
        zh: '四个环节：变化、检测者、反应、效果。只写出"胰岛素"四分之一分——得分在于这条链条，而不在于那个词。',
      },
    },
    {
      id: '0610-14-3-cp2',
      syllabus: ['0610.14.4.5'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A person with Type 1 diabetes injects their usual dose of insulin before a meal, but then eats much less than they had planned. Suggest what happens to their blood glucose concentration and why.',
      markScheme: [
        {
          text: 'The blood glucose falls too low — below the normal range (hypoglycaemia)',
          marks: 1,
        },
        {
          text: 'The injected insulin goes on removing glucose from the blood regardless of the concentration, because it is not controlled by the body',
          marks: 1,
        },
        {
          text: 'Less glucose than expected was absorbed from the meal, so there is not enough to balance the dose',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The heart of it is that an injection is not part of the feedback loop. A pancreas would simply secrete less; a syringe cannot take anything back.',
        zh: '核心在于：注射并不属于这个反馈回路。胰腺可以少分泌一些，注射器却收不回任何东西。',
      },
    },
    {
      id: '0610-14-3-cp3',
      syllabus: ['0610.14.3.4'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare nervous control and hormonal control in a mammal. Give three differences.',
      markScheme: [
        {
          text: 'Nervous: electrical impulses along neurones. Hormonal: chemicals carried in the blood',
          marks: 1,
        },
        {
          text: 'Nervous: very fast, acting in milliseconds. Hormonal: slower, taking seconds or longer',
          marks: 1,
        },
        {
          text: 'Nervous: acts on a precise target and the effect is short-lived. Hormonal: reaches the whole body and the effect is longer-lasting',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Compare" wants both sides of each difference in the same sentence. Writing three facts about nerves and nothing about hormones scores nothing at all.',
        zh: '"Compare"要求在同一句中写出每一点差异的两边。只写三条关于神经的事实而不提激素，一分都得不到。',
      },
    },
    {
      id: '0610-14-3-cp4',
      syllabus: ['0610.14.3.3', '0610.14.3.6'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain how the effects of adrenaline prepare the body for vigorous physical activity.',
      markScheme: [
        {
          text: 'It increases the heart rate and the breathing rate, so more oxygen and glucose reach the muscles and more carbon dioxide is removed',
          marks: 1,
        },
        {
          text: 'It causes the liver to break down glycogen, raising the blood glucose concentration so more is available for respiration',
          marks: 1,
        },
        {
          text: 'Blood is diverted from the gut to the muscles, so the muscles receive a greater share of the supply',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Every effect must be tied to respiration in muscle. "It makes your heart beat faster" is an observation; the mark is for saying what the faster heartbeat delivers.',
        zh: '每一项作用都要与肌肉中的呼吸作用挂钩。"它让心跳加快"只是现象；得分点在于说明心跳加快送去了什么。',
      },
    },
    {
      id: '0610-14-3-cp5',
      syllabus: ['0610.14.4.7'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how the human body reduces its core temperature when it becomes too hot.',
      markScheme: [
        {
          text: 'The hypothalamus detects the rise in the temperature of the blood flowing through it',
          marks: 1,
        },
        {
          text: 'Sweat glands release more sweat onto the surface of the skin',
          marks: 1,
        },
        {
          text: 'As the sweat evaporates it takes energy from the body, cooling it',
          marks: 1,
        },
        {
          text: 'Vasodilation: the arterioles supplying the surface capillaries widen, so more blood flows near the surface and more energy is transferred to the surroundings',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Sweating cools only when it evaporates — "sweat cools you down" without the evaporation loses a mark. And it is the arterioles that widen, not the capillaries that move.',
        zh: '出汗只有在蒸发时才降温——只写"出汗使人凉快"而不提蒸发会丢一分。另外，舒张的是小动脉，而不是毛细血管在移动。',
      },
    },
    {
      id: '0610-14-3-cp6',
      syllabus: ['0610.14.5.4', '0610.14.5.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'A shoot is lit from one side only. Explain why it grows towards the light.',
      markScheme: [
        { text: 'Auxin is produced at the tip of the shoot', marks: 1 },
        { text: 'The light causes the auxin to move to the shaded side', marks: 1 },
        {
          text: 'Auxin causes the cells there to elongate, so the shaded side grows longer than the lit side',
          marks: 1,
        },
        { text: 'The unequal growth makes the shoot bend towards the light', marks: 1 },
      ],
      examinerNote: {
        en: 'Four steps in this order. The one most often missed is that auxin *moves* — students write that more auxin is made on the shaded side, which is not what happens.',
        zh: '按这个顺序答四步。最常被漏掉的一点是生长素会"移动"——学生往往写成背光侧产生了更多生长素，而事实并非如此。',
      },
    },
    {
      id: '0610-14-3-cp7',
      syllabus: ['0610.14.5.1', '0610.14.5.3'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 2,
      stem: 'A germinating seedling is laid on its side in the dark. Predict the direction in which the root and the shoot will grow, and name the response.',
      markScheme: [
        { text: 'The root grows downwards and the shoot grows upwards', marks: 1 },
        {
          text: 'This is gravitropism: the root is positively gravitropic and the shoot negatively gravitropic',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The seedling is in the dark, so light plays no part — answering "phototropism" ignores the one condition the question bothered to state.',
        zh: '幼苗在黑暗中，因此光不起作用——答"向光性"就忽略了题目特意交代的那个唯一条件。',
      },
    },
  ],
}

export default lesson
