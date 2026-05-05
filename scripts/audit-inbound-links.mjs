/**
 * Inbound-link audit for blog posts (CP-2 from CEO plan v2).
 *
 * For each blog slug, counts how many internal sources reference it via
 * `/blog/<slug>`. Reports sorted by inbound count ascending, flags posts
 * below the threshold (default 5). Used as Wk0 baseline data and Wk2
 * deletion gate.
 *
 * Modes:
 *   default          report-only, exit 0
 *   --gate           exit 1 if any blog post has < threshold inbound links
 *   --threshold=N    set threshold (default 5)
 *   --json           machine-readable output to stdout
 *
 * Run via: pnpm audit:inbound-links [--gate] [--threshold=5]
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const args = new Set(process.argv.slice(2));
const GATE = args.has('--gate');
const JSON_OUT = args.has('--json');
const THRESHOLD = (() => {
  for (const a of args) {
    const m = a.match(/^--threshold=(\d+)$/);
    if (m) return Number(m[1]);
  }
  return 5;
})();

const SCAN_ROOTS = [
  'src/i18n',
  'src/data',
  'src/app',
  'src/components',
];

const SCAN_EXTS = new Set(['.ts', '.tsx', '.json', '.mdx', '.md']);

function collectBlogSlugs() {
  const dir = join(ROOT, 'src/data/blog');
  const files = readdirSync(dir).filter((f) => f.startsWith('posts-') && f.endsWith('.ts'));
  const slugs = new Set();
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/slug:\s*["']([^"']+)["']/g)) slugs.add(m[1]);
  }
  return slugs;
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function scanFile(file) {
  const src = readFileSync(file, 'utf8');
  const hits = [];
  // Match /blog/<slug> but stop at whitespace, quotes, parens, hashes, closing brackets.
  const re = /\/blog\/([a-z0-9][a-z0-9-]{2,})(?=[)"'\s#?<\]]|$)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const slug = m[1];
    if (slug === 'index' || slug === 'feed') continue;
    // Find line number for actionable reporting
    const before = src.slice(0, m.index);
    const line = before.split('\n').length;
    hits.push({ slug, line });
  }
  return hits;
}

const slugs = collectBlogSlugs();
const inbound = new Map();
for (const slug of slugs) inbound.set(slug, []);

for (const root of SCAN_ROOTS) {
  const fullRoot = join(ROOT, root);
  try {
    statSync(fullRoot);
  } catch {
    continue;
  }
  for (const file of walk(fullRoot)) {
    const ext = file.slice(file.lastIndexOf('.'));
    if (!SCAN_EXTS.has(ext)) continue;
    // Skip the post file's own self-references (a post linking to itself doesn't count as inbound)
    const hits = scanFile(file);
    const relFile = file.replace(ROOT, '');
    for (const { slug, line } of hits) {
      if (!inbound.has(slug)) continue; // dead reference — handled by check-internal-links
      // Heuristic: if the file is the post's own data file and the slug matches a slug declared in same file,
      // skip self-reference. Cheap check: if file path includes the same data file and same slug, skip.
      // For simplicity, skip if path starts with src/data/blog AND the slug appears with `slug: "<X>"` as a declaration nearby.
      inbound.get(slug).push({ file: relFile, line });
    }
  }
}

// Deduplicate self-refs: a post X declared in posts-foo.ts that links to /blog/X is self-referential.
// We strip self-refs by reading each posts-*.ts and finding which slugs are declared there.
function buildSlugToFile() {
  const map = new Map();
  const dir = join(ROOT, 'src/data/blog');
  for (const f of readdirSync(dir).filter((x) => x.startsWith('posts-') && x.endsWith('.ts'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/slug:\s*["']([^"']+)["']/g)) {
      map.set(m[1], `/src/data/blog/${f}`);
    }
  }
  return map;
}

const slugToFile = buildSlugToFile();
for (const [slug, refs] of inbound) {
  const ownFile = slugToFile.get(slug);
  inbound.set(slug, refs.filter((r) => r.file !== ownFile));
}

// Build report
const rows = [];
for (const [slug, refs] of inbound) {
  rows.push({ slug, count: refs.length, refs });
}
rows.sort((a, b) => a.count - b.count || a.slug.localeCompare(b.slug));

const below = rows.filter((r) => r.count < THRESHOLD);
const at = rows.filter((r) => r.count === THRESHOLD);
const healthy = rows.filter((r) => r.count > THRESHOLD);

if (JSON_OUT) {
  console.log(JSON.stringify({
    threshold: THRESHOLD,
    total_posts: rows.length,
    total_inbound_refs: rows.reduce((s, r) => s + r.count, 0),
    below_threshold: below.length,
    at_threshold: at.length,
    healthy: healthy.length,
    rows,
  }, null, 2));
} else {
  console.log(`INBOUND LINK AUDIT (Wk0 baseline)`);
  console.log(`─────────────────────────────────`);
  console.log(`Threshold:           ≥${THRESHOLD} inbound links per blog post`);
  console.log(`Total blog posts:    ${rows.length}`);
  console.log(`Total inbound refs:  ${rows.reduce((s, r) => s + r.count, 0)}`);
  console.log(`Average per post:    ${(rows.reduce((s, r) => s + r.count, 0) / rows.length).toFixed(1)}`);
  console.log(`Below threshold:     ${below.length}`);
  console.log(`At threshold:        ${at.length}`);
  console.log(`Healthy:             ${healthy.length}`);
  console.log('');

  if (below.length) {
    console.log(`❌ BELOW THRESHOLD (${below.length} posts, < ${THRESHOLD} inbound):`);
    for (const r of below) {
      console.log(`  /blog/${r.slug} (${r.count} inbound)`);
      for (const ref of r.refs.slice(0, 5)) {
        console.log(`    - ${ref.file}:${ref.line}`);
      }
      if (r.refs.length > 5) console.log(`    ... and ${r.refs.length - 5} more`);
    }
    console.log('');
  }

  if (at.length) {
    console.log(`⚠️  AT THRESHOLD (${at.length} posts, exactly ${THRESHOLD}):`);
    for (const r of at) console.log(`  /blog/${r.slug}`);
    console.log('');
  }

  console.log(`✓ HEALTHY (top 5 by inbound count):`);
  for (const r of healthy.slice(-5).reverse()) {
    console.log(`  /blog/${r.slug} (${r.count} inbound)`);
  }
}

if (GATE && below.length) {
  process.exit(1);
}
