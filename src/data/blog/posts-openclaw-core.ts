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

This guide covers all API endpoints, parameters, and usage patterns in detail.

## API Basics

### Base URL

\`\`\`
http://localhost:3000/api/v1
\`\`\`

For production environments, always use HTTPS to encrypt data in transit.

### Authentication

All API requests require an authentication token in the request header:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  http://localhost:3000/api/v1/conversations
\`\`\`

API Keys can be generated from the Dashboard settings page. Each key is scoped to a specific user and can be revoked at any time.

---

## Conversations API

### Create Conversation

\`\`\`http
POST /api/v1/conversations
\`\`\`

**Request Parameters**:

| Parameter | Type | Required | Description |
|------|------|------|------|
| title | string | No | Conversation title |
| model | string | No | Model ID, defaults to configured model |
| context | object | No | Initial context |
| skills | string[] | No | List of enabled skills |

**Example**:

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/conversations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "New Conversation",
    "model": "claude-sonnet-4-6"
  }'
\`\`\`

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

**Request Parameters**:

| Parameter | Type | Required | Description |
|------|------|------|------|
| content | string | Yes | Message content |
| role | string | No | Role, defaults to "user" |
| stream | boolean | No | Whether to stream the response |

**Example**:

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/conversations/conv_abc123/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Help me write a Python web scraper",
    "stream": false
  }'
\`\`\`

**Response**:

\`\`\`json
{
  "id": "msg_xyz789",
  "role": "assistant",
  "content": "Sure, I will help you write a Python web scraper...",
  "createdAt": "2026-03-29T06:01:00Z"
}
\`\`\`

### Get Conversation History

\`\`\`http
GET /api/v1/conversations/{id}/messages
\`\`\`

**Query Parameters**:

| Parameter | Type | Description |
|------|------|------|
| limit | number | Number of messages to return, default 50 |
| before | string | Fetch messages before this message ID |
| after | string | Fetch messages after this message ID |

---

## Skills API

### Invoke Skill

\`\`\`http
POST /api/v1/skills/{skillId}/invoke
\`\`\`

**Request Parameters**:

| Parameter | Type | Required | Description |
|------|------|------|------|
| input | any | Yes | Skill input parameters |
| conversationId | string | No | Associated conversation ID |

**Example**:

\`\`\`bash
# Invoke the weather skill
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

**Response**:

\`\`\`json
{
  "skills": [
    {
      "id": "weather",
      "name": "Weather Query",
      "description": "Get weather information for a specified city",
      "version": "1.0.0",
      "enabled": true
    }
  ]
}
\`\`\`

---

## Files API

### Upload File

\`\`\`http
POST /api/v1/files
\`\`\`

**Request Format**: multipart/form-data

**Parameters**:

| Parameter | Type | Description |
|------|------|------|
| file | File | The file to upload |
| conversationId | string | Associated conversation ID |

**Example**:

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/files \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "conversationId=conv_abc123"
\`\`\`

### Read File

\`\`\`http
GET /api/v1/files/{fileId}
\`\`\`

### Delete File

\`\`\`http
DELETE /api/v1/files/{fileId}
\`\`\`

---

## WebSocket API

### Connecting

\`\`\`javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {
  // Send authentication
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_API_KEY'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received message:', data);
};
\`\`\`

### Message Types

| Type | Description |
|------|------|
| auth | Authentication request |
| message | Conversation message |
| stream | Streaming response chunk |
| skill | Skill invocation result |
| error | Error information |

### Streaming Conversation

\`\`\`javascript
ws.send(JSON.stringify({
  type: 'message',
  conversationId: 'conv_abc123',
  content: 'Help me write some code',
  stream: true
}));

// Receive streaming response
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'stream') {
    process.stdout.write(data.chunk);
  }
};
\`\`\`

---

## Error Handling

### Error Response Format

\`\`\`json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters",
    "details": {
      "field": "content",
      "reason": "content cannot be empty"
    }
  }
}
\`\`\`

### Error Codes

| Code | Description | HTTP Status |
|--------|------|-------------|
| UNAUTHORIZED | Authentication failed | 401 |
| FORBIDDEN | Insufficient permissions | 403 |
| NOT_FOUND | Resource not found | 404 |
| INVALID_REQUEST | Invalid request parameters | 400 |
| RATE_LIMITED | Rate limit exceeded | 429 |
| INTERNAL_ERROR | Internal server error | 500 |

---

## Rate Limits

| Endpoint | Limit | Window |
|------|------|------|
| /messages | 60 requests | 1 minute |
| /skills/invoke | 30 requests | 1 minute |
| /files | 20 requests | 1 minute |

Exceeding the limit will return a 429 error. Include retry logic with exponential backoff in your client code to handle rate limiting gracefully.

---

## SDK Usage

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

// Create a conversation
const conversation = await client.conversations.create({
  title: 'API Test'
});

// Send a message
const response = await client.messages.send({
  conversationId: conversation.id,
  content: 'Hello!'
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

# Create a conversation
conversation = client.conversations.create(
    title="API Test"
)

# Send a message
response = client.messages.send(
    conversation_id=conversation.id,
    content="Hello!"
)

print(response.content)
\`\`\`

---

## Best Practices

### 1. Store API Keys in Environment Variables

\`\`\`bash
export OPENCLAW_API_KEY=your_key_here
\`\`\`

Never hardcode API keys in your source code. Use environment variables or a secrets manager to keep credentials safe.

### 2. Implement Error Retry Logic

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

Use exponential backoff when retrying failed requests, especially for rate-limited responses.

### 3. Use Streaming for Large Responses

For long text generation, use the WebSocket streaming API to receive results incrementally. This avoids request timeouts and provides a better user experience.

### 4. Cache Frequently Used Results

For repetitive requests (such as listing available skills), cache the results on the client side to reduce unnecessary API calls and improve performance.

---

## Reference Resources

- [OpenClaw Official Documentation](https://docs.openclaw.ai)
- [SDK GitHub Repository](https://github.com/openclaw/openclaw-sdk)
- [API Changelog](https://docs.openclaw.ai/changelog/api)

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
    contentEn: `Errors are inevitable when using OpenClaw. This guide compiles the most common error types and their solutions to help you quickly diagnose and resolve issues.

---

## Error Categories

| Type | Description | Difficulty |
|------|------|----------|
| API Errors | Model API call failures | Easy |
| Config Errors | Configuration parameter errors | Medium |
| Connection Errors | Network or platform connection issues | Medium |
| Permission Errors | Insufficient permissions or auth failures | Easy |
| Resource Errors | Memory, disk, and system resource issues | Hard |
| Skill Errors | Skill execution failures | Medium |

---

## API Errors

### 1. Invalid API Key

**Error message**:
\`\`\`
Error: Invalid API Key
Authentication failed for provider: anthropic
\`\`\`

**Causes**:
- API key format is incorrect
- API key has expired
- Environment variable is not set

**Solution**:

\`\`\`bash
# Check environment variable
echo $ANTHROPIC_API_KEY

# Set environment variable
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Or set it directly in the configuration file
\`\`\`

---

### 2. API Request Timeout

**Error message**:
\`\`\`
Error: Request timeout after 60000ms
\`\`\`

**Causes**:
- Unstable network connection
- Slow API server response
- Request content too large

**Solution**:

\`\`\`json
// Increase timeout duration
{
  "providers": {
    "anthropic": {
      "timeout": 120000
    }
  }
}
\`\`\`

---

### 3. Rate Limit Exceeded

**Error message**:
\`\`\`
Error: Rate limit exceeded
429 Too Many Requests
\`\`\`

**Causes**:
- Request frequency too high
- API quota exceeded

**Solution**:

1. Reduce request frequency
2. Upgrade your API plan
3. Enable request queuing

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

### 4. Model Not Available

**Error message**:
\`\`\`
Error: Model not found: claude-opus-5
\`\`\`

**Causes**:
- Model name is misspelled
- Model has been deprecated
- Your account does not have access to this model

**Solution**:

\`\`\`bash
# List available models
openclaw models list

# Use the correct model name
\`\`\`

---

## Configuration Errors

### 5. Configuration File Not Found

**Error message**:
\`\`\`
Error: Configuration file not found
\`\`\`

**Solution**:

\`\`\`bash
# Initialize configuration
openclaw init

# Or create a default configuration
openclaw config create
\`\`\`

---

### 6. Configuration File Format Error

**Error message**:
\`\`\`
Error: Failed to parse configuration
JSON parse error: Unexpected token
\`\`\`

**Causes**:
- JSON syntax error
- Missing quotes or commas
- Unsupported characters

**Solution**:

\`\`\`bash
# Validate the configuration file
openclaw config validate

# Or use a JSON validation tool
cat ~/.openclaw/openclaw.json | jq '.'
\`\`\`

---

### 7. Environment Variable Not Set

**Error message**:
\`\`\`
Error: Environment variable not found: ANTHROPIC_API_KEY
\`\`\`

**Solution**:

\`\`\`bash
# Temporary (current session only)
export ANTHROPIC_API_KEY="sk-ant-..."

# Permanent (add to ~/.bashrc)
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc
\`\`\`

---

## Connection Errors

### 8. Telegram Bot Connection Failed

**Error message**:
\`\`\`
Error: Failed to connect to Telegram
404 Not Found
\`\`\`

**Causes**:
- Bot Token is incorrect
- Bot has been banned
- Network issues

**Solution**:

1. Verify that the Bot Token is correct
2. Regenerate the token via @BotFather
3. Check your network connection

\`\`\`bash
# Test the Bot Token
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"
\`\`\`

---

### 9. Discord Connection Failed

**Error message**:
\`\`\`
Error: Discord connection failed
DISALLOWED_INTENTS
\`\`\`

**Causes**:
- Required Intents are not enabled
- Insufficient bot permissions

**Solution**:

1. Go to the Discord Developer Portal
2. Select your application, then navigate to Bot
3. Enable the following Intents:
   - PRESENCE INTENT
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT

---

### 10. Feishu Connection Failed

**Error message**:
\`\`\`
Error: Feishu authentication failed
Invalid app_id or app_secret
\`\`\`

**Solution**:

1. Check the application configuration on the Feishu Open Platform
2. Confirm that the App ID and App Secret are correct
3. Verify the application permission settings

---

## Permission Errors

### 11. File Permission Denied

**Error message**:
\`\`\`
Error: Permission denied: /root/.openclaw/openclaw.json
\`\`\`

**Solution**:

\`\`\`bash
# Fix file permissions
chmod 600 ~/.openclaw/openclaw.json

# Or fix ownership
chown -R $USER:$USER ~/.openclaw
\`\`\`

---

### 12. Elevated Command Permission Denied

**Error message**:
\`\`\`
Error: Command requires elevated permissions
\`\`\`

**Causes**:
- Attempting to execute a command that requires sudo
- Security policy is blocking the command

**Solution**:

1. Execute the command manually and authorize it
2. Or modify the security policy

\`\`\`json
{
  "security": {
    "allowElevated": true,
    "requireConfirmation": ["exec:elevated"]
  }
}
\`\`\`

---

## Resource Errors

### 13. Out of Memory

**Error message**:
\`\`\`
Error: JavaScript heap out of memory
\`\`\`

**Solution**:

\`\`\`bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Or specify at startup
node --max-old-space-size=4096 /path/to/openclaw
\`\`\`

---

### 14. Disk Space Full

**Error message**:
\`\`\`
Error: No space left on device
\`\`\`

**Solution**:

\`\`\`bash
# Check disk space
df -h

# Clean up logs and cache
rm -rf ~/.openclaw/logs/*.log
rm -rf ~/.openclaw/cache/*

# Clean npm cache
npm cache clean --force
\`\`\`

---

## Skill Errors

### 15. Skill Loading Failed

**Error message**:
\`\`\`
Error: Failed to load skill: weather
Cannot find module 'weather-skill'
\`\`\`

**Solution**:

\`\`\`bash
# Reinstall the skill
npx clawhub install weather

# Or install manually
cd ~/.openclaw/skills
git clone https://github.com/xxx/weather-skill.git
\`\`\`

---

### 16. Skill Execution Failed

**Error message**:
\`\`\`
Error: Skill execution failed
TypeError: Cannot read property 'data' of undefined
\`\`\`

**Solution**:

1. Check the skill configuration
2. Review the skill logs
3. Update the skill to the latest version

\`\`\`bash
# View skill logs
openclaw logs --skill weather

# Update the skill
npx clawhub update weather
\`\`\`

---

## Debugging Tips

### Enable Verbose Logging

\`\`\`json
{
  "logging": {
    "level": "debug"
  }
}
\`\`\`

### View Real-time Logs

\`\`\`bash
# View all logs
openclaw logs -f

# View logs of a specific type
openclaw logs --type api

# View the last 100 lines
openclaw logs --tail 100
\`\`\`

### Check Service Status

\`\`\`bash
# Check OpenClaw status
openclaw status

# Check version
openclaw --version

# Check configuration
openclaw config show
\`\`\`

---

## Getting Help

If none of the above solutions resolve your issue:

1. **Official Documentation**: https://docs.openclaw.ai
2. **Search Issues**: https://github.com/openclaw/openclaw/issues
3. **Community Support**: https://discord.gg/clawd
4. **File a Bug Report**: https://github.com/openclaw/openclaw/issues/new

---

## Quick Reference Commands

| Command | Description |
|------|------|
| \`openclaw status\` | Check service status |
| \`openclaw config validate\` | Validate configuration |
| \`openclaw logs -f\` | Stream real-time logs |
| \`openclaw restart\` | Restart the service |
| \`openclaw update\` | Update to the latest version |

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
    titleEn: "OpenClaw vs Claude Code — Which AI Coding Tool to Use (2026)",
    excerpt: "Claude Code 是 Anthropic 官方的编程助手，OpenClaw 是开源社区的明星项目。两者有什么区别？该选哪一个？从多平台支持、开源性、技能生态、自托管、定价全方位对比。",
    excerptEn: "Feature comparison: execution scope, platform support, browser control, skills ecosystem, and pricing. When to use each — and how to combine them.",
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
    contentEn: `In 2026, the AI coding assistant market is flourishing. Claude Code and OpenClaw are two of the most prominent products in this space.

Claude Code is Anthropic's official coding assistant -- closed-source and commercially licensed. OpenClaw is an open-source community star project, boasting 336k+ GitHub stars. Both tools aim to supercharge developer productivity, but they take fundamentally different approaches.

This article provides a deep, dimension-by-dimension comparison of these two products to help you make an informed choice.

## Core Comparison at a Glance

| Dimension | OpenClaw | Claude Code |
|------|----------|-------------|
| **Developer** | Open Source Community | Anthropic Official |
| **Open Source** | ✅ Fully Open Source | ❌ Closed Source |
| **GitHub Stars** | 336,466 | 82,917 |
| **Platform Support** | Multi-platform (10+) | Terminal Only |
| **Self-hosting** | ✅ Supported | ❌ Not Supported |
| **Skills Ecosystem** | ✅ 42,000+ stars | ❌ None |
| **Pricing** | Free (API fees only) | Pay-per-use |

## What is Claude Code?

Claude Code is Anthropic's official command-line coding assistant. It runs in your terminal, connects to Anthropic's Claude models, and can read your codebase, write code, run commands, and help with software development tasks. It is designed specifically for programmers who are comfortable working in a terminal environment.

## What is OpenClaw?

OpenClaw is an open-source AI assistant platform created and maintained by the community. Unlike single-purpose coding tools, OpenClaw is a general-purpose AI assistant that integrates with messaging platforms, supports custom skills, and can be self-hosted. It supports multiple AI model providers including Anthropic Claude, OpenAI GPT, and local models via LocalAI.

## 1. Platform Support Comparison

### OpenClaw: True Multi-Platform

OpenClaw natively supports **10+ messaging platforms**:

- Telegram
- WhatsApp
- Discord
- Signal
- Feishu (Lark)
- DingTalk
- WeCom (WeChat Work)
- QQ
- iMessage
- Slack

**What this means**: You can use OpenClaw inside whatever chat application you already use every day, without switching tools. Whether you are on your phone messaging via Telegram, collaborating with your team on Slack, or managing your company's workflow through Feishu, OpenClaw is right there with you. This multi-platform approach means your AI assistant goes where you go, rather than forcing you to open a separate application.

### Claude Code: Terminal Only

Claude Code only works in the **terminal**:

- Requires command-line operation
- No mobile support
- No graphical user interface

**What this means**: You need to be comfortable with command-line workflows. Claude Code is not suitable for non-technical users or scenarios where you want AI assistance on the go through a messaging app. If your team includes non-developers who could benefit from AI assistance (project managers, designers, operations staff), Claude Code will not serve them.

## 2. Open Source Comparison

### OpenClaw: Fully Open Source

\`\`\`
- Code is fully transparent
- You can modify and extend it freely
- Community-driven development
- No vendor lock-in risk
\`\`\`

**Advantages**:
- Security is fully auditable -- you can inspect every line of code
- You can customize functionality to fit your exact needs
- The community contributes a rich and growing library of features, fixes, and integrations

### Claude Code: Closed Source Commercial

\`\`\`
- Source code is not public
- You cannot modify or extend it
- Anthropic has exclusive control
- Vendor lock-in risk exists
\`\`\`

**Risks**:
- You cannot audit the security of the tool yourself
- You are dependent on Anthropic's decisions about features, pricing, and direction
- Pricing may increase at any time without alternatives available

## 3. Skills Ecosystem Comparison

### OpenClaw: 42,000+ Stars Skills Library

OpenClaw has a massive and growing skills ecosystem:

- **ClawHub**: The official skills marketplace where community-built skills are published and shared. The number of available skills continues to grow rapidly.
- **awesome-openclaw-skills**: A community-curated collection of the best skills, with 42,027 stars on GitHub.
- **Skills API**: A well-documented API for developing your own custom skills, allowing you to extend OpenClaw with any capability you can imagine.

**Popular skill categories include**:
- Document operations (Feishu, Notion integration)
- Image generation (DALL-E, Midjourney)
- Data analysis (SQL queries, Excel processing)
- Automation (cron jobs, workflow orchestration)

### Claude Code: No Skills System

Claude Code does not have a skills extension mechanism:

- Features are determined solely by Anthropic
- You cannot build or install custom extensions
- You must wait for official updates to get new capabilities

## 4. Self-hosting Comparison

### OpenClaw: Full Self-hosting Support

OpenClaw provides multiple self-hosting options to fit different scales and requirements:

1. **Local deployment**: Run directly on your local machine for development or personal use
2. **VPS deployment**: Deploy to a cloud server for stable, always-on availability
3. **nanoclaw**: A containerized, security-hardened deployment option
4. **Clawith**: An enterprise-grade private deployment solution

**Advantages**:
- Your data stays entirely under your control
- Meet compliance requirements (GDPR, HIPAA, and more)
- Reduce API costs by pairing with local models via LocalAI

### Claude Code: No Self-hosting

Claude Code must connect to Anthropic's cloud infrastructure:

- All data passes through Anthropic's servers
- There is no option for local or on-premises deployment
- Every API call incurs a cost with no way to use local models

## 5. Pricing Comparison

### OpenClaw: Free + API Fees

\`\`\`
OpenClaw itself: Free
Claude API calls: Pay per actual usage
Self-hosted with local models: $0 API fees
\`\`\`

**Estimated costs**:
- Personal users: $5-20/month
- Enterprise users: $50-200/month
- Self-hosted with LocalAI: $0 (only hardware costs)

### Claude Code: Pay-per-use

\`\`\`
Per-token billing
No free tier available
No self-hosting option to reduce costs
\`\`\`

**Estimated costs**:
- Personal users: $20-50/month
- Enterprise users: $200-500/month

## 6. Use Case Fit

### OpenClaw is ideal for:

- Users who need multi-platform support across different messaging apps
- Enterprises that prioritize data security and regulatory compliance
- Developers who want to customize and extend their tools with custom skills
- Teams looking to optimize costs through self-hosting and local models
- Users who want access to a rich skills ecosystem

### Claude Code is ideal for:

- Users already invested in the Anthropic ecosystem
- Developers comfortable with terminal-based workflows
- Individual users who do not need self-hosting capabilities
- Users who prefer official vendor support and zero configuration

## Can They Work Together?

Yes! OpenClaw and Claude Code are not mutually exclusive. In fact, many developers use both tools together as part of their daily workflow:

- Use **Claude Code** in the terminal for deep coding sessions where you need tight integration with your local codebase, file system access, and command execution within a project
- Use **OpenClaw** for everything else -- team communication on Slack or Telegram, automated cron jobs, multi-platform task execution, document processing, and daily productivity tasks that go beyond pure coding

Since OpenClaw supports Claude as a backend model provider, you get the best of both worlds: Anthropic's powerful AI models combined with OpenClaw's open-source flexibility, multi-platform reach, and extensible skills ecosystem. You do not have to choose one or the other -- they complement each other well.

## Frequently Asked Questions

**Q: Can OpenClaw use the same Claude models as Claude Code?**
A: Yes. OpenClaw supports Anthropic's Claude API as a model provider, so you get the same underlying AI capabilities.

**Q: Is Claude Code faster because it is official?**
A: Not necessarily. Both tools call the same Claude API. The difference is in features and platform support, not model speed.

**Q: Can I migrate from Claude Code to OpenClaw?**
A: Yes. Since OpenClaw supports Claude models, you can switch without losing access to the AI capabilities you rely on. You gain multi-platform support, skills, and self-hosting in the process.

## Summary

**OpenClaw Advantages**:
- Multi-platform support -- use it anywhere, anytime, on any messaging app
- Fully open source -- secure, transparent, and community-driven
- A massive skills ecosystem with 42,000+ stars for extending functionality
- Self-hosting support for complete data sovereignty
- Lower overall cost, with the option to eliminate API fees entirely using local models

**Claude Code Advantages**:
- Official Anthropic support and maintenance
- Deep integration with Claude models out of the box
- Zero configuration needed -- works immediately after installation

**Recommendation**:
- If you need multi-platform access, self-hosting, or a skills ecosystem --> choose **OpenClaw**
- If you only need a terminal-based coding assistant and value official support --> choose **Claude Code**

For the majority of users, OpenClaw's comprehensive advantages -- open source, multi-platform, self-hostable, extensible, and cost-effective -- make it the more compelling choice.

---

*OpenClaw GitHub: https://github.com/openclaw/openclaw*
*Claude Code GitHub: https://github.com/anthropics/claude-code*`,
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
    contentEn: `OpenClaw is not just a tool for individual developers -- more and more enterprises are adopting it to dramatically improve operational efficiency across departments.

This article shares 5 real-world enterprise use cases, detailing the company background, specific pain points, the OpenClaw-based solution implemented, and the measurable results achieved.

## Case 1: E-commerce Customer Service Automation

**Company Background**:
- An e-commerce company with approximately $7 million (50 million RMB) in annual sales
- Over 2,000 customer service inquiries per day
- A 10-person customer support team

**Pain Points**:
- 60% of all inquiries were repetitive questions (logistics tracking, returns/exchanges, coupon inquiries)
- Slow response times were hurting customer satisfaction scores
- High labor costs with limited scalability

**Solution**:

\`\`\`
Deploy OpenClaw + Feishu (Lark) Bot:
1. Connect OpenClaw to Feishu customer service groups
2. Train OpenClaw to recognize and categorize common questions
3. Automatically reply to repetitive questions (logistics, returns, coupons)
4. Route complex or sensitive issues to human agents
\`\`\`

**Key Code Example**:

\`\`\`typescript
// Customer service automation skill
export default {
  name: 'customer-service',
  triggers: ['help', 'support'],
  
  async handle(message) {
    // Auto-reply for common questions
    if (message.includes('shipping')) {
      return 'Your order is being delivered. Expected arrival: tomorrow.';
    }
    if (message.includes('return')) {
      return 'Please provide your order number. We will process within 24 hours.';
    }
    // Complex questions escalated to human
    return null; // null triggers human handoff
  }
};
\`\`\`

**Results**:
- Human support workload reduced by 50%
- Average response time dropped from 5 minutes to 30 seconds
- Annual labor cost savings of approximately $43,000

## Case 2: Automated Data Reporting

**Company Background**:
- A fintech company
- Over 50 reports generated daily across departments
- A 3-person data analyst team

**Pain Points**:
- Each report took 15-30 minutes to generate manually
- Manual processes were error-prone (5% error rate)
- Analysts spent most of their time on repetitive data pulling instead of analysis

**Solution**:

\`\`\`
OpenClaw Scheduled Tasks (Cron Jobs):
1. Automatically pull data from databases at 6 AM daily
2. Generate formatted Excel reports
3. Email reports to management
4. Flag anomalous data and send alerts
\`\`\`

**Cron Job Configuration**:

\`\`\`bash
# Daily sales report at 6 AM
openclaw cron add "0 6 * * *" "Generate yesterday's sales report and email to sales@company.com"

# Weekly operations report every Monday at 8 AM
openclaw cron add "0 8 * * 1" "Generate last week's operations report and send to management"

# Monthly financial report on the 1st of each month
openclaw cron add "0 0 1 * *" "Generate last month's financial report and archive"
\`\`\`

**Results**:
- Report generation time dropped from 20 minutes to 2 minutes per report
- Error rate plummeted from 5% to 0.1%
- Data analysts were freed from repetitive labor to focus on strategic analysis

## Case 3: Software Development (R&D) Assistance

**Company Background**:
- A software development company
- A 20-person engineering team
- Tech stack: Node.js + React + PostgreSQL

**Pain Points**:
- Code reviews were time-consuming and inconsistent
- Documentation was a heavy burden that developers avoided
- New hires took 2 weeks to become productive

**Solution**:

\`\`\`
OpenClaw + GitHub Integration:
1. Automatically review pull requests (code style, potential bugs, security issues)
2. Auto-generate API documentation from code
3. Answer common technical questions in team channels
4. Provide onboarding guidance for new team members
\`\`\`

**GitHub Actions Integration**:

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

**Results**:
- Code review efficiency improved by 40%
- Documentation maintenance workload reduced by 60%
- New hire onboarding time cut from 2 weeks to 1 week

## Case 4: Content Operations Efficiency

**Company Background**:
- A content operations company
- Managing presence on WeChat Official Account, Xiaohongshu (Little Red Book), and Douyin (TikTok China)
- A 5-person operations team

**Pain Points**:
- Publishing content across multiple platforms was tedious and time-consuming
- Analytics data was scattered across different platform dashboards
- Sentiment monitoring and brand reputation tracking were always lagging behind

**Solution**:

\`\`\`
OpenClaw Multi-platform Automation:
1. One-click content publishing to all platforms simultaneously
2. Automatically aggregate analytics data from all platforms into a single report
3. Real-time sentiment monitoring for brand mentions
4. Competitor activity tracking and alerts
\`\`\`

**Automation Scripts**:

\`\`\`bash
# Daily data aggregation at 9 AM
openclaw cron add "0 9 * * *" \
  "Aggregate yesterday's data from WeChat, Xiaohongshu, and Douyin. Generate daily operations report."

# Sentiment monitoring every 2 hours
openclaw cron add "0 */2 * * *" \
  "Search for company-related news and social mentions. Alert immediately on negative sentiment."
\`\`\`

**Results**:
- Content publishing efficiency improved by 300%
- Data aggregation time dropped from 1 hour to 5 minutes
- Sentiment response time improved from 1 day to 1 hour

## Case 5: Enterprise Knowledge Management

**Company Background**:
- A management consulting firm
- Over 5,000 documents in the knowledge base
- A team of 50 consultants

**Pain Points**:
- Finding relevant knowledge was difficult and time-consuming
- Documents were frequently outdated without anyone noticing
- New consultants faced a steep learning curve (3-month ramp-up)

**Solution**:

\`\`\`
OpenClaw + Feishu Knowledge Base Integration:
1. Intelligent Q&A powered by the knowledge base (consultants ask questions in natural language)
2. Automatic document archiving and categorization
3. Proactive reminders when documents need updating
4. Personalized learning path recommendations for new hires
\`\`\`

**Knowledge Base Q&A Example**:

\`\`\`
User: Does the company have a client privacy protection policy?

OpenClaw: Yes, please refer to the following documents:
  "Client Privacy Protection Policy" v2.0
  "Data Processing Standards"
  "Employee Confidentiality Agreement"

Key points summary:
1. Client data may only be used for agreed purposes
2. Data storage must be encrypted
3. Access requires permission approval
...
\`\`\`

**Results**:
- Knowledge search time dropped from 10 minutes to 30 seconds
- Document update timeliness improved by 80%
- New consultant ramp-up time cut from 3 months to 1.5 months

## Enterprise Deployment Recommendations

### 1. Choosing a Deployment Method

| Company Size | Recommended Approach | Rationale |
|----------|----------|------|
| Small team (<10 people) | Local server | Low cost, sufficient capacity |
| Medium company (10-100 people) | VPS + Tailscale | Stable, secure remote access |
| Large enterprise (>100 people) | Private cloud + dedicated ops | Compliance, full control |

### 2. Security Configuration

\`\`\`bash
# Enterprise-grade security settings
openclaw config set gateway.auth.enabled true
openclaw config set fs.allowed_paths "/company/data"
openclaw config set exec.blocked_commands "rm -rf,format"
openclaw config set logging.level "audit"
\`\`\`

### 3. Permission Management

\`\`\`bash
# Set permissions by department
openclaw config set permissions.sales "read:crm,write:reports"
openclaw config set permissions.dev "read:code,write:code,read:docs"
openclaw config set permissions.hr "read:employees,write:employees"
\`\`\`

### 4. Monitoring and Alerts

\`\`\`bash
# Usage monitoring configuration
openclaw config set monitoring.daily_limit 1000
openclaw config set monitoring.alert_email "it@company.com"
openclaw config set monitoring.cost_limit 100  # USD per day
\`\`\`

## ROI Analysis

For a 50-person company:

| Item | Cost | Savings |
|------|------|---------|
| OpenClaw Deployment | $50/month (VPS) | - |
| LLM API Fees | $200/month | - |
| Labor Cost Savings | - | $5,000/month |
| Efficiency Gains | - | Difficult to quantify |
| **Net Benefit** | - | **$4,750/month** |

**Payback period**: Less than 1 month

---

## Summary

OpenClaw enterprise application scenarios at a glance:

| Scenario | Problem Solved | Measured Impact |
|------|------------|------|
| Customer Service Automation | High volume of repetitive questions | Labor reduced by 50% |
| Data Reporting | Repetitive manual report generation | Efficiency improved 10x |
| R&D Assistance | Documentation and code review burden | Efficiency improved 40% |
| Operations | Cross-platform content management | Efficiency improved 300% |
| Knowledge Management | Difficulty finding information | Search time reduced 95% |

**Key Success Factors**:
1. Clearly define pain points and measurable goals before starting
2. Begin with a small pilot scenario and expand after proving value
3. Continuously optimize and iterate on the implementation
4. Prioritize security configuration and permission management from day one`,
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

Recently, cybersecurity researcher @theonejvo discovered that **some misconfigured OpenClaw instances had their private keys and API credentials exposed on the public internet**.

This guide teaches you how to **securely configure OpenClaw** and avoid becoming the next victim.

## Security Risk Sources

### 1. Environment Variable File Exposure

**Problem**:
- \`.env\` files accidentally uploaded to GitHub
- \`.env.local\` files accessible via web requests

**Consequences**:
- API keys leaked (OpenAI, Anthropic, etc.)
- Database connection strings exposed
- Third-party service tokens compromised

### 2. Gateway Port Exposure

**Problem**:
- Gateway defaults to listening on 0.0.0.0 (all network interfaces)
- No authentication configured

**Consequences**:
- Anyone on the internet can call your Gateway
- Attackers can consume your API quota
- Unauthorized access to your file system

### 3. Database Configuration Errors

**Problem**:
- Turso/SQLite database file permissions are too permissive
- Database credentials stored directly in source code

**Consequences**:
- Conversation history leaked
- User data exposed

## 10 Key Security Settings

### 1. Environment Variable File Protection

\`\`\`bash
# Add to .gitignore
echo ".env*" >> .gitignore
echo "!.env.example" >> .gitignore

# Confirm .env is not in version control
git status
\`\`\`

**Verification**:
\`\`\`bash
# Try to access the .env file from the web
curl https://your-domain.com/.env
# Should return 404
\`\`\`

### 2. Bind Gateway to Local Address

\`\`\`bash
# Listen on localhost only
openclaw config set gateway.host 127.0.0.1

# Or use Tailscale (recommended)
openclaw tailscale setup
\`\`\`

**Why this matters**:
- 127.0.0.1 only allows local machine access
- Tailscale provides VPN-level security without exposing ports

### 3. Set Gateway Authentication

\`\`\`bash
# Enable and set access password
openclaw config set gateway.auth.enabled true
openclaw config set gateway.auth.secret "your-strong-secret-here"
\`\`\`

**Usage**:
\`\`\`bash
# Include authentication when calling the Gateway
curl -H "Authorization: Bearer your-strong-secret-here" \\
  http://localhost:18789/api/chat
\`\`\`

### 4. Restrict File System Access

\`\`\`bash
# Set a working directory whitelist
openclaw config set fs.allowed_paths \\
  "/home/user/documents,/home/user/projects"
\`\`\`

**Why this matters**:
- Restricts the AI to only access specific directories
- Prevents accidental deletion of system files

### 5. Disable Dangerous Commands

\`\`\`bash
# Define a blocked commands list
openclaw config set exec.blocked_commands \\
  "rm -rf,format,dd,mkfs"
\`\`\`

### 6. API Key Rotation Strategy

\`\`\`bash
# Rotate API keys regularly (recommended every 90 days)

# 1. Generate a new key
# 2. Update your .env file
# 3. Revoke the old key

# OpenAI Key management
open https://platform.openai.com/api-keys
\`\`\`

### 7. Log Sanitization

\`\`\`bash
# Prevent sensitive information from appearing in logs
openclaw config set logging.sensitive_fields \\
  "password,token,secret,api_key,private_key"
\`\`\`

### 8. Database Security

\`\`\`bash
# Turso: Use a strong authentication token
turso db create openclaw --auth-token "strong-random-token"

# SQLite: Restrict file permissions
chmod 600 ~/.openclaw/data/openclaw.db
\`\`\`

### 9. Skill Security Audit

\`\`\`bash
# Inspect permissions before installing any skill
openclaw skills inspect skill-name

# Only install from trusted, verified sources
openclaw skills install --verify-signature skill-name
\`\`\`

**Red flags to watch for**:
- Skill requests full file system access
- Skill requests unrestricted network access
- Skill comes from an unknown or unverified source

### 10. Monitoring and Alerts

\`\`\`bash
# Set daily API usage limits and alerts
openclaw config set monitoring.daily_limit 100
openclaw config set monitoring.alert_email "admin@example.com"
\`\`\`

## Security Configuration Checklist

Run this checklist script to verify your OpenClaw security posture:

\`\`\`bash
#!/bin/bash
# OpenClaw Security Check Script

echo "OpenClaw Security Check"
echo "=========================="

# 1. Check .gitignore
if grep -q ".env" .gitignore; then
  echo "PASS: .env is in .gitignore"
else
  echo "FAIL: .env is NOT in .gitignore"
fi

# 2. Check Gateway binding
HOST=$(openclaw config get gateway.host)
if [ "$HOST" = "127.0.0.1" ]; then
  echo "PASS: Gateway listens on localhost only"
else
  echo "WARN: Gateway listens on $HOST (may be exposed to the internet)"
fi

# 3. Check authentication
AUTH=$(openclaw config get gateway.auth.enabled)
if [ "$AUTH" = "true" ]; then
  echo "PASS: Gateway authentication is enabled"
else
  echo "FAIL: Gateway authentication is NOT enabled"
fi

# 4. Check database permissions
if [ -f ~/.openclaw/data/openclaw.db ]; then
  PERMS=$(stat -c %a ~/.openclaw/data/openclaw.db)
  if [ "$PERMS" = "600" ]; then
    echo "PASS: Database permissions are correct"
  else
    echo "WARN: Database permissions are $PERMS (recommended: 600)"
  fi
fi

echo ""
echo "Check complete!"
\`\`\`

## Frequently Asked Questions

### Q: I have already been running on a public IP. What should I do?

\`\`\`bash
# Take immediate action:

# 1. Rotate ALL API keys immediately
# 2. Change the Gateway authentication password
# 3. Review access logs to confirm no abuse has occurred
# 4. Reconfigure following this security guide
\`\`\`

### Q: How do I confirm that I have not leaked sensitive information?

\`\`\`bash
# Check for publicly exposed content

# 1. Search your GitHub repository
# github.com/search?q=env+repo:your-username/your-repo

# 2. Try accessing potentially sensitive files
curl https://your-domain.com/.env
curl https://your-domain.com/.env.local
curl https://your-domain.com/config

# 3. Check Git history for accidentally committed secrets
git log --all --full-history -- "*.env"
\`\`\`

### Q: What is Tailscale?

Tailscale is a zero-configuration VPN service:
- Free to use (up to 100 devices)
- End-to-end encrypted
- No public IP required

\`\`\`bash
# Install
curl -fsSL https://tailscale.com/install.sh | sh

# Connect
tailscale up

# Then configure OpenClaw
openclaw config set gateway.host tailscale
\`\`\`

## Security Best Practices

### Development Environment

\`\`\`bash
# Use separate API keys (isolated from production)
# Use a separate database
# Reset the environment regularly
\`\`\`

### Production Environment

\`\`\`bash
# Use a secrets management service (AWS Secrets Manager, HashiCorp Vault)
# Enable all security settings
# Audit logs regularly
# Set up usage alerts
\`\`\`

### Team Collaboration

\`\`\`bash
# Use environment variables instead of config files for secrets
# Inject secrets through CI/CD pipelines
# Never hardcode sensitive information in source code
\`\`\`

---

## Summary

| Risk | Solution |
|------|----------|
| Environment variable leak | Add to .gitignore |
| Gateway exposed | Bind to 127.0.0.1 or use Tailscale |
| Unauthorized access | Enable Gateway authentication |
| File system risk | Restrict allowed access paths |
| API key leak | Regular rotation + usage monitoring |

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
    contentEn: `In 2026, AI Agents became one of the hottest topics in the tech world.

These are no longer just "chatbots" -- they are AI assistants that can **actually do things**: run code, manipulate files, control browsers, call APIs, and automate entire workflows.

The market has seen several prominent AI Agent products emerge. What are the differences between them? Which one should you choose?

This article provides a deep comparison of 4 popular AI Agents: **OpenClaw, Cursor, Manus, and AutoGPT**.

## Core Concept: What is an AI Agent?

Traditional AI chatbots (like ChatGPT) can only **output text**:

- Answer questions
- Generate code snippets
- Provide suggestions and recommendations

AI Agents, on the other hand, can **execute tasks**:

- Run code directly on your machine
- Create, edit, and delete files
- Control web browsers via automation
- Call external APIs and services
- Orchestrate complex, multi-step workflows

**Think of it this way**:
- ChatGPT = A consultant (tells you how to do something)
- AI Agent = An assistant (actually does it for you)

## Comparison at a Glance

| Dimension | OpenClaw | Cursor | Manus | AutoGPT |
|------|----------|--------|-------|---------|
| **Core Focus** | General-purpose AI Assistant | Coding AI Assistant | Browser Automation | Autonomous Task Execution |
| **Open Source** | ✅ Fully Open Source | ❌ Closed Source | ❌ Closed Source | ✅ Open Source |
| **Local Execution** | ✅ Supported | ✅ Supported | ☁️ Cloud Only | ✅ Supported |
| **Platform Support** | Telegram/Discord/WhatsApp/Feishu/DingTalk | VS Code Only | Web Only | CLI Only |
| **File Operations** | ✅ Full file system access | ✅ Project-scoped | ❌ None | ✅ Full |
| **Browser Control** | ✅ Playwright integration | ❌ None | ✅ Core capability | ⚠️ Limited |
| **Code Execution** | ✅ Local execution | ✅ Local execution | ❌ None | ✅ Local execution |
| **Multi-Agent** | ✅ Supported | ❌ Not supported | ❌ Not supported | ✅ Supported |
| **Skills/Extensions** | ✅ ClawHub ecosystem | ❌ None | ❌ None | ⚠️ Plugin system |
| **Pricing** | Free (API fees only) | $20/month | $15/month | Free (API fees only) |
| **Best For** | Daily automation, multi-platform | Software development | Web tasks, form filling | Research, experiments |

## Detailed Analysis

### 1. OpenClaw: The All-Rounder

**Strengths**:
- ✅ Truly open source with fully transparent code
- ✅ Multi-platform support -- use one assistant across all your messaging apps
- ✅ Rich skills ecosystem (ClawHub with a growing community of contributed skills)
- ✅ Runs locally for complete data privacy control
- ✅ Supports multi-agent collaboration for complex tasks

**Weaknesses**:
- ⚠️ Requires self-deployment and maintenance
- ⚠️ You need to configure your own API keys (LLM costs are your responsibility)
- ⚠️ The learning curve is slightly steeper than plug-and-play tools

**Ideal Users**:
- Individual users and developers who want maximum flexibility
- Teams that need multi-platform messaging integration
- Privacy-conscious users and organizations
- Anyone who wants deep customization capabilities

**Typical Use Cases**:
\`\`\`
User: Every morning at 9 AM, check the weather and send it to my Telegram
OpenClaw: ✅ Scheduled task created

User: Translate this PDF to Chinese and save it
OpenClaw: ✅ Translation complete, saved as xxx_cn.pdf

User: Search for mechanical keyboards on Taobao, sort by sales
OpenClaw: ✅ Browser opened, search complete, screenshot attached
\`\`\`

### 2. Cursor: The Programmer's AI Pair

**Strengths**:
- ✅ Deep integration with VS Code editor
- ✅ Code completion, refactoring, and debugging in one unified experience
- ✅ Understands your entire codebase context
- ✅ Works out of the box with zero configuration

**Weaknesses**:
- ❌ Only useful for programming -- cannot help with other tasks
- ❌ Closed source; your code data is uploaded to the cloud
- ❌ $20/month subscription fee
- ❌ No support for other platforms or messaging apps

**Ideal Users**:
- Software developers who want an AI coding companion
- Teams that need a code assistant without setup hassle
- Developers who prefer not to configure tools themselves

**Typical Use Cases**:
\`\`\`
Developer: Refactor this function to improve performance
Cursor: ✅ Refactored, performance improved by 40%

Developer: Write unit tests covering this module
Cursor: ✅ Generated 15 test cases
\`\`\`

### 3. Manus: The Browser Automation Expert

**Strengths**:
- ✅ Exceptional browser automation capabilities
- ✅ Automated form filling, web scraping, and page interaction
- ✅ No local deployment needed -- runs in the cloud
- ✅ Visual, easy-to-understand operation interface

**Weaknesses**:
- ❌ Limited to browser-based tasks only
- ❌ Closed source; all data passes through cloud servers
- ❌ $15/month subscription fee
- ❌ Cannot access or modify local files

**Ideal Users**:
- Users who need web automation (e-commerce operations, data collection)
- Non-technical users who want AI-powered browser tasks
- Teams that prefer zero-deployment cloud solutions

**Typical Use Cases**:
\`\`\`
User: Check this product page every 2 hours for stock availability
Manus: ✅ Monitoring set up. Will notify you when in stock.

User: Fill out these 100 forms with this spreadsheet data
Manus: ✅ All 100 forms completed
\`\`\`

### 4. AutoGPT: The Autonomous Explorer

**Strengths**:
- ✅ Fully autonomous operation -- minimal human intervention needed
- ✅ Open source and customizable
- ✅ Supports complex, multi-step task chains
- ✅ Active community of contributors and experimenters

**Weaknesses**:
- ⚠️ Prone to going off-track -- requires careful prompt tuning
- ⚠️ Costs are hard to control (frequent API calls can add up quickly)
- ⚠️ Success rate is inconsistent
- ⚠️ Steep learning curve for effective use

**Ideal Users**:
- AI researchers and enthusiasts exploring the boundaries of autonomous AI
- Technical users who want to experiment with agentic workflows
- Anyone with the patience to iterate on prompts and configurations

**Typical Use Cases**:
\`\`\`
User: Research the electric vehicle market and generate a report
AutoGPT: Autonomous execution:
  1. Search for EV brands and models
  2. Scrape data from multiple sources
  3. Analyze and compare findings
  4. Generate report (may succeed fully, or may go off-track)
\`\`\`

## Choosing the Right Tool

### If you want...

**A daily automation assistant** --> **OpenClaw**
- Multi-platform messaging integration (Telegram, Discord, Feishu, and more)
- Local execution for privacy and control
- Free and open source with a rich skills ecosystem

**A programming development assistant** --> **Cursor**
- Deep VS Code integration
- Code completion, refactoring, and debugging
- Works out of the box

**Web and browser automation** --> **Manus**
- Professional-grade browser control
- Zero deployment required
- Form filling, data scraping, and page monitoring

**AI research and experimentation** --> **AutoGPT**
- Explore autonomous AI capabilities
- Fully open source
- Customizable agent behavior

## Our Recommendations

| User Type | Recommendation | Rationale |
|----------|------|------|
| Individual users | OpenClaw | Free, powerful, privacy-preserving, works on all your devices |
| Developers | Cursor + OpenClaw | Cursor for in-editor coding, OpenClaw for automation and daily tasks |
| Enterprise users | OpenClaw | Local deployment, data security, regulatory compliance |
| Operations teams | Manus | Specialized browser automation for web-based workflows |
| Researchers | AutoGPT | Pushing the boundaries of autonomous AI agents |

## Key Takeaways

When deciding between these four tools, consider these factors:

**On openness and control**: If you value transparency, data sovereignty, and the ability to customize, OpenClaw and AutoGPT are the open-source options. OpenClaw is more mature and practical for everyday use, while AutoGPT is better suited for experimental and research scenarios.

**On specialization vs. generality**: Cursor is laser-focused on coding within VS Code. Manus is laser-focused on browser automation. OpenClaw is the generalist that covers the widest range of use cases. Choose a specialist if your needs are narrow; choose the generalist if you want one tool for many tasks.

**On cost**: OpenClaw and AutoGPT are free to use (you only pay for API calls to the LLM provider, or nothing at all if you use local models). Cursor costs $20/month and Manus costs $15/month as subscription fees on top of any usage costs.

**On deployment**: If you need to run everything on your own infrastructure (for compliance, security, or cost reasons), OpenClaw and AutoGPT support self-hosting. Cursor runs locally but connects to cloud services. Manus is entirely cloud-based with no self-hosting option.

---

**In summary**: There is no single "best" AI Agent -- only the one that best fits your specific needs and workflow.

We recommend starting with **OpenClaw** (free and open source) as your primary AI assistant. If your primary focus is coding, add Cursor to your toolkit for the in-editor experience. If you specifically need web browser automation for tasks like form filling or data scraping, consider Manus. And if you want to experiment with fully autonomous AI agents, AutoGPT is the place to start.`,
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

I had an idea: use AI to generate doll-style avatars. Users would upload a photo, choose a style (Barbie, Anime, or Chibi), and get a personalized avatar with one click.

3 days later, the product went live: [avatardoll.online](https://avatardoll.online)

This article is a complete retrospective of the entire development process, with a focus on **the pitfalls I encountered** and how I solved them.

## Tech Stack Selection

| Requirement | Choice | Rationale |
|------|------|------|
| Framework | Next.js 16 | App Router + Server Components for fast, modern web dev |
| Database | Turso | SQLite-compatible, free tier, edge deployment support |
| Payment | PayPal | Global payment support, well-documented sandbox environment |
| Authentication | Google OAuth | Massive user base, straightforward implementation |
| Image Generation | Replicate | Simple API, pay-per-use pricing, no GPU needed on our end |

## Pitfall 1: Quota Calculation Error

**Symptom**: The header displayed 20 remaining uses, but the Create page showed 18.

**Root Cause**:
\`\`\`typescript
// WRONG: double counting
const total = usedToday + pointsBalance;
// usedToday already includes free usage count, so adding it again inflates the total
\`\`\`

**The Fix**:
\`\`\`typescript
// CORRECT: separate free quota from paid points
const freeRemaining = Math.max(0, dailyQuota - usedToday);
const total = freeRemaining + pointsBalance;
\`\`\`

**Lesson**: When dealing with quota systems, clearly separate free-tier usage from paid credits. Semantic confusion in data models leads to calculation bugs that are hard to spot.

## Pitfall 2: Points Not Being Deducted (Critical!)

**Symptom**: A user generated 4 images, but their points balance still showed 20.

**Root Cause**:
\`\`\`typescript
// Only incrementing usedToday, never actually deducting from points balance
await prisma.user.update({
  data: { usedToday: { increment: 1 } }
});
\`\`\`

**The Consequence**: Users could generate images indefinitely without ever consuming their paid points!

**The Fix**:
\`\`\`typescript
const freeRemaining = dailyQuota - usedToday;

if (freeRemaining > 0) {
  // Still within free quota -- just track usage
  await prisma.user.update({
    data: { usedToday: { increment: 1 } }
  });
} else {
  // Free quota exhausted -- deduct from paid points
  await prisma.pointsAccount.update({
    data: { balance: { decrement: 1 } }
  });
  await prisma.pointsTransaction.create({
    data: { type: 'USAGE', amount: -1, ... }
  });
}
\`\`\`

**Lesson**: Payment and credits logic must form a complete, closed loop. Always test the full lifecycle: free usage exhausted --> points deducted --> points reach zero --> generation blocked.

## Pitfall 3: PayPal Sandbox Traps

**Problem 1: Order status stuck at PENDING**
- **Cause**: The webhook handler was not correctly processing PayPal's asynchronous order status updates.
- **Solution**: Added proper webhook signature verification and implemented a status polling fallback to handle cases where webhooks were delayed or missed.

**Problem 2: Points not credited after successful payment**
- **Cause**: The PayPal capture API call failed silently, and without database transaction wrapping, the points credit step was skipped with no rollback.
- **Solution**: Added comprehensive logging at every step of the payment flow and wrapped the capture + points credit operations in a database transaction to ensure atomicity.

## Key Code: PayPal Payment Flow

\`\`\`typescript
// Step 1: Create order on the server
const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
  method: 'POST',
  headers: {
    'Authorization': \\\`Basic \\\${credentials}\\\`,
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

// Step 2: After user approves on PayPal, capture the payment
const capture = await fetch(
  \\\`https://api-m.sandbox.paypal.com/v2/checkout/orders/\\\${orderId}/capture\\\`,
  { method: 'POST', ... }
);

// Step 3: Credit points to user account (inside a transaction)
await prisma.pointsAccount.update({
  where: { userId },
  data: { balance: { increment: 20 } }
});
\`\`\`

## Data Model

\`\`\`prisma
model User {
  id           String   @id
  email        String   @unique
  dailyQuota   Int      @default(1)  // Daily free generation quota
  usedToday    Int      @default(0)  // Generations used today
}

model PointsAccount {
  userId   String   @id
  balance  Int      @default(0)  // Paid points balance
}

model PointsTransaction {
  id           String   @id
  userId       String
  type         String   // PURCHASE, USAGE, REFUND
  amount       Int
  balanceAfter Int
}
\`\`\`

## Deployment Architecture

\`\`\`
User --> Cloudflare (CDN/Protection) --> Vercel (Application) --> Turso (Database)
                                              |
                                        Replicate (AI Image Generation)
\`\`\`

This architecture is lightweight, cost-effective, and scales well for a side project. Cloudflare handles caching and DDoS protection, Vercel provides serverless compute with zero-config deploys, Turso gives us a globally distributed SQLite database, and Replicate handles the GPU-intensive image generation on demand.

## Day-by-Day Timeline

### Day 1: Foundation (Framework + Auth + Database)

The first day was all about getting the skeleton up and running. I scaffolded the Next.js 16 project with App Router, set up Google OAuth for authentication, and connected Turso as the database. By the end of Day 1, users could sign in, and I had the basic page layout working with a header showing the user's avatar and remaining quota.

The key decision here was choosing Turso over traditional PostgreSQL. For a side project, Turso's SQLite compatibility means zero-config locally, free tier in production, and edge deployment support. The trade-off is that it is less suitable for heavy concurrent writes, but for an avatar generation app the read/write ratio is heavily skewed toward reads.

### Day 2: Core Feature (Image Generation + Quota System)

Day 2 was the most intense. I integrated Replicate's API for image generation, built the upload flow (photo upload, style selection, generation trigger), and implemented the quota system. This is where Pitfall 1 and Pitfall 2 hit me -- the quota calculation bugs described above consumed several hours of debugging.

The image generation workflow: the user uploads a photo, the server sends it to Replicate's model endpoint along with the chosen style prompt, Replicate processes it asynchronously and returns a URL to the generated image, and our server downloads and stores it. The entire round-trip takes about 15-30 seconds depending on the model and queue depth.

### Day 3: Monetization + Polish (Payment + Deploy)

The final day was about making money and shipping. I integrated PayPal's checkout flow for purchasing points, built the points management UI, and deployed everything. This is where Pitfall 3 struck -- the PayPal sandbox issues ate up most of the morning.

After fixing the payment bugs, I did a final round of testing, set up the production environment on Vercel, configured the custom domain, and launched. Total time from idea to live product: roughly 72 hours of focused work.

## Lessons Learned

1. **Payment logic must form a closed loop**: Test the complete flow end-to-end. Every edge case (free quota exhausted, points deducted correctly, zero balance blocks generation, failed payment rolls back, webhook delays handled) must be covered. A payment system with a hole is worse than no payment system at all -- users will find and exploit the gap.
2. **Quota calculations need clear semantics**: Design your data model so that each field has one unambiguous meaning. Avoid mixing concepts like "total used" and "free used" in a single counter. When I separated free remaining quota from paid points balance, the calculation became trivially correct.
3. **Logging must be comprehensive**: When integrating third-party APIs like PayPal, log every request and response with timestamps and correlation IDs. When something goes wrong at 2 AM, detailed logs are the difference between a 5-minute fix and hours of blind debugging. I added structured logging with request ID tracking across the entire payment flow.
4. **Read third-party API docs thoroughly**: Do not assume how an API behaves based on naming alone. PayPal's sandbox has subtle behavioral differences from production (different error codes, timing behaviors, webhook delivery patterns) that can catch you off guard if you skip the documentation.

## What Would I Do Differently?

Looking back, there are a few things I would change:

- **Use Stripe instead of PayPal**: Stripe's developer experience is significantly better -- cleaner APIs, better documentation, and more predictable webhook behavior. PayPal's sandbox environment has too many quirks.
- **Add rate limiting from Day 1**: I did not add rate limiting until after launch, which was risky. Any user could have hammered the generation endpoint and run up my Replicate bill.
- **Write tests for the payment flow**: I tested manually, which is why the points deduction bug slipped through. Even a few integration tests covering the quota and payment paths would have caught it immediately.

## Cost Analysis

| Item | Cost |
|------|------|
| Domain name | $12/year |
| Vercel hosting | Free tier sufficient for initial traffic |
| Turso database | Free tier sufficient (up to 9GB) |
| Replicate (image gen) | ~$0.002 per generation |
| Cloudflare CDN | Free tier |
| **Total** | **~$15/month to start** |

At this cost structure, you only need a handful of paying users to break even. The key insight: by choosing services with generous free tiers (Vercel, Turso, Cloudflare) and pay-per-use AI infrastructure (Replicate), you can launch a real, revenue-generating product with almost zero upfront investment. The marginal cost per user is essentially just the Replicate API call -- about $0.002 per image generation.

---

**Full Source Code**: [github.com/moonye6/AvatarDoll](https://github.com/moonye6/AvatarDoll)

**Try It Live**: [avatardoll.online](https://avatardoll.online)`,
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
    titleEn: "OpenClaw vs ChatGPT — Why You Need an AI That Actually Acts",
    excerpt: "传统 AI 聊天机器人只能说不能做。OpenClaw 是一个真正能执行任务的 AI 助手。",
    excerptEn: "ChatGPT gives advice. OpenClaw executes it. Side-by-side comparison of capabilities, cost, privacy, and automation — with real command examples.",
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

This is the pain point of traditional AI chatbots -- they can only talk, not do.

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
- Set up scheduled tasks, send notifications

## Feature Comparison

| Feature | OpenClaw | ChatGPT |
|---------|----------|---------|
| **Text Generation** | Supported (via LLM providers) | Supported (native) |
| **File Operations** | Direct create/edit/delete | Only provides instructions |
| **Code Execution** | Runs code directly in sandbox | Code Interpreter (limited) |
| **Web Browsing** | Full headless browser control | Browsing plugin (limited) |
| **Multi-Platform** | 10+ messaging platforms | Web and mobile app only |
| **Self-Hosting** | Fully supported | Not available |
| **Skills/Plugins** | 42,000+ community skills | Limited plugin ecosystem |
| **Open Source** | Fully open source | Closed source |
| **Offline Use** | Supported (with local models) | Requires internet |
| **Scheduled Tasks** | Built-in cron and automation | Not supported |
| **Custom Extensions** | Skills API for any integration | No custom extension API |
| **Data Privacy** | Data stays on your server | Data sent to OpenAI servers |

## Concrete Examples

### Example 1: Organizing Files

**ChatGPT**:
> "Here is a Python script you can use to organize your files. Copy this code, save it as organize.py, and run it in your terminal..."

You still need to: copy the code, create a file, open a terminal, run the script, and debug any errors.

**OpenClaw**:
> "Done. I have moved 247 photos into folders organized by date. Here is a summary: 2025-01 (32 files), 2025-02 (45 files)..."

OpenClaw directly accesses the file system, reads EXIF data, creates the folders, and moves the files. You just ask and it is done.

### Example 2: Monitoring a Website

**ChatGPT**:
> "You can use Python's requests library to periodically check the website. Here is an example using cron..."

You need to write the code, set up cron, handle error cases, and configure notifications yourself.

**OpenClaw**:
> "I have set up monitoring for https://example.com. I will check every 5 minutes and notify you via Telegram if the site goes down or the response time exceeds 3 seconds."

OpenClaw creates the scheduled task, handles retries, and sends real-time notifications through your preferred messaging platform.

### Example 3: Data Analysis

**ChatGPT**:
> "Upload your CSV file and I can analyze it with Code Interpreter."

Limited to files under 512MB, runs in a restricted sandbox, and you lose your session after timeout.

**OpenClaw**:
> "I have connected to your PostgreSQL database, run the query, generated the charts, and posted the weekly report summary to your Slack channel."

OpenClaw can connect to real databases, process large datasets, generate visualizations, and distribute reports automatically.

## Pricing Comparison

### ChatGPT

\`\`\`
ChatGPT Free: Limited access, GPT-3.5 only
ChatGPT Plus: $20/month (GPT-4 access, limited usage)
ChatGPT Team: $25/user/month
ChatGPT Enterprise: Custom pricing
\`\`\`

**Monthly cost estimate**:
- Individual: $20/month (Plus)
- Team of 10: $250/month

### OpenClaw

\`\`\`
OpenClaw software: Free (open source)
AI model costs: Pay only for API usage
Self-hosted with local models: $0 API cost
\`\`\`

**Monthly cost estimate**:
- Individual (cloud API): $5-15/month
- Individual (local models): $0/month
- Team of 10 (cloud API): $50-150/month
- Team of 10 (self-hosted): Hardware costs only

OpenClaw is significantly cheaper for heavy users because you pay only for the API tokens you consume, with no platform markup. With local models via LocalAI or Ollama, the API cost drops to zero.

## When to Choose Each

### Choose ChatGPT if you:

- Only need text generation, translation, and writing assistance
- Do not need the AI to execute real-world actions
- Prefer a simple web interface with no setup
- Are comfortable with data being processed on OpenAI servers
- Do not need multi-platform integration

### Choose OpenClaw if you:

- Want to automate daily tasks and boost productivity
- Need code execution and file operation capabilities
- Value data privacy and want to run everything locally
- Want to use AI through Telegram, Discord, Slack, or other messaging platforms
- Need a customizable and extensible skill ecosystem
- Are a developer who wants full control over the AI stack
- Need scheduled tasks, monitoring, or workflow automation

## Frequently Asked Questions

### Q: Can OpenClaw use ChatGPT's models?

Yes. OpenClaw supports OpenAI's GPT models as a provider, alongside Anthropic Claude, local models, and others. You can even configure multiple providers with automatic fallback.

### Q: Is ChatGPT easier to set up?

Yes, ChatGPT requires zero setup -- just open the website and start chatting. OpenClaw requires initial configuration, but the \`openclaw init\` command makes it straightforward. The tradeoff is that OpenClaw gives you far more power and flexibility after setup.

### Q: Can I switch from ChatGPT to OpenClaw?

Absolutely. Many users start with ChatGPT for simple conversations and move to OpenClaw when they need actual task execution, automation, or multi-platform access.

### Q: Which has better AI quality?

Both can use the same underlying models. OpenClaw supports Claude, GPT-4, and local models. The AI quality depends on which model you choose, not on the platform itself.

## Summary

**ChatGPT** is a great conversational AI for text generation and Q&A. It is simple, polished, and requires no setup.

**OpenClaw** is a full AI agent platform that goes beyond conversation to actually execute tasks on your behalf. It is open source, self-hostable, multi-platform, and extensible.

The fundamental difference: ChatGPT tells you how to do things. OpenClaw does them for you.

For most users who want an AI that can truly act on their behalf, OpenClaw is the stronger choice.`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["ChatGPT", "对比", "AI助手", "自动化"],
    readingTime: 8,
    image: "/og-image.png"
  },
];
