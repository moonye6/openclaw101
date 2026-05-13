import { MetadataRoute } from 'next'

// Robots config is essentially static — rebuild only on deploy.
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/images/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://openclaw101.vip/sitemap.xml',
    host: 'https://openclaw101.vip',
  }
}
