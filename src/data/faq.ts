export const faqData = {
  en: [
    {
      question: "What is OpenClaw?",
      answer: "OpenClaw is an all-in-one AI assistant framework that can chat, write code, run scripts, search the web, manage files, and even control browsers. Unlike ChatGPT, OpenClaw can actually 'do things' - it can write and execute scripts directly."
    },
    {
      question: "Is OpenClaw free to use?",
      answer: "OpenClaw itself is open source and free. You need to provide your own AI model API key (like Anthropic Claude or OpenAI). The cost depends on your usage of the chosen AI provider."
    },
    {
      question: "How long does it take to learn OpenClaw?",
      answer: "Our 7-day learning path covers everything from basic setup to advanced automation. Most users can get started with basic tasks within a few hours of Day 1."
    },
    {
      question: "What platforms does OpenClaw support?",
      answer: "OpenClaw supports macOS, Linux, and Windows. It requires Node.js 18+ (20+ recommended) and at least 2GB of available memory."
    },
    {
      question: "Can I use OpenClaw without coding skills?",
      answer: "Yes! OpenClaw uses natural language commands. You describe what you want in plain English (or Chinese), and OpenClaw handles the technical implementation automatically."
    },
    {
      question: "What AI models does OpenClaw support?",
      answer: "OpenClaw supports multiple AI backends including Anthropic Claude, OpenAI GPT, and other compatible models. You can configure your preferred model in the config file."
    },
    {
      question: "Is my data private with OpenClaw?",
      answer: "OpenClaw runs locally on your machine. Your files and conversations stay on your device. Only the text sent to the AI model API goes to the cloud (per your chosen provider's terms)."
    },
    {
      question: "What are Skills in OpenClaw?",
      answer: "Skills are specialized capabilities that extend OpenClaw's core functionality. They can be installed from ClawHub, the community skill marketplace, and include abilities like image generation, video analysis, document management, and more."
    },
    {
      question: "How does OpenClaw compare to ChatGPT or Claude?",
      answer: "While ChatGPT and Claude are cloud-based chat services, OpenClaw is a self-hosted AI agent framework. The key difference is that OpenClaw can take real actions on your behalf — executing code, managing files, controlling browsers, scheduling tasks, and connecting to platforms like Telegram or Discord. Think of ChatGPT as an advisor, and OpenClaw as an executor."
    },
    {
      question: "Can OpenClaw work with local/offline AI models?",
      answer: "Yes! OpenClaw supports local LLM backends through Ollama, vLLM, and other compatible servers. You can run models like Llama 3, Mistral, or Qwen completely offline on your own hardware, ensuring full data privacy without any cloud dependency."
    },
    {
      question: "How do I connect OpenClaw to messaging platforms?",
      answer: "OpenClaw uses a gateway architecture that supports Telegram, Discord, WhatsApp, Signal, Feishu (Lark), DingTalk, and more. Each platform has a dedicated connector — you simply add your platform credentials to the config file and restart. Our Day 1 tutorial walks you through the entire process step by step."
    },
    {
      question: "Is OpenClaw safe to use? Are there security concerns?",
      answer: "OpenClaw is designed with security in mind — it runs locally and you control all permissions. However, be cautious with third-party Skills from ClawHub: researchers have found malicious skills in the marketplace. Always review skill source code before installation, stick to verified publishers, and keep your OpenClaw installation updated for the latest security patches."
    },
  ],
  zh: [
    {
      question: "OpenClaw 是什么？",
      answer: "OpenClaw 是一个全能型 AI 助手框架，不仅能聊天，还能写代码、运行脚本、搜索网页、管理文件，甚至控制浏览器。和 ChatGPT 的核心区别在于：OpenClaw 能真正'动手做事'——它可以直接写好并执行脚本。"
    },
    {
      question: "OpenClaw 是免费的吗？",
      answer: "OpenClaw 本身是开源免费的。你需要提供自己的 AI 模型 API 密钥（如 Anthropic Claude 或 OpenAI）。费用取决于你选择的 AI 提供商的使用量。"
    },
    {
      question: "学习 OpenClaw 需要多长时间？",
      answer: "我们的七天学习路径涵盖了从基础安装到高级自动化的所有内容。大多数用户在第一天的几个小时内就可以开始执行基本任务。"
    },
    {
      question: "OpenClaw 支持哪些平台？",
      answer: "OpenClaw 支持 macOS、Linux 和 Windows。需要 Node.js 18+（推荐 20+）和至少 2GB 可用内存。"
    },
    {
      question: "没有编程基础可以使用 OpenClaw 吗？",
      answer: "可以！OpenClaw 使用自然语言命令。你用中文或英文描述你想做什么，OpenClaw 会自动处理技术实现。"
    },
    {
      question: "OpenClaw 支持哪些 AI 模型？",
      answer: "OpenClaw 支持多种 AI 后端，包括 Anthropic Claude、OpenAI GPT 和其他兼容模型。你可以在配置文件中设置首选模型。"
    },
    {
      question: "使用 OpenClaw 我的数据安全吗？",
      answer: "OpenClaw 在你的本地机器上运行。你的文件和对话都保存在本地设备上。只有发送到 AI 模型 API 的文本会经过云端（按照你选择的提供商条款）。"
    },
    {
      question: "OpenClaw 中的 Skills 是什么？",
      answer: "Skills 是扩展 OpenClaw 核心功能的专业能力。它们可以从社区技能市场 ClawHub 安装，包括图像生成、视频分析、文档管理等多种能力。"
    },
    {
      question: "OpenClaw 与 ChatGPT 或 Claude 相比有什么不同？",
      answer: "ChatGPT 和 Claude 是基于云的聊天服务，而 OpenClaw 是一个可自托管的 AI 智能体框架。核心区别在于 OpenClaw 可以代你执行真实操作——执行代码、管理文件、控制浏览器、调度任务，还能连接 Telegram、Discord 等平台。简单说，ChatGPT 是顾问，OpenClaw 是执行者。"
    },
    {
      question: "OpenClaw 能使用本地/离线 AI 模型吗？",
      answer: "可以！OpenClaw 支持通过 Ollama、vLLM 等兼容服务运行本地大模型后端。你可以在自己的硬件上完全离线运行 Llama 3、Mistral 或 Qwen 等模型，确保完全的数据隐私，不依赖任何云服务。"
    },
    {
      question: "如何将 OpenClaw 连接到消息平台？",
      answer: "OpenClaw 使用网关架构，支持 Telegram、Discord、WhatsApp、Signal、飞书、钉钉等平台。每个平台都有专用连接器——你只需在配置文件中添加平台凭证并重启即可。我们的第一天教程会手把手带你完成整个配置过程。"
    },
    {
      question: "使用 OpenClaw 安全吗？有什么安全顾虑？",
      answer: "OpenClaw 在设计上注重安全性——它在本地运行，你控制所有权限。但对 ClawHub 上的第三方技能需要保持谨慎：研究人员曾在市场中发现恶意技能。安装前请务必审查技能源代码，优先选择已验证的发布者，并保持 OpenClaw 更新以获得最新的安全补丁。"
    },
  ],
};
