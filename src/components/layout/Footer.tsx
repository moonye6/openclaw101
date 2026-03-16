'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, Palette } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');

  const links = [
    { label: t('links.docs'), href: 'https://docs.openclaw.ai', external: true },
    { label: t('links.github'), href: 'https://github.com/openclaw/openclaw', external: true },
    { label: t('links.discord'), href: 'https://discord.com/invite/clawd', external: true },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">OpenClaw 101</h3>
            <p className="text-sm text-gray-400">{t('description')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Stats
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>5490+ Skills</li>
              <li>409+ Tutorials</li>
              <li>31 Categories</li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://oc-role.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Palette className="h-4 w-4 text-purple-400" />
                  OC Compass
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="text-xs text-gray-500 mt-1">
                Free OC Maker & Character Creator
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
