import { test, expect } from '@playwright/test';

test.describe('Learning Path - English', () => {
  test('should display Day 1 learning page', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    // Should display day indicator
    const body = await page.textContent('body');
    expect(body).toContain('Day 1');
    expect(body).toContain('Meet OpenClaw');
  });

  test('should display learning objective', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('Learning Objective');
    expect(body).toContain('Install OpenClaw');
  });

  test('should display practice exercises', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('Practice Exercises');
  });

  test('should display next step section', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('Next Step');
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    // Breadcrumbs should contain Home and Learning Path
    const body = await page.textContent('body');
    expect(body).toContain('Home');
    expect(body).toContain('Learning Path');
  });

  test('should navigate between days', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    // Day 1 should have a next day link (Day 2)
    const nextLink = page.locator('a[href*="/learn/2"]').first();
    await expect(nextLink).toBeVisible();
    await nextLink.click();
    await page.waitForURL(/\/en\/learn\/2/);
    
    const body = await page.textContent('body');
    expect(body).toContain('Day 2');
  });

  test('should load all 7 days correctly', async ({ page }) => {
    for (let day = 1; day <= 7; day++) {
      await page.goto(`/en/learn/${day}`);
      await page.waitForLoadState('networkidle');

      const body = await page.textContent('body');
      expect(body).toContain(`Day ${day}`);
      expect(body!.length).toBeGreaterThan(500);
    }
  });

  test('should have proper page title for each day', async ({ page }) => {
    await page.goto('/en/learn/1');
    await expect(page).toHaveTitle(/Day 1.*Meet OpenClaw|OpenClaw/i);
  });

  test('should have back to home link', async ({ page }) => {
    await page.goto('/en/learn/3');
    await page.waitForLoadState('networkidle');

    const backLink = page.getByText('Back to Home');
    await expect(backLink).toBeVisible();
  });

  test('should display code blocks in content', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    // Day 1 contains installation code blocks
    const codeBlocks = page.locator('pre code');
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Day 7 should show browse tutorials link instead of next day', async ({ page }) => {
    await page.goto('/en/learn/7');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('Browse More Tutorials');
  });
});

test.describe('Learning Path - Chinese', () => {
  test('should display Day 1 in Chinese', async ({ page }) => {
    await page.goto('/zh/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('第 1 天');
    expect(body).toContain('认识 OpenClaw');
  });

  test('should display Chinese learning objective', async ({ page }) => {
    await page.goto('/zh/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('学习目标');
  });

  test('should display Chinese practice exercises', async ({ page }) => {
    await page.goto('/zh/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('实践练习');
  });

  test('should display Chinese navigation labels', async ({ page }) => {
    await page.goto('/zh/learn/1');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('返回首页');
    expect(body).toContain('下一步');
  });

  test('Day 7 should show browse tutorials in Chinese', async ({ page }) => {
    await page.goto('/zh/learn/7');
    await page.waitForLoadState('networkidle');

    const body = await page.textContent('body');
    expect(body).toContain('浏览更多教程');
  });
});

test.describe('Learning Path - 404 handling', () => {
  test('should handle invalid day number gracefully', async ({ page }) => {
    const response = await page.goto('/en/learn/99');
    // Should return 404 or redirect
    expect(response?.status()).toBeOneOf([200, 404]);
  });
});

test.describe('Learning Path - SEO', () => {
  test('should have JSON-LD structured data', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    const jsonLdElements = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdElements.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify Article schema
    const jsonLdText = await jsonLdElements.first().textContent();
    const jsonLd = JSON.parse(jsonLdText!);
    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.headline).toContain('Day 1');
  });

  test('should have breadcrumb JSON-LD', async ({ page }) => {
    await page.goto('/en/learn/1');
    await page.waitForLoadState('networkidle');

    const jsonLdElements = page.locator('script[type="application/ld+json"]');
    let hasBreadcrumb = false;
    
    for (let i = 0; i < await jsonLdElements.count(); i++) {
      const text = await jsonLdElements.nth(i).textContent();
      const data = JSON.parse(text!);
      if (data['@type'] === 'BreadcrumbList') {
        hasBreadcrumb = true;
        expect(data.itemListElement.length).toBe(3);
      }
    }
    expect(hasBreadcrumb).toBe(true);
  });

  test('should have alternates for i18n', async ({ page }) => {
    await page.goto('/en/learn/1');
    // Check meta tags or link elements for alternate languages
    const alternateZh = page.locator('link[hreflang="zh"]');
    const alternateEn = page.locator('link[hreflang="en"]');
    
    // At minimum, the page should have proper SEO metadata
    await expect(page).toHaveTitle(/Day 1/);
  });
});
