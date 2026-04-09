import { RSS } from '@/lib/rss'
import { tutorials } from '@/data/tutorials'
import { blogPosts } from '@/data/blog'

const SITE_URL = 'https://openclaw101.vip'

export async function GET() {
  const rss = new RSS({
    title: 'OpenClaw 101 — Guides, Tutorials & Blog',
    description: 'Practical guides, tutorials, and articles about OpenClaw AI agent framework. Installation, troubleshooting, automation, and more.',
    siteUrl: SITE_URL,
    language: 'en',
  })

  // Add blog posts (sorted by date, newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  for (const post of sortedPosts) {
    rss.addItem({
      title: post.titleEn,
      description: post.excerptEn,
      url: `${SITE_URL}/blog/${post.slug}`,
      date: new Date(post.date),
      categories: [post.categoryEn],
    })
  }

  // Add latest tutorials
  tutorials.slice(0, 20).forEach(tutorial => {
    rss.addItem({
      title: tutorial.title,
      description: tutorial.description,
      url: `${SITE_URL}/tutorials/${tutorial.id}`,
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
