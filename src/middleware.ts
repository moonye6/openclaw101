import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

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

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};
