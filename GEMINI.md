# IGCSE Science 核心教学平台维护指南 (Platform Guidelines & Architecture)

## 📌 项目交接与地位 (Project Status & Ecosystem)

* **项目名称**：`IGCSE_miniMax` (Cambridge IGCSE Science 核心双语互动教学系统)
* **代码仓库**：[https://github.com/CrazyRock114/IGCSE_miniMax.git](https://github.com/CrazyRock114/IGCSE_miniMax.git)
* **线上生产地址**：[https://igcse.xyz](https://igcse.xyz)（备用镜像：`https://igcse.coze.site`）
* **项目交接状态**：**已由 CrazyRock 正式交接给 AI Agent 全权维护、演进与质量把控**。

### 兄弟项目联动矩阵
* **词汇与小游戏子系统**：`IGCSE_science_vocab`
  * 物理路径：`/Users/crazyrock/Antigravity/IGCSE_science_vocab`
  * 线上地址：[https://sky.igcse.xyz](https://sky.igcse.xyz)
  * 定位：专为 Sky G8 定制的 6 款单词游戏、33 课时、180 词汇及配套习题集。

---

## 🏗️ 架构与全域规模数据 (Verified Cardinalities)

* **三大学科覆盖**：
  * **0610 生物**：20 课时，389 条官方考纲要点
  * **0620 化学**：27 课时，231 条官方考纲要点
  * **0625 物理**：28 课时，324 条官方考纲要点
  * **总计**：**75 节课时，944 条考纲细则 (100.0% 全域覆盖)**
* **题库池**：**442 道题目**（随堂 Checkpoint 412 题 + 独立三科真题 30 题；42 道 MCQ + 400 道带评分标准的 Theory 主观题）。
* **特色教学交互**：
  * **Three.js 3D 渲染**：人体解剖 (`Anatomy3D`)、DNA 双螺旋 (`DnaHelix3D`)、食物网 (`FoodWeb3D`)。
  * **Paper 5/6 实验技能**：虚拟器材读数训练 (量筒/滴定管/千分尺等) 与方格纸描点及最小二乘回归作图 (`GraphTrainer`)。
  * **Driver.js 动画旅程**：双循环系统、突触传递、肺泡气体交换、肾单位过滤等动画步进导览。
  * **AI Tutor 面板**：内置多模型驱动的苏格拉底式启发助教。

---

## 🛡️ 核心工程规范与门禁 (Invariant Disciplines)

1. **Zero-CJK 隔离铁律**：`src/components/**` 与 `src/sim/**` 中严禁硬编码任何中文字符，所有课程文本必须在数据对象中声明，通过 `<T value={...} />` 进行国际化渲染。
2. **数字不经人手**：所有考纲覆盖率、题目计数、统计指标必须由脚本动态打印，严禁人工臆测或虚报。
3. **测试套件与执行命令**：
   * 单元测试：`pnpm test` (87 文件，1654+ 测试用例)
   * 内容与大纲闭环：`pnpm run check:content` && `pnpm run audit`
   * 路由与无头交互：`pnpm run qa:routes`
   * 全态形式化验证：`pnpm exec tsx scripts/verifier/index.ts` (L0 ~ L8 九层穷举验证器)
   * 生产构建：`pnpm build`
