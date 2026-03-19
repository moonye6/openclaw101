import { test, expect } from '@playwright/test';

test.describe('SEO - Structured Data', () => {
  test('homepage should have WebSite JSON-LD', async ({ page }) => {
    await page.goto('/en');
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Parse first JSON-LD and check structure
    const firstScript = await jsonLdScripts.first().textContent();
    const data = JSON.parse(firstScript!);
    expect(data['@type']).toBe('WebSite');
    expect(data.name).toBe('OpenClaw 101');
  });

  test('homepage should have Organization JSON-LD', async ({ page }) => {
    await page.goto('/en');
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const allScripts = await jsonLdScripts.allTextContents();
    const orgScript = allScripts.find(s => s.includes('"Organization"'));
    expect(orgScript).toBeTruthy();
    const data = JSON.parse(orgScript!);
    expect(data['@type']).toBe('Organization');
  });

  test('homepage should have Course JSON-LD', async ({ page }) => {
    await page.goto('/en');
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const allScripts = await jsonLdScripts.allTextContents();
    const courseScript = allScripts.find(s => s.includes('"Course"'));
    expect(courseScript).toBeTruthy();
    const data = JSON.parse(courseScript!);
    expect(data['@type']).toBe('Course');
    expect(data.numberOfLessons).toBe(7);
    expect(data.isAccessibleForFree).toBe(true);
  });
});

test.describe('SEO - Meta Tags', () => {
  test('homepage should have proper meta tags', async ({ page }) => {
    await page.goto('/en');
    
    // Title
    await expect(page).toHaveTitle(/OpenClaw 101/);

    // Description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);

    // OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('OpenClaw');

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toContain('/en');
  });

  test('skills page should have proper meta tags', async ({ page }) => {
    await page.goto('/en/skills');
    await expect(page).toHaveTitle(/Skills|OpenClaw/i);
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('tutorials page should have proper meta tags', async ({ page }) => {
    await page.goto('/en/tutorials');
    await expect(page).toHaveTitle(/Tutorials|OpenClaw/i);
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('Chinese homepage should have correct locale meta', async ({ page }) => {
    await page.goto('/zh');
    
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toBe('zh_CN');
  });

  test('English homepage should have correct locale meta', async ({ page }) => {
    await page.goto('/en');
    
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toBe('en_US');
  });
});

test.describe('SEO - Sitemap & Robots', () => {
  test('should serve sitemap.xml', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('xml');
  });

  test('should serve robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('User-agent');
    expect(text).toContain('Sitemap');
  });

  test('should serve RSS feed', async ({ page }) => {
    const response = await page.goto('/feed.xml');
    expect(response?.status()).toBe(200);
  });
});

test.describe('SEO - Canonical & Hreflang', () => {
  test('English page should have canonical URL', async ({ page }) => {
    await page.goto('/en');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/en');
  });

  test('should have hreflang alternates', async ({ page }) => {
    await page.goto('/en');
    const enAlternate = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
    const zhAlternate = await page.locator('link[rel="alternate"][hreflang="zh"]').getAttribute('href');
    
    if (enAlternate) {
      expect(enAlternate).toContain('/en');
    }
    if (zhAlternate) {
      expect(zhAlternate).toContain('/zh');
    }
  });
});
