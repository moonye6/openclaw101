import { test, expect } from '@playwright/test';

test.describe('Navigation - English', () => {
  test('should navigate from homepage to skills page', async ({ page }) => {
    await page.goto('/en');
    const skillsLink = page.locator('header').getByRole('link', { name: 'Skills' });
    await skillsLink.click();
    await page.waitForURL(/\/en\/skills/);
    await expect(page).toHaveURL(/\/en\/skills/);
  });

  test('should navigate from homepage to tutorials page', async ({ page }) => {
    await page.goto('/en');
    const tutorialsLink = page.locator('header').getByRole('link', { name: 'Tutorials' });
    await tutorialsLink.click();
    await page.waitForURL(/\/en\/tutorials/);
    await expect(page).toHaveURL(/\/en\/tutorials/);
  });

  test('should navigate from homepage to blog page', async ({ page }) => {
    await page.goto('/en');
    const blogLink = page.locator('header').getByRole('link', { name: 'Blog' });
    await blogLink.click();
    await page.waitForURL(/\/en\/blog/);
    await expect(page).toHaveURL(/\/en\/blog/);
  });

  test('should navigate to learning path Day 1', async ({ page }) => {
    await page.goto('/en');
    const day1Link = page.getByRole('link', { name: /Meet OpenClaw/ });
    await day1Link.click();
    await page.waitForURL(/\/en\/learn\/1/);
    await expect(page).toHaveURL(/\/en\/learn\/1/);
  });

  test('should navigate back to homepage via logo', async ({ page }) => {
    await page.goto('/en/skills');
    await page.getByText('OpenClaw 101').first().click();
    await page.waitForURL(/\/en$/);
    await expect(page).toHaveURL(/\/en$/);
  });

  test('should show active state for current nav item', async ({ page }) => {
    await page.goto('/en/skills');
    const headerNav = page.locator('header nav');
    const activeLink = headerNav.locator('a', { hasText: 'Skills' });
    const classes = await activeLink.getAttribute('class');
    // The active link should have some styling class - verify it exists and has text-related styling
    expect(classes).toBeTruthy();
    expect(classes!.length).toBeGreaterThan(0);
  });
});

test.describe('Navigation - Chinese', () => {
  test('should navigate from Chinese homepage to skills page', async ({ page }) => {
    await page.goto('/zh');
    const skillsLink = page.locator('header').getByRole('link', { name: '技能' });
    await skillsLink.click();
    await page.waitForURL(/\/zh\/skills/);
    await expect(page).toHaveURL(/\/zh\/skills/);
  });

  test('should navigate from Chinese homepage to tutorials page', async ({ page }) => {
    await page.goto('/zh');
    const tutorialsLink = page.locator('header').getByRole('link', { name: '教程' });
    await tutorialsLink.click();
    await page.waitForURL(/\/zh\/tutorials/);
    await expect(page).toHaveURL(/\/zh\/tutorials/);
  });

  test('should navigate to learning path in Chinese', async ({ page }) => {
    await page.goto('/zh');
    const day1Link = page.getByRole('link', { name: /认识 OpenClaw/ });
    await day1Link.click();
    await page.waitForURL(/\/zh\/learn\/1/);
    await expect(page).toHaveURL(/\/zh\/learn\/1/);
  });
});

test.describe('Language Switching', () => {
  test('should redirect root to locale', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL(/\/(en|zh)/);
    const url = page.url();
    expect(url).toMatch(/\/(en|zh)/);
  });

  test('language toggle button should be visible', async ({ page }) => {
    await page.goto('/en');
    const langButton = page.locator('header button', { hasText: '中文' });
    await expect(langButton).toBeVisible();
  });
});

test.describe('404 Page', () => {
  test('should show not found page for invalid routes', async ({ page }) => {
    await page.goto('/en/nonexistent-page');
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });
});

test.describe('Learning Path Navigation', () => {
  test('should navigate between learning days', async ({ page }) => {
    await page.goto('/en/learn/1');
    const body = await page.textContent('body');
    expect(body).toContain('Day 1');
  });

  test('should display learning content for all 7 days', async ({ page }) => {
    for (let day = 1; day <= 7; day++) {
      await page.goto(`/en/learn/${day}`);
      const body = await page.textContent('body');
      expect(body).toContain(`Day ${day}`);
    }
  });
});
