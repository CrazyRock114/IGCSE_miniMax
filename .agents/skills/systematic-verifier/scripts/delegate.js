#!/usr/bin/env node
/**
 * delegate.js - 宿主 Agent 委派模式（Delegation Mode）CLI 工具
 * 承袭阿里 OpenCodeReview 方案 B 设计：确定性工程提取 Git 差异，为宿主 Agent 聚类检查清单
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getGitRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (e) {
    return process.cwd();
  }
}

function preview(options = {}) {
  const from = options.from || 'HEAD~1';
  const to = options.to || 'HEAD';
  let mergeBase = '';

  try {
    mergeBase = execSync(`git merge-base ${from} ${to}`, { encoding: 'utf8' }).trim();
  } catch (e) {
    mergeBase = from;
  }

  let rawDiffFiles = [];
  try {
    const output = execSync(`git diff --name-status ${mergeBase}..${to}`, { encoding: 'utf8' });
    rawDiffFiles = output.split('\n').filter(Boolean).map(line => {
      const parts = line.split('\t');
      return { status: parts[0], path: parts[1] };
    });
  } catch (e) {
    // 工作区模式 fallback
    try {
      const statusOut = execSync('git status --porcelain', { encoding: 'utf8' });
      rawDiffFiles = statusOut.split('\n').filter(Boolean).map(line => ({
        status: line.slice(0, 2).trim(),
        path: line.slice(3).trim()
      }));
    } catch (err) {
      console.error('Git 执行失败:', err.message);
    }
  }

  const reviewableFiles = [];
  const excludedFiles = [];

  const EXCLUDE_PATTERNS = [
    /\.min\.js$/,
    /\.min\.css$/,
    /package-lock\.json$/,
    /yarn\.lock$/,
    /pnpm-lock\.yaml$/,
    /\.png$/,
    /\.jpg$/,
    /\.svg$/,
    /\.map$/
  ];

  for (const f of rawDiffFiles) {
    const isExcluded = EXCLUDE_PATTERNS.some(p => p.test(f.path));
    if (isExcluded) {
      excludedFiles.push({ path: f.path, reason: 'matches ignore pattern or binary' });
    } else {
      let insertions = 0;
      let deletions = 0;
      try {
        const numstat = execSync(`git diff --numstat ${mergeBase}..${to} -- "${f.path}"`, { encoding: 'utf8' }).trim();
        if (numstat) {
          const parts = numstat.split('\t');
          insertions = parseInt(parts[0], 10) || 0;
          deletions = parseInt(parts[1], 10) || 0;
        }
      } catch (e) {}

      reviewableFiles.push({
        path: f.path,
        status: f.status,
        insertions,
        deletions
      });
    }
  }

  const result = {
    mode: 'range',
    from,
    to,
    merge_base: mergeBase,
    reviewable_files: reviewableFiles,
    excluded_files: excludedFiles
  };

  console.log(JSON.stringify(result, null, 2));
  return result;
}

function rule(files = []) {
  // 根据文件类型匹配九层正交规则
  const groups = [];

  const htmlFiles = files.filter(f => f.endsWith('.html'));
  const jsFiles = files.filter(f => f.endsWith('.js') || f.endsWith('.ts'));
  const dataFiles = files.filter(f => f.endsWith('.json') || f.endsWith('.md'));

  if (htmlFiles.length > 0) {
    groups.push({
      files: htmlFiles,
      rule: [
        '### L1 结构与 L5 闭合层检查清单',
        '- 检查站内相对 href 与同页锚点 #id 是否真实存在，消灭死锚与死链',
        '- 检查 class 是否在 CSS 中有唯一定义，禁止裸类',
        '- 检查是否遗留未替换占位符或未转义文本'
      ].join('\n')
    });
  }

  if (jsFiles.length > 0) {
    groups.push({
      files: jsFiles,
      rule: [
        '### L2/L3/L6 交互与算法通电检查清单',
        '- 【接线必须通电】断言输入事件处理函数内绝无硬编码变量，输入改变必然引发状态差分',
        '- 【首行猝死防御】排查所有 querySelector 是否存在为 null 的边界',
        '- 【逆向路径断言】计分/计数 UI 答错时断言计分条绝不增加'
      ].join('\n')
    });
  }

  if (dataFiles.length > 0) {
    groups.push({
      files: dataFiles,
      rule: [
        '### L2/L4 数据与微算式求值检查清单',
        '- 【独立预言机】从题面独立推导期望值，与 answer 比对',
        '- 【甄别漏斗】扫描所有文案中的等式与约等式，核算数值正确性',
        '- 【数字级联疫苗】全量互锁统计数字，禁止手写动态数字'
      ].join('\n')
    });
  }

  const result = { groups };
  console.log(JSON.stringify(result, null, 2));
  return result;
}

if (require.main === module) {
  const cmd = process.argv[2];
  if (cmd === 'preview') {
    preview();
  } else if (cmd === 'rule') {
    const files = process.argv.slice(3);
    rule(files);
  } else {
    console.log('Usage:');
    console.log('  node delegate.js preview [--from <ref> --to <ref>]');
    console.log('  node delegate.js rule <file1> <file2> ...');
  }
}

module.exports = { preview, rule };

