import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,  // 关闭浏览器语言检测，始终使用默认语言（英文）
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 根路径直接重定向到英文
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url, { status: 301 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|zh)/:path*']
};
