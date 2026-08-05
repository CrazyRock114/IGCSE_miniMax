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

  // Visual / interactive learning modules for Chapter 4b (14.3–14.5 — hormones,
  // homeostasis, tropisms). See src/content/types.ts for the `LessonExtra`
  // shape. Each module uses a real figure extracted from the G8 PDF so the
  // student sees the textbook picture, not a hand-drawn approximation.
  extras: [
    // 1) Blood glucose regulation — G8 Figure B9.20. The same diagram
    //    shown in three states: high (after a meal, insulin dominates),
    //    normal (set point, no signal), low (after exercise, glucagon
    //    dominates). Click the pancreas, the islets of Langerhans, the
    //    liver in either role, or the "normal" bubble to see what each
    //    one does in the active mode.
    {
      type: 'glucose-loop',
      id: 'glucose',
      title: { en: 'How blood glucose is held at 5 mmol/dm³', zh: '血糖如何被维持在 5 mmol/dm³' },
      hint: {
        en: 'Three snapshots of the same loop. The pancreas watches the blood; the liver is the store. Switch modes to see which hormone is firing.',
        zh: '同一个环的三种状态。胰腺监测血糖，肝脏是仓库。切换模式，看哪种激素在工作。',
      },
      parts: [
        {
          id: 'pancreas',
          name: { en: 'pancreas', zh: '胰腺' },
          description: {
            en: 'A gland that does two unrelated jobs. Most of it makes pancreatic juice for the duodenum; scattered through it are the islets of Langerhans, which make insulin and glucagon and release them straight into the blood.',
            zh: '一个腺体干两件不同的事。大部分组织为十二指肠制造胰液；散布其中的胰岛制造胰岛素和胰高血糖素，直接释放入血。',
          },
        },
        {
          id: 'islets-of-langerhans',
          name: { en: 'islets of Langerhans', zh: '胰岛' },
          description: {
            en: 'Small cell groups inside the pancreas. The β cells make insulin; the α cells make glucagon. They sense the blood glucose concentration directly — there is no separate "detector" organ, the gland is its own sensor.',
            zh: '胰腺里的小细胞团。β 细胞制造胰岛素；α 细胞制造胰高血糖素。它们直接感受血糖浓度——没有单独的"检测器"器官，腺体本身就是感受器。',
          },
        },
        {
          id: 'liver-uptake',
          name: { en: 'liver (taking up glucose)', zh: '肝脏（吸收葡萄糖）' },
          description: {
            en: 'When blood glucose is high, insulin tells the liver to take glucose out of the blood and store it as glycogen — an insoluble polysaccharide that can hold many glucose units without drawing water into the cell by osmosis. Glycogen is the body\'s short-term glucose reserve.',
            zh: '血糖高时，胰岛素命令肝脏把葡萄糖从血液中取出，以糖原形式贮存。糖原是不溶性的多糖——能装下许多葡萄糖单元，又不会因渗透压让水进入细胞。糖原是身体的短期葡萄糖储备。',
          },
        },
        {
          id: 'liver-release',
          name: { en: 'liver (releasing glucose)', zh: '肝脏（释放葡萄糖）' },
          description: {
            en: 'When blood glucose is low, glucagon tells the liver to break glycogen back down to glucose and release it into the blood. A healthy liver holds enough glycogen to keep blood glucose steady through a night of fasting; in heavy exercise it is gone in a couple of hours.',
            zh: '血糖低时，胰高血糖素命令肝脏把糖原分解为葡萄糖并释放到血液中。健康肝脏的糖原储备足以让血糖在一夜空腹里保持稳定；剧烈运动时则会在几小时内耗尽。',
          },
        },
        {
          id: 'normal-bubble',
          name: { en: 'set point (≈ 5 mmol/dm³)', zh: '设定点（约 5 mmol/dm³）' },
          description: {
            en: 'The value the body defends. Above it, the islets secrete insulin and the level falls; below it, they secrete glucagon and the level rises. The pancreas corrects the deviation whichever way the blood has moved — that is negative feedback.',
            zh: '身体所维持的数值。高过它，胰岛分泌胰岛素，血糖下降；低过它，胰岛分泌胰高血糖素，血糖上升。无论血糖偏向哪一侧，胰腺都把它拉回来——这就是负反馈。',
          },
        },
      ],
    },

    // 2) Temperature control — G8 Figure B9.17 (skin section) with three
    //    modes (hot, normal, cold). The skin has four "knobs" the body can
    //    turn up or down: arterioles, sweat glands, hair + erector
    //    muscles, and skeletal muscles (shivering). In the cold mode we
    //    also show G8 Figure B9.18 — the textbook's own diagram of the
    //    "body too cold" state.
    {
      type: 'temperature-control',
      id: 'temperature',
      title: { en: 'How the body holds 37 °C', zh: '身体如何把体温维持在 37 °C' },
      hint: {
        en: 'Three modes — too hot, normal, too cold. Click any organ to see how the hypothalamus has it set in the active mode.',
        zh: '三种模式：太热、正常、太冷。点击任一器官，看下丘脑在当前模式下让它怎么工作。',
      },
      parts: [
        {
          id: 'hypothalamus',
          name: { en: 'hypothalamus', zh: '下丘脑' },
          description: {
            en: 'A small region at the base of the brain. It contains the temperature receptors that monitor the blood running through it, and it sends nerve impulses to the skin, the sweat glands and the muscles. It is the body\'s thermostat — the control centre of the whole feedback loop.',
            zh: '脑底部的小区域。它含有监测流经血液温度的温度感受器，并向皮肤、汗腺和肌肉发出神经脉冲。它就是身体的恒温器——整个反馈回路的控制中心。',
          },
        },
        {
          id: 'epidermis',
          name: { en: 'epidermis', zh: '表皮' },
          description: {
            en: 'The outer layer of the skin. Cells at its base divide continuously; the new cells move outwards, fill with keratin, die and form the cornified layer that protects the body. The pigment melanin is made here, and it absorbs UV light that would otherwise damage the cells underneath.',
            zh: '皮肤外层。基部细胞不断分裂；新细胞向外推移，填满角蛋白，死了之后形成保护身体的角质层。黑色素在这里合成，吸收紫外线以免损伤下面细胞。',
          },
        },
        {
          id: 'dermis',
          name: { en: 'dermis', zh: '真皮' },
          description: {
            en: 'The lower, thicker layer of the skin. It contains the sweat glands, the hair follicles, the blood vessels and the temperature / pressure / pain receptors. Most of what the body does to control temperature happens here.',
            zh: '皮肤下层，更厚。包含汗腺、毛囊、血管、温度/压力/痛觉感受器。身体调控温度的大部分动作都发生在这里。',
          },
        },
        {
          id: 'sweat-gland',
          name: { en: 'sweat gland', zh: '汗腺' },
          description: {
            en: 'A coiled tube deep in the dermis that secretes sweat onto the surface of the skin. The sweat is mostly water, with salts and a little urea. As it evaporates, it takes latent heat from the body — that is the cooling mechanism, and it is the most powerful one the body has.',
            zh: '真皮深处盘曲的管子，向皮肤表面分泌汗液。汗液主要是水，含盐和少量尿素。蒸发时从身体带走汽化潜热——这就是降温机制，也是身体最强力的降温手段。',
          },
        },
        {
          id: 'hair-follicle',
          name: { en: 'hair follicle', zh: '毛囊' },
          description: {
            en: 'An infolding of the epidermis that makes a hair. The hair itself is dead keratin, but the follicle has its own small muscles (the erector muscles) that can pull the hair upright. In furry animals this traps a layer of still air next to the skin; in humans, it just makes goose pimples.',
            zh: '表皮内陷形成的结构，长出毛发。毛发本身是死的角蛋白，但毛囊有自己的小肌肉（立毛肌）能拉毛发立起。在多毛动物身上，这会困住一层贴近皮肤的静止空气；在人身上，只会起鸡皮疙瘩。',
          },
        },
        {
          id: 'erector-muscle',
          name: { en: 'erector muscle', zh: '立毛肌' },
          description: {
            en: 'A tiny muscle attached to the hair follicle. When it contracts, it pulls the hair upright. In a cold environment the body keeps them contracted, to trap a layer of insulating air next to the skin. In a hot environment they relax and the hairs lie flat.',
            zh: '连在毛囊上的小肌肉。收缩时把毛发拉起。寒冷环境里身体让它们一直收缩，以困住贴肤的隔热空气；炎热环境里则舒张，毛发平躺。',
          },
        },
        {
          id: 'arteriole',
          name: { en: 'arteriole', zh: '小动脉' },
          description: {
            en: 'A small artery that controls the flow of blood into a capillary bed. In the skin, the arterioles supplying the surface capillaries can dilate (vasodilation — more blood to the surface, more heat lost) or constrict (vasoconstriction — less blood to the surface, less heat lost). The capillary itself does not move; the vessel feeding it changes width.',
            zh: '控制血液流入毛细血管床的小动脉。皮肤里，供应表层毛细血管的小动脉可以舒张（血管舒张——更多血流到表面，散失更多热）或收缩（血管收缩——更少血流到表面，散失更少热）。毛细血管本身不动，是供给它的血管变宽变窄。',
          },
        },
        {
          id: 'blood-capillary',
          name: { en: 'blood capillary', zh: '毛细血管' },
          description: {
            en: 'A network of tiny vessels that loops through the dermis. The blood in them gives up heat to the surface of the skin (which is what we want) and supplies oxygen to the dividing cells at the base of the epidermis. The amount of blood that reaches them is set by the arteriole above.',
            zh: '真皮里盘绕的微小血管网。其中血液把热量交给皮肤表面（这正是我们想要的），并向表皮基部的分裂细胞供氧。到达这里的血量由上方的小动脉决定。',
          },
        },
        {
          id: 'temperature-receptor',
          name: { en: 'temperature receptor', zh: '温度感受器' },
          description: {
            en: 'A branched nerve ending in the dermis that fires an electrical impulse when the skin temperature changes. The impulse travels to the hypothalamus, which compares it with the set point of about 37 °C and adjusts the four effectors accordingly.',
            zh: '真皮里分支状的神经末梢，皮肤温度变化时发出电脉冲。脉冲传到下丘脑，下丘脑把它和约 37 °C 的设定点对比，并相应调节四个效应器。',
          },
        },
      ],
    },

    // 3D pancreas + 3D skin. The 2D figures at the top of the lesson
    // are simplified diagrams; the 3D models show the actual shapes
    // — the pancreas snaking across the upper abdomen, the layered
    // structure of the skin with its glands and capillaries.
    {
      type: 'organ-anatomy',
      id: 'pancreas-3d',
      title: { en: 'The pancreas, in 3D', zh: '胰腺 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The pancreas sits behind the stomach, with its head cradled by the duodenum. Most of it makes digestive enzymes; the small islets of Langerhans release insulin and glucagon into the blood.',
        zh: '拖动旋转。胰腺位于胃后方，胰头嵌在十二指肠中。大部分胰腺分泌消化酶；零散的胰岛释放胰岛素和胰高血糖素入血。',
      },
      intro: {
        en: 'The pancreas is a dual-purpose gland — digestive enzymes into the gut, hormones that steady blood sugar.',
        zh: '胰腺是一个双重功能腺体——既向肠道分泌消化酶，又向血液释放稳定血糖的激素。',
      },
      organ: 'pancreas',
      system: { en: 'Endocrine system', zh: '内分泌系统' },
      initialPart: 'islets',
      parts: [
        {
          id: 'head',
          name: { en: 'head', zh: '胰头' },
          description: {
            en: 'The widest part, nestled in the curve of the duodenum. The common bile duct passes through it.',
            zh: '最宽的部分，嵌在十二指肠的弯中。胆总管从这里穿过。',
          },
          position3d: [-1.32, -0.36, 0.55],
        },
        {
          id: 'body',
          name: { en: 'body', zh: '胰体' },
          description: {
            en: 'The middle section, sitting across the spine behind the stomach. Most of the digestive enzymes are made here.',
            zh: '中间段，横跨脊柱后方、胃后。消化酶主要由这里分泌。',
          },
          position3d: [0.05, 0.25, 0.45],
        },
        {
          id: 'tail',
          name: { en: 'tail', zh: '胰尾' },
          description: {
            en: 'The thin end, reaching toward the spleen.',
            zh: '较细的尾端，向脾脏方向伸去。',
          },
          position3d: [1.55, 0.3, 0.35],
        },
        {
          id: 'pancreatic-duct',
          name: { en: 'pancreatic duct', zh: '胰管' },
          description: {
            en: 'Runs the length of the pancreas. Carries the digestive enzymes to the duodenum.',
            zh: '贯穿胰腺全长，把消化酶送往十二指肠。',
          },
          position3d: [-0.61, 0.39, 0.5],
        },
        {
          id: 'islets',
          name: { en: 'islets of Langerhans', zh: '胰岛' },
          description: {
            en: 'Tiny scattered clusters of endocrine cells. Only 2% of the pancreas but vital — they release insulin and glucagon.',
            zh: '散布的内分泌细胞小簇。只占胰腺 2%，但至关重要——它们释放胰岛素和胰高血糖素。',
          },
          position3d: [0.5, -0.05, 0.5],
        },
      ],
    },
    {
      type: 'organ-anatomy',
      id: 'skin-3d',
      title: { en: 'The skin, in 3D', zh: '皮肤 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The skin has three layers — epidermis outside, dermis with glands and nerves, hypodermis (fat) at the bottom. Capillaries in the dermis open and narrow to control how much heat the body loses.',
        zh: '拖动旋转。皮肤分三层——外层表皮、中层真皮（含腺体和神经）、底层皮下（脂肪）。真皮的毛细血管开合控制散热。',
      },
      intro: {
        en: 'The skin is the body\'s largest organ — a living barrier that senses touch, holds in water, and regulates temperature.',
        zh: '皮肤是人体最大的器官——活的屏障，能感知触觉、保持水分、调节体温。',
      },
      organ: 'skin',
      system: { en: 'Integumentary system', zh: '皮肤系统' },
      initialPart: 'epidermis',
      parts: [
        {
          id: 'epidermis',
          name: { en: 'epidermis', zh: '表皮' },
          description: {
            en: 'The outermost layer. Cells are constantly shed and replaced. The deepest layer makes melanin, the pigment that colours skin.',
            zh: '最外层。细胞不断脱落并从下层新生。最深一层生成黑色素，赋予肤色。',
          },
          position3d: [-0.05, 0.88, 1.4],
        },
        {
          id: 'dermis',
          name: { en: 'dermis', zh: '真皮' },
          description: {
            en: 'The thick middle layer. Holds sweat glands, hair follicles, sebaceous glands, blood vessels, and nerve endings.',
            zh: '厚实的中间层。包含汗腺、毛囊、皮脂腺、血管与神经末梢。',
          },
          position3d: [0.29, 0.05, 1.4],
        },
        {
          id: 'hypodermis',
          name: { en: 'hypodermis', zh: '皮下组织' },
          description: {
            en: 'The deepest layer, mostly fat. Cushions against knocks and insulates against cold.',
            zh: '最深的层，主要是脂肪。缓冲撞击并隔热保暖。',
          },
          position3d: [-0.39, -1.15, 1.4],
        },
        {
          id: 'sweat-gland',
          name: { en: 'sweat gland', zh: '汗腺' },
          description: {
            en: 'A coiled tube in the dermis. When body temperature rises, sweat is released and evaporates, taking heat with it.',
            zh: '真皮里的盘曲管道。体温上升时汗液挤出蒸发，散热。',
          },
          position3d: [0.75, 0.55, 1.4],
        },
        {
          id: 'hair-follicle',
          name: { en: 'hair follicle', zh: '毛囊' },
          description: {
            en: 'A tiny pocket in the dermis from which a hair grows. A small muscle pulls the hair upright in the cold — goose bumps.',
            zh: '真皮中的小袋，毛发由此长出。冷时小肌肉收缩让毛发立起——起鸡皮疙瘩。',
          },
          position3d: [0.89, -0.44, 1.4],
        },
        {
          id: 'blood-capillary',
          name: { en: 'blood capillary', zh: '毛细血管' },
          description: {
            en: 'Tiny vessels in the dermis that open or narrow to control how much heat the body loses through the skin.',
            zh: '真皮中的细小血管，开合控制经皮肤散失多少热量。',
          },
          position3d: [-0.75, -0.45, 1.4],
        },
      ],
    },
  ],
}

export default lesson
