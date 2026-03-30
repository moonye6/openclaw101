# AGENTS.md — OpenClaw101 Agent Harness

> **单一事实源**: 本文件是所有 Agent 会话的常驻上下文。每当 Agent 犯错时必须更新此文件。
> **远程仓库**: https://github.com/moonye6/cn-truth
> **最后更新**: 2026-03-30

---

## 1. 项目概览

| 属性 | 值 |
|---|---|
| **项目名称** | OpenClaw101 — OpenClaw AI 助手学习资源中心 |
| **技术栈** | Next.js 16 + React 19 + TypeScript 5 (strict) |
| **样式方案** | Tailwind CSS v4 + Framer Motion 12 |
| **国际化** | next-intl 4 (en/zh 双语) |
| **数据库** | 无（纯静态数据架构，数据文件位于 src/data/） |
| **测试框架** | Playwright (E2E, 9 个文件, ~95 个用例) |
| **部署平台** | Vercel |
| **域名** | openclaw101.vip |
| **包管理器** | pnpm |

## 2. 架构约束 (MUST)

### 2.1 目录结构规范

```
src/
├── app/                    # Next.js App Router 页面
│   ├── [locale]/           # 国际化路由 (en|zh)
│   ├── api/                # API 路由
│   └── feed.xml/           # RSS Feed
├── components/             # React 组件
│   ├── home/               # 首页组件 (10个)
│   ├── layout/             # 布局组件 (Header/Footer)
│   ├── seo/                # SEO 组件 (JsonLd/FAQSection/FAQSchema/Breadcrumbs/CourseSchema)
│   ├── skills/             # 技能页组件
│   ├── tutorials/          # 教程页组件
│   └── ui/                 # 通用 UI 组件 (Button/Card/Badge/Input)
├── data/                   # 静态数据文件 (blog/faq/learning-path/skills/tutorials)
├── i18n/                   # 国际化 (en.json/zh.json/routing.ts/request.ts)
├── lib/                    # 工具函数 (utils.ts/rss.ts)
└── types/                  # TypeScript 类型定义
```

### 2.2 强制规则

1. **国际化**: 所有面向用户的文本 **必须** 通过 `useTranslations()` 或 `getTranslations()` 获取，禁止硬编码
2. **类型安全**: 所有组件 props 和函数参数 **必须** 有 TypeScript 类型定义
3. **路径别名**: 使用 `@/` 别名引用 `src/` 下的模块，禁止使用相对路径 `../../`
4. **组件导出**: UI 组件必须通过 `components/ui/index.ts` 统一导出
5. **数据文件**: 静态数据放在 `src/data/`
6. **样式**: 使用 Tailwind CSS 类，禁止内联 `style` 属性，使用 `cn()` 合并类名
7. **动画**: 使用 Framer Motion，禁止使用 CSS `@keyframes` 自定义动画
8. **SEO**: 每个页面必须有 `metadata` 导出或 `generateMetadata` 函数
9. **安全头**: 不要修改 `next.config.ts` 中的安全头配置
10. **HTML 语义**: 禁止 `<main>` 嵌套，layout 和 page 不能同时使用 `<main>`

### 2.3 文件命名规范

- **页面**: `page.tsx` (Next.js 约定)
- **布局**: `layout.tsx` (Next.js 约定)
- **组件**: PascalCase，如 `HeroSection.tsx`
- **工具函数**: camelCase，如 `utils.ts`
- **数据文件**: kebab-case，如 `learning-path.ts`

## 3. 开发工作流

### 3.1 增量执行策略

每次会话 **只处理一个功能**，遵循以下流程：

```
1. 读取 progress.json → 确认当前任务
2. 读取 AGENTS.md → 加载约束上下文
3. 执行任务 → 只修改相关文件
4. 运行 lint → eslint + lint:structure
5. 更新 progress.json → 标记完成
6. 提交 git → 明确的 commit message
7. 更新 AGENTS.md → 如果发现新的错误模式
```

### 3.2 Git 提交规范

```
feat: 新功能       fix: 修复 bug       docs: 文档更新
style: 样式调整     refactor: 重构      test: 测试相关
chore: 构建/工具    i18n: 国际化内容
```

### 3.3 Git 安全规则

- **永远不要用 `sudo` 执行 git 命令** — 会导致 .git/objects 权限变为 root
- 自定义 ESLint 规则 **不要在 eslint.config.mjs 中直接 import JS 文件** — 会在 ESM 环境中加载失败
- 新增文件后 **必须立即提交** — 避免丢失

## 4. 常见错误和修复指南

> ⚠️ 这是一个活文档。每当 Agent 犯错时，在此添加条目。

### 4.1 错误模式记录

| # | 错误描述 | 原因 | 修复方法 | 日期 |
|---|---------|------|---------|------|
| 1 | E2E 测试失败: 新内容未在线上找到 | 测试针对生产 URL 运行，新内容尚未部署 | 先部署再运行 E2E，或在本地 dev server 测试 | 2026-03-19 |
| 2 | git: insufficient permission for .git/objects | 之前以 root 身份执行了 git 操作 | `sudo chown -R moonye:users .git/`。**永远不要 sudo git** | 2026-03-30 |
| 3 | ESLint 自定义规则导致全部被 revert | eslint.config.mjs 直接 import CJS .js 文件在 ESM 环境中失败 | 使用 ESLint flat config 的 inline rules 或确保规则文件兼容 ESM | 2026-03-30 |
| 4 | Harness 文件 (AGENTS.md/eslint-rules 等) 全部丢失 | 提交后因 ESLint 加载失败被 revert (cb2c604) | 先验证 ESLint 能正常运行再提交；或拆分提交 — Harness 文件与 ESLint 配置分开 | 2026-03-30 |
| 5 | `<main>` 标签嵌套 | layout.tsx 和 page.tsx 都包裹了 `<main>` | layout 使用 `<main>`，page 使用 `<div>` 或 `<section>` | 发现于分析 |
| 6 | Cache-Control 过于激进 | `/:path*` 通配符设置了 1年缓存含 immutable | 仅对 `/_next/static/*` 设置 immutable，其他路径去掉 | 发现于分析 |
| 7 | 工作区文件属于 root，IDE 编辑静默失败 | 之前以 root 身份运行导致 src/ tests/ 等文件属于 root | `sudo chown -R moonye:users /data/github/openclaw101/`。replace_in_file 报成功但磁盘没变时检查文件权限 | 2026-03-30 |
| 8 | git rebase 后工作区文件丢失 | .codebuddy/ 和 test-results/ 属于 root 导致 rebase 中途失败 | 修复权限后用 `git show HEAD:file > file` 恢复 | 2026-03-30 |

### 4.2 已知限制

- Playwright 测试 baseURL 是生产站点，新功能测试需要先部署
- next-intl 要求所有翻译 key 在 `en.json` 和 `zh.json` 中同时存在

## 5. 上下文分层管理

### Tier 1 — 始终加载 (< 500 tokens)
- 本文件 (`AGENTS.md`) 的第 1-2 节
- `progress.json` 的当前任务状态

### Tier 2 — 按需加载 (任务相关)
- 相关的 `src/data/` 数据文件
- 相关的组件源码和测试文件
- `feature_list.json` 的相关功能条目
- `src/i18n/*.json` 翻译文件

### Tier 3 — 深度参考 (仅调试时)
- `next.config.ts`、`playwright.config.ts`、`tsconfig.json`
- `src/lib/db/` 数据库相关
- 第三方库文档

### 上下文利用率目标: < 40%

## 6. Linter 和验证

### 6.1 ESLint 自定义规则 (inline，不单独文件)

在 `eslint.config.mjs` 中以 inline rules 方式添加：
- `no-restricted-syntax` — 禁止 JSX 中的硬编码文本
- 通过 `no-restricted-imports` — 强制 @/ 路径别名

### 6.2 结构化验证 (`pnpm lint:structure`)

检查项:
- [x] `en.json` 和 `zh.json` 的 key 完全一致
- [x] 所有 UI 组件通过 `index.ts` 统一导出
- [x] 已完成功能都有对应测试
- [x] Harness 文件完整性 (AGENTS.md/progress.json/feature_list.json)
- [x] 上下文利用率 < 40%

## 7. 已知 i18n 问题 (待修复)

| 组件 | 问题 | 严重程度 | 状态 |
|------|------|---------|------|
| `RecommendedSection` | 推荐教程 title/description 硬编码中文 | 高 | ✅ 已修复 |
| `SkillsStats` | category names、"skills"、stats bar 英文硬编码 | 高 | ✅ 已修复 |
| `TutorialsSection` | 教程 title/description 中英混合硬编码 | 高 | ✅ 已修复 |
| `FAQSection` | 标题使用 `isZh ?` 三元运算而非 `useTranslations` | 中 | — FAQ 数据本身按语言分离，结构合理 |
| `Footer` | 部分链接文本硬编码 | 低 | ✅ 已修复 |
| `page.tsx generateMetadata` | metadata 中文本硬编码 (Server Component 限制) | 低 | — Server Component 无法使用 hook |

## 8. 变更日志

| 日期 | 变更内容 | 作者 |
|------|---------|------|
| 2026-03-29 | 初始创建 AGENTS.md 和 Harness 体系 | Agent |
| 2026-03-30 | 修复 git 权限问题；ESLint 规则被 revert 后重建；全面分析并补充错误模式 | Agent |
| 2026-03-30 | GStack 优化：移除 DB 死代码、修复 Cron 鉴权、修复 i18n 硬编码(4组件)、SEO 组件改 SC、GA 环境变量化、创建 .env.example、重写 README | Agent |
