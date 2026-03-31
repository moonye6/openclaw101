import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'zh'  // 默认中文
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
