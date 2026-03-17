interface RSSItem {
  title: string
  description: string
  url: string
  date: Date
  categories?: string[]
}

interface RSPOptions {
  title: string
  description: string
  siteUrl: string
  language?: string
}

export class RSS {
  private items: RSSItem[] = []
  private options: RSPOptions

  constructor(options: RSPOptions) {
    this.options = options
  }

  addItem(item: RSSItem) {
    this.items.push(item)
  }

  xml(): string {
    const itemsXml = this.items
      .map(item => {
        const categories = item.categories
          ? item.categories.map(c => `<category>${this.escape(c)}</category>`).join('\n      ')
          : ''

        return `
    <item>
      <title>${this.escape(item.title)}</title>
      <description>${this.escape(item.description)}</description>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      ${categories}
    </item>`
      })
      .join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${this.escape(this.options.title)}</title>
    <description>${this.escape(this.options.description)}</description>
    <link>${this.options.siteUrl}</link>
    <language>${this.options.language || 'en'}</language>
    <atom:link href="${this.options.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`
  }

  private escape(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
}
