import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openclaw101.vip'

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/skills', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/tutorials', changeFrequency: 'daily' as const, priority: 0.8 },
  ]

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
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

  for (const page of pages) {
    for (const locale of ['en', 'zh']) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
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

  return entries
}
