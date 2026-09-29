#!/usr/bin/env node
/**
 * consistency.js - 资产闭环、CSS样式闭集与数字级联疫苗扫描器
 */
const fs = require('fs');
const path = require('path');
const { walk } = require('./inventory');

function run(targetDir = process.cwd(), options = {}) {
  const allFiles = walk(targetDir);
  const htmls = allFiles.filter(f => f.endsWith('.html'));
  const cssFiles = allFiles.filter(f => f.endsWith('.css'));

  // 1. 收集 CSS 已定义类名
  const definedClasses = new Set();
  for (const c of cssFiles) {
    const content = fs.readFileSync(c, 'utf8');
    for (const m of content.matchAll(/\.([a-zA-Z0-9_-]+)(?:[:\s{,.[>+~]|$)/g)) {
      definedClasses.add(m[1]);
    }
  }

  // 2. 建立全站 element IDs 集合
  const allIds = new Set();
  for (const h of htmls) {
    const content = fs.readFileSync(h, 'utf8');
    for (const m of content.matchAll(/id="([^"]+)"/g)) allIds.add(m[1]);
  }

  let passed = 0;
  const deadLinks = [];
  const deadAnchors = [];
  const unstyledClasses = [];
  const staleWordHits = [];

  // 陈旧词与级联疫苗黑名单 (支持传入自定义配置)
  const defaultVaccines = [
    { pattern: /todo/i, label: 'TODO残留' },
    { pattern: /\[object Object\]/, label: 'JS对象未序列化残留' },
    { pattern: /\bNaN\b/, label: '非法数值NaN' },
    { pattern: /undefined/, label: '未定义变量undefined' }
  ];
  const vaccines = options.vaccines || defaultVaccines;

  for (const h of htmls) {
    const relPath = path.relative(targetDir, h);
    const content = fs.readFileSync(h, 'utf8');
    const dir = path.dirname(h);

    // 疫苗扫描
    for (const v of vaccines) {
      if (v.pattern.test(content)) {
        staleWordHits.push({ file: relPath, label: v.label, pattern: String(v.pattern) });
      } else {
        passed++;
      }
    }

    // 锚点闭合检查
    const pageIds = new Set();
    for (const m of content.matchAll(/id="([^"]+)"/g)) pageIds.add(m[1]);

    for (const m of content.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      if (href.startsWith('#')) {
        const anchorId = href.slice(1);
        if (anchorId && !pageIds.has(anchorId)) {
          deadAnchors.push({ file: relPath, anchor: href });
        } else {
          passed++;
        }
      } else if (!/^(https?:|mailto:|data:)/.test(href)) {
        const targetPath = path.resolve(dir, href.split('#')[0].split('?')[0]);
        if (!fs.existsSync(targetPath)) {
          deadLinks.push({ file: relPath, target: href });
        } else {
          passed++;
        }
      }
    }

    // CSS 类闭合
    for (const m of content.matchAll(/class="([^"]+)"/g)) {
      const tokens = m[1].split(/\s+/).filter(Boolean);
      for (const t of tokens) {
        if (!definedClasses.has(t)) {
          unstyledClasses.push({ file: relPath, className: t });
        } else {
          passed++;
        }
      }
    }
  }

  const report = {
    passed,
    deadLinks,
    deadAnchors,
    unstyledClasses: unstyledClasses.slice(0, 50),
    unstyledCount: unstyledClasses.length,
    staleWordHits,
  };

  console.log('\n=== L5 全局一致性与闭合检查报告 ===');
  console.log(`断言通过: ${passed} 项`);
  console.log(`死链 (404 Links): ${deadLinks.length} 处`);
  console.log(`同页死锚 (Dead Anchors): ${deadAnchors.length} 处`);
  console.log(`陈旧词/疫苗命中 (Vaccines): ${staleWordHits.length} 处`);
  console.log(`未定义样式类 (Unstyled Classes): ${unstyledClasses.length} 处`);

  return report;
}

if (require.main === module) {
  const dir = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : process.cwd();
  run(dir);
}

module.exports = { run };

