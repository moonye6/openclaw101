import { test, expect } from '@playwright/test';

// =============================================
// Homepage tests targeting the LIVE production site
// Tests for new sections (UseCases, Community, News)
// are marked with a tag so they can be skipped
// until deployment is complete.
// =============================================

test.describe('Homepage - English - Core', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('should load homepage and display hero section', async ({ page }) => {
    await expect(page).toHaveTitle(/OpenClaw 101/);
    await expect(page.getByText('Master OpenClaw in 7 Days')).toBeVisible();
    await expect(page.getByText(/Your AI assistant that actually does things/)).toBeVisible();

    // CTA buttons
    await expect(page.getByRole('link', { name: /Start Learning/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Browse Resources/ })).toBeVisible();
  });

  test('should display header with navigation links', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(page.getByText('OpenClaw 101').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Skills' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tutorials' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'What is OpenClaw?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Multi-Platform' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Extensible Skills' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Self-Hosted' })).toBeVisible();
  });

  test('should display 7-day learning path', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '7-Day Learning Path' })).toBeVisible();
    await expect(page.getByText('Meet OpenClaw')).toBeVisible();
    await expect(page.getByText('Deep Conversations')).toBeVisible();
    await expect(page.getByText('Files & Code')).toBeVisible();
    await expect(page.getByText('Web Capabilities')).toBeVisible();
    await expect(page.getByText('Skill Extensions')).toBeVisible();
    await expect(page.getByText('Advanced Techniques')).toBeVisible();
    const day1Link = page.getByRole('link', { name: /Meet OpenClaw/ });
    await expect(day1Link).toHaveAttribute('href', /\/learn\/1/);
  });

  test('should display recommended section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recommended for You' })).toBeVisible();
    await expect(page.getByText('Top Tutorials')).toBeVisible();
    await expect(page.getByText('Popular Skills')).toBeVisible();
  });

  test('should display security warning', async ({ page }) => {
    await expect(page.getByText('Security Notice')).toBeVisible();
    await expect(page.getByText(/341 malicious/).first()).toBeVisible();
  });

  test('should display FAQ section with accordion behavior', async ({ page }) => {
    await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    const faqSection = page.locator('section', { hasText: 'Frequently Asked Questions' });
    const firstQuestion = faqSection.locator('button').first();
    await expect(firstQuestion).toBeVisible();
    await firstQuestion.click();
    await expect(faqSection.getByText(/all-in-one AI assistant framework/).first()).toBeVisible();
    await firstQuestion.click();
    await page.waitForTimeout(300);
  });

  test('should display footer with all sections', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('OpenClaw 101').first()).toBeVisible();
    await expect(footer.getByText(/© \d{4} OpenClaw 101/)).toBeVisible();
  });

  test('should have proper meta tags and SEO', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('OpenClaw');
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('OpenClaw 101');
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').count();
    expect(jsonLdScripts).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Homepage - English - New Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('should display use cases section @new', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'What Can OpenClaw Do?' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Coding Assistant' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Research & Analysis' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Task Automation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Content Creation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Smart Home Control' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Processing' })).toBeVisible();
  });

  test('should display community showcase section @new', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Join the OpenClaw Community/ })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Alex Chen').first()).toBeVisible();
    await expect(page.getByText('Dr. Sarah Kim').first()).toBeVisible();
    await expect(page.getByText('Marco Liu').first()).toBeVisible();
    await expect(page.getByText('Anthropic').first()).toBeVisible();
  });

  test('should display news updates section @new', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'News & Updates' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/OpenClaw v4.2 Released/).first()).toBeVisible();
    await expect(page.getByText(/ClawHub Reaches 5,500/).first()).toBeVisible();
  });
});

test.describe('Homepage - Chinese', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh');
  });

  test('should display Chinese core content', async ({ page }) => {
    await expect(page).toHaveTitle(/OpenClaw 101/);
    await expect(page.getByText('7天掌握 OpenClaw')).toBeVisible();
    await expect(page.getByText(/真正为你做事的 AI 助手/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /什么是 OpenClaw/ })).toBeVisible();
    await expect(page.getByText('7天学习路径')).toBeVisible();
    await expect(page.getByText('认识 OpenClaw')).toBeVisible();
    await expect(page.getByText('常见问题')).toBeVisible();
  });

  test('should display Chinese navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: '首页' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: '技能' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: '教程' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: '博客' }).first()).toBeVisible();
  });

  test('should have new FAQ items in Chinese @new', async ({ page }) => {
    const faqSection = page.locator('section', { hasText: '常见问题' });
    await expect(faqSection.getByText('OpenClaw 是什么？')).toBeVisible();
    await expect(faqSection.getByText('OpenClaw 与 ChatGPT 或 Claude 相比有什么不同？')).toBeVisible({ timeout: 10000 });
    await expect(faqSection.getByText('OpenClaw 能使用本地/离线 AI 模型吗？')).toBeVisible();
  });

  test('should display Chinese new sections @new', async ({ page }) => {
    await expect(page.getByText('OpenClaw 能做什么？').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('加入 OpenClaw 社区').first()).toBeVisible();
    await expect(page.getByText('新闻与更新').first()).toBeVisible();
  });
});

test.describe('Homepage - Visual checks', () => {
  test('should have no layout shifts on initial load', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const main = page.getByRole('main').last();
    const box = await main.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(300);
    expect(box!.height).toBeGreaterThan(500);
  });

  test('should have sticky header', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
  });

  test('should have gradient background in hero section', async ({ page }) => {
    await page.goto('/en');
    const hero = page.locator('section').first();
    const bgClasses = await hero.getAttribute('class');
    expect(bgClasses).toContain('bg-gradient');
  });
});
