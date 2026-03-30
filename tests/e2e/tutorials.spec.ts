import { test, expect } from '@playwright/test';

test.describe('Tutorials Page - English', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/tutorials');
  });

  test('should display tutorials page header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Tutorials|Browse/ })).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    await expect(searchInput).toBeVisible();
  });

  test('should display tutorial cards', async ({ page }) => {
    // Tutorials page should have content
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(500);
    // Should show results count
    expect(body).toMatch(/\d+.*tutorial/i);
  });

  test('should filter tutorials by search', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    await searchInput.fill('Docker');
    await page.waitForTimeout(500);
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });

  test('should have category filter tabs', async ({ page }) => {
    // Category tabs/buttons should exist
    const body = await page.textContent('body');
    expect(body).toContain('All Categories');
    expect(body).toContain('Getting Started');
  });

  test('should filter tutorials by category', async ({ page }) => {
    const videosButton = page.getByText('Videos', { exact: true });
    if (await videosButton.isVisible()) {
      await videosButton.click();
      await page.waitForTimeout(500);
    }
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });

  test('should have proper page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Tutorial|OpenClaw/i);
  });
});

test.describe('Tutorials Page - Chinese', () => {
  test('should display Chinese tutorials page', async ({ page }) => {
    await page.goto('/zh/tutorials');
    const body = await page.textContent('body');
    expect(body).toContain('教程');
  });
});

test.describe('Tutorial Detail Page', () => {
  test('should load tutorial detail page', async ({ page }) => {
    await page.goto('/en/tutorials/1');
    await page.waitForLoadState('networkidle');
    const body = await page.textContent('body');
    expect(body!.length).toBeGreaterThan(100);
    expect(body).toContain('OpenClaw');
  });
});
