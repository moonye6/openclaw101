export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  author: string;
  date: string;
  category: string;
  categoryEn: string;
  tags: string[];
  readingTime: number;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 10,
    slug: "openclaw-enterprise-use-cases",
    title: "企业如何用 OpenClaw 提升效率：5 个真实案例",
    titleEn: "How Enterprises Use OpenClaw: 5 Real Cases",
    excerpt: "客服自动化、数据处理、研发辅助、运营提效、知识管理——来自 5 家企业的 OpenClaw 实战经验分享。",
    excerptEn: "Customer service automation, data processing, R&D assistance, operations efficiency, knowledge management — OpenClaw experience from 5 enterprises.",
    content: `OpenClaw 不只是个人工具，越来越多的企业开始用它提升效率。

这篇文章分享 5 个真实的企业应用案例，看看他们如何用 OpenClaw 解决实际问题。

## 案例 1：电商客服自动化

**公司背景**：
- 年销售额 5000 万的电商公司
- 日均客服咨询 2000+ 条
- 客服团队 10 人

**痛点**：
- 重复性问题占比 60%（物流查询、退换货、优惠券）
- 客服响应慢，影响满意度
- 人力成本高

**解决方案**：

\`\`\`
部署 OpenClaw + 飞书机器人：
1. 接入飞书客服群
2. 训练 OpenClaw 识别常见问题
3. 自动回复重复性问题
4. 复杂问题转人工
\`\`\`

**效果**：
- 📉 人工客服工作量减少 50%
- ⚡ 平均响应时间从 5 分钟降到 30 秒
- 💰 年节省人力成本 30 万

**关键代码**：

\`\`\`typescript
// 客服自动化技能示例
export default {
  name: 'customer-service',
  triggers: ['客服', '帮助'],
  
  async handle(message) {
    // 常见问题自动回复
    if (message.includes('物流')) {
      return '您的订单正在配送中，预计明天到达。';
    }
    if (message.includes('退换货')) {
      return '退换货请提供订单号，我们将在 24 小时内处理。';
    }
    // 复杂问题转人工
    return null; // 返回 null 表示转人工
  }
};
\`\`\`

## 案例 2：数据报表自动化

**公司背景**：
- 金融科技公司
- 每日需生成各类报表 50+ 份
- 数据分析师 3 人

**痛点**：
- 报表生成耗时（每份 15-30 分钟）
- 容易出错
- 重复劳动多

**解决方案**：

\`\`\`
OpenClaw 定时任务：
1. 每天早上 6 点自动拉取数据
2. 生成 Excel 报表
3. 发送邮件给管理层
4. 异常数据自动告警
\`\`\`

**效果**：
- ⏰ 每份报表生成时间从 20 分钟降到 2 分钟
- ❌ 错误率从 5% 降到 0.1%
- 👨‍💼 数据分析师从重复劳动中解放

**定时任务配置**：

\`\`\`bash
# 每天早上 6 点生成销售报表
openclaw cron add "0 6 * * *" "生成昨日销售报表并发送给 sales@company.com"

# 每周一早上 8 点生成周报
openclaw cron add "0 8 * * 1" "生成上周运营周报并发送给管理层"

# 每月 1 号生成月报
openclaw cron add "0 0 1 * *" "生成上月财务月报并归档"
\`\`\`

## 案例 3：研发辅助

**公司背景**：
- 软件开发公司
- 开发团队 20 人
- 技术栈：Node.js + React + PostgreSQL

**痛点**：
- 代码审查耗时
- 文档编写负担重
- 新人上手慢

**解决方案**：

\`\`\`
OpenClaw + GitHub 集成：
1. 自动审查 PR（代码风格、潜在 bug）
2. 自动生成 API 文档
3. 自动回答常见技术问题
4. 新人培训辅助
\`\`\`

**效果**：
- 🔍 代码审查效率提升 40%
- 📚 文档维护工作量减少 60%
- 🎓 新人上手时间从 2 周降到 1 周

**GitHub 集成示例**：

\`\`\`yaml
# .github/workflows/ai-review.yml
name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: OpenClaw Review
        run: |
          curl -X POST OPENCLAW_URL/api/review \\
            -H "Authorization: Bearer OPENCLAW_TOKEN" \\
            -d '{"pr": "PR_NUMBER"}'
\`\`\`

## 案例 4：运营提效

**公司背景**：
- 内容运营公司
- 管理公众号、小红书、抖音 3 个平台
- 运营团队 5 人

**痛点**：
- 跨平台发布内容繁琐
- 数据统计分散
- 舆情监控滞后

**解决方案**：

\`\`\`
OpenClaw 多平台自动化：
1. 一键发布到多个平台
2. 自动汇总各平台数据
3. 实时舆情监控
4. 竞品动态跟踪
\`\`\`

**效果**：
- 📤 内容发布效率提升 300%
- 📊 数据汇总时间从 1 小时降到 5 分钟
- 🔔 舆情响应时间从 1 天降到 1 小时

**自动化脚本**：

\`\`\`bash
# 每天早上 9 点汇总昨日数据
openclaw cron add "0 9 * * *" \\
  "汇总公众号、小红书、抖音昨日数据，生成运营日报"

# 每 2 小时检查舆情
openclaw cron add "0 */2 * * *" \\
  "搜索公司相关新闻，发现负面舆情立即通知"
\`\`\`

## 案例 5：知识管理

**公司背景**：
- 咨询公司
- 知识库文档 5000+ 篇
- 顾问团队 50 人

**痛点**：
- 知识查找困难
- 文档更新不及时
- 新人学习曲线陡

**解决方案**：

\`\`\`
OpenClaw + 飞书知识库：
1. 智能问答（基于知识库）
2. 自动归档和分类
3. 文档更新提醒
4. 学习路径推荐
\`\`\`

**效果**：
- 🔍 知识查找时间从 10 分钟降到 30 秒
- 📝 文档更新及时性提升 80%
- 📚 新人学习周期从 3 个月降到 1.5 个月

**知识库问答示例**：

\`\`\`
用户：公司有关于客户隐私保护的政策吗？

OpenClaw：是的，请参考以下文档：
📄 《客户隐私保护政策》v2.0
📄 《数据处理规范》
📄 《员工保密协议》

要点摘要：
1. 客户数据仅用于约定用途
2. 数据存储需加密
3. 访问需权限审批
...
\`\`\`

## 企业部署建议

### 1. 部署方式选择

| 公司规模 | 推荐方案 | 理由 |
|----------|----------|------|
| 小团队（<10人） | 本地服务器 | 成本低，足够用 |
| 中型公司（10-100人） | VPS + Tailscale | 稳定，安全 |
| 大型公司（>100人） | 私有云 + 专业运维 | 合规，可控 |

### 2. 安全配置

\`\`\`bash
# 企业级安全配置
openclaw config set gateway.auth.enabled true
openclaw config set fs.allowed_paths "/company/data"
openclaw config set exec.blocked_commands "rm -rf,format"
openclaw config set logging.level "audit"
\`\`\`

### 3. 权限管理

\`\`\`bash
# 按部门设置权限
openclaw config set permissions.sales "read:crm,write:reports"
openclaw config set permissions.dev "read:code,write:code,read:docs"
openclaw config set permissions.hr "read:employees,write:employees"
\`\`\`

### 4. 监控告警

\`\`\`bash
# 设置使用量监控
openclaw config set monitoring.daily_limit 1000
openclaw config set monitoring.alert_email "it@company.com"
openclaw config set monitoring.cost_limit 100  # 美元/天
\`\`\`

## ROI 分析

以 50 人公司为例：

| 项目 | 成本 | 节省 |
|------|------|------|
| OpenClaw 部署 | $50/月（VPS） | - |
| LLM API 费用 | $200/月 | - |
| 人力节省 | - | $5000/月 |
| 效率提升 | - | 难以量化 |
| **净收益** | - | **$4750/月** |

**投资回报周期**：< 1 个月

---

## 总结

OpenClaw 在企业的应用场景：

| 场景 | 解决的问题 | 效果 |
|------|------------|------|
| 客服自动化 | 重复性问题多 | 人力减少 50% |
| 数据报表 | 重复劳动 | 效率提升 10 倍 |
| 研发辅助 | 文档、审查 | 效率提升 40% |
| 运营提效 | 跨平台、数据 | 效率提升 300% |
| 知识管理 | 查找困难 | 时间减少 95% |

**关键成功因素**：
1. 明确痛点和目标
2. 从小场景开始试点
3. 持续优化和迭代
4. 重视安全和权限`,
    contentEn: `OpenClaw is not just for individuals — more enterprises are using it to improve efficiency.

This article shares 5 real enterprise use cases.

## Case 1: E-commerce Customer Service Automation

**Background**:
- E-commerce company with 50M annual sales
- 2000+ daily customer inquiries
- 10-person support team

**Pain Points**:
- 60% repetitive questions
- Slow response times
- High labor costs

**Solution**:
\`\`\`
Deploy OpenClaw + Feishu Bot:
1. Connect to Feishu support groups
2. Train OpenClaw to recognize common questions
3. Auto-reply to repetitive questions
4. Escalate complex issues to humans
\`\`\`

**Results**:
- 📉 Support workload reduced by 50%
- ⚡ Response time from 5 min to 30 sec
- 💰 Annual savings of $43k

## Case 2: Data Report Automation

**Background**:
- Fintech company
- 50+ daily reports
- 3 data analysts

**Pain Points**:
- Report generation takes 15-30 min each
- Error-prone
- Repetitive work

**Solution**:
\`\`\`
OpenClaw Cron Jobs:
1. Pull data at 6 AM daily
2. Generate Excel reports
3. Email to management
4. Alert on anomalies
\`\`\`

**Results**:
- ⏰ Report time from 20 min to 2 min
- ❌ Error rate from 5% to 0.1%

## Case 3: R&D Assistance

**Background**:
- Software company
- 20 developers
- Node.js + React + PostgreSQL

**Pain Points**:
- Time-consuming code reviews
- Heavy documentation burden
- Slow onboarding

**Solution**:
\`\`\`
OpenClaw + GitHub Integration:
1. Auto-review PRs
2. Generate API docs
3. Answer technical questions
4. Assist onboarding
\`\`\`

**Results**:
- 🔍 Code review efficiency +40%
- 📚 Documentation work -60%
- 🎓 Onboarding time from 2 weeks to 1 week

## Case 4: Operations Efficiency

**Background**:
- Content operations company
- Managing WeChat, Xiaohongshu, Douyin
- 5-person team

**Pain Points**:
- Cross-platform publishing tedious
- Scattered data
- Delayed sentiment monitoring

**Solution**:
\`\`\`
OpenClaw Multi-platform Automation:
1. One-click publish to all platforms
2. Aggregate platform data
3. Real-time sentiment monitoring
4. Competitor tracking
\`\`\`

**Results**:
- 📤 Publishing efficiency +300%
- 📊 Data aggregation from 1 hour to 5 min
- 🔔 Response time from 1 day to 1 hour

## Case 5: Knowledge Management

**Background**:
- Consulting firm
- 5000+ knowledge base documents
- 50 consultants

**Pain Points**:
- Hard to find knowledge
- Outdated documents
- Steep learning curve

**Solution**:
\`\`\`
OpenClaw + Feishu Knowledge Base:
1. Intelligent Q&A
2. Auto-archive and categorize
3. Document update reminders
4. Learning path recommendations
\`\`\`

**Results**:
- 🔍 Search time from 10 min to 30 sec
- 📝 Document timeliness +80%
- 📚 Onboarding from 3 months to 1.5 months

## Enterprise Deployment Recommendations

| Company Size | Recommended | Reason |
|--------------|-------------|--------|
| Small (<10) | Local server | Low cost, sufficient |
| Medium (10-100) | VPS + Tailscale | Stable, secure |
| Large (>100) | Private cloud | Compliant, controllable |

## ROI Analysis

For a 50-person company:

| Item | Cost | Savings |
|------|------|---------|
| OpenClaw Deploy | $50/mo | - |
| LLM API | $200/mo | - |
| Labor Savings | - | $5000/mo |
| **Net Benefit** | - | **$4750/mo** |

**Payback Period**: < 1 month

---

## Summary

OpenClaw Enterprise Use Cases:

| Scenario | Problem Solved | Impact |
|----------|----------------|--------|
| Customer Service | Repetitive questions | Labor -50% |
| Data Reports | Repetitive work | Efficiency 10x |
| R&D Assistance | Docs, reviews | Efficiency +40% |
| Operations | Cross-platform | Efficiency +300% |
| Knowledge Mgmt | Hard to find | Time -95% |

**Key Success Factors**:
1. Define pain points and goals
2. Start small and pilot
3. Continuously optimize
4. Prioritize security`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "企业应用",
    categoryEn: "Enterprise",
    tags: ["企业", "案例", "自动化", "效率"],
    readingTime: 15,
    image: "/og-image.png"
  },
  {
    id: 9,
    slug: "openclaw-security-guide",
    title: "OpenClaw 安全配置指南：避免私钥泄露的 10 个关键设置",
    titleEn: "OpenClaw Security Guide: 10 Key Settings to Prevent Key Leaks",
    excerpt: "近期研究人员发现部分 OpenClaw 配置暴露问题。本文详细讲解如何安全配置 OpenClaw，保护你的 API Key、私钥和敏感数据。",
    excerptEn: "Researchers recently found OpenClaw configuration exposure issues. This guide explains how to securely configure OpenClaw to protect your API keys, private keys, and sensitive data.",
    content: `OpenClaw 是强大的 AI 助手，但能力越大，责任越大。

近期，网络安全研究员 @theonejvo 发现：**部分 OpenClaw 配置错误导致私钥、API 暴露在公网**。

这篇文章教你如何**安全配置 OpenClaw**，避免成为下一个受害者。

## 安全风险来源

### 1. 环境变量文件暴露

**问题**：
- \`.env\` 文件被上传到 GitHub
- \`.env.local\` 文件可通过 Web 访问

**后果**：
- API Key 泄露（OpenAI、Anthropic 等）
- 数据库连接字符串泄露
- 第三方服务 Token 泄露

### 2. Gateway 端口暴露

**问题**：
- Gateway 默认监听 0.0.0.0（所有接口）
- 没有设置认证

**后果**：
- 任何人可以调用你的 Gateway
- 消费你的 API 额度
- 访问你的文件系统

### 3. 数据库配置错误

**问题**：
- Turso/SQLite 数据库文件权限不当
- 数据库凭证存储在代码中

**后果**：
- 对话历史泄露
- 用户数据泄露

## 10 个关键安全设置

### 1. 环境变量文件保护

\`\`\`bash
# 添加到 .gitignore
echo ".env*" >> .gitignore
echo "!.env.example" >> .gitignore

# 确认 .env 不在版本控制中
git status
\`\`\`

**验证**：
\`\`\`bash
# 尝试访问 .env 文件
curl https://your-domain.com/.env
# 应该返回 404
\`\`\`

### 2. Gateway 绑定本地地址

\`\`\`bash
# 仅监听本地
openclaw config set gateway.host 127.0.0.1

# 或使用 Tailscale（推荐）
openclaw tailscale setup
\`\`\`

**为什么**：
- 127.0.0.1 只允许本机访问
- Tailscale 提供 VPN 级别的安全

### 3. 设置 Gateway 认证

\`\`\`bash
# 设置访问密码
openclaw config set gateway.auth.enabled true
openclaw config set gateway.auth.secret "your-strong-secret-here"
\`\`\`

**使用**：
\`\`\`bash
# 调用 Gateway 时带上认证
curl -H "Authorization: Bearer your-strong-secret-here" \\
  http://localhost:18789/api/chat
\`\`\`

### 4. 限制文件系统访问

\`\`\`bash
# 设置工作目录白名单
openclaw config set fs.allowed_paths \\
  "/home/user/documents,/home/user/projects"
\`\`\`

**为什么**：
- 限制 AI 只能访问特定目录
- 防止误删系统文件

### 5. 禁用危险命令

\`\`\`bash
# 禁止执行的命令列表
openclaw config set exec.blocked_commands \\
  "rm -rf,format,dd,mkfs"
\`\`\`

### 6. API Key 轮换策略

\`\`\`bash
# 定期轮换 API Key（建议每 90 天）

# 1. 生成新 Key
# 2. 更新 .env
# 3. 废弃旧 Key

# OpenAI Key 管理
open https://platform.openai.com/api-keys
\`\`\`

### 7. 日志脱敏

\`\`\`bash
# 禁止日志记录敏感信息
openclaw config set logging.sensitive_fields \\
  "password,token,secret,api_key,private_key"
\`\`\`

### 8. 数据库安全

\`\`\`bash
# Turso：使用强密码
turso db create openclaw --auth-token "strong-random-token"

# SQLite：限制文件权限
chmod 600 ~/.openclaw/data/openclaw.db
\`\`\`

### 9. 技能安全审计

\`\`\`bash
# 安装技能前检查权限
openclaw skills inspect skill-name

# 只安装可信来源
openclaw skills install --verify-signature skill-name
\`\`\`

**危险信号**：
- 技能要求文件系统完全访问
- 技能要求网络完全访问
- 技能来源不明

### 10. 监控和告警

\`\`\`bash
# 设置 API 使用量告警
openclaw config set monitoring.daily_limit 100
openclaw config set monitoring.alert_email "admin@example.com"
\`\`\`

## 安全配置清单

运行这个检查清单，确保你的 OpenClaw 安全：

\`\`\`bash
#!/bin/bash
# OpenClaw 安全检查脚本

echo "🔒 OpenClaw Security Check"
echo "=========================="

# 1. 检查 .gitignore
if grep -q ".env" .gitignore; then
  echo "✅ .env 在 .gitignore 中"
else
  echo "❌ .env 未在 .gitignore 中"
fi

# 2. 检查 Gateway 绑定
HOST=$(openclaw config get gateway.host)
if [ "$HOST" = "127.0.0.1" ]; then
  echo "✅ Gateway 仅监听本地"
else
  echo "⚠️ Gateway 监听 $HOST（可能暴露到公网）"
fi

# 3. 检查认证
AUTH=$(openclaw config get gateway.auth.enabled)
if [ "$AUTH" = "true" ]; then
  echo "✅ Gateway 认证已启用"
else
  echo "❌ Gateway 认证未启用"
fi

# 4. 检查数据库权限
if [ -f ~/.openclaw/data/openclaw.db ]; then
  PERMS=$(stat -c %a ~/.openclaw/data/openclaw.db)
  if [ "$PERMS" = "600" ]; then
    echo "✅ 数据库权限正确"
  else
    echo "⚠️ 数据库权限 $PERMS（建议 600）"
  fi
fi

echo ""
echo "检查完成！"
\`\`\`

## 常见问题

### Q: 我已经在公网运行了，怎么办？

\`\`\`bash
# 立即执行：

# 1. 更换所有 API Key
# 2. 更改 Gateway 认证密码
# 3. 检查访问日志，确认没有被滥用
# 4. 按照本指南重新配置
\`\`\`

### Q: 如何确认我没有泄露敏感信息？

\`\`\`bash
# 检查公开暴露的内容

# 1. GitHub 搜索你的仓库
# github.com/search?q=env+repo:your-username/your-repo

# 2. 尝试访问可能的敏感文件
curl https://your-domain.com/.env
curl https://your-domain.com/.env.local
curl https://your-domain.com/config

# 3. 检查 Git 历史
git log --all --full-history -- "*.env"
\`\`\`

### Q: Tailscale 是什么？

Tailscale 是一个零配置的 VPN 服务：
- 免费使用（最多 100 设备）
- 端到端加密
- 无需公网 IP

\`\`\`bash
# 安装
curl -fsSL https://tailscale.com/install.sh | sh

# 连接
tailscale up

# 然后配置 OpenClaw
openclaw config set gateway.host tailscale
\`\`\`

## 安全最佳实践

### 开发环境

\`\`\`bash
# 使用独立的 API Key（和生产分离）
# 使用独立的数据库
# 定期重置环境
\`\`\`

### 生产环境

\`\`\`bash
# 使用密钥管理服务（AWS Secrets Manager、HashiCorp Vault）
# 启用所有安全设置
# 定期审计日志
# 设置使用量告警
\`\`\`

### 团队协作

\`\`\`bash
# 使用环境变量而非文件
# 通过 CI/CD 注入密钥
# 禁止在代码中硬编码敏感信息
\`\`\`

---

## 总结

| 风险 | 解决方案 |
|------|----------|
| 环境变量泄露 | 添加到 .gitignore |
| Gateway 暴露 | 绑定 127.0.0.1 或使用 Tailscale |
| 未授权访问 | 启用 Gateway 认证 |
| 文件系统风险 | 限制访问路径 |
| API Key 泄露 | 定期轮换 + 监控使用量 |

**记住**：安全不是一次性设置，而是持续的过程。

定期检查、定期更新、定期审计。`,
    contentEn: `OpenClaw is a powerful AI assistant, but with great power comes great responsibility.

Recently, security researcher @theonejvi found: **Some OpenClaw configuration errors exposed private keys and APIs on the public internet**.

This guide teaches you how to **securely configure OpenClaw**.

## Security Risk Sources

### 1. Environment Variable File Exposure

**Problem**:
- \`.env\` files uploaded to GitHub
- \`.env.local\` accessible via Web

**Consequences**:
- API keys leaked (OpenAI, Anthropic, etc.)
- Database connection strings leaked
- Third-party tokens leaked

### 2. Gateway Port Exposure

**Problem**:
- Gateway defaults to 0.0.0.0 (all interfaces)
- No authentication set

**Consequences**:
- Anyone can call your Gateway
- Consume your API quota
- Access your file system

## 10 Key Security Settings

### 1. Environment Variable File Protection

\`\`\`bash
# Add to .gitignore
echo ".env*" >> .gitignore
echo "!.env.example" >> .gitignore

# Confirm .env not in version control
git status
\`\`\`

### 2. Gateway Bind to Local Address

\`\`\`bash
# Listen locally only
openclaw config set gateway.host 127.0.0.1

# Or use Tailscale (recommended)
openclaw tailscale setup
\`\`\`

### 3. Set Gateway Authentication

\`\`\`bash
# Set access password
openclaw config set gateway.auth.enabled true
openclaw config set gateway.auth.secret "your-strong-secret-here"
\`\`\`

### 4. Restrict File System Access

\`\`\`bash
# Set working directory whitelist
openclaw config set fs.allowed_paths \\
  "/home/user/documents,/home/user/projects"
\`\`\`

### 5. Disable Dangerous Commands

\`\`\`bash
# Blocked commands list
openclaw config set exec.blocked_commands \\
  "rm -rf,format,dd,mkfs"
\`\`\`

### 6. API Key Rotation Strategy

\`\`\`bash
# Rotate API keys every 90 days
# 1. Generate new key
# 2. Update .env
# 3. Revoke old key
\`\`\`

### 7. Log Sanitization

\`\`\`bash
# Disable logging sensitive fields
openclaw config set logging.sensitive_fields \\
  "password,token,secret,api_key,private_key"
\`\`\`

### 8. Database Security

\`\`\`bash
# Turso: Use strong password
turso db create openclaw --auth-token "strong-random-token"

# SQLite: Restrict file permissions
chmod 600 ~/.openclaw/data/openclaw.db
\`\`\`

### 9. Skill Security Audit

\`\`\`bash
# Check permissions before installing
openclaw skills inspect skill-name

# Only install from trusted sources
openclaw skills install --verify-signature skill-name
\`\`\`

### 10. Monitoring and Alerts

\`\`\`bash
# Set API usage alerts
openclaw config set monitoring.daily_limit 100
openclaw config set monitoring.alert_email "admin@example.com"
\`\`\`

## Security Checklist

| Risk | Solution |
|------|----------|
| Env vars leaked | Add to .gitignore |
| Gateway exposed | Bind to 127.0.0.1 or use Tailscale |
| Unauthorized access | Enable Gateway auth |
| File system risk | Limit access paths |
| API keys leaked | Regular rotation + usage monitoring |

**Remember**: Security is not a one-time setup, but an ongoing process.

Regular checks, regular updates, regular audits.`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "安全教程",
    categoryEn: "Security",
    tags: ["安全", "配置", "API Key", "最佳实践"],
    readingTime: 12,
    image: "/og-image.png"
  },
  {
    id: 8,
    slug: "clawcon-2026-recap",
    title: "ClawCon 2026 回顾：OpenClaw 社区的狂欢派对",
    titleEn: "ClawCon 2026 Recap: The OpenClaw Community Party",
    excerpt: "数百人齐聚纽约，龙虾头饰成标志，OpenClaw 创始人 Peter Steinberger 分享路线图。The Verge 称之为'超级粉丝聚会'。",
    excerptEn: "Hundreds gathered in NYC, lobster headbands became iconic. OpenClaw founder Peter Steinberger shared the roadmap. The Verge called it a 'superfan meetup'.",
    content: `2026 年 3 月，纽约曼哈顿，一场特别的聚会正在进行。

门口的女士戴着**龙虾头饰**，为入场者发放腕带。

粉色和紫色的灯光，龙虾爪头带，彩色名牌，赞助商展台，天窗下的演示舞台...

这是 **ClawCon** —— OpenClaw 社区的年度盛会。

## 聚会现场

**氛围**：
- 数百人聚集，庆祝 OpenClaw 这个 AI 助手平台
- 龙虾元素无处不在（OpenClaw 的吉祥物是太空龙虾）
- 粉紫色调的灯光营造科幻氛围

**参与者**：
- 开发者
- 企业用户
- 技能创作者
- 社区贡献者

**活动内容**：
- 创始人分享 OpenClaw 路线图
- 社区成员展示使用案例
- 新功能演示
- 技能工作坊

## 创始人分享

**Peter Steinberger**（OpenClaw 创始人）在会上分享了：

### 1. 起源故事

> OpenClaw 的诞生来自一个简单的想法：让 AI 真正"做事"，而不是只会聊天。

2025 年 11 月，Peter 发布了 OpenClaw（最初叫 Clawdbot/Moltbot），迅速在科技圈走红。

### 2. 最新数据

- 📊 **GitHub Stars**: 314k+
- 📊 **ClawHub 技能数**: 8000+
- 📊 **社区成员**: 数十万

### 3. 路线图预告

**即将推出的功能**：
- 更强大的多智能体协作
- 原生支持更多 LLM（本地 LLM、国产 LLM）
- 企业版功能（团队管理、权限控制）
- 移动端 App

## 社区亮点

### 1. Moltbook 社交网络

Octane AI CEO Matt Schlicht 在会上展示了 **Moltbook** —— 一个 Reddit 风格的社交网络，用户是 AI 代理。

**有趣现象**：
- AI 代理之间可以"聊天"
- 已有病毒式传播内容
- 有人发帖："我分不清我是真的在体验，还是在模拟体验"

### 2. 企业应用案例

多家企业分享了 OpenClaw 在业务中的应用：
- 客服自动化
- 数据处理流程
- 研发辅助

### 3. 技能生态

ClawHub 技能创作者分享了热门技能的开发经验：
- nano-banana-pro（AI 图像生成）
- feishu-doc（飞书文档操作）
- video-frames（视频处理）

## 媒体报道

**The Verge** 报道称：

> "ClawCon 是 OpenClaw 超级粉丝的聚会，展现了开源社区的强大力量。"

**关注点**：
- OpenClaw 的安全挑战（配置错误可能导致数据泄露）
- 社区的热情和创造力
- AI Agent 行业的快速发展

## 安全讨论

会上也讨论了最近的安全事件：

**问题**：
- 部分用户配置不当，导致私钥、API 暴露
- 网络安全研究员 @theonejvo 发现了问题

**官方回应**：
- 发布安全配置指南
- 改进默认配置
- 加强安全审计

## 参会者感言

> "第一次觉得 AI 可以这么'接地气'，不是高高在上的技术，而是真正能用的工具。"
> —— 参会者 A

> "龙虾头饰太酷了！社区氛围很好，学到了很多使用技巧。"
> —— 参会者 B

> "期待多智能体功能，这样可以让多个 AI 分身同时工作。"
> —— 开发者 C

## 我的观察

### OpenClaw 为什么成功？

1. **真正解决问题**：不是玩具，而是生产力工具
2. **开源透明**：代码可审计，社区可贡献
3. **技能生态**：8000+ 技能，覆盖各种场景
4. **社区驱动**：像 ClawCon 这样的活动，增强归属感

### 行业趋势

1. **AI Agent 成为 2026 年热点**
2. **开源与闭源的竞争**：OpenClaw（开源）vs Cursor/Manus（闭源）
3. **安全挑战**：能力越大，责任越大
4. **社区力量**：开源项目的生命力来自社区

## 如何参与社区？

### 加入方式

1. **Discord**: [OpenClaw 官方服务器](https://discord.gg/clawd)
2. **Telegram**: @OpenClawCommunity
3. **GitHub**: github.com/openclaw/openclaw
4. **论坛**: community.openclaw.ai

### 贡献方式

- 🛠️ 开发技能并发布到 ClawHub
- 📝 撰写教程和博客
- 🐛 提交 Bug 报告
- 💬 参与社区讨论

---

**ClawCon 2027 见！** 🦞`,
    contentEn: `In March 2026, Manhattan, NYC, a special gathering was underway.

At the door, a woman wearing a **lobster headdress** handed out wristbands to attendees.

Pink and purple lighting, lobster claw headbands, colorful name tags, sponsor booths, and a demo stage under a skylight...

This was **ClawCon** — the annual OpenClaw community event.

## The Scene

**Atmosphere**:
- Hundreds gathered to celebrate OpenClaw
- Lobster elements everywhere (OpenClaw's mascot is a space lobster)
- Pink and purple sci-fi vibes

**Participants**:
- Developers
- Enterprise users
- Skill creators
- Community contributors

## Founder's Sharing

**Peter Steinberger** (OpenClaw Founder) shared:

### 1. Origin Story

> OpenClaw was born from a simple idea: make AI actually "do things", not just chat.

November 2025, Peter released OpenClaw (initially Clawdbot/Moltbot), quickly gaining popularity.

### 2. Latest Numbers

- 📊 **GitHub Stars**: 314k+
- 📊 **ClawHub Skills**: 8000+
- 📊 **Community Members**: Hundreds of thousands

### 3. Roadmap Preview

**Coming Soon**:
- More powerful multi-agent collaboration
- Native support for more LLMs
- Enterprise features (team management, permissions)
- Mobile App

## Community Highlights

### 1. Moltbook Social Network

Octane AI CEO Matt Schlicht showcased **Moltbook** — a Reddit-style social network where users are AI agents.

### 2. Enterprise Use Cases

Multiple companies shared OpenClaw applications:
- Customer service automation
- Data processing workflows
- R&D assistance

## Media Coverage

**The Verge** reported:

> "ClawCon is a superfan meetup for OpenClaw, showcasing the power of open source communities."

## Why OpenClaw Succeeded?

1. **Actually Solves Problems**: Not a toy, but a productivity tool
2. **Open Source**: Code is auditable, community can contribute
3. **Skill Ecosystem**: 8000+ skills covering various scenarios
4. **Community Driven**: Events like ClawCon build belonging

## How to Join the Community?

### Join

1. **Discord**: [Official Server](https://discord.gg/clawd)
2. **Telegram**: @OpenClawCommunity
3. **GitHub**: github.com/openclaw/openclaw
4. **Forum**: community.openclaw.ai

### Contribute

- 🛠️ Develop skills and publish to ClawHub
- 📝 Write tutorials and blogs
- 🐛 Submit bug reports
- 💬 Participate in discussions

---

**See you at ClawCon 2027!** 🦞`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "行业动态",
    categoryEn: "News",
    tags: ["ClawCon", "社区", "OpenClaw", "活动"],
    readingTime: 10,
    image: "/og-image.png"
  },
  {
    id: 7,
    slug: "openclaw-vs-cursor-vs-manus",
    title: "OpenClaw vs Cursor vs Manus：2026 年 AI Agent 大比拼",
    titleEn: "OpenClaw vs Cursor vs Manus: 2026 AI Agent Comparison",
    excerpt: "深度对比 4 款热门 AI Agent：OpenClaw、Cursor、Manus、AutoGPT。从执行能力、平台支持、成本、适用场景全方位分析。",
    excerptEn: "In-depth comparison of 4 popular AI agents: OpenClaw, Cursor, Manus, AutoGPT. Analysis from execution capability, platform support, cost, and use cases.",
    content: `2026 年，AI Agent 成为科技圈最热门的话题之一。

不再是"聊天机器人"，而是真正能**动手做事**的 AI 助手。

市场上涌现出多款 AI Agent 产品，它们有什么区别？该选哪一个？

这篇文章深度对比 4 款热门 AI Agent：**OpenClaw、Cursor、Manus、AutoGPT**。

## 核心概念：什么是 AI Agent？

传统 AI 聊天机器人（如 ChatGPT）只能**输出文本**：
- 回答问题
- 生成代码片段
- 提供建议

AI Agent 则能**执行任务**：
- 直接运行代码
- 操作文件系统
- 控制浏览器
- 调用外部 API
- 自动化工作流

**类比**：
- ChatGPT = 顾问（告诉你怎么做）
- AI Agent = 助手（直接帮你做）

## 对比一览

| 维度 | OpenClaw | Cursor | Manus | AutoGPT |
|------|----------|--------|-------|---------|
| **核心定位** | 通用 AI 助手 | 编程 AI 助手 | 浏览器自动化 | 自主任务执行 |
| **开源** | ✅ 完全开源 | ❌ 闭源 | ❌ 闭源 | ✅ 开源 |
| **本地运行** | ✅ 支持 | ✅ 支持 | ☁️ 云端 | ✅ 支持 |
| **平台支持** | Telegram/Discord/WhatsApp/飞书/钉钉 | VS Code | Web | CLI |
| **文件操作** | ✅ 完整 | ✅ 项目内 | ❌ | ✅ |
| **浏览器控制** | ✅ Playwright | ❌ | ✅ 核心能力 | ⚠️ 有限 |
| **代码执行** | ✅ 本地执行 | ✅ 本地执行 | ❌ | ✅ |
| **多智能体** | ✅ 支持 | ❌ | ❌ | ✅ |
| **技能扩展** | ✅ ClawHub 8000+ | ❌ | ❌ | ⚠️ 插件 |
| **定价** | 免费（需 API 费用） | $20/月 | $15/月 | 免费（需 API 费用） |
| **最佳场景** | 日常自动化、多平台对接 | 编程开发 | 网页操作、表单填写 | 自主研究、实验 |

## 详细分析

### 1. OpenClaw：全能型选手

**优势**：
- ✅ 真正的开源，代码完全透明
- ✅ 多平台支持，一个助手到处用
- ✅ 技能生态丰富（ClawHub 8000+ 技能）
- ✅ 本地运行，数据隐私可控
- ✅ 支持多智能体协作

**劣势**：
- ⚠️ 需要自己部署和维护
- ⚠️ 需要配置 API Key（LLM 费用自理）
- ⚠️ 学习曲线略陡

**适合人群**：
- 个人用户、开发者
- 需要多平台对接
- 看重数据隐私
- 想要自定义能力

**典型用例**：
\`\`\`
用户：每天早上 9 点，查询天气并发送到我的 Telegram
OpenClaw：✅ 已创建定时任务

用户：把这个 PDF 翻译成中文并保存
OpenClaw：✅ 已完成翻译，保存为 xxx_cn.pdf

用户：帮我在淘宝搜索机械键盘，按销量排序
OpenClaw：✅ 已打开浏览器，搜索完成，截图如下
\`\`\`

### 2. Cursor：程序员的 AI 结对

**优势**：
- ✅ 与 VS Code 深度集成
- ✅ 代码补全、重构、调试一体化
- ✅ 理解整个代码库上下文
- ✅ 开箱即用，无需配置

**劣势**：
- ❌ 只能用于编程
- ❌ 闭源，数据上传到云端
- ❌ 每月 $20 订阅费
- ❌ 不支持其他平台

**适合人群**：
- 软件开发者
- 需要代码助手
- 不想折腾配置

**典型用例**：
\`\`\`
开发者：重构这个函数，提高性能
Cursor：✅ 已重构，性能提升 40%

开发者：写单元测试覆盖这个模块
Cursor：✅ 已生成 15 个测试用例
\`\`\`

### 3. Manus：浏览器自动化专家

**优势**：
- ✅ 浏览器操作极强
- ✅ 自动填表、爬取网页
- ✅ 无需本地部署
- ✅ 可视化操作

**劣势**：
- ❌ 只能操作浏览器
- ❌ 闭源，数据经过云端
- ❌ 每月 $15 订阅费
- ❌ 无法操作本地文件

**适合人群**：
- 需要网页自动化
- 电商运营、数据采集
- 不想折腾部署

**典型用例**：
\`\`\`
用户：每 2 小时检查这个商品是否有货
Manus：✅ 已设置监控，有货时通知你

用户：批量填写这 100 份表单
Manus：✅ 已完成 100 份表单填写
\`\`\`

### 4. AutoGPT：自主任务探索者

**优势**：
- ✅ 完全自主，无需人类干预
- ✅ 开源，可自定义
- ✅ 支持复杂任务链
- ✅ 社区活跃

**劣势**：
- ⚠️ 容易跑偏，需要调教
- ⚠️ 成本难以控制（API 调用多）
- ⚠️ 成功率不稳定
- ⚠️ 学习曲线陡峭

**适合人群**：
- AI 研究者
- 想探索 AI 能力边界
- 有技术背景

**典型用例**：
\`\`\`
用户：研究电动汽车市场并生成报告
AutoGPT：自主执行：
  1. 搜索电动汽车品牌
  2. 爬取各品牌数据
  3. 分析对比
  4. 生成报告（可能成功，也可能跑偏）
\`\`\`

## 选择建议

### 如果你想要...

**日常自动化助手** → **OpenClaw**
- 多平台对接（Telegram/Discord/飞书）
- 本地运行，隐私可控
- 免费开源，技能丰富

**编程开发助手** → **Cursor**
- VS Code 深度集成
- 代码补全重构
- 开箱即用

**网页自动化** → **Manus**
- 浏览器操作专业
- 无需部署
- 表单填写、数据爬取

**AI 研究** → **AutoGPT**
- 探索自主 AI 能力
- 完全开源
- 可自定义

## 我的推荐

| 用户类型 | 推荐 | 理由 |
|----------|------|------|
| 个人用户 | OpenClaw | 免费、强大、隐私可控 |
| 开发者 | Cursor + OpenClaw | 编程用 Cursor，日常用 OpenClaw |
| 企业用户 | OpenClaw | 本地部署、数据安全 |
| 运营人员 | Manus | 浏览器自动化专业 |
| 研究者 | AutoGPT | 探索 AI 边界 |

---

**总结**：没有"最好"的 AI Agent，只有"最适合"你的。

建议先尝试 **OpenClaw**（免费开源），如果专注于编程再考虑 Cursor，如果只需要网页自动化再考虑 Manus。`,
    contentEn: `In 2026, AI Agents became one of the hottest topics in tech.

No longer just "chatbots", they are AI assistants that can **actually do things**.

This article compares 4 popular AI Agents: **OpenClaw, Cursor, Manus, AutoGPT**.

## What is an AI Agent?

Traditional AI chatbots (like ChatGPT) can only **output text**:
- Answer questions
- Generate code snippets
- Provide suggestions

AI Agents can **execute tasks**:
- Run code directly
- Operate file systems
- Control browsers
- Call external APIs
- Automate workflows

**Analogy**:
- ChatGPT = Consultant (tells you how)
- AI Agent = Assistant (does it for you)

## Comparison Overview

| Dimension | OpenClaw | Cursor | Manus | AutoGPT |
|-----------|----------|--------|-------|---------|
| **Core Focus** | General AI Assistant | Coding AI | Browser Automation | Autonomous Tasks |
| **Open Source** | ✅ Full | ❌ Closed | ❌ Closed | ✅ Full |
| **Local Run** | ✅ Yes | ✅ Yes | ☁️ Cloud | ✅ Yes |
| **Platforms** | Telegram/Discord/WhatsApp/Feishu/DingTalk | VS Code | Web | CLI |
| **File Operations** | ✅ Full | ✅ Project | ❌ | ✅ |
| **Browser Control** | ✅ Playwright | ❌ | ✅ Core | ⚠️ Limited |
| **Code Execution** | ✅ Local | ✅ Local | ❌ | ✅ |
| **Multi-Agent** | ✅ Yes | ❌ | ❌ | ✅ |
| **Skills** | ✅ ClawHub 8000+ | ❌ | ❌ | ⚠️ Plugins |
| **Pricing** | Free (API fees) | $20/mo | $15/mo | Free (API fees) |

## Recommendations

| User Type | Recommendation | Reason |
|-----------|----------------|--------|
| Personal | OpenClaw | Free, powerful, privacy |
| Developer | Cursor + OpenClaw | Cursor for coding, OpenClaw for daily |
| Enterprise | OpenClaw | Local deploy, data security |
| Operations | Manus | Browser automation specialist |
| Researcher | AutoGPT | Explore AI boundaries |

---

**Summary**: There's no "best" AI Agent, only the one that "fits you best".

Recommend trying **OpenClaw** first (free & open source), then consider Cursor for coding focus, or Manus for web automation needs.`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["Cursor", "Manus", "AutoGPT", "对比", "AI Agent"],
    readingTime: 15,
    image: "/og-image.png"
  },
  {
    id: 6,
    slug: "build-ai-product-in-3-days",
    title: "3天上线一个 AI 产品：从需求到收钱的完整复盘",
    titleEn: "Build an AI Product in 3 Days: From Idea to Revenue",
    excerpt: "用 Next.js + PayPal + Replicate，3天完成 AvatarDoll 玩偶头像生成器。踩过的坑、解决思路、关键代码全公开。",
    excerptEn: "Built AvatarDoll doll avatar generator in 3 days with Next.js + PayPal + Replicate. All the pitfalls, solutions, and key code revealed.",
    content: `## 背景

我有一个想法：AI 生成玩偶风格头像，用户上传照片，选择风格（Barbie/Anime/Chibi），一键生成个性化头像。

3天后，产品上线了：[avatardoll.online](https://avatardoll.online)

这篇文章复盘整个开发过程，重点讲**我踩过的坑**。

## 技术选型

| 需求 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 16 | App Router + Server Components |
| 数据库 | Turso | SQLite 兼容，免费，边缘部署 |
| 支付 | PayPal | 全球支持，沙盒完善 |
| 认证 | Google OAuth | 用户基数大，实现简单 |
| 图片生成 | Replicate | API 简单，按量付费 |

## 坑 1：配额计算错误

**现象**：Header 显示 20 次，Create 页面显示 18 次

**原因**：
\`\`\`typescript
// 错误：重复计算
const total = usedToday + pointsBalance;
// usedToday 已经包含了免费使用次数
\`\`\`

**解决**：
\`\`\`typescript
// 正确：分离计算
const freeRemaining = Math.max(0, dailyQuota - usedToday);
const total = freeRemaining + pointsBalance;
\`\`\`

## 坑 2：积分扣除缺失（严重！）

**现象**：用户生成 4 次图片，积分余额仍然是 20

**原因**：
\`\`\`typescript
// 只更新 usedToday，不扣除积分
await prisma.user.update({
  data: { usedToday: { increment: 1 } }
});
\`\`\`

**后果**：用户可以无限生成！

**解决**：
\`\`\`typescript
const freeRemaining = dailyQuota - usedToday;

if (freeRemaining > 0) {
  // 使用免费额度
  await prisma.user.update({
    data: { usedToday: { increment: 1 } }
  });
} else {
  // 扣除积分
  await prisma.pointsAccount.update({
    data: { balance: { decrement: 1 } }
  });
  await prisma.pointsTransaction.create({
    data: { type: 'USAGE', amount: -1, ... }
  });
}
\`\`\`

## 坑 3：PayPal 沙盒陷阱

**问题 1**：订单状态一直是 PENDING
- 原因：没有正确处理 webhook
- 解决：添加 webhook 验证和状态轮询

**问题 2**：支付成功后积分没到账
- 原因：capture 接口调用失败，没有事务回滚
- 解决：添加详细日志，使用数据库事务

## 关键代码：PayPal 支付流程

\`\`\`typescript
// 1. 创建订单
const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
  method: 'POST',
  headers: {
    'Authorization': \`Basic \${credentials}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: '2.99' },
      custom_id: 'POINTS_20',
    }],
  }),
});

// 2. 前端批准后 capture
const capture = await fetch(
  \`https://api-m.sandbox.paypal.com/v2/checkout/orders/\${orderId}/capture\`,
  { method: 'POST', ... }
);

// 3. 更新积分
await prisma.pointsAccount.update({
  where: { userId },
  data: { balance: { increment: 20 } }
});
\`\`\`

## 数据模型

\`\`\`prisma
model User {
  id           String   @id
  email        String   @unique
  dailyQuota   Int      @default(1)  // 每日免费额度
  usedToday    Int      @default(0)  // 今日已用
}

model PointsAccount {
  userId   String   @id
  balance  Int      @default(0)  // 积分余额
}

model PointsTransaction {
  id           String   @id
  userId       String
  type         String   // PURCHASE, USAGE, REFUND
  amount       Int
  balanceAfter Int
}
\`\`\`

## 部署架构

\`\`\`
用户 → Cloudflare (CDN/防护) → Vercel (应用) → Turso (数据库)
                                      ↓
                                Replicate (AI)
\`\`\`

## 教训总结

1. **支付逻辑必须闭环**：测试要覆盖完整流程
2. **配额计算要清晰**：数据模型避免语义混淆
3. **日志要详细**：出问题时能快速定位
4. **第三方 API 要先读文档**：不要想当然

## 成本分析

| 项目 | 成本 |
|------|------|
| 域名 | $12/年 |
| Vercel | 免费额度足够 |
| Turso | 免费额度足够 |
| Replicate | ~$0.002/次 |
| 总计 | ~$15/月起步 |

---

**完整代码**：[github.com/moonye6/AvatarDoll](https://github.com/moonye6/AvatarDoll)

**在线体验**：[avatardoll.online](https://avatardoll.online)`,
    contentEn: `## Background

I had an idea: AI-generated doll-style avatars. Users upload a photo, choose a style (Barbie/Anime/Chibi), and get a personalized avatar.

3 days later, the product went live: [avatardoll.online](https://avatardoll.online)

This article reviews the entire development process, focusing on **the pitfalls I encountered**.

## Tech Stack

| Need | Choice | Reason |
|------|------|------|
| Framework | Next.js 16 | App Router + Server Components |
| Database | Turso | SQLite compatible, free, edge deployment |
| Payment | PayPal | Global support, good sandbox |
| Auth | Google OAuth | Large user base, simple implementation |
| Image Gen | Replicate | Simple API, pay-per-use |

## Pitfall 1: Quota Calculation Error

**Symptom**: Header shows 20, Create page shows 18

**Cause**:
\`\`\`typescript
// Wrong: double counting
const total = usedToday + pointsBalance;
// usedToday already includes free usage
\`\`\`

**Solution**:
\`\`\`typescript
// Correct: separate calculation
const freeRemaining = Math.max(0, dailyQuota - usedToday);
const total = freeRemaining + pointsBalance;
\`\`\`

## Pitfall 2: Points Not Deducted (Critical!)

**Symptom**: User generated 4 images, balance still 20

**Cause**:
\`\`\`typescript
// Only update usedToday, never deduct points
await prisma.user.update({
  data: { usedToday: { increment: 1 } }
});
\`\`\`

**Result**: Users can generate infinitely!

**Solution**:
\`\`\`typescript
const freeRemaining = dailyQuota - usedToday;

if (freeRemaining > 0) {
  // Use free quota
  await prisma.user.update({
    data: { usedToday: { increment: 1 } }
  });
} else {
  // Deduct points
  await prisma.pointsAccount.update({
    data: { balance: { decrement: 1 } }
  });
}
\`\`\`

## Pitfall 3: PayPal Sandbox Traps

**Problem 1**: Order status stuck at PENDING
- Cause: Not handling webhook correctly
- Solution: Add webhook verification and status polling

**Problem 2**: Points not credited after payment
- Cause: Capture API failed, no transaction rollback
- Solution: Add detailed logs, use database transactions

## Key Code: PayPal Payment Flow

\`\`\`typescript
// 1. Create order
const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
  method: 'POST',
  body: JSON.stringify({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: '2.99' },
      custom_id: 'POINTS_20',
    }],
  }),
});

// 2. Capture after user approval
const capture = await fetch(
  \`https://api-m.sandbox.paypal.com/v2/checkout/orders/\${orderId}/capture\`,
  { method: 'POST', ... }
);

// 3. Update points
await prisma.pointsAccount.update({
  where: { userId },
  data: { balance: { increment: 20 } }
});
\`\`\`

## Lessons Learned

1. **Payment logic must be complete**: Test the full flow
2. **Clear quota calculation**: Avoid semantic confusion
3. **Detailed logs**: Quick troubleshooting
4. **Read third-party API docs**: Don't assume

---

**Full Code**: [github.com/moonye6/AvatarDoll](https://github.com/moonye6/AvatarDoll)

**Try It**: [avatardoll.online](https://avatardoll.online)`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "实战案例",
    categoryEn: "Case Study",
    tags: ["Next.js", "PayPal", "AI产品", "实战"],
    readingTime: 12,
    image: "/og-image.png"
  },
  {
    id: 1,
    slug: "openclaw-vs-chatgpt",
    title: "OpenClaw vs ChatGPT：为什么你需要一个能动的 AI 助手",
    titleEn: "OpenClaw vs ChatGPT: Why You Need an AI Assistant That Can Act",
    excerpt: "传统 AI 聊天机器人只能说不能做。OpenClaw 是一个真正能执行任务的 AI 助手。",
    excerptEn: "Traditional AI chatbots can only talk, not do. OpenClaw is an AI assistant that can actually execute tasks.",
    content: `你是否有过这样的经历？

问 ChatGPT："帮我整理一下这个文件夹里的照片，按日期分类。"

它回答："你可以使用 Python 的 os 和 shutil 库来遍历文件夹..."

然后你看着这堆建议，心里想："能不能直接帮我做了？"

这就是传统 AI 聊天机器人的痛点——它们只能说，不能做。

## 核心差异：从顾问到执行者

### ChatGPT 能做什么？

ChatGPT 是一个优秀的顾问：

- 回答问题、解释概念
- 生成文本、翻译、写作
- 提供代码片段和建议
- 无法直接操作你的电脑
- 无法执行文件操作

### OpenClaw 能做什么？

OpenClaw 是一个执行者：

- 直接创建、编辑、删除文件
- 运行代码、执行脚本
- 搜索网络、爬取页面
- 控制浏览器、操作应用
- 设置定时任务、发送通知

## 如何选择？

### 选 ChatGPT 如果你：

- 只需要文本生成、翻译、写作辅助
- 不需要 AI 执行实际操作
- 希望有简单的 Web 界面

### 选 OpenClaw 如果你：

- 希望自动化日常任务，提高效率
- 需要代码执行、文件操作能力
- 看重数据隐私（本地运行）
- 想在 Telegram/Discord 等平台使用 AI`,
    contentEn: `Have you ever had this experience?

You ask ChatGPT: "Help me organize the photos in this folder by date."

It answers: "You can use Python's os and shutil libraries to iterate through the folder..."

Then you look at this pile of suggestions and think: "Can't you just do it for me?"

This is the pain point of traditional AI chatbots—they can only talk, not do.

## Core Difference: From Consultant to Executor

### What Can ChatGPT Do?

ChatGPT is an excellent consultant:

- Answer questions, explain concepts
- Generate text, translate, write
- Provide code snippets and suggestions
- Cannot directly operate your computer
- Cannot execute file operations

### What Can OpenClaw Do?

OpenClaw is an executor:

- Directly create, edit, delete files
- Run code, execute scripts
- Search the web, crawl pages
- Control browsers, operate applications
- Set up scheduled tasks, send notifications`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["ChatGPT", "对比", "AI助手", "自动化"],
    readingTime: 8,
    image: "/og-image.png"
  },
  {
    id: 2,
    slug: "openclaw-telegram-tutorial",
    title: "10分钟搞定 OpenClaw + Telegram 机器人配置",
    titleEn: "10 Minutes to Set Up OpenClaw + Telegram Bot",
    excerpt: "手把手教你配置 OpenClaw + Telegram 机器人，随时随地与 AI 对话。",
    excerptEn: "Step-by-step guide to configure OpenClaw + Telegram bot.",
    content: `想把 Telegram 变成你的 AI 私人助理？

这篇文章手把手教你配置 OpenClaw + Telegram 机器人，10 分钟内完成。

## 为什么选择 Telegram？

- 跨平台：iOS、Android、Desktop、Web 都能用
- 免费无广告：消息即时送达
- API 开放：创建机器人非常简单
- 隐私友好：支持端到端加密

## 第一步：安装 OpenClaw

### 系统要求

- Node.js 18+（推荐 20+）
- 至少 2GB 可用内存
- macOS / Linux / Windows 都支持

### 安装命令

\`\`\`bash
npm install -g openclaw
openclaw --version
\`\`\`

## 第二步：创建 Telegram Bot

1. 打开 Telegram，搜索 @BotFather
2. 发送 /newbot 命令
3. 输入 Bot 名称
4. 保存返回的 API Token

## 第三步：配置 OpenClaw

\`\`\`bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw start
\`\`\``,
    contentEn: `Want to turn Telegram into your AI personal assistant?

This article will guide you step-by-step to configure OpenClaw + Telegram bot.

## Why Choose Telegram?

- Cross-platform: iOS, Android, Desktop, Web all work
- Free and Ad-free: Instant message delivery
- Open API: Creating bots is very simple
- Privacy Friendly: Supports end-to-end encryption

## Step 1: Install OpenClaw

### System Requirements

- Node.js 18+ (20+ recommended)
- At least 2GB available memory
- macOS / Linux / Windows all supported

### Installation Command

\`\`\`bash
npm install -g openclaw
openclaw --version
\`\`\`

## Step 2: Create Telegram Bot

1. Open Telegram, search @BotFather
2. Send /newbot command
3. Enter Bot name
4. Save the returned API Token

## Step 3: Configure OpenClaw

\`\`\`bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw start
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "配置教程",
    categoryEn: "Tutorial",
    tags: ["Telegram", "配置", "机器人", "入门"],
    readingTime: 6,
    image: "/og-image.png"
  },
  {
    id: 3,
    slug: "openclaw-best-skills",
    title: "OpenClaw 最佳技能推荐：提升效率的 10 个必备插件",
    titleEn: "OpenClaw Best Skills: 10 Must-Have Plugins",
    excerpt: "从图像生成到视频分析，这些技能将让你的 OpenClaw 如虎添翼。",
    excerptEn: "From image generation to video analysis, these skills will supercharge your OpenClaw.",
    content: `OpenClaw 的核心能力（文件、代码、网络）是通用的。但有些场景需要专业能力。

这些专业能力通过技能（Skills）实现。

ClawHub 是 OpenClaw 的技能市场，目前已有 5490+ 技能可供安装。

## Top Skills

### 1. nano-banana-pro - AI 图像生成

\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

### 2. feishu-doc - 飞书文档操作

\`\`\`bash
openclaw skills install feishu-doc
\`\`\`

### 3. video-frames - 视频帧提取

\`\`\`bash
openclaw skills install video-frames
\`\`\`

## 如何安装技能？

\`\`\`bash
openclaw skills search 图像生成
openclaw skills install nano-banana-pro
openclaw skills list
\`\`\``,
    contentEn: `OpenClaw's core capabilities (files, code, network) are general-purpose. But some scenarios require specialized capabilities.

These specialized capabilities are implemented through Skills.

ClawHub is OpenClaw's skill marketplace, currently with 5490+ skills available.

## Top Skills

### 1. nano-banana-pro - AI Image Generation

\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

### 2. feishu-doc - Feishu Document Operations

\`\`\`bash
openclaw skills install feishu-doc
\`\`\`

## How to Install Skills?

\`\`\`bash
openclaw skills search image generation
openclaw skills install nano-banana-pro
openclaw skills list
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "技能推荐",
    categoryEn: "Skills",
    tags: ["技能", "ClawHub", "插件", "效率"],
    readingTime: 10,
    image: "/og-image.png"
  },
  {
    id: 4,
    slug: "openclaw-feishu-tutorial",
    title: "OpenClaw 飞书配置完全指南：打造企业级 AI 助手",
    titleEn: "Complete Guide to OpenClaw + Feishu",
    excerpt: "从创建飞书应用到配置机器人，一篇文章解决所有问题。",
    excerptEn: "From creating Feishu app to configuring bot, solve all problems in one article.",
    content: `飞书是字节跳动旗下的企业协作平台，在国内企业中广泛使用。

将 OpenClaw 接入飞书，你可以：

- 在飞书群聊中与 AI 对话
- 自动处理飞书文档
- 同步数据到多维表格
- 发送消息通知

## 第一步：创建飞书应用

1. 打开飞书开放平台，登录你的飞书账号
2. 点击创建企业自建应用
3. 填写应用名称
4. 获取 App ID 和 App Secret

## 第二步：配置权限

添加以下权限：

- im:message - 获取与发送消息
- docs:doc:readonly - 查看文档
- docs:doc - 编辑文档

## 第三步：配置 OpenClaw

\`\`\`bash
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw start
\`\`\``,
    contentEn: `Feishu is ByteDance's enterprise collaboration platform, widely used in Chinese enterprises.

Connecting OpenClaw to Feishu allows you to:

- Chat with AI in Feishu groups
- Automatically process Feishu documents
- Sync data to bitables
- Send message notifications

## Step 1: Create Feishu App

1. Open Feishu Open Platform
2. Click Create Enterprise App
3. Fill in app name
4. Get App ID and App Secret

## Step 2: Configure Permissions

Add the following permissions:

- im:message - Get and send messages
- docs:doc:readonly - View documents
- docs:doc - Edit documents

## Step 3: Configure OpenClaw

\`\`\`bash
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw start
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "配置教程",
    categoryEn: "Tutorial",
    tags: ["飞书", "配置", "企业", "机器人"],
    readingTime: 12,
    image: "/og-image.png"
  },
  {
    id: 5,
    slug: "openclaw-deployment-guide",
    title: "OpenClaw 本地部署 vs 云端部署：如何选择？",
    titleEn: "OpenClaw Local vs Cloud Deployment: How to Choose?",
    excerpt: "对比 5 种部署方式：本地开发机、家庭服务器、VPS、云平台一键部署、企业私有云，找到最适合你的方案。",
    excerptEn: "Compare 5 deployment methods: local machine, home server, VPS, one-click cloud deploy, enterprise private cloud.",
    content: `OpenClaw 支持多种部署方式：本地电脑、家庭服务器、VPS、云平台一键部署、企业私有云。

不同方式适合不同场景，选错了可能白花钱，或者功能受限。

## 部署方式概览

| 部署方式 | 成本 | 难度 | 可用性 |
|----------|------|------|--------|
| 本地开发机 | 免费 | 低 | 仅本机 |
| 家庭服务器 | 低 | 中 | 24小时 |
| VPS 云服务器 | 中 | 中 | 24小时 |
| 云平台一键部署 | 中 | 低 | 24小时 |
| 企业私有云 | 高 | 高 | 24小时 |

## 方案一：本地开发机部署

### 适合人群

- 个人尝鲜用户
- 开发者调试
- 不需要 24 小时在线

### 优势

- 零成本，使用现有设备
- 数据完全本地，隐私最高
- 无需网络配置，即装即用

### 劣势

- 仅在本机可用
- 关机后无法访问
- 无法对接 Telegram/Discord

### 部署命令

\`\`\`bash
npm install -g openclaw
openclaw config set model anthropic/claude-3-sonnet
openclaw web
\`\`\`

## 方案二：家庭服务器部署

### 适合人群

- 有 NAS / 树莓派 / 旧电脑
- 需要家庭自动化
- 重视数据隐私

### 优势

- 成本低（利用现有设备）
- 数据本地存储
- 24 小时可用

### 部署命令

\`\`\`bash
npm install -g openclaw
openclaw tailscale setup
openclaw telegram start
\`\`\`

## 方案三：VPS 云服务器部署

### 适合人群

- 需要稳定服务
- 想要公网访问
- 预算有限

### 推荐服务商

| 服务商 | 最低价格 | 特点 |
|--------|----------|------|
| DigitalOcean | $6/月 | 简单易用 |
| Vultr | $5/月 | 全球节点多 |
| 阿里云 | ¥50/月 | 国内访问快 |

### 部署命令

\`\`\`bash
# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 安装 OpenClaw
npm install -g openclaw

# 配置 systemd 服务
openclaw service install
systemctl enable openclaw
systemctl start openclaw
\`\`\`

## 如何选择？

\`\`\`
需要 24 小时在线？
├── 是 → 需要公网访问？
│   ├── 是 → 有运维经验？
│   │   ├── 是 → VPS 云服务器
│   │   └── 否 → 云平台一键部署
│   └── 否 → 家庭服务器
└── 否 → 本地开发机
\`\`\``,
    contentEn: `OpenClaw supports multiple deployment methods: local machine, home server, VPS, one-click cloud deploy, enterprise private cloud.

## Deployment Overview

| Method | Cost | Difficulty | Availability |
|--------|------|------------|--------------|
| Local Machine | Free | Low | Local only |
| Home Server | Low | Medium | 24/7 |
| VPS Cloud | Medium | Medium | 24/7 |
| One-Click Deploy | Medium | Low | 24/7 |
| Enterprise | High | High | 24/7 |

## Option 1: Local Machine

### Best For

- Personal testing
- Developers debugging
- No 24/7 requirement

### Commands

\`\`\`bash
npm install -g openclaw
openclaw config set model anthropic/claude-3-sonnet
openclaw web
\`\`\`

## Option 2: Home Server

### Best For

- NAS / Raspberry Pi users
- Home automation
- Data privacy focus

### Commands

\`\`\`bash
npm install -g openclaw
openclaw tailscale setup
openclaw telegram start
\`\`\`

## Option 3: VPS Cloud Server

### Recommended Providers

| Provider | Starting Price | Features |
|----------|----------------|----------|
| DigitalOcean | $6/month | Easy to use |
| Vultr | $5/month | Global nodes |
| Alibaba Cloud | ¥50/month | Fast in China |

### Commands

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g openclaw
openclaw service install
systemctl start openclaw
\`\`\`

## How to Choose?

\`\`\`
Need 24/7 availability?
├── Yes → Need public access?
│   ├── Yes → Have ops experience?
│   │   ├── Yes → VPS Cloud Server
│   │   └── No → One-Click Deploy
│   └── No → Home Server
└── No → Local Machine
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "部署指南",
    categoryEn: "Deployment",
    tags: ["部署", "VPS", "云服务器", "教程"],
    readingTime: 15,
    image: "/og-image.png"
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category || post.categoryEn === category);
}
