/**
 * Dynamic-route guard.
 *
 * Codifies the fix from commit e2d468d ("return 404 for non-existent dynamic routes").
 *
 * Every src/app/**\/[param]/page.tsx MUST either:
 *   (a) export `dynamicParams = false` — so unknown params hit the built-in 404, or
 *   (b) call `notFound()` when the entity isn't found.
 *
 * Without one of these, dynamic routes render empty 200 pages, which tanks SEO
 * (Google indexed 1200+ empty shells before we caught it).
 */
import { readFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const APP_DIR = join(ROOT, 'src/app');

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (entry === 'page.tsx' || entry === 'page.ts') out.push(full);
  }
  return out;
}

const pages = walk(APP_DIR);
// Flag pages whose own segment (parent of page.tsx) is a dynamic content param,
// e.g. ".../blog/[slug]/page.tsx". Skip [locale], which is handled by next-intl
// middleware and doesn't accept arbitrary user input.
const dynamicPages = pages.filter((p) => {
  const m = p.match(/\[([^\]]+)\]\/page\.(t|j)sx?$/);
  return m && m[1] !== 'locale';
});

const violations = [];
for (const file of dynamicPages) {
  const src = readFileSync(file, 'utf8');
  const hasDynamicParamsFalse = /export\s+const\s+dynamicParams\s*=\s*false/.test(src);
  const hasNotFound = /\bnotFound\s*\(\s*\)/.test(src);
  if (!hasDynamicParamsFalse && !hasNotFound) {
    violations.push(relative(ROOT, file));
  }
}

if (violations.length) {
  console.error('❌ Dynamic routes without 404 guard (export dynamicParams=false OR notFound()):');
  for (const v of violations) console.error('  - ' + v);
  console.error('\nSee commit e2d468d for context. Fix before merging.');
  process.exit(1);
}
console.log(`✓ All ${dynamicPages.length} dynamic routes guard against unknown params.`);
