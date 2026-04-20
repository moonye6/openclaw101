import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import {
  validBlogSlugs,
  validTutorialIds,
  validSkillCategories,
  validLearnDays,
  validSevenDays,
  validUseCaseSlugs,
} from './data/valid-params';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

// Dynamic route patterns → valid-param sets.
// Middleware returns 404 for unknown params because dynamicParams=false
// doesn't reliably set HTTP 404 status in Next.js 16 + next-intl.
const DYNAMIC_ROUTES: Array<{ re: RegExp; set: Set<string> }> = [
  { re: /^\/blog\/([^/]+)$/, set: validBlogSlugs },
  { re: /^\/tutorials\/([^/]+)$/, set: validTutorialIds },
  { re: /^\/skills\/([^/]+)$/, set: validSkillCategories },
  { re: /^\/learn\/([^/]+)$/, set: validLearnDays },
  { re: /^\/7days\/([^/]+)$/, set: validSevenDays },
  { re: /^\/use-cases\/([^/]+)$/, set: validUseCaseSlugs },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 301 redirect /en/* → /* (preserve SEO for indexed pages)
  if (pathname === '/en' || pathname === '/en/') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }
  if (pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, '');
    return NextResponse.redirect(url, { status: 301 });
  }

  // 301 redirect /zh/* → /*
  if (pathname.startsWith('/zh')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh/, '') || '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // 301 redirect /7days/* → /learn/*
  const sevenDaysMatch = pathname.match(/^\/7days\/(\d+)/);
  if (sevenDaysMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/learn/${sevenDaysMatch[1]}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // Enforce 404 for unknown dynamic-route params.
  // This runs BEFORE next-intl rewrites, so paths are clean (no /en/ prefix).
  for (const { re, set } of DYNAMIC_ROUTES) {
    const match = pathname.match(re);
    if (match && !set.has(match[1])) {
      return new NextResponse('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};
