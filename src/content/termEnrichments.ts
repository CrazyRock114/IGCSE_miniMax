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
    image: '/figures/g8/7-1-nutrition/image-b5-07.png',
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
    image: '/figures/g8/7-1-nutrition/image-b5-07.png',
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
    image: '/figures/g8/7-1-nutrition/image-b5-06.png',
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
    image: '/figures/g8/7-1-nutrition/image-b5-06.png',
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
    image: '/figures/g8/7-1-nutrition/image-b5-05.png',
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
    image: '/figures/g8/7-1-nutrition/figure-b5-09.png',
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
    image: '/figures/g8/7-1-nutrition/figure-b5-09.png',
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
    image: '/figures/g8/9-1-transport-animals/figure-b7-11a-rbc.png',
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
    image: '/figures/g8/9-1-transport-animals/figure-b7-12.png',
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
    image: '/figures/g8/9-1-transport-animals/figure-b7-12a-lymphocyte.png',
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
    image: '/figures/g8/9-1-transport-animals/figure-b7-04.png',
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
    image: '/figures/g8/9-1-transport-animals/figure-b7-01.png',
    imageSource: 'G8 Science · p.21, Figure B7.01',
    mechanism: {
      en: 'In a double circulation the blood passes through the heart twice per circuit. Once from the right ventricle to the lungs and back, then again from the left ventricle to the body and back. This means the blood that reaches the body has just been re-pressurised by the left ventricle — it is at high pressure, so oxygen and glucose are delivered fast. Fish have a single circulation: heart → gills → body → heart, and the pressure that the gill capillaries soak up is never replaced, so the body receives the blood slowly.',
      zh: '双循环中血液每循环一周经过心脏两次：先从右心室到肺再回来，再从左心室到全身再回来。到达全身的血液刚被左心室重新加压——处于高压，氧和葡萄糖被快速送达。鱼是单循环：心→鳃→全身→心，鳃毛细血管吸收的压力不会再补回来，所以全身得到的血液较慢。',
    },
    relatedTerms: ['pulmonary circulation', 'systemic circulation', 'single circulation', 'heart'],
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
