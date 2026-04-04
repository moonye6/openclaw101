# Blog Article Template — Telegram Series

> 复制此文件 → 填空 → 运行检查 → 发布
> Copy this file → Fill in → Run check → Publish

---

## 📋 文章元信息（Article Metadata）

```ts
{
  id: __NEXT_ID__,
  slug: "__slug-here__",                    // URL: /blog/__slug-here__
  title: "__中文标题__",
  titleEn: "__English Title (Keyword + Year)__",
  excerpt: "__中文摘要（80字以内）__",
  excerptEn: "__English meta description (under 160 chars, include primary keyword)__",
  content: `__中文内容__`,
  contentEn: `__英文内容（见下方骨架）__`,
  author: "OpenClaw 101",
  date: "YYYY-MM-DD",
  category: "__分类__",
  categoryEn: "__Category__",
  tags: ["Telegram", "Bot", "__tag3__", "__tag4__"],
  readingTime: __N__,
  image: "/og-image.png"
}
```

---

## 🧱 强制结构骨架（不可改顺序，不可删模块）

```
1. Title（主关键词必须在前 60 字符）
2. Intro（问题导入，≤3句话）
3. 🚀 Start Building 模块（固定5链）
4. 内容主体（角色专一，见角色锁）
5. 语义内链（≥2条，正文自然嵌入）
6. 🔥 Build Today 模块（固定5链）
```

### ✅ 顶部模块（复制粘贴，不改）

```markdown
---

## 🚀 Start Building Your Telegram Bot

| | Guide | |
|---|---|---|
| 🧩 | New here? | [How to Create a Telegram Bot](/blog/how-to-create-telegram-bot) |
| 💡 | Need ideas? | [10 Telegram Bot Examples](/blog/telegram-bot-examples) |
| ⚙️ | Want automation? | [Telegram Automation Guide](/blog/telegram-automation-guide) |
| 🧠 | Go advanced? | [Telegram Bot API Guide](/blog/telegram-bot-api-tutorial) |
| 🛠 | Compare tools? | [Best Telegram Bot Tools](/blog/best-telegram-bot-tools) |

---
```

### ✅ 底部模块（复制粘贴，不改）

```markdown
---

## 🔥 Build Your Own Telegram Bot Today

| | |
|---|---|
| 👉 | [Start from scratch → How to Create a Telegram Bot](/blog/how-to-create-telegram-bot) |
| 👉 | [Explore real ideas → Telegram Bot Examples](/blog/telegram-bot-examples) |
| 👉 | [Automate everything → Telegram Automation Guide](/blog/telegram-automation-guide) |
| 👉 | [Go advanced → Telegram Bot API Guide](/blog/telegram-bot-api-tutorial) |
| 👉 | [Choose the right stack → Best Telegram Bot Tools](/blog/best-telegram-bot-tools) |

💡 *Tip: The best bots combine examples + automation + the right tools.*
```

---

## 🔗 Anchor Text 统一库（从这里选，禁止即兴）

### → Create（how-to-create-telegram-bot）
- `how to create a Telegram bot`
- `Telegram bot creation guide`
- `build a Telegram bot step by step`
- `step-by-step Telegram bot tutorial`

### → Examples（telegram-bot-examples）
- `Telegram bot examples`
- `real Telegram bot ideas`
- `Telegram bot use cases`
- `10 Telegram bot examples`

### → Automation（telegram-automation-guide）
- `Telegram automation guide`
- `automate your Telegram bot`
- `Telegram bot workflows`
- `automation workflows`

### → API（telegram-bot-api-tutorial）
- `Telegram Bot API guide`
- `Telegram Bot API tutorial`
- `how the API works`
- `API reference`

### → Tools（best-telegram-bot-tools）
- `best Telegram bot tools`
- `Telegram bot tools`
- `tools for building Telegram bots`
- `no-code bot platforms`

---

## 🎭 内容角色锁（每篇只做一件事）

| 文章 | 角色 | 禁止内容 |
|------|------|---------|
| Create | 教你做（步骤教程） | ❌ 不写工具推荐 ❌ 不写对比 |
| Examples | 激发点击（灵感列表） | ❌ 不写 API ❌ 不写安装教程 |
| Automation | 提升价值（工作流） | ❌ 不写 BotFather 步骤 |
| API | 建立权威（技术深度） | ❌ 不写工具推荐 ❌ 不写案例列表 |
| Tools | 转化（对比选择） | ❌ 不写教程步骤 ❌ 不写 API |

---

## ✅ 发布前检查清单（每篇必过）

运行命令：`node scripts/check-blog.mjs <slug>`

- [ ] 是否有顶部模块（5 links）
- [ ] 是否有底部模块（5 links）
- [ ] 是否链接到另外 4 篇文章
- [ ] 是否有 ≥2 个正文语义内链
- [ ] anchor text 是否多样化（无连续重复）
- [ ] 文章角色是否专一（未越界）
- [ ] slug 是否符合规范（全小写连字符）
- [ ] excerptEn 是否 ≤160 字符
- [ ] readingTime 是否 ≥5 分钟

**少一项 = 不允许发布**
