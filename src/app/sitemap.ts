import { MetadataRoute } from 'next'
import { tutorials } from '@/data/tutorials'
import { skillCategories } from '@/data/skills'
import { blogPosts } from '@/data/blog'

const BUILD_DATE = new Date('2026-03-17')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openclaw101.com'

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/skills', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/tutorials', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.9 },
  ]

  const learningDays = [1, 2, 3, 4, 5, 6, 7]

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
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
    for (const locale of ['en', 'zh']) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: BUILD_DATE,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page.path}`,
            zh: `${baseUrl}/zh${page.path}`,
          },
        },
      })
    }
  }

  // Learning path pages (7 days × 2 locales)
  for (const day of learningDays) {
    for (const locale of ['en', 'zh']) {
      entries.push({
        url: `${baseUrl}/${locale}/learn/${day}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/learn/${day}`,
            zh: `${baseUrl}/zh/learn/${day}`,
          },
        },
      })
    }
  }

  // Blog post pages
  for (const post of blogPosts) {
    for (const locale of ['en', 'zh']) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            zh: `${baseUrl}/zh/blog/${post.slug}`,
          },
        },
      })
    }
  }

  // Tutorial detail pages
  for (const tutorial of tutorials) {
    for (const locale of ['en', 'zh']) {
      entries.push({
        url: `${baseUrl}/${locale}/tutorials/${tutorial.id}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/tutorials/${tutorial.id}`,
            zh: `${baseUrl}/zh/tutorials/${tutorial.id}`,
          },
        },
      })
    }
  }

  // Skill category pages
  for (const category of skillCategories) {
    for (const locale of ['en', 'zh']) {
      entries.push({
        url: `${baseUrl}/${locale}/skills/${category.id}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/skills/${category.id}`,
            zh: `${baseUrl}/zh/skills/${category.id}`,
          },
        },
      })
    }
  }

  return entries
}
