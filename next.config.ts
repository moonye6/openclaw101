import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Set default cache headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // 静态资源缓存 — 仅 _next/static (JS/CSS/fonts)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Detail pages (content immutable once published) — 30-day CDN, 7-day stale.
      // Edits propagate via deploy or daily ISR rebuild.
      {
        source: '/blog/:slug',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=2592000, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/tutorials/:id',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=2592000, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/skills/:id',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=2592000, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/use-cases/:slug',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=2592000, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/learn/:day',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=2592000, stale-while-revalidate=604800' },
        ],
      },
      // RSS — daily cache; matches new post drops within 24h via ISR.
      {
        source: '/feed.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=86400' },
        ],
      },
      // Default for list pages, home, guide, examples, faq, static info.
      // Was: s-maxage=300, stale-while-revalidate=60 (5-min cache → constant origin hits).
      // Now: 1-day CDN + 7-day stale. Performance ↑ ~288×.
      {
        source: '/((?!api|_next|_vercel).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
