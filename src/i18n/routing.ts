import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en'  // 默认英文
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
