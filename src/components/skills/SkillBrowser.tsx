'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Terminal, Star, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface SkillCategory {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  count: number;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  installCommand: string;
  githubUrl?: string;
  stars: number;
}

// 技能分类数据
const skillCategories: SkillCategory[] = [
  { id: 'ai-llm', name: 'AI & LLMs', nameZh: 'AI & LLM', icon: '🧠', count: 159 },
  { id: 'research', name: 'Search & Research', nameZh: '搜索与研究', icon: '🔍', count: 148 },
  { id: 'devops', name: 'DevOps & Cloud', nameZh: 'DevOps & 云', icon: '☁️', count: 144 },
  { id: 'marketing', name: 'Marketing & Sales', nameZh: '营销与销售', icon: '📈', count: 94 },
  { id: 'coding', name: 'Coding Agents', nameZh: '编程代理', icon: '🤖', count: 55 },
  { id: 'communication', name: 'Communication', nameZh: '通讯', icon: '💬', count: 58 },
  { id: 'notes', name: 'Notes & PKM', nameZh: '笔记与知识管理', icon: '📝', count: 61 },
  { id: 'web', name: 'Web & Frontend', nameZh: 'Web 与前端', icon: '🌐', count: 46 },
  { id: 'smarthome', name: 'Smart Home & IoT', nameZh: '智能家居', icon: '🏠', count: 50 },
  { id: 'speech', name: 'Speech & Audio', nameZh: '语音与音频', icon: '🗣️', count: 44 },
  { id: 'health', name: 'Health & Fitness', nameZh: '健康与健身', icon: '🏋️', count: 35 },
  { id: 'gaming', name: 'Gaming', nameZh: '游戏', icon: '🎮', count: 7 },
];

// 示例技能数据
const sampleSkills: Skill[] = [
  {
    id: '1',
    name: 'github',
    description: 'GitHub operations via gh CLI: issues, PRs, CI runs, code review, API queries',
    categoryId: 'coding',
    installCommand: 'npx clawhub@latest install github',
    githubUrl: 'https://github.com/openclaw/skills/tree/main/github',
    stars: 1250,
  },
  {
    id: '2',
    name: 'weather',
    description: 'Get current weather and forecasts via wttr.in or Open-Meteo',
    categoryId: 'research',
    installCommand: 'npx clawhub@latest install weather',
    stars: 890,
  },
  {
    id: '3',
    name: 'gemini',
    description: 'Gemini CLI for one-shot Q&A, summaries, and generation',
    categoryId: 'ai-llm',
    installCommand: 'npx clawhub@latest install gemini',
    stars: 756,
  },
  {
    id: '4',
    name: 'tmux',
    description: 'Remote-control tmux sessions for interactive CLIs',
    categoryId: 'devops',
    installCommand: 'npx clawhub@latest install tmux',
    stars: 623,
  },
  {
    id: '5',
    name: 'web-search',
    description: 'Search the web using Brave Search API',
    categoryId: 'research',
    installCommand: 'npx clawhub@latest install web-search',
    stars: 534,
  },
  {
    id: '6',
    name: 'healthcheck',
    description: 'Host security hardening and risk-tolerance configuration',
    categoryId: 'devops',
    installCommand: 'npx clawhub@latest install healthcheck',
    stars: 412,
  },
  {
    id: '7',
    name: 'browser',
    description: 'Control web browser via Playwright automation',
    categoryId: 'web',
    installCommand: 'npx clawhub@latest install browser',
    stars: 567,
  },
  {
    id: '8',
    name: 'coding-agent',
    description: 'Delegate coding tasks to Codex, Claude Code, or Pi agents',
    categoryId: 'coding',
    installCommand: 'npx clawhub@latest install coding-agent',
    stars: 1102,
  },
];

export function SkillBrowser() {
  const t = useTranslations('skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const filteredSkills = sampleSkills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || skill.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.count, 0);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{totalSkills.toLocaleString()}+</div>
          <div className="text-sm text-gray-500">{t('totalSkills')}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{skillCategories.length}</div>
          <div className="text-sm text-gray-500">{t('categories')}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{skillCategories[0].count}</div>
          <div className="text-sm text-gray-500">{t('aiLlm')}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{skillCategories[1].count}</div>
          <div className="text-sm text-gray-500">{t('research')}</div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('browseByCategory')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Card
            className={`p-4 text-center cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === null ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            <div className="text-2xl mb-1">📦</div>
            <div className="font-medium text-sm">{t('all')}</div>
            <div className="text-xs text-gray-500">{totalSkills.toLocaleString()}</div>
          </Card>
          {skillCategories.map((category) => (
            <Card
              key={category.id}
              className={`p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {selectedCategory 
            ? skillCategories.find(c => c.id === selectedCategory)?.name 
            : t('featuredSkills')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <Badge variant="outline" className="mt-1">
                      {skillCategories.find(c => c.id === skill.categoryId)?.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{skill.stars}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-800 overflow-x-auto">
                    {skill.installCommand}
                  </code>
                  <button
                    onClick={() => copyCommand(skill.installCommand)}
                    className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    title="Copy command"
                  >
                    <Terminal className="h-4 w-4" />
                  </button>
                  {skill.githubUrl && (
                    <a
                      href={skill.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
