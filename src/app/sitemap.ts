import { MetadataRoute } from 'next'
import { tutorials } from '@/data/tutorials'
import { skillCategories } from '@/data/skills'
import { blogPosts } from '@/data/blog'

const BUILD_DATE = new Date('2026-04-07')

// SEO core slugs — get highest priority (0.9)
const SEO_CORE_SLUGS = new Set([
  'how-to-create-telegram-bot',
  'telegram-bot-examples',
  'telegram-automation-guide',
  'telegram-bot-api-tutorial',
  'best-telegram-bot-tools',
  'ai-agent-guide',
])

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openclaw101.vip'

  const pages = [
    { path: '',           changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/blog',      changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tutorials', changeFrequency: 'daily'  as const, priority: 0.8 },
    { path: '/skills',    changeFrequency: 'daily'  as const, priority: 0.8 },
  ]

  const learningDays = [1, 2, 3, 4, 5, 6, 7]

  const entries: MetadataRoute.Sitemap = []

  // Main pages
  for (const page of pages) {
    entries.push({
      url: `${baseUrl}/en${page.path}`,
      lastModified: BUILD_DATE,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  }

  // Learning path pages (7 days)
  for (const day of learningDays) {
    entries.push({
      url: `${baseUrl}/en/learn/${day}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  // Blog post pages — Telegram series gets priority 0.9, others 0.7
  for (const post of blogPosts) {
    entries.push({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: SEO_CORE_SLUGS.has(post.slug) ? 0.9 : 0.7,
    })
  }

  // Tutorial detail pages
  for (const tutorial of tutorials) {
    entries.push({
      url: `${baseUrl}/en/tutorials/${tutorial.id}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  }

  // Skill category pages
  for (const category of skillCategories) {
    entries.push({
      url: `${baseUrl}/en/skills/${category.id}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  return entries
}
