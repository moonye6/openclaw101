/**
 * Internal-link guard.
 *
 * Codifies the fix from commit e2d468d where i18n JSON and blog content pointed
 * to blog slugs that didn't exist (what-is-openclaw-guide, how-to-use-local-llm, ...).
 *
 * Scans src/i18n/*.json and src/data/blog/*.ts for `/blog/<slug>` references
 * and fails if the slug isn't in the blog data.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;

function collectSlugs() {
  const dir = join(ROOT, 'src/data/blog');
  const files = readdirSync(dir).filter((f) => f.startsWith('posts-') && f.endsWith('.ts'));
  const slugs = new Set();
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/slug:\s*["']([^"']+)["']/g)) slugs.add(m[1]);
  }
  return slugs;
}

function scan(file, slugs, violations) {
  const src = readFileSync(file, 'utf8');
  // Match /blog/<slug> but stop at whitespace, quotes, parens, hashes, closing brackets.
  const re = /\/blog\/([a-z0-9][a-z0-9-]{2,})(?=[)"'\s#?<\]]|$)/g;
  for (const m of src.matchAll(re)) {
    const slug = m[1];
    if (slug === 'index' || slug === 'feed') continue;
    if (!slugs.has(slug)) {
      violations.push({ file: file.replace(ROOT, ''), slug });
    }
  }
}

const slugs = collectSlugs();
const violations = [];

// i18n files
const i18nDir = join(ROOT, 'src/i18n');
for (const f of readdirSync(i18nDir).filter((x) => x.endsWith('.json'))) {
  scan(join(i18nDir, f), slugs, violations);
}

// blog data files (cross-references between posts)
const blogDir = join(ROOT, 'src/data/blog');
for (const f of readdirSync(blogDir).filter((x) => x.startsWith('posts-') && x.endsWith('.ts'))) {
  scan(join(blogDir, f), slugs, violations);
}

if (violations.length) {
  console.error('❌ Dead /blog/<slug> references (slug not found in blog data):');
  for (const v of violations) console.error(`  - ${v.file}: /blog/${v.slug}`);
  console.error(`\nKnown slugs: ${slugs.size}. See commit e2d468d for context.`);
  process.exit(1);
}
console.log(`✓ Internal /blog links OK (${slugs.size} slugs known).`);
