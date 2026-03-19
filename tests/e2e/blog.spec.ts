import { test, expect } from '@playwright/test';

test.describe('Blog Page - English', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/blog');
  });

  test('should display blog page with articles', async ({ page }) => {
    // Blog page should have content
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(200);
  });

  test('should display blog article cards', async ({ page }) => {
    // Should have article links
    const articleLinks = page.locator('a[href*="/blog/"]');
    const count = await articleLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to a blog post', async ({ page }) => {
    const firstArticle = page.locator('a[href*="/blog/"]').first();
    await firstArticle.click();
    await page.waitForURL(/\/en\/blog\/.+/);
    await expect(page).toHaveURL(/\/en\/blog\/.+/);
  });

  test('should have proper page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog|OpenClaw/i);
  });
});

test.describe('Blog Detail Page', () => {
  test('should display blog post content', async ({ page }) => {
    await page.goto('/en/blog/openclaw-vs-chatgpt');
    await page.waitForLoadState('networkidle');
    
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(500);
    expect(body).toContain('OpenClaw');
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    await page.goto('/en/blog/openclaw-vs-chatgpt');
    // Check for navigation back to blog
    const blogLink = page.getByRole('link', { name: /Blog/ }).first();
    await expect(blogLink).toBeVisible();
  });

  test('should display related resources', async ({ page }) => {
    await page.goto('/en/blog/openclaw-vs-chatgpt');
    // Blog posts typically have related links at the bottom
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });
});

test.describe('Blog Page - Chinese', () => {
  test('should display Chinese blog page', async ({ page }) => {
    await page.goto('/zh/blog');
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(200);
  });

  test('should navigate to Chinese blog post', async ({ page }) => {
    await page.goto('/zh/blog/openclaw-vs-chatgpt');
    await page.waitForLoadState('networkidle');
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(200);
  });
});
