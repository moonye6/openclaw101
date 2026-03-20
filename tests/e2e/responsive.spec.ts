import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test('should show mobile menu button on small viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/en');

    const mobileMenuButton = page.locator('header button');
    const count = await mobileMenuButton.count();
    expect(count).toBeGreaterThan(0);

    await context.close();
  });

  test('should toggle mobile menu and show nav items', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/en');

    // Click mobile menu button
    const buttons = page.locator('header button');
    const lastButton = buttons.last();
    await lastButton.click();
    await page.waitForTimeout(500);

    // Nav items should be visible somewhere in the page
    const body = await page.textContent('body');
    expect(body).toContain('Home');
    expect(body).toContain('Skills');
    expect(body).toContain('Tutorials');
    expect(body).toContain('Blog');

    await context.close();
  });

  test('should display hero section on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/en');

    await expect(page.getByText('Master OpenClaw in 7 Days')).toBeVisible();

    await context.close();
  });

  test('should display footer on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/en');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    await context.close();
  });
});

test.describe('Tablet Responsive', () => {
  test('should display homepage properly on tablet', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1024, height: 1366 },
    });
    const page = await context.newPage();
    await page.goto('/en');

    await expect(page.getByText('Master OpenClaw in 7 Days')).toBeVisible();

    await context.close();
  });

  test('should display skills page properly on tablet', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1024, height: 1366 },
    });
    const page = await context.newPage();
    await page.goto('/en/skills');

    const body = await page.textContent('body');
    expect(body).toContain('Skills');

    await context.close();
  });
});

test.describe('Wide Desktop', () => {
  test('should display homepage with constrained container', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await page.goto('/en');

    await expect(page.getByText('Master OpenClaw in 7 Days')).toBeVisible();

    const container = page.locator('.container').first();
    const box = await container.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThan(1600);

    await context.close();
  });
});
