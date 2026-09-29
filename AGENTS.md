# Universal Agent Instructions: CodeVerifier Workstation

本仓库是专用于系统化质量工程与全态穷举验证的工作站。
任何接入本工作站或使用本工作站能力的 AI Agent（无论是 Antigravity、Claude Code、Cursor、Windsurf 还是自研 Agent），必须严格遵守以下六大公理与验证流程。

---

## 核心六律 (The Six Invariant Disciplines)

1. **Oracle 三级对偶隔离**：
   - Level A（机器算力）：独立求值器/真执行，零代码共享。
   - Level B（语义审阅）：概念意图逐题落盘（`l2_audit_trail.jsonl`），禁止仅留在记忆中。
   - Level C（回归守卫）：严禁将事后修复断言包装宣称为自动发现级 Oracle。
2. **接线必须通电**：
   - 杜绝三大假闭合（未读输入、首行 Null 崩溃、分支同模）。输入变化必须触发有界状态/DOM 差分。
3. **逆向与反例穿透**：
   - 答错路径必测（计分条答错绝不 +1）；越界输入优雅处理；教学反例通过上下文守卫分流。
4. **领域规范化与甄别漏斗**：
   - 提取算式必须前置规范化；等式失配必须经由甄别漏斗逐级收窄，残差 100% 人工复核。
5. **数字不经人手**：
   - 覆盖声明必须由代码自己打印；数据源 $\leftrightarrow$ 产物 bundle $\leftrightarrow$ 页面 stats 三向互锁。
6. **三层定罪与基线干净**：
   - 排查顺序：①测试脚本错 $\to$ ②测试环境错 $\to$ ③被测物真 Bug；每个测试点前读回干净基线。

---

## 快速调用工具箱 (CLI Toolkit)

本仓库提供零外部依赖（纯 Node.js 内置模块）的确定性执行脚本，位于 `skills/systematic-verifier/scripts/`：

```bash
# 1. 域枚举与基数互锁
node skills/systematic-verifier/scripts/inventory.js <target_dir>

# 2. 全域文案算式求值与甄别漏斗
node skills/systematic-verifier/scripts/equations.js <target_file_or_dir>

# 3. 资产闭环、CSS样式闭集与数字级联疫苗
node skills/systematic-verifier/scripts/consistency.js <target_dir>

# 4. 不可机判句式全量枚举与 SHA-256 状态机签核
node skills/systematic-verifier/scripts/signoff.js <target_dir>

# 5. 宿主委派模式差分预览与规则聚类 (PR/增量模式)
node skills/systematic-verifier/scripts/delegate.js preview --from main --to HEAD
node skills/systematic-verifier/scripts/delegate.js rule <file1> <file2> ...
```

---

## 缺陷报告输出规范 (Comment Schema with Suggested Diff)

发现任何置信度 $\ge 0.8$ 的缺陷时，统一输出带修复补丁的结构化 JSON：
```json
{
  "comments": [
    {
      "file": "path/to/file",
      "line_start": 42,
      "line_end": 45,
      "title": "缺陷简述",
      "body": "失效根因与推导期望值",
      "layer": "L0~L8",
      "severity": "High/Medium/Low",
      "confidence": 0.95,
      "suggested_diff": "@@ -42,2 +42,2 @@\n- 旧代码\n+ 修复代码"
    }
  ]
}
```

