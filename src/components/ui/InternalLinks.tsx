'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BookOpen, Lightbulb, Wrench, GraduationCap, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InternalLinksProps {
  /** Which page is currently active (will be excluded from the links) */
  current?: 'guide' | 'use-cases' | 'examples' | 'skills' | 'tutorials';
  className?: string;
}

const hubLinks = [
  { key: 'guide', href: '/guide', icon: BookOpen, color: 'text-brand-light', bg: 'bg-brand/10 border-brand/20' },
  { key: 'use-cases', href: '/use-cases', icon: Lightbulb, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  { key: 'examples', href: '/examples', icon: Flame, color: 'text-error', bg: 'bg-error/10 border-error/20' },
  { key: 'skills', href: '/skills', icon: Wrench, color: 'text-accent', bg: 'bg-accent/10 border-accent/20' },
  { key: 'tutorials', href: '/tutorials', icon: GraduationCap, color: 'text-success', bg: 'bg-success/10 border-success/20' },
] as const;

const labelKeys: Record<string, { titleKey: string; descKey: string }> = {
  guide: { titleKey: 'guideTitle', descKey: 'guideDesc' },
  'use-cases': { titleKey: 'useCasesTitle', descKey: 'useCasesDesc' },
  examples: { titleKey: 'examplesTitle', descKey: 'examplesDesc' },
  skills: { titleKey: 'skillsTitle', descKey: 'skillsDesc' },
  tutorials: { titleKey: 'tutorialsTitle', descKey: 'tutorialsDesc' },
};

export function InternalLinks({ current, className }: InternalLinksProps) {
  const t = useTranslations('internalLinks');
  const visibleLinks = hubLinks.filter((link) => link.key !== current);

  return (
    <section className={cn('py-16', className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white text-center mb-3">
          {t('title')}
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-xl mx-auto">
          {t('subtitle')}
        </p>

        <div className={cn(
          'grid gap-4',
          visibleLinks.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
        )}>
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const labels = labelKeys[link.key];
            return (
              <Link
                key={link.key}
                href={link.href as Parameters<typeof Link>[0]['href']}
                className="group flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-surface p-5 transition-all duration-200 hover:border-brand/30 hover:bg-brand/5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg border', link.bg)}>
                    <Icon className={cn('h-4 w-4', link.color)} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{t(labels.titleKey)}</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{t(labels.descKey)}</p>
                <div className="flex items-center gap-1 text-xs text-brand-light font-medium mt-auto">
                  <span>{t('explore')}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
