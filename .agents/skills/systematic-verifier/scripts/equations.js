#!/usr/bin/env node
/**
 * equations.js - 全域文案算式提取、规范化与甄别漏斗求值器
 */
const fs = require('fs');
const path = require('path');

function cleanHtml(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&times;/g, '×')
    .replace(/&divide;/g, '÷')
    .replace(/&minus;/g, '−')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+/g, ' ');
}

function normalizeMath(s) {
  return s
    .replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[．]/g, '.')
    .replace(/[－–—−]/g, '-')
    .replace(/[×✕✖]/g, '*')
    .replace(/[÷]/g, '/')
    .replace(/＋/g, '+')
    .replace(/[（]/g, '(')
    .replace(/[）]/g, ')')
    .replace(/，/g, ',');
}

// 独立递归下降表达式求值器 (纯白名单运算符，零代码同源共享)
function evalExpr(exprStr) {
  const s = normalizeMath(String(exprStr)).replace(/\s+/g, '');
  let i = 0;
  function peek() { return s[i]; }
  function num() {
    let st = i;
    while (i < s.length && /[0-9.]/.test(s[i])) i++;
    if (st === i) return NaN;
    return parseFloat(s.slice(st, i));
  }
  function factor() {
    if (peek() === '(') {
      i++;
      const v = expr();
      if (peek() === ')') i++;
      return v;
    }
    if (peek() === '-') {
      i++;
      return -factor();
    }
    return num();
  }
  function term() {
    let v = factor();
    while (i < s.length && (peek() === '*' || peek() === '/')) {
      const op = peek();
      i++;
      const rhs = factor();
      if (op === '*') v *= rhs;
      else v /= rhs;
    }
    return v;
  }
  function expr() {
    let v = term();
    while (i < s.length && (peek() === '+' || peek() === '-')) {
      const op = peek();
      i++;
      const rhs = term();
      if (op === '+') v += rhs;
      else v -= rhs;
    }
    return v;
  }
  const res = expr();
  return i === s.length ? res : NaN;
}

function countDecimals(str) {
  const m = str.match(/\.(\d+)/);
  return m ? m[1].length : 0;
}

function auditText(text, source = 'memory') {
  const cleaned = cleanHtml(text);
  const lines = cleaned.split('\n');

  let passed = 0;
  const failures = [];
  const funneled = [];
  const skipped = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const rawLine = lines[lineIdx].trim();
    if (!rawLine || rawLine.length < 3) continue;

    // 匹配包含等号或约等号的句子
    for (const m of rawLine.matchAll(/([^=≈\n]{1,40})\s*([=≈])\s*([^=≈\n]{1,40})/g)) {
      const leftRaw = m[1].trim();
      const op = m[2];
      const rightRaw = m[3].trim();

      // 双向窗口化提取纯算术子串 (Longest Suffix / Prefix)
      const leftExprMatch = leftRaw.match(/([0-9.()+\-*/×÷\s]+)$/);
      const rightExprMatch = rightRaw.match(/^([0-9.()+\-*/×÷\s]+)/);

      if (!leftExprMatch || !rightExprMatch) {
        skipped.push({ reason: 'non-arithmetic-boundary', raw: m[0], line: lineIdx + 1 });
        continue;
      }

      const lStr = leftExprMatch[1].trim();
      const rStr = rightExprMatch[1].trim();

      if (!/[0-9]/.test(lStr) || !/[0-9]/.test(rStr)) {
        skipped.push({ reason: 'no-digits', raw: m[0], line: lineIdx + 1 });
        continue;
      }

      const lVal = evalExpr(lStr);
      const rVal = evalExpr(rStr);

      if (isNaN(lVal) || isNaN(rVal)) {
        skipped.push({ reason: 'eval-nan', lStr, rStr, line: lineIdx + 1 });
        continue;
      }

      let ok = false;
      if (op === '=') {
        const diff = Math.abs(lVal - rVal);
        ok = diff <= 1e-9 * Math.max(1, Math.abs(lVal), Math.abs(rVal));
      } else {
        // 约等于容差模型
        const d1 = countDecimals(lStr);
        const d2 = countDecimals(rStr);
        const tol = 0.5 * Math.pow(10, -Math.min(d1, d2));
        ok = Math.abs(lVal - rVal) <= tol;
      }

      if (ok) {
        passed++;
      } else {
        // 甄别漏斗协议：检查是否命中教学反例或反证法守卫 (±30字)
        const contextWindow = rawLine;
        const isAntiExample = /[❌✗]|孩子误算|错误认为|算成|少了|多算|反例|矛盾|无解|舍去/.test(contextWindow);
        if (isAntiExample) {
          funneled.push({
            reason: 'anti-example-or-proof-by-contradiction',
            statement: `${lStr} ${op} ${rStr}`,
            context: contextWindow,
            line: lineIdx + 1
          });
        } else {
          failures.push({
            source,
            line: lineIdx + 1,
            statement: `${lStr} ${op} ${rStr}`,
            leftValue: lVal,
            rightValue: rVal,
            diff: Math.abs(lVal - rVal),
            rawContext: rawLine
          });
        }
      }
    }
  }

  return { passed, failures, funneled, skipped };
}

if (require.main === module) {
  const target = process.argv[2];
  if (!target) {
    console.log('Usage: node equations.js <file_or_directory>');
    process.exit(1);
  }
  const content = fs.readFileSync(target, 'utf8');
  const res = auditText(content, target);
  console.log(`\n=== 文案算式求值报告 ===`);
  console.log(`通过: ${res.passed} | 失败: ${res.failures.length} | 反例漏斗分流: ${res.funneled.length} | 语法跳过: ${res.skipped.length}`);
  if (res.failures.length > 0) {
    console.log('\n--- 失败详情 (真计算错误) ---');
    console.table(res.failures.slice(0, 10));
  }
}

module.exports = { auditText, evalExpr, cleanHtml, normalizeMath };

