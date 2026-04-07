'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Star } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';

export function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/skills', label: t('skills') },
    { href: '/tutorials', label: t('tutorials') },
    { href: '/blog', label: t('blog') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient-brand">
              OpenClaw 101
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/moonye6/openclaw101"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              <Star className="h-4 w-4" />
              <span>314k</span>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/[0.06]">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="https://github.com/moonye6/openclaw101"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-all"
              >
                <Star className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
