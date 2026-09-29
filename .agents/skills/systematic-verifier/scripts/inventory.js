#!/usr/bin/env node
/**
 * inventory.js - 域枚举与基数互锁表生成器
 * 扫描指定目录的目标文件、路由、待测节点并输出基数互锁 JSON
 */
const fs = require('fs');
const path = require('path');

function walk(dir, out = [], ignored = ['node_modules', '.git', 'dist', 'build', '.agents']) {
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (ignored.includes(f)) continue;
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p, out, ignored);
    else out.push(p);
  }
  return out;
}

function run(targetDir = process.cwd()) {
  const allFiles = walk(targetDir);
  const htmls = allFiles.filter(f => f.endsWith('.html'));
  const jsons = allFiles.filter(f => f.endsWith('.json'));
  const jsFiles = allFiles.filter(f => f.endsWith('.js') || f.endsWith('.ts'));
  const cssFiles = allFiles.filter(f => f.endsWith('.css'));

  let internalLinks = 0;
  let pageAnchors = 0;
  let assetRefs = 0;
  const elementIds = new Set();
  let classOccurrences = 0;

  for (const h of htmls) {
    const content = fs.readFileSync(h, 'utf8');
    for (const m of content.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      if (href.startsWith('#')) pageAnchors++;
      else if (!/^(https?:|mailto:|data:)/.test(href)) internalLinks++;
    }
    for (const m of content.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (!/^(https?:|#|mailto:|data:)/.test(m[1])) assetRefs++;
    }
    for (const m of content.matchAll(/id="([^"]+)"/g)) elementIds.add(m[1]);
    for (const m of content.matchAll(/class="([^"]+)"/g)) {
      classOccurrences += m[1].split(/\s+/).filter(Boolean).length;
    }
  }

  const table = [
    { domain: '全站路由 (HTML)', count: htmls.length, metric: '物理页面总数' },
    { domain: 'JSON 数据源', count: jsons.length, metric: '配置文件与数据文件数' },
    { domain: '脚本资产 (JS/TS)', count: jsFiles.length, metric: '前端脚本与服务文件数' },
    { domain: '样式表 (CSS)', count: cssFiles.length, metric: '静态样式表数' },
    { domain: '站内相对链接', count: internalLinks, metric: 'Σ 相对 href' },
    { domain: '页内锚点引用', count: pageAnchors, metric: 'Σ href="#..."' },
    { domain: '静态资产相对引用', count: assetRefs, metric: 'Σ src/href' },
    { domain: 'DOM 唯一 ID 集合', count: elementIds.size, metric: '全站去重元素 id' },
    { domain: 'CSS 类名出现频次', count: classOccurrences, metric: 'Σ class 属性 tokens' },
  ];

  const inventory = {
    targetDir: path.resolve(targetDir),
    timestamp: new Date().toISOString(),
    table,
    summary: {
      routes: htmls.length,
      dataSources: jsons.length,
      scripts: jsFiles.length,
      anchors: pageAnchors,
      internalLinks,
      uniqueIds: elementIds.size,
    }
  };

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(inventory, null, 2));
  } else {
    console.log('\n========== 域枚举与基数互锁表 (Domain Inventory) ==========');
    console.table(table);
    console.log(`扫描完成：共发现 ${allFiles.length} 个源文件，涵盖 ${htmls.length} 个页面与 ${elementIds.size} 个唯一 DOM 锚点。\n`);
  }

  return inventory;
}

if (require.main === module) {
  const dir = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : process.cwd();
  run(dir);
}

module.exports = { run, walk };

