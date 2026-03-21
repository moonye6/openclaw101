import { RSS } from '@/lib/rss'
import { tutorials } from '@/data/tutorials'

const SITE_URL = 'https://openclaw101.com'

export async function GET() {
  const rss = new RSS({
    title: 'OpenClaw 101 - Tutorials Feed',
    description: 'Latest tutorials and learning resources for OpenClaw AI assistant',
    siteUrl: SITE_URL,
    language: 'en',
  })

  // Add latest tutorials
  tutorials.slice(0, 20).forEach(tutorial => {
    rss.addItem({
      title: tutorial.title,
      description: tutorial.description,
      url: `${SITE_URL}/en/tutorials/${tutorial.id}`,
      date: new Date(),
      categories: [tutorial.category],
    })
  })

  return new Response(rss.xml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
