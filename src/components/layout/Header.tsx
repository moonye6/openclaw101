'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Globe, Star } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui';

export function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/skills', label: t('skills') },
    { href: '/tutorials', label: t('tutorials') },
    { href: '/blog', label: t('blog') },
  ];

  const toggleLanguage = () => {
    const currentLocale = pathname.split('/')[1] || 'en';
    const newLocale = currentLocale === 'en' ? 'zh' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OpenClaw 101
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Star className="h-4 w-4" />
              GitHub
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex"
            >
              <Globe className="h-4 w-4 mr-1" />
              {pathname.split('/')[1] === 'zh' ? 'EN' : '中文'}
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://github.com/openclaw/openclaw"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                GitHub (314k+ ⭐)
              </a>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-left flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {pathname.split('/')[1] === 'zh' ? 'Switch to English' : '切换到中文'}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
