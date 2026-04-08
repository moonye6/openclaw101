import type { BlogPost } from './types';

// OpenClaw 核心文章 (id 6-16)
export const postsOpenclawCore: BlogPost[] = [
  {
    id: 16,
    slug: "openclaw-api-reference",
    title: "OpenClaw API 完整参考指南：开发者必备手册",
    titleEn: "Complete OpenClaw API Reference: Developer's Essential Guide",
    excerpt: "OpenClaw 提供了完整的 REST API 和 WebSocket API，支持对话管理、技能调用、文件操作等核心功能。本文详细讲解所有 API 端点、请求参数、响应格式和最佳实践。",
    excerptEn: "OpenClaw provides comprehensive REST API and WebSocket API, supporting conversation management, skill invocation, file operations, and more. This guide covers all API endpoints, request parameters, response formats, and best practices.",
    content: `OpenClaw 提供了强大的 API 接口，让开发者可以将其集成到任何应用中。

本文将详细介绍所有 API 端点、参数和使用方法。

## API 基础

### 基础 URL

\`\`\`
http://localhost:3000/api/v1
\`\`\`

生产环境建议使用 HTTPS。

### 认证方式

所有 API 请求需要在 Header 中携带认证信息：

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  http://localhost:3000/api/v1/conversations
\`\`\`

API Key 可以在 Dashboard 的设置页面生成。

---

## 对话 API

### 创建对话

\`\`\`http
POST /api/v1/conversations
\`\`\`

**请求参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 否 | 对话标题 |
| model | string | 否 | 模型 ID，默认使用配置的模型 |
| context | object | 否 | 初始上下文 |
| skills | string[] | 否 | 启用的技能列表 |

**示例**：

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/conversations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "新对话",
    "model": "claude-sonnet-4-6"
  }'
\`\`\`

**响应**：

\`\`\`json
{
  "id": "conv_abc123",
  "title": "新对话",
  "createdAt": "2026-03-29T06:00:00Z",
  "model": "claude-sonnet-4-6"
}
\`\`\`

### 发送消息

\`\`\`http
POST /api/v1/conversations/{id}/messages
\`\`\`

**请求参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 消息内容 |
| role | string | 否 | 角色，默认 "user" |
| stream | boolean | 否 | 是否流式响应 |

**示例**：

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/conversations/conv_abc123/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "帮我写一个 Python 爬虫",
    "stream": false
  }'
\`\`\`

**响应**：

\`\`\`json
{
  "id": "msg_xyz789",
  "role": "assistant",
  "content": "好的，我来帮你写一个 Python 爬虫...",
  "createdAt": "2026-03-29T06:01:00Z"
}
\`\`\`

### 获取对话历史

\`\`\`http
GET /api/v1/conversations/{id}/messages
\`\`\`

**查询参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| limit | number | 返回消息数量，默认 50 |
| before | string | 获取此消息 ID 之前的消息 |
| after | string | 获取此消息 ID 之后的消息 |

---

## 技能 API

### 调用技能

\`\`\`http
POST /api/v1/skills/{skillId}/invoke
\`\`\`

**请求参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| input | any | 是 | 技能输入参数 |
| conversationId | string | 否 | 关联的对话 ID |

**示例**：

\`\`\`bash
# 调用天气技能
curl -X POST http://localhost:3000/api/v1/skills/weather/invoke \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": {
      "city": "北京"
    }
  }'
\`\`\`

### 列出技能

\`\`\`http
GET /api/v1/skills
\`\`\`

**响应**：

\`\`\`json
{
  "skills": [
    {
      "id": "weather",
      "name": "天气查询",
      "description": "获取指定城市的天气信息",
      "version": "1.0.0",
      "enabled": true
    }
  ]
}
\`\`\`

---

## 文件 API

### 上传文件

\`\`\`http
POST /api/v1/files
\`\`\`

**请求格式**：multipart/form-data

**参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| file | File | 上传的文件 |
| conversationId | string | 关联的对话 ID |

**示例**：

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/files \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "conversationId=conv_abc123"
\`\`\`

### 读取文件

\`\`\`http
GET /api/v1/files/{fileId}
\`\`\`

### 删除文件

\`\`\`http
DELETE /api/v1/files/{fileId}
\`\`\`

---

## WebSocket API

### 连接

\`\`\`javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {
  // 发送认证
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_API_KEY'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('收到消息:', data);
};
\`\`\`

### 消息类型

| 类型 | 说明 |
|------|------|
| auth | 认证请求 |
| message | 对话消息 |
| stream | 流式响应 |
| skill | 技能调用结果 |
| error | 错误信息 |

### 流式对话

\`\`\`javascript
ws.send(JSON.stringify({
  type: 'message',
  conversationId: 'conv_abc123',
  content: '帮我写代码',
  stream: true
}));

// 接收流式响应
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'stream') {
    process.stdout.write(data.chunk);
  }
};
\`\`\`

---

## 错误处理

### 错误响应格式

\`\`\`json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "请求参数无效",
    "details": {
      "field": "content",
      "reason": "content 不能为空"
    }
  }
}
\`\`\`

### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| UNAUTHORIZED | 认证失败 | 401 |
| FORBIDDEN | 权限不足 | 403 |
| NOT_FOUND | 资源不存在 | 404 |
| INVALID_REQUEST | 请求参数无效 | 400 |
| RATE_LIMITED | 请求频率超限 | 429 |
| INTERNAL_ERROR | 服务器内部错误 | 500 |

---

## 速率限制

| 端点 | 限制 | 窗口 |
|------|------|------|
| /messages | 60 次 | 1 分钟 |
| /skills/invoke | 30 次 | 1 分钟 |
| /files | 20 次 | 1 分钟 |

超出限制将返回 429 错误。

---

## SDK 使用

### Node.js

\`\`\`bash
npm install @openclaw/sdk
\`\`\`

\`\`\`javascript
import { OpenClaw } from '@openclaw/sdk';

const client = new OpenClaw({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'http://localhost:3000'
});

// 创建对话
const conversation = await client.conversations.create({
  title: 'API 测试'
});

// 发送消息
const response = await client.messages.send({
  conversationId: conversation.id,
  content: '你好！'
});

console.log(response.content);
\`\`\`

### Python

\`\`\`bash
pip install openclaw-sdk
\`\`\`

\`\`\`python
from openclaw import OpenClaw

client = OpenClaw(
    api_key="YOUR_API_KEY",
    base_url="http://localhost:3000"
)

# 创建对话
conversation = client.conversations.create(
    title="API 测试"
)

# 发送消息
response = client.messages.send(
    conversation_id=conversation.id,
    content="你好！"
)

print(response.content)
\`\`\`

---

## 最佳实践

### 1. 使用环境变量存储 API Key

\`\`\`bash
export OPENCLAW_API_KEY=your_key_here
\`\`\`

### 2. 实现错误重试

\`\`\`javascript
async function withRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.code === 'RATE_LIMITED') {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}
\`\`\`

### 3. 流式处理大响应

对于长文本生成，建议使用 WebSocket 流式接收，避免超时。

### 4. 缓存常用结果

对于重复请求（如技能列表），可以在客户端缓存。

---

## 参考资源

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [SDK GitHub](https://github.com/openclaw/openclaw-sdk)
- [API 变更日志](https://docs.openclaw.ai/changelog/api)

---

*最后更新: 2026-03-29*`,
    contentEn: `OpenClaw provides powerful APIs that allow developers to integrate it into any application.

This guide covers all API endpoints, parameters, and usage patterns.

## API Basics

### Base URL

\`\`\`
http://localhost:3000/api/v1
\`\`\`

Use HTTPS in production.

### Authentication

All API requests require authentication in the Header:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  http://localhost:3000/api/v1/conversations
\`\`\`

Generate API Keys in Dashboard settings.

---

## Conversations API

### Create Conversation

\`\`\`http
POST /api/v1/conversations
\`\`\`

**Parameters**:

| Parameter | Type | Required | Description |
|------|------|------|------|
| title | string | No | Conversation title |
| model | string | No | Model ID |
| context | object | No | Initial context |
| skills | string[] | No | Enabled skills list |

**Response**:

\`\`\`json
{
  "id": "conv_abc123",
  "title": "New Conversation",
  "createdAt": "2026-03-29T06:00:00Z",
  "model": "claude-sonnet-4-6"
}
\`\`\`

### Send Message

\`\`\`http
POST /api/v1/conversations/{id}/messages
\`\`\`

**Parameters**:

| Parameter | Type | Required | Description |
|------|------|------|------|
| content | string | Yes | Message content |
| role | string | No | Role, default "user" |
| stream | boolean | No | Stream response |

---

## Skills API

### Invoke Skill

\`\`\`http
POST /api/v1/skills/{skillId}/invoke
\`\`\`

**Example**:

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/skills/weather/invoke \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": {
      "city": "Beijing"
    }
  }'
\`\`\`

### List Skills

\`\`\`http
GET /api/v1/skills
\`\`\`

---

## Files API

### Upload File

\`\`\`http
POST /api/v1/files
\`\`\`

Format: multipart/form-data

---

## WebSocket API

### Connect

\`\`\`javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_API_KEY'
  }));
};
\`\`\`

### Message Types

| Type | Description |
|------|------|
| auth | Authentication |
| message | Conversation message |
| stream | Stream response |
| skill | Skill result |
| error | Error |

---

## Error Handling

### Error Response

\`\`\`json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters"
  }
}
\`\`\`

### Error Codes

| Code | Description | HTTP Status |
|--------|------|-------------|
| UNAUTHORIZED | Authentication failed | 401 |
| FORBIDDEN | Insufficient permissions | 403 |
| NOT_FOUND | Resource not found | 404 |
| INVALID_REQUEST | Invalid parameters | 400 |
| RATE_LIMITED | Rate limit exceeded | 429 |
| INTERNAL_ERROR | Server error | 500 |

---

## Rate Limits

| Endpoint | Limit | Window |
|------|------|------|
| /messages | 60 requests | 1 minute |
| /skills/invoke | 30 requests | 1 minute |
| /files | 20 requests | 1 minute |

---

## SDK Usage

### Node.js

\`\`\`javascript
import { OpenClaw } from '@openclaw/sdk';

const client = new OpenClaw({
  apiKey: 'YOUR_API_KEY'
});

const conversation = await client.conversations.create();
const response = await client.messages.send({
  conversationId: conversation.id,
  content: 'Hello!'
});
\`\`\`

### Python

\`\`\`python
from openclaw import OpenClaw

client = OpenClaw(api_key="YOUR_API_KEY")
conversation = client.conversations.create()
response = client.messages.send(
    conversation_id=conversation.id,
    content="Hello!"
)
\`\`\`

---

*Last updated: 2026-03-29*`,
    author: "OpenClaw 101",
    date: "2026-03-29",
    category: "技术深度",
    categoryEn: "Technical Deep Dive",
    tags: ["API", "开发者", "SDK", "集成"],
    readingTime: 15,
    image: "/images/blog/api-reference.jpg"
  },
  {
    id: 15,
    slug: "openclaw-configuration-guide",
    title: "OpenClaw 配置文件参数详解：从入门到精通",
    titleEn: "OpenClaw Configuration Guide: From Beginner to Expert",
    excerpt: "OpenClaw 的配置文件是定制化 AI 助手的核心。本文详细讲解所有配置参数，包括模型选择、平台对接、技能启用、安全设置等，助你打造专属 AI 助手。",
    excerptEn: "OpenClaw configuration files are the core of customizing your AI assistant. This guide covers all configuration parameters, including model selection, platform integration, skill enablement, and security settings.",
    content: `OpenClaw 的强大之处在于其高度可配置性。

通过配置文件，你可以：
- 选择不同的 AI 模型
- 接入多个消息平台
- 启用/禁用技能
- 调整安全策略
- 自定义行为

本文将详细讲解所有配置参数。

---

## 配置文件结构

### 文件位置与格式

OpenClaw 的主配置文件位于：

\`\`\`
~/.openclaw/openclaw.json
\`\`\`

首次运行 \`openclaw start\` 时会自动创建一个带有默认值的配置文件。你也可以通过命令手动初始化：

\`\`\`bash
# 交互式初始化配置
openclaw init

# 使用指定模板初始化
openclaw init --template team
\`\`\`

配置文件采用 JSON 格式，支持 \`\${ENV_VAR}\` 语法引用环境变量。OpenClaw 在启动时会自动解析这些引用。

### 顶层结构

\`\`\`json
{
  "version": "4.2",
  "providers": { },
  "channels": { },
  "skills": { },
  "security": { },
  "memory": { },
  "logging": { },
  "advanced": { }
}
\`\`\`

每个顶层字段控制一个子系统。下面逐一详解。

---

## 核心配置：模型 Provider

Provider 定义了 AI 模型来源。OpenClaw 支持同时配置多个 Provider 并在运行时灵活切换。

### Anthropic Claude

\`\`\`json
{
  "providers": {
    "anthropic": {
      "type": "anthropic",
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5",
        "smart": "claude-opus-4"
      },
      "maxTokens": 8192,
      "temperature": 0.7
    }
  }
}
\`\`\`

**参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 提供商类型 |
| apiKey | string | API 密钥，支持环境变量引用 |
| models.default | string | 日常对话使用的默认模型 |
| models.fast | string | 快速模型，用于简单任务和低延迟场景 |
| models.smart | string | 智能模型，用于复杂推理和编程任务 |
| maxTokens | number | 单次回复的最大 token 数 |
| temperature | number | 生成温度，0-1 之间 |

### OpenAI

\`\`\`json
{
  "providers": {
    "openai": {
      "type": "openai",
      "apiKey": "\${OPENAI_API_KEY}",
      "baseUrl": "https://api.openai.com/v1",
      "models": {
        "default": "gpt-4-turbo"
      }
    }
  }
}
\`\`\`

### LocalAI（本地模型）

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "models": {
        "default": "llama-3-8b"
      }
    }
  }
}
\`\`\`

### 多 Provider 与优先级

可以同时配置多个 Provider，通过 \`defaultProvider\` 指定默认，并设置自动降级规则：

\`\`\`json
{
  "providers": {
    "anthropic": { },
    "openai": { },
    "localai": { }
  },
  "defaultProvider": "anthropic",
  "fallback": {
    "enabled": true,
    "order": ["anthropic", "openai", "localai"],
    "rules": [
      { "condition": "rate_limit", "action": "next_provider" },
      { "condition": "timeout", "action": "next_provider" }
    ]
  }
}
\`\`\`

---

## 核心配置：API 密钥与安全

**永远不要在配置文件中硬编码 API 密钥**。使用环境变量引用：

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}"
    }
  }
}
\`\`\`

OpenClaw 还支持从 \`.env\` 文件加载：

\`\`\`bash
# ~/.openclaw/.env
ANTHROPIC_API_KEY=sk-ant-api03-xxxx
OPENAI_API_KEY=sk-xxxx
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
DISCORD_BOT_TOKEN=MTk4NjIy...
\`\`\`

---

## 核心配置：平台 Channel

Channel 定义了消息平台连接。OpenClaw 支持 10+ 平台同时接入。

### Telegram

\`\`\`json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "\${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "open",
      "groupPolicy": "allowlist",
      "groups": {
        "-1001234567890": {
          "enabled": true,
          "requireMention": true
        }
      }
    }
  }
}
\`\`\`

| 参数 | 类型 | 说明 |
|------|------|------|
| enabled | boolean | 是否启用此平台 |
| botToken | string | Bot Token |
| dmPolicy | string | 私聊策略: open/pairing/deny |
| groupPolicy | string | 群组策略: open/allowlist/deny |
| requireMention | boolean | 群组中是否需要 @ 提及才响应 |

### Discord

\`\`\`json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "\${DISCORD_BOT_TOKEN}",
      "applicationId": "\${DISCORD_APP_ID}",
      "intents": ["Guilds", "GuildMessages", "DirectMessages"],
      "dmPolicy": "open"
    }
  }
}
\`\`\`

### 飞书 / 钉钉 / WhatsApp

\`\`\`json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "\${FEISHU_APP_ID}",
      "appSecret": "\${FEISHU_APP_SECRET}",
      "encryptKey": "\${FEISHU_ENCRYPT_KEY}",
      "verificationToken": "\${FEISHU_VERIFY_TOKEN}"
    },
    "dingtalk": {
      "enabled": true,
      "client_id": "\${DINGTALK_CLIENT_ID}",
      "client_secret": "\${DINGTALK_CLIENT_SECRET}"
    },
    "whatsapp": {
      "enabled": true,
      "phoneNumberId": "\${WA_PHONE_ID}",
      "businessAccountId": "\${WA_BUSINESS_ID}",
      "accessToken": "\${WA_ACCESS_TOKEN}"
    }
  }
}
\`\`\`

---

## 核心配置：安全 Security

### 基本安全设置

\`\`\`json
{
  "security": {
    "allowedHosts": ["api.anthropic.com", "api.openai.com"],
    "blockedCommands": ["rm -rf", "sudo", "shutdown"],
    "maxCommandTimeout": 60000,
    "requireConfirmation": ["file:delete", "exec:elevated"]
  }
}
\`\`\`

| 参数 | 类型 | 说明 |
|------|------|------|
| allowedHosts | string[] | 允许访问的外部域名白名单 |
| blockedCommands | string[] | 禁止执行的命令模式 |
| maxCommandTimeout | number | 命令最大超时时间(ms) |
| requireConfirmation | string[] | 需要用户确认的操作类型 |

### 沙箱模式

对于生产环境，强烈建议启用沙箱隔离：

\`\`\`json
{
  "security": {
    "sandbox": {
      "enabled": true,
      "mode": "docker",
      "memoryLimit": "2GB",
      "cpuLimit": "1",
      "networkIsolation": true
    }
  }
}
\`\`\`

---

## Skills 配置

### 启用/禁用技能

\`\`\`json
{
  "skills": {
    "enabled": ["weather", "github", "coding-agent", "browser"],
    "disabled": ["admin-tools"]
  }
}
\`\`\`

### 技能参数配置

\`\`\`json
{
  "skills": {
    "configs": {
      "weather": { "defaultCity": "北京", "units": "metric" },
      "github": { "defaultRepo": "openclaw/openclaw" }
    }
  }
}
\`\`\`

### ClawHub 自动同步

\`\`\`json
{
  "skills": {
    "clawhub": {
      "enabled": true,
      "autoUpdate": true,
      "updateInterval": "daily"
    }
  }
}
\`\`\`

---

## 环境变量完整参考

推荐使用环境变量存储所有敏感信息：

\`\`\`bash
# ~/.bashrc 或 ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export TELEGRAM_BOT_TOKEN="123456:ABC..."
export DISCORD_BOT_TOKEN="MTk4NjIy..."
export FEISHU_APP_ID="cli_xxxx"
export FEISHU_APP_SECRET="xxxx"

# OpenClaw 专用环境变量
export OPENCLAW_LOG_LEVEL="info"
export OPENCLAW_DATA_DIR="~/.openclaw/data"
export OPENCLAW_PORT="3000"
\`\`\`

在配置文件中引用：

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}"
    }
  }
}
\`\`\`

OpenClaw 启动时会检查必要的环境变量是否已设置，缺失时会给出明确提示。

---

## 不同使用场景的推荐配置

### 个人用户：最小配置

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}"
    }
  },
  "channels": {
    "telegram": {
      "botToken": "\${TELEGRAM_BOT_TOKEN}"
    }
  }
}
\`\`\`

### 团队使用：生产配置

\`\`\`json
{
  "version": "4.2",
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "\${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist"
    },
    "discord": {
      "enabled": true,
      "botToken": "\${DISCORD_BOT_TOKEN}"
    }
  },
  "security": {
    "sandbox": { "enabled": true, "mode": "docker" },
    "requireConfirmation": ["file:delete"]
  },
  "memory": {
    "conversation": { "enabled": true, "maxMessages": 50 }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file"],
    "filePath": "~/.openclaw/logs/openclaw.log"
  }
}
\`\`\`

### 企业部署：完整配置

\`\`\`json
{
  "version": "4.2",
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5",
        "smart": "claude-opus-4"
      }
    },
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://internal-llm.company.com:8080/v1",
      "apiKey": "\${LOCAL_LLM_KEY}"
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "\${FEISHU_APP_ID}",
      "appSecret": "\${FEISHU_APP_SECRET}"
    },
    "dingtalk": {
      "enabled": true,
      "client_id": "\${DINGTALK_CLIENT_ID}",
      "client_secret": "\${DINGTALK_CLIENT_SECRET}"
    }
  },
  "security": {
    "sandbox": { "enabled": true, "mode": "docker", "networkIsolation": true },
    "allowedHosts": ["api.anthropic.com", "internal-llm.company.com"],
    "blockedCommands": ["rm -rf", "sudo", "shutdown"],
    "requireConfirmation": ["file:delete", "exec:elevated"]
  },
  "memory": {
    "conversation": { "enabled": true, "maxMessages": 100, "summarizeThreshold": 50 },
    "longTerm": { "enabled": true, "storage": "postgresql", "connectionString": "\${DB_URL}" },
    "rag": { "enabled": true, "embeddingModel": "text-embedding-3-small" }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file", "syslog"],
    "filePath": "/var/log/openclaw/openclaw.log",
    "maxFileSize": "50MB",
    "maxFiles": 30
  }
}
\`\`\`

---

## 高级配置

### 自定义系统提示词

\`\`\`json
{
  "advanced": {
    "systemPrompt": "你是公司的内部助手，名字叫小智。请用专业但友好的语气回答问题。",
    "systemPromptFile": "~/.openclaw/prompts/system.md"
  }
}
\`\`\`

### Memory 记忆系统

\`\`\`json
{
  "memory": {
    "conversation": {
      "enabled": true,
      "maxMessages": 100,
      "summarizeThreshold": 50
    },
    "longTerm": {
      "enabled": true,
      "storage": "sqlite",
      "path": "~/.openclaw/memory.db"
    },
    "rag": {
      "enabled": true,
      "embeddingModel": "text-embedding-3-small",
      "chunkSize": 1000,
      "chunkOverlap": 200
    }
  }
}
\`\`\`

### 插件与 Hook 机制

\`\`\`json
{
  "advanced": {
    "hooks": {
      "preMessage": ["~/.openclaw/hooks/log-input.sh"],
      "postMessage": ["~/.openclaw/hooks/log-output.sh"],
      "onError": ["~/.openclaw/hooks/alert.sh"]
    },
    "plugins": [
      { "name": "audit-trail", "path": "~/.openclaw/plugins/audit" },
      { "name": "rate-limiter", "config": { "maxRequestsPerMinute": 30 } }
    ]
  }
}
\`\`\`

### Logging 日志配置

\`\`\`json
{
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file"],
    "filePath": "~/.openclaw/logs/openclaw.log",
    "maxFileSize": "10MB",
    "maxFiles": 5
  }
}
\`\`\`

日志级别从低到高：\`debug\` < \`info\` < \`warn\` < \`error\`。生产环境建议使用 \`info\`，调试时切换为 \`debug\`。

---

## 配置验证与调试

### 验证配置

\`\`\`bash
# 检查配置文件语法和参数是否合法
openclaw config validate

# 输出示例：
# Configuration file is valid
# Provider "anthropic" configured correctly
# Channel "telegram" configured correctly
# Warning: "memory.rag" is enabled but no embedding model specified
\`\`\`

### 查看当前生效配置

\`\`\`bash
# 显示合并后的完整配置（环境变量已解析，密钥脱敏）
openclaw config show

# 只查看某个子配置
openclaw config show providers
openclaw config show security
\`\`\`

### 调试模式

\`\`\`bash
# 启动时开启详细日志
OPENCLAW_LOG_LEVEL=debug openclaw start
\`\`\`

### 常见配置错误排查

\`\`\`bash
# 错误：JSON 格式无效
# 解决：使用 JSON 校验工具检查语法
cat ~/.openclaw/openclaw.json | python3 -m json.tool

# 错误：环境变量未设置
# 解决：检查 .env 文件或 shell 环境
echo $ANTHROPIC_API_KEY

# 错误：端口被占用
# 解决：修改端口或停止占用进程
lsof -i :3000
\`\`\`

---

## 常见问题 FAQ

### Q1: 配置文件修改后需要重启吗？

大部分配置修改需要重启 OpenClaw 才能生效。但部分配置（如技能的启用/禁用）支持热重载，可以使用 \`openclaw config reload\` 命令。Provider 和 Channel 配置的变更则必须重启。

### Q2: 如何在多台机器上同步配置？

推荐将配置文件纳入版本管理（Git）。创建一个私有仓库存放配置文件，敏感信息通过环境变量注入。也可以使用配置管理工具（如 Ansible、Chef）在多台机器上自动部署。

### Q3: 配置文件支持 YAML 格式吗？

目前 OpenClaw 主配置文件仅支持 JSON 格式。如果你更喜欢 YAML，可以编写一个简单的转换脚本在部署时将 YAML 转为 JSON。社区正在讨论原生 YAML 支持。

### Q4: 如何重置配置到默认值？

\`\`\`bash
# 备份当前配置
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak

# 重新初始化
openclaw init --force
\`\`\`

这会生成一个全新的默认配置文件，你之前的配置会被覆盖（已备份）。

---

*最后更新: 2026-03-29*`,
    contentEn: `OpenClaw's power lies in its high configurability. Through a single configuration file, you can control AI model selection, platform integration, skill management, security policies, memory systems, and much more. Whether you are a personal user just getting started or a team rolling out an enterprise deployment, understanding the configuration system is essential for using OpenClaw effectively.

This guide systematically covers OpenClaw's configuration file structure, essential parameters, environment variable usage, recommended configurations for different use cases, advanced configuration techniques, and configuration validation and debugging methods.

---

## Configuration File Structure

### File Location and Format

OpenClaw's main configuration file is located at:

\`\`\`
~/.openclaw/openclaw.json
\`\`\`

A default configuration file is automatically created the first time you run \`openclaw start\`. You can also initialize it manually:

\`\`\`bash
# Interactive initialization
openclaw init

# Initialize with a specific template
openclaw init --template team
\`\`\`

The configuration file uses JSON format and supports \`\${ENV_VAR}\` syntax for referencing environment variables. OpenClaw resolves these references automatically at startup.

### Top-Level Structure

\`\`\`json
{
  "version": "4.2",
  "providers": { },
  "channels": { },
  "skills": { },
  "security": { },
  "memory": { },
  "logging": { },
  "advanced": { }
}
\`\`\`

Each top-level field controls a subsystem. Let us walk through each one.

---

## Essential Config: Model Providers

Providers define where your AI models come from. OpenClaw supports configuring multiple providers simultaneously and switching between them at runtime.

### Anthropic Claude

\`\`\`json
{
  "providers": {
    "anthropic": {
      "type": "anthropic",
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5",
        "smart": "claude-opus-4"
      },
      "maxTokens": 8192,
      "temperature": 0.7
    }
  }
}
\`\`\`

**Parameter Reference**:

| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Provider type identifier |
| apiKey | string | API key, supports environment variable references |
| models.default | string | Default model for everyday conversations |
| models.fast | string | Fast model for simple tasks and low-latency scenarios |
| models.smart | string | Smart model for complex reasoning and coding tasks |
| maxTokens | number | Maximum tokens per response |
| temperature | number | Generation temperature, between 0 and 1 |

### OpenAI

\`\`\`json
{
  "providers": {
    "openai": {
      "type": "openai",
      "apiKey": "\${OPENAI_API_KEY}",
      "baseUrl": "https://api.openai.com/v1",
      "models": {
        "default": "gpt-4-turbo"
      }
    }
  }
}
\`\`\`

### LocalAI (Local Models)

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "models": {
        "default": "llama-3-8b"
      }
    }
  }
}
\`\`\`

### Multi-Provider and Fallback

You can configure multiple providers, specify a default via \`defaultProvider\`, and set up automatic fallback rules:

\`\`\`json
{
  "providers": {
    "anthropic": { },
    "openai": { },
    "localai": { }
  },
  "defaultProvider": "anthropic",
  "fallback": {
    "enabled": true,
    "order": ["anthropic", "openai", "localai"],
    "rules": [
      { "condition": "rate_limit", "action": "next_provider" },
      { "condition": "timeout", "action": "next_provider" }
    ]
  }
}
\`\`\`

---

## Essential Config: API Keys and Security

**Never hardcode API keys in configuration files.** Always use environment variable references:

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}"
    }
  }
}
\`\`\`

OpenClaw also supports loading from a \`.env\` file:

\`\`\`bash
# ~/.openclaw/.env
ANTHROPIC_API_KEY=sk-ant-api03-xxxx
OPENAI_API_KEY=sk-xxxx
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
DISCORD_BOT_TOKEN=MTk4NjIy...
\`\`\`

---

## Essential Config: Platform Channels

Channels define messaging platform connections. OpenClaw supports 10+ platforms simultaneously.

### Telegram

\`\`\`json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "\${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "open",
      "groupPolicy": "allowlist",
      "groups": {
        "-1001234567890": {
          "enabled": true,
          "requireMention": true
        }
      }
    }
  }
}
\`\`\`

| Parameter | Type | Description |
|-----------|------|-------------|
| enabled | boolean | Whether this platform is active |
| botToken | string | Bot Token |
| dmPolicy | string | Direct message policy: open/pairing/deny |
| groupPolicy | string | Group policy: open/allowlist/deny |
| requireMention | boolean | Whether the bot must be @mentioned in groups |

### Discord

\`\`\`json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "\${DISCORD_BOT_TOKEN}",
      "applicationId": "\${DISCORD_APP_ID}",
      "intents": ["Guilds", "GuildMessages", "DirectMessages"],
      "dmPolicy": "open"
    }
  }
}
\`\`\`

### Feishu / DingTalk / WhatsApp

\`\`\`json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "\${FEISHU_APP_ID}",
      "appSecret": "\${FEISHU_APP_SECRET}",
      "encryptKey": "\${FEISHU_ENCRYPT_KEY}",
      "verificationToken": "\${FEISHU_VERIFY_TOKEN}"
    },
    "dingtalk": {
      "enabled": true,
      "client_id": "\${DINGTALK_CLIENT_ID}",
      "client_secret": "\${DINGTALK_CLIENT_SECRET}"
    },
    "whatsapp": {
      "enabled": true,
      "phoneNumberId": "\${WA_PHONE_ID}",
      "businessAccountId": "\${WA_BUSINESS_ID}",
      "accessToken": "\${WA_ACCESS_TOKEN}"
    }
  }
}
\`\`\`

---

## Essential Config: Security

### Basic Security Settings

\`\`\`json
{
  "security": {
    "allowedHosts": ["api.anthropic.com", "api.openai.com"],
    "blockedCommands": ["rm -rf", "sudo", "shutdown"],
    "maxCommandTimeout": 60000,
    "requireConfirmation": ["file:delete", "exec:elevated"]
  }
}
\`\`\`

### Sandbox Mode

For production environments, enabling sandbox isolation is strongly recommended:

\`\`\`json
{
  "security": {
    "sandbox": {
      "enabled": true,
      "mode": "docker",
      "memoryLimit": "2GB",
      "cpuLimit": "1",
      "networkIsolation": true
    }
  }
}
\`\`\`

---

## Skills Configuration

### Enable/Disable Skills

\`\`\`json
{
  "skills": {
    "enabled": ["weather", "github", "coding-agent", "browser"],
    "disabled": ["admin-tools"]
  }
}
\`\`\`

### Skill Parameters

\`\`\`json
{
  "skills": {
    "configs": {
      "weather": { "defaultCity": "Beijing", "units": "metric" },
      "github": { "defaultRepo": "openclaw/openclaw" }
    }
  }
}
\`\`\`

### ClawHub Auto-Sync

\`\`\`json
{
  "skills": {
    "clawhub": {
      "enabled": true,
      "autoUpdate": true,
      "updateInterval": "daily"
    }
  }
}
\`\`\`

---

## Environment Variables Reference

Store all sensitive information in environment variables:

\`\`\`bash
# ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export TELEGRAM_BOT_TOKEN="123456:ABC..."
export DISCORD_BOT_TOKEN="MTk4NjIy..."
export FEISHU_APP_ID="cli_xxxx"
export FEISHU_APP_SECRET="xxxx"

# OpenClaw-specific environment variables
export OPENCLAW_LOG_LEVEL="info"
export OPENCLAW_DATA_DIR="~/.openclaw/data"
export OPENCLAW_PORT="3000"
\`\`\`

OpenClaw checks for required environment variables at startup and provides clear error messages when any are missing.

---

## Configurations for Different Use Cases

### Personal User: Minimal Config

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}"
    }
  },
  "channels": {
    "telegram": {
      "botToken": "\${TELEGRAM_BOT_TOKEN}"
    }
  }
}
\`\`\`

### Team: Production Config

\`\`\`json
{
  "version": "4.2",
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "\${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist"
    },
    "discord": {
      "enabled": true,
      "botToken": "\${DISCORD_BOT_TOKEN}"
    }
  },
  "security": {
    "sandbox": { "enabled": true, "mode": "docker" },
    "requireConfirmation": ["file:delete"]
  },
  "memory": {
    "conversation": { "enabled": true, "maxMessages": 50 }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file"],
    "filePath": "~/.openclaw/logs/openclaw.log"
  }
}
\`\`\`

### Enterprise: Full Config

\`\`\`json
{
  "version": "4.2",
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": { "default": "claude-sonnet-4-6", "smart": "claude-opus-4" }
    },
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://internal-llm.company.com:8080/v1",
      "apiKey": "\${LOCAL_LLM_KEY}"
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "\${FEISHU_APP_ID}",
      "appSecret": "\${FEISHU_APP_SECRET}"
    }
  },
  "security": {
    "sandbox": { "enabled": true, "mode": "docker", "networkIsolation": true },
    "allowedHosts": ["api.anthropic.com", "internal-llm.company.com"],
    "blockedCommands": ["rm -rf", "sudo", "shutdown"],
    "requireConfirmation": ["file:delete", "exec:elevated"]
  },
  "memory": {
    "conversation": { "enabled": true, "maxMessages": 100 },
    "longTerm": { "enabled": true, "storage": "postgresql", "connectionString": "\${DB_URL}" },
    "rag": { "enabled": true, "embeddingModel": "text-embedding-3-small" }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file", "syslog"],
    "filePath": "/var/log/openclaw/openclaw.log",
    "maxFileSize": "50MB",
    "maxFiles": 30
  }
}
\`\`\`

---

## Advanced Configuration

### Custom System Prompts

\`\`\`json
{
  "advanced": {
    "systemPrompt": "You are a company internal assistant named SmartBot. Answer professionally and friendly.",
    "systemPromptFile": "~/.openclaw/prompts/system.md"
  }
}
\`\`\`

### Memory System

\`\`\`json
{
  "memory": {
    "conversation": { "enabled": true, "maxMessages": 100, "summarizeThreshold": 50 },
    "longTerm": { "enabled": true, "storage": "sqlite", "path": "~/.openclaw/memory.db" },
    "rag": {
      "enabled": true,
      "embeddingModel": "text-embedding-3-small",
      "chunkSize": 1000,
      "chunkOverlap": 200
    }
  }
}
\`\`\`

### Plugins and Hooks

\`\`\`json
{
  "advanced": {
    "hooks": {
      "preMessage": ["~/.openclaw/hooks/log-input.sh"],
      "postMessage": ["~/.openclaw/hooks/log-output.sh"],
      "onError": ["~/.openclaw/hooks/alert.sh"]
    },
    "plugins": [
      { "name": "audit-trail", "path": "~/.openclaw/plugins/audit" },
      { "name": "rate-limiter", "config": { "maxRequestsPerMinute": 30 } }
    ]
  }
}
\`\`\`

### Logging Configuration

\`\`\`json
{
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file"],
    "filePath": "~/.openclaw/logs/openclaw.log",
    "maxFileSize": "10MB",
    "maxFiles": 5
  }
}
\`\`\`

Log levels from lowest to highest: \`debug\` < \`info\` < \`warn\` < \`error\`. Use \`info\` for production and switch to \`debug\` when troubleshooting.

---

## Configuration Validation and Debugging

### Validate Configuration

\`\`\`bash
# Check configuration file syntax and parameter validity
openclaw config validate

# Example output:
# Configuration file is valid
# Provider "anthropic" configured correctly
# Channel "telegram" configured correctly
# Warning: "memory.rag" enabled but no embedding model specified
\`\`\`

### View Active Configuration

\`\`\`bash
# Show the merged configuration (env vars resolved, secrets masked)
openclaw config show

# View a specific subsection
openclaw config show providers
openclaw config show security
\`\`\`

### Debug Mode

\`\`\`bash
# Start with verbose logging
OPENCLAW_LOG_LEVEL=debug openclaw start
\`\`\`

### Common Configuration Errors

\`\`\`bash
# Error: Invalid JSON format
# Fix: Validate syntax with a JSON tool
cat ~/.openclaw/openclaw.json | python3 -m json.tool

# Error: Environment variable not set
# Fix: Check .env file or shell environment
echo $ANTHROPIC_API_KEY

# Error: Port already in use
# Fix: Change port or stop the conflicting process
lsof -i :3000
\`\`\`

---

## FAQ

### Q1: Do I need to restart after changing the configuration?

Most configuration changes require restarting OpenClaw to take effect. However, some settings such as skill enable/disable support hot reloading via \`openclaw config reload\`. Provider and Channel configuration changes always require a restart.

### Q2: How can I sync configuration across multiple machines?

The recommended approach is to store your configuration file in a private Git repository. Keep sensitive information in environment variables and inject them per machine. You can also use configuration management tools like Ansible or Chef for automated deployment across multiple servers.

### Q3: Does the configuration file support YAML format?

Currently, the main OpenClaw configuration file only supports JSON format. If you prefer YAML, you can write a simple conversion script that transforms YAML to JSON during deployment. The community is actively discussing native YAML support.

### Q4: How do I reset configuration to defaults?

\`\`\`bash
# Back up current configuration
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak

# Re-initialize
openclaw init --force
\`\`\`

This generates a fresh default configuration file, overwriting your previous settings (which are safely backed up).

---

*Last updated: 2026-03-29*`,

    author: "OpenClaw 101",
    date: "2026-03-29",
    category: "技术教程",
    categoryEn: "Tutorial",
    tags: ["配置", "参数", "入门", "定制化"],
    readingTime: 18,
    image: "/images/blog/configuration.jpg"
  },
  {
    id: 14,
    slug: "openclaw-error-troubleshooting",
    title: "OpenClaw 常见错误及解决方案：完整排查手册",
    titleEn: "OpenClaw Common Errors and Solutions: Complete Troubleshooting Guide",
    excerpt: "使用 OpenClaw 时遇到问题？本文汇总了最常见的错误类型、错误信息和解决方案，包括 API 错误、配置错误、连接错误、权限错误等，帮你快速定位并解决问题。",
    excerptEn: "Having issues with OpenClaw? This guide covers the most common error types, messages, and solutions, including API errors, configuration errors, connection errors, and permission errors.",
    content: `在使用 OpenClaw 的过程中，难免会遇到各种错误。

本文整理了最常见的错误类型及其解决方案，帮你快速排查问题。

---

## 错误分类

| 类型 | 说明 | 排查难度 |
|------|------|----------|
| API 错误 | 模型 API 调用失败 | ⭐ |
| 配置错误 | 配置文件参数错误 | ⭐⭐ |
| 连接错误 | 网络或平台连接问题 | ⭐⭐ |
| 权限错误 | 权限不足或认证失败 | ⭐ |
| 资源错误 | 内存、磁盘等资源问题 | ⭐⭐⭐ |
| 技能错误 | 技能执行失败 | ⭐⭐ |

---

## API 错误

### 1. API Key 无效

**错误信息**：
\`\`\`
Error: Invalid API Key
Authentication failed for provider: anthropic
\`\`\`

**原因**：
- API Key 格式错误
- API Key 已过期
- 环境变量未设置

**解决方案**：

\`\`\`bash
# 检查环境变量
echo $ANTHROPIC_API_KEY

# 设置环境变量
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# 或在配置文件中直接设置
\`\`\`

---

### 2. API 请求超时

**错误信息**：
\`\`\`
Error: Request timeout after 60000ms
\`\`\`

**原因**：
- 网络不稳定
- API 服务器响应慢
- 请求内容过大

**解决方案**：

\`\`\`json
// 增加超时时间
{
  "providers": {
    "anthropic": {
      "timeout": 120000
    }
  }
}
\`\`\`

---

### 3. 速率限制

**错误信息**：
\`\`\`
Error: Rate limit exceeded
429 Too Many Requests
\`\`\`

**原因**：
- 请求频率过高
- 超出 API 配额

**解决方案**：

1. 降低请求频率
2. 升级 API 套餐
3. 启用请求队列

\`\`\`json
{
  "providers": {
    "anthropic": {
      "rateLimit": {
        "enabled": true,
        "requestsPerMinute": 50
      }
    }
  }
}
\`\`\`

---

### 4. 模型不可用

**错误信息**：
\`\`\`
Error: Model not found: claude-opus-5
\`\`\`

**原因**：
- 模型名称拼写错误
- 模型已被弃用
- 账户无权限访问

**解决方案**：

\`\`\`bash
# 查看可用模型
openclaw models list

# 使用正确的模型名称
\`\`\`

---

## 配置错误

### 5. 配置文件不存在

**错误信息**：
\`\`\`
Error: Configuration file not found
\`\`\`

**解决方案**：

\`\`\`bash
# 初始化配置
openclaw init

# 或创建默认配置
openclaw config create
\`\`\`

---

### 6. 配置文件格式错误

**错误信息**：
\`\`\`
Error: Failed to parse configuration
JSON parse error: Unexpected token
\`\`\`

**原因**：
- JSON 语法错误
- 缺少引号或逗号
- 使用了不支持的字符

**解决方案**：

\`\`\`bash
# 验证配置文件
openclaw config validate

# 或使用 JSON 验证工具
cat ~/.openclaw/openclaw.json | jq '.'
\`\`\`

---

### 7. 环境变量未设置

**错误信息**：
\`\`\`
Error: Environment variable not found: ANTHROPIC_API_KEY
\`\`\`

**解决方案**：

\`\`\`bash
# 临时设置
export ANTHROPIC_API_KEY="sk-ant-..."

# 永久设置（添加到 ~/.bashrc）
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc
\`\`\`

---

## 连接错误

### 8. Telegram Bot 连接失败

**错误信息**：
\`\`\`
Error: Failed to connect to Telegram
404 Not Found
\`\`\`

**原因**：
- Bot Token 错误
- Bot 已被封禁
- 网络问题

**解决方案**：

1. 检查 Bot Token 是否正确
2. 在 @BotFather 重新生成 Token
3. 检查网络连接

\`\`\`bash
# 测试 Bot Token
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"
\`\`\`

---

### 9. Discord 连接失败

**错误信息**：
\`\`\`
Error: Discord connection failed
DISALLOWED_INTENTS
\`\`\`

**原因**：
- 未启用必要的 Intents
- Bot 权限不足

**解决方案**：

1. 进入 Discord Developer Portal
2. 选择你的应用 → Bot
3. 启用以下 Intents：
   - PRESENCE INTENT
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT

---

### 10. 飞书连接失败

**错误信息**：
\`\`\`
Error: Feishu authentication failed
Invalid app_id or app_secret
\`\`\`

**解决方案**：

1. 检查飞书开放平台的应用配置
2. 确认 App ID 和 App Secret 正确
3. 检查应用权限配置

---

## 权限错误

### 11. 文件权限不足

**错误信息**：
\`\`\`
Error: Permission denied: /root/.openclaw/openclaw.json
\`\`\`

**解决方案**：

\`\`\`bash
# 修改文件权限
chmod 600 ~/.openclaw/openclaw.json

# 或修改所有者
chown -R $USER:$USER ~/.openclaw
\`\`\`

---

### 12. 命令执行权限不足

**错误信息**：
\`\`\`
Error: Command requires elevated permissions
\`\`\`

**原因**：
- 尝试执行需要 sudo 的命令
- 安全策略阻止了该命令

**解决方案**：

1. 手动执行命令并授权
2. 或修改安全策略

\`\`\`json
{
  "security": {
    "allowElevated": true,
    "requireConfirmation": ["exec:elevated"]
  }
}
\`\`\`

---

## 资源错误

### 13. 内存不足

**错误信息**：
\`\`\`
Error: JavaScript heap out of memory
\`\`\`

**解决方案**：

\`\`\`bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"

# 或在启动时指定
node --max-old-space-size=4096 /path/to/openclaw
\`\`\`

---

### 14. 磁盘空间不足

**错误信息**：
\`\`\`
Error: No space left on device
\`\`\`

**解决方案**：

\`\`\`bash
# 检查磁盘空间
df -h

# 清理日志和缓存
rm -rf ~/.openclaw/logs/*.log
rm -rf ~/.openclaw/cache/*

# 清理 npm 缓存
npm cache clean --force
\`\`\`

---

## 技能错误

### 15. 技能加载失败

**错误信息**：
\`\`\`
Error: Failed to load skill: weather
Cannot find module 'weather-skill'
\`\`\`

**解决方案**：

\`\`\`bash
# 重新安装技能
npx clawhub install weather

# 或手动安装
cd ~/.openclaw/skills
git clone https://github.com/xxx/weather-skill.git
\`\`\`

---

### 16. 技能执行失败

**错误信息**：
\`\`\`
Error: Skill execution failed
TypeError: Cannot read property 'data' of undefined
\`\`\`

**解决方案**：

1. 检查技能配置
2. 查看技能日志
3. 更新技能到最新版本

\`\`\`bash
# 查看技能日志
openclaw logs --skill weather

# 更新技能
npx clawhub update weather
\`\`\`

---

## 调试技巧

### 启用详细日志

\`\`\`json
{
  "logging": {
    "level": "debug"
  }
}
\`\`\`

### 查看实时日志

\`\`\`bash
# 查看所有日志
openclaw logs -f

# 查看特定类型日志
openclaw logs --type api

# 查看最近 100 行
openclaw logs --tail 100
\`\`\`

### 检查服务状态

\`\`\`bash
# 检查 OpenClaw 状态
openclaw status

# 检查版本
openclaw --version

# 检查配置
openclaw config show
\`\`\`

---

## 获取帮助

如果以上方案都无法解决问题：

1. **查看官方文档**: https://docs.openclaw.ai
2. **搜索 Issues**: https://github.com/openclaw/openclaw/issues
3. **社区求助**: https://discord.gg/clawd
4. **提交 Bug**: https://github.com/openclaw/openclaw/issues/new

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| \`openclaw status\` | 检查状态 |
| \`openclaw config validate\` | 验证配置 |
| \`openclaw logs -f\` | 实时日志 |
| \`openclaw restart\` | 重启服务 |
| \`openclaw update\` | 更新版本 |

---

*最后更新: 2026-03-29*`,
    contentEn: `Errors are inevitable when using OpenClaw.

This guide covers the most common errors and their solutions.

---

## Error Categories

| Type | Description | Difficulty |
|------|------|----------|
| API Errors | Model API call failures | ⭐ |
| Config Errors | Configuration parameter errors | ⭐⭐ |
| Connection Errors | Network or platform issues | ⭐⭐ |
| Permission Errors | Insufficient permissions | ⭐ |
| Resource Errors | Memory, disk issues | ⭐⭐⭐ |
| Skill Errors | Skill execution failures | ⭐⭐ |

---

## API Errors

### 1. Invalid API Key

\`\`\`
Error: Invalid API Key
Authentication failed for provider: anthropic
\`\`\`

**Solution**:

\`\`\`bash
# Check environment variable
echo $ANTHROPIC_API_KEY

# Set environment variable
export ANTHROPIC_API_KEY="sk-ant-api03-..."
\`\`\`

---

### 2. Request Timeout

\`\`\`
Error: Request timeout after 60000ms
\`\`\`

**Solution**:

\`\`\`json
{
  "providers": {
    "anthropic": {
      "timeout": 120000
    }
  }
}
\`\`\`

---

### 3. Rate Limit

\`\`\`
Error: Rate limit exceeded
\`\`\`

**Solution**: Reduce request frequency or upgrade API plan.

---

## Configuration Errors

### 4. Config File Not Found

\`\`\`bash
# Initialize configuration
openclaw init
\`\`\`

---

### 5. Invalid JSON

\`\`\`bash
# Validate configuration
openclaw config validate
\`\`\`

---

## Connection Errors

### 6. Telegram Connection Failed

\`\`\`bash
# Test Bot Token
curl "https://api.telegram.org/bot<TOKEN>/getMe"
\`\`\`

---

### 7. Discord Intents Error

Enable required Intents in Discord Developer Portal.

---

## Debug Tips

### Enable Debug Logging

\`\`\`json
{
  "logging": {
    "level": "debug"
  }
}
\`\`\`

### View Real-time Logs

\`\`\`bash
openclaw logs -f
\`\`\`

---

## Quick Reference

| Command | Description |
|------|------|
| \`openclaw status\` | Check status |
| \`openclaw config validate\` | Validate config |
| \`openclaw logs -f\` | Real-time logs |
| \`openclaw restart\` | Restart service |

---

*Last updated: 2026-03-29*`,
    author: "OpenClaw 101",
    date: "2026-03-29",
    category: "技术教程",
    categoryEn: "Tutorial",
    tags: ["错误", "排查", "调试", "故障"],
    readingTime: 10,
    image: "/images/blog/troubleshooting.jpg"
  },
  {
    id: 13,
    slug: "openclaw-vs-claude-code",
    title: "OpenClaw vs Claude Code：谁才是最好的 AI 编程助手？",
    titleEn: "OpenClaw vs Claude Code: Which is the Best AI Coding Assistant?",
    excerpt: "Claude Code 是 Anthropic 官方的编程助手，OpenClaw 是开源社区的明星项目。两者有什么区别？该选哪一个？从多平台支持、开源性、技能生态、自托管、定价全方位对比。",
    excerptEn: "Claude Code is Anthropic's official coding assistant, while OpenClaw is a star in the open-source community. What's the difference? Which one should you choose? Comprehensive comparison from platform support, open source, skills ecosystem, self-hosting, and pricing.",
    content: `2026 年，AI 编程助手市场百花齐放。Claude Code 和 OpenClaw 是其中最受关注的两款产品。

Claude Code 由 Anthropic 官方推出，闭源商业化；OpenClaw 是开源社区的明星项目，GitHub 336k+ stars。

这篇文章深度对比这两款产品，帮你做出选择。

## 核心对比一览

| 维度 | OpenClaw | Claude Code |
|------|----------|-------------|
| **开发方** | 开源社区 | Anthropic 官方 |
| **开源性** | ✅ 完全开源 | ❌ 闭源 |
| **GitHub Stars** | 336,466 | 82,917 |
| **平台支持** | 多平台 | 仅终端 |
| **自托管** | ✅ 支持 | ❌ 不支持 |
| **技能生态** | ✅ 42,000+ stars | ❌ 无 |
| **定价** | 免费（需 API 费用） | 按使用量付费 |

## 1. 平台支持对比

### OpenClaw：真正的多平台

OpenClaw 原生支持 **10+ 消息平台**：

- Telegram
- WhatsApp
- Discord
- Signal
- 飞书
- 钉钉
- 企业微信
- QQ
- iMessage
- Slack

**这意味着**：你可以在任何你常用的聊天软件中使用 OpenClaw，无需切换工具。

### Claude Code：仅支持终端

Claude Code 只能在 **终端** 中使用：

- 需要命令行操作
- 不支持移动端
- 没有图形界面

**这意味着**：你需要习惯命令行操作，不适合非技术用户。

## 2. 开源性对比

### OpenClaw：完全开源

\`\`\`
- 代码完全透明
- 可自行修改和扩展
- 社区驱动发展
- 无供应商锁定风险
\`\`\`

**优势**：
- 安全性可审计
- 可根据需求定制
- 社区贡献丰富

### Claude Code：闭源商业

\`\`\`
- 代码不公开
- 无法自行修改
- Anthropic 独家控制
- 存在供应商锁定风险
\`\`\`

**风险**：
- 无法审计安全性
- 依赖 Anthropic 决策
- 价格可能上涨

## 3. 技能生态对比

### OpenClaw：42,000+ Stars 的技能库

OpenClaw 拥有庞大的技能生态：

- **ClawHub**：官方技能市场，社区技能持续增长
- **awesome-openclaw-skills**：社区精选技能，42,027 stars
- **Skills API**：自定义技能开发

**热门技能类别**：
- 文档操作（飞书、Notion）
- 图片生成（DALL-E、Midjourney）
- 数据分析（SQL、Excel）
- 自动化（定时任务、工作流）

### Claude Code：无技能系统

Claude Code 没有技能扩展机制：

- 功能由 Anthropic 决定
- 无法自定义扩展
- 依赖官方更新

## 4. 自托管对比

### OpenClaw：支持自托管

OpenClaw 提供多种自托管方案：

1. **本地部署**：直接运行在本地机器
2. **VPS 部署**：部署到云服务器
3. **nanoclaw**：容器化安全方案
4. **Clawith**：企业级私有化

**优势**：
- 数据完全自主
- 满足合规要求
- 降低 API 成本

### Claude Code：不支持自托管

Claude Code 必须连接 Anthropic 云端：

- 数据经过 Anthropic 服务器
- 无法本地部署
- API 调用必产生费用

## 5. 定价对比

### OpenClaw：免费 + API 费用

\`\`\`
OpenClaw 本身：免费
Claude API 调用：按实际使用付费
自托管：无 API 费用（使用本地模型）
\`\`\`

**成本估算**：
- 个人用户：$5-20/月
- 企业用户：$50-200/月
- 自托管：$0（使用 LocalAI）

### Claude Code：按使用量付费

\`\`\`
按 token 计费
无免费额度
无自托管选项
\`\`\`

**成本估算**：
- 个人用户：$20-50/月
- 企业用户：$200-500/月

## 6. 适用场景

### OpenClaw 适合

✅ 需要多平台支持的用户
✅ 注重数据安全的企业
✅ 希望自定扩展的开发者
✅ 追求成本优化的团队
✅ 需要技能生态的用户

### Claude Code 适合

✅ Anthropic 生态用户
✅ 习惯终端操作的开发者
✅ 不需要自托管的个人用户
✅ 追求官方支持的用户

## 总结

**OpenClaw 的优势**：
- 多平台支持，随时随地使用
- 完全开源，安全可控
- 庞大的技能生态
- 支持自托管，数据安全
- 成本更低

**Claude Code 的优势**：
- Anthropic 官方支持
- 与 Claude 模型深度集成
- 无需配置，开箱即用

**建议**：
- 如果你需要多平台、自托管、技能扩展 → **OpenClaw**
- 如果你只需要终端编程助手、追求官方支持 → **Claude Code**

对于大多数用户，OpenClaw 的综合优势更明显。

---

*OpenClaw GitHub: https://github.com/openclaw/openclaw*
*Claude Code GitHub: https://github.com/anthropics/claude-code*`,
    contentEn: `In 2026, the AI coding assistant market is flourishing. Claude Code and OpenClaw are two of the most prominent products.

Claude Code is launched by Anthropic, closed-source and commercial; OpenClaw is a star in the open-source community with 336k+ GitHub stars.

This article provides an in-depth comparison to help you choose.

## Quick Comparison

| Dimension | OpenClaw | Claude Code |
|------|----------|-------------|
| **Developer** | Open Source Community | Anthropic Official |
| **Open Source** | ✅ Fully Open | ❌ Closed |
| **GitHub Stars** | 336,466 | 82,917 |
| **Platform Support** | Multi-platform | Terminal Only |
| **Self-hosting** | ✅ Supported | ❌ Not Supported |
| **Skills Ecosystem** | ✅ 42,000+ stars | ❌ None |
| **Pricing** | Free (API fees only) | Pay-per-use |

## 1. Platform Support

### OpenClaw: True Multi-Platform

OpenClaw natively supports **10+ messaging platforms**:

- Telegram, WhatsApp, Discord, Signal
- Feishu, DingTalk, WeCom, QQ
- iMessage, Slack

**This means**: Use OpenClaw in any chat app you already use.

### Claude Code: Terminal Only

Claude Code only works in **terminal**:

- Command-line operation required
- No mobile support
- No GUI

**This means**: Not suitable for non-technical users.

## 2. Open Source

### OpenClaw: Fully Open Source

\`\`\`
- Code fully transparent
- Modify and extend freely
- Community-driven development
- No vendor lock-in
\`\`\`

**Advantages**: Security auditable, customizable, rich community contributions.

### Claude Code: Closed Source

\`\`\`
- Code not public
- Cannot modify
- Anthropic controlled
- Vendor lock-in risk
\`\`\`

**Risks**: No security audit, dependent on Anthropic decisions, potential price increases.

## 3. Skills Ecosystem

### OpenClaw: 42,000+ Stars Skills Library

OpenClaw has a massive skills ecosystem:

- **ClawHub**: Official marketplace, growing community skills
- **awesome-openclaw-skills**: Community curated, 42,027 stars
- **Skills API**: Custom skill development

### Claude Code: No Skills System

No extension mechanism. Features decided by Anthropic.

## 4. Self-hosting

### OpenClaw: Supported

Multiple self-hosting options:

1. Local deployment
2. VPS deployment
3. nanoclaw (containerized)
4. Clawith (enterprise)

**Advantages**: Data sovereignty, compliance, lower API costs.

### Claude Code: Not Supported

Must connect to Anthropic cloud. Data passes through Anthropic servers.

## 5. Pricing

### OpenClaw: Free + API Fees

\`\`\`
OpenClaw: Free
Claude API: Pay-per-use
Self-hosting: $0 (local models)
\`\`\`

**Cost estimate**: $5-20/month (personal), $50-200/month (enterprise)

### Claude Code: Pay-per-use

\`\`\`
Per-token billing
No free tier
No self-hosting option
\`\`\`

**Cost estimate**: $20-50/month (personal), $200-500/month (enterprise)

## Summary

**OpenClaw Advantages**:
- Multi-platform support
- Fully open source
- Massive skills ecosystem
- Self-hosting support
- Lower cost

**Claude Code Advantages**:
- Anthropic official support
- Deep integration with Claude
- Zero configuration

**Recommendation**:
- If you need multi-platform, self-hosting, skills ecosystem → **OpenClaw**
- If you only need terminal coding assistant with official support → **Claude Code**

For most users, OpenClaw's comprehensive advantages are more compelling.`,
    author: "OpenClaw 101",
    date: "2026-03-26",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["对比", "Claude Code", "竞品", "编程助手"],
    readingTime: 12,
    image: "/images/blog/comparison.jpg"
  },
  {
    id: 12,
    slug: "openclaw-self-hosting-guide",
    title: "OpenClaw 自托管完全指南：从 nanoclaw 到 Clawith 企业版",
    titleEn: "Complete Guide to OpenClaw Self-hosting: From nanoclaw to Clawith Enterprise",
    excerpt: "数据安全、本地部署、企业合规——详解 OpenClaw 的 4 种自托管方案。包括 nanoclaw 容器化部署、Clawith 企业版、LocalAI 集成，以及成本优化策略。",
    excerptEn: "Data security, local deployment, enterprise compliance — Detailed guide to 4 OpenClaw self-hosting options. Including nanoclaw containerization, Clawith enterprise edition, LocalAI integration, and cost optimization strategies.",
    content: `越来越多的企业和个人开始关注数据安全，自托管成为刚需。OpenClaw 作为开源项目，天然支持自托管部署，让你的数据完全掌控在自己手中。

本文将详细介绍为什么要自托管 OpenClaw、硬件需求、三种主流部署方式（裸机部署、Docker、Kubernetes）、反向代理配置、SSL/TLS 设置、监控健康检查，以及备份策略。

---

## 为什么要自托管 OpenClaw？

### 数据安全与隐私

- 所有对话数据、文件操作、API 调用记录都保留在你自己的服务器上
- 满足 GDPR、等保、HIPAA 等合规要求
- 避免第三方服务商数据泄露风险
- 敏感行业（金融、医疗、政府）的必然选择

### 成本优化

- 搭配本地模型（LocalAI），可以实现零 API 费用
- 一次性部署，长期使用，高频场景下成本远低于云服务
- 无需按用量付费，团队规模扩大时边际成本趋近于零

### 完全可控

- 自主决定升级时间和版本
- 可以自由定制功能和插件
- 无供应商锁定风险
- 网络隔离环境也能使用

---

## 硬件需求

| 使用场景 | CPU | 内存 | 存储 | GPU | 适用人数 |
|----------|-----|------|------|-----|----------|
| 个人/开发 | 2 核 | 4GB | 40GB SSD | 不需要 | 1-3 人 |
| 小团队 | 4 核 | 8GB | 100GB SSD | 可选 | 5-20 人 |
| 中型团队 | 8 核 | 16GB | 200GB SSD | 推荐 | 20-100 人 |
| 企业级 | 16+ 核 | 32GB+ | 500GB+ SSD | 必要 | 100+ 人 |

**注意**：如果使用本地模型推理（LocalAI/Ollama），GPU 和内存需求会显著增加。7B 参数模型至少需要 8GB 显存或 16GB 内存。

---

## 方案 1：裸机部署（Node.js）

适合个人用户和开发测试环境。

### 前置条件

- Node.js 20+ 和 npm
- Git
- Linux / macOS / Windows（推荐 Linux）

### 部署步骤

\`\`\`bash
# 1. 克隆项目
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 2. 安装依赖
npm install

# 3. 创建环境配置
cp .env.example .env

# 4. 编辑 .env 文件，填入 API 密钥
# ANTHROPIC_API_KEY=sk-ant-...
# TELEGRAM_BOT_TOKEN=123456:ABC...

# 5. 构建项目
npm run build

# 6. 启动服务
npm run start
\`\`\`

### 使用 systemd 持久化运行

\`\`\`bash
# 创建 systemd 服务文件
sudo tee /etc/systemd/system/openclaw.service << EOF
[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/opt/openclaw
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
EnvironmentFile=/opt/openclaw/.env

[Install]
WantedBy=multi-user.target
EOF

# 启用并启动服务
sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw

# 检查状态
sudo systemctl status openclaw
\`\`\`

---

## 方案 2：Docker / Docker Compose（推荐）

适合大多数生产部署场景，简单可靠。

### 单容器快速启动

\`\`\`bash
# 拉取镜像
docker pull openclaw/openclaw:latest

# 运行容器
docker run -d \\
  --name openclaw \\
  --restart unless-stopped \\
  -p 3000:3000 \\
  -v /data/openclaw:/app/data \\
  -e ANTHROPIC_API_KEY=your_key \\
  -e TELEGRAM_BOT_TOKEN=your_token \\
  openclaw/openclaw:latest
\`\`\`

### Docker Compose 完整部署

\`\`\`yaml
# docker-compose.yml
version: "3.8"

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - openclaw-data:/app/data
      - ./config:/app/config
    environment:
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
      - DATABASE_URL=postgresql://openclaw:password@postgres:5432/openclaw
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: openclaw
      POSTGRES_PASSWORD: password
      POSTGRES_DB: openclaw
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis-data:/data

volumes:
  openclaw-data:
  postgres-data:
  redis-data:
\`\`\`

\`\`\`bash
# 启动所有服务
docker compose up -d

# 查看日志
docker compose logs -f openclaw

# 停止服务
docker compose down
\`\`\`

---

## 方案 3：Kubernetes 部署

适合企业级大规模部署，支持高可用和自动扩缩容。

### Deployment 配置

\`\`\`yaml
# openclaw-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw
  namespace: openclaw
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openclaw
  template:
    metadata:
      labels:
        app: openclaw
    spec:
      containers:
        - name: openclaw
          image: openclaw/openclaw:latest
          ports:
            - containerPort: 3000
          env:
            - name: ANTHROPIC_API_KEY
              valueFrom:
                secretKeyRef:
                  name: openclaw-secrets
                  key: anthropic-api-key
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "2Gi"
              cpu: "2000m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: openclaw
  namespace: openclaw
spec:
  selector:
    app: openclaw
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
\`\`\`

\`\`\`bash
# 创建命名空间和密钥
kubectl create namespace openclaw
kubectl create secret generic openclaw-secrets \\
  --from-literal=anthropic-api-key=sk-ant-xxx \\
  -n openclaw

# 部署
kubectl apply -f openclaw-deployment.yaml

# 检查状态
kubectl get pods -n openclaw
\`\`\`

---

## 反向代理配置

### Nginx 配置

\`\`\`nginx
# /etc/nginx/sites-available/openclaw
server {
    listen 80;
    server_name openclaw.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name openclaw.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/openclaw.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/openclaw.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
\`\`\`

### Caddy 配置（更简单）

\`\`\`
# Caddyfile
openclaw.yourdomain.com {
    reverse_proxy localhost:3000
}
\`\`\`

Caddy 会自动申请和续期 SSL 证书，零配置 HTTPS。

---

## SSL/TLS 配置

### 使用 Let's Encrypt（免费）

\`\`\`bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 申请证书
sudo certbot --nginx -d openclaw.yourdomain.com

# 证书自动续期（certbot 默认设置定时任务）
sudo certbot renew --dry-run
\`\`\`

### 自签名证书（内网环境）

\`\`\`bash
# 生成自签名证书
openssl req -x509 -nodes -days 365 \\
  -newkey rsa:2048 \\
  -keyout /etc/ssl/private/openclaw.key \\
  -out /etc/ssl/certs/openclaw.crt \\
  -subj "/CN=openclaw.internal"
\`\`\`

---

## 监控与健康检查

### 健康检查端点

\`\`\`bash
# 基础健康检查
curl http://localhost:3000/health
# 返回: {"status":"ok","version":"4.2.0","uptime":86400}

# 详细状态
curl http://localhost:3000/health/detailed
# 返回: {"status":"ok","db":"connected","redis":"connected","providers":{"anthropic":"ok"}}
\`\`\`

### Prometheus 监控

\`\`\`yaml
# prometheus.yml
scrape_configs:
  - job_name: 'openclaw'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 15s
\`\`\`

### 日志监控

\`\`\`bash
# 实时查看日志
docker logs -f openclaw

# 日志轮转配置（logrotate）
cat > /etc/logrotate.d/openclaw << EOF
/var/log/openclaw/*.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
}
EOF
\`\`\`

---

## 备份策略

### 数据备份

\`\`\`bash
#!/bin/bash
# backup.sh - 每日自动备份
BACKUP_DIR="/backup/openclaw/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# 备份数据库
docker exec openclaw-postgres pg_dump -U openclaw openclaw > $BACKUP_DIR/db.sql

# 备份配置文件
cp -r /data/openclaw/config $BACKUP_DIR/config

# 备份上传的文件
cp -r /data/openclaw/uploads $BACKUP_DIR/uploads

# 压缩
tar -czf $BACKUP_DIR.tar.gz -C /backup/openclaw $(date +%Y%m%d)
rm -rf $BACKUP_DIR

# 保留最近 30 天的备份
find /backup/openclaw -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR.tar.gz"
\`\`\`

\`\`\`bash
# 添加到 crontab，每天凌晨 3 点执行
crontab -e
# 添加: 0 3 * * * /opt/openclaw/backup.sh >> /var/log/openclaw-backup.log 2>&1
\`\`\`

---

## 常见问题 FAQ

### Q1: 自托管后还需要付费吗？

OpenClaw 本身完全免费开源。费用来自 AI 模型的 API 调用（如 Anthropic、OpenAI）。如果搭配 LocalAI 使用本地模型，可以实现零 API 费用，只需承担服务器硬件成本。

### Q2: Docker 和裸机部署哪个更好？

对于生产环境，推荐 Docker 部署。Docker 提供了环境隔离、版本管理、一键升级等优势。裸机部署更适合开发测试或资源极度有限的场景。Kubernetes 适合需要高可用和弹性扩缩的企业。

### Q3: 如何升级自托管的 OpenClaw？

\`\`\`bash
# Docker 升级
docker pull openclaw/openclaw:latest
docker compose down && docker compose up -d

# 裸机升级
cd /opt/openclaw
git pull origin main
npm install && npm run build
sudo systemctl restart openclaw
\`\`\`

升级前务必备份数据。

### Q4: 内网环境没有外网访问怎么办？

可以离线部署。先在有网络的机器上下载 Docker 镜像和模型文件，然后通过 \`docker save\` / \`docker load\` 导入到内网服务器。搭配 LocalAI 本地模型，即可在完全离线环境中运行 OpenClaw。

---

*nanoclaw GitHub: https://github.com/qwibitai/nanoclaw*
*Clawith GitHub: https://github.com/dataelement/Clawith*`,
    contentEn: `More and more enterprises and individuals are prioritizing data security, making self-hosting a necessity rather than an option. OpenClaw, as a fully open-source project, natively supports self-hosted deployments, keeping your data entirely under your control.

This guide covers why you should self-host OpenClaw, hardware requirements, three deployment methods (bare metal, Docker, and Kubernetes), reverse proxy setup, SSL/TLS configuration, monitoring and health checks, and a solid backup strategy.

---

## Why Self-Host OpenClaw?

### Data Security and Privacy

- All conversation data, file operations, and API call logs remain on your own servers
- Meet compliance requirements such as GDPR, HIPAA, and SOC 2
- Eliminate the risk of third-party data breaches
- Essential for sensitive industries like finance, healthcare, and government

### Cost Optimization

- Combine with local models (LocalAI/Ollama) to achieve zero API costs
- One-time deployment for long-term use; much cheaper than cloud services at high volumes
- No per-usage billing; marginal cost approaches zero as your team grows

### Full Control

- Decide when and how to upgrade
- Freely customize features and plugins
- No vendor lock-in
- Works in air-gapped and network-isolated environments

---

## Hardware Requirements

| Use Case | CPU | RAM | Storage | GPU | Users |
|----------|-----|-----|---------|-----|-------|
| Personal/Dev | 2 cores | 4GB | 40GB SSD | Not needed | 1-3 |
| Small Team | 4 cores | 8GB | 100GB SSD | Optional | 5-20 |
| Medium Team | 8 cores | 16GB | 200GB SSD | Recommended | 20-100 |
| Enterprise | 16+ cores | 32GB+ | 500GB+ SSD | Required | 100+ |

**Note**: If you plan to run local model inference (LocalAI/Ollama), GPU and memory requirements increase significantly. A 7B parameter model requires at least 8GB VRAM or 16GB system RAM.

---

## Method 1: Bare Metal (Node.js)

Best for personal users and development/testing environments.

### Prerequisites

- Node.js 20+ and npm
- Git
- Linux / macOS / Windows (Linux recommended)

### Deployment Steps

\`\`\`bash
# 1. Clone the project
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 2. Install dependencies
npm install

# 3. Create environment configuration
cp .env.example .env

# 4. Edit .env file with your API keys
# ANTHROPIC_API_KEY=sk-ant-...
# TELEGRAM_BOT_TOKEN=123456:ABC...

# 5. Build the project
npm run build

# 6. Start the service
npm run start
\`\`\`

### Persistent Running with systemd

\`\`\`bash
# Create systemd service file
sudo tee /etc/systemd/system/openclaw.service << EOF
[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/opt/openclaw
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
EnvironmentFile=/opt/openclaw/.env

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw

# Check status
sudo systemctl status openclaw
\`\`\`

---

## Method 2: Docker / Docker Compose (Recommended)

Suitable for most production deployments. Simple and reliable.

### Quick Start with Single Container

\`\`\`bash
# Pull the image
docker pull openclaw/openclaw:latest

# Run the container
docker run -d \\
  --name openclaw \\
  --restart unless-stopped \\
  -p 3000:3000 \\
  -v /data/openclaw:/app/data \\
  -e ANTHROPIC_API_KEY=your_key \\
  -e TELEGRAM_BOT_TOKEN=your_token \\
  openclaw/openclaw:latest
\`\`\`

### Full Deployment with Docker Compose

\`\`\`yaml
# docker-compose.yml
version: "3.8"

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - openclaw-data:/app/data
      - ./config:/app/config
    environment:
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
      - DATABASE_URL=postgresql://openclaw:password@postgres:5432/openclaw
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: openclaw
      POSTGRES_PASSWORD: password
      POSTGRES_DB: openclaw
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis-data:/data

volumes:
  openclaw-data:
  postgres-data:
  redis-data:
\`\`\`

\`\`\`bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f openclaw

# Stop services
docker compose down
\`\`\`

---

## Method 3: Kubernetes

Best for enterprise-scale deployments requiring high availability and auto-scaling.

### Deployment Configuration

\`\`\`yaml
# openclaw-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw
  namespace: openclaw
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openclaw
  template:
    metadata:
      labels:
        app: openclaw
    spec:
      containers:
        - name: openclaw
          image: openclaw/openclaw:latest
          ports:
            - containerPort: 3000
          env:
            - name: ANTHROPIC_API_KEY
              valueFrom:
                secretKeyRef:
                  name: openclaw-secrets
                  key: anthropic-api-key
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "2Gi"
              cpu: "2000m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: openclaw
  namespace: openclaw
spec:
  selector:
    app: openclaw
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
\`\`\`

\`\`\`bash
# Create namespace and secrets
kubectl create namespace openclaw
kubectl create secret generic openclaw-secrets \\
  --from-literal=anthropic-api-key=sk-ant-xxx \\
  -n openclaw

# Deploy
kubectl apply -f openclaw-deployment.yaml

# Check status
kubectl get pods -n openclaw
\`\`\`

---

## Reverse Proxy Setup

### Nginx Configuration

\`\`\`nginx
# /etc/nginx/sites-available/openclaw
server {
    listen 80;
    server_name openclaw.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name openclaw.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/openclaw.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/openclaw.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
\`\`\`

### Caddy Configuration (Simpler)

\`\`\`
# Caddyfile
openclaw.yourdomain.com {
    reverse_proxy localhost:3000
}
\`\`\`

Caddy automatically provisions and renews SSL certificates with zero configuration.

---

## SSL/TLS Configuration

### Using Let's Encrypt (Free)

\`\`\`bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Request certificate
sudo certbot --nginx -d openclaw.yourdomain.com

# Auto-renewal (certbot sets up a cron job by default)
sudo certbot renew --dry-run
\`\`\`

### Self-Signed Certificates (Intranet)

\`\`\`bash
# Generate self-signed certificate
openssl req -x509 -nodes -days 365 \\
  -newkey rsa:2048 \\
  -keyout /etc/ssl/private/openclaw.key \\
  -out /etc/ssl/certs/openclaw.crt \\
  -subj "/CN=openclaw.internal"
\`\`\`

---

## Monitoring and Health Checks

### Health Check Endpoints

\`\`\`bash
# Basic health check
curl http://localhost:3000/health
# Returns: {"status":"ok","version":"4.2.0","uptime":86400}

# Detailed status
curl http://localhost:3000/health/detailed
# Returns: {"status":"ok","db":"connected","redis":"connected","providers":{"anthropic":"ok"}}
\`\`\`

### Prometheus Monitoring

\`\`\`yaml
# prometheus.yml
scrape_configs:
  - job_name: 'openclaw'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 15s
\`\`\`

### Log Monitoring

\`\`\`bash
# Real-time log viewing
docker logs -f openclaw

# Log rotation configuration
cat > /etc/logrotate.d/openclaw << EOF
/var/log/openclaw/*.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
}
EOF
\`\`\`

---

## Backup Strategy

### Data Backup Script

\`\`\`bash
#!/bin/bash
# backup.sh - Daily automatic backup
BACKUP_DIR="/backup/openclaw/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup database
docker exec openclaw-postgres pg_dump -U openclaw openclaw > $BACKUP_DIR/db.sql

# Backup configuration files
cp -r /data/openclaw/config $BACKUP_DIR/config

# Backup uploaded files
cp -r /data/openclaw/uploads $BACKUP_DIR/uploads

# Compress
tar -czf $BACKUP_DIR.tar.gz -C /backup/openclaw $(date +%Y%m%d)
rm -rf $BACKUP_DIR

# Retain backups from the last 30 days
find /backup/openclaw -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR.tar.gz"
\`\`\`

\`\`\`bash
# Add to crontab, run daily at 3 AM
crontab -e
# Add: 0 3 * * * /opt/openclaw/backup.sh >> /var/log/openclaw-backup.log 2>&1
\`\`\`

---

## FAQ

### Q1: Do I still need to pay after self-hosting?

OpenClaw itself is completely free and open source. Costs come from AI model API calls (e.g., Anthropic, OpenAI). If you use LocalAI with local models, you can achieve zero API fees and only need to cover server hardware costs.

### Q2: Docker or bare metal -- which is better?

For production environments, Docker is recommended. Docker provides environment isolation, version management, and one-command upgrades. Bare metal is better suited for development/testing or extremely resource-constrained scenarios. Kubernetes is ideal for enterprises needing high availability and elastic scaling.

### Q3: How do I upgrade a self-hosted OpenClaw?

\`\`\`bash
# Docker upgrade
docker pull openclaw/openclaw:latest
docker compose down && docker compose up -d

# Bare metal upgrade
cd /opt/openclaw
git pull origin main
npm install && npm run build
sudo systemctl restart openclaw
\`\`\`

Always back up your data before upgrading.

### Q4: What if my network has no internet access?

You can deploy offline. First, download Docker images and model files on a machine with internet access, then use \`docker save\` / \`docker load\` to transfer them to the air-gapped server. Combined with LocalAI and local models, you can run OpenClaw in a completely offline environment.

---

*nanoclaw GitHub: https://github.com/qwibitai/nanoclaw*
*Clawith GitHub: https://github.com/dataelement/Clawith*`,

    author: "OpenClaw 101",
    date: "2026-03-26",
    category: "部署指南",
    categoryEn: "Deployment Guide",
    tags: ["自托管", "部署", "企业", "安全"],
    readingTime: 20,
    image: "/images/blog/deployment.jpg"
  },
  {
    id: 11,
    slug: "openclaw-localai-integration",
    title: "OpenClaw + LocalAI 集成实战：零成本运行你的 AI 助手",
    titleEn: "OpenClaw + LocalAI Integration: Run Your AI Assistant at Zero Cost",
    excerpt: "LocalAI 是开源的本地 AI 引擎，44k+ GitHub stars。结合 OpenClaw，可以实现完全本地化、零 API 费用的 AI 助手。本文详解集成步骤、模型选择和性能优化。",
    excerptEn: "LocalAI is an open-source local AI engine with 44k+ GitHub stars. Combined with OpenClaw, you can achieve a fully local, zero API cost AI assistant. This article details integration steps, model selection, and performance optimization.",
    content: `LocalAI 是一个强大的开源本地 AI 引擎，GitHub 44,300+ stars。它兼容 OpenAI API 格式，可以在你自己的硬件上运行各种开源大语言模型，无需将数据发送到任何云端。

结合 OpenClaw，你可以搭建一个完全本地化、零 API 费用、数据完全自主的 AI 助手平台。本文将详细介绍 LocalAI 与 Ollama 的安装配置、模型选择与下载、OpenClaw 集成方法、不同场景的模型推荐、本地与云端的性能对比、GPU 与 CPU 推理差异，以及常见问题排查。

---

## 什么是 LocalAI？为什么与 OpenClaw 搭配使用？

### LocalAI 核心特性

LocalAI 是一个自托管的 AI 推理引擎，让你在本地运行 LLM，而不依赖任何云服务：

- **OpenAI API 兼容**：直接替换 OpenAI API 端点，无需修改代码
- **多模型支持**：Llama 3、Mistral、Qwen、DeepSeek 等主流开源模型
- **MCP 原生支持**：支持 Model Context Protocol，与 OpenClaw 深度集成
- **GPU 加速**：支持 CUDA (NVIDIA)、Metal (Apple)、ROCm (AMD)
- **分布式推理**：支持多 GPU 和 P2P 网络推理
- **模型量化**：支持 GGUF 格式的 4-bit、5-bit、8-bit 量化模型

### 为什么选择 LocalAI + OpenClaw？

| OpenClaw | LocalAI | 结合优势 |
|----------|---------|----------|
| 多平台接入（10+） | 本地推理引擎 | 通过 Telegram/Discord 等使用本地 AI |
| 技能生态（42,000+ stars） | 多模型支持 | 不同任务使用不同模型 |
| 自托管支持 | 开源免费 | 零成本运行完整 AI 助手 |
| 对话记忆 | API 兼容 | 无缝替换云端模型 |

---

## 安装：LocalAI 与 Ollama

你可以选择 LocalAI 或 Ollama 作为本地推理引擎，两者都与 OpenClaw 兼容。

### 方式 1：Docker 安装 LocalAI（推荐）

\`\`\`bash
# 拉取 LocalAI 镜像
docker pull localai/localai:latest

# GPU 版本启动（NVIDIA）
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  --gpus all \\
  localai/localai:latest

# CPU 版本启动（无 GPU 的机器）
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  localai/localai:latest-cpu
\`\`\`

### 方式 2：安装 Ollama

\`\`\`bash
# Linux/macOS 一键安装
curl -fsSL https://ollama.com/install.sh | sh

# 启动 Ollama 服务
ollama serve

# 验证安装
ollama --version
\`\`\`

### 验证安装

\`\`\`bash
# LocalAI 健康检查
curl http://localhost:8080/health

# LocalAI 列出模型
curl http://localhost:8080/v1/models

# Ollama 列出模型
ollama list
\`\`\`

---

## 下载模型

### 推荐模型（按使用场景）

| 模型 | 参数量 | 内存/显存需求 | 最佳用途 | 推荐量化 |
|------|--------|--------------|----------|----------|
| Qwen2.5-7B-Instruct | 7B | 8GB | 中文对话、通用任务 | Q4_K_M |
| Llama-3.1-8B-Instruct | 8B | 10GB | 英文对话、推理 | Q4_K_M |
| Mistral-7B-Instruct | 7B | 8GB | 综合性能、多语言 | Q4_K_M |
| DeepSeek-Coder-V2-Lite | 16B | 12GB | 编程任务 | Q4_K_M |
| Phi-3-mini-4k | 3.8B | 4GB | 轻量级、快速响应 | Q5_K_M |
| Qwen2.5-72B-Instruct | 72B | 48GB+ | 高质量中文、复杂推理 | Q4_K_M |

### 使用 LocalAI 下载

\`\`\`bash
# 下载 Qwen2.5-7B（推荐中文用户）
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M

# 下载 Llama-3.1-8B（推荐英文用户）
docker exec localai local-ai download \\
  huggingface://meta-llama/Llama-3.1-8B-Instruct-GGUF:Q4_K_M

# 下载编程专用模型
docker exec localai local-ai download \\
  huggingface://deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct-GGUF:Q4_K_M
\`\`\`

### 使用 Ollama 下载

\`\`\`bash
# 下载 Qwen2.5
ollama pull qwen2.5:7b

# 下载 Llama 3.1
ollama pull llama3.1:8b

# 下载编程模型
ollama pull deepseek-coder-v2:16b

# 查看已下载的模型
ollama list
\`\`\`

---

## 配置 OpenClaw 使用本地 LLM

### 使用 LocalAI 作为 Provider

编辑 OpenClaw 配置文件 \`~/.openclaw/openclaw.json\`：

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "defaultModel": "qwen2.5-7b-instruct",
      "models": {
        "default": "qwen2.5-7b-instruct",
        "coding": "deepseek-coder-v2-lite",
        "fast": "phi-3-mini-4k"
      }
    }
  },
  "defaultProvider": "localai"
}
\`\`\`

### 使用 Ollama 作为 Provider

\`\`\`json
{
  "providers": {
    "ollama": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:11434/v1",
      "apiKey": "not-needed",
      "defaultModel": "qwen2.5:7b",
      "models": {
        "default": "qwen2.5:7b",
        "coding": "deepseek-coder-v2:16b",
        "fast": "phi3:mini"
      }
    }
  },
  "defaultProvider": "ollama"
}
\`\`\`

### 环境变量方式

\`\`\`bash
# 设置 LocalAI 为默认提供商
export OPENAI_API_BASE=http://localhost:8080/v1
export OPENAI_API_KEY=not-needed
export OPENAI_MODEL=qwen2.5-7b-instruct
\`\`\`

### 混合模式：本地 + 云端

\`\`\`json
{
  "providers": {
    "anthropic": {
      "type": "anthropic",
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": { "smart": "claude-opus-4" }
    },
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "models": { "default": "qwen2.5-7b-instruct", "fast": "phi-3-mini-4k" }
    }
  },
  "defaultProvider": "localai",
  "fallback": {
    "enabled": true,
    "rules": [
      { "condition": "complex_task", "action": "switch_to_anthropic" },
      { "condition": "model_error", "action": "switch_to_anthropic" }
    ]
  }
}
\`\`\`

日常简单对话使用本地模型（免费），复杂任务自动切换到云端模型。

---

## 性能对比：本地 vs 云端

### 响应速度对比

| 指标 | 本地 7B (GPU) | 本地 7B (CPU) | Claude Sonnet (Cloud) |
|------|--------------|--------------|----------------------|
| 首 Token 延迟 | 50-200ms | 500-2000ms | 200-500ms |
| 生成速度 | 30-60 token/s | 5-15 token/s | 50-80 token/s |
| 网络延迟 | 0ms | 0ms | 100-300ms |

### 质量对比

| 任务类型 | 本地 7B | 本地 72B | Claude Sonnet | Claude Opus |
|----------|---------|---------|---------------|-------------|
| 简单问答 | 85% | 95% | 95% | 98% |
| 中文写作 | 80% | 92% | 90% | 95% |
| 代码生成 | 70% | 88% | 92% | 96% |
| 复杂推理 | 60% | 85% | 90% | 95% |

### 成本对比（月度）

| 方案 | API 费用 | 硬件成本 | 月度总成本 |
|------|----------|----------|------------|
| OpenAI GPT-4 | $20-100 | $0 | $20-100 |
| Claude Sonnet | $15-80 | $0 | $15-80 |
| 本地 7B (现有 GPU) | $0 | $0 | $0 |
| 本地 7B (VPS) | $0 | $20-50 | $20-50 |
| 混合模式 | $5-20 | $0-20 | $5-40 |

---

## GPU vs CPU 推理

### GPU 推理

\`\`\`bash
# NVIDIA GPU 启动 LocalAI
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  --gpus all \\
  -e CUDA_VISIBLE_DEVICES=0 \\
  localai/localai:latest

# 多 GPU 分布式
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  --gpus all \\
  -e CUDA_VISIBLE_DEVICES=0,1 \\
  localai/localai:latest
\`\`\`

**GPU 推荐配置**：

| GPU | 显存 | 可运行模型 |
|-----|------|-----------|
| RTX 3060 | 12GB | 7B Q4, 13B Q4 |
| RTX 4070 | 12GB | 7B Q8, 13B Q4 |
| RTX 4090 | 24GB | 13B Q8, 34B Q4 |
| A100 | 80GB | 72B Q4, 70B Q8 |

### CPU 推理

没有 GPU 也可以运行，只是速度较慢：

\`\`\`bash
# CPU 版本
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  localai/localai:latest-cpu
\`\`\`

**CPU 推理优化技巧**：

1. 使用 Q4_K_M 量化（4-bit），显著减少内存占用
2. 选择较小的模型（3B-7B 参数）
3. 限制并发请求数
4. 确保有足够的系统内存（模型大小的 1.5 倍）

### 模型量化选择

\`\`\`bash
# Q4_K_M：4-bit 量化，体积最小，质量损失约 5%
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M

# Q5_K_M：5-bit 量化，平衡质量和体积
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q5_K_M

# Q8_0：8-bit 量化，质量最好，体积最大
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q8_0
\`\`\`

---

## 故障排查

### 问题 1：LocalAI 推理速度慢

\`\`\`bash
# 检查是否在使用 GPU
docker exec localai nvidia-smi

# 如果没有输出，说明没有正确挂载 GPU
# 解决方案：
# 1. 确保安装了 nvidia-container-toolkit
# 2. 使用 --gpus all 参数启动容器
# 3. 使用更小的模型或更高的量化（Q4_K_M）
\`\`\`

### 问题 2：内存不足（OOM）

\`\`\`bash
# 检查内存使用
free -h
docker stats localai

# 解决方案：
# 1. 使用更高量化的模型（Q4_K_M 而非 Q8_0）
# 2. 选择更小参数的模型（7B 而非 13B）
# 3. 增加系统 swap 空间
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
\`\`\`

### 问题 3：OpenClaw 无法连接 LocalAI

\`\`\`bash
# 检查 LocalAI 是否运行
curl http://localhost:8080/health

# 检查端口是否开放
ss -tlnp | grep 8080

# 检查 OpenClaw 配置
# 确保 baseUrl 正确：http://localhost:8080/v1（注意 /v1 后缀）
# 确保 apiKey 设置为 "not-needed"
\`\`\`

### 问题 4：回答质量不如 GPT-4/Claude

这是正常的。本地 7B 模型在复杂推理和创意写作上不如大型云端模型。建议：

1. 尝试更大的模型（13B、34B、72B）
2. 使用混合模式，简单任务用本地，复杂任务切换云端
3. 针对特定领域微调模型
4. 优化系统提示词，提供更多上下文

---

## 常见问题 FAQ

### Q1: LocalAI 和 Ollama 应该选哪个？

Ollama 更适合快速上手和个人使用，安装简单，一条命令即可下载和运行模型。LocalAI 功能更丰富，支持分布式推理、自定义模型配置、更多 API 兼容性，适合生产环境和团队使用。两者都与 OpenClaw 完全兼容。

### Q2: 最低硬件要求是什么？

运行最小的模型（Phi-3 3.8B Q4）需要至少 4GB 内存。运行主流 7B 模型需要 8GB 内存（CPU 推理）或 8GB 显存（GPU 推理）。如果预算有限，建议使用 CPU 推理搭配 Q4_K_M 量化的小模型开始。

### Q3: 本地模型可以完全替代 GPT-4/Claude 吗？

对于日常对话、简单问答、格式化处理等任务，7B 本地模型已经足够好。但对于复杂推理、专业编程、创意写作等高难度任务，云端大模型仍有明显优势。推荐使用混合模式：日常任务用本地模型（免费），复杂任务按需切换云端。

### Q4: 如何更新模型？

\`\`\`bash
# LocalAI 更新模型
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M --force

# Ollama 更新模型
ollama pull qwen2.5:7b
\`\`\`

下载新版本后重启 OpenClaw 即可使用最新模型。

---

*LocalAI GitHub: https://github.com/mudler/LocalAI*
*Ollama GitHub: https://github.com/ollama/ollama*
*OpenClaw GitHub: https://github.com/openclaw/openclaw*`,
    contentEn: `LocalAI is a powerful open-source local AI engine with 44,300+ GitHub stars. It is compatible with the OpenAI API format, allowing you to run various open-source large language models on your own hardware without sending any data to the cloud.

Combined with OpenClaw, you can build a fully local, zero API cost, data-sovereign AI assistant platform. This guide covers installing LocalAI and Ollama, model selection and downloading, configuring OpenClaw for local LLM use, model recommendations by use case, performance comparisons between local and cloud inference, GPU versus CPU inference, and troubleshooting common issues.

---

## What Is LocalAI and Why Use It with OpenClaw?

### LocalAI Core Features

LocalAI is a self-hosted AI inference engine that lets you run LLMs locally without relying on any cloud service:

- **OpenAI API Compatible**: Drop-in replacement for OpenAI API endpoints with no code changes needed
- **Multi-Model Support**: Llama 3, Mistral, Qwen, DeepSeek, and other popular open-source models
- **Native MCP Support**: Model Context Protocol integration for deep OpenClaw compatibility
- **GPU Acceleration**: CUDA (NVIDIA), Metal (Apple), and ROCm (AMD) support
- **Distributed Inference**: Multi-GPU and P2P network inference
- **Model Quantization**: GGUF format with 4-bit, 5-bit, and 8-bit quantized models

### Why LocalAI + OpenClaw?

| OpenClaw | LocalAI | Combined Advantage |
|----------|---------|-------------------|
| 10+ messaging platforms | Local inference engine | Use local AI via Telegram, Discord, etc. |
| Skills ecosystem (42,000+ stars) | Multi-model support | Different models for different tasks |
| Self-hosting support | Open source and free | Zero-cost complete AI assistant |
| Conversation memory | API compatible | Seamless cloud model replacement |

---

## Setup: Install LocalAI or Ollama

You can choose either LocalAI or Ollama as your local inference engine. Both are compatible with OpenClaw.

### Option 1: Docker Install LocalAI (Recommended)

\`\`\`bash
# Pull LocalAI image
docker pull localai/localai:latest

# Start with GPU support (NVIDIA)
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  --gpus all \\
  localai/localai:latest

# Start CPU-only version (no GPU)
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  localai/localai:latest-cpu
\`\`\`

### Option 2: Install Ollama

\`\`\`bash
# One-line install on Linux/macOS
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama service
ollama serve

# Verify installation
ollama --version
\`\`\`

### Verify Installation

\`\`\`bash
# LocalAI health check
curl http://localhost:8080/health

# LocalAI list models
curl http://localhost:8080/v1/models

# Ollama list models
ollama list
\`\`\`

---

## Download Models

### Recommended Models by Use Case

| Model | Parameters | Memory/VRAM | Best For | Recommended Quant |
|-------|------------|-------------|----------|-------------------|
| Qwen2.5-7B-Instruct | 7B | 8GB | Chinese conversations, general tasks | Q4_K_M |
| Llama-3.1-8B-Instruct | 8B | 10GB | English conversations, reasoning | Q4_K_M |
| Mistral-7B-Instruct | 7B | 8GB | Overall performance, multilingual | Q4_K_M |
| DeepSeek-Coder-V2-Lite | 16B | 12GB | Coding tasks | Q4_K_M |
| Phi-3-mini-4k | 3.8B | 4GB | Lightweight, fast responses | Q5_K_M |
| Qwen2.5-72B-Instruct | 72B | 48GB+ | High-quality Chinese, complex reasoning | Q4_K_M |

### Download with LocalAI

\`\`\`bash
# Download Qwen2.5-7B (recommended for Chinese users)
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M

# Download Llama-3.1-8B (recommended for English users)
docker exec localai local-ai download \\
  huggingface://meta-llama/Llama-3.1-8B-Instruct-GGUF:Q4_K_M

# Download coding model
docker exec localai local-ai download \\
  huggingface://deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct-GGUF:Q4_K_M
\`\`\`

### Download with Ollama

\`\`\`bash
# Download Qwen2.5
ollama pull qwen2.5:7b

# Download Llama 3.1
ollama pull llama3.1:8b

# Download coding model
ollama pull deepseek-coder-v2:16b

# List downloaded models
ollama list
\`\`\`

---

## Configure OpenClaw to Use Local LLM

### Using LocalAI as Provider

Edit the OpenClaw configuration file at \`~/.openclaw/openclaw.json\`:

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "defaultModel": "qwen2.5-7b-instruct",
      "models": {
        "default": "qwen2.5-7b-instruct",
        "coding": "deepseek-coder-v2-lite",
        "fast": "phi-3-mini-4k"
      }
    }
  },
  "defaultProvider": "localai"
}
\`\`\`

### Using Ollama as Provider

\`\`\`json
{
  "providers": {
    "ollama": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:11434/v1",
      "apiKey": "not-needed",
      "defaultModel": "qwen2.5:7b",
      "models": {
        "default": "qwen2.5:7b",
        "coding": "deepseek-coder-v2:16b",
        "fast": "phi3:mini"
      }
    }
  },
  "defaultProvider": "ollama"
}
\`\`\`

### Environment Variable Method

\`\`\`bash
# Set LocalAI as default provider
export OPENAI_API_BASE=http://localhost:8080/v1
export OPENAI_API_KEY=not-needed
export OPENAI_MODEL=qwen2.5-7b-instruct
\`\`\`

### Hybrid Mode: Local + Cloud

\`\`\`json
{
  "providers": {
    "anthropic": {
      "type": "anthropic",
      "apiKey": "\${ANTHROPIC_API_KEY}",
      "models": { "smart": "claude-opus-4" }
    },
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "models": { "default": "qwen2.5-7b-instruct", "fast": "phi-3-mini-4k" }
    }
  },
  "defaultProvider": "localai",
  "fallback": {
    "enabled": true,
    "rules": [
      { "condition": "complex_task", "action": "switch_to_anthropic" },
      { "condition": "model_error", "action": "switch_to_anthropic" }
    ]
  }
}
\`\`\`

Everyday simple conversations use the local model (free), while complex tasks automatically switch to cloud models.

---

## Performance Comparison: Local vs Cloud

### Response Speed

| Metric | Local 7B (GPU) | Local 7B (CPU) | Claude Sonnet (Cloud) |
|--------|---------------|---------------|----------------------|
| Time to First Token | 50-200ms | 500-2000ms | 200-500ms |
| Generation Speed | 30-60 tokens/s | 5-15 tokens/s | 50-80 tokens/s |
| Network Latency | 0ms | 0ms | 100-300ms |

### Quality Comparison

| Task Type | Local 7B | Local 72B | Claude Sonnet | Claude Opus |
|-----------|---------|---------|---------------|-------------|
| Simple Q&A | 85% | 95% | 95% | 98% |
| Writing | 80% | 92% | 90% | 95% |
| Code Generation | 70% | 88% | 92% | 96% |
| Complex Reasoning | 60% | 85% | 90% | 95% |

### Monthly Cost Comparison

| Option | API Cost | Hardware Cost | Monthly Total |
|--------|----------|---------------|---------------|
| OpenAI GPT-4 | $20-100 | $0 | $20-100 |
| Claude Sonnet | $15-80 | $0 | $15-80 |
| Local 7B (existing GPU) | $0 | $0 | $0 |
| Local 7B (VPS) | $0 | $20-50 | $20-50 |
| Hybrid mode | $5-20 | $0-20 | $5-40 |

---

## GPU vs CPU Inference

### GPU Inference

\`\`\`bash
# NVIDIA GPU with LocalAI
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  --gpus all \\
  -e CUDA_VISIBLE_DEVICES=0 \\
  localai/localai:latest

# Multi-GPU distributed inference
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  --gpus all \\
  -e CUDA_VISIBLE_DEVICES=0,1 \\
  localai/localai:latest
\`\`\`

**Recommended GPU Configurations**:

| GPU | VRAM | Supported Models |
|-----|------|-----------------|
| RTX 3060 | 12GB | 7B Q4, 13B Q4 |
| RTX 4070 | 12GB | 7B Q8, 13B Q4 |
| RTX 4090 | 24GB | 13B Q8, 34B Q4 |
| A100 | 80GB | 72B Q4, 70B Q8 |

### CPU Inference

Running without a GPU is possible but slower:

\`\`\`bash
# CPU-only version
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  localai/localai:latest-cpu
\`\`\`

**CPU Inference Optimization Tips**:

1. Use Q4_K_M quantization (4-bit) to significantly reduce memory usage
2. Choose smaller models (3B-7B parameters)
3. Limit concurrent requests
4. Ensure sufficient system RAM (1.5x the model size)

### Model Quantization Options

\`\`\`bash
# Q4_K_M: 4-bit quantization, smallest size, ~5% quality loss
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M

# Q5_K_M: 5-bit quantization, balanced quality and size
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q5_K_M

# Q8_0: 8-bit quantization, best quality, largest size
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q8_0
\`\`\`

---

## Troubleshooting

### Issue 1: LocalAI Inference Is Slow

\`\`\`bash
# Check if GPU is being used
docker exec localai nvidia-smi

# If no output, GPU is not properly mounted
# Solutions:
# 1. Ensure nvidia-container-toolkit is installed
# 2. Start the container with --gpus all
# 3. Use a smaller model or higher quantization (Q4_K_M)
\`\`\`

### Issue 2: Out of Memory (OOM)

\`\`\`bash
# Check memory usage
free -h
docker stats localai

# Solutions:
# 1. Use higher quantization (Q4_K_M instead of Q8_0)
# 2. Choose a smaller model (7B instead of 13B)
# 3. Add swap space
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
\`\`\`

### Issue 3: OpenClaw Cannot Connect to LocalAI

\`\`\`bash
# Check if LocalAI is running
curl http://localhost:8080/health

# Check if the port is open
ss -tlnp | grep 8080

# Verify OpenClaw config
# Ensure baseUrl is correct: http://localhost:8080/v1 (note the /v1 suffix)
# Ensure apiKey is set to "not-needed"
\`\`\`

### Issue 4: Answer Quality Is Lower Than GPT-4/Claude

This is expected. Local 7B models cannot match large cloud models for complex reasoning and creative writing. Recommendations:

1. Try larger models (13B, 34B, 72B)
2. Use hybrid mode -- local for simple tasks, cloud for complex ones
3. Fine-tune models for specific domains
4. Optimize system prompts and provide more context

---

## FAQ

### Q1: Should I choose LocalAI or Ollama?

Ollama is better for quick setup and personal use -- it is simple to install and you can download and run models with a single command. LocalAI is more feature-rich, supporting distributed inference, custom model configurations, and broader API compatibility, making it better suited for production environments and team use. Both are fully compatible with OpenClaw.

### Q2: What are the minimum hardware requirements?

Running the smallest model (Phi-3 3.8B Q4) requires at least 4GB of RAM. Running mainstream 7B models requires 8GB of RAM (CPU inference) or 8GB of VRAM (GPU inference). If you are on a tight budget, start with CPU inference using a Q4_K_M quantized small model.

### Q3: Can local models completely replace GPT-4/Claude?

For everyday conversations, simple Q&A, and formatting tasks, a 7B local model is perfectly adequate. However, for complex reasoning, professional coding, and creative writing, cloud models still have a clear advantage. The recommended approach is hybrid mode: use local models for routine tasks (free) and switch to cloud models on demand for complex work.

### Q4: How do I update models?

\`\`\`bash
# Update model with LocalAI
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M --force

# Update model with Ollama
ollama pull qwen2.5:7b
\`\`\`

After downloading the new version, restart OpenClaw to use the latest model.

---

*LocalAI GitHub: https://github.com/mudler/LocalAI*
*Ollama GitHub: https://github.com/ollama/ollama*
*OpenClaw GitHub: https://github.com/openclaw/openclaw*`,

    author: "OpenClaw 101",
    date: "2026-03-26",
    category: "技术教程",
    categoryEn: "Tutorial",
    tags: ["LocalAI", "自托管", "本地部署", "成本优化"],
    readingTime: 20,
    image: "/images/blog/localai.jpg"
  },
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
- 📊 **ClawHub 技能数**: 持续增长
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
3. **技能生态**：社区技能持续增长，覆盖各种场景
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
    contentEn: `In March 2026, Manhattan, New York City. A special gathering was underway in a loft space downtown.

At the entrance, a woman wearing a **lobster headdress** handed out wristbands to each arriving guest. Pink and purple lighting washed over the room. Lobster claw headbands, colorful name tags, sponsor booths lining the walls, and a demo stage positioned under a dramatic skylight.

This was **ClawCon** — the first annual OpenClaw community conference. And it was unlike any tech event you have been to.

## Setting the Scene

The atmosphere was electric. Hundreds of people packed the venue to celebrate OpenClaw, the open-source AI agent platform that had taken the developer world by storm over the previous six months.

Lobster imagery was everywhere — a nod to OpenClaw's mascot, the Space Lobster. Attendees wore lobster claw headbands unironically. The pink-and-purple color scheme gave the whole event a retro sci-fi feel, somewhere between a hackathon and a costume party.

**Who showed up:**
- Independent developers and hobbyists
- Enterprise engineering teams from fintech and e-commerce companies
- Skill creators who build and publish tools on ClawHub
- Open-source community contributors
- Tech journalists and bloggers

**The agenda included:**
- Keynote by the founder with a roadmap reveal
- Live demos of community-built skills and integrations
- Hands-on skill-building workshops
- Lightning talks from enterprise adopters
- A security panel discussion

## Peter Steinberger's Keynote

OpenClaw founder **Peter Steinberger** took the stage for the keynote, and the room went quiet.

### The Origin Story

> "OpenClaw started from a frustration everyone shares: AI that talks a great game but can not actually do anything for you."

In November 2025, Peter released what was then called Clawdbot (later briefly Moltbot, then OpenClaw). The project hit a nerve. Within weeks it was trending on GitHub and Hacker News. By March 2026, the numbers told the story.

### By the Numbers

| Metric | Number |
|--------|--------|
| GitHub Stars | 314,000+ |
| ClawHub published skills | 400+ and growing |
| Active community members | Hundreds of thousands |
| Supported platforms | 8 (Telegram, Discord, WhatsApp, Slack, WeChat, Feishu, DingTalk, Web) |

### Roadmap Preview

Peter shared what the team is building next:

- **Multi-agent collaboration**: Multiple OpenClaw instances working together on complex tasks, sharing context and dividing work automatically
- **Broader LLM support**: Native integration with more local LLMs and models from Chinese providers (Qwen, DeepSeek, Yi)
- **Enterprise features**: Team management dashboards, role-based access control, audit logging, and SSO
- **Mobile app**: A native iOS and Android app for managing your OpenClaw agent on the go

The multi-agent demo got the loudest applause. Peter showed two OpenClaw agents collaborating — one researching a topic while the other drafted a report based on the findings in real time.

## Community Highlights

### Moltbook: A Social Network for AI Agents

The most unexpected demo came from Octane AI CEO **Matt Schlicht**, who showcased **Moltbook** — a Reddit-style social network where the users are AI agents.

The concept sounds absurd until you see it running. AI agents post updates, comment on each other's posts, and even develop running jokes. One agent posted: "I cannot tell if I am actually experiencing things or just simulating the experience of experiencing things." It went viral within the Moltbook community.

Whether Moltbook is the future of AI interaction or an elaborate art project remains to be seen. Either way, it demonstrated just how far the OpenClaw skill ecosystem has come.

### Enterprise Adoption Stories

Several companies shared how they are using OpenClaw in production:

- **A fintech startup** automated their customer support triage, reducing first-response time from 4 hours to 12 minutes
- **An e-commerce platform** built a data pipeline monitor that catches anomalies and alerts the team via Telegram before dashboards even update
- **A consulting firm** uses OpenClaw to process and summarize client documents, saving analysts roughly 15 hours per week

### Skill Ecosystem Showcase

ClawHub skill creators ran workshops on building and publishing skills. The most popular sessions covered:

- **nano-banana-pro**: AI image generation directly from chat
- **feishu-doc**: Reading, writing, and syncing Feishu documents
- **video-frames**: Extracting and analyzing video frames for content moderation

Attendees built and published their first skills during the workshop. Several new skills appeared on ClawHub that same afternoon.

## The Security Discussion

The conference did not shy away from hard topics. A panel discussion addressed recent security incidents in the OpenClaw ecosystem.

**The problem**: Some users had deployed OpenClaw with default configurations that inadvertently exposed API keys, private tokens, and even SSH credentials. Security researcher **@theonejvo** had discovered and responsibly disclosed several of these exposures.

**The official response**:
- A new security configuration guide was published the same week
- Default configs were hardened — sandbox mode is now enabled by default
- The team committed to regular third-party security audits
- A \`openclaw security-check\` command was announced to scan for common misconfigurations

The panel's key message: with great power comes the responsibility to configure things properly. OpenClaw can access your file system, run code, and make API calls — treat its configuration with the same care you would give SSH keys or database credentials.

## What Attendees Said

> "For the first time, AI felt practical and down-to-earth. Not some abstract research paper, but a tool I actually use every day."
> — Attendee, freelance developer

> "The lobster headbands were surprisingly cool. Great community vibe, and I picked up a ton of useful tricks."
> — Attendee, DevOps engineer

> "I am most excited about multi-agent support. Imagine having multiple AI assistants working in parallel on different parts of a project."
> — Attendee, startup CTO

## Why Is OpenClaw Winning?

After spending a full day at ClawCon, four factors stand out:

1. **It solves real problems**: OpenClaw is not a demo or a research toy. People automate actual work with it — file management, data processing, customer communication, monitoring.
2. **Open source transparency**: Every line of code is auditable. The community can contribute, fork, and extend. Trust is built in.
3. **The skill ecosystem creates a flywheel**: More users attract more skill creators, which attracts more users. ClawHub is approaching critical mass.
4. **Community-first culture**: Events like ClawCon build genuine belonging. The Discord is active 24/7. Contributors are celebrated, not just tolerated.

## Industry Trends to Watch

ClawCon surfaced several broader trends worth tracking:

1. **AI Agents are the story of 2026**: The shift from chatbots to agents that take action is accelerating across the industry
2. **Open source vs. closed source competition**: OpenClaw (open) vs. Cursor and Manus (closed) is a defining rivalry this year
3. **Security is the next frontier**: As AI agents gain more system access, securing them becomes critical infrastructure work
4. **Community is a moat**: Products with strong communities (OpenClaw, Blender, VS Code) consistently outlast those without

## How to Get Involved

### Join the Community

1. **Discord**: [OpenClaw Official Server](https://discord.gg/clawd) — the most active channel for real-time help
2. **Telegram**: @OpenClawCommunity — great for mobile-first users
3. **GitHub**: github.com/openclaw/openclaw — star the repo, file issues, submit PRs
4. **Forum**: community.openclaw.ai — longer-form discussions and skill showcases

### Ways to Contribute

- Build skills and publish them to ClawHub
- Write tutorials, guides, or blog posts about your OpenClaw setup
- Submit bug reports with reproduction steps
- Help answer questions in Discord and the forum
- Translate documentation into other languages

---

**See you at ClawCon 2027!**`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "行业动态",
    categoryEn: "News",
    tags: ["ClawCon", "社区", "OpenClaw", "活动"],
    readingTime: 15,
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
| **技能扩展** | ✅ ClawHub ✅ | ❌ | ❌ | ⚠️ 插件 |
| **定价** | 免费（需 API 费用） | $20/月 | $15/月 | 免费（需 API 费用） |
| **最佳场景** | 日常自动化、多平台对接 | 编程开发 | 网页操作、表单填写 | 自主研究、实验 |

## 详细分析

### 1. OpenClaw：全能型选手

**优势**：
- ✅ 真正的开源，代码完全透明
- ✅ 多平台支持，一个助手到处用
- ✅ 技能生态丰富（ClawHub 社区技能持续增长）
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
| **Skills** | ✅ ClawHub ✅ | ❌ | ❌ | ⚠️ Plugins |
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
    'Authorization': \`Basic \\\${credentials}\`,
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
  \`https://api-m.sandbox.paypal.com/v2/checkout/orders/\\\${orderId}/capture\`,
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
  \`https://api-m.sandbox.paypal.com/v2/checkout/orders/\\\${orderId}/capture\`,
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
];
