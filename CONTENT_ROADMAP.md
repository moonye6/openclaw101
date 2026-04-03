# CONTENT_ROADMAP.md — 内容补充规划路线图

> **创建日期**: 2026-04-03
> **最后更新**: 2026-04-03
> **状态**: 执行中

---

## 一、技能 (Skills) 板块

### 现状：17 分类，97 个技能

| 分类 | 技能数 | 示例 |
|------|--------|------|
| AI & LLMs | 8 | gemini, ollama, openai, claude, deepseek... |
| Search & Research | 7 | web-search, weather, arxiv, news, stock... |
| DevOps & Cloud | 7 | tmux, docker, k8s, ssh, terraform... |
| Marketing & Sales | 6 | seo-analyzer, social-poster, analytics... |
| Coding Agents | 7 | github, coding-agent, test-runner, db-query... |
| Communication | 6 | telegram, discord, slack, email, feishu, dingtalk |
| Notes & PKM | 6 | obsidian, notion, logseq, readwise... |
| Web & Frontend | 6 | browser, scraper, lighthouse, screenshot... |
| Smart Home & IoT | 5 | homeassistant, mqtt, smart-light... |
| Speech & Audio | 5 | tts, whisper, podcast, music-gen... |
| Health & Fitness | 5 | workout, nutrition, pomodoro... |
| Gaming | 4 | mc-server, steam, game-wiki, dice-roller |

### 待补充（按优先级排序）

| # | 新分类 | 建议技能 | 优先级 | 状态 |
|---|--------|---------|--------|------|
| S1 | 数据与数据库 (Data & Database) | redis, mongodb, mysql, excel-parser, csv-tools | P0 | ✅ 已完成 |
| S2 | 文件与文档处理 (Files & Documents) | pdf-reader, ocr, office-converter, markdown-tools, file-manager | P0 | ✅ 已完成 |
| S3 | 视频与媒体 (Video & Media) | video-editor, subtitle-gen, youtube-dl, screen-recorder, ffmpeg | P1 | ✅ 已完成 |
| S4 | 日历与任务管理 (Productivity) | google-calendar, todoist, trello, pomodoro-timer, habit-tracker | P1 | ✅ 已完成 |
| S5 | 金融与加密 (Finance & Crypto) | crypto-tracker, defi-monitor, budget, tax-calc, portfolio | P2 | ✅ 已完成 |
| S6 | 设计与创意（可选） | figma, canva, color-palette, mockup-gen | P2 | — |
| S7 | 教育与学习（可选） | flashcard, language-learn, course-tracker, quiz-gen | P2 | — |

---

## 二、教程 (Tutorials) 板块

### 现状：8 分类，54 篇教程

| 分类 | 数量 | 中/英分布 |
|------|------|----------|
| Official (官方文档) | 3 | 1 中 / 2 英 |
| Cloud Deploy (云部署) | 6 | 3 中 / 3 英 |
| Getting Started (入门) | 8 | 5 中 / 3 英 |
| Videos (视频) | 6 | 3 中 / 3 英 |
| Deep Dives (深度分析) | 11 | 3 中 / 8 英 |
| Skills (技能开发) | 8 | 4 中 / 4 英 |
| Tools (工具) | 7 | 4 中 / 3 英 |
| Channels (通道配置) | 5 | 2 中 / 3 英 |

### 待补充（按优先级排序）

| # | 任务 | 描述 | 优先级 | 状态 |
|---|------|------|--------|------|
| T1 | 补充中文教程 | Skills 分类 4 篇全英文、Tools 仅 1 中文，需补充中文版 | P0 | ✅ 已完成 |
| T2 | 新增"自动化/工作流"分类 | 核心卖点缺少独立分类，当前内容分散在 Deep Dives | P0 | — |
| T3 | 新增"安全加固"分类 | 3 篇安全相关文章散落在 Deep Dives，应独立 | P1 | — |
| T4 | 新增 API/开发者教程 | 如何用 API 集成 OpenClaw 到自己的应用 | P1 | — |
| T5 | 新增微信/QQ 通道教程 | 通道配置中缺少微信和 QQ 教程 | P1 | — |
| T6 | 新增"迁移/对比"教程 | 如"从 LangChain 迁移到 OpenClaw" | P2 | — |
| T7 | 新增"最佳实践/案例"分类 | 真实用户场景的教程 | P2 | — |

---

## 三、博客 (Blog) 板块

### 现状：24 篇 blog.ts + 5 篇 MDX

**blog.ts 主要文章**：
- OpenClaw API 参考指南 / 配置完全指南 / 错误排查手册
- OpenClaw vs Claude Code / vs Cursor vs Manus / vs ChatGPT / vs LangChain
- 自建部署指南 / 本地 AI 模型集成 / 企业级应用场景
- 安全加固指南 / ClawCon 2026 回顾
- Telegram 教程 / 飞书教程 / QQ 机器人集成
- n8n 自动化集成 / 浏览器自动化集成
- 3 天构建 AI 产品 / 安全专利风险预警

**MDX 博客**：
1. JetBrains IDE 集成指南
2. Anthropic 81000 人调研洞察
3. Meta 收购 Manus 分析
4. 模型对比 (Claude Sonnet 4.6 vs GPT-4.5 vs Gemini 2.0)
5. OpenClaw 自动化工作流

### 待补充（按优先级排序）

| # | 任务 | 描述 | 优先级 | 状态 |
|---|------|------|--------|------|
| B1 | 新手快速上手类博客 | 现有文章偏技术深度，缺少入门友好的内容 | P0 | — |
| B2 | 社区/生态类内容 | 社区故事、用户案例、贡献者采访 | P1 | — |
| B3 | 版本更新/Changelog | 跟踪 OpenClaw 版本发布 | P1 | — |
| B4 | SEO 长尾内容 | 场景类文章如"如何用 AI 自动写周报"、"个人知识管理方案" | P2 | — |
| B5 | 定期更新内容节奏 | 当前全部文章日期 2026-03-23，缺乏时效性 | P2 | — |

---

## 四、其他待处理项

| # | 任务 | 描述 | 优先级 | 状态 |
|---|------|------|--------|------|
| O1 | 合并学习路径数据 | `learning-path.ts` 和 `seven-days.ts` 重叠，应合并或明确分工 | P1 | — |
| O2 | FAQ 扩充 | 当前 12 个问题，可扩充到 20+ | P2 | — |

---

## 变更日志

| 日期 | 变更 |
|------|------|
| 2026-04-03 | 初始创建：三大板块内容审计结果 + 补充计划 |
