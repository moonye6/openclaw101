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

## 配置文件位置

OpenClaw 的主配置文件位于：

\`\`\`
~/.openclaw/openclaw.json
\`\`\`

首次运行时会自动创建。

---

## 核心配置结构

\`\`\`json
{
  "version": "4.2",
  "providers": { ... },
  "channels": { ... },
  "skills": { ... },
  "security": { ... },
  "memory": { ... }
}
\`\`\`

---

## Provider 配置

Provider 定义了 AI 模型来源。

### Anthropic Claude

\`\`\`json
{
  "providers": {
    "anthropic": {
      "type": "anthropic",
      "apiKey": "${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5",
        "smart": "claude-opus-4"
      }
    }
  }
}
\`\`\`

**参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 提供商类型 |
| apiKey | string | API 密钥，支持环境变量 |
| models.default | string | 默认模型 |
| models.fast | string | 快速模型（简单任务） |
| models.smart | string | 智能模型（复杂任务） |

### OpenAI

\`\`\`json
{
  "providers": {
    "openai": {
      "type": "openai",
      "apiKey": "${OPENAI_API_KEY}",
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

### 多 Provider 配置

\`\`\`json
{
  "providers": {
    "anthropic": { ... },
    "openai": { ... },
    "localai": { ... }
  },
  "defaultProvider": "anthropic"
}
\`\`\`

---

## Channel 配置

Channel 定义了消息平台连接。

### Telegram

\`\`\`json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}",
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

**参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| enabled | boolean | 是否启用 |
| botToken | string | Bot Token |
| dmPolicy | string | 私聊策略: open/pairing/deny |
| groupPolicy | string | 群组策略: open/allowlist/deny |
| requireMention | boolean | 群组是否需要 @ 提及 |

### Discord

\`\`\`json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "${DISCORD_BOT_TOKEN}",
      "applicationId": "${DISCORD_APP_ID}",
      "intents": ["Guilds", "GuildMessages", "DirectMessages"],
      "dmPolicy": "open"
    }
  }
}
\`\`\`

### 飞书

\`\`\`json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}",
      "appSecret": "${FEISHU_APP_SECRET}",
      "encryptKey": "${FEISHU_ENCRYPT_KEY}",
      "verificationToken": "${FEISHU_VERIFY_TOKEN}"
    }
  }
}
\`\`\`

### 钉钉

\`\`\`json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "client_id": "${DINGTALK_CLIENT_ID}",
      "client_secret": "${DINGTALK_CLIENT_SECRET}"
    }
  }
}
\`\`\`

### WhatsApp

\`\`\`json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "phoneNumberId": "${WA_PHONE_ID}",
      "businessAccountId": "${WA_BUSINESS_ID}",
      "accessToken": "${WA_ACCESS_TOKEN}"
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
    "enabled": ["weather", "github", "coding-agent"],
    "disabled": ["browser"]
  }
}
\`\`\`

### 技能配置

\`\`\`json
{
  "skills": {
    "configs": {
      "weather": {
        "defaultCity": "北京",
        "units": "metric"
      },
      "github": {
        "defaultRepo": "openclaw/openclaw"
      }
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

## Security 配置

### 基本安全设置

\`\`\`json
{
  "security": {
    "allowedHosts": ["api.anthropic.com", "api.openai.com"],
    "blockedCommands": ["rm -rf", "sudo"],
    "maxCommandTimeout": 60000,
    "requireConfirmation": ["file:delete", "exec:elevated"]
  }
}
\`\`\`

**参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| allowedHosts | string[] | 允许访问的域名 |
| blockedCommands | string[] | 禁止执行的命令模式 |
| maxCommandTimeout | number | 命令最大超时时间(ms) |
| requireConfirmation | string[] | 需要确认的操作 |

### 沙箱模式

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

## Memory 配置

### 对话记忆

\`\`\`json
{
  "memory": {
    "conversation": {
      "enabled": true,
      "maxMessages": 100,
      "summarizeThreshold": 50
    }
  }
}
\`\`\`

### 长期记忆

\`\`\`json
{
  "memory": {
    "longTerm": {
      "enabled": true,
      "storage": "sqlite",
      "path": "~/.openclaw/memory.db"
    }
  }
}
\`\`\`

### RAG 配置

\`\`\`json
{
  "memory": {
    "rag": {
      "enabled": true,
      "embeddingModel": "text-embedding-3-small",
      "chunkSize": 1000,
      "chunkOverlap": 200
    }
  }
}
\`\`\`

---

## Logging 配置

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

---

## 环境变量

推荐使用环境变量存储敏感信息：

\`\`\`bash
# ~/.bashrc 或 ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-..."
export TELEGRAM_BOT_TOKEN="123456:ABC..."
export DISCORD_BOT_TOKEN="MTk4NjIy..."
\`\`\`

在配置文件中引用：

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "${ANTHROPIC_API_KEY}"
    }
  }
}
\`\`\`

---

## 配置示例

### 最小配置

\`\`\`json
{
  "providers": {
    "anthropic": {
      "apiKey": "${ANTHROPIC_API_KEY}"
    }
  },
  "channels": {
    "telegram": {
      "botToken": "${TELEGRAM_BOT_TOKEN}"
    }
  }
}
\`\`\`

### 生产配置

\`\`\`json
{
  "version": "4.2",
  "providers": {
    "anthropic": {
      "apiKey": "${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6",
        "fast": "claude-haiku-3-5"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist"
    },
    "discord": {
      "enabled": true,
      "botToken": "${DISCORD_BOT_TOKEN}"
    }
  },
  "security": {
    "sandbox": {
      "enabled": true,
      "mode": "docker"
    },
    "requireConfirmation": ["file:delete"]
  },
  "memory": {
    "conversation": {
      "enabled": true,
      "maxMessages": 50
    }
  }
}
\`\`\`

---

## 配置验证

运行验证命令检查配置：

\`\`\`bash
openclaw config validate
\`\`\`

---

*最后更新: 2026-03-29*`,
    contentEn: `OpenClaw's power lies in its high configurability.

Through configuration files, you can:
- Choose different AI models
- Connect to multiple messaging platforms
- Enable/disable skills
- Adjust security policies
- Customize behavior

---

## Configuration File Location

\`\`\`
~/.openclaw/openclaw.json
\`\`\`

Created automatically on first run.

---

## Core Configuration Structure

\`\`\`json
{
  "version": "4.2",
  "providers": { ... },
  "channels": { ... },
  "skills": { ... },
  "security": { ... },
  "memory": { ... }
}
\`\`\`

---

## Provider Configuration

### Anthropic Claude

\`\`\`json
{
  "providers": {
    "anthropic": {
      "type": "anthropic",
      "apiKey": "${ANTHROPIC_API_KEY}",
      "models": {
        "default": "claude-sonnet-4-6"
      }
    }
  }
}
\`\`\`

### OpenAI

\`\`\`json
{
  "providers": {
    "openai": {
      "type": "openai",
      "apiKey": "${OPENAI_API_KEY}",
      "models": {
        "default": "gpt-4-turbo"
      }
    }
  }
}
\`\`\`

### LocalAI

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed"
    }
  }
}
\`\`\`

---

## Channel Configuration

### Telegram

\`\`\`json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "open"
    }
  }
}
\`\`\`

### Discord

\`\`\`json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "${DISCORD_BOT_TOKEN}"
    }
  }
}
\`\`\`

---

## Skills Configuration

\`\`\`json
{
  "skills": {
    "enabled": ["weather", "github"],
    "disabled": ["browser"]
  }
}
\`\`\`

---

## Security Configuration

\`\`\`json
{
  "security": {
    "allowedHosts": ["api.anthropic.com"],
    "requireConfirmation": ["file:delete"]
  }
}
\`\`\`

---

## Environment Variables

\`\`\`bash
export ANTHROPIC_API_KEY="sk-ant-..."
export TELEGRAM_BOT_TOKEN="123456:ABC..."
\`\`\`

---

*Last updated: 2026-03-29*`,
    author: "OpenClaw 101",
    date: "2026-03-29",
    category: "技术教程",
    categoryEn: "Tutorial",
    tags: ["配置", "参数", "入门", "定制化"],
    readingTime: 12,
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

- **ClawHub**：官方技能市场，8000+ 技能
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

- **ClawHub**: Official marketplace, 8000+ skills
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
    content: `越来越多的企业和个人开始关注数据安全，自托管成为刚需。

OpenClaw 提供 **4 种自托管方案**，满足不同场景的需求。

## 为什么需要自托管？

### 数据安全

- 敏感数据不经过第三方服务器
- 满足 GDPR、等保等合规要求
- 避免数据泄露风险

### 成本优化

- 使用本地模型，无 API 费用
- 一次性部署，长期使用
- 适合高频使用场景

### 自主控制

- 完全控制服务运行
- 可根据需求定制
- 无供应商锁定风险

## 方案 1：本地部署（最简单）

### 适用场景

- 个人用户
- 开发测试
- 学习研究

### 部署步骤

\`\`\`bash
# 克隆项目
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 API 密钥

# 启动服务
npm run dev
\`\`\`

### 优势

- 部署简单，5 分钟完成
- 完全免费
- 适合开发和测试

### 劣势

- 需要保持电脑开机
- 不适合生产环境
- 无高可用保障

## 方案 2：VPS 部署（推荐）

### 适用场景

- 个人或小团队
- 24/7 在线服务
- 生产环境

### 部署步骤

\`\`\`bash
# 在 VPS 上安装 Docker
curl -fsSL https://get.docker.com | sh

# 拉取 OpenClaw 镜像
docker pull openclaw/openclaw:latest

# 运行容器
docker run -d \\
  --name openclaw \\
  -p 3000:3000 \\
  -v /data/openclaw:/app/data \\
  -e ANTHROPIC_API_KEY=your_key \\
  openclaw/openclaw:latest
\`\`\`

### 推荐配置

| 用户规模 | CPU | 内存 | 存储 | 月费用 |
|----------|-----|------|------|--------|
| 个人 | 2 核 | 4GB | 40GB | $5-10 |
| 小团队 | 4 核 | 8GB | 100GB | $20-40 |
| 中团队 | 8 核 | 16GB | 200GB | $50-100 |

### 优势

- 24/7 在线
- 可配置域名和 HTTPS
- 支持多用户访问

## 方案 3：nanoclaw（最安全）

### 适用场景

- 对安全要求高
- 需要容器隔离
- 企业级部署

### 什么是 nanoclaw？

nanoclaw 是 OpenClaw 的安全容器化版本：

- 运行在 Docker 容器中
- 网络隔离
- 资源限制
- 审计日志

### 部署步骤

\`\`\`bash
# 克隆 nanoclaw
git clone https://github.com/qwibitai/nanoclaw.git
cd nanoclaw

# 配置
cp config.example.yaml config.yaml
# 编辑 config.yaml

# 启动
docker-compose up -d
\`\`\`

### 安全特性

\`\`\`yaml
# nanoclaw 安全配置示例
security:
  network:
    isolation: true
    allowed_hosts:
      - api.anthropic.com
  resources:
    memory_limit: 2GB
    cpu_limit: 1
  audit:
    enabled: true
    log_file: /var/log/nanoclaw/audit.log
\`\`\`

### 优势

- 容器隔离，安全性高
- 资源可控
- 审计日志完善

## 方案 4：Clawith 企业版（企业首选）

### 适用场景

- 中大型企业
- 多团队协作
- 高合规要求

### 什么是 Clawith？

Clawith 是 OpenClaw 的企业版：

- 多租户支持
- 权限管理
- SSO 集成
- 企业级支持

### 部署架构

\`\`\`
┌─────────────┐
│   Nginx     │ ← 负载均衡
└──────┬──────┘
       │
┌──────┴──────┐
│  Clawith    │ ← 主服务
├─────────────┤
│ PostgreSQL  │ ← 数据库
│ Redis       │ ← 缓存
│ MinIO       │ ← 对象存储
└─────────────┘
\`\`\`

### 企业特性

| 特性 | 说明 |
|------|------|
| 多租户 | 支持多部门独立管理 |
| 权限管理 | RBAC 角色权限控制 |
| SSO | 支持 LDAP、SAML、OAuth |
| 审计日志 | 完整操作记录 |
| 高可用 | 支持集群部署 |
| 技术支持 | 企业级 SLA |

### 优势

- 企业级功能完整
- 技术支持有保障
- 合规性强

## 成本对比

| 方案 | 初期成本 | 月度成本 | 适用规模 |
|------|----------|----------|----------|
| 本地部署 | $0 | $0-20（API） | 个人 |
| VPS 部署 | $0 | $10-50 | 小团队 |
| nanoclaw | $0 | $20-100 | 中团队 |
| Clawith 企业版 | $500-2000 | $200-1000 | 企业 |

## 选择建议

| 需求 | 推荐方案 |
|------|----------|
| 个人使用，预算有限 | 本地部署 |
| 小团队，24/7 在线 | VPS 部署 |
| 安全要求高 | nanoclaw |
| 企业合规 | Clawith 企业版 |

---

*nanoclaw GitHub: https://github.com/qwibitai/nanoclaw*
*Clawith GitHub: https://github.com/dataelement/Clawith*`,
    contentEn: `More enterprises and individuals are concerned about data security, making self-hosting a necessity.

OpenClaw provides **4 self-hosting options** for different scenarios.

## Why Self-host?

### Data Security

- Sensitive data stays on your servers
- Meet GDPR, compliance requirements
- Avoid data breach risks

### Cost Optimization

- Use local models, no API fees
- One-time deployment, long-term use
- Suitable for high-frequency usage

### Full Control

- Complete control over service
- Customize as needed
- No vendor lock-in

## Option 1: Local Deployment (Simplest)

### Use Case

- Personal users
- Development & testing
- Learning & research

### Deployment Steps

\`\`\`bash
# Clone project
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env file, add API keys

# Start service
npm run dev
\`\`\`

### Pros & Cons

✅ Simple, 5-minute setup
✅ Completely free
✅ Great for development

❌ Requires computer to stay on
❌ Not for production
❌ No high availability

## Option 2: VPS Deployment (Recommended)

### Use Case

- Personal or small teams
- 24/7 online service
- Production environment

### Deployment Steps

\`\`\`bash
# Install Docker on VPS
curl -fsSL https://get.docker.com | sh

# Pull OpenClaw image
docker pull openclaw/openclaw:latest

# Run container
docker run -d \\
  --name openclaw \\
  -p 3000:3000 \\
  -v /data/openclaw:/app/data \\
  -e ANTHROPIC_API_KEY=your_key \\
  openclaw/openclaw:latest
\`\`\`

### Recommended Configurations

| Scale | CPU | RAM | Storage | Monthly Cost |
|-------|-----|-----|---------|--------------|
| Personal | 2 cores | 4GB | 40GB | $5-10 |
| Small team | 4 cores | 8GB | 100GB | $20-40 |
| Medium team | 8 cores | 16GB | 200GB | $50-100 |

## Option 3: nanoclaw (Most Secure)

### Use Case

- High security requirements
- Container isolation needed
- Enterprise deployment

### What is nanoclaw?

nanoclaw is OpenClaw's secure containerized version:

- Runs in Docker containers
- Network isolation
- Resource limits
- Audit logs

### Deployment

\`\`\`bash
git clone https://github.com/qwibitai/nanoclaw.git
cd nanoclaw

cp config.example.yaml config.yaml
# Edit config.yaml

docker-compose up -d
\`\`\`

### Security Features

\`\`\`yaml
security:
  network:
    isolation: true
    allowed_hosts:
      - api.anthropic.com
  resources:
    memory_limit: 2GB
    cpu_limit: 1
  audit:
    enabled: true
    log_file: /var/log/nanoclaw/audit.log
\`\`\`

## Option 4: Clawith Enterprise (Enterprise Choice)

### Use Case

- Medium to large enterprises
- Multi-team collaboration
- High compliance requirements

### What is Clawith?

Clawith is OpenClaw's enterprise edition:

- Multi-tenant support
- Permission management
- SSO integration
- Enterprise support

### Enterprise Features

| Feature | Description |
|---------|-------------|
| Multi-tenant | Support multiple departments |
| Permission Management | RBAC role-based control |
| SSO | LDAP, SAML, OAuth support |
| Audit Logs | Complete operation records |
| High Availability | Cluster deployment |
| Technical Support | Enterprise SLA |

## Cost Comparison

| Option | Initial Cost | Monthly Cost | Scale |
|--------|--------------|--------------|-------|
| Local | $0 | $0-20 (API) | Personal |
| VPS | $0 | $10-50 | Small team |
| nanoclaw | $0 | $20-100 | Medium team |
| Clawith Enterprise | $500-2000 | $200-1000 | Enterprise |

## Recommendations

| Need | Recommended Option |
|------|-------------------|
| Personal, limited budget | Local deployment |
| Small team, 24/7 online | VPS deployment |
| High security requirements | nanoclaw |
| Enterprise compliance | Clawith Enterprise |

---

*nanoclaw GitHub: https://github.com/qwibitai/nanoclaw*
*Clawith GitHub: https://github.com/dataelement/Clawith*`,
    author: "OpenClaw 101",
    date: "2026-03-26",
    category: "部署指南",
    categoryEn: "Deployment Guide",
    tags: ["自托管", "部署", "企业", "安全"],
    readingTime: 15,
    image: "/images/blog/deployment.jpg"
  },
  {
    id: 11,
    slug: "openclaw-localai-integration",
    title: "OpenClaw + LocalAI 集成实战：零成本运行你的 AI 助手",
    titleEn: "OpenClaw + LocalAI Integration: Run Your AI Assistant at Zero Cost",
    excerpt: "LocalAI 是开源的本地 AI 引擎，44k+ GitHub stars。结合 OpenClaw，可以实现完全本地化、零 API 费用的 AI 助手。本文详解集成步骤、模型选择和性能优化。",
    excerptEn: "LocalAI is an open-source local AI engine with 44k+ GitHub stars. Combined with OpenClaw, you can achieve a fully local, zero API cost AI assistant. This article details integration steps, model selection, and performance optimization.",
    content: `LocalAI 是一个强大的开源本地 AI 引擎，GitHub 44,300+ stars。

结合 OpenClaw，你可以实现：
- **完全本地化**：数据不离开你的服务器
- **零 API 费用**：使用开源模型，无需付费
- **多模型支持**：Llama, Mistral, Qwen 等主流模型

## 为什么选择 LocalAI？

### 与 OpenClaw 的完美契合

| OpenClaw | LocalAI | 结合优势 |
|----------|---------|----------|
| 多平台接入 | 本地推理 | 数据完全自主 |
| 技能生态 | 多模型支持 | 灵活切换模型 |
| 自托管支持 | 开源免费 | 零成本运行 |

### LocalAI 核心特性

- ✅ **多模型支持**：Llama 3, Mistral, Qwen, DeepSeek
- ✅ **API 兼容**：兼容 OpenAI API 格式
- ✅ **MCP 支持**：原生支持 Model Context Protocol
- ✅ **GPU 加速**：支持 CUDA, Metal, ROCm
- ✅ **分布式推理**：支持多 GPU 和 P2P

## 第一步：安装 LocalAI

### Docker 安装（推荐）

\`\`\`bash
# 拉取 LocalAI 镜像
docker pull localai/localai:latest

# 启动 LocalAI
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  --gpus all \\
  localai/localai:latest
\`\`\`

### 验证安装

\`\`\`bash
# 检查服务状态
curl http://localhost:8080/health

# 列出可用模型
curl http://localhost:8080/v1/models
\`\`\`

## 第二步：下载模型

### 推荐模型

| 模型 | 参数量 | 内存需求 | 特点 |
|------|--------|----------|------|
| Qwen2.5-7B | 7B | 8GB | 中文优秀 |
| Llama-3-8B | 8B | 10GB | 英文优秀 |
| Mistral-7B | 7B | 8GB | 综合性能好 |
| DeepSeek-Coder-6.7B | 6.7B | 8GB | 编程专用 |

### 下载模型

\`\`\`bash
# 下载 Qwen2.5 模型（推荐中文用户）
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF

# 或下载 Llama-3 模型
docker exec localai local-ai download \\
  huggingface://meta-llama/Llama-3-8B-Instruct-GGUF
\`\`\`

## 第三步：配置 OpenClaw

### 修改 OpenClaw 配置

编辑 OpenClaw 的配置文件 \`~/.openclaw/config.json\`：

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "defaultModel": "qwen2.5-7b-instruct"
    }
  },
  "defaultProvider": "localai"
}
\`\`\`

### 环境变量方式

\`\`\`bash
# 设置 LocalAI 为默认提供商
export OPENAI_API_BASE=http://localhost:8080/v1
export OPENAI_API_KEY=not-needed
export OPENAI_MODEL=qwen2.5-7b-instruct
\`\`\`

## 第四步：测试集成

### 基础测试

\`\`\`bash
# 启动 OpenClaw
openclaw start

# 在 Telegram 中测试
# 发送消息，观察是否使用 LocalAI
\`\`\`

### 验证本地推理

\`\`\`bash
# 查看 LocalAI 日志
docker logs -f localai

# 确认请求被处理
# 应该看到类似输出：
# [INFO] Processing request with model: qwen2.5-7b-instruct
\`\`\`

## 性能优化

### 1. GPU 加速

\`\`\`bash
# 使用 GPU 启动 LocalAI
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  --gpus all \\
  -e CUDA_VISIBLE_DEVICES=0 \\
  localai/localai:latest
\`\`\`

### 2. 多 GPU 分布式

\`\`\`yaml
# docker-compose.yaml
services:
  localai:
    image: localai/localai:latest
    environment:
      - CUDA_VISIBLE_DEVICES=0,1
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
\`\`\`

### 3. 模型量化

\`\`\`bash
# 使用量化模型减少内存占用
# Q4_K_M 量化：4-bit，质量损失小
# Q5_K_M 量化：5-bit，质量更好
# Q8_0 量化：8-bit，质量最好

docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M
\`\`\`

## 成本对比

| 方案 | API 费用 | 硬件成本 | 月度总成本 |
|------|----------|----------|------------|
| OpenAI GPT-4 | $20-100/月 | $0 | $20-100 |
| Claude Opus | $30-150/月 | $0 | $30-150 |
| LocalAI + Qwen | $0 | VPS $20-50 | $20-50 |

**节省 50-70% 成本！**

## 高级配置

### 多模型切换

\`\`\`json
{
  "providers": {
    "localai": {
      "models": {
        "coding": "deepseek-coder-6.7b",
        "chat": "qwen2.5-7b-instruct",
        "fast": "mistral-7b"
      }
    }
  }
}
\`\`\`

### 自动降级

\`\`\`json
{
  "fallback": {
    "enabled": true,
    "rules": [
      {
        "condition": "rate_limit",
        "action": "switch_to_localai"
      }
    ]
  }
}
\`\`\`

## 常见问题

### Q1: LocalAI 推理速度慢？

**解决方案**：
1. 使用 GPU 加速
2. 选择更小的模型（如 3B 参数）
3. 使用量化模型（Q4_K_M）

### Q2: 内存不足？

**解决方案**：
1. 使用量化模型
2. 增加系统内存
3. 使用更小的模型

### Q3: 回答质量不如 GPT-4？

**解决方案**：
1. 尝试更大的模型（如 13B 参数）
2. 调整温度参数
3. 使用提示词优化

## 总结

**OpenClaw + LocalAI 的优势**：
- ✅ 数据完全自主
- ✅ 零 API 费用
- ✅ 多模型支持
- ✅ 开源可控

**适用场景**：
- 注重数据安全的企业
- 高频使用，成本敏感的用户
- 需要自定义模型的开发者

---

*LocalAI GitHub: https://github.com/mudler/LocalAI*
*OpenClaw GitHub: https://github.com/openclaw/openclaw*`,
    contentEn: `LocalAI is a powerful open-source local AI engine with 44,300+ GitHub stars.

Combined with OpenClaw, you can achieve:
- **Fully Local**: Data never leaves your server
- **Zero API Cost**: Use open-source models for free
- **Multi-model Support**: Llama, Mistral, Qwen, and more

## Why LocalAI?

### Perfect Match with OpenClaw

| OpenClaw | LocalAI | Combined Advantage |
|----------|---------|-------------------|
| Multi-platform access | Local inference | Complete data sovereignty |
| Skills ecosystem | Multi-model support | Flexible model switching |
| Self-hosting support | Open-source free | Zero cost operation |

### LocalAI Core Features

- ✅ **Multi-model**: Llama 3, Mistral, Qwen, DeepSeek
- ✅ **API Compatible**: OpenAI API format
- ✅ **MCP Support**: Native Model Context Protocol
- ✅ **GPU Acceleration**: CUDA, Metal, ROCm
- ✅ **Distributed**: Multi-GPU and P2P support

## Step 1: Install LocalAI

### Docker Installation (Recommended)

\`\`\`bash
# Pull LocalAI image
docker pull localai/localai:latest

# Start LocalAI
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  -v /data/models:/models \\
  --gpus all \\
  localai/localai:latest
\`\`\`

### Verify Installation

\`\`\`bash
# Check service status
curl http://localhost:8080/health

# List available models
curl http://localhost:8080/v1/models
\`\`\`

## Step 2: Download Models

### Recommended Models

| Model | Parameters | Memory | Strength |
|-------|------------|--------|----------|
| Qwen2.5-7B | 7B | 8GB | Excellent for Chinese |
| Llama-3-8B | 8B | 10GB | Excellent for English |
| Mistral-7B | 7B | 8GB | Good overall |
| DeepSeek-Coder-6.7B | 6.7B | 8GB | Coding specialist |

### Download Model

\`\`\`bash
# Download Qwen2.5 (recommended for Chinese users)
docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF

# Or download Llama-3
docker exec localai local-ai download \\
  huggingface://meta-llama/Llama-3-8B-Instruct-GGUF
\`\`\`

## Step 3: Configure OpenClaw

### Edit OpenClaw Config

Edit \`~/.openclaw/config.json\`:

\`\`\`json
{
  "providers": {
    "localai": {
      "type": "openai-compatible",
      "baseUrl": "http://localhost:8080/v1",
      "apiKey": "not-needed",
      "defaultModel": "qwen2.5-7b-instruct"
    }
  },
  "defaultProvider": "localai"
}
\`\`\`

## Step 4: Test Integration

\`\`\`bash
# Start OpenClaw
openclaw start

# Test in Telegram
# Send a message, observe if using LocalAI

# Check LocalAI logs
docker logs -f localai
\`\`\`

## Performance Optimization

### GPU Acceleration

\`\`\`bash
docker run -d \\
  --name localai \\
  -p 8080:8080 \\
  --gpus all \\
  -e CUDA_VISIBLE_DEVICES=0 \\
  localai/localai:latest
\`\`\`

### Model Quantization

\`\`\`bash
# Use quantized models to reduce memory
# Q4_K_M: 4-bit, small quality loss
# Q5_K_M: 5-bit, better quality
# Q8_0: 8-bit, best quality

docker exec localai local-ai download \\
  huggingface://Qwen/Qwen2.5-7B-Instruct-GGUF:Q4_K_M
\`\`\`

## Cost Comparison

| Option | API Cost | Hardware Cost | Monthly Total |
|--------|----------|---------------|---------------|
| OpenAI GPT-4 | $20-100/mo | $0 | $20-100 |
| Claude Opus | $30-150/mo | $0 | $30-150 |
| LocalAI + Qwen | $0 | VPS $20-50 | $20-50 |

**Save 50-70% cost!**

## Summary

**OpenClaw + LocalAI Advantages**:
- ✅ Complete data sovereignty
- ✅ Zero API cost
- ✅ Multi-model support
- ✅ Open-source and controllable

**Use Cases**:
- Enterprises concerned about data security
- High-frequency, cost-sensitive users
- Developers needing custom models

---

*LocalAI GitHub: https://github.com/mudler/LocalAI*
*OpenClaw GitHub: https://github.com/openclaw/openclaw*`,
    author: "OpenClaw 101",
    date: "2026-03-26",
    category: "技术教程",
    categoryEn: "Tutorial",
    tags: ["LocalAI", "自托管", "本地部署", "成本优化"],
    readingTime: 10,
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
  },
  {
    id: 11,
    slug: "agent-harness-architecture",
    title: "Agent 架构解密：OpenClaw 的 Harness 设计哲学",
    titleEn: "Agent Architecture Decoded: OpenClaw's Harness Design Philosophy",
    excerpt: "Agent = Model + Harness。为什么模型本身不是 Agent？Harness 如何让模型变成真正能工作的 Agent？深度解析 OpenClaw 的架构设计。",
    excerptEn: "Agent = Model + Harness. Why models alone aren't agents? How harnesses turn models into working agents? Deep dive into OpenClaw's architecture.",
    content: `在 AI Agent 的世界里，有一个核心公式：

**Agent = Model + Harness**

这个公式来自 LangChain 团队的洞察，同样适用于理解 OpenClaw 的设计哲学。

## 什么是 Harness？

如果你不是模型，你就是 Harness。

**Harness（安全带/框架）** 是所有不是模型本身的代码、配置和执行逻辑：

- 系统提示词（System Prompts）
- 工具和技能（Tools, Skills, MCP）
- 基础设施（文件系统、沙箱、浏览器）
- 编排逻辑（子代理生成、任务分发、模型路由）
- 钩子/中间件（压缩、续写、检查）

**原始模型不是 Agent**，但当 Harness 赋予它状态、工具执行、反馈循环和约束时，它就变成了 Agent。

## 为什么需要 Harness？

模型天生有一些限制：

| 模型能做的 | 模型不能做的 |
|-----------|-------------|
| 理解文本、图像、音频 | 维持持久的对话状态 |
| 生成文本输出 | 执行代码 |
| 推理和规划 | 访问实时知识 |
| 理解工具使用方式 | 设置环境、安装依赖 |

这些限制都需要 Harness 来解决。

## OpenClaw 的 Harness 组件

### 1. 文件系统抽象

\`\`\`
工作原理：
1. 用户请求读取文件
2. Harness 检查路径权限（fs.allowed_paths）
3. 安全读取文件内容
4. 返回给模型处理
\`\`\`

**为什么重要**：
- 持久化存储：工作可以跨越会话保持
- 上下文管理：大文件不需要全部加载到上下文
- 协作表面：多 Agent 可以通过文件协调工作

### 2. 代码执行沙箱

\`\`\`
OpenClaw 执行流程：
1. 模型生成代码
2. Harness 在沙箱中执行
3. 捕获输出和错误
4. 反馈给模型进行迭代
\`\`\`

**安全机制**：
\`\`\`bash
# 禁止危险命令
openclaw config set exec.blocked_commands "rm -rf,format,dd"

# 限制执行超时
openclaw config set exec.timeout 60000
\`\`\`

### 3. 技能系统（Skills）

\`\`\`bash
# 安装技能
openclaw skills install github

# 技能本质上扩展了 Harness 的能力
\`\`\`

技能 = 工具描述 + 执行逻辑 + 错误处理

### 4. 多 Agent 编排

\`\`\`
OpenClaw 子代理系统：
1. 主 Agent 接收任务
2. 评估是否需要子 Agent
3. 生成子 Agent（专注特定任务）
4. 子 Agent 完成后汇报
5. 主 Agent 整合结果
\`\`\`

### 5. 上下文管理

\`\`\`
自动压缩机制：
- 监控上下文使用量
- 在合适时机压缩历史
- 保留关键信息摘要
- 避免 "context rot"
\`\`\`

## Harness 设计原则

### 原则 1：让 Harness "让路"

随着模型能力提升，Harness 应该尽量少干预：

\`\`\`
好的设计：
- 给 Agent 更多控制权
- 避免手工调参
- 让模型自己决定何时压缩、何时切换任务
\`\`\`

### 原则 2：从行为反推设计

\`\`\`
我们想要的行为 → Harness 设计

想要持久存储 → 文件系统抽象
想要执行代码 → Bash/沙箱环境
想要浏览器操作 → Playwright 集成
想要定时任务 → Cron 调度器
\`\`\`

### 原则 3：安全第一

\`\`\`
Harness 的约束功能：
- 路径白名单
- 命令黑名单
- 执行超时
- 资源限制
\`\`\`

## 实战：理解你的 Harness

检查你的 OpenClaw Harness 配置：

\`\`\`bash
# 查看所有配置
openclaw config list

# 文件系统权限
openclaw config get fs.allowed_paths

# 执行限制
openclaw config get exec.blocked_commands

# 模型配置
openclaw config get model
\`\`\`

## Harness vs 模型：谁更重要？

| 维度 | 模型 | Harness |
|------|------|---------|
| 智能 | 核心推理能力 | 工具和约束 |
| 灵活性 | 模型能力上限 | 可扩展性强 |
| 可控性 | 黑盒 | 完全可控 |
| 成本 | API 费用 | 本地资源 |

**结论**：好的 Harness 让普通模型表现优秀，差的 Harness 让优秀模型表现糟糕。

---

## 总结

| 概念 | 说明 |
|------|------|
| **Agent** | Model + Harness |
| **Model** | 提供智能和推理 |
| **Harness** | 让智能变得有用 |
| **技能** | 扩展 Harness 能力 |
| **安全** | Harness 的约束功能 |

**下一步**：检查你的 Harness 配置，确保它让模型发挥最大价值。`,
    contentEn: `In the world of AI Agents, there's a core formula:

**Agent = Model + Harness**

This insight from the LangChain team applies equally to understanding OpenClaw's design philosophy.

## What is a Harness?

If you're not the model, you're the Harness.

**Harness** is all the code, configuration, and execution logic that isn't the model itself:

- System Prompts
- Tools, Skills, MCP
- Infrastructure (filesystem, sandbox, browser)
- Orchestration Logic (subagent spawning, task routing)
- Hooks/Middleware (compression, continuation, checks)

**A raw model is not an Agent**. But when a Harness gives it state, tool execution, feedback loops, and constraints, it becomes one.

## Why Do We Need Harnesses?

Models have inherent limitations:

| What Models Can Do | What Models Can't Do |
|-------------------|---------------------|
| Understand text, images, audio | Maintain durable state |
| Generate text output | Execute code |
| Reason and plan | Access real-time knowledge |
| Understand tool usage | Setup environments |

These limitations require a Harness to solve.

## OpenClaw's Harness Components

### 1. Filesystem Abstraction

\`\`\`
How it works:
1. User requests file read
2. Harness checks path permissions
3. Safely reads file content
4. Returns to model for processing
\`\`\`

### 2. Code Execution Sandbox

\`\`\`bash
# Security mechanisms
openclaw config set exec.blocked_commands "rm -rf,format,dd"
openclaw config set exec.timeout 60000
\`\`\`

### 3. Skills System

\`\`\`bash
# Install skills to extend Harness
openclaw skills install github
\`\`\`

### 4. Multi-Agent Orchestration

\`\`\`
OpenClaw Subagent System:
1. Main Agent receives task
2. Evaluates if subagent needed
3. Spawns subagent (focused on specific task)
4. Subagent reports back
5. Main Agent integrates results
\`\`\`

## Harness Design Principles

### Principle 1: Get Out of the Way

As models improve, Harness should intervene less:
- Give Agents more control
- Avoid manual tuning
- Let models decide when to compress, when to switch tasks

### Principle 2: Design Backwards from Behavior

\`\`\`
Desired Behavior → Harness Design

Want persistent storage → Filesystem abstraction
Want code execution → Bash/sandbox environment
Want browser control → Playwright integration
Want scheduled tasks → Cron scheduler
\`\`\`

### Principle 3: Security First

\`\`\`
Harness constraint features:
- Path whitelist
- Command blacklist
- Execution timeout
- Resource limits
\`\`\`

---

## Summary

| Concept | Description |
|---------|-------------|
| **Agent** | Model + Harness |
| **Model** | Provides intelligence and reasoning |
| **Harness** | Makes intelligence useful |
| **Skills** | Extend Harness capabilities |
| **Security** | Harness constraint features |

**Next Step**: Check your Harness configuration to ensure it lets your model perform at its best.`,
    author: "OpenClaw 101",
    date: "2026-03-24",
    category: "技术深度",
    categoryEn: "Deep Dive",
    tags: ["架构", "Harness", "Agent", "设计"],
    readingTime: 12,
    image: "/og-image.png"
  },
  {
    id: 12,
    slug: "coding-agents-reshape-software-development",
    title: "编程 Agent 如何重塑软件开发：从 PRD 到原型只需几分钟",
    titleEn: "How Coding Agents Reshape Software Development: From PRD to Prototype in Minutes",
    excerpt: "PRD 已死？瓶颈从实现转向审查？编程 Agent 正在改变 Engineering、Product、Design 的协作方式。",
    excerptEn: "PRDs are dead? The bottleneck shifts from implementation to review? Coding agents are changing how Engineering, Product, and Design collaborate.",
    content: `软件开发正在经历一场革命。

过去，一个功能从想法到上线需要：
1. Product 写 PRD（产品需求文档）
2. Design 出设计稿
3. Engineering 写代码实现

现在？有了编程 Agent，这个流程被彻底颠覆。

## PRD 已死？

LangChain 创始人 Harrison Chase 说：**"PRDs are dead"**

这不意味着产品需求不存在了，而是**传统的瀑布式开发流程已经过时**。

### 传统流程 vs Agent 时代

| 传统流程 | Agent 时代 |
|---------|-----------|
| PRD → 设计稿 → 代码 | 想法 → 原型 → 迭代 |
| 周级/月级 | 小时级/分钟级 |
| 专业分工 | 全栈通才 |
| 文档驱动 | 原型驱动 |

### 新的开发流程

\`\`\`
1. 有人有一个想法
2. 直接用编程 Agent 生成原型
3. 团队审查原型
4. 快速迭代优化
5. 发布
\`\`\`

## 瓶颈转移：从实现到审查

以前，写代码是瓶颈：
- 实现需要专业技能
- 耗时长
- 人力成本高

现在，审查成了瓶颈：
- 任何人都能生成代码
- 但代码质量参差不齐
- 需要专业人员把关

### 审查者的新角色

\`\`\`
审查者需要关注：

工程视角：
- 架构是否合理？
- 是否可扩展、可维护？
- 性能是否达标？

产品视角：
- 是否解决了用户痛点？
- 功能是否完整？

设计视角：
- 界面是否直观？
- 体验是否流畅？
\`\`\`

## 角色变化

### 通才更受欢迎

\`\`\`
Agent 时代的黄金技能组合：

1. 产品思维 + 技术理解
   → 能快速验证想法

2. 设计能力 + 编程基础
   → 能独立完成原型

3. 工程经验 + 审查能力
   → 能把控代码质量
\`\`\`

### 专业化的门槛更高

\`\`\`
普通工程师：
- 写 CRUD → Agent 替代
- 写模板代码 → Agent 替代

高级工程师：
- 架构设计 → 仍需人类
- 复杂问题 → 仍需人类
- 代码审查 → 更加重要
\`\`\`

## OpenClaw 如何加速开发

### 1. 快速原型

\`\`\`
用户：帮我创建一个 Next.js 博客网站

OpenClaw：
✅ 创建项目结构
✅ 配置 Tailwind CSS
✅ 创建博客页面
✅ 添加 Markdown 支持
→ 原型就绪，5 分钟
\`\`\`

### 2. 迭代优化

\`\`\`
用户：添加暗黑模式支持

OpenClaw：
✅ 添加主题切换组件
✅ 更新 Tailwind 配置
✅ 修改现有组件
→ 功能完成，2 分钟
\`\`\`

### 3. 代码审查

\`\`\`
用户：审查这个 PR

OpenClaw：
📋 发现 3 个潜在问题：
1. 缺少错误处理
2. XSS 漏洞风险
3. 性能优化建议
\`\`\`

## 团队协作新模式

### 原型驱动开发

\`\`\`
传统：
会议 → PRD → 评审 → 设计 → 开发 → 测试 → 上线
（周期：周-月）

Agent 时代：
想法 → 原型 → 评审 → 迭代 → 上线
（周期：小时-天）
\`\`\`

### 异步协作

\`\`\`
团队成员可以：
- 在不同时区工作
- 独立完成端到端功能
- 通过 Agent 辅助沟通

Agent 充当：
- 实时翻译（想法 → 代码）
- 文档生成
- 测试自动化
\`\`\`

## 实践建议

### 1. 从小开始

\`\`\`
第一步：用 Agent 生成原型
第二步：人工审查和优化
第三步：逐步增加 Agent 职责
\`\`\`

### 2. 保持审查质量

\`\`\`
审查清单：
□ 功能是否正确？
□ 代码是否可读？
□ 是否有安全隐患？
□ 是否有性能问题？
□ 是否有测试覆盖？
\`\`\`

### 3. 持续学习

\`\`\`
Agent 能力在提升：
- 你需要知道它能做什么
- 你需要知道它不能做什么
- 你需要知道如何指导它
\`\`\`

---

## 总结

| 变化 | 说明 |
|------|------|
| **PRD** | 从文档驱动到原型驱动 |
| **瓶颈** | 从实现转移到审查 |
| **角色** | 通才更受欢迎，专才门槛更高 |
| **流程** | 从瀑布到敏捷，从同步到异步 |

**未来已来**：会用 Agent 的人，将比不用 Agent 的人效率高 10 倍。`,
    contentEn: `Software development is undergoing a revolution.

In the past, a feature from idea to production required:
1. Product writes PRD
2. Design creates mockups
3. Engineering implements code

Now? With coding agents, this workflow is completely disrupted.

## PRDs Are Dead?

LangChain founder Harrison Chase says: **"PRDs are dead"**

This doesn't mean product requirements don't exist, but the **traditional waterfall development process is outdated**.

### Traditional vs Agent Era

| Traditional Process | Agent Era |
|--------------------|-----------|
| PRD → Design → Code | Idea → Prototype → Iterate |
| Weeks/Months | Hours/Minutes |
| Specialized roles | Full-stack generalists |
| Document-driven | Prototype-driven |

## Bottleneck Shift: From Implementation to Review

Before, coding was the bottleneck:
- Implementation required specialized skills
- Time-consuming
- High labor costs

Now, review is the bottleneck:
- Anyone can generate code
- But code quality varies
- Needs professional oversight

## OpenClaw Accelerates Development

### 1. Rapid Prototyping

\`\`\`
User: Create a Next.js blog website

OpenClaw:
✅ Create project structure
✅ Configure Tailwind CSS
✅ Create blog pages
✅ Add Markdown support
→ Prototype ready, 5 minutes
\`\`\`

### 2. Iterative Optimization

\`\`\`
User: Add dark mode support

OpenClaw:
✅ Add theme toggle component
✅ Update Tailwind config
✅ Modify existing components
→ Feature complete, 2 minutes
\`\`\`

---

## Summary

| Change | Description |
|--------|-------------|
| **PRD** | From document-driven to prototype-driven |
| **Bottleneck** | Shifts from implementation to review |
| **Roles** | Generalists more valuable, specialists higher bar |
| **Process** | From waterfall to agile, from sync to async |

**The future is here**: Those who use agents will be 10x more productive than those who don't.`,
    author: "OpenClaw 101",
    date: "2026-03-24",
    category: "行业洞察",
    categoryEn: "Insights",
    tags: ["编程Agent", "软件开发", "PRD", "效率"],
    readingTime: 10,
    image: "/og-image.png"
  },
  {
    id: 13,
    slug: "multi-agent-collaboration",
    title: "多 Agent 协作实战：OpenClaw 子代理系统详解",
    titleEn: "Multi-Agent Collaboration: Deep Dive into OpenClaw Subagent System",
    excerpt: "单 Agent 有局限？多 Agent 协作来帮忙。详解 OpenClaw 的子代理系统，实现专业分工、并行执行、任务编排。",
    excerptEn: "Single agent has limits? Multi-agent collaboration helps. Deep dive into OpenClaw's subagent system for specialization, parallel execution, and task orchestration.",
    content: `一个 Agent 能做什么？

- 执行任务
- 使用工具
- 与用户对话

但一个 Agent 也有局限：
- 上下文窗口有限
- 专业能力有限
- 无法并行处理

**解决方案：多 Agent 协作**

## 什么是多 Agent 协作？

借鉴 CrewAI 的概念，一个 Agent 是：

\`\`\`
Agent = 角色 + 目标 + 背景故事 + 工具 + 记忆
\`\`\`

多 Agent 协作就是让多个专业化的 Agent 组成团队，各自负责擅长的领域。

### 类比：软件开发团队

| Agent 角色 | 职责 |
|-----------|------|
| Researcher | 搜索、分析、整理信息 |
| Developer | 编写、修改代码 |
| Reviewer | 审查代码质量 |
| Tester | 编写测试、验证功能 |
| Coordinator | 协调各 Agent、整合结果 |

## OpenClaw 子代理系统

### 架构设计

\`\`\`
                    ┌─────────────┐
                    │   用户请求   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  主 Agent   │
                    │ (协调者)    │
                    └──────┬──────┘
                           │
        ┌──────────┬───────┼───────┬──────────┐
        │          │       │       │          │
   ┌────▼────┐ ┌───▼───┐ ┌─▼──┐ ┌──▼───┐ ┌───▼────┐
   │子Agent A│ │子Agent│ │子  │ │子    │ │子Agent │
   │(研究)   │ │  B    │ │C   │ │D     │ │  E     │
   │         │ │(开发) │ │(测 │ │(审查)│ │(部署)  │
   └─────────┘ └───────┘ └────┘ └──────┘ └────────┘
\`\`\`

### 工作流程

\`\`\`
1. 主 Agent 接收用户任务
2. 分析任务，决定是否需要子 Agent
3. 创建专业化的子 Agent
4. 分配子任务给子 Agent
5. 子 Agent 执行并返回结果
6. 主 Agent 整合结果
7. 向用户报告
\`\`\`

## 实战案例：自动化 PR 审查

### 场景

用户提交了一个 PR，需要：
1. 检查代码风格
2. 运行测试
3. 检查安全漏洞
4. 生成审查报告

### 单 Agent 方案

\`\`\`
问题：
- 串行执行，耗时长
- 上下文膨胀
- 专业程度有限
\`\`\`

### 多 Agent 方案

\`\`\`bash
# 在 OpenClaw 中配置子代理
openclaw config set subagents.enabled true

# 定义子 Agent 角色
openclaw subagent create linter --role "代码风格检查专家"
openclaw subagent create tester --role "测试工程师"
openclaw subagent create security --role "安全审计专家"
\`\`\`

执行流程：

\`\`\`
用户：审查这个 PR

主 Agent：
├── 创建子 Agent: linter
│   └── 输出：发现 3 个风格问题
├── 创建子 Agent: tester
│   └── 输出：测试通过 15/16
├── 创建子 Agent: security
│   └── 输出：发现 1 个潜在漏洞
└── 整合报告：需要修复 4 个问题
\`\`\`

## 配置指南

### 基础配置

\`\`\`bash
# 启用子代理
openclaw config set subagents.enabled true

# 最大并发子代理数
openclaw config set subagents.max_concurrent 5

# 子代理超时时间
openclaw config set subagents.timeout 300000
\`\`\`

### 子代理模板

\`\`\`typescript
// 子代理配置示例
const subagentConfig = {
  name: 'researcher',
  role: '研究员',
  goal: '搜索和分析信息',
  backstory: '你是一个专业的研究员，擅长搜索网络和整理信息',
  tools: ['web_search', 'web_fetch', 'read'],
  max_iterations: 10,
  verbose: true
};
\`\`\`

## 最佳实践

### 1. 明确角色分工

\`\`\`
好的设计：
- 每个子 Agent 有明确的职责
- 职责不重叠
- 便于独立测试和调试

不好的设计：
- 角色模糊
- 职责重叠
- 难以追踪问题
\`\`\`

### 2. 控制并发

\`\`\`
考虑因素：
- API 速率限制
- 系统资源
- 任务依赖关系

建议：
- 并发数不超过 5
- 有依赖的任务串行执行
\`\`\`

### 3. 结果整合

\`\`\`
主 Agent 职责：
1. 收集子 Agent 结果
2. 去重和验证
3. 生成最终报告
4. 向用户呈现
\`\`\`

## 常见问题

### Q: 多 Agent 会增加成本吗？

\`\`\`
是的，但有优化方法：
1. 使用更小的模型给子 Agent
2. 缓存中间结果
3. 并行执行减少时间成本
\`\`\`

### Q: 如何调试多 Agent 系统？

\`\`\`bash
# 启用详细日志
openclaw config set logging.level debug

# 查看子代理日志
openclaw logs --subagent researcher
\`\`\`

---

## 总结

| 概念 | 说明 |
|------|------|
| **单 Agent** | 适合简单任务 |
| **多 Agent** | 适合复杂、多步骤任务 |
| **角色分工** | 每个 Agent 有明确职责 |
| **协调者** | 主 Agent 负责整合 |
| **并发控制** | 平衡效率和成本 |

**下一步**：尝试配置你的第一个子代理，体验多 Agent 协作的力量。`,
    contentEn: `What can a single Agent do?

- Execute tasks
- Use tools
- Chat with users

But a single Agent also has limitations:
- Limited context window
- Limited specialized capabilities
- Cannot process in parallel

**Solution: Multi-Agent Collaboration**

## What is Multi-Agent Collaboration?

Borrowing from CrewAI's concept, an Agent is:

\`\`\`
Agent = Role + Goal + Backstory + Tools + Memory
\`\`\`

Multi-agent collaboration means multiple specialized agents form a team, each responsible for their area of expertise.

### Analogy: Software Development Team

| Agent Role | Responsibility |
|------------|----------------|
| Researcher | Search, analyze, organize information |
| Developer | Write, modify code |
| Reviewer | Review code quality |
| Tester | Write tests, verify functionality |
| Coordinator | Coordinate agents, integrate results |

## OpenClaw Subagent System

### Architecture

\`\`\`
                    ┌─────────────┐
                    │ User Request│
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Main Agent  │
                    │(Coordinator)│
                    └──────┬──────┘
                           │
        ┌──────────┬───────┼───────┬──────────┐
        │          │       │       │          │
   ┌────▼────┐ ┌───▼───┐ ┌─▼──┐ ┌──▼───┐ ┌───▼────┐
   │SubAgent │ │SubAgnt│ │Sub │ │Sub   │ │SubAgent│
   │    A    │ │   B   │ │ C  │ │  D   │ │   E    │
   └─────────┘ └───────┘ └────┘ └──────┘ └────────┘
\`\`\`

### Workflow

\`\`\`
1. Main Agent receives user task
2. Analyzes task, decides if subagents needed
3. Creates specialized subagents
4. Assigns subtasks to subagents
5. Subagents execute and return results
6. Main Agent integrates results
7. Reports to user
\`\`\`

## Configuration Guide

\`\`\`bash
# Enable subagents
openclaw config set subagents.enabled true

# Max concurrent subagents
openclaw config set subagents.max_concurrent 5

# Subagent timeout
openclaw config set subagents.timeout 300000
\`\`\`

---

## Summary

| Concept | Description |
|---------|-------------|
| **Single Agent** | Good for simple tasks |
| **Multi-Agent** | Good for complex, multi-step tasks |
| **Role Division** | Each Agent has clear responsibility |
| **Coordinator** | Main Agent integrates results |
| **Concurrency Control** | Balance efficiency and cost |

**Next Step**: Try configuring your first subagent to experience multi-agent collaboration.`,
    author: "OpenClaw 101",
    date: "2026-03-24",
    category: "技术深度",
    categoryEn: "Deep Dive",
    tags: ["多Agent", "协作", "子代理", "架构"],
    readingTime: 12,
    image: "/og-image.png"
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category || post.categoryEn === category);
}
