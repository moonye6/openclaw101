import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// 自定义 middleware，根据浏览器语言自动选择
const intlMiddleware = createMiddleware({
  ...routing,
  // localeDetection: true 会根据 Accept-Language 头检测
  localeDetection: true,
});

export default intlMiddleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh)/:path*']
};
