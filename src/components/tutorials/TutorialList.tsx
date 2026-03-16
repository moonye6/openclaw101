'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink, Book, Video, Cloud, Wrench, Lightbulb, MessageSquare, Cpu, Zap } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
  language: string;
  icon?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'official': <Book className="w-5 h-5" />,
  'cloud-deploy': <Cloud className="w-5 h-5" />,
  'getting-started': <Lightbulb className="w-5 h-5" />,
  'channels': <MessageSquare className="w-5 h-5" />,
  'skills': <Wrench className="w-5 h-5" />,
  'videos': <Video className="w-5 h-5" />,
  'deep-dives': <Cpu className="w-5 h-5" />,
  'tools': <Zap className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  'official': 'bg-blue-500',
  'cloud-deploy': 'bg-cyan-500',
  'getting-started': 'bg-green-500',
  'channels': 'bg-purple-500',
  'skills': 'bg-orange-500',
  'videos': 'bg-red-500',
  'deep-dives': 'bg-indigo-500',
  'tools': 'bg-yellow-500',
};

// 初始教程数据
const initialTutorials: Tutorial[] = [
  // Official
  {
    id: '1',
    title: 'OpenClaw 官方文档',
    description: '完整的 API 参考、配置指南和架构说明',
    url: 'https://docs.openclaw.ai',
    source: 'OpenClaw',
    category: 'official',
    language: 'en',
  },
  {
    id: '2',
    title: 'GitHub — openclaw/openclaw',
    description: '源代码、Issue 跟踪和社区贡献指南 (312k+ ⭐)',
    url: 'https://github.com/openclaw/openclaw',
    source: 'GitHub',
    category: 'official',
    language: 'en',
  },
  {
    id: '3',
    title: 'ClawHub 技能市场',
    description: '发现、安装和分享 AI 技能插件',
    url: 'https://clawhub.com',
    source: 'ClawHub',
    category: 'official',
    language: 'en',
  },
  // Cloud Deploy
  {
    id: '4',
    title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理',
    description: '轻量应用服务器一键部署，可视化配置面板接入钉钉',
    url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw',
    source: '阿里云',
    category: 'cloud-deploy',
    language: 'zh',
  },
  {
    id: '5',
    title: '腾讯云 — OpenClaw 接入飞书保姆级教程',
    description: 'Lighthouse 一键部署 + 飞书机器人全流程配置',
    url: 'https://cloud.tencent.com/developer/article/2625073',
    source: '腾讯云',
    category: 'cloud-deploy',
    language: 'zh',
  },
  {
    id: '6',
    title: 'DigitalOcean — One-Click Deploy OpenClaw',
    description: 'Learn how to deploy OpenClaw using DigitalOcean\'s 1-Click solution',
    url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw',
    source: 'DigitalOcean',
    category: 'cloud-deploy',
    language: 'en',
  },
  // Getting Started
  {
    id: '7',
    title: 'OpenClaw 下载安装使用 — 详细图文教程',
    description: '系统要求、多种安装方式对比、常见问题排查、Web/终端两种界面入门',
    url: 'https://apifox.com/apiskills/openclaw-installation-and-usage-guide/',
    source: 'Apifox',
    category: 'getting-started',
    language: 'zh',
  },
  {
    id: '8',
    title: '保姆级飞书对接教程 — 手把手搭建 AI 助手',
    description: 'Linux 下安装 OpenClaw 并对接飞书机器人，打造专属智能助理',
    url: 'https://www.cnblogs.com/catchadmin/p/19556552',
    source: '博客园',
    category: 'getting-started',
    language: 'zh',
  },
  {
    id: '9',
    title: 'freeCodeCamp — OpenClaw Full Tutorial for Beginners',
    description: '从被动聊天到主动 Agent 的转变，freeCodeCamp 出品的全面入门教程',
    url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/',
    source: 'freeCodeCamp',
    category: 'getting-started',
    language: 'en',
  },
  // Videos
  {
    id: '10',
    title: 'OpenClaw 海量全玩法攻略 — 国内网络使用 + 本地部署',
    description: 'B站详细视频教程，涵盖所有主要功能和配置',
    url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/',
    source: 'Bilibili',
    category: 'videos',
    language: 'zh',
  },
  {
    id: '11',
    title: 'YouTube — Full OpenClaw Setup Tutorial: Step-by-Step Walkthrough',
    description: 'Complete video walkthrough for installing and configuring OpenClaw AI assistant',
    url: 'https://www.youtube.com/watch?v=fcZMmP5dsl4',
    source: 'YouTube',
    category: 'videos',
    language: 'en',
  },
  {
    id: '12',
    title: '超详细的最强AI部署教程，小白友好',
    description: '2026 年最新版部署教程，面向零基础用户的保姆级讲解',
    url: 'https://www.bilibili.com/video/BV1fMfZBuEMj/',
    source: 'Bilibili',
    category: 'videos',
    language: 'zh',
  },
  // Deep Dives
  {
    id: '13',
    title: 'IBM Think — OpenClaw: The Viral "Space Lobster" Agent',
    description: 'IBM 深度分析 OpenClaw 的架构创新和垂直集成策略',
    url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration',
    source: 'IBM',
    category: 'deep-dives',
    language: 'en',
  },
  {
    id: '14',
    title: 'DEV Community — Unleashing OpenClaw: Ultimate Guide for Developers',
    description: '开发者视角深度解析：Gateway 架构、Brain 模型层、自定义 Skill 编写',
    url: 'https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h',
    source: 'DEV Community',
    category: 'deep-dives',
    language: 'en',
  },
  {
    id: '15',
    title: 'Scientific American — OpenClaw is an open-source AI agent that runs your computer',
    description: 'This open-source agent installs software, makes calls and runs your digital life',
    url: 'https://www.scientificamerican.com/article/moltbot-is-an-open-source-ai-agent-that-runs-your-computer/',
    source: 'Scientific American',
    category: 'deep-dives',
    language: 'en',
  },
  // Skills
  {
    id: '16',
    title: 'ClawHub 技能开发文档',
    description: '如何创建、发布和管理自定义技能',
    url: 'https://docs.openclaw.ai/tools/clawhub',
    source: 'OpenClaw Docs',
    category: 'skills',
    language: 'en',
  },
  // Channels
  {
    id: '17',
    title: '本地部署接入微信/飞书/钉钉/QQ 10分钟保姆级教程',
    description: '10分钟手把手教会，附完整操作文档，四大平台全覆盖',
    url: 'https://www.bilibili.com/video/BV1MfFAz6EnR/',
    source: 'Bilibili',
    category: 'channels',
    language: 'zh',
  },
  // Tools
  {
    id: '18',
    title: 'OpenClaw 汉化版 — CLI + Dashboard 全中文',
    description: '每小时自动同步官方仓库，含完整中文 README、全流程搭建教程和排错指南',
    url: 'https://github.com/1186258278/OpenClawChineseTranslation',
    source: 'GitHub',
    category: 'tools',
    language: 'zh',
  },
];

export function TutorialList() {
  const t = useTranslations('tutorials');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const categories = [
    { id: 'official', label: t('categories.official') },
    { id: 'cloud-deploy', label: t('categories.cloudDeploy') },
    { id: 'getting-started', label: t('categories.gettingStarted') },
    { id: 'channels', label: t('categories.channels') },
    { id: 'skills', label: t('categories.skills') },
    { id: 'videos', label: t('categories.videos') },
    { id: 'deep-dives', label: t('categories.deepDives') },
    { id: 'tools', label: t('categories.tools') },
  ];

  const filteredTutorials = initialTutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tutorial.category === selectedCategory;
    const matchesLanguage = !selectedLanguage || tutorial.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLanguage === null 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => setSelectedLanguage(null)}
          >
            {t('allLanguages')}
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLanguage === 'en' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => setSelectedLanguage('en')}
          >
            EN
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLanguage === 'zh' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => setSelectedLanguage('zh')}
          >
            中文
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          {t('allCategories')}
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </Badge>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        {t('resultsCount', { count: filteredTutorials.length })}
      </p>

      {/* Tutorial Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <a
                href={tutorial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5"
              >
                    <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 p-2 rounded-lg text-white ${categoryColors[tutorial.category]}`}>
                    {categoryIcons[tutorial.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-600">{tutorial.source}</span>
                      <Badge variant="outline" className="text-xs">
                        {tutorial.language === 'en' ? 'EN' : '中文'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {tutorial.description}
                    </p>
                  </div>
                  <ExternalLink className="flex-shrink-0 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </a>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
