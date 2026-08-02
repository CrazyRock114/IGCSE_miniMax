import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '9-1-transport-animals',
  subject: '0610',
  syllabus: [
    '0610.9.1.1',
    '0610.9.1.2',
    '0610.9.1.3',
    '0610.9.1.4',
    '0610.9.2.1',
    '0610.9.2.2',
    '0610.9.2.3',
    '0610.9.2.4',
    '0610.9.2.5',
    '0610.9.2.6',
    '0610.9.2.7',
    '0610.9.2.8',
    '0610.9.2.9',
    '0610.9.2.10',
    '0610.9.2.11',
    '0610.9.3.1',
    '0610.9.3.2',
    '0610.9.3.3',
    '0610.9.3.4',
    '0610.9.3.5',
    '0610.9.3.6',
    '0610.9.4.1',
    '0610.9.4.2',
    '0610.9.4.3',
    '0610.9.4.4',
    '0610.9.4.5',
    '0610.9.4.6',
    '0610.9.4.7',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Transport in animals', zh: '动物体内的运输' },
  summary: {
    en: 'An athlete’s heart beats thirty times a minute slower than yours and pumps exactly as much blood. Multiply rate by stroke volume and both come to five litres.',
    zh: '运动员的心脏每分钟比你少跳三十次，却泵出同样多的血液。把心率乘以每搏输出量，两者都是每分钟五升。',
  },

  objectives: [
    {
      en: 'Describe a circulatory system as vessels, a pump and valves giving one-way flow.',
      zh: '把循环系统描述为由血管、泵与瓣膜构成的单向流动系统。',
    },
    {
      en: 'Describe the single circulation of a fish and the double circulation of a mammal, and explain the advantages of a double circulation. (Extended)',
      zh: '描述鱼的单循环与哺乳动物的双循环，并解释双循环的优点。（Extended）',
    },
    {
      en: 'Identify the structures of the mammalian heart, including the valves and the septum, and explain the relative thickness of the walls. (Extended)',
      zh: '识别哺乳动物心脏的结构，包括瓣膜与室间隔，并解释各壁厚薄的差异。（Extended）',
    },
    {
      en: 'Investigate, describe and explain the effect of physical activity on heart rate.',
      zh: '探究、描述并解释体力活动对心率的影响。',
    },
    {
      en: 'Describe coronary heart disease, its risk factors, and the roles of diet and exercise in reducing risk.',
      zh: '描述冠心病及其风险因素，以及饮食与运动在降低风险中的作用。',
    },
    {
      en: 'Describe the structure of arteries, veins and capillaries, and relate each to its function. (Extended)',
      zh: '描述动脉、静脉与毛细血管的结构，并把各自结构与功能联系起来。（Extended）',
    },
    {
      en: 'Identify the main blood vessels to and from the heart, lungs, kidneys and liver.',
      zh: '识别进出心、肺、肾与肝的主要血管。',
    },
    {
      en: 'List the components of blood and state the functions of each, including lymphocytes and phagocytes. (Extended)',
      zh: '列出血液的组成成分并说出各自的功能，包括淋巴细胞与吞噬细胞。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'double circulation',
      zh: '双循环',
      definition: {
        en: 'A system in which the blood passes through the heart twice per circuit — once to the lungs, once to the body — so it is re-pressurised between them.',
        zh: '血液每循环一周经过心脏两次的系统——一次到肺，一次到全身——因此在两者之间被重新加压。',
      },
      syllabus: ['0610.9.1.3'],
    },
    {
      en: 'cardiac output',
      zh: '心输出量',
      definition: {
        en: 'The volume of blood pumped by a ventricle in one minute: heart rate × stroke volume. About 5 dm³/min at rest, in anybody.',
        zh: '心室每分钟泵出的血量：心率 × 每搏输出量。任何人在静息时都约为 5 dm³/min。',
      },
      syllabus: ['0610.9.2.11'],
    },
    {
      en: 'stroke volume',
      zh: '每搏输出量',
      definition: {
        en: 'The volume pushed out by a ventricle in one beat. Training increases it, which is why a trained heart can beat more slowly.',
        zh: '心室每搏动一次泵出的血量。训练会使它增大，这正是受过训练的心脏可以跳得更慢的原因。',
      },
      syllabus: ['0610.9.2.11'],
    },
    {
      en: 'septum',
      zh: '室间隔',
      definition: {
        en: 'The wall separating the two sides of the heart, keeping oxygenated and deoxygenated blood from mixing.',
        zh: '分隔心脏左右两侧的壁，防止含氧血与缺氧血混合。',
      },
      syllabus: ['0610.9.2.9'],
    },
    {
      en: 'hepatic portal vein',
      zh: '肝门静脉',
      definition: {
        en: 'The vessel carrying blood from the gut to the liver, so that everything absorbed is processed before reaching the rest of the body.',
        zh: '把血液从消化道运送到肝脏的血管，使吸收进来的一切在到达身体其余部分之前先被处理。',
      },
      syllabus: ['0610.9.3.6'],
    },
    {
      en: 'coronary heart disease',
      zh: '冠心病',
      definition: {
        en: 'Narrowing of the coronary arteries by fatty deposits, so less oxygen reaches the heart muscle itself.',
        zh: '冠状动脉因脂肪沉积而变窄，使到达心肌本身的氧气减少。',
      },
      syllabus: ['0610.9.2.5'],
    },
    {
      en: 'fibrin',
      zh: '纤维蛋白',
      definition: {
        en: 'The insoluble protein formed from fibrinogen during clotting. It forms a mesh that traps red cells and seals the wound.',
        zh: '凝血过程中由纤维蛋白原形成的不溶性蛋白。它形成网状结构，网住红细胞并封闭伤口。',
      },
      syllabus: ['0610.9.4.7'],
    },
  ],

  equations: [
    {
      latex: '\\text{cardiac output} = \\text{heart rate} \\times \\text{stroke volume}',
      meaning: {
        en: 'Two ways to move more blood: beat faster, or push more out per beat. Exercise does both; training raises the second so that resting needs less of the first.',
        zh: '输送更多血液有两条途径：跳得更快，或每次搏动泵出更多。运动两者兼用；训练提高后者，从而使静息时不必依赖前者。',
      },
      substitute: (r) =>
        `${r['resting'] ?? 0} \\times ${r['stroke'] ?? 0}\\ \\mathrm{cm^3} \\approx 5\\ \\mathrm{dm^3\\,min^{-1}}\\ \\text{at rest}`,
    },
    {
      latex: '\\text{peak} = \\text{HR}_{\\max} \\times \\text{SV}_{\\max}',
      meaning: {
        en: 'Maximum heart rate is set by age and barely changes with training. The whole gain from training is in the stroke volume.',
        zh: '最大心率主要由年龄决定，几乎不随训练改变。训练带来的全部提升都在每搏输出量上。',
      },
      substitute: (r) =>
        `\\text{peak } ${r['peak'] ?? 0}\\ \\mathrm{min^{-1}} \\rightarrow ${r['peakOutput'] ?? 0}\\ \\mathrm{dm^3\\,min^{-1}} \\quad \\text{recovery } ${r['recovery'] ?? 0}\\ \\mathrm{min}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '9-1-transport-animals',
    hint: {
      en: 'Run the same exercise on an untrained subject and on an athlete. Compare the resting pulse, then the recovery time.',
      zh: '让未受训练者和运动员做同样的运动。先比较静息脉搏，再比较恢复时间。',
    },
    params: [
      {
        key: 'intensity',
        label: { en: 'How hard the exercise is', zh: '运动强度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 60,
      },
      {
        key: 'duration',
        label: { en: 'How long it lasts', zh: '持续时间' },
        unit: 'min',
        min: 0,
        max: 10,
        step: 1,
        default: 5,
      },
      {
        key: 'fitness',
        label: { en: 'How well trained the subject is', zh: '受试者的训练程度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 0,
      },
    ],
    readouts: [
      {
        key: 'resting',
        label: { en: 'Resting heart rate', zh: '静息心率' },
        unit: 'min⁻¹',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'stroke',
        label: { en: 'Resting stroke volume', zh: '静息每搏输出量' },
        unit: 'cm³',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peak',
        label: { en: 'Peak heart rate', zh: '峰值心率' },
        unit: 'min⁻¹',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peakOutput',
        label: { en: 'Peak cardiac output', zh: '峰值心输出量' },
        unit: 'dm³/min',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'recovery',
        label: { en: 'Time to recover', zh: '恢复所需时间' },
        unit: 'min',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Untrained, moderate', zh: '未训练，中等强度' },
        params: { intensity: 60, duration: 5, fitness: 0 },
      },
      {
        label: { en: 'Athlete, same exercise', zh: '运动员，同样的运动' },
        params: { intensity: 60, duration: 5, fitness: 100 },
      },
      {
        label: { en: 'Untrained, flat out', zh: '未训练，全力' },
        params: { intensity: 100, duration: 5, fitness: 0 },
      },
      {
        label: { en: 'Athlete, flat out', zh: '运动员，全力' },
        params: { intensity: 100, duration: 5, fitness: 100 },
      },
      {
        label: { en: 'A long steady run', zh: '长时间匀速跑' },
        params: { intensity: 55, duration: 10, fitness: 60 },
      },
      {
        label: { en: 'Sitting still', zh: '静坐不动' },
        params: { intensity: 0, duration: 5, fitness: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-9-1-cp1',
      syllabus: ['0610.9.2.11'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain why a person’s heart rate increases during vigorous exercise.',
      markScheme: [
        { text: 'The muscles are respiring faster to release more energy for contraction', marks: 1 },
        {
          text: 'so they need oxygen and glucose delivered to them more quickly',
          marks: 1,
        },
        { text: 'and the carbon dioxide they produce must be removed more quickly', marks: 1 },
        {
          text: 'A faster heart rate increases the cardiac output, so blood circulates faster and does all of this',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Four links in the chain. "Because the muscles need more oxygen" is the first one only, and on its own it is a quarter of the answer.',
        zh: '因果链有四环。"因为肌肉需要更多氧气"只是第一环，单独写只答了四分之一。',
      },
    },
    {
      id: '0610-9-1-cp2',
      syllabus: ['0610.9.2.11'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A trained athlete has a resting heart rate of 45 beats per minute. An untrained person of the same age has a resting heart rate of 72 beats per minute. Both have the same resting cardiac output. Suggest an explanation.',
      markScheme: [
        { text: 'Cardiac output is heart rate multiplied by stroke volume', marks: 1 },
        {
          text: 'The athlete has a larger stroke volume, because training has strengthened the heart muscle so each contraction empties the ventricle more completely',
          marks: 1,
        },
        {
          text: 'So the same volume per minute is pumped in fewer, larger beats',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The stem tells you the outputs are equal, so the answer must be about stroke volume. "The athlete is fitter" restates the question without explaining anything.',
        zh: '题干已告诉你两者的心输出量相同，因此答案必须落在每搏输出量上。写"运动员体能更好"只是把题目复述一遍，什么也没解释。',
      },
    },
    {
      id: '0610-9-1-cp3',
      syllabus: ['0610.9.1.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A mammal has a double circulation and a fish has a single circulation. Explain the advantage of a double circulation.',
      markScheme: [
        {
          text: 'In a single circulation the blood loses pressure passing through the gill capillaries and travels slowly to the body',
          marks: 1,
        },
        {
          text: 'In a double circulation the blood returns to the heart after the lungs and is pumped again, so it reaches the body at high pressure',
          marks: 1,
        },
        {
          text: 'So oxygen and glucose are delivered faster, which a mammal needs because it maintains a constant body temperature',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The comparison is with the fish, so say what happens in the fish too. And finish on why a mammal in particular needs the speed.',
        zh: '这是与鱼的对比，因此也要说明鱼的情况。最后还要说清为什么偏偏是哺乳动物需要这种速度。',
      },
    },
    {
      id: '0610-9-1-cp4',
      syllabus: ['0610.9.2.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'The wall of the left ventricle is much thicker than the wall of the right ventricle. Explain why.',
      markScheme: [
        {
          text: 'The left ventricle pumps blood all the way round the body, while the right pumps it only to the lungs',
          marks: 1,
        },
        {
          text: 'so it must generate a higher pressure, which requires more muscle',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Not because it holds more blood — the two ventricles hold the same volume, and must, or blood would pile up on one side.',
        zh: '不是因为它容纳更多血液——两个心室容量相同，也必须相同，否则血液会在一侧淤积。',
      },
    },
    {
      id: '0610-9-1-cp5',
      syllabus: ['0610.9.3.4', '0610.9.3.5'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare the structure of an artery with that of a vein, and relate each difference to the blood pressure in the vessel.',
      markScheme: [
        {
          text: 'An artery has a thick wall with much muscle and elastic tissue; a vein has a thin wall with little',
          marks: 1,
        },
        {
          text: 'because an artery must withstand and smooth out the high pressure surges from the heart, while a vein carries blood at low pressure',
          marks: 1,
        },
        {
          text: 'An artery has a narrow lumen and no valves; a vein has a wide lumen and valves along it to stop the low-pressure blood flowing backwards',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Relate to blood pressure" is the instruction. Listing structural differences without tying each to the pressure gets about half.',
        zh: '"与血压联系起来"是题目的要求。只罗列结构差异而不把每一条与压力联系起来，大约只能拿一半分。',
      },
    },
    {
      id: '0610-9-1-cp6',
      syllabus: ['0610.9.4.7'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how blood clots at a wound, and state two reasons why clotting is important.',
      markScheme: [
        {
          text: 'Platelets trigger the conversion of the soluble protein fibrinogen into insoluble fibrin',
          marks: 1,
        },
        {
          text: 'Fibrin forms a mesh across the wound which traps red blood cells, forming the clot',
          marks: 1,
        },
        {
          text: 'It prevents further loss of blood, and it seals the wound so that pathogens cannot enter',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Name both proteins and get them the right way round: fibrinogen is the soluble one already in the plasma, fibrin the insoluble mesh.',
        zh: '两种蛋白都要说出并且不能弄反：纤维蛋白原是血浆中原本就有的可溶蛋白，纤维蛋白才是不溶的网状结构。',
      },
    },
    {
      id: '0610-9-1-cp7',
      syllabus: ['0610.9.2.5', '0610.9.2.6'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what happens to a coronary artery in coronary heart disease, and state two changes to lifestyle that reduce the risk.',
      markScheme: [
        {
          text: 'Fatty deposits build up inside the artery, narrowing the lumen and reducing blood flow to the heart muscle',
          marks: 1,
        },
        {
          text: 'so the heart muscle receives less oxygen and glucose, and may die if the artery is blocked completely',
          marks: 1,
        },
        {
          text: 'Two from: eat less saturated fat, eat less salt, stop smoking, take regular exercise, lose excess weight',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The coronary arteries supply the heart muscle itself. Answering about blood inside the chambers misses what the disease actually is.',
        zh: '冠状动脉供应的是心肌本身。回答心腔内的血液，就没有抓住这种疾病的实质。',
      },
    },
    {
      id: '0610-9-1-cp8',
      syllabus: ['0610.9.4.6'],
      tier: 'extended',
      commandWord: 'State',
      marks: 2,
      stem: 'State the function of a phagocyte and the function of a lymphocyte.',
      markScheme: [
        { text: 'A phagocyte engulfs and digests pathogens', marks: 1 },
        { text: 'A lymphocyte produces antibodies, which are specific to one pathogen', marks: 1 },
      ],
      examinerNote: {
        en: 'Both are white blood cells, so "it fights disease" does not distinguish them and scores nothing.',
        zh: '两者都是白细胞，因此写"它抵抗疾病"无法区分二者，不得分。',
      },
    },
  ],
}

export default lesson
