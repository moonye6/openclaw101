import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 根路径重定向到 /en
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url, { status: 301 });
  }

  // /zh/* 全部 301 重定向到 /en/*
  if (pathname.startsWith('/zh')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh/, '/en');
    return NextResponse.redirect(url, { status: 301 });
  }

  // /7days/* 301 重定向到 /learn/* (消除重复内容)
  const sevenDaysMatch = pathname.match(/^\/(en|zh)\/7days\/(\d+)/);
  if (sevenDaysMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/learn/${sevenDaysMatch[2]}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|zh)/:path*']
};
