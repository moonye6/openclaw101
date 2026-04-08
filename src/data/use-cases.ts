import { Code, FileText, Globe, Home, Calendar, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface UseCase {
  slug: string;
  key: string;
  icon: LucideIcon;
  emoji: string;
  category: string;
  commands: string[];
  relatedTutorials: { href: string; labelKey: string }[];
  relatedSkills: string[];
}

export const useCases: UseCase[] = [
  {
    slug: 'coding-assistant',
    key: 'coding',
    icon: Code,
    emoji: '💻',
    category: 'dev',
    commands: [
      'claw write a Python web scraper',
      'claw fix the bug in app.js',
      'claw add unit tests for utils/',
    ],
    relatedTutorials: [
      { href: '/blog/ai-agent-guide', labelKey: 'aiAgentGuide' },
      { href: '/tutorials', labelKey: 'allTutorials' },
    ],
    relatedSkills: ['codex', 'github', 'code-review'],
  },
  {
    slug: 'research-analysis',
    key: 'research',
    icon: Globe,
    emoji: '📊',
    category: 'research',
    commands: [
      'claw search latest AI news today',
      'claw summarize this paper.pdf',
      'claw compare React vs Vue in 2026',
    ],
    relatedTutorials: [
      { href: '/blog/ai-agent-guide', labelKey: 'aiAgentGuide' },
      { href: '/blog/telegram-automation-guide', labelKey: 'automationGuide' },
    ],
    relatedSkills: ['web-search', 'arxiv', 'wikipedia'],
  },
  {
    slug: 'task-automation',
    key: 'automation',
    icon: Calendar,
    emoji: '⚙️',
    category: 'automation',
    commands: [
      'claw check my server every hour',
      'claw send daily report at 9am',
      'claw backup database weekly',
    ],
    relatedTutorials: [
      { href: '/blog/telegram-automation-guide', labelKey: 'automationGuide' },
      { href: '/blog/how-to-create-telegram-bot', labelKey: 'createTelegramBot' },
    ],
    relatedSkills: ['cron', 'monitor', 'notification'],
  },
  {
    slug: 'content-creation',
    key: 'content',
    icon: FileText,
    emoji: '📝',
    category: 'content',
    commands: [
      'claw write a blog post about AI',
      'claw translate docs to Chinese',
      'claw generate social media posts',
    ],
    relatedTutorials: [
      { href: '/blog/ai-agent-guide', labelKey: 'aiAgentGuide' },
      { href: '/tutorials', labelKey: 'allTutorials' },
    ],
    relatedSkills: ['writing', 'translator', 'social-media'],
  },
  {
    slug: 'smart-home',
    key: 'smarthome',
    icon: Home,
    emoji: '🏠',
    category: 'smarthome',
    commands: [
      'claw turn off all lights',
      'claw set thermostat to 22C',
      'claw lock the front door',
    ],
    relatedTutorials: [
      { href: '/blog/ai-agent-guide', labelKey: 'aiAgentGuide' },
      { href: '/tutorials', labelKey: 'allTutorials' },
    ],
    relatedSkills: ['home-assistant', 'iot', 'mqtt'],
  },
  {
    slug: 'data-processing',
    key: 'data',
    icon: BarChart3,
    emoji: '📈',
    category: 'data',
    commands: [
      'claw analyze sales.csv trends',
      'claw create a chart from data',
      'claw query database for stats',
    ],
    relatedTutorials: [
      { href: '/blog/ai-agent-guide', labelKey: 'aiAgentGuide' },
      { href: '/tutorials', labelKey: 'allTutorials' },
    ],
    relatedSkills: ['csv-analyzer', 'database', 'chart-gen'],
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((uc) => uc.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return useCases.map((uc) => uc.slug);
}
