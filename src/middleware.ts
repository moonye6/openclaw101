import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Set cache headers for static pages (ISR)
  const pathname = request.nextUrl.pathname;
  
  // Cache HTML pages for 1 hour at CDN level
  if (
    pathname === '/' ||
    pathname === '/en' ||
    pathname === '/zh' ||
    pathname.startsWith('/en/') ||
    pathname.startsWith('/zh/')
  ) {
    // Only set if not already set by Vercel
    if (!response.headers.get('Cache-Control')?.includes('s-maxage')) {
      response.headers.set(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400'
      );
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|og-image|icon|apple-touch-icon|manifest).*)',
  ],
};
