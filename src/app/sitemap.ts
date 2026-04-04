import { MetadataRoute } from 'next'
import { tutorials } from '@/data/tutorials'
import { skillCategories } from '@/data/skills'
import { blogPosts } from '@/data/blog'

const BUILD_DATE = new Date('2026-03-17')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openclaw101.vip'

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/skills', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/tutorials', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.9 },
  ]

  const learningDays = [1, 2, 3, 4, 5, 6, 7]

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          zh: `${baseUrl}/zh`,
        },
      },
    },
  ]

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
      priority: 0.8,
    })
  }

  // Blog post pages — English only
  for (const post of blogPosts) {
    entries.push({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
