import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/root/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu']
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2
});

const page = await context.newPage();

// 1. 首页全页截图
console.log('📸 截图首页...');
await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/01-home-full.png', fullPage: true });

// 2. Hero 区
console.log('📸 截图 Hero 区...');
await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/02-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

// 3. 滚动到 Features
console.log('📸 截图 Features...');
await page.evaluate(() => window.scrollTo(0, 850));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/03-features.png' });

// 4. 滚动到 Use Cases
console.log('📸 截图 Use Cases...');
await page.evaluate(() => window.scrollTo(0, 1700));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/04-usecases.png' });

// 5. 滚动到 Learning Path
console.log('📸 截图 Learning Path...');
await page.evaluate(() => window.scrollTo(0, 2800));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/05-learning-path.png' });

// 6. 滚动到 Skills Stats
console.log('📸 截图 Skills Stats...');
await page.evaluate(() => window.scrollTo(0, 3600));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/06-skills-stats.png' });

// 7. 滚动到 Community
console.log('📸 截图 Community...');
await page.evaluate(() => window.scrollTo(0, 5000));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/07-community.png' });

// 8. Skills 页面
console.log('📸 截图 Skills 页面...');
await page.goto('http://localhost:3000/en/skills', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/08-skills-page.png' });

// 9. Skills 页面完整
await page.screenshot({ path: 'screenshots/09-skills-full.png', fullPage: true });

// 10. Footer
console.log('📸 截图 Footer...');
await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/10-footer.png' });

await browser.close();
console.log('✅ 所有截图完成！保存在 screenshots/ 目录');
