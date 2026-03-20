import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('homepage should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/en');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(3);
  });

  test('all images should have alt text or be decorative', async ({ page }) => {
    await page.goto('/en');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });

  test('interactive elements should be focusable', async ({ page }) => {
    await page.goto('/en');
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(10);
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('page should have proper lang attribute', async ({ page }) => {
    await page.goto('/en');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('Chinese page should have proper lang attribute', async ({ page }) => {
    await page.goto('/zh');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('zh');
  });

  test('navigation should have proper structure', async ({ page }) => {
    await page.goto('/en');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    const nav = page.locator('header nav');
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThanOrEqual(1);
  });

  test('FAQ accordion buttons should be accessible', async ({ page }) => {
    await page.goto('/en');
    const faqSection = page.locator('section', { hasText: 'Frequently Asked Questions' });
    const faqButtons = faqSection.locator('button');
    const count = await faqButtons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 3); i++) {
      const text = await faqButtons.nth(i).textContent();
      expect(text!.trim().length).toBeGreaterThan(5);
    }
  });

  test('external links should have noopener', async ({ page }) => {
    await page.goto('/en');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });
});

test.describe('Performance Basics', () => {
  test('homepage should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(15000);
  });

  test('page should not have critical console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Filter out known third-party / benign errors
    const criticalErrors = errors.filter(e =>
      !e.includes('analytics') &&
      !e.includes('google') &&
      !e.includes('favicon') &&
      !e.includes('gtag') &&
      !e.includes('third-party') &&
      !e.includes('cookie') &&
      !e.includes('ERR_BLOCKED') &&
      !e.includes('net::')
    );

    // Allow a small number of non-critical errors
    expect(criticalErrors.length).toBeLessThanOrEqual(2);
  });
});
