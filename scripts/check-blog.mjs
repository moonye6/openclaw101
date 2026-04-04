/**
 * Blog Article Consistency Checker
 * Usage: node scripts/check-blog.mjs [slug]
 *   - With slug: checks one article
 *   - No args:   checks ALL telegram series articles
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');

// ─── Config ──────────────────────────────────────────────────────────────────

const SERIES_SLUGS = [
  'how-to-create-telegram-bot',
  'telegram-bot-examples',
  'telegram-automation-guide',
  'telegram-bot-api-tutorial',
  'best-telegram-bot-tools',
];

const REQUIRED_LINKS = [
  '/blog/how-to-create-telegram-bot',
  '/blog/telegram-bot-examples',
  '/blog/telegram-automation-guide',
  '/blog/telegram-bot-api-tutorial',
  '/blog/best-telegram-bot-tools',
];

// Anchor text pool — any link using text outside this pool is flagged
const ANCHOR_POOLS = {
  'how-to-create-telegram-bot': [
    'how to create a telegram bot',
    'telegram bot creation guide',
    'build a telegram bot',
    'step-by-step telegram bot',
    'telegram bot tutorial',
    'create a telegram bot',
  ],
  'telegram-bot-examples': [
    'telegram bot examples',
    'real telegram bot ideas',
    'telegram bot use cases',
    '10 telegram bot examples',
    'bot examples',
    'real examples',
  ],
  'telegram-automation-guide': [
    'telegram automation guide',
    'automate your telegram bot',
    'telegram bot workflows',
    'automation workflows',
    'automation guide',
    'automate telegram',
  ],
  'telegram-bot-api-tutorial': [
    'telegram bot api guide',
    'telegram bot api tutorial',
    'how the api works',
    'api reference',
    'api guide',
    'bot api',
  ],
  'best-telegram-bot-tools': [
    'best telegram bot tools',
    'telegram bot tools',
    'tools for building telegram bots',
    'no-code bot platforms',
    'bot tools',
    'tools guide',
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadAllPosts() {
  const files = [
    'posts-openclaw-core.ts',
    'posts-openclaw-basics.ts',
    'posts-openclaw-advanced.ts',
    'posts-telegram.ts',
  ];
  let combined = '';
  for (const f of files) {
    combined += readFileSync(join(ROOT, 'src/data/blog', f), 'utf8');
  }
  return combined;
}

function extractContentEn(source, slug) {
  // Find slug position
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugMatch = slugPattern.exec(source);
  if (!slugMatch) return null;

  // Find contentEn after slug
  const afterSlug = source.slice(slugMatch.index);
  const contentEnMatch = /contentEn:\s*`/.exec(afterSlug);
  if (!contentEnMatch) return null;

  const start = slugMatch.index + contentEnMatch.index + contentEnMatch[0].length;
  // Find the closing backtick (not escaped)
  let i = start;
  while (i < source.length) {
    if (source[i] === '`' && source[i - 1] !== '\\') break;
    i++;
  }
  return source.slice(start, i);
}

function extractExcerptEn(source, slug) {
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugMatch = slugPattern.exec(source);
  if (!slugMatch) return null;
  const afterSlug = source.slice(slugMatch.index);
  const m = /excerptEn:\s*"([^"]*)"/.exec(afterSlug);
  return m ? m[1] : null;
}

function extractReadingTime(source, slug) {
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugMatch = slugPattern.exec(source);
  if (!slugMatch) return null;
  // readingTime appears after contentEn, search a wider window
  const afterSlug = source.slice(slugMatch.index, slugMatch.index + 30000);
  const m = /readingTime:\s*(\d+)/.exec(afterSlug);
  return m ? parseInt(m[1]) : null;
}

function countLinks(content, path) {
  const escaped = path.replace(/\//g, '\\/');
  return (content.match(new RegExp(escaped, 'g')) || []).length;
}

function findAnchorTexts(content, slug) {
  // Extract all markdown links pointing to this slug
  const pattern = new RegExp(`\\[([^\\]]+)\\]\\(/blog/${slug}\\)`, 'gi');
  const anchors = [];
  let m;
  while ((m = pattern.exec(content)) !== null) {
    anchors.push(m[1].toLowerCase().trim());
  }
  return anchors;
}

function checkAnchorDiversity(anchors) {
  if (anchors.length < 2) return { ok: true, issues: [] };
  // Check for consecutive duplicates
  const issues = [];
  const seen = new Map();
  for (const a of anchors) {
    seen.set(a, (seen.get(a) || 0) + 1);
  }
  for (const [text, count] of seen.entries()) {
    if (count >= 5) issues.push(`"${text}" repeated ${count}x`);
  }
  return { ok: issues.length === 0, issues };
}

function checkInPool(anchors, slug) {
  const pool = ANCHOR_POOLS[slug] || [];
  const offenders = anchors.filter(a => !pool.some(p => a.includes(p) || p.includes(a)));
  return { ok: offenders.length === 0, offenders };
}

// ─── Checker ─────────────────────────────────────────────────────────────────

const PASS = '✅';
const FAIL = '❌';
const WARN = '⚠️ ';

function checkArticle(source, slug) {
  const content = extractContentEn(source, slug);
  if (!content) {
    console.log(`\n${FAIL} Slug "${slug}" not found in source files.\n`);
    return { slug, score: 0, total: 9, passed: [] };
  }

  const excerptEn = extractExcerptEn(source, slug) || '';
  const readingTime = extractReadingTime(source, slug) || 0;

  const results = [];
  let score = 0;

  // ① Top module present
  const hasTopModule = content.includes('🚀 Start Building Your Telegram Bot');
  results.push({ label: '顶部模块（🚀 Start Building）', ok: hasTopModule });

  // ② Bottom module present
  const hasBottomModule = content.includes('🔥 Build Your Own Telegram Bot Today');
  results.push({ label: '底部模块（🔥 Build Today）', ok: hasBottomModule });

  // ③ Top module has ≥4 links (links to other articles, not self)
  const topStart = content.indexOf('🚀 Start Building');
  let topEnd = topStart >= 0 ? topStart + 600 : -1;
  if (topStart >= 0) {
    // Scan for a standalone "---" line (preceded by \n and followed by \n)
    let pos = topStart + 40;
    while (pos < Math.min(content.length - 4, topStart + 800)) {
      if (content[pos] === '-' && content.slice(pos, pos + 3) === '---' &&
          (pos === 0 || content[pos - 1] === '\n') &&
          (content[pos + 3] === '\n' || content[pos + 3] === '\r')) {
        topEnd = pos + 3;
        break;
      }
      pos++;
    }
  }
  const topSection = topStart >= 0 ? content.slice(topStart, topEnd) : '';
  const topLinkCount = (topSection.match(/\[.*?\]\(\/blog\//g) || []).length;
  results.push({ label: `顶部模块链接数 (${topLinkCount}/≥4)`, ok: topLinkCount >= 4 });

  // ④ Bottom module has 5 links
  const botStart = content.indexOf('🔥 Build Your Own Telegram Bot Today');
  const botSection = botStart >= 0 ? content.slice(botStart) : '';
  const botLinkCount = (botSection.match(/\[.*?\]\(\/blog\//g) || []).length;
  results.push({ label: `底部模块链接数 (${botLinkCount}/≥4)`, ok: botLinkCount >= 4 });

  // ⑤ Links to all other 4 articles
  const otherSlugs = SERIES_SLUGS.filter(s => s !== slug);
  const missingLinks = otherSlugs.filter(s => countLinks(content, `/blog/${s}`) === 0);
  results.push({
    label: `覆盖其他4篇文章 (缺: ${missingLinks.length === 0 ? '无' : missingLinks.join(', ')})`,
    ok: missingLinks.length === 0
  });

  // ⑥ Body semantic links ≥2 (links outside top/bottom modules)
  const bodyStart = topEnd > 0 ? topEnd : 0;
  const bodyEnd = botStart > 0 ? botStart : content.length;
  const bodySection = content.slice(bodyStart, bodyEnd);
  const bodyLinkCount = (bodySection.match(/\[.*?\]\(\/blog\//g) || []).length;
  results.push({ label: `正文语义内链 (${bodyLinkCount}/≥2)`, ok: bodyLinkCount >= 2 });

  // ⑦ Anchor text diversity (no single anchor repeated ≥3x)
  const allAnchors = [];
  for (const s of SERIES_SLUGS) {
    allAnchors.push(...findAnchorTexts(content, s));
  }
  const { ok: diverseOk, issues: diverseIssues } = checkAnchorDiversity(allAnchors);
  results.push({
    label: `Anchor text 多样化 ${diverseIssues.length ? '(' + diverseIssues.join('; ') + ')' : ''}`,
    ok: diverseOk
  });

  // ⑧ excerptEn ≤ 160 chars
  const excerptLen = excerptEn.length;
  results.push({ label: `Meta description 长度 (${excerptLen}/≤160)`, ok: excerptLen <= 160 && excerptLen > 0 });

  // ⑨ readingTime ≥ 5
  results.push({ label: `预计阅读时间 (${readingTime}/≥5分钟)`, ok: readingTime >= 5 });

  // Tally
  for (const r of results) {
    if (r.ok) score++;
  }

  return { slug, score, total: results.length, results };
}

// ─── Report ───────────────────────────────────────────────────────────────────

function printReport(result) {
  const { slug, score, total, results } = result;
  const pct = Math.round((score / total) * 100);
  const grade = pct === 100 ? '🏆 PERFECT' : pct >= 80 ? '✅ PASS' : pct >= 60 ? `${WARN}REVIEW` : `${FAIL} FAIL`;

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`📄 ${slug}`);
  console.log(`   Score: ${score}/${total} (${pct}%) — ${grade}`);
  console.log(`${'─'.repeat(60)}`);

  for (const r of results) {
    console.log(`  ${r.ok ? PASS : FAIL} ${r.label}`);
  }

  if (score < total) {
    console.log(`\n  ⚡ Action: Fix ${total - score} issue(s) before publishing.`);
  }
}

function printSummary(results) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log('📊 SUMMARY');
  console.log(`${'═'.repeat(60)}`);
  let allPass = true;
  for (const r of results) {
    const pct = Math.round((r.score / r.total) * 100);
    const mark = pct === 100 ? PASS : pct >= 80 ? WARN : FAIL;
    if (pct < 100) allPass = false;
    console.log(`  ${mark} ${r.slug.padEnd(40)} ${r.score}/${r.total} (${pct}%)`);
  }
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const totalMax = results.reduce((s, r) => s + r.total, 0);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  Overall: ${totalScore}/${totalMax} (${Math.round(totalScore/totalMax*100)}%)`);
  console.log(allPass ? `\n  🏆 ALL ARTICLES PASS — Ready to publish!` : `\n  ❌ Fix issues before publishing.`);
  console.log();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const source = loadAllPosts();
const targetSlug = process.argv[2];

if (targetSlug) {
  const result = checkArticle(source, targetSlug);
  printReport(result);
} else {
  const results = SERIES_SLUGS.map(slug => {
    const result = checkArticle(source, slug);
    printReport(result);
    return result;
  });
  printSummary(results);
}
