import { test, expect } from '@playwright/test';

test.describe('Skills Page - English', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/skills');
  });

  test('should display skills page header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Community Skills' })).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    await expect(searchInput).toBeVisible();
  });

  test('should display skill categories', async ({ page }) => {
    // Should have category text visible
    const body = await page.textContent('body');
    expect(body).toContain('AI');
  });

  test('should display sample skills', async ({ page }) => {
    // Skills page should display skill cards/items
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(500);
    // Should have at least some skill content
    expect(body).toContain('Skills');
  });

  test('should filter skills by search', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    await searchInput.fill('github');
    await page.waitForTimeout(500);
    const body = await page.textContent('body');
    expect(body!.toLowerCase()).toContain('github');
  });

  test('should have proper page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Skill|OpenClaw/i);
  });
});

test.describe('Skills Page - Chinese', () => {
  test('should display Chinese skills page', async ({ page }) => {
    await page.goto('/zh/skills');
    const body = await page.textContent('body');
    expect(body).toContain('技能');
  });
});

test.describe('Skills Category Pages', () => {
  test('should load a skill category page', async ({ page }) => {
    await page.goto('/en/skills/ai-llm');
    await page.waitForLoadState('networkidle');
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(100);
  });
});
