# AGENTS.md — OpenClaw101 Agent Harness

> **单一事实源**: 本文件是所有 Agent 会话的常驻上下文。每当 Agent 犯错时必须更新此文件。
> **远程仓库**: https://github.com/moonye6/cn-truth
> **最后更新**: 2026-03-29

---

## 1. 项目概览

| 属性 | 值 |
|---|---|
| **项目名称** | OpenClaw101 |
| **技术栈** | Next.js 16 + React 19 + TypeScript 5 (strict) |
| **样式方案** | Tailwind CSS v4 + Framer Motion 12 |
| **国际化** | next-intl 4 (en/zh 双语) |
| **数据库** | Turso (LibSQL) + Drizzle ORM |
| **测试框架** | Playwright (E2E) |
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
│   ├── home/               # 首页组件
│   ├── layout/             # 布局组件 (Header/Footer)
│   ├── seo/                # SEO 相关组件
│   ├── skills/             # 技能页组件
│   ├── tutorials/          # 教程页组件
│   └── ui/                 # 通用 UI 组件 (Button/Card/Badge/Input)
├── data/                   # 静态数据文件
├── i18n/                   # 国际化配置和翻译文件
├── lib/                    # 工具函数和数据库
│   ├── db/                 # Drizzle ORM + Turso
│   └── utils.ts            # 工具函数
└── types/                  # TypeScript 类型定义
```

### 2.2 强制规则

1. **国际化**: 所有面向用户的文本 **必须** 通过 `next-intl` 的 `useTranslations()` 获取，禁止硬编码
2. **类型安全**: 所有组件 props 和函数参数 **必须** 有 TypeScript 类型定义
3. **路径别名**: 使用 `@/` 别名引用 `src/` 下的模块，禁止使用相对路径 `../../`
4. **组件导出**: UI 组件必须通过 `components/ui/index.ts` 统一导出
5. **数据文件**: 静态数据放在 `src/data/`，数据库 schema 放在 `src/lib/db/schema.ts`
6. **样式**: 使用 Tailwind CSS 类，禁止内联 `style` 属性，使用 `cn()` 合并类名
7. **动画**: 使用 Framer Motion，禁止使用 CSS `@keyframes` 自定义动画
8. **SEO**: 每个页面必须有 `metadata` 导出或 `generateMetadata` 函数
9. **安全头**: 不要修改 `next.config.ts` 中的安全头配置

### 2.3 文件命名规范

- **页面**: `page.tsx` (Next.js 约定)
- **布局**: `layout.tsx` (Next.js 约定)
- **组件**: PascalCase，如 `HeroSection.tsx`
- **工具函数**: camelCase，如 `utils.ts`
- **数据文件**: kebab-case，如 `learning-path.ts`
- **类型文件**: `index.ts` 在 `types/` 目录下

## 3. 开发工作流

### 3.1 增量执行策略

每次会话 **只处理一个功能**，遵循以下流程：

```
1. 读取 progress.json → 确认当前任务
2. 读取 AGENTS.md → 加载约束上下文
3. 执行任务 → 只修改相关文件
4. 运行测试 → playwright test --grep "相关测试"
5. 更新 progress.json → 标记完成
6. 提交 git → 明确的 commit message
7. 更新 AGENTS.md → 如果发现新的错误模式
```

### 3.2 Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 样式调整（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具变更
i18n: 国际化内容
```

### 3.3 测试策略

- **E2E 测试**: 每个新页面/功能都需要 Playwright 测试
- **测试目录**: `tests/e2e/`
- **baseURL**: 生产环境 `https://openclaw101.vip`
- **浏览器**: 仅 Chromium (Desktop Chrome)
- **并行执行**: 本地 4 workers，CI 1 worker

## 4. 常见错误和修复指南

> ⚠️ 这是一个活文档。每当 Agent 犯错时，在此添加条目。

### 4.1 错误模式记录

| # | 错误描述 | 原因 | 修复方法 | 日期 |
|---|---------|------|---------|------|
| 1 | E2E 测试失败: 新内容未在线上找到 | 测试针对生产 URL 运行，新内容尚未部署 | 先部署再运行 E2E，或在本地 dev server 测试 | 2026-03-19 |
| 2 | git: insufficient permission for adding object to .git/objects | 之前以 root 身份执行了 git 操作，导致 .git/objects 下文件属于 root | `sudo chown -R moonye:users .git/` 修复所有权。**永远不要用 sudo 执行 git 命令** | 2026-03-30 |
| 3 | - | - | - | - |

### 4.2 已知限制

- Playwright 测试 baseURL 是生产站点，新功能测试需要先部署
- Turso 数据库连接需要环境变量 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN`
- next-intl 要求所有翻译 key 在 `en.json` 和 `zh.json` 中同时存在

## 5. 上下文分层管理

### Tier 1 — 始终加载 (< 500 tokens)
- 本文件 (`AGENTS.md`) 的第 1-2 节
- `progress.json` 的当前任务状态

### Tier 2 — 按需加载 (任务相关)
- 相关的 `src/data/` 数据文件
- 相关的组件源码
- 相关的测试文件
- `feature_list.json` 的相关功能条目

### Tier 3 — 深度参考 (仅调试时加载)
- `next.config.ts` 完整配置
- `src/lib/db/` 数据库相关
- `i18n/*.json` 翻译文件完整内容
- 第三方库文档

### 上下文利用率目标: < 40%

## 6. Linter 集成和自动修复

### 6.1 ESLint 自定义规则

参见 `eslint-rules/` 目录下的自定义规则:

- `no-hardcoded-text`: 禁止 JSX 中的硬编码文本（必须使用 i18n）
- `require-page-metadata`: 页面组件必须导出 metadata
- `enforce-path-alias`: 强制使用 @/ 路径别名

### 6.2 结构化测试 (Linter Script)

```bash
# 验证项目结构完整性
pnpm lint:structure
```

检查项:
- [ ] 每个 `[locale]` 页面都有对应的测试文件
- [ ] `en.json` 和 `zh.json` 的 key 完全一致
- [ ] 所有组件都有 TypeScript 类型
- [ ] `components/ui/index.ts` 导出所有 UI 组件

## 7. 熵管理和垃圾回收

### 定期检查清单

- [ ] 删除未使用的组件和导入
- [ ] 清理过时的翻译 key
- [ ] 更新过期的静态数据
- [ ] 检查并修复 TypeScript 类型 `any`
- [ ] 合并重复的工具函数
- [ ] 清理 `.codebuddy/memory/` 中超过 30 天的日志

## 8. 变更日志

| 日期 | 变更内容 | 作者 |
|------|---------|------|
| 2026-03-29 | 初始创建 AGENTS.md | Agent |
