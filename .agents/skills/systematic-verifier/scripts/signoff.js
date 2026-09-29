#!/usr/bin/env node
/**
 * signoff.js - 不可机判句式全量枚举与 SHA-256 指纹状态机签核管理器
 * 状态机核心能力：内容未修改的项 100% 继承已签核状态，仅修改项重置待签，杜绝签核疲劳
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { walk } = require('./inventory');

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex').slice(0, 16);
}

function run(targetDir = process.cwd(), stateFile = 'signoff_state.json') {
  const allFiles = walk(targetDir).filter(f => f.endsWith('.html') || f.endsWith('.md') || f.endsWith('.json'));

  // 1. 读取历史签核状态
  const stateFilePath = path.resolve(targetDir, stateFile);
  let historicalState = {};
  if (fs.existsSync(stateFilePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
      if (Array.isArray(data)) {
        for (const item of data) historicalState[item.key] = item;
      }
    } catch (e) {
      console.warn('读取历史签核状态失败，将全量重新生成:', e.message);
    }
  }

  // 2. 枚举特征句式：倍数、进制进率、主观动作、反例教学
  const patterns = [
    { type: 'RATIO_ASSERTION', regex: /([大倍小][\s\S]{0,10}[0-9.]+\s*倍|[增减提高降][\s\S]{0,10}[0-9.]+\s*%)/g },
    { type: 'UNIT_CONVERSION', regex: /([0-9.]+\s*(?:小时|h|min|分|秒|s)\s*=\s*[0-9.]+\s*(?:小时|h|min|分|秒))/g },
    { type: 'FOLD_ACTION', regex: /(?:对折|压平|翻面|山折|谷折|拉开|折起)/g }
  ];

  const currentItems = [];
  let retainedCount = 0;
  let resetCount = 0;
  let newCount = 0;

  for (const f of allFiles) {
    const rel = path.relative(targetDir, f);
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx].trim();
      if (!line) continue;

      for (const p of patterns) {
        for (const m of line.matchAll(p.regex)) {
          const statement = m[0];
          const hash = sha256(`${rel}:${line}`);
          const key = `${rel}#L${idx + 1}:${p.type}`;

          const existing = historicalState[key];
          let status = 'PENDING_SIGNOFF';
          let signedBy = null;
          let signedAt = null;

          if (existing && existing.hash === hash) {
            status = existing.status;
            signedBy = existing.signedBy;
            signedAt = existing.signedAt;
            retainedCount++;
          } else if (existing && existing.hash !== hash) {
            resetCount++;
          } else {
            newCount++;
          }

          currentItems.push({
            key,
            type: p.type,
            file: rel,
            line: idx + 1,
            statement,
            context: line.slice(0, 100),
            hash,
            status,
            signedBy,
            signedAt
          });
        }
      }
    }
  }

  // 3. 写回状态机文件
  fs.writeFileSync(stateFilePath, JSON.stringify(currentItems, null, 2), 'utf8');

  console.log('\n=== L7 不可机判句式指纹签核状态机 ===');
  console.log(`枚举条目总数: ${currentItems.length}`);
  console.log(`历史状态继承 (未变免审): ${retainedCount} 条`);
  console.log(`内容修改重置 (需重新核对): ${resetCount} 条`);
  console.log(`新出现条目 (待首次签核): ${newCount} 条`);
  console.log(`状态文件已落盘: ${stateFilePath}\n`);

  return currentItems;
}

if (require.main === module) {
  const dir = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : process.cwd();
  run(dir);
}

module.exports = { run };

