/**
 * Post-deploy smoke tests. Run against BASE_URL (prod or a preview URL).
 * Validates issues we've hit before:
 *   - dynamic routes must 404 for unknown params (e2d468d)
 *   - /en/* must 301 to clean paths (cc808f8)
 *   - sitemap/robots/feed must serve
 *   - critical pages must return 200
 */
import { test, expect, request } from '@playwright/test';

const BASE = process.env.BASE_URL || 'https://openclaw101.vip';

test.describe('smoke: critical pages 200', () => {
  for (const path of ['/', '/blog', '/tutorials', '/skills', '/faq', '/about']) {
    test(`${path} → 200`, async ({ page }) => {
      const res = await page.goto(BASE + path);
      expect(res?.status(), `expected 200 for ${path}`).toBe(200);
    });
  }
});

test.describe('smoke: unknown dynamic routes 404', () => {
  const unknown = [
    '/blog/this-slug-does-not-exist-xyz',
    '/tutorials/does-not-exist-xyz',
    '/skills/does-not-exist-xyz',
    '/use-cases/does-not-exist-xyz',
    '/learn/9999',
    '/7days/9999',
  ];
  for (const path of unknown) {
    test(`${path} → 404`, async () => {
      const ctx = await request.newContext();
      const res = await ctx.get(BASE + path, { maxRedirects: 0 });
      expect(res.status(), `expected 404 for ${path}`).toBe(404);
    });
  }
});

test.describe('smoke: /en/* → 301 redirect', () => {
  for (const path of ['/en', '/en/', '/en/blog', '/en/tutorials']) {
    test(`${path} redirects`, async () => {
      const ctx = await request.newContext();
      const res = await ctx.get(BASE + path, { maxRedirects: 0 });
      expect([301, 308]).toContain(res.status());
      const loc = res.headers()['location'] || '';
      expect(loc, `redirect should strip /en prefix: ${loc}`).not.toMatch(/\/en(\/|$)/);
    });
  }
});

test.describe('smoke: sitemap + robots + feed', () => {
  test('sitemap.xml', async () => {
    const ctx = await request.newContext();
    const res = await ctx.get(BASE + '/sitemap.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type'] || '').toMatch(/xml/);
  });
  test('robots.txt', async () => {
    const ctx = await request.newContext();
    const res = await ctx.get(BASE + '/robots.txt');
    expect(res.status()).toBe(200);
  });
  test('feed.xml', async () => {
    const ctx = await request.newContext();
    const res = await ctx.get(BASE + '/feed.xml');
    expect(res.status()).toBe(200);
  });
});
