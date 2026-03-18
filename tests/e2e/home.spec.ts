import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://openclaw101.vip';

test.describe('OpenClaw 101 E2E Tests', () => {
  test('homepage redirects to /en', async ({ page }) => {
    await page.goto(BASE_URL);
    // Should redirect to /en or /zh
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/(en|zh)$`));
  });

  test('blog page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog`);
    
    // Check page loads
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Check blog posts are listed
    const blogLinks = page.locator('a[href*="/blog/"]');
    await expect(blogLinks.first()).toBeVisible();
  });

  test('blog post page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/openclaw-vs-chatgpt`);
    
    // Check article loads
    await expect(page.locator('article, main').first()).toBeVisible();
    
    // Check title exists
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();
  });

  test('zh locale works', async ({ page }) => {
    await page.goto(`${BASE_URL}/zh`);
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/zh`));
  });

  test('learning path page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/learn/1`);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('404 page shows for invalid route', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/nonexistent-page-12345`);
    
    // Should show 404 content
    const body = await page.locator('body').textContent();
    expect(body).toMatch(/404|not found|找不到/i);
  });
});
