/**
 * Term enrichment registry — image, mechanism, clinical details, related terms.
 *
 * A `Term` (in a lesson's `glossary`) gives the English + Chinese + one-line
 * definition. This file adds the things a textbook can give that a glossary
 * line cannot: a figure from the source material, the *why* (mechanism), the
 * *what does it look like* (clinical picture), and pointers to terms that
 * should be studied together.
 *
 * Kept separate from the lesson files so a future editor (the teacher) can
 * add enrichments without touching the lesson data, and so the vocab system
 * can be loaded without loading all 21 lessons.
 */

import type { ConceptEnrichment } from '@/lib/vocabTypes'
import { assetUrl } from '../lib/assetUrl'

/**
 * Keyed by `${subject}/${slug}/${term.en.toLowerCase()}`. Slug form
 * because the term string is user-visible English ("rickets"), not an id.
 *
 * Adding a new enrichment: copy any entry below, change the key, fill the
 * fields. Image paths are under `/public/figures/g8/<subject>/` and are
 * served at `/figures/g8/<subject>/...`.
 */
export const termEnrichments: Record<string, ConceptEnrichment> = {
  // --- 7-1-nutrition: 6 disease + nutrition concept enrichments ---
  '0610/7-1-nutrition/rickets': {
    termId: 'rickets',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/image-b5-07.png'),
    imageSource: 'G8 Science · Vitamin D table',
    mechanism: {
      en: 'Vitamin D is needed for calcium to be absorbed from the gut into the blood. Without it, calcium in the diet passes through unabsorbed. Calcium is what gives bone its hardness — so without it, the bones of a growing child stay soft and bend under the body\'s weight.',
      zh: '维生素 D 是肠道吸收钙的必需物质。没有它，食物中的钙不能被吸收，钙是让骨骼变硬的原料——所以正在长身体的孩子如果缺维生素 D，骨头会一直软，承受不住体重就会弯曲。',
    },
    clinicalDetails: {
      en: 'Bones, especially in the legs, become soft and deformed. The knees bow outward, the ankles turn in, and the spine curves. In the past this was common in industrial cities where children rarely went outside — sunlight on the skin makes vitamin D, and oily fish is a dietary source.',
      zh: '骨骼（尤其是腿骨）变软变形。膝盖外翻（O 型腿）、踝内翻、脊柱弯曲。过去工业城市里少见阳光的孩子常发此病——阳光照在皮肤上能合成维生素 D，含油多的鱼是食物来源。',
    },
    relatedTerms: ['vitamin d', 'calcium', 'vitamin c', 'scurvy'],
  },
  '0610/7-1-nutrition/scurvy': {
    termId: 'scurvy',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/image-b5-07.png'),
    imageSource: 'G8 Science · Vitamin C table',
    mechanism: {
      en: 'Vitamin C is needed to make collagen, the stretchy protein that holds skin, blood-vessel walls, gums and connective tissue together. Without it, the body cannot maintain these tissues — they become fragile and any wound takes much longer to close.',
      zh: '维生素 C 是合成胶原蛋白的必需物质。胶原蛋白是把皮肤、血管壁、牙龈、结缔组织黏合起来的弹性蛋白。没有它，这些组织变得脆弱，伤口也很难愈合。',
    },
    clinicalDetails: {
      en: 'Bleeding gums, loose teeth, bruises appearing without injury, wounds that will not heal, joint and muscle pain, fatigue. Historically common in sailors on long voyages with no fresh fruit — it killed thousands on 18th-century ocean voyages. Lemon juice on the daily ration cured it.',
      zh: '牙龈出血、牙齿松动、无故淤青、伤口不愈、关节肌肉疼痛、疲倦。历史上常见于长期航行吃不到新鲜水果的水手——18 世纪远洋航行中因此病死亡者成千上万。后来在每日配给中加入柠檬汁治好了它。',
    },
    relatedTerms: ['vitamin c', 'collagen', 'vitamin d', 'rickets'],
  },
  '0610/7-1-nutrition/kwashiorkor': {
    termId: 'kwashiorkor',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/image-b5-06.png'),
    imageSource: 'G8 Science · p.10, Image B5.06',
    mechanism: {
      en: 'A diet that contains enough energy (carbohydrate, fat) but lacks enough protein. The liver cannot make enough of the blood proteins that hold fluid inside blood vessels, so fluid leaks into the tissues — this is why a kwashiorkor child has a swollen belly while still being underweight overall.',
      zh: '能量（碳水、脂肪）足够但严重缺蛋白的饮食。肝脏合成不出足够的血浆蛋白来锁住血管里的水分，于是液体渗到组织里——这就是恶性营养不良患儿肚子鼓胀但整体体重偏低的原因。',
    },
    clinicalDetails: {
      en: 'Swollen belly (oedema — fluid in the tissues), reddish or thinning hair, skin that flakes and tears easily, an enlarged liver. Common in children 9 months to 2 years who have been weaned off breast milk onto a low-protein diet. A high-protein diet usually reverses it.',
      zh: '腹部鼓胀（水肿——液体渗到组织中）、头发发红变稀、皮肤易剥落、肝脏肿大。常发生在 9 个月到 2 岁、断奶后改吃低蛋白食物的孩子。改吃高蛋白饮食通常能逆转。',
    },
    relatedTerms: ['marasmus', 'malnutrition', 'protein', 'balanced diet'],
  },
  '0610/7-1-nutrition/marasmus': {
    termId: 'marasmus',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/image-b5-06.png'),
    imageSource: 'G8 Science · p.10, severe malnutrition',
    mechanism: {
      en: 'A diet lacking both protein AND energy (overall starvation). The body, starved of both fuel and building blocks, breaks down its own muscle and fat. Unlike kwashiorkor, fluid balance is preserved — the child just wastes away.',
      zh: '蛋白质和能量都严重缺乏（整体饥饿）。身体既缺燃料又缺建材，只好分解自身的肌肉和脂肪。跟恶性营养不良不同，液体平衡没破——孩子就是单纯地消瘦下去。',
    },
    clinicalDetails: {
      en: 'A child who looks emaciated — no fat under the skin, muscles wasted, ribs and shoulder blades visible, "old man" face from loss of the fat pads under the skin. The most severe form of malnutrition. Recovery requires sustained re-feeding with both protein and energy.',
      zh: '患儿极度消瘦——皮下无脂肪、肌肉萎缩、肋骨和肩胛骨清晰可见、皮下脂肪垫消失导致"小老人"面容。营养不良的最严重形式。恢复需要持续补充蛋白质和能量。',
    },
    relatedTerms: ['kwashiorkor', 'malnutrition', 'protein', 'starvation'],
  },
  '0610/7-1-nutrition/coronary heart disease': {
    termId: 'coronary heart disease',
    subject: '0610',
    slug: '7-1-nutrition',
    mechanism: {
      en: 'The coronary arteries supply the heart muscle itself with blood. If a diet is high in saturated fat and cholesterol, fatty deposits build up on the inside walls of these arteries, making them stiffer and narrower. Less blood gets through, so the heart muscle runs short of oxygen and cannot work properly.',
      zh: '冠状动脉是为心肌本身供血的血管。如果饮食中饱和脂肪和胆固醇过多，脂肪沉积会堆积在这些动脉的内壁，让它们变硬变窄。血流减少，心肌缺氧，无法正常工作。',
    },
    clinicalDetails: {
      en: 'The deposits can also trigger a blood clot, which can suddenly block the artery entirely — this is a heart attack. Symptoms include chest pain (especially on exertion), breathlessness, and pain radiating down the left arm. Risk factors: high saturated-fat diet, smoking, lack of exercise, family history.',
      zh: '沉积物还可能引发血栓，突然完全堵住动脉——这就是心肌梗塞（心脏病发作）。症状包括胸痛（尤其在用力时）、气短、左臂放射性疼痛。危险因素：高饱和脂肪饮食、吸烟、缺乏运动、家族史。',
    },
    relatedTerms: ['saturated fat', 'cholesterol', 'obesity', 'heart'],
  },
  '0610/7-1-nutrition/obesity': {
    termId: 'obesity',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/image-b5-05.png'),
    imageSource: 'G8 Science · p.9, Image B5.05',
    mechanism: {
      en: 'Energy in, energy out. If a person takes in more food energy than they use up, the surplus is stored — mostly as fat under the skin and around the organs. Over months and years this accumulates to a level that is harmful to health.',
      zh: '能量进出平衡。如果一个人摄入的能量长期超过消耗，多余的部分就存起来——主要是皮下和内脏周围的脂肪。积月累年，到危害健康的程度就是肥胖。',
    },
    clinicalDetails: {
      en: 'Excess body fat, especially weight concentrated around the middle (the "apple" shape), is linked to a higher risk of coronary heart disease, strokes, type-2 diabetes, and joint problems in the knees and hips. Most people can control their weight with normal balanced meals and regular exercise — crash diets tend to fail because the weight comes back when the diet stops.',
      zh: '体内脂肪过多，尤其是脂肪集中在腰腹（"苹果形"体型）的人，患冠心病、中风、2 型糖尿病、膝髋关节问题的风险更高。多数人可以通过正常均衡饮食和规律运动来控制体重——快速节食往往失败，因为一旦停止，体重就回来了。',
    },
    relatedTerms: ['coronary heart disease', 'balanced diet', 'saturated fat'],
  },
  // Other 7-1 terms without figures but with mechanism
  '0610/7-1-nutrition/peristalsis': {
    termId: 'peristalsis',
    subject: '0610',
    slug: '7-1-nutrition',
    mechanism: {
      en: 'The walls of the alimentary canal contain circular and longitudinal muscles. A wave of contraction passes along the wall behind a lump of food, squeezing it forward. This works even if you are upside down — astronauts eat in space because of it.',
      zh: '消化道管壁含有环形肌和纵形肌。管壁在一团食物后方产生一波收缩，把食物向前挤。倒立时食物也能咽下去，宇航员在太空里也能正常吃东西，靠的就是蠕动。',
    },
    relatedTerms: ['oesophagus', 'stomach', 'fibre'],
  },
  '0610/7-1-nutrition/lacteal': {
    termId: 'lacteal',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/figure-b5-09.png'),
    imageSource: 'G8 Science · p.16, Figure B5.09',
    mechanism: {
      en: 'A lymph vessel in the centre of a villus. Fatty acids and glycerol, which are not soluble in water and so cannot enter the watery blood, are taken up by the lacteal instead. The lymph eventually drains into the bloodstream near the heart.',
      zh: '绒毛中央的淋巴管。脂肪酸和甘油不溶于水，进不了水性的血液，于是改由乳糜管吸收。淋巴最终在靠近心脏的位置汇入血液。',
    },
    relatedTerms: ['villus', 'capillary', 'absorption'],
  },
  '0610/7-1-nutrition/villus': {
    termId: 'villus',
    subject: '0610',
    slug: '7-1-nutrition',
    image: assetUrl('/figures/g8/7-1-nutrition/figure-b5-09.png'),
    imageSource: 'G8 Science · p.16, Figure B5.09',
    mechanism: {
      en: 'A finger-like fold of the small intestine wall. Each villus is about 1 mm long and there are millions of them, giving the inside of the small intestine a surface area roughly the size of a tennis court. The wall is one cell thick, with a capillary network and a lacteal inside.',
      zh: '小肠壁的指状皱褶。每根绒毛约 1 毫米长，有几百万根，使小肠内表面积达一个网球场大小。绒毛壁只有一个细胞厚，内含毛细血管网和一根乳糜管。',
    },
    relatedTerms: ['lacteal', 'capillary', 'microvilli', 'absorption'],
  },

  // --- 9-1-transport-animals: heart + blood enrichments ---
  '0610/9-1-transport-animals/red blood cell': {
    termId: 'red blood cell',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: assetUrl('/figures/g8/9-1-transport-animals/figure-b7-11a-rbc.png'),
    imageSource: 'G8 Science · p.31 — doughnut-shaped red blood cell',
    mechanism: {
      en: 'A doughnut-shaped disc with a dimple on each side and no nucleus. The biconcave shape and the missing nucleus together leave room for more haemoglobin and let the cell bend enough to squeeze through capillaries that are narrower than the cell itself.',
      zh: '圆饼状、两面凹陷、没有细胞核。双凹形状加上无核，既容纳更多血红蛋白，也让细胞能弯曲得足以挤过比自己还窄的毛细血管。',
    },
    relatedTerms: ['haemoglobin', 'plasma', 'capillary', 'oxygenated blood'],
  },
  '0610/9-1-transport-animals/phagocyte': {
    termId: 'phagocyte',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: assetUrl('/figures/g8/9-1-transport-animals/figure-b7-12.png'),
    imageSource: 'G8 Science · p.34 — phagocyte with a lobed nucleus',
    mechanism: {
      en: 'A white blood cell that engulfs and digests pathogens. It changes shape, flows around the bacterium, takes it inside the cell, and breaks it down with enzymes. Pus at a wound site is mostly dead phagocytes that have done this and then died.',
      zh: '能吞噬并分解病原体的白细胞。它改变形状，包围细菌，吞入细胞内，再用酶分解。伤口处的脓液主要是已经完成吞噬并死去的吞噬细胞。',
    },
    relatedTerms: ['lymphocyte', 'pathogen', 'white blood cell', 'antibody'],
  },
  '0610/9-1-transport-animals/lymphocyte': {
    termId: 'lymphocyte',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: assetUrl('/figures/g8/9-1-transport-animals/figure-b7-12a-lymphocyte.png'),
    imageSource: 'G8 Science · p.33 — lymphocyte with a large nucleus',
    mechanism: {
      en: 'A white blood cell with a single large round nucleus. Makes antibodies — proteins that recognise specific pathogens and mark them for destruction. Some lymphocytes also remember past infections for decades, which is the basis of vaccination.',
      zh: '具有单个大而圆的细胞核的白细胞。它制造抗体——能识别特定病原体并标记它们以便清除的蛋白质。有些淋巴细胞还能把过去的感染记住几十年——这是疫苗的原理。',
    },
    relatedTerms: ['phagocyte', 'antibody', 'vaccination', 'white blood cell'],
  },
  '0610/9-1-transport-animals/pacemaker': {
    termId: 'pacemaker',
    subject: '0610',
    slug: '9-1-transport-animals',
    mechanism: {
      en: 'A small group of specialised muscle cells in the wall of the right atrium that sets the rate at which the heart beats. It produces a small electrical signal that spreads across both atria, making them contract together, then passes down to the ventricles.',
      zh: '右心房壁上一小组特化的肌肉细胞，决定心率。它们发出微小的电信号，扩散到两个心房使其同时收缩，再向下传导到心室。',
    },
    relatedTerms: ['right atrium', 'heart rate', 'cardiac output'],
  },
  '0610/9-1-transport-animals/coronary heart disease': {
    termId: 'coronary heart disease',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: assetUrl('/figures/g8/9-1-transport-animals/figure-b7-04.png'),
    imageSource: 'G8 Science · p.25, Figure B7.04 — coronary artery on the outside of the heart',
    mechanism: {
      en: 'The coronary arteries sit on the outside of the heart and supply the heart muscle itself. If a diet is high in saturated fat and cholesterol, fatty deposits build up on the inside walls of these arteries, making them stiffer and narrower. Less blood gets through, so the heart muscle runs short of oxygen and cannot work properly.',
      zh: '冠状动脉位于心脏外面，为心肌本身供血。如果饮食中饱和脂肪和胆固醇过多，脂肪沉积会堆积在这些动脉的内壁，让它们变硬变窄。血流减少，心肌缺氧，无法正常工作。',
    },
    relatedTerms: ['coronary artery', 'saturated fat', 'aorta', 'left ventricle'],
  },
  '0610/9-1-transport-animals/double circulation': {
    termId: 'double circulation',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: assetUrl('/figures/g8/9-1-transport-animals/figure-b7-01.png'),
    imageSource: 'G8 Science · p.21, Figure B7.01',
    mechanism: {
      en: 'In a double circulation the blood passes through the heart twice per circuit. Once from the right ventricle to the lungs and back, then again from the left ventricle to the body and back. This means the blood that reaches the body has just been re-pressurised by the left ventricle — it is at high pressure, so oxygen and glucose are delivered fast. Fish have a single circulation: heart → gills → body → heart, and the pressure that the gill capillaries soak up is never replaced, so the body receives the blood slowly.',
      zh: '双循环中血液每循环一周经过心脏两次：先从右心室到肺再回来，再从左心室到全身再回来。到达全身的血液刚被左心室重新加压——处于高压，氧和葡萄糖被快速送达。鱼是单循环：心→鳃→全身→心，鳃毛细血管吸收的压力不会再补回来，所以全身得到的血液较慢。',
    },
    relatedTerms: ['pulmonary circulation', 'systemic circulation', 'single circulation', 'heart'],
  },

  // --- 11-1-gas-exchange: gas exchange + smoking enrichments ---
  '0610/11-1-gas-exchange/aerobic respiration': {
    termId: 'aerobic respiration',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-04.png'),
    imageSource: 'G8 Science · p.39, Figure B8.04 — alveolus with red cells in capillary',
    mechanism: {
      en: 'Glucose is broken down completely — the carbon in it ends up as CO₂, the hydrogen as H₂O, and about 32 ATP per glucose molecule is captured. Aerobic respiration can only happen where oxygen is supplied fast enough to keep up with demand, which is why the heart and breathing rate rise during exercise: they are delivering oxygen to muscle cells at a higher rate.',
      zh: '葡萄糖被彻底分解——其中的碳变成 CO₂，氢变成 H₂O，每分子葡萄糖捕获约 32 个 ATP。有氧呼吸只能发生在供氧跟得上需求的地方——这也是运动时心率和呼吸频率上升的原因：它们是在以更高速度向肌细胞输送氧气。',
    },
    relatedTerms: ['anaerobic respiration', 'oxygen debt', 'alveolus', 'mitochondrion'],
  },
  '0610/11-1-gas-exchange/anaerobic respiration': {
    termId: 'anaerobic respiration',
    subject: '0610',
    slug: '11-1-gas-exchange',
    mechanism: {
      en: 'When oxygen cannot reach the muscle fast enough — a sprint, holding the breath under water, sudden heavy lifting — the cells fall back on anaerobic respiration. Glucose is split only partway, releasing just 2 ATP per glucose (against 32 for aerobic) and leaving lactic acid behind. The lactic acid is what makes muscles burn and eventually stops them working; the "oxygen debt" is the extra oxygen the body needs afterwards to break that lactic acid down.',
      zh: '当氧来不及送达肌肉时——冲刺、潜水憋气、突然大力举重——细胞切换到无氧呼吸。葡萄糖只被部分分解，每分子只释放 2 个 ATP（有氧时为 32 个），并留下乳酸。乳酸就是肌肉发酸发烫、最终无法继续工作的原因；"氧债"则是之后身体为分解这些乳酸而额外需要的氧。',
    },
    relatedTerms: ['aerobic respiration', 'oxygen debt', 'lactic acid', 'fermentation'],
  },
  '0610/11-1-gas-exchange/trachea': {
    termId: 'trachea',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-03.png'),
    imageSource: 'G8 Science · p.38, Figure B8.03 — cilia, goblet cell, mucus',
    mechanism: {
      en: 'The main airway from the larynx down to where it splits into the two bronchi. It is held open by C-shaped rings of cartilage — the rings do not form a complete circle because the back of the trachea lies against the oesophagus and needs to give way when food passes down. The lining is ciliated epithelium with goblet cells.',
      zh: '从喉向下到分为两条支气管处的主气道。它由 C 形软骨环撑开——软骨环不形成完整的圆，因为气管背面贴着食道，要让食物通过时能凹进去。内壁是带纤毛的上皮和杯状细胞。',
    },
    relatedTerms: ['bronchus', 'bronchiole', 'cilium', 'mucus', 'larynx'],
  },
  '0610/11-1-gas-exchange/mucus': {
    termId: 'mucus',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-03.png'),
    imageSource: 'G8 Science · p.38, Figure B8.03 — yellow blob of mucus on top of a goblet cell',
    mechanism: {
      en: 'A sticky secretion made by goblet cells. It sits in a thin layer on top of the cilia, with dust, soot, bacteria and viruses caught in it. The cilia beat in a synchronised wave that moves this mucus blanket upwards towards the throat, where it is swallowed and the trapped pathogens are destroyed by stomach acid.',
      zh: '由杯状细胞分泌的黏性物质。它在纤毛之上形成薄薄一层，灰尘、煤烟、细菌和病毒都被粘住。纤毛同步摆动，把这层黏液毯向上推往喉咙，最终被吞下，其中困住的病原体被胃酸消灭。',
    },
    relatedTerms: ['goblet cell', 'cilium', 'trachea', 'bronchus'],
  },
  '0610/11-1-gas-exchange/cilium': {
    termId: 'cilium',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-03.png'),
    imageSource: 'G8 Science · p.38, Figure B8.03 — fine hair-like cilia on the airway cell',
    mechanism: {
      en: 'A tiny hair-like extension on the surface of a ciliated cell. Each ciliated cell in the airway carries dozens of cilia, and they all beat in the same direction, in a synchronised wave. The effect is a moving conveyor belt of mucus — the "mucociliary escalator" — that pushes trapped material up and out of the lungs. Tobacco smoke paralyses the cilia; with the escalator stopped, mucus and the bacteria in it pool in the lungs, and chest infections follow.',
      zh: '纤毛细胞表面的微小毛状突起。气道中每个纤毛细胞都长着几十根纤毛，它们方向一致地同步摆动。其效果是一条移动的黏液传送带——"黏液-纤毛自动梯"——把黏住的东西向上推出肺。烟草烟雾会让纤毛瘫痪；自动梯一旦停转，黏液和其中的细菌就在肺里积聚，胸腔感染随之而来。',
    },
    relatedTerms: ['goblet cell', 'mucus', 'trachea', 'nicotine', 'smoking'],
  },
  '0610/11-1-gas-exchange/nicotine': {
    termId: 'nicotine',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-07.png'),
    imageSource: 'G8 Science · p.45, Figure B8.07 — what is in cigarette smoke',
    mechanism: {
      en: 'The addictive substance in tobacco. Within seconds of inhaling, nicotine reaches the brain and triggers the release of dopamine — the same reward signal that makes food and social contact feel good. The brain rewires itself around this signal: in its absence the smoker feels irritable, anxious and unable to concentrate, which is why stopping is so hard. Nicotine also narrows small blood vessels and raises blood pressure, putting extra load on the heart.',
      zh: '烟草中的成瘾物质。吸入后几秒钟内，尼古丁就到达大脑，触发多巴胺释放——跟食物和社交带来愉悦感的是同一种奖赏信号。大脑围绕这个信号重新布线：一旦缺失，吸烟者就会烦躁、焦虑、无法集中注意力——这就是戒烟如此困难的原因。尼古丁还会收缩小血管、升高血压，给心脏增添额外负担。',
    },
    relatedTerms: ['tar', 'carbon monoxide', 'coronary heart disease', 'lung cancer'],
  },
  '0610/11-1-gas-exchange/carbon monoxide': {
    termId: 'carbon monoxide',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-07.png'),
    imageSource: 'G8 Science · p.45, Figure B8.07 — what is in cigarette smoke',
    mechanism: {
      en: 'A poisonous gas that binds to haemoglobin in red blood cells about 200 times more tightly than oxygen does. A smoker with 10% of their haemoglobin occupied by carbon monoxide is effectively anaemic — their blood cannot carry as much oxygen as it should. During pregnancy, the same effect on the mother\'s blood starves the developing baby of oxygen, leading to low birth weight.',
      zh: '一种有毒气体，与血红蛋白的结合力约为氧气的 200 倍。一个吸烟者如果有 10% 的血红蛋白被一氧化碳占据，就相当于贫血——血液运氧能力下降。孕期母亲血液的同样效应会让发育中的胎儿缺氧，导致出生体重偏低。',
    },
    relatedTerms: ['nicotine', 'tar', 'red blood cell', 'haemoglobin'],
  },
  '0610/11-1-gas-exchange/emphysema': {
    termId: 'emphysema',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/image-b8-03.png'),
    imageSource: 'G8 Science · p.46, Image B8.03 — healthy lung (a) vs emphysema lung (b)',
    mechanism: {
      en: 'Long-term exposure to cigarette smoke inflames the alveoli and the enzymes in the inflammatory response slowly digest the alveolar walls. Many small air sacs merge into a few large ones, and the total surface area available for gas exchange drops. The lungs also lose their elastic recoil, so expelling air becomes an effort. The patient gets breathless walking across a room.',
      zh: '长期吸入香烟烟雾会让肺泡发炎，炎症反应中的酶逐渐消化掉肺泡壁。许多小气腔合并成几个大气腔，气体交换的总表面积下降。肺也失去弹性回缩力，呼气变得吃力。患者走几步路就会气喘。',
    },
    relatedTerms: ['alveolus', 'lung cancer', 'nicotine', 'tar', 'chronic bronchitis'],
  },
  '0610/11-1-gas-exchange/lung cancer': {
    termId: 'lung cancer',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-07.png'),
    imageSource: 'G8 Science · p.45, Figure B8.07 — what is in cigarette smoke',
    mechanism: {
      en: 'Tar — the sticky brown residue of cigarette smoke — settles on the lining of the bronchi and contains dozens of chemicals that damage DNA. Most damage is repaired, but a single unrepaired mutation in a gene that controls cell division can start a cell dividing out of control. The resulting tumour grows into the air passage and spreads to other parts of the body. Lung cancer is the leading cause of cancer death in many countries, and the risk is roughly proportional to the number of cigarettes smoked per day.',
      zh: '焦油——香烟烟雾中的褐色黏稠残留物——沉积在支气管内壁上，其中含有数十种会损伤 DNA 的化学物质。大多数损伤会被修复，但只要有一个控制细胞分裂的基因没被修好，一个突变就足以让细胞失控分裂。形成的肿瘤长入气道，并扩散到身体其他部位。肺癌在许多国家是癌症死亡的首要原因，其风险大致与每日吸烟量成正比。',
    },
    relatedTerms: ['tar', 'nicotine', 'bronchus', 'alveolus', 'smoking'],
  },
}

/**
 * Look up the enrichment for a term, if any. Returns undefined when the term
 * is in a lesson glossary but the teacher hasn't added a figure or
 * mechanism for it yet.
 */
export function getEnrichment(subject: string, slug: string, termEn: string): ConceptEnrichment | undefined {
  const key = `${subject}/${slug}/${termEn.toLowerCase()}`
  return termEnrichments[key]
}
