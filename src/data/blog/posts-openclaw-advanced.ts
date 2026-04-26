import type { BlogPost } from './types';

// OpenClaw 进阶系列 (id 17-20)
export const postsOpenclawAdvanced: BlogPost[] = [
  {
    id: 17,
    slug: "openclaw-browser-use-integration",
    title: "OpenClaw + Browser Use：让 AI 助手自动操控浏览器",
    titleEn: "OpenClaw + Browser Use: Let Your AI Assistant Control the Browser",
    excerpt: "Browser Use 是 2026 年最热门的开源浏览器自动化项目，几个月内获得 78,000+ GitHub Stars。本文教你如何将其与 OpenClaw 集成，打造能自动浏览网页、填表单、抢票的 AI 助手。",
    excerptEn: "Browser Use is the hottest open-source browser automation project of 2026, gaining 78,000+ GitHub Stars in months. Learn how to integrate it with OpenClaw to build an AI assistant that can browse websites, fill forms, and book tickets automatically.",
    content: `Browser Use 是 2026 年增长最快的开源项目之一，由 Magnus Müller 和 Gregor Žunić 开发，几个月内 GitHub Stars 从 0 增长到 78,000+。

它让 AI Agent 能够像人类一样操控浏览器：点击、输入、滚动、截图。

## 为什么需要 Browser Use + OpenClaw？

OpenClaw 是一个强大的 AI Agent 平台，但默认情况下它只能：

- 回答问题
- 操作本地文件
- 调用 API

加上 Browser Use 后，它能：

- 🌐 **浏览网页**：打开任意网站，阅读内容
- 📝 **填写表单**：自动注册、登录、提交
- 🛒 **电商操作**：下单、比价、抢购
- 📊 **数据采集**：抓取网页数据，生成报告

## 架构设计

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    OpenClaw                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Brain     │  │   Memory    │  │   Skills    │ │
│  │  (LLM)      │  │  (SQLite)   │  │  (Plugins)  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                          │                          │
│                    ┌─────▼─────┐                    │
│                    │  Browser  │                    │
│                    │  Use      │                    │
│                    │  Skill    │                    │
│                    └─────┬─────┘                    │
└──────────────────────────┼──────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Playwright │
                    │  (Browser)  │
                    └─────────────┘
\`\`\`

## 安装步骤

### 1. 安装 Browser Use

\`\`\`bash
# 安装 Browser Use
pip install browser-use

# 或使用 pipx（推荐）
pipx install browser-use
\`\`\`

### 2. 安装 Playwright

\`\`\`bash
# 安装 Playwright 浏览器
playwright install chromium
\`\`\`

### 3. 创建 Browser Use Skill

在 OpenClaw 的 skills 目录创建新技能：

\`\`\`bash
mkdir -p ~/.openclaw/skills/browser-use
\`\`\`

创建 \`~/.openclaw/skills/browser-use/SKILL.md\`：

\`\`\`markdown
---
name: browser-use
description: Control web browser with AI - browse, click, type, scrape
tools:
  - exec
---

# Browser Use Skill

This skill enables OpenClaw to control a web browser using Browser Use.

## Capabilities

- Navigate to any URL
- Click elements by description
- Type text into input fields
- Take screenshots
- Extract page content
- Fill and submit forms

## Usage

### Navigate to URL

\`\`\`bash
browser-use navigate "https://example.com"
\`\`\`

### Click Element

\`\`\`bash
browser-use click "Sign in button"
\`\`\`

### Type Text

\`\`\`bash
browser-use type "username input" "myemail@example.com"
\`\`\`

### Take Screenshot

\`\`\`bash
browser-use screenshot
\`\`\`

### Extract Content

\`\`\`bash
browser-use extract "product prices"
\`\`\`

## Examples

### Google Search

\`\`\`bash
browser-use navigate "https://google.com"
browser-use type "search box" "OpenClaw AI agent"
browser-use click "Google Search button"
browser-use extract "first 5 results"
\`\`\`

### Fill Form

\`\`\`bash
browser-use navigate "https://example.com/register"
browser-use type "name field" "John Doe"
browser-use type "email field" "john@example.com"
browser-use click "Submit button"
\`\`\`
\`\`\`

### 4. 配置 OpenClaw

在 \`~/.openclaw/openclaw.json\` 中添加：

\`\`\`json
{
  "skills": {
    "enabled": ["browser-use"]
  }
}
\`\`\`

### 5. 重启 OpenClaw

\`\`\`bash
openclaw restart
\`\`\`

## 实战案例

### 案例 1：自动比价

**用户需求**：帮我对比京东和淘宝的 iPhone 16 Pro 价格

**OpenClaw 操作流程**：

\`\`\`
1. 用户: 帮我对比京东和淘宝的 iPhone 16 Pro 价格
2. OpenClaw: 
   - 调用 browser-use 导航到京东
   - 搜索 "iPhone 16 Pro"
   - 提取价格
   - 导航到淘宝
   - 搜索 "iPhone 16 Pro"
   - 提取价格
   - 生成对比报告
3. 输出:
   - 京东: ¥7,999 (官方旗舰店)
   - 淘宝: ¥7,899 (百亿补贴)
   - 推荐: 淘宝更便宜 ¥100
\`\`\`

### 案例 2：自动预约

**用户需求**：帮我预约明天的羽毛球馆

**OpenClaw 操作流程**：

\`\`\`
1. 用户: 帮我预约明天下午 3 点的羽毛球馆
2. OpenClaw:
   - 打开预约网站
   - 登录（使用保存的密码）
   - 选择日期：明天
   - 选择时间：15:00-17:00
   - 选择场地：3号场
   - 确认预约
3. 输出: 预约成功！场地已锁定，请准时到场
\`\`\`

### 案例 3：监控抢购

**用户需求**：帮我监控 RTX 5090 的库存，有货立即通知

**OpenClaw 操作流程**：

\`\`\`
1. 用户: 帮我监控 RTX 5090 的库存，有货立即通知
2. OpenClaw:
   - 设置定时任务（每 5 分钟检查一次）
   - 打开电商网站
   - 搜索 "RTX 5090"
   - 检查库存状态
   - 如果有货 → 发送 Telegram 通知
3. 输出: 🎉 RTX 5090 有货了！[立即购买链接]
\`\`\`

## 高级配置

### 使用代理

\`\`\`bash
browser-use config set proxy "http://127.0.0.1:7890"
\`\`\`

### 无头模式

\`\`\`bash
browser-use config set headless true
\`\`\`

### 用户数据目录（保持登录状态）

\`\`\`bash
browser-use config set user-data-dir "~/.browser-use/profile"
\`\`\`

### 截图保存

\`\`\`bash
browser-use config set screenshot-dir "~/.browser-use/screenshots"
\`\`\`

## 安全注意事项

### ⚠️ 风险提示

1. **账号安全**：浏览器自动化可能触发网站的反机器人检测
2. **隐私泄露**：不要在公共网站上保存敏感信息
3. **法律风险**：遵守网站的使用条款，不要用于违规操作

### 🔒 安全配置

\`\`\`json
{
  "skills": {
    "browser-use": {
      "allowedDomains": ["*.google.com", "*.github.com"],
      "blockedActions": ["delete", "remove"],
      "requireConfirmation": ["checkout", "payment"]
    }
  }
}
\`\`\`

## 常见问题

### Q: Browser Use 和 Selenium 有什么区别？

| 特性 | Browser Use | Selenium |
|------|-------------|----------|
| 控制方式 | AI 自然语言 | CSS 选择器 |
| 学习曲线 | 低 | 高 |
| 维护成本 | 低（自适应） | 高（选择器易失效） |
| 适用场景 | 动态网站 | 固定流程 |

### Q: 网站检测到自动化怎么办？

**解决方案**：

1. 使用 Browser Use Cloud（官方托管）
2. 配置 \`stealth\` 模式
3. 降低操作速度
4. 使用住宅代理

### Q: 如何保持登录状态？

\`\`\`bash
# 设置用户数据目录
browser-use config set user-data-dir "~/.browser-use/profile"

# 首次登录后，session 会保存在该目录
\`\`\`

## 替代方案对比

| 方案 | 优势 | 劣势 |
|------|------|------|
| **Browser Use** | 开源免费、AI 驱动 | 需要自己部署 |
| **OpenAI Operator** | 开箱即用 | 仅限 ChatGPT Plus、功能受限 |
| **Browserbase** | 云端托管 | 按用量付费 |
| **Puppeteer** | 成熟稳定 | 需要编程 |

## 总结

Browser Use + OpenClaw = **最强大的浏览器自动化方案**

- 🤖 AI 驱动：用自然语言控制浏览器
- 🔓 完全开源：代码透明，数据本地
- 🔧 高度定制：支持任意网站和流程
- 💰 零成本：自托管，无需付费

立即开始你的浏览器自动化之旅吧！`,
    contentEn: `Browser Use is one of the fastest-growing open-source projects of 2026, created by Magnus Muller and Gregor Zunic. In just a few months it rocketed from zero to 78,000+ GitHub Stars. The project gives AI agents the ability to control web browsers the same way a human would --- clicking buttons, typing into fields, scrolling pages, taking screenshots, and extracting content.

When you combine Browser Use with OpenClaw, you get an AI assistant that can not only reason about tasks and manage files, but also interact with any website on the internet. This article covers everything you need to know: what Browser Use is, how to set it up with OpenClaw, practical examples ranging from simple scraping to advanced multi-tab workflows, and answers to the most common questions.

## What is Browser Use and How Does it Work with OpenClaw?

Browser Use is a Python library built on top of **Playwright** (Microsoft's browser automation framework). Unlike traditional browser automation tools that require you to write CSS selectors and XPath expressions, Browser Use lets you describe actions in natural language. The AI agent interprets your intent and translates it into precise browser operations.

OpenClaw, on its own, is a powerful AI Agent platform that can answer questions, operate on local files, execute code, and call APIs. But it cannot interact with websites. By installing Browser Use as an OpenClaw skill, you bridge that gap:

- **Browse websites**: Navigate to any URL, read page content, follow links
- **Fill forms**: Automatically register accounts, log in, submit applications
- **E-commerce operations**: Compare prices, place orders, monitor stock
- **Data collection**: Scrape structured data from web pages and generate reports
- **Screenshot capture**: Take full-page or element-level screenshots for documentation
- **PDF generation**: Render web pages as PDF files for archival

### Architecture Overview

\`\`\`
+-----------------------------------------------------+
|                     OpenClaw                         |
|  +-----------+   +----------+   +-----------+       |
|  |   Brain   |   |  Memory  |   |  Skills   |       |
|  |   (LLM)   |   | (SQLite) |   | (Plugins) |       |
|  +-----------+   +----------+   +-----------+       |
|                        |                             |
|                  +-----v------+                      |
|                  | Browser    |                      |
|                  | Use Skill  |                      |
|                  +-----+------+                      |
+------------------------|---------+------------------+
                         |
                   +-----v------+
                   | Playwright |
                   | (Chromium) |
                   +------------+
\`\`\`

The LLM brain decides when browser interaction is needed, the Browser Use skill translates natural language commands into Playwright actions, and Playwright controls the actual browser instance.

---

## Setup: Install Playwright and Configure Browser Automation

### Step 1: Install Browser Use

Browser Use is distributed as a Python package. You can install it globally or in a virtual environment:

\`\`\`bash
# Install Browser Use via pip
pip install browser-use

# Or use pipx for isolated installation (recommended)
pipx install browser-use
\`\`\`

### Step 2: Install Playwright and Browser Binaries

Playwright needs actual browser binaries to control. Install Chromium (lightweight and fast):

\`\`\`bash
# Install Playwright's browser binaries
playwright install chromium

# Verify the installation
playwright --version
\`\`\`

If you need Firefox or WebKit support for cross-browser testing:

\`\`\`bash
# Install all browsers
playwright install
\`\`\`

### Step 3: Create the Browser Use Skill in OpenClaw

Create the skill directory and definition file:

\`\`\`bash
mkdir -p ~/.openclaw/skills/browser-use
\`\`\`

Create the skill definition at \`~/.openclaw/skills/browser-use/SKILL.md\`:

\`\`\`markdown
---
name: browser-use
description: Control web browser with AI - browse, click, type, scrape, screenshot
tools:
  - exec
---

# Browser Use Skill

This skill enables OpenClaw to control a web browser using Browser Use.

## Capabilities

- Navigate to any URL
- Click elements by description
- Type text into input fields
- Take screenshots (full page or element)
- Extract page content as text or structured data
- Fill and submit forms
- Generate PDFs from web pages

## Usage

### Navigate to a URL
browser-use navigate "https://example.com"

### Click an element
browser-use click "Sign in button"

### Type into a field
browser-use type "email input" "user@example.com"

### Take a screenshot
browser-use screenshot

### Extract content
browser-use extract "product prices"

### Generate PDF
browser-use pdf "output.pdf"
\`\`\`

### Step 4: Configure OpenClaw to Load the Skill

Edit \`~/.openclaw/openclaw.json\`:

\`\`\`json
{
  "skills": {
    "enabled": ["browser-use"]
  }
}
\`\`\`

### Step 5: Restart OpenClaw

\`\`\`bash
openclaw restart
\`\`\`

Verify the skill is loaded:

\`\`\`bash
openclaw skills list
# Should show: browser-use (active)
\`\`\`

---

## Practical Examples

### Example 1: Web Scraping

Scraping data from websites is one of the most common use cases. Here is how OpenClaw with Browser Use can extract product information:

\`\`\`bash
# Navigate to a product listing page
browser-use navigate "https://store.example.com/laptops"

# Extract structured data
browser-use extract "all product names, prices, and ratings as JSON"

# Save results to a file
browser-use extract "all product names and prices" --output /tmp/laptops.json
\`\`\`

For more complex scraping that requires pagination:

\`\`\`python
# skills/browser-use/scraper.py
from browser_use import Agent

async def scrape_with_pagination(url: str, max_pages: int = 5):
    agent = Agent(
        task=f"Go to {url}, extract all product names and prices. "
             f"Click 'Next' to go through up to {max_pages} pages. "
             f"Return all results as a JSON array.",
        llm=openai_llm,  # or any compatible LLM
    )
    result = await agent.run()
    return result
\`\`\`

### Example 2: Form Filling

Automating form submissions saves hours of manual data entry:

\`\`\`bash
# Navigate to a registration form
browser-use navigate "https://conference.example.com/register"

# Fill in the form fields
browser-use type "First Name field" "Jane"
browser-use type "Last Name field" "Smith"
browser-use type "Email field" "jane.smith@company.com"
browser-use type "Company field" "Acme Corp"

# Select a dropdown option
browser-use click "Role dropdown"
browser-use click "Engineering Manager option"

# Submit the form
browser-use click "Register button"

# Verify success
browser-use extract "confirmation message"
\`\`\`

For batch form filling from a data source:

\`\`\`python
# skills/browser-use/batch_forms.py
import json
from browser_use import Agent

async def batch_fill_forms(data_file: str, form_url: str):
    with open(data_file) as f:
        records = json.load(f)

    results = []
    for record in records:
        agent = Agent(
            task=f"Go to {form_url}. Fill the form with this data: "
                 f"Name: {record['name']}, Email: {record['email']}, "
                 f"Phone: {record['phone']}. Click Submit. "
                 f"Report whether submission succeeded or failed.",
            llm=openai_llm,
        )
        result = await agent.run()
        results.append({"record": record, "status": result})
    return results
\`\`\`

### Example 3: Screenshot Capture

Taking screenshots is useful for monitoring, documentation, and visual regression testing:

\`\`\`bash
# Full page screenshot
browser-use navigate "https://dashboard.example.com"
browser-use screenshot --output /tmp/dashboard.png

# Screenshot of a specific element
browser-use screenshot --selector ".revenue-chart" --output /tmp/revenue.png

# Screenshot with a delay (wait for animations)
browser-use navigate "https://app.example.com/analytics"
browser-use wait 3000
browser-use screenshot --output /tmp/analytics.png
\`\`\`

### Example 4: PDF Generation

Convert any web page to a PDF document:

\`\`\`bash
# Generate PDF from a web page
browser-use navigate "https://invoice.example.com/inv-2026-001"
browser-use pdf --output /tmp/invoice-2026-001.pdf

# PDF with custom options
browser-use pdf --output /tmp/report.pdf --format A4 --landscape true --margin "20mm"
\`\`\`

---

## Advanced: Multi-Tab, Authentication, and Dynamic Content

### Working with Multiple Tabs

Some workflows require interacting with multiple pages simultaneously --- for example, comparing prices across different stores:

\`\`\`python
# skills/browser-use/multi_tab.py
from browser_use import Agent

async def compare_prices(product: str):
    agent = Agent(
        task=f"Open Amazon.com in one tab and search for '{product}'. "
             f"Note the top 3 prices. Then open a new tab, go to BestBuy.com, "
             f"search for the same product, and note the top 3 prices. "
             f"Compare and return a summary table of prices from both stores.",
        llm=openai_llm,
    )
    result = await agent.run()
    return result
\`\`\`

### Handling Authentication

Many real-world tasks require logging into websites first. Browser Use supports persistent browser profiles to maintain login sessions:

\`\`\`bash
# Configure a persistent browser profile (login state is preserved)
browser-use config set user-data-dir "~/.browser-use/profile"

# First time: log in manually or via automation
browser-use navigate "https://app.example.com/login"
browser-use type "email input" "user@example.com"
browser-use type "password input" "your-password"
browser-use click "Sign in button"

# Subsequent runs: session is already authenticated
browser-use navigate "https://app.example.com/dashboard"
browser-use extract "account balance"
\`\`\`

For sites that require two-factor authentication, you can configure Browser Use to pause and wait for manual input:

\`\`\`json
{
  "skills": {
    "browser-use": {
      "auth": {
        "pauseOn2FA": true,
        "timeoutSeconds": 120
      }
    }
  }
}
\`\`\`

### Handling Dynamic Content

Modern web applications load content dynamically with JavaScript. Browser Use handles this automatically because it runs a real browser, but you may need to add explicit waits for content that loads asynchronously:

\`\`\`python
# skills/browser-use/dynamic_content.py
from browser_use import Agent

async def extract_dynamic_data(url: str):
    agent = Agent(
        task=f"Go to {url}. Wait for the data table to fully load "
             f"(it may take a few seconds for the spinner to disappear). "
             f"Once loaded, extract all rows from the table as JSON. "
             f"If there is an 'Load More' button, click it and wait for "
             f"additional rows to appear. Repeat until all data is loaded.",
        llm=openai_llm,
    )
    result = await agent.run()
    return result
\`\`\`

### Proxy and Stealth Configuration

To avoid bot detection, configure Browser Use with proxy support and stealth mode:

\`\`\`bash
# Set up an HTTP proxy
browser-use config set proxy "http://127.0.0.1:7890"

# Enable headless mode (no visible browser window)
browser-use config set headless true

# Configure action delays to mimic human behavior
browser-use config set action-delay-ms 500
\`\`\`

### Security Configuration

Always configure domain restrictions and action guards for production deployments:

\`\`\`json
{
  "skills": {
    "browser-use": {
      "allowedDomains": ["*.company.com", "*.github.com", "*.google.com"],
      "blockedActions": ["delete", "remove", "cancel-subscription"],
      "requireConfirmation": ["checkout", "payment", "submit-application"],
      "maxConcurrentTabs": 5,
      "timeoutMs": 60000
    }
  }
}
\`\`\`

---

## Browser Use vs Alternatives

| Solution | Strengths | Weaknesses |
|----------|-----------|------------|
| **Browser Use** | Open source, AI-driven natural language control | Requires self-hosting |
| **OpenAI Operator** | Integrated with ChatGPT Plus | Limited to ChatGPT ecosystem, restricted actions |
| **Browserbase** | Cloud-hosted, no setup | Pay-per-use pricing adds up |
| **Selenium / Puppeteer** | Mature, well-documented | Requires manual CSS selector coding, brittle |

Browser Use stands out because it combines the power of a real browser engine (Playwright) with AI-driven natural language instructions. You do not need to write CSS selectors that break every time a website updates its layout.

---

## Frequently Asked Questions

### Q1: What is the difference between Browser Use and Selenium?

The fundamental difference is the interface. Selenium requires you to write explicit code with CSS selectors, XPaths, and manual wait conditions. When a website changes its HTML structure, your selectors break and you have to update them manually. Browser Use uses AI to interpret natural language descriptions of elements ("the blue Submit button" or "the email input field"), making it adaptive to layout changes. The trade-off is that Browser Use requires an LLM for each action, which adds latency and cost compared to Selenium's deterministic approach.

### Q2: How do I handle websites that detect and block automated browsers?

Several strategies help avoid detection: (1) Use a persistent browser profile with \`user-data-dir\` so the browser has cookies and history like a real user. (2) Enable stealth mode in the Playwright configuration. (3) Add random delays between actions using \`action-delay-ms\`. (4) Use residential proxies instead of datacenter IPs. (5) Consider Browser Use Cloud, the official managed service, which handles anti-bot measures for you.

### Q3: Can Browser Use handle file uploads and downloads?

Yes. Playwright supports file uploads through the file chooser API, and Browser Use exposes this capability. For downloads, configure a download directory and Browser Use will wait for the download to complete before proceeding:

\`\`\`bash
browser-use config set download-dir "~/.browser-use/downloads"
browser-use navigate "https://reports.example.com"
browser-use click "Download Report button"
# File will be saved to ~/.browser-use/downloads/
\`\`\`

### Q4: How much does it cost to run Browser Use with OpenClaw?

Browser Use itself is free and open source. The costs come from two sources: (1) The LLM API calls --- each browser action requires an LLM call to interpret the instruction, so a 10-step workflow might cost $0.01-0.05 depending on the model. (2) Server resources --- running a headless Chromium browser requires approximately 200-500MB of RAM per instance. For most personal and small-team use cases, the total cost is negligible. For high-volume enterprise scraping, consider batching actions to reduce LLM calls and running multiple browser instances in parallel on a dedicated server.

---

## Summary

Browser Use combined with OpenClaw creates one of the most powerful browser automation solutions available today:

- **AI-driven**: Control browsers with plain English or any natural language --- no CSS selectors or XPaths required
- **Fully open source**: Both Browser Use and OpenClaw are open source with transparent codebases
- **Highly customizable**: Build custom skills for any website workflow, from simple scraping to complex multi-step transactions
- **Self-hosted and private**: All data stays on your infrastructure; no third-party cloud required
- **Production-ready**: Domain restrictions, action guards, authentication support, and proxy configuration make it suitable for enterprise use

Whether you need to scrape product data, automate form submissions, generate PDF reports from web pages, or monitor websites for changes, the Browser Use + OpenClaw combination handles it all from a single, unified AI assistant.`,
    author: "Marco Liu",
    date: "2026-04-01",
    category: "集成教程",
    categoryEn: "Integration",
    tags: ["browser-use", "automation", "playwright", "web-scraping", "浏览器自动化"],
    readingTime: 18,
    image: "/og-image.png"
  },
  {
    id: 18,
    slug: "openclaw-n8n-automation",
    title: "OpenClaw + n8n：构建自动化工作流的终极组合",
    titleEn: "OpenClaw + n8n: The Ultimate Automation Workflow Combo",
    excerpt: "n8n 是 2026 年最受欢迎的工作流自动化平台，150,000+ GitHub Stars。本文教你如何将其与 OpenClaw 集成，实现从 AI 对话到自动化执行的完整闭环。",
    excerptEn: "n8n is the most popular workflow automation platform of 2026, with 150,000+ GitHub Stars. Learn how to integrate it with OpenClaw to achieve a complete loop from AI conversation to automated execution.",
    content: `n8n 是一个开源的工作流自动化平台，被誉为 "AI Agent 的 Action Layer"。它让你可以用可视化的方式连接各种服务和应用。

2026 年，n8n GitHub Stars 突破 150,000，成为自动化领域的绝对王者。

## 什么是 n8n？为什么要和 OpenClaw 一起用？

n8n（发音为 "n-eight-n"）是一个基于节点的工作流自动化工具。与 Zapier 或 Make 等 SaaS 产品不同，n8n 完全开源，支持自托管，让你完全掌控数据流向。它内置 400+ 集成节点，涵盖邮件、Slack、数据库、HTTP 请求、文件操作等。

OpenClaw 是强大的 AI Agent 平台，但其核心能力集中在对话理解和任务执行。将 n8n 作为 OpenClaw 的"执行引擎"，你可以实现：

- 用自然语言描述需求，AI 自动编排工作流
- 将 AI 分析结果自动分发到各个系统
- 建立事件驱动的自动化管道

| 能力 | OpenClaw 单独 | n8n 单独 | 组合后 |
|------|--------------|---------|--------|
| AI 对话 | ✅ | ❌ | ✅ |
| 工作流编排 | ⚠️ 有限 | ✅ | ✅ |
| 多应用连接 | ❌ | ✅ | ✅ |
| 自然语言触发 | ✅ | ❌ | ✅ |
| 定时执行 | ⚠️ 有限 | ✅ | ✅ |
| 可视化设计 | ❌ | ✅ | ✅ |
| 错误重试与日志 | ❌ | ✅ | ✅ |

**组合效果**：用自然语言告诉 AI 你想做什么，AI 自动调用 n8n 工作流完成。

## 详细安装与配置指南

### 第一步：安装 n8n

\`\`\`bash
# 安装 n8n（全局安装）
npm install -g n8n

# 启动 n8n
n8n start

# 或者使用 Docker（推荐生产环境）
docker run -d --name n8n -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n
\`\`\`

安装完成后，访问 \`http://localhost:5678\` 即可打开 n8n 的可视化界面。

### 第二步：配置 OpenClaw Webhook

\`\`\`bash
# 配置 OpenClaw 与 n8n 的 Webhook 连接
openclaw config set webhook.url http://localhost:5678/webhook/openclaw
openclaw config set webhook.events "message,task_complete"

# 验证连接
openclaw webhook test
\`\`\`

### 第三步：创建 n8n 技能

在 OpenClaw 中创建 n8n 集成技能：

\`\`\`bash
mkdir -p ~/.openclaw/skills/n8n
\`\`\`

创建 \`~/.openclaw/skills/n8n/SKILL.md\`：

\`\`\`markdown
---
name: n8n-workflow
description: Trigger and manage n8n workflows via natural language
tools:
  - http
---

# n8n Workflow Skill

Trigger n8n workflows by sending HTTP requests to webhook endpoints.

## Usage

- "运行每日报告工作流"
- "触发数据同步"
- "发送通知到 Slack"
\`\`\`

### 第四步：配置环境变量

\`\`\`bash
# 设置 n8n API 密钥（用于高级操作）
export N8N_API_KEY="your-n8n-api-key"

# 在 OpenClaw 配置中引用
openclaw config set n8n.apiKey \${N8N_API_KEY}
openclaw config set n8n.baseUrl "http://localhost:5678"
\`\`\`

## 实战案例

### 案例 1：邮件自动化——每日新闻摘要

这个工作流会自动获取新闻、用 AI 总结，然后发送到你的邮箱。

\`\`\`
用户: "发送今天的科技新闻摘要到我的邮箱"
OpenClaw → 解析意图 → 调用 n8n Webhook
n8n: Webhook触发 → RSS获取新闻 → OpenClaw AI总结 → 发送邮件
\`\`\`

在 n8n 中配置：

1. **Webhook 节点**：接收 OpenClaw 的触发请求
2. **RSS Feed 节点**：从 TechCrunch、Hacker News 等获取新闻
3. **HTTP Request 节点**：调用 OpenClaw API 生成摘要
4. **Send Email 节点**：将摘要发送到指定邮箱

\`\`\`bash
# 测试邮件工作流
openclaw run "发送今天的科技新闻到 user@example.com"
\`\`\`

### 案例 2：数据同步——Google Sheets 到 Notion

自动将 Google Sheets 中的数据同步到 Notion 数据库。

\`\`\`
用户: "同步销售数据到 Notion"
OpenClaw → n8n → 读取 Google Sheets → 转换格式 → 写入 Notion
\`\`\`

在 n8n 中配置：

1. **Schedule Trigger**：每小时执行一次
2. **Google Sheets 节点**：读取指定表格数据
3. **Function 节点**：数据清洗与格式转换
4. **Notion 节点**：创建或更新 Notion 页面

### 案例 3：系统监控与告警

监控服务器状态，出现异常时自动通知团队。

\`\`\`
OpenClaw 定时检查 → 发现异常 → 触发 n8n
n8n: 发送 Slack 告警 + 创建 Jira 工单 + 发送短信通知
\`\`\`

\`\`\`bash
# 配置监控工作流
openclaw config set monitor.interval "5m"
openclaw config set monitor.webhook "http://localhost:5678/webhook/alert"
openclaw config set monitor.targets "https://api.example.com/health"
\`\`\`

### 案例 4：客户服务自动化

用 OpenClaw 处理客户问题，n8n 自动创建工单和跟进。

\`\`\`
客户消息 → OpenClaw 理解意图 → 分类优先级
→ n8n: 创建 Zendesk 工单 + 分配给对应团队 + 自动回复确认
\`\`\`

## 高级配置

### 错误处理与重试

\`\`\`bash
# 配置重试策略
openclaw config set n8n.retryCount 3
openclaw config set n8n.retryDelay "5s"
openclaw config set n8n.timeout "30s"
\`\`\`

### 多工作流编排

\`\`\`bash
# 注册多个工作流
openclaw config set n8n.workflows.report "http://localhost:5678/webhook/daily-report"
openclaw config set n8n.workflows.sync "http://localhost:5678/webhook/data-sync"
openclaw config set n8n.workflows.alert "http://localhost:5678/webhook/alert"
\`\`\`

## 排障指南

### 常见问题排查

**问题 1：Webhook 连接失败**

\`\`\`bash
# 检查 n8n 是否正在运行
curl -s http://localhost:5678/healthz

# 检查 Webhook 是否已激活
# 在 n8n 界面中，确保工作流状态为 "Active"

# 查看 OpenClaw 日志
openclaw logs --filter webhook
\`\`\`

**问题 2：工作流执行超时**

\`\`\`bash
# 增加超时时间
openclaw config set n8n.timeout "60s"

# 检查 n8n 执行历史
# 在 n8n 界面 → Executions 查看失败记录
\`\`\`

**问题 3：数据格式不匹配**

确保 OpenClaw 发送的 JSON 格式与 n8n Webhook 节点期望的格式一致。可以在 n8n 中添加 Function 节点进行数据转换。

## 常见问题 FAQ

**Q1: n8n 和 Zapier 有什么区别？我应该选哪个？**

n8n 是开源自托管的，数据完全在你的控制下，没有执行次数限制。Zapier 是 SaaS 服务，更易上手但有使用限额且数据经过第三方服务器。如果你重视数据隐私和无限制执行，选 n8n。

**Q2: n8n 需要多少服务器资源？**

n8n 非常轻量。最低需求为 1 核 CPU、1GB 内存。对于中等负载（每天数百个工作流执行），建议 2 核 CPU、4GB 内存。使用 Docker 部署最方便。

**Q3: OpenClaw 可以同时触发多个 n8n 工作流吗？**

可以。通过配置多个 Webhook URL，OpenClaw 可以根据不同的意图触发不同的工作流。你也可以使用 n8n 的子工作流功能，在一个主工作流中编排多个子流程。

**Q4: 如何确保 Webhook 的安全性？**

建议在 n8n Webhook 中启用 Header Auth 验证，并在 OpenClaw 配置中设置对应的认证头。还可以通过限制 IP 白名单来增强安全性。

## 总结

**OpenClaw + n8n = 自然语言 + 自动化执行**

- 🗣️ 用人话控制复杂工作流
- 🔗 连接 400+ 应用和服务
- 📊 可视化设计，无需编程
- 🔐 完全自托管，数据安全
- ⚡ 事件驱动，实时响应
- 🔄 内置重试机制，稳定可靠

这个组合让你真正实现了"对话即自动化"的愿景——只需告诉 AI 你想做什么，剩下的交给 n8n。`,
    contentEn: `n8n is an open-source workflow automation platform, known as the "Action Layer for AI Agents". It lets you connect various services and applications visually.

In 2026, n8n GitHub Stars exceeded 150,000, becoming the absolute king in the automation field.

## What Is n8n and Why Use It with OpenClaw?

n8n (pronounced "n-eight-n") is a node-based workflow automation tool. Unlike SaaS products such as Zapier or Make, n8n is fully open-source and self-hostable, giving you complete control over your data flow. It ships with 400+ built-in integration nodes covering email, Slack, databases, HTTP requests, file operations, and much more.

OpenClaw is a powerful AI Agent platform, but its core strengths are conversational understanding and task execution. By using n8n as OpenClaw's "execution engine", you can achieve:

- Describe requirements in natural language, and AI automatically orchestrates workflows
- Automatically distribute AI analysis results to various systems
- Build event-driven automation pipelines

| Capability | OpenClaw Alone | n8n Alone | Combined |
|------------|----------------|-----------|----------|
| AI Chat | ✅ | ❌ | ✅ |
| Workflow Orchestration | ⚠️ Limited | ✅ | ✅ |
| Multi-app Connection | ❌ | ✅ | ✅ |
| Natural Language Trigger | ✅ | ❌ | ✅ |
| Scheduled Execution | ⚠️ Limited | ✅ | ✅ |
| Visual Design | ❌ | ✅ | ✅ |
| Error Retry & Logging | ❌ | ✅ | ✅ |

**Combined Effect**: Tell AI what you want in natural language, and AI automatically calls n8n workflows to get it done.

## Step-by-Step Setup Guide

### Step 1: Install n8n

\`\`\`bash
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start

# Or use Docker (recommended for production)
docker run -d --name n8n -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n
\`\`\`

Once installed, open \`http://localhost:5678\` in your browser to access the n8n visual editor.

### Step 2: Configure the OpenClaw Webhook

\`\`\`bash
# Configure OpenClaw webhook for n8n
openclaw config set webhook.url http://localhost:5678/webhook/openclaw
openclaw config set webhook.events "message,task_complete"

# Verify the connection
openclaw webhook test
\`\`\`

### Step 3: Create the n8n Skill in OpenClaw

Create an n8n integration skill inside OpenClaw:

\`\`\`bash
mkdir -p ~/.openclaw/skills/n8n
\`\`\`

Create \`~/.openclaw/skills/n8n/SKILL.md\`:

\`\`\`markdown
---
name: n8n-workflow
description: Trigger and manage n8n workflows via natural language
tools:
  - http
---

# n8n Workflow Skill

Trigger n8n workflows by sending HTTP requests to webhook endpoints.

## Usage

- "Run the daily report workflow"
- "Trigger data sync"
- "Send notification to Slack"
\`\`\`

### Step 4: Set Up Environment Variables

\`\`\`bash
# Set your n8n API key for advanced operations
export N8N_API_KEY="your-n8n-api-key"

# Reference it in the OpenClaw config
openclaw config set n8n.apiKey \${N8N_API_KEY}
openclaw config set n8n.baseUrl "http://localhost:5678"
\`\`\`

## Practical Workflow Examples

### Example 1: Email Automation — Daily News Digest

This workflow automatically fetches news, summarizes it with AI, and sends it to your inbox.

\`\`\`
User: "Send me today's tech news digest"
OpenClaw → Parse intent → Call n8n Webhook
n8n: Webhook trigger → RSS fetch news → OpenClaw AI summary → Send email
\`\`\`

Configure in n8n:

1. **Webhook node**: Receive the trigger request from OpenClaw
2. **RSS Feed node**: Pull articles from TechCrunch, Hacker News, etc.
3. **HTTP Request node**: Call the OpenClaw API to generate a summary
4. **Send Email node**: Deliver the summary to a specified address

\`\`\`bash
# Test the email workflow
openclaw run "Send today's tech news to user@example.com"
\`\`\`

### Example 2: Data Sync — Google Sheets to Notion

Automatically synchronize data from Google Sheets into a Notion database.

\`\`\`
User: "Sync sales data to Notion"
OpenClaw → n8n → Read Google Sheets → Transform format → Write to Notion
\`\`\`

Configure in n8n:

1. **Schedule Trigger**: Run every hour
2. **Google Sheets node**: Read data from the specified spreadsheet
3. **Function node**: Clean and transform the data
4. **Notion node**: Create or update Notion pages

### Example 3: System Monitoring and Alerting

Monitor server health and automatically notify the team when anomalies are detected.

\`\`\`
OpenClaw scheduled check → Anomaly detected → Trigger n8n
n8n: Send Slack alert + Create Jira ticket + Send SMS notification
\`\`\`

\`\`\`bash
# Configure the monitoring workflow
openclaw config set monitor.interval "5m"
openclaw config set monitor.webhook "http://localhost:5678/webhook/alert"
openclaw config set monitor.targets "https://api.example.com/health"
\`\`\`

### Example 4: Customer Service Automation

Use OpenClaw to process customer issues while n8n automatically creates tickets and follow-ups.

\`\`\`
Customer message → OpenClaw understands intent → Classifies priority
→ n8n: Create Zendesk ticket + Assign to team + Auto-reply confirmation
\`\`\`

## Advanced Configuration

### Error Handling and Retries

\`\`\`bash
# Configure retry strategy
openclaw config set n8n.retryCount 3
openclaw config set n8n.retryDelay "5s"
openclaw config set n8n.timeout "30s"
\`\`\`

### Multi-Workflow Orchestration

\`\`\`bash
# Register multiple workflows
openclaw config set n8n.workflows.report "http://localhost:5678/webhook/daily-report"
openclaw config set n8n.workflows.sync "http://localhost:5678/webhook/data-sync"
openclaw config set n8n.workflows.alert "http://localhost:5678/webhook/alert"
\`\`\`

## Troubleshooting Tips

### Common Issues

**Issue 1: Webhook Connection Failure**

\`\`\`bash
# Check whether n8n is running
curl -s http://localhost:5678/healthz

# Ensure the workflow is active in the n8n UI (Status: "Active")

# View OpenClaw logs
openclaw logs --filter webhook
\`\`\`

**Issue 2: Workflow Execution Timeout**

\`\`\`bash
# Increase the timeout
openclaw config set n8n.timeout "60s"

# Check n8n execution history
# In the n8n UI → Executions to review failed runs
\`\`\`

**Issue 3: Data Format Mismatch**

Make sure the JSON payload sent by OpenClaw matches what the n8n Webhook node expects. Add a Function node in n8n to transform data if needed.

## Frequently Asked Questions

**Q1: What is the difference between n8n and Zapier? Which should I choose?**

n8n is open-source and self-hosted, so your data stays entirely under your control with no execution limits. Zapier is a SaaS service that is easier to get started with but has usage caps and routes data through third-party servers. If you prioritize data privacy and unlimited executions, go with n8n.

**Q2: How many server resources does n8n require?**

n8n is very lightweight. The minimum requirements are 1 CPU core and 1 GB RAM. For moderate workloads (hundreds of workflow executions per day), 2 CPU cores and 4 GB RAM are recommended. Docker deployment is the easiest option.

**Q3: Can OpenClaw trigger multiple n8n workflows at the same time?**

Yes. By configuring multiple Webhook URLs, OpenClaw can trigger different workflows based on different intents. You can also use n8n's sub-workflow feature to orchestrate multiple sub-processes within a single master workflow.

**Q4: How do I secure the Webhook endpoint?**

Enable Header Auth on the n8n Webhook node and configure the corresponding authentication header in OpenClaw. You can also restrict access by IP whitelist for additional security.

## Summary

**OpenClaw + n8n = Natural Language + Automation**

- Control complex workflows with human language
- Connect 400+ apps and services
- Visual design, no coding required
- Fully self-hosted, data secure
- Event-driven, real-time response
- Built-in retry mechanisms for reliability

This combination truly delivers the vision of "conversation as automation" — just tell the AI what you want, and let n8n handle the rest.`,
    author: "Marco Liu",
    date: "2026-04-01",
    category: "集成教程",
    categoryEn: "Integration",
    tags: ["n8n", "automation", "workflow", "integration", "自动化工作流"],
    readingTime: 20,
    image: "/og-image.png"
  },
  {
    id: 19,
    slug: "openclaw-qq-bot-native-integration",
    title: "OpenClaw QQ 机器人接入完整指南（2026 v2026.3.31 原生支持）",
    titleEn: "OpenClaw QQ Bot 2026 — Native Integration Setup (3-Step Deploy + 5 Tips)",
    excerpt: "OpenClaw 原生支持 QQ Bot 和 QQ Channel 接入。本文给出 BotFather 注册、Token 配置、Channel 权限、插件安装的完整 3 步部署流程，附常见报错。",
    excerptEn: "Native QQ Bot integration in OpenClaw v2026.3.31. 3-step deploy guide with BotFather setup, permission scopes, plugin install, and 5 production tips.",
    content: `4 月 1 日凌晨，OpenClaw 正式发布 v2026.3.31 版本。此次更新最大的亮点是：**原生内置 QQ 机器人（QQ Bot）官方插件**，QQ 成为国内首个被 OpenClaw 官方原生接入的社交平台。

腾讯轻量云协同 QQ 团队贡献的 QQ Bot 代码已正式合入 OpenClaw 主仓库，OpenClaw 创始人 Peter Steinberger 也公开点赞了这一里程碑事件。

## 什么是 QQ Bot？为什么它很重要？

QQ 是中国最大的即时通讯平台之一，月活跃用户超过 5.7 亿。尽管微信在日常社交中占据主导地位，QQ 在年轻用户群体（尤其是学生和游戏玩家）、技术社区和企业协作场景中仍然拥有不可替代的地位。QQ 群聊是许多开源项目、技术交流和兴趣社区的核心聚集地。

QQ Bot 是腾讯官方提供的机器人开放平台，允许开发者创建自动化的 QQ 机器人，用于消息处理、内容分发、社区管理等场景。2025 年底，腾讯全面升级了 QQ Bot 开放平台，提供了更稳定的 API、更丰富的权限体系和更完善的审核流程。

对于 AI Agent 生态来说，QQ Bot 的意义在于：它是触达中国数亿用户的最直接通道之一。如果你的 AI 助手只能在 Telegram 或 Discord 上运行，那你就错过了中国最大的潜在用户群。

## 为什么这次更新意义重大？

在此前的版本中，开发者要将 OpenClaw 智能体接入 QQ 等国内社交平台，通常需要借助第三方桥接工具（如 go-cqhttp 等），配置复杂且稳定性难以保证。第三方桥接工具存在以下问题：

- **协议风险**：非官方协议随时可能被封禁
- **维护断档**：go-cqhttp 等项目已经停止维护
- **安全隐患**：需要提供 QQ 账号密码，存在泄露风险
- **功能受限**：无法使用 QQ Bot 平台的全部官方能力

本次原生集成意味着：

- **官方维护**：插件代码由腾讯 QQ 团队贡献并持续维护
- **零外部依赖**：无需安装任何第三方桥接工具
- **开箱即用**：安装 OpenClaw 后直接可用
- **合规安全**：使用官方 API，无协议风险

## 核心功能一览

| 功能 | 支持情况 |
|------|---------|
| 私聊消息 | ✅ 完整支持 |
| 群聊消息 | ✅ 完整支持 |
| 频道消息 | ✅ 完整支持 |
| 多媒体收发（图片/音频/视频） | ✅ 完整支持 |
| 多账号管理 | ✅ |
| 凭证管理（SecretRef） | ✅ |
| Slash 命令 | ✅ |
| 定时提醒 | ✅ |
| Markdown 消息 | ✅ |
| 按钮交互（Keyboard） | ✅ |

## 详细部署指南

### 第一步：注册 QQ Bot

1. 访问 [QQ 开放平台](https://q.qq.com)，使用 QQ 号登录
2. 点击"创建机器人"，填写机器人名称和简介
3. 选择机器人类型（建议选择"频道机器人 + 群聊机器人"以获得最大覆盖）
4. 提交审核（通常 1-3 个工作日通过）
5. 审核通过后，在"开发设置"中获取 **AppID**、**Token** 和 **AppSecret**

### 第二步：初始化 OpenClaw

\`\`\`bash
# 安装或升级到最新版本
npm install -g openclaw@latest

# 初始化项目
openclaw init
# 在交互式菜单中选择 "QQ Bot" 作为渠道
\`\`\`

### 第三步：配置凭证并启动

\`\`\`bash
# 配置 QQ Bot 凭证
openclaw config set gateway.qq.appId YOUR_APP_ID
openclaw config set gateway.qq.token YOUR_TOKEN
openclaw config set gateway.qq.appSecret YOUR_APP_SECRET

# 可选：配置沙箱模式（开发阶段建议开启）
openclaw config set gateway.qq.sandbox true

# 启动
openclaw start
\`\`\`

如果使用腾讯云 Lighthouse，只需将 Key 复制粘贴到部署配置中即可。

### 验证部署

启动后，在 QQ 中找到你的机器人，发送任意消息，如果收到 AI 回复即表示部署成功。

\`\`\`bash
# 查看日志确认连接状态
openclaw logs --filter qq

# 预期输出：
# [QQ Gateway] Connected to QQ Bot API
# [QQ Gateway] Bot is ready: YourBotName#1234
\`\`\`

## 与 Telegram 集成的功能对比

| 功能 | QQ Bot | Telegram Bot |
|------|--------|-------------|
| 私聊 | ✅ | ✅ |
| 群聊 | ✅ | ✅ |
| 频道/Channel | ✅ | ✅ |
| 图片收发 | ✅ | ✅ |
| 音频收发 | ✅ | ✅ |
| 视频收发 | ✅ | ✅ |
| 文件传输 | ✅ | ✅ |
| 内联键盘/按钮 | ✅ | ✅ |
| Slash 命令 | ✅ | ✅ |
| Webhook 模式 | ✅ | ✅ |
| Markdown 消息 | ✅（QQ 定制格式） | ✅ |
| 内联查询 | ❌ | ✅ |
| 支付集成 | ❌（QQ 钱包独立） | ✅ |
| Mini App | ❌（计划中） | ✅ |
| 免审核部署 | ❌（需审核） | ✅ |

两个平台在核心消息能力上基本对等。QQ Bot 的审核流程是最大差异——Telegram 可以即时创建和使用 Bot，而 QQ Bot 需要经过腾讯的审核。

## 使用场景

### 场景 1：技术社区 AI 助手

在 QQ 技术群中部署 AI 助手，自动回答常见技术问题、搜索文档、总结群聊内容。

\`\`\`yaml
skills:
  - qa-assistant:
      knowledge_base: "./docs"
      model: gpt-4
      language: zh-CN
      trigger: "@bot"
\`\`\`

### 场景 2：学习辅导 Bot

针对 QQ 上大量的学生群体，搭建学科辅导 Bot，支持数学解题、英语翻译、作文批改。

### 场景 3：游戏社区管理

QQ 是游戏社区的核心平台。用 OpenClaw Bot 实现入群审核、违规检测、活动通知、战绩查询等自动化管理。

### 场景 4：企业内部协作

在 QQ 工作群中部署 AI 助手，处理日报汇总、会议纪要、任务分配等日常协作需求。

## 已知限制

- **审核周期**：新机器人需要 1-3 个工作日审核，重大功能变更可能需要重新审核
- **消息频率限制**：QQ Bot 平台对消息发送频率有限制，高并发场景需注意
- **富媒体格式差异**：QQ 的 Markdown 渲染与标准 Markdown 略有不同，部分高级格式可能不兼容
- **地域限制**：QQ Bot 开放平台仅面向中国大陆开发者，需要实名认证
- **内联查询不支持**：QQ Bot 目前不支持类似 Telegram Inline Mode 的功能

## 与传统 AI 工具的区别

传统 AI 工具的使用方式：打开 App → 输入问题 → 获取回答 → 回到工作场景。

OpenClaw + QQ Bot 的方式：**直接在 QQ 对话中完成一切**。这种嵌入式能力意味着 AI 不再是一个需要切换的工具，而是融入你日常沟通场景的"数字同事"。

## 更深远的影响

据接近腾讯内部的消息人士透露，QQ 内的社区产品——腾讯频道正在秘密内测"AI 开放计划"，核心操作将交由 OpenClaw 接管，实现从自动创建社区、自动化管理到内容生成与引流的全链路闭环。

这标志着 AI Agent 正在从"工具"向"基础设施"演进。

## 常见问题

### QQ Bot 和 QQ 频道 Bot 有什么区别？

QQ Bot 是一个统一的概念，覆盖私聊、群聊和频道三种场景。在 QQ 开放平台注册一个机器人后，你可以选择开启哪些场景的权限。频道 Bot 是 QQ Bot 在频道场景下的具体应用。OpenClaw 的原生集成同时覆盖了所有三种场景。

### 我需要一台服务器才能运行 QQ Bot 吗？

是的，和 Telegram Bot 一样，QQ Bot 需要一个持续运行的服务端程序来处理消息。推荐使用腾讯云 Lighthouse（轻量应用服务器），最低配置约 50 元/月，部署流程最简单。也可以使用任何其他云服务商的 VPS。

### 一个 OpenClaw 实例可以同时连接 QQ 和 Telegram 吗？

可以。OpenClaw 原生支持多平台网关，你可以在同一个配置文件中同时配置 QQ Bot 和 Telegram Bot，共享同一套 AI 技能和工作流。用户在两个平台上获得一致的体验。

### QQ Bot 的消息是否经过 OpenClaw 的服务器？

不会。OpenClaw 是完全自托管的，QQ Bot 的消息从腾讯服务器直接到达你部署 OpenClaw 的服务器，再由你的服务器调用 LLM API 处理。你的数据始终在你的控制之下。

## 总结

OpenClaw v2026.3.31 的 QQ Bot 原生集成，不仅仅是一个技术更新，更是 AI Agent 融入国内社交生态的标志性事件：

- 🎯 **国内首个**：QQ 是首个被 OpenClaw 官方原生支持的国内社交平台
- ⚡ **三步部署**：极简配置，零门槛使用
- 🔌 **全场景覆盖**：私聊、群聊、频道一网打尽
- 🎬 **富媒体支持**：图片、音频、视频全量支持

想试试在 QQ 里和你的 AI 助手聊天吗？现在就升级到最新版本吧！`,
    contentEn: `On April 1st, OpenClaw officially released v2026.3.31. The biggest highlight: **native QQ Bot plugin built-in**, making QQ the first social platform in China to be officially integrated into OpenClaw.

The QQ Bot code, contributed by Tencent Lighthouse team in collaboration with the QQ team, has been merged into the OpenClaw main repository. OpenClaw founder Peter Steinberger publicly endorsed this milestone.

## What Is QQ Bot and Why Does It Matter?

QQ is one of the largest instant messaging platforms in China, with over 570 million monthly active users. While WeChat dominates everyday social communication, QQ holds an irreplaceable position among younger users (especially students and gamers), technical communities, and enterprise collaboration scenarios. QQ group chats are the core gathering place for many open-source projects, tech discussions, and interest-based communities.

QQ Bot is Tencent's official bot open platform that allows developers to create automated QQ bots for message handling, content distribution, community management, and more. In late 2025, Tencent overhauled the QQ Bot open platform with a more stable API, richer permission system, and improved review process.

For the AI Agent ecosystem, QQ Bot matters because it is one of the most direct channels to reach hundreds of millions of users in China. If your AI assistant only runs on Telegram or Discord, you are missing China's largest potential user base.

## Why This Update Matters

Previously, developers needed third-party bridging tools (such as go-cqhttp) to connect OpenClaw agents to Chinese social platforms like QQ. These third-party bridges had significant problems:

- **Protocol risk**: Unofficial protocols could be blocked at any time
- **Abandoned maintenance**: Projects like go-cqhttp have stopped receiving updates
- **Security concerns**: Required providing QQ account credentials, risking leaks
- **Limited features**: Could not access the full capabilities of the official QQ Bot platform

Native integration solves all of these:

- **Official maintenance**: Plugin code contributed and maintained by Tencent QQ team
- **Zero external dependencies**: No third-party bridge tools needed
- **Works out of the box**: Available immediately after OpenClaw installation
- **Compliance and security**: Uses official APIs with no protocol risk

## Core Features

| Feature | Support |
|---------|---------|
| Private chat | ✅ Full support |
| Group chat | ✅ Full support |
| Channel messages | ✅ Full support |
| Rich media (image/audio/video) | ✅ Full support |
| Multi-account management | ✅ |
| Credential management (SecretRef) | ✅ |
| Slash commands | ✅ |
| Scheduled reminders | ✅ |
| Markdown messages | ✅ |
| Button interactions (Keyboard) | ✅ |

## Step-by-Step Setup Guide

### Step 1: Register Your QQ Bot

1. Visit [QQ Open Platform](https://q.qq.com) and log in with your QQ account
2. Click "Create Bot" and fill in the bot name and description
3. Select bot type (recommended: "Channel Bot + Group Bot" for maximum coverage)
4. Submit for review (typically approved within 1-3 business days)
5. After approval, go to "Development Settings" to obtain your **AppID**, **Token**, and **AppSecret**

### Step 2: Initialize OpenClaw

\`\`\`bash
# Install or upgrade to the latest version
npm install -g openclaw@latest

# Initialize your project
openclaw init
# Select "QQ Bot" as your gateway in the interactive menu
\`\`\`

### Step 3: Configure Credentials and Start

\`\`\`bash
# Configure QQ Bot credentials
openclaw config set gateway.qq.appId YOUR_APP_ID
openclaw config set gateway.qq.token YOUR_TOKEN
openclaw config set gateway.qq.appSecret YOUR_APP_SECRET

# Optional: Enable sandbox mode (recommended during development)
openclaw config set gateway.qq.sandbox true

# Start
openclaw start
\`\`\`

If you are using Tencent Cloud Lighthouse, simply paste your keys into the deployment configuration.

### Verify Your Deployment

After starting, find your bot in QQ and send any message. If you receive an AI reply, deployment is successful.

\`\`\`bash
# Check logs to confirm connection status
openclaw logs --filter qq

# Expected output:
# [QQ Gateway] Connected to QQ Bot API
# [QQ Gateway] Bot is ready: YourBotName#1234
\`\`\`

## Feature Comparison with Telegram Integration

| Feature | QQ Bot | Telegram Bot |
|---------|--------|-------------|
| Private chat | ✅ | ✅ |
| Group chat | ✅ | ✅ |
| Channel | ✅ | ✅ |
| Image send/receive | ✅ | ✅ |
| Audio send/receive | ✅ | ✅ |
| Video send/receive | ✅ | ✅ |
| File transfer | ✅ | ✅ |
| Inline keyboard/buttons | ✅ | ✅ |
| Slash commands | ✅ | ✅ |
| Webhook mode | ✅ | ✅ |
| Markdown messages | ✅ (QQ custom format) | ✅ |
| Inline queries | ❌ | ✅ |
| Payment integration | ❌ (QQ Wallet is separate) | ✅ |
| Mini App | ❌ (planned) | ✅ |
| Deploy without review | ❌ (review required) | ✅ |

The two platforms are roughly equivalent in core messaging capabilities. The review process is the biggest difference — Telegram lets you create and use bots instantly, while QQ Bot requires Tencent's approval.

## Use Cases for QQ Bot

### Use Case 1: Tech Community AI Assistant

Deploy an AI assistant in QQ tech groups to automatically answer common technical questions, search documentation, and summarize group chat content.

\`\`\`yaml
skills:
  - qa-assistant:
      knowledge_base: "./docs"
      model: gpt-4
      language: zh-CN
      trigger: "@bot"
\`\`\`

### Use Case 2: Study Tutor Bot

With QQ's large student user base, build a tutoring bot that supports math problem-solving, English translation, and essay feedback.

### Use Case 3: Gaming Community Management

QQ is the core platform for gaming communities. Use an OpenClaw bot for join-request approval, rule violation detection, event notifications, and match history lookups.

### Use Case 4: Internal Enterprise Collaboration

Deploy an AI assistant in QQ work groups to handle daily report summaries, meeting notes, task assignments, and other collaboration needs.

## Limitations and Known Issues

- **Review period**: New bots require 1-3 business days for review. Major feature changes may trigger re-review.
- **Message rate limits**: The QQ Bot platform imposes rate limits on message sending. High-concurrency scenarios need careful handling.
- **Rich media format differences**: QQ's Markdown rendering differs slightly from standard Markdown. Some advanced formatting may not render correctly.
- **Regional restriction**: The QQ Bot open platform is only available to developers in mainland China and requires real-name verification.
- **No inline queries**: QQ Bot does not currently support functionality equivalent to Telegram's Inline Mode.

## How It Differs from Traditional AI Tools

Traditional AI tools: Open app → Enter question → Get answer → Return to workflow.

OpenClaw + QQ Bot: **Do everything directly in QQ conversations**. This embedded capability means AI is no longer a separate tool but a "digital colleague" integrated into your daily communication.

## The Bigger Picture

Sources close to Tencent suggest that QQ's community product — Tencent Channels — is secretly beta-testing an "AI Open Plan," with core operations to be managed by OpenClaw, enabling a full closed loop from automated community creation and management to content generation and user acquisition.

This signals that AI Agents are evolving from "tools" to "infrastructure."

## QQ Channel Support — what's different from QQ Bot

OpenClaw supports **both QQ Bot (group + DM) and QQ Channel (频道) out of the box**, through the same native integration. Channel support is part of the same \\\`@tencent-connect/openclaw-qqbot\\\` plugin — you don't install anything extra, you just flip a config flag.

Three things to know about QQ Channel specifically:

1. **Permission scope differs** — Channel requires the \\\`channel.read\\\` + \\\`channel.send\\\` scopes on Tencent's Open Platform. Enable them on the same bot registration page.
2. **Message routing is separate** — channel messages come in with a \\\`channel_id\\\` field; OpenClaw's skill config can route per-channel differently (staff-only, announcements, Q&A, etc.).
3. **Rate limits are higher in channels** — QQ relaxes per-second caps inside channels vs DMs, so channel-based deployments scale further.

To enable QQ Channel support in an existing OpenClaw QQ deployment, add this to \\\`config.yaml\\\`:

\`\`\`yaml
platform:
  qq:
    enabled: true
    bot_token: "\${QQ_BOT_TOKEN}"
    channel:
      enabled: true          # turn on QQ Channel
      scopes: [read, send]   # permission scopes
\`\`\`

Restart OpenClaw and your bot will receive channel messages alongside DMs.

## FAQ

### What is OpenClaw QQ Channel support (openclaw qq channel support 2026)?

OpenClaw natively supports QQ Channel (QQ 频道) via the same \\\`@tencent-connect/openclaw-qqbot\\\` plugin that handles QQ Bot. Enable it with one config flag; no extra install. Supported since OpenClaw v2026.3.31 and stable through 2026.

### What is the OpenClaw QQ Channel plugin (openclaw qq channel plugin 2026)?

The plugin is \\\`@tencent-connect/openclaw-qqbot\\\` — it ships with OpenClaw core and covers both QQ Bot (DM + group) and QQ Channel in a single install. You don't need a separate "channel plugin"; both modes are one package.

### What is the difference between QQ Bot and QQ Channel Bot?

QQ Bot is a unified concept covering three scenarios: private chat, group chat, and channels. After registering one bot on the QQ Open Platform, you can choose which scenarios to enable. Channel Bot is simply the QQ Bot applied to the channel scenario. OpenClaw's native integration covers all three scenarios simultaneously.

### Do I need a server to run a QQ Bot?

Yes, just like Telegram bots, QQ Bot requires a continuously running server-side program to process messages. Tencent Cloud Lighthouse (lightweight application server) is recommended at around 50 CNY/month with the simplest deployment process. You can also use a VPS from any other cloud provider.

### Can one OpenClaw instance connect to both QQ and Telegram at the same time?

Yes. OpenClaw natively supports multi-platform gateways. You can configure both QQ Bot and Telegram Bot in the same configuration file, sharing the same AI skills and workflows. Users on both platforms get a consistent experience.

### Does QQ Bot message data pass through OpenClaw's servers?

No. OpenClaw is entirely self-hosted. QQ Bot messages travel from Tencent's servers directly to the server where you have deployed OpenClaw, which then calls LLM APIs for processing. Your data always remains under your control.

## Summary

- **First in China**: QQ is the first natively supported Chinese social platform in OpenClaw
- **3-step deploy**: Minimal configuration, zero barrier to entry
- **Full coverage**: Private chat, group chat, and channels all supported
- **Rich media**: Images, audio, and video fully supported
- **Multi-platform ready**: Run QQ and Telegram bots from the same OpenClaw instance

Ready to chat with your AI assistant in QQ? Upgrade to the latest version now!

## Next Steps

- Want to add more channels? See [OpenClaw Supported Channels](/blog/openclaw-supported-channels) for the full platform list.
- Prefer Telegram first? Start with the [openclaw telegram tutorial](/blog/openclaw-telegram-tutorial).
- Need WhatsApp reach? Read the [openclaw whatsapp integration](/blog/openclaw-whatsapp-integration) guide.
- Broader config reference: [OpenClaw Configuration Guide](/blog/openclaw-configuration-guide).
`,
    author: "OpenClaw 101",
    date: "2026-04-02",
    category: "新闻动态",
    categoryEn: "News",
    tags: ["QQ Bot", "v2026.3.31", "腾讯", "社交平台", "原生集成", "Tencent", "China", "Integration"],
    readingTime: 15,
    image: "/og-image.png"
  },
  {
    id: 20,
    slug: "openclaw-security-patent-risk-warning",
    title: "国家知识产权局发布风险提示：使用 OpenClaw 等智能体撰写专利文件需警惕三大风险",
    titleEn: "China IP Office Warns: Three Major Risks of Using OpenClaw for Patent Applications",
    excerpt: "国家知识产权局正式发布风险提示，指出 OpenClaw 等 AI 智能体默认安全配置脆弱，用于专利申请文件撰写可能引发技术泄露、实质缺陷、不诚信申请三大风险。",
    excerptEn: "China's National Intellectual Property Administration (CNIPA) officially warns about three major risks of using AI agents like OpenClaw for patent applications: information leakage, substantive defects, and dishonest filing.",
    content: `4 月 1 日，国家知识产权局发布重磅风险提示：OpenClaw（"小龙虾"，曾用名 Clawdbot、Moltbot）等 AI 智能体工具被曝光**默认安全配置脆弱**，不仅自身存在安全隐患，用于专利申请文件撰写还可能引发多重不可逆风险。

这是国家级机构首次针对 AI Agent 工具在知识产权领域的应用发出正式警告，值得所有 OpenClaw 用户关注。无论你是否将 OpenClaw 用于专利工作，了解这些安全风险对每个 AI 智能体用户都至关重要。

## AI 智能体存在哪些安全风险？

与传统的聊天机器人不同，OpenClaw 等 AI 智能体具有远超常规软件工具的系统访问权限。它们可以读取文件、执行命令、发起网络请求、与第三方服务交互。这种扩展的能力面引入了多类风险：

- **不受限的文件系统访问**：默认情况下，智能体可以读取用户账户能访问的任何文件，包括 SSH 密钥、环境变量文件和配置中的密钥
- **网络外泄风险**：具有出站网络访问权限的智能体可能会无意中将敏感数据传输到外部端点
- **命令执行风险**：能够运行 Shell 命令的智能体继承了终端的全部权限（和危险）
- **插件供应链攻击**：第三方技能和插件可能包含以智能体权限执行的恶意代码
- **提示注入攻击**：文档、网页或 API 响应中的恶意内容可能操纵智能体执行非预期操作

## 数据暴露风险：API 密钥、令牌与个人数据

最关键的威胁之一是无意中的数据暴露。

### API 密钥和令牌

当你为 OpenClaw 配置 LLM 提供商、云服务或 SaaS 工具的 API 密钥时，这些凭证存储在本地。如果智能体的文件访问不受限制，任何技能或插件都可以读取这些密钥。

\`\`\`bash
# 检查当前存储的凭证
openclaw config list | grep -i key
openclaw config list | grep -i token

# 立即轮换已暴露的凭证
openclaw config set llm.apiKey "NEW_ROTATED_KEY"
\`\`\`

### 个人与企业数据

能够读取文件系统的智能体可能会接触到个人文档、财务记录、专有源代码或客户数据。当这些数据被发送到云端 LLM 处理时，就离开了你的安全边界。

### 环境变量泄露

许多开发者将密钥存储在 \`.env\` 文件或 Shell 配置文件中。不受限的智能体可以像读取其他文件一样轻松读取这些内容。

\`\`\`bash
# 确保智能体无法访问敏感环境文件
openclaw config set security.blocked_paths "~/.env,~/.aws/credentials,~/.ssh"
\`\`\`

## 三大核心风险

### 风险一：技术信息泄露

OpenClaw 等智能体存在以下安全隐患：

- **权限过高**：默认配置下，智能体可访问系统文件和网络
- **安全漏洞**：开源项目存在被利用的风险
- **插件投毒**：第三方插件可能包含恶意代码

使用其撰写专利申请文件时，技术交底书、核心研发方案等机密信息极易泄露。一旦核心技术外流：

- 专利申请因丧失**新颖性**而无法授权
- 可能被他人抢先申请专利
- 代理机构需承担违约赔偿责任

### 风险二：AI 幻觉导致实质缺陷

AI 在生成专利文件时可能出现"幻觉"问题：

- 权利要求与说明书之间的逻辑矛盾
- 技术特征表述不清或含糊
- 权利要求范围不当（过宽或过窄）
- 凭空编造实际不可行的技术方案
- 错误引用现有技术

这些缺陷可能导致申请在初审阶段即被驳回，或者更糟的是，授权的专利因缺陷而无法执行。

### 风险三：不诚信申请的法律后果

通过智能体**凭空生成、随机编造、内容拼凑**形成的专利申请，属于违反诚实信用原则的不诚信行为。后果包括：

| 行为主体 | 可能处罚 |
|---------|---------|
| 申请人 | 警告、罚款等行政处罚 |
| 代理机构 | 吊销执业许可证 |
| 代理师 | 注销代理资格证 |
| 情节严重者 | 列入严重违法失信名单 |

## AI 生成代码的专利与知识产权考量

除了专利申请本身，使用 AI 智能体生成代码或技术方案还涉及更广泛的知识产权问题：

- **所有权不确定性**：AI 生成代码的法律所有权因司法管辖区而异。在许多地区，只有人类创作的作品才有资格获得版权保护。
- **许可证污染**：如果 AI 模型是基于受版权保护或开源代码训练的，生成的输出可能携带你不知晓的许可义务。
- **商业秘密稀释**：将专有算法或商业逻辑输入云端 AI 可能构成披露，潜在削弱商业秘密保护。
- **专利资格问题**：完全由 AI 构思的发明在要求人类发明人的司法管辖区可能不具备专利资格。

在依赖 AI 生成内容进行专利申请或商业软件开发之前，请务必咨询知识产权律师。

## 安全部署 OpenClaw 的最佳实践

### 1. 启用沙箱模式

\`\`\`bash
# 安全最佳实践
openclaw config set security.sandbox true
openclaw config set security.allowed_paths "~/projects,~/documents"
openclaw config set security.blocked_commands "rm -rf,sudo"
\`\`\`

### 2. 敏感工作使用本地模型

\`\`\`bash
# 使用本地模型，数据完全留在本地
openclaw config set model ollama/llama3

# 禁用智能体的所有外部网络访问
openclaw config set security.networkAccess "local-only"
\`\`\`

### 3. 收紧文件和网络权限

\`\`\`yaml
# ~/.openclaw/config.yaml
security:
  fileAccess: restricted
  allowedPaths:
    - ~/projects
    - ~/documents
  blockedPaths:
    - ~/.ssh
    - ~/.aws
    - ~/.env
    - ~/.gnupg
  networkAccess: local-only
  sandboxMode: strict
\`\`\`

### 4. 审计和审查所有插件

- 仅从 OpenClaw 官方注册中心安装插件
- 安装前审查插件源代码
- 检查插件权限及其请求的系统资源
- 监控插件更新日志，留意意外的权限变更

### 5. 实施日志记录和监控

\`\`\`bash
# 启用全面的审计日志
openclaw config set logging.level "verbose"
openclaw config set logging.destination "~/.openclaw/logs/audit.log"

# 定期审查日志
openclaw logs --filter security --last 7d
\`\`\`

## 安全检查清单

在使用 OpenClaw 进行任何敏感工作之前，请完成以下检查：

- [ ] 沙箱模式已启用
- [ ] 文件访问已限制为仅必要目录
- [ ] 敏感路径（.ssh、.aws、.env）已明确屏蔽
- [ ] 网络访问已限制（敏感工作使用 local-only）
- [ ] 所有插件和技能已经过审计
- [ ] API 密钥已安全存储（非明文配置文件）
- [ ] 审计日志已启用
- [ ] 已为机密数据处理配置本地模型
- [ ] 自动命令执行已禁用或受限
- [ ] 定期凭证轮换计划已制定
- [ ] 团队成员已接受负责任使用 AI 智能体的培训
- [ ] 已制定数据暴露事件的应急响应计划

## 对 OpenClaw 用户的建议

这份风险提示并不意味着 OpenClaw 不能用，而是提醒我们**合理使用**的边界：

### ✅ 可以做的

- **辅助检索**：用 AI 搜索现有技术和专利文献
- **文本润色**：改善文件的语言表达和可读性
- **格式整理**：帮助规范文件格式
- **头脑风暴**：辅助梳理和探索技术方案
- **现有技术检索**：加速发现相关的已有专利

### ❌ 不应该做的

- 让 AI 在没有人工审核的情况下直接生成完整的专利申请文件
- 将核心技术交底书原文输入云端 AI 工具
- 使用 AI 编造不存在的技术方案
- 批量生成"垃圾专利"来充实组合
- 不经专业验证就信任 AI 输出

## 常见问题 FAQ

**Q1: 使用 OpenClaw 进行任何知识产权相关工作安全吗？**

可以使用，但需要采取预防措施。OpenClaw 在研究、头脑风暴和文本润色方面非常有帮助。关键是不要通过云端模型向它输入核心机密技术细节。敏感工作使用本地模型，启用沙箱模式，并始终让合格的专业人员在输出进入正式申请流程前进行审核。

**Q2: 如何知道我的数据是否通过 AI 智能体泄露了？**

启用详细审计日志，定期审查日志中的异常出站网络请求、对敏感目录的文件访问，或你未发起的插件活动。你还可以使用网络监控工具检查智能体进程的流量。

**Q3: 我可以在专利申请中使用 OpenClaw 生成的文本吗？**

技术上可以，但风险很大。AI 生成的文本可能包含幻觉、不准确的技术描述，或无意中复制其训练数据中的已授权专利声明。始终将 AI 输出视为需要专家彻底审查的初稿。向你的专利代理人披露 AI 的使用情况，以便他们采取适当的预防措施。

**Q4: 如果我怀疑某个插件已经危及我的系统，该怎么办？**

立即撤销智能体有权访问的所有 API 密钥和令牌。禁用可疑插件，审查审计日志以确定访问了哪些数据，并轮换所有凭证。如果敏感的企业或个人数据可能已被暴露，请遵循组织的事件响应程序并考虑通知受影响方。

## 总结

国家知识产权局的这份风险提示传递了一个明确信号：**AI 工具是辅助手段，不是替代方案**。

在知识产权这样涉及核心商业利益的领域，OpenClaw 可以帮助提升效率，但绝不能替代专业的人工判断。建立"AI 辅助 + 人工把关"的工作流程，才是负责任的使用方式。

AI 智能体的安全风险是真实存在的，但也是可控的。通过启用沙箱模式、限制文件和网络访问、使用本地模型处理敏感工作、并保持严格的审计实践，你可以在保护数据和知识产权安全的同时，充分发挥 OpenClaw 的强大功能。

> 💡 **关键原则**：AI 做初稿，人类做终审。核心创新，永远由人来把关。安全不是可选项——它是负责任使用 AI 智能体的基石。`,
    contentEn: `On April 1st, China's National Intellectual Property Administration (CNIPA) issued an official risk warning: AI agent tools like OpenClaw ("the Lobster", formerly Clawdbot/Moltbot) have been found to have **weak default security configurations**, posing serious risks when used for patent application drafting.

This is the first time a national-level institution has formally warned about AI Agent tools in the intellectual property field. Whether you use OpenClaw for patent work or not, understanding these security risks is essential for every AI agent user.

## What Security Risks Exist with AI Agents?

AI agents like OpenClaw operate with a level of system access that far exceeds traditional software tools. Unlike a simple chatbot that only processes text, an AI agent can read files, execute commands, make network requests, and interact with third-party services. This expanded capability surface introduces several categories of risk:

- **Unrestricted file system access**: By default, agents may read any file your user account can access, including SSH keys, environment files, and configuration secrets.
- **Network exfiltration**: An agent with outbound network access could inadvertently transmit sensitive data to external endpoints, especially when calling third-party APIs or plugins.
- **Command execution**: Agents that can run shell commands inherit the full power (and danger) of your terminal, including the ability to install software, modify system configurations, or delete data.
- **Plugin and skill supply-chain attacks**: Third-party skills and plugins may contain malicious code that executes with the agent's permissions.
- **Prompt injection**: Malicious content in documents, web pages, or API responses can manipulate the agent into performing unintended actions.

Understanding these risks is the first step toward mitigating them.

## Data Exposure Risks: API Keys, Tokens, and Personal Data

One of the most critical threats is unintentional data exposure. Here are the primary vectors:

### API Keys and Tokens

When you configure OpenClaw with API keys for LLM providers, cloud services, or SaaS tools, those credentials are stored locally. If the agent's file access is unrestricted, any skill or plugin can read these keys. Worse, if the agent has network access, those credentials could be transmitted externally.

\`\`\`bash
# Check what credentials are currently stored
openclaw config list | grep -i key
openclaw config list | grep -i token

# Rotate any exposed credentials immediately
openclaw config set llm.apiKey "NEW_ROTATED_KEY"
\`\`\`

### Personal and Corporate Data

Agents that can read your file system may encounter personal documents, financial records, proprietary source code, or client data. When this data is sent to a cloud-based LLM for processing, it leaves your security perimeter.

### Environment Variable Leaks

Many developers store secrets in \`.env\` files or shell profiles. An unrestricted agent can read these just as easily as any other file.

\`\`\`bash
# Verify your agent cannot access sensitive env files
openclaw config set security.blocked_paths "~/.env,~/.aws/credentials,~/.ssh"
\`\`\`

## Three Core Risks for Patent and IP Work

### Risk 1: Technical Information Leakage

OpenClaw and similar agents have security concerns:

- **Excessive permissions**: Default config allows system file and network access
- **Security vulnerabilities**: Open-source projects carry exploitation risks
- **Plugin poisoning**: Third-party plugins may contain malicious code

When used for patent drafting, confidential information like technical disclosure documents can easily leak, potentially destroying patent novelty. Once core technology leaks:

- Patent applications may be denied for loss of **novelty**
- Competitors may file first
- Patent agencies face breach-of-contract liability

### Risk 2: AI Hallucination Causing Substantive Defects

AI may generate patent documents with:

- Logical contradictions between claims and descriptions
- Unclear or ambiguous technical feature descriptions
- Inappropriate claim scope (too broad or too narrow)
- Fabricated technical solutions that do not actually work
- Incorrect citations of prior art

These defects can lead to application rejection during preliminary examination, or worse, result in granted patents that are unenforceable.

### Risk 3: Legal Consequences of Dishonest Filing

Patent applications formed through AI fabrication, random generation, or content stitching violate the principle of good faith. Consequences include:

| Entity | Potential Penalty |
|--------|-----------------|
| Applicant | Warnings, fines, administrative penalties |
| Agency | License revocation |
| Attorney | Qualification cancellation |
| Severe cases | Blacklisted on dishonesty registry |

## Patent and IP Considerations for AI-Generated Code

Beyond patent applications themselves, there are broader IP considerations when using AI agents to generate code or technical solutions:

- **Ownership uncertainty**: The legal ownership of AI-generated code varies by jurisdiction. In many regions, only human-authored works qualify for copyright protection.
- **License contamination**: If the AI model was trained on copyrighted or open-source code, the generated output may carry license obligations you are unaware of.
- **Trade secret dilution**: Feeding proprietary algorithms or business logic into a cloud-hosted AI may constitute disclosure, potentially weakening trade secret protections.
- **Patent eligibility**: Inventions conceived entirely by AI may not be patentable in jurisdictions that require a human inventor.

Always consult with an IP attorney before relying on AI-generated content for patent filings or commercial software.

## Best Practices for Secure OpenClaw Deployment

### 1. Enable Sandbox Mode

\`\`\`bash
# Security best practices
openclaw config set security.sandbox true
openclaw config set security.allowed_paths "~/projects,~/documents"
openclaw config set security.blocked_commands "rm -rf,sudo"
\`\`\`

### 2. Use Local Models for Sensitive Work

\`\`\`bash
# Use a local model so data never leaves your device
openclaw config set model ollama/llama3

# Disable all external network access for the agent
openclaw config set security.networkAccess "local-only"
\`\`\`

### 3. Restrict File and Network Permissions

\`\`\`yaml
# ~/.openclaw/config.yaml
security:
  fileAccess: restricted
  allowedPaths:
    - ~/projects
    - ~/documents
  blockedPaths:
    - ~/.ssh
    - ~/.aws
    - ~/.env
    - ~/.gnupg
  networkAccess: local-only
  sandboxMode: strict
\`\`\`

### 4. Audit and Vet All Plugins

- Only install plugins from the official OpenClaw registry
- Review plugin source code before installation
- Check plugin permissions and what system resources they request
- Monitor plugin update changelogs for unexpected permission changes

### 5. Implement Logging and Monitoring

\`\`\`bash
# Enable comprehensive audit logging
openclaw config set logging.level "verbose"
openclaw config set logging.destination "~/.openclaw/logs/audit.log"

# Review logs regularly
openclaw logs --filter security --last 7d
\`\`\`

## Security Checklist

Before using OpenClaw for any sensitive work, complete this checklist:

- [ ] Sandbox mode is enabled
- [ ] File access is restricted to necessary directories only
- [ ] Sensitive paths (.ssh, .aws, .env) are explicitly blocked
- [ ] Network access is limited (local-only for sensitive work)
- [ ] All plugins and skills have been audited
- [ ] API keys are stored securely (not in plain-text config files)
- [ ] Audit logging is enabled
- [ ] A local model is configured for confidential data processing
- [ ] Automatic command execution is disabled or restricted
- [ ] Regular credential rotation schedule is in place
- [ ] Team members are trained on responsible AI agent usage
- [ ] An incident response plan exists for potential data exposure

## Recommendations for OpenClaw Users

This warning does not mean you cannot use OpenClaw -- it reminds us of **responsible usage boundaries**:

### Acceptable Uses

- **Research assistance**: Search existing patents and prior art
- **Text polishing**: Improve document language and readability
- **Format organization**: Help standardize document formats
- **Brainstorming**: Assist in organizing and exploring technical solutions
- **Prior art searches**: Accelerate the discovery of relevant existing patents

### What to Avoid

- Having AI generate complete patent applications without human review
- Inputting core technical disclosures directly into cloud-hosted AI tools
- Using AI to fabricate non-existent technical solutions
- Batch-generating "junk patents" to inflate portfolios
- Trusting AI output without professional verification

## Frequently Asked Questions

**Q1: Is it safe to use OpenClaw for any IP-related work at all?**

Yes, but with precautions. OpenClaw can be very helpful for research, brainstorming, and text polishing. The key is to never feed it core confidential technical details via a cloud-hosted model. Use a local model for sensitive work, enable sandbox mode, and always have a qualified professional review any output before it enters a formal filing process.

**Q2: How do I know if my data has been exposed through an AI agent?**

Enable verbose audit logging and regularly review the logs for unexpected outbound network requests, file access to sensitive directories, or plugin activity you did not initiate. You can also use network monitoring tools to inspect traffic from the agent process.

**Q3: Can I use OpenClaw-generated text in a patent application?**

Technically yes, but it carries significant risk. AI-generated text may contain hallucinations, inaccurate technical descriptions, or inadvertently reproduce patented claims from its training data. Always treat AI output as a rough draft that requires thorough expert review. Disclose AI usage to your patent attorney so they can take appropriate precautions.

**Q4: What should I do if I suspect a plugin has compromised my system?**

Immediately revoke all API keys and tokens that the agent had access to. Disable the suspect plugin, review audit logs to determine what data was accessed, and rotate all credentials. If sensitive corporate or personal data may have been exposed, follow your organization's incident response procedures and consider notifying affected parties.

## Summary

CNIPA's warning sends a clear message: **AI tools are aids, not replacements**.

In IP fields involving core business interests, OpenClaw can boost efficiency but must never replace professional human judgment. The responsible approach is "AI assists, humans verify."

The security risks of AI agents are real but manageable. By enabling sandbox mode, restricting file and network access, using local models for sensitive work, and maintaining a rigorous audit practice, you can harness the power of OpenClaw while keeping your data and intellectual property safe.

> **Key Principle**: AI drafts, humans finalize. Core innovation must always be human-led. Security is not optional -- it is the foundation of responsible AI agent usage.`,
    author: "OpenClaw 101",
    date: "2026-04-02",
    category: "安全与合规",
    categoryEn: "Security",
    tags: ["安全", "知识产权", "专利", "风险提示", "合规", "security", "patent"],
    readingTime: 18,
    image: "/og-image.png"
  },
];
