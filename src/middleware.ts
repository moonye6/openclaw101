import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// 智能 locale 检测 middleware
const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: true,
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 如果是根路径，检测浏览器语言
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    
    // 检测是否偏好中文
    const prefersZh = acceptLanguage.includes('zh') || 
                       acceptLanguage.includes('zh-CN') ||
                       acceptLanguage.includes('zh-TW');
    
    if (prefersZh) {
      // 重定向到中文页面
      const url = request.nextUrl.clone();
      url.pathname = '/zh';
      return NextResponse.redirect(url);
    } else {
      // 其他情况重定向到英文页面
      const url = request.nextUrl.clone();
      url.pathname = '/en';
      return NextResponse.redirect(url);
    }
  }
  
  // 其他路径使用默认的 next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh)/:path*']
};
