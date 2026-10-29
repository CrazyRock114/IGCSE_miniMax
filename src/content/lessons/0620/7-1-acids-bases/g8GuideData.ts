import type { G8AcidsBasesGuideExtra } from '@/content/types'

export const g8AcidsBasesGuideData: G8AcidsBasesGuideExtra = {
  type: 'g8-acids-bases-guide',
  id: 'g8-u2-acids-bases-interactive-handout',
  title: {
    en: 'G8 Unit 2: Acids & Bases Intensive Handout & Original PPT Gallery',
    zh: 'G8 第二单元：酸与碱官方讲义图解与原版实验精讲',
  },
  hint: {
    en: 'Explore core experiments, original diagrams from the Cambridge G8 curriculum, chemical equations, and exam takeaways for today’s 2-hour lesson.',
    zh: '深度探索今日 2 小时课程所涵盖的剑桥官方讲义原图、核心反应现象、方程式及考点要诀。',
  },
  sections: [
    {
      id: 'everyday-acids',
      title: {
        en: '1. Everyday Acids vs Laboratory Acids',
        zh: '1. 日常生活中的酸 vs 实验室常用强酸',
      },
      badge: {
        en: 'Lesson 1 · Real-world Science',
        zh: '第 1 课 · 生活科学',
      },
      subtitle: {
        en: 'Naturally occurring acids in food and human biology vs mineral acids in the laboratory',
        zh: '食品与人体生物学中的天然酸，与实验室矿物强酸的辨析',
      },
      description: {
        en: 'Acids are not just dangerous chemicals kept in school laboratories; they are essential parts of our daily diet and digestion. While everyday weak acids taste sour, laboratory mineral acids are highly concentrated, corrosive, and release a high density of H⁺ ions.',
        zh: '酸不仅仅是学校实验室里存放的危险试剂，更广泛存在于我们的日常饮食与人体消化系统中。日常弱酸往往具有清爽的酸味，而实验室矿物强酸则具有强腐蚀性，会在水溶液中电离出高浓度的氢离子（H⁺）。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-1-everyday-acids.jpg',
      imageCaption: {
        en: 'Figure 1.1: Common everyday acids found in citrus fruits (citric acid), vinegar (ethanoic acid), fizzy soft drinks (carbonic acid), and stomach digestive gastric juice (hydrochloric acid).',
        zh: '图 1.1：日常生活中常见的酸——柑橘类水果（柠檬酸）、食用醋（乙酸/醋酸）、碳酸饮料（碳酸）与胃液消化（盐酸）。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Citrus Fruits · Citric Acid',
            zh: '柑橘类水果 · 柠檬酸 (Citric Acid)',
          },
          body: {
            en: 'Found in lemons, limes, and oranges. Gives citrus its characteristic sharp, tart, sour taste. A natural organic weak acid.',
            zh: '广泛存在于柠檬、青柠和橙子中。赋予柑橘类水果标志性的酸爽口感，属于天然有机弱酸。',
          },
        },
        {
          title: {
            en: 'Vinegar · Ethanoic Acid (Acetic Acid)',
            zh: '食用醋 · 乙酸 / 醋酸 (Ethanoic Acid)',
          },
          body: {
            en: 'Formed through the bacterial oxidation of ethanol. Gives vinegar its pungent aroma and sharp preservative properties.',
            zh: '通过乙醇在醋酸菌作用下氧化而成，赋予食用醋独特的刺激性香气与天然防腐保鲜能力。',
          },
          equation: '\\mathrm{CH_3CH_2OH + O_2 \\rightarrow CH_3COOH + H_2O}',
        },
        {
          title: {
            en: 'Fizzy Drinks · Carbonic Acid',
            zh: '碳酸饮料 · 碳酸 (Carbonic Acid)',
          },
          body: {
            en: 'Formed when carbon dioxide is dissolved into water under high pressure. Causes the tingling sensation on your tongue.',
            zh: '在高压下将二氧化碳气体溶解于水中形成，进入口腔时会在舌尖产生清脆的沙沙刺痛感。',
          },
          equation: '\\mathrm{CO_2(g) + H_2O(l) \\rightleftharpoons H_2CO_3(aq)}',
        },
        {
          title: {
            en: 'Stomach Gastric Juice · Hydrochloric Acid',
            zh: '胃液 · 盐酸 (Hydrochloric Acid)',
          },
          body: {
            en: 'Human stomachs secrete dilute hydrochloric acid (~pH 1.5–2.0) to provide the optimum acidic environment for protease enzymes and kill swallowed bacteria.',
            zh: '人体胃腺主动分泌稀盐酸（pH 约 1.5–2.0），为胃蛋白酶提供最佳酸性催化环境，并杀灭随食物吞入的绝大多数病原细菌。',
          },
        },
      ],
      keyTakeaway: {
        en: 'The Three Essential Laboratory Mineral Acids to Memorise: Hydrochloric acid (HCl → makes chlorides), Sulfuric acid (H₂SO₄ → makes sulfates), and Nitric acid (HNO₃ → makes nitrates).',
        zh: '必须熟记的三大实验室强酸：盐酸（HCl，生成氯化物）、硫酸（H₂SO₄，生成硫酸盐）、硝酸（HNO₃，生成硝酸盐）。',
      },
      quiz: {
        question: {
          en: 'Which acid is naturally produced in the human stomach to kill ingested bacteria and activate digestive enzymes?',
          zh: '人体胃部自然分泌哪种酸来杀灭吞入的细菌并激活消化酶？',
        },
        options: [
          { en: 'Citric acid', zh: '柠檬酸' },
          { en: 'Hydrochloric acid', zh: '盐酸 (HCl)' },
          { en: 'Ethanoic acid', zh: '乙酸 (醋酸)' },
          { en: 'Sulfuric acid', zh: '硫酸' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! The gastric mucosa secretes hydrochloric acid (HCl) at pH 1.5–2.0, providing optimum pH for pepsin while sterilising food.',
          zh: '回答正确！胃黏膜壁细胞分泌盐酸（HCl），使胃液 pH 维持在 1.5–2.0 之间，既能给胃蛋白酶提供最佳酸性，又能消灭细菌。',
        },
      },
    },
    {
      id: 'acid-metal-reaction',
      title: {
        en: '2. Acids + Metals & The Squeaky Pop Test',
        zh: '2. 酸与活泼金属置换反应与氢气爆鸣测试',
      },
      badge: {
        en: 'Lesson 1 · Core Experiment',
        zh: '第 1 课 · 核心实验',
      },
      subtitle: {
        en: 'Rapid effervescence, metal dissolution, and rigorous confirmation of hydrogen gas',
        zh: '剧烈剧烈冒泡、金属溶解与氢气确证检验的完整考评规范',
      },
      description: {
        en: 'When a reactive metal is dropped into dilute acid, a single displacement redox reaction takes place. The metal atoms lose electrons to form positive metal ions in solution, while hydrogen ions gain electrons to form hydrogen gas bubbles.',
        zh: '当活泼金属投入稀酸中时，会发生单置换氧化还原反应。金属原子失去电子形成溶解在水中的金属阳离子，而酸中的氢离子（H⁺）得到电子结合生成氢气气泡。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-2-acid-metal-reaction.png',
      secondaryImage: '/figures/g8/0620-7-1-acids-bases/fig-1-3-hydrogen-pop-test.png',
      imageCaption: {
        en: 'Figure 1.2 & 1.3: Left: Magnesium reacting vigorously with dilute hydrochloric acid producing bubbles of hydrogen. Right: The classic "Squeaky Pop" test using a lighted splint at the mouth of the test tube.',
        zh: '图 1.2 与 1.3：左图为镁条与稀盐酸剧烈反应产生大量氢气气泡；右图为在试管口使用点燃的木条进行经典的“爆鸣实验 (Squeaky Pop Test)”。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Universal Word Equation',
            zh: '通用反应文字表达式',
          },
          body: {
            en: 'Acid + Metal → Salt + Hydrogen. The salt contains the metal cation bonded with the acid anion.',
            zh: '酸 + 金属 → 盐 + 氢气。生成的盐由金属阳离子与酸根阴离子组成。',
          },
          equation: '\\text{Acid} + \\text{Metal} \\rightarrow \\text{Salt} + \\text{Hydrogen}',
        },
        {
          title: {
            en: 'Three Key Visual & Thermal Observations',
            zh: '三大核心实验观察现象（考卷必答点）',
          },
          body: {
            en: '1. Rapid effervescence (stream of colourless gas bubbles); 2. Metal ribbon gradually gets smaller and dissolves; 3. Test tube feels noticeably warm (exothermic reaction).',
            zh: '1. 剧烈冒泡（产生大量无色气泡，术语：Effervescence）；2. 金属条逐渐溶解变小直至消失；3. 试管外壁明显发热发烫（放热反应，Exothermic）。',
          },
          equation: '\\mathrm{Mg(s) + 2HCl(aq) \\rightarrow MgCl_2(aq) + H_2(g)}',
        },
        {
          title: {
            en: 'Hydrogen Identification: The "Squeaky Pop" Test',
            zh: '氢气专属性检验：木条爆鸣法（剑桥考纲 0620 评分标准）',
          },
          body: {
            en: 'Collect the evolved gas by placing a thumb over the tube. Introduce a LIGHTED (burning) splint to the mouth of the tube. A sharp squeaky "pop" sound confirms hydrogen gas.',
            zh: '用拇指紧按试管口收集反应气体。将一根点燃的木条（Lighted/Burning splint）移至试管口处。听到清脆短促的“噗”爆鸣声，确认为氢气。',
          },
          equation: '\\mathrm{2H_2(g) + O_2(g) \\rightarrow 2H_2O(l)}',
        },
      ],
      keyTakeaway: {
        en: 'Examiner Warning: NEVER say "glowing splint" for hydrogen! A glowing splint is used to test for Oxygen (relights). For Hydrogen, you MUST state "lighted / burning splint" and record "squeaky pop".',
        zh: '考官避坑警示：检验氢气绝对不能使用“带火星的木条 (Glowing splint)”！带火星木条专用于检验氧气（复燃）。检验氢气必须答出“点燃的木条 (Lighted splint)”并记录听到“清脆爆鸣声 (Squeaky pop)”！',
      },
      quiz: {
        question: {
          en: 'What is the correct scientific test and positive result for hydrogen gas produced in an acid-metal reaction?',
          zh: '酸与金属反应产生的氢气的标准检验方法与阳性结果是什么？',
        },
        options: [
          { en: 'Introduce a glowing splint; it relights', zh: '伸入带火星的木条；木条复燃' },
          { en: 'Bubble through limewater; it turns cloudy', zh: '通入澄清石灰水；石灰水变浑浊' },
          { en: 'Hold a lighted splint at the tube mouth; it produces a squeaky pop', zh: '将点燃的木条移至管口；发出清脆的爆鸣声 (Squeaky pop)' },
          { en: 'Damp red litmus paper turns blue', zh: '湿润的红色石蕊试纸变蓝' },
        ],
        correctIndex: 2,
        explanation: {
          en: 'Correct! Hydrogen reacts explosively on a microscopic scale with oxygen when ignited by a lighted splint, giving the squeaky pop sound.',
          zh: '回答正确！点燃的木条引燃氢气与氧气混合气体，发生瞬时微型燃烧爆炸（2H₂ + O₂ → 2H₂O），产生清脆的爆鸣声。',
        },
      },
    },
    {
      id: 'reactivity-series',
      title: {
        en: '3. Reactivity Series & Why Copper Does Not React',
        zh: '3. 金属活动性顺序与铜不反应之谜',
      },
      badge: {
        en: 'Lesson 1 · Reactivity Ranking',
        zh: '第 1 课 · 活动性递变',
      },
      subtitle: {
        en: 'Displacement hierarchy and the hydrogen boundary line in acid reactions',
        zh: '置换反应竞争机制与酸反应中的氢界限',
      },
      description: {
        en: 'Metals do not react with acids with equal vigor. Their reactivity depends on how easily their atoms lose outer shell valence electrons to form positive ions. Metals above hydrogen displace it rapidly; metals below hydrogen cannot displace it at all.',
        zh: '不同金属与酸反应的剧烈程度大相径庭。金属的化学活性取决于其原子失去最外层价电子形成阳离子的难易程度。排在氢前面的金属能迅速置换出酸中的氢；而排在氢后面的金属则完全无法置换出氢气。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-4-reactivity-series.png',
      imageCaption: {
        en: 'Figure 1.4: The Metal Reactivity Series ladder. Notice Hydrogen (H) marked as the critical dividing line. Metals above H react with acids with decreasing violence; metals below H (Cu, Ag, Au) do not react.',
        zh: '图 1.4：金属活动性顺序阶梯表。注意氢（H）是关键分界线：位于氢上方的金属与酸反应剧烈程度依次递减；位于氢下方的铜（Cu）、银（Ag）、金（Au）与稀酸完全不反应。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Reactivity Hierarchy Order',
            zh: '金属活动性顺序记忆口诀',
          },
          body: {
            en: 'Potassium (K) > Sodium (Na) > Calcium (Ca) > Magnesium (Mg) > Aluminium (Al) > Zinc (Zn) > Iron (Fe) > [Hydrogen (H)] > Copper (Cu) > Silver (Ag) > Gold (Au).',
            zh: '钾 (K) > 钠 (Na) > 钙 (Ca) > 镁 (Mg) > 铝 (Al) > 锌 (Zn) > 铁 (Fe) > [氢 (H)] > 铜 (Cu) > 银 (Ag) > 金 (Au)。口诀：“嫁给那美女，身体细纤轻，统共一百斤”。',
          },
        },
        {
          title: {
            en: 'Violent Metals (K, Na, Ca)',
            zh: '极度活泼金属（钾、钠、钙）',
          },
          body: {
            en: 'React far too dangerously and explosively with acids. In school laboratories, they are NEVER added to acids for safety reasons.',
            zh: '与酸反应过于剧烈，会发生危险的瞬时剧烈爆炸并喷溅强酸，中学实验室严禁将钾或钠投入酸中！',
          },
        },
        {
          title: {
            en: 'Ideal Laboratory Metals (Mg, Zn, Fe)',
            zh: '实验室最适宜金属（镁、锌、铁）',
          },
          body: {
            en: 'Magnesium reacts very rapidly; Zinc reacts at a steady, controllable pace (ideal for gas collection); Iron reacts slowly with gentle bubbling.',
            zh: '镁反应极快；锌反应平稳、气流均匀可控（是实验室制备与收集氢气的首选）；铁反应缓慢，产生细密均匀的小气泡。',
          },
          equation: '\\mathrm{Zn(s) + H_2SO_4(aq) \\rightarrow ZnSO_4(aq) + H_2(g)}',
        },
        {
          title: {
            en: 'The Copper Mystery: Why No Reaction Occurs',
            zh: '铜的实验现象：为什么完全不反应？（高频考点）',
          },
          body: {
            en: 'Copper sits BELOW hydrogen in the reactivity series. Copper atoms have a lower tendency to lose electrons than hydrogen. Therefore: Copper + dilute HCl → NO REACTION (no fizzing, copper remains unchanged).',
            zh: '铜在活动性顺序表中排在氢之后。铜原子失去电子的能力弱于氢原子，无法将电子给予 H⁺。因此：铜 + 稀盐酸 → 不发生反应（无气泡产生，铜片完好如初）。',
          },
        },
      ],
      keyTakeaway: {
        en: 'Exam Trap: If an exam question asks "What is observed when copper is added to dilute sulfuric acid at room temperature?", the only correct answer is: "No bubbles / no effervescence / no reaction / solid remains unchanged".',
        zh: '考试高频陷阱：如果考卷提问“室温下将铜片投入稀硫酸中观察到什么现象？”，唯一标准答案是：“无气泡产生 / 无明显现象 / 不发生反应 / 固体保持不变”。绝不能编造有气泡！',
      },
      quiz: {
        question: {
          en: 'A student places pieces of magnesium, iron, and copper into separate test tubes of dilute hydrochloric acid. What will they observe in the tube with copper?',
          zh: '学生将镁、铁、铜分别放入盛有稀盐酸的三支试管中。盛有铜的试管里会观察到什么？',
        },
        options: [
          { en: 'Violent fizzing and blue solution formed', zh: '剧烈冒泡并生成蓝色溶液' },
          { en: 'Slow formation of squeaky pop gas', zh: '缓慢产生能发出爆鸣声的气体' },
          { en: 'No reaction / no bubbles observed', zh: '不发生反应 / 观察不到任何气泡' },
          { en: 'White precipitate forms immediately', zh: '立即产生白色沉淀' },
        ],
        correctIndex: 2,
        explanation: {
          en: 'Correct! Copper is below hydrogen in the reactivity series, so it cannot displace hydrogen from dilute acids.',
          zh: '回答正确！铜排在氢之后，无法从稀酸中置换出氢气，因此既没有反应也不产生气泡。',
        },
      },
    },
    {
      id: 'neutralisation-salt-naming',
      title: {
        en: '4. Neutralisation & The Golden Salt Naming Rules',
        zh: '4. 酸碱中和反应与命名盐的两步金法则',
      },
      badge: {
        en: 'Lesson 2 · Reaction & Synthesis',
        zh: '第 2 课 · 反应与制盐',
      },
      subtitle: {
        en: 'Proton transfer, heat release, and systematic nomenclature of chemical salts',
        zh: '质子转移、热量释放与化学盐类的两步系统命名铁律',
      },
      description: {
        en: 'Neutralisation is the reaction between an acid and a base (metal oxide, metal hydroxide, or alkali) to form a salt and water. The hydrogen ions (H⁺) from the acid combine with the hydroxide ions (OH⁻) from the base to produce neutral water molecules.',
        zh: '中和反应是酸与碱（金属氧化物、金属氢氧化物或可溶性碱）反应生成盐和水的过程。来自酸的氢离子（H⁺）与来自碱的氢氧根离子（OH⁻）结合，生成电中性的水分子。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-8-acid-base-neutralisation.png',
      imageCaption: {
        en: 'Figure 1.5: Acid and base neutralising each other. The acidic properties of H⁺ and the alkaline properties of OH⁻ cancel out completely, producing neutral water and salt.',
        zh: '图 1.5：酸与碱相互中和消解。酸性的 H⁺ 与碱性的 OH⁻ 完全结合抵消，生成中性水分子与溶解的盐类晶体离子。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Fundamental Word & Ionic Equations',
            zh: '核心文字与离子方程式',
          },
          body: {
            en: 'Acid + Base → Salt + Water. The essential ionic reaction across all aqueous neutralisations is: H⁺(aq) + OH⁻(aq) → H₂O(l). The reaction is always EXOTHERMIC (releases heat energy).',
            zh: '酸 + 碱 → 盐 + 水。所有水溶液中和反应的离子反应本质均为：H⁺(aq) + OH⁻(aq) → H₂O(l)。该反应始终是放热反应（Exothermic，释放热量使温度升高）。',
          },
          equation: '\\mathrm{H^+(aq) + OH^-(aq) \\rightarrow H_2O(l) \\quad (\\Delta H < 0)}',
        },
        {
          title: {
            en: 'Step 1 of Salt Naming: The First Word',
            zh: '第一步：确定盐的姓氏（金属名称）',
          },
          body: {
            en: 'The first word of the salt’s name comes directly from the metal in the base (e.g., Sodium hydroxide → "Sodium ...", Copper oxide → "Copper ...", Magnesium hydroxide → "Magnesium ...").',
            zh: '盐名称的第一个词直接取自碱中的金属元素名称（例如：氢氧化钠 → “钠... / Sodium...”，氧化铜 → “铜... / Copper...”，氢氧化镁 → “镁... / Magnesium...”）。',
          },
        },
        {
          title: {
            en: 'Step 2 of Salt Naming: The Second Word',
            zh: '第二步：确定盐的后缀（酸根名称）',
          },
          body: {
            en: 'The second word depends on the acid used:\n• Hydrochloric acid → Chloride (-Cl)\n• Sulfuric acid → Sulfate (-SO₄)\n• Nitric acid → Nitrate (-NO₃)',
            zh: '第二个词完全由所使用的酸决定：\n• 盐酸 (Hydrochloric acid) → 氯化物 (Chloride)\n• 硫酸 (Sulfuric acid) → 硫酸盐 (Sulfate)\n• 硝酸 (Nitric acid) → 硝酸盐 (Nitrate)',
          },
        },
        {
          title: {
            en: 'Worked Examples for Practice',
            zh: '课堂经典反应实战配对',
          },
          body: {
            en: '1. Hydrochloric acid + Sodium hydroxide → Sodium chloride + Water\n2. Sulfuric acid + Copper(II) oxide → Copper(II) sulfate + Water\n3. Nitric acid + Potassium hydroxide → Potassium nitrate + Water',
            zh: '1. 盐酸 + 氢氧化钠 → 氯化钠 + 水 (NaCl + H₂O)\n2. 硫酸 + 氧化铜 → 硫酸铜 + 水 (CuSO₄ + H₂O)\n3. 硝酸 + 氢氧化钾 → 硝酸钾 + 水 (KNO₃ + H₂O)',
          },
          equation: '\\mathrm{CuO(s) + H_2SO_4(aq) \\rightarrow CuSO_4(aq) + H_2O(l)}',
        },
      ],
      keyTakeaway: {
        en: 'Naming Formula: [Metal Name from Base] + [Acid Suffix (Chloride / Sulfate / Nitrate)]. Example: Calcium oxide + Nitric acid produces Calcium nitrate!',
        zh: '命名通用公式：【碱中的金属名】 + 【酸根后缀（氯化物 / 硫酸盐 / 硝酸盐）】。例如：氧化钙 + 硝酸 必定生成 硝酸钙！',
      },
      quiz: {
        question: {
          en: 'What is the full chemical name of the salt produced when Copper(II) oxide reacts with dilute sulfuric acid?',
          zh: '氧化铜与稀硫酸充分反应后生成的盐的完整化学名称是什么？',
        },
        options: [
          { en: 'Copper chloride', zh: '氯化铜' },
          { en: 'Copper sulfate', zh: '硫酸铜 (Copper sulfate)' },
          { en: 'Copper nitrate', zh: '硝酸铜' },
          { en: 'Copper sulfide', zh: '硫化铜' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! The metal is copper and the acid is sulfuric acid, so the salt formed is Copper(II) sulfate (CuSO₄).',
          zh: '回答正确！金属为铜，所用的酸为硫酸（Sulfuric acid），后缀变为 Sulfate，因此生成的盐为硫酸铜（Copper sulfate）。',
        },
      },
    },
    {
      id: 'carbonates-limewater-test',
      title: {
        en: '5. Acids + Carbonates & The Limewater Test',
        zh: '5. 酸与碳酸盐反应与澄清石灰水二氧化碳检验',
      },
      badge: {
        en: 'Lesson 2 · Core Gas Test',
        zh: '第 2 课 · 核心气体检验',
      },
      subtitle: {
        en: 'Three-product reaction, delivery tube apparatus, and real-world baking & acid rain science',
        zh: '三大生成物规律、导气管检验装置及小苏打烘焙与酸雨风化的现实科学',
      },
      description: {
        en: 'Carbonates contain the carbonate ion (CO₃²⁻). When an acid reacts with any metal carbonate, it produces THREE distinct products: a salt, water, and carbon dioxide gas. The carbon dioxide gas is confirmed using the definitive limewater test.',
        zh: '碳酸盐含有碳酸根离子（CO₃²⁻）。当酸与任何金属碳酸盐相遇时，必定生成三类产物：盐、水和二氧化碳气体。产生的二氧化碳必须通过澄清石灰水进行权威确证。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-5-acid-carbonate-limewater.png',
      imageCaption: {
        en: 'Figure 1.6: Reaction of acid with calcium carbonate. The delivery tube channels the carbon dioxide gas into limewater (calcium hydroxide solution), turning it cloudy white with a fine CaCO₃ precipitate.',
        zh: '图 1.6：酸与碳酸钙反应实验装置。导气管将逸出的二氧化碳气体导入澄清石灰水（氢氧化钙溶液）中，微溶性碳酸钙白色沉淀使溶液变乳白浑浊。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Universal Reaction Equation',
            zh: '三大产物通用反应规律',
          },
          body: {
            en: 'Acid + Carbonate → Salt + Water + Carbon Dioxide. Unlike acids with metals (which yield 2 products), carbonate reactions always yield 3 products.',
            zh: '酸 + 碳酸盐 → 盐 + 水 + 二氧化碳。与酸反应生成 2 种产物的金属不同，碳酸盐反应必定生成 3 种产物。',
          },
          equation: '\\mathrm{CaCO_3(s) + 2HCl(aq) \\rightarrow CaCl_2(aq) + H_2O(l) + CO_2(g)}',
        },
        {
          title: {
            en: 'The Limewater Test: Apparatus & Key Observation',
            zh: '澄清石灰水检验法：仪器连接与满分考评标准',
          },
          body: {
            en: 'Connect a delivery tube from the reaction flask into a test tube of fresh limewater (calcium hydroxide solution, Ca(OH)₂). Observation: Limewater turns CLOUDY / MILKY WHITE due to insoluble calcium carbonate precipitate.',
            zh: '用导气管将锥形瓶中的气体通入新鲜澄清石灰水（氢氧化钙溶液 Ca(OH)₂）中。实验现象：澄清石灰水变“浑浊 / 乳白色”（Cloudy / Milky white），因生成难溶的碳酸钙白色沉淀。',
          },
          equation: '\\mathrm{Ca(OH)_2(aq) + CO_2(g) \\rightarrow CaCO_3(s)\\downarrow + H_2O(l)}',
        },
        {
          title: {
            en: 'Real-world Application: Baking Cake Science',
            zh: '现实生活科学：蛋糕烘焙发酵的化学奥秘',
          },
          body: {
            en: 'Baking powder contains sodium hydrogencarbonate (NaHCO₃) and a weak solid acid (e.g. cream of tartar). When water is added in the batter, they react to release CO₂ bubbles that expand in the oven, creating a spongy cake texture.',
            zh: '发酵泡打粉含有碳酸氢钠（NaHCO₃，小苏打）与固体弱酸（如酒石酸氢钾）。面糊加水并放入烤箱加热后，两者迅速反应释放出成千上万个微型二氧化碳气泡，使蛋糕松软多孔。',
          },
        },
        {
          title: {
            en: 'Real-world Application: Acid Rain Weathering',
            zh: '现实环境科学：酸雨对大理石与历史古迹的腐蚀',
          },
          body: {
            en: 'Statues and historic buildings made of limestone or marble (CaCO₃) are slowly dissolved by acidic rainwater (containing H₂SO₄ and HNO₃ from fossil fuel emissions), eroding delicate details over decades.',
            zh: '石灰石和大理石古迹雕像的核心成分是碳酸钙（CaCO₃）。化石燃料燃烧排放的硫氧化物和氮氧化物形成的酸雨，会与碳酸钙缓慢反应，数十年来不断溶蚀损坏文物的精细雕刻。',
          },
        },
      ],
      keyTakeaway: {
        en: 'Cambridge Marking Rule: For the CO₂ test, you must state: "Bubble gas through limewater" and observation "turns cloudy / milky". Never just say "limewater changes color" without specifying cloudy/milky!',
        zh: '剑桥考评铁律：在描述二氧化碳检验时，必须明确写出：“通入澄清石灰水 (Bubble through limewater)”，现象必须写“变浑浊 / 乳白色 (Turns cloudy / milky)”，只写“变色”会被扣分！',
      },
      quiz: {
        question: {
          en: 'What precipitate is formed that causes limewater to turn cloudy white during a positive test for carbon dioxide?',
          zh: '在二氧化碳阳性检验中，导致澄清石灰水变乳白浑浊的白色沉淀化学式是什么？',
        },
        options: [
          { en: 'Calcium chloride (CaCl₂)', zh: '氯化钙 (CaCl₂)' },
          { en: 'Calcium carbonate (CaCO₃)', zh: '碳酸钙 (CaCO₃)' },
          { en: 'Calcium oxide (CaO)', zh: '氧化钙 (CaO)' },
          { en: 'Sodium carbonate (Na₂CO₃)', zh: '碳酸钠 (Na₂CO₃)' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! CO₂ reacts with aqueous Ca(OH)₂ to form insoluble calcium carbonate (CaCO₃) suspended in water as a white cloud.',
          zh: '回答正确！CO₂ 与石灰水中的 Ca(OH)₂ 反应生成微溶/难溶的碳酸钙（CaCO₃）微粒，悬浮在水中形成乳白浑浊。',
        },
      },
    },
    {
      id: 'indicators-and-ph-scale',
      title: {
        en: '6. Indicators Spectrum & The Logarithmic pH Scale',
        zh: '6. 指示剂变色全景与对数 pH 标度体系',
      },
      badge: {
        en: 'Lesson 3 Preview · Colorimetry',
        zh: '第 3 课预热 · 比色分析',
      },
      subtitle: {
        en: 'Cambridge 0620 official colour transitions and Universal Indicator rainbow',
        zh: '剑桥 0620 官方三大指示剂颜色判定与广范指示剂彩虹全谱',
      },
      description: {
        en: 'An indicator is a chemical dye that changes color depending on whether it is placed in an acidic, neutral, or alkaline environment. The pH scale from 0 to 14 provides an exact logarithmic measurement of hydrogen ion concentration.',
        zh: '指示剂是一种在不同酸碱度环境中呈现不同特征颜色的化学染料分子。0 到 14 的 pH 标度体系则提供了氢离子浓度的精确对数量度。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-6-three-indicators.png',
      secondaryImage: '/figures/g8/0620-7-1-acids-bases/fig-1-7-ph-scale-spectrum.png',
      imageCaption: {
        en: 'Figure 1.7 & 1.8: Top: Official colour bands for Litmus, Methyl orange, and Thymolphthalein. Bottom: Universal Indicator continuous rainbow colour spectrum spanning pH 0 to 14.',
        zh: '图 1.7 与 1.8：上方为剑桥官方考纲三大指示剂（石蕊、甲基橙、百里酚酞）标准变色带；下方为广范指示剂（Universal Indicator）从 pH 0 到 14 的连续彩虹色谱。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Litmus Paper & Solution',
            zh: '石蕊 (Litmus) 试纸与溶液',
          },
          body: {
            en: '• In Acid: RED\n• In Neutral: PURPLE\n• In Alkali: BLUE',
            zh: '• 酸性溶液中：显红色 (Red)\n• 中性溶液中：显紫色 (Purple)\n• 碱性溶液中：显蓝色 (Blue)',
          },
        },
        {
          title: {
            en: 'Methyl Orange (Cambridge 0620 Mandatory)',
            zh: '甲基橙 (Methyl Orange · 剑桥必考)',
          },
          body: {
            en: '• In Acid: RED (pH < 3.1)\n• End point: PEACH / ORANGE (pH ~3.7)\n• In Alkali: YELLOW (pH > 4.4)',
            zh: '• 酸性溶液中：显红色 (Red, pH < 3.1)\n• 滴定终点过渡：显橙桃色 (Peach / Orange)\n• 碱性溶液中：显黄色 (Yellow, pH > 4.4)',
          },
        },
        {
          title: {
            en: 'Thymolphthalein (Cambridge 0620 Mandatory)',
            zh: '百里酚酞 (Thymolphthalein · 剑桥必考)',
          },
          body: {
            en: '• In Acid & Neutral: COLOURLESS (pH < 9.3)\n• In Alkali: BLUE (pH > 10.5)',
            zh: '• 酸性与中性环境中：无色透明 (Colourless)\n• 碱性环境中：显鲜艳蓝色 (Blue, pH > 10.5)',
          },
        },
        {
          title: {
            en: 'The Logarithmic pH Scale Meaning',
            zh: 'pH 对数标度的本质涵义',
          },
          body: {
            en: 'A change of 1 pH unit represents a TEN-FOLD (10×) change in hydrogen ion concentration! A solution at pH 1 has 10 times more H⁺ than pH 2, and 100 times more H⁺ than pH 3.',
            zh: 'pH 值每相差 1 个单位，代表氢离子浓度相差整整 10 倍！pH 1 的强酸溶液其 H⁺ 浓度是 pH 2 的 10 倍，是 pH 3 的 100 倍！',
          },
        },
      ],
      keyTakeaway: {
        en: 'Cambridge 0620 Color Table: Remember that Thymolphthalein turns BLUE in alkali (NOT pink like phenolphthalein!). Methyl orange turns YELLOW in alkali and RED in acid.',
        zh: '剑桥 0620 专用颜色表提醒：百里酚酞在碱中变成蓝色（不是酚酞的粉红！），甲基橙在碱中呈黄色、在酸中呈红色！',
      },
      quiz: {
        question: {
          en: 'What color does thymolphthalein turn when added to a solution of sodium hydroxide (pH 13)?',
          zh: '将百里酚酞加入氢氧化钠溶液（pH 13）中会呈现什么颜色？',
        },
        options: [
          { en: 'Pink', zh: '粉红色' },
          { en: 'Blue', zh: '蓝色 (Blue)' },
          { en: 'Colourless', zh: '无色' },
          { en: 'Yellow', zh: '黄色' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! Thymolphthalein changes from colourless at pH < 9.3 to vibrant blue in alkaline solutions above pH 10.5.',
          zh: '回答正确！百里酚酞在 pH > 10.5 的碱性溶液中会呈现鲜明的蓝色。',
        },
      },
    },
    {
      id: 'ions-and-conductivity',
      title: {
        en: '7. Ions in Solution & Electrical Conductivity',
        zh: '7. 溶液中的微观离子与导电性测试',
      },
      badge: {
        en: 'Lesson 7 · Microscopic Theory',
        zh: '第 7 课 · 微观离子理论',
      },
      subtitle: {
        en: 'H⁺ in acids, OH⁻ in alkalis, and how mobile charged particles carry electric current',
        zh: '酸中氢离子、碱中氢氧根与自由移动带电粒子导电本质',
      },
      description: {
        en: 'Why do acidic and alkaline solutions conduct electricity, while pure distilled water cannot? In aqueous solution, acids release hydrogen ions (H⁺) and alkalis release hydroxide ions (OH⁻). These freely moving charged ions act as charge carriers in an electrical circuit.',
        zh: '为什么酸性溶液与碱性溶液能够导电，而纯蒸馏水却几乎不导电？在水溶液中，酸电离产生氢离子（H⁺），碱电离产生氢氧根离子（OH⁻）。这些能在水中自由移动的带电离子充当了闭合回路中的电荷载流子。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-9-ions-particles.png',
      secondaryImage: '/figures/g8/0620-7-1-acids-bases/fig-1-10-electrical-conductivity.png',
      imageCaption: {
        en: 'Figure 1.9 & 1.10: Left: Particle model showing H⁺ ions in acid and OH⁻ ions in alkali. Right: Circuit with DC power source, bulb, and inert electrodes dipped into aqueous solution to test electrical conductivity.',
        zh: '图 1.9 与 1.10：左图为酸中 H⁺ 离子与碱中 OH⁻ 离子的粒子微观模型；右图为利用电源、灯泡及插入溶液中的惰性电极测试溶液导电性的标准实验装置。',
      },
      bulletPoints: [
        {
          title: {
            en: 'The Universal Definition of Acid & Alkali Ions',
            zh: '酸与碱的微观离子定义',
          },
          body: {
            en: 'An acid is any chemical that produces hydrogen ions (H⁺) when dissolved in water. An alkali is a soluble base that produces hydroxide ions (OH⁻) when dissolved in water.',
            zh: '酸是溶于水时能电离产生氢离子（H⁺）的化合物；碱（可溶性碱）是溶于水时能电离产生氢氧根离子（OH⁻）的化合物。',
          },
          equation: '\\mathrm{HCl(aq) \\rightarrow H^+(aq) + Cl^-(aq), \\quad NaOH(aq) \\rightarrow Na^+(aq) + OH^-(aq)}',
        },
        {
          title: {
            en: 'Electrical Conductivity Mechanism',
            zh: '导电性微观机理与灯泡实验',
          },
          body: {
            en: 'Pure water contains almost no free ions (non-conductor; bulb remains off). When acid or alkali is added, free mobile ions migrate toward opposite electrodes: cations (H⁺) to the cathode, anions to the anode, completing the circuit and making the bulb glow brightly.',
            zh: '纯水几乎不电离，极度缺乏自由移动的离子（灯泡不发光）。加入酸或碱后，大量带电离子在电场驱动下定向移动：阳离子（H⁺）移向阴极，阴离子移向阳极，接通电路使灯泡明亮发光。',
          },
        },
        {
          title: {
            en: 'Concentration of Ions Determines Current',
            zh: '离子浓度与导电强度的正相关规律',
          },
          body: {
            en: 'The greater the concentration of free mobile ions, the higher the electrical conductivity of the electrolyte solution and the brighter the test lamp glows.',
            zh: '溶液中自由移动离子的浓度越高，电解质溶液的电导率就越高，电路中串联的测试小灯泡发光越耀眼。',
          },
        },
      ],
      keyTakeaway: {
        en: 'Core Exam Concept: Two conditions are REQUIRED for any liquid to conduct electricity: 1. Must contain charged particles (ions or electrons); 2. Those particles must be free to move.',
        zh: '核心考点定律：任何液体导电必须同时满足两大刚性条件：1. 必须含有带电粒子（离子或自由电子）；2. 这些带电粒子必须能够自由移动。',
      },
      quiz: {
        question: {
          en: 'Why does dilute hydrochloric acid conduct electricity whereas pure distilled water does not?',
          zh: '为什么稀盐酸能够导电，而纯蒸馏水却几乎不导电？',
        },
        options: [
          { en: 'Hydrochloric acid contains free-moving metal atoms', zh: '盐酸中含有自由移动的金属原子' },
          { en: 'Hydrochloric acid contains mobile H⁺ and Cl⁻ ions', zh: '盐酸在水中完全电离出能自由移动的 H⁺ 和 Cl⁻ 离子' },
          { en: 'Pure water has free electrons that move too fast', zh: '纯水中的自由电子移动过快' },
          { en: 'Pure water neutralises electrical charge', zh: '纯水会中和抵消所有电荷' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! Hydrochloric acid dissociates completely in water into freely moving H⁺ and Cl⁻ ions, which act as mobile charge carriers.',
          zh: '回答正确！盐酸在水中完全电离为自由移动的 H⁺ 与 Cl⁻ 离子，充当了导电的电荷载流子。',
        },
      },
    },
    {
      id: 'proton-transfer-bronsted-lowry',
      title: {
        en: '8. Proton Transfer Theory & The Ammonia Demonstration',
        zh: '8. 布朗斯特-劳里质子转移理论与氨气特征实验',
      },
      badge: {
        en: 'Lesson 10 · Extended Theory',
        zh: '第 10 课 · 质子转移理论',
      },
      subtitle: {
        en: 'Acids as proton (H⁺) donors, bases as proton acceptors, and the classic white smoke ring',
        zh: '酸作为质子给体、碱作为质子受体与经典的氯化铵白烟环扩散实验',
      },
      description: {
        en: 'A hydrogen atom consists of one proton and one electron. When it loses its electron to form H⁺, only the bare nucleus remains — a proton! Therefore, in the Brønsted–Lowry definition, acid–base chemistry is simply the transfer of protons from donors to acceptors.',
        zh: '氢原子由 1 个质子和 1 个核外电子组成。当它失去电子成为 H⁺ 离子时，只剩下一个裸露的原子核——即单个质子！因此，在布朗斯特-劳里（Brønsted–Lowry）理论中，酸碱反应本质上就是质子（H⁺）从给体转移至受体的过程。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-11-proton-transfer-ammonia.png',
      imageCaption: {
        en: 'Figure 1.11: Left: Ammonia (NH₃) accepting a proton from water to form the ammonium ion (NH₄⁺). Right: The classic diffusion experiment: NH₃ gas and HCl gas meet in a glass tube to form a dense white smoke ring of NH₄Cl.',
        zh: '图 1.11：左图为氨分子（NH₃）接受质子形成铵根离子（NH₄⁺）；右图为经典的扩散管实验：浓氨水与浓盐酸挥发出的气体相遇，化合生成氯化铵（NH₄Cl）微晶密集白烟环。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Brønsted–Lowry Formal Definitions',
            zh: '剑桥 0620 考纲官方权威定义',
          },
          body: {
            en: '• An acid is a PROTON DONOR (releases H⁺).\n• A base is a PROTON ACCEPTOR (accepts H⁺).\nIn neutralisation: H⁺ (from acid) + OH⁻ (from base) → H₂O.',
            zh: '• 酸是质子给体 (Proton Donor，释放 H⁺)。\n• 碱是质子受体 (Proton Acceptor，接受 H⁺)。\n在中和反应中：来自酸的 H⁺ 被来自碱的 OH⁻ 接受结合生成水分子。',
          },
          equation: '\\mathrm{Acid (donor) + Base (acceptor) \\rightarrow Conjugate\\ Pair}',
        },
        {
          title: {
            en: 'Ammonia (NH₃) as a Brønsted Base',
            zh: '氨气（NH₃）作为典型质子受体的反应',
          },
          body: {
            en: 'Ammonia contains a lone pair of electrons on the nitrogen atom. When dissolved in water, it grabs a proton (H⁺) from water to form an ammonium ion (NH₄⁺) and leaves hydroxide (OH⁻) behind, making the solution alkaline.',
            zh: '氨气分子中的氮原子拥有一对孤对电子。当其溶于水时，能主动从水分子中夺取一个质子（H⁺）结合成铵根离子（NH₄⁺），并释放出 OH⁻ 使溶液呈弱碱性。',
          },
          equation: '\\mathrm{NH_3(aq) + H_2O(l) \\rightleftharpoons NH_4^+(aq) + OH^-(aq)}',
        },
        {
          title: {
            en: 'Ammonia & HCl Diffusion Tube Demonstration',
            zh: '浓氨水与浓盐酸气相扩散白烟环实验（考卷经典大题）',
          },
          body: {
            en: 'Cotton wool soaked in conc. NH₃ is placed at one end of a sealed glass tube, conc. HCl at the other. Gaseous NH₃ (M_r = 17) is lighter and diffuses faster than HCl (M_r = 36.5). Therefore, the white smoke ring of solid ammonium chloride forms CLOSER to the hydrochloric acid end!',
            zh: '在两端开口的玻璃管两端分别塞入浸有浓氨水与浓盐酸的脱脂棉球。NH₃ 分子量小（Mr = 17）扩散速率快，HCl 分子量大（Mr = 36.5）扩散慢。两者相遇生成的白色氯化铵固体烟环必定更靠近浓盐酸一侧！',
          },
          equation: '\\mathrm{NH_3(g) + HCl(g) \\rightarrow NH_4Cl(s)}',
        },
      ],
      keyTakeaway: {
        en: 'Exam Trap: In NH₃ + HCl → NH₄Cl, HCl is the acid (donates H⁺ to NH₃) and NH₃ is the base (accepts H⁺). The resulting white ring is solid NH₄Cl particles suspended in air.',
        zh: '高频考点必背：在 NH₃ + HCl → NH₄Cl 反应中，HCl 是酸（向 NH₃ 给出质子），NH₃ 是碱（接受质子）。实验中观察到的“白烟”不是气体也不是液体，而是悬浮在空气中的氯化铵固体微晶！',
      },
      quiz: {
        question: {
          en: 'In the reaction NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, which species acts as the Brønsted–Lowry acid?',
          zh: '在反应 NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ 中，哪个物质充当了布朗斯特-劳里酸（质子给体）？',
        },
        options: [
          { en: 'NH₃', zh: 'NH₃' },
          { en: 'H₂O', zh: 'H₂O (水分子，给出 H⁺ 给 NH₃)' },
          { en: 'NH₄⁺', zh: 'NH₄⁺' },
          { en: 'OH⁻', zh: 'OH⁻' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! H₂O loses an H⁺ proton to become OH⁻, so it acts as the proton donor (acid) in this reaction.',
          zh: '回答正确！水分子（H₂O）向 NH₃ 贡献出一个质子（H⁺）自身转变为 OH⁻，因此在此反应中水充当了酸（质子给体）。',
        },
      },
    },
    {
      id: 'strong-weak-dissociation-kinetics',
      title: {
        en: '9. Strong vs Weak Acids & Dissociation Kinetics',
        zh: '9. 强酸与弱酸的电离平衡、导电性与反应速率对比',
      },
      badge: {
        en: 'Lesson 11 · Extended Mastery',
        zh: '第 11 课 · 深度考点进阶',
      },
      subtitle: {
        en: 'Degree of dissociation, hydrogen ion concentration, and "Strong vs Concentrated"',
        zh: '完全电离 vs 部分电离、氢离子瞬间浓度差异与“强/弱”与“浓/稀”的严格区分',
      },
      description: {
        en: 'A strong acid and a weak acid of the exact same molar concentration (e.g. 0.1 mol/dm³) have drastically different pH values and react at different speeds. This difference is governed not by the total quantity of acid, but by its degree of ionization in water.',
        zh: '摩尔浓度完全相同的强酸与弱酸（例如均为 0.1 mol/dm³ 的盐酸与醋酸），其 pH 值与反应速率存在天壤之别。这种本质差异不是因为酸的总量不同，而是由分子在水中的电离度（Dissociation）决定的。',
      },
      image: '/figures/g8/0620-7-1-acids-bases/fig-1-12-strong-weak-dissociation.png',
      secondaryImage: '/figures/g8/0620-7-1-acids-bases/fig-1-13-exothermic-neutralisation-temp.png',
      imageCaption: {
        en: 'Figure 1.12 & 1.13: Left: Microscopic model: HCl is 100% dissociated into ions; CH₃COOH exists mainly as undissociated molecules. Right: Exothermic temperature curve during neutralization confirming release of heat energy.',
        zh: '图 1.12 与 1.13：左图为微观电离模型：强酸 HCl 100% 完全电离为离子，弱酸 CH₃COOH 大部分仍以中性分子形式存在；右图为中和反应过程中的放热温度曲线。',
      },
      bulletPoints: [
        {
          title: {
            en: 'Strong Acid: Complete Dissociation',
            zh: '强酸的完全电离（单向不可逆）',
          },
          body: {
            en: 'Strong acids (HCl, H₂SO₄, HNO₃) dissociate 100% in water. Every molecule splits into ions. For 0.1 mol/dm³ HCl, [H⁺] = 0.1 mol/dm³ → pH = 1.0. High [H⁺] causes rapid effervescence with Mg.',
            zh: '强酸（盐酸、硫酸、硝酸）在水中完全电离，每个分子都释放出质子。0.1 mol/dm³ 的盐酸中 [H⁺] 即为 0.1 mol/dm³，pH 为 1.0。高浓度 H⁺ 使其与镁条反应剧烈冒泡。',
          },
          equation: '\\mathrm{HCl(aq) \\rightarrow H^+(aq) + Cl^-(aq) \\quad (100\\%\\ dissociation)}',
        },
        {
          title: {
            en: 'Weak Acid: Partial Dissociation Equilibrium',
            zh: '弱酸的部分电离平衡（双向可逆）',
          },
          body: {
            en: 'Weak acids (ethanoic, citric, carbonic) only partially dissociate (~1% of molecules split; 99% remain intact). For 0.1 mol/dm³ CH₃COOH, [H⁺] ≈ 0.001 mol/dm³ → pH ≈ 3.0. Slower reaction rate with Mg.',
            zh: '弱酸（乙酸、柠檬酸、碳酸）在水中只发生部分电离（约仅 1% 的分子拆散成离子，99% 保持中性分子状态）。0.1 mol/dm³ 乙酸中 [H⁺] 仅约 0.001 mol/dm³，pH 约 3.0。与镁反应明显慢得多。',
          },
          equation: '\\mathrm{CH_3COOH(aq) \\rightleftharpoons CH_3COO^-(aq) + H^+(aq) \\quad (\\sim 1\\%\\ dissociation)}',
        },
        {
          title: {
            en: 'Equal Total Hydrogen Yield: A Huge Exam Trap!',
            zh: '同浓度同体积强弱酸生成氢气总量完全相同！（压轴避坑）',
          },
          body: {
            en: 'If equal volumes of 0.1 mol/dm³ HCl and 0.1 mol/dm³ CH₃COOH react with excess magnesium: HCl fizzes much faster at the start, but BOTH produce the EXACT SAME final volume of hydrogen gas! As H⁺ is consumed, the weak acid shifts equilibrium to release more H⁺.',
            zh: '若取相同体积、相同浓度的盐酸与醋酸分别与过量镁反应：强酸初始冒泡剧烈，但两支试管最终收集到的氢气总体积完全相同！因为随着 H⁺ 被消耗，弱酸分子会持续电离补足，直至所有潜在氢全部释放。',
          },
        },
        {
          title: {
            en: '"Strong" vs "Concentrated" — Never Confuse Them!',
            zh: '“强酸/弱酸”与“浓酸/稀酸”的本质辨析',
          },
          body: {
            en: '• "Strong / Weak" describes the EXTENT of dissociation in water (chemical property).\n• "Concentrated / Dilute" describes the AMOUNT of solute dissolved per dm³ of solvent (physical proportion). A concentrated weak acid (e.g. pure vinegar) is still weak!',
            zh: '• “强 / 弱”衡量的是分子电离为离子的百分比程度（物质固有化学属性）；\n• “浓 / 稀”衡量的是单位体积溶液中溶质的多少（物理配比比例）。即使是极浓的纯醋酸也是弱酸；即使稀释至 0.0001 mol/dm³ 的盐酸依然是强酸！',
          },
        },
      ],
      keyTakeaway: {
        en: 'Cambridge 0620 Marking Rule: To distinguish a strong acid from a weak acid of the same concentration: 1. Measure pH (strong has lower pH); 2. Test electrical conductivity (strong conducts better); 3. Compare initial rate of effervescence with Mg/CaCO₃ (strong reacts faster).',
        zh: '剑桥 0620 实验设计满分答案：区分同浓度强酸与弱酸的三大标准实验方案：1. 测定 pH（强酸 pH 显著更低）；2. 测量导电性（强酸回路灯泡更亮/读数更大）；3. 加入相同镁条或碳酸钙比较初始冒泡速率（强酸反应速率更快）。',
      },
      quiz: {
        question: {
          en: 'A student compares 50 cm³ of 1.0 mol/dm³ HCl and 50 cm³ of 1.0 mol/dm³ CH₃COOH reacting with excess zinc. What is the difference between the two reactions?',
          zh: '学生取 50 cm³ 1.0 mol/dm³ 的盐酸和 50 cm³ 1.0 mol/dm³ 的醋酸分别与过量锌反应。两个实验的真实区别是什么？',
        },
        options: [
          { en: 'HCl produces twice the volume of hydrogen gas', zh: '盐酸生成的氢气总体积是醋酸的 2 倍' },
          { en: 'HCl reacts with a faster initial rate, but both yield the exact same total volume of hydrogen', zh: '盐酸初始反应速率更快，但两者最终生成的氢气总体积完全相同' },
          { en: 'CH₃COOH fizzes faster because it has more hydrogen atoms', zh: '醋酸冒泡更快，因为分子含氢更多' },
          { en: 'CH₃COOH does not produce any hydrogen gas', zh: '醋酸完全不生成氢气' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Correct! Strong acid has a higher initial [H⁺] so it fizzes faster, but both contain identical total moles of replaceable hydrogen (0.05 mol) so the total gas volume is identical.',
          zh: '回答正确！强酸盐酸的初始 [H⁺] 更高，因此初始反应更剧烈；但两者所含可置换氢离子的总摩尔数完全相同（均为 0.05 mol），因此最终收集到的氢气总体积完全一致。',
        },
      },
    },
  ],
}
