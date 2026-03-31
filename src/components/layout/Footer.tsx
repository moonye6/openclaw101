'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/routing';

function ExtLink({ href, children, follow }: { href: string; children: React.ReactNode; follow?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel={follow ? 'noopener noreferrer' : 'noopener noreferrer nofollow'}
      className="text-sm text-text-muted hover:text-white transition-colors inline-flex items-center gap-1"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#070a12] text-text-secondary border-t border-white/[0.06]">
      <div className="container mx-auto px-4 py-16">
        {/* Open source banner */}
        <div className="mb-12 p-6 rounded-xl bg-surface border border-white/[0.06] text-center">
          <p className="text-sm text-text-secondary">
            {t('openSourceBanner')}
          </p>
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:text-brand transition-colors"
          >
            <Github className="h-4 w-4" />
            {t('contribute')}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-gradient-brand mb-3">OpenClaw 101</h3>
            <p className="text-sm text-text-muted leading-relaxed">{t('description')}</p>
          </div>

          {/* Official */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
              {t('sections.official')}
            </h4>
            <ul className="space-y-3">
              <li><ExtLink href="https://openclaw.ai" follow>{t('links.openclawWebsite')}</ExtLink></li>
              <li><ExtLink href="https://docs.openclaw.ai" follow>{t('links.docs')}</ExtLink></li>
              <li><ExtLink href="https://github.com/openclaw/openclaw" follow>{t('links.githubStars', { stars: '314k' })}</ExtLink></li>
              <li><ExtLink href="https://clawhub.com" follow>{t('links.clawhubSkills')}</ExtLink></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
              {t('sections.learn')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tutorials" className="text-sm text-text-muted hover:text-white transition-colors">
                  {t('links.allResources')}
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-sm text-text-muted hover:text-white transition-colors">
                  {t('links.featuredSkills')}
                </Link>
              </li>
              <li><ExtLink href="https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf">{t('links.feishuWiki')}</ExtLink></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
              {t('sections.community')}
            </h4>
            <ul className="space-y-3">
              <li><ExtLink href="https://discord.com/invite/clawd">{t('links.discord')}</ExtLink></li>
              <li><ExtLink href="https://reddit.com/r/openclaw">{t('links.reddit')}</ExtLink></li>
              <li><ExtLink href="https://oc-role.com">{t('links.ocCompass')}</ExtLink></li>
            </ul>
          </div>

          {/* Cloud Platforms */}
          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
              {t('sections.cloudPlatforms')}
            </h4>
            <ul className="space-y-3">
              <li><ExtLink href="https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw">{t('links.alibabaCloud')}</ExtLink></li>
              <li><ExtLink href="https://cloud.tencent.com/developer/article/2625073">{t('links.tencentCloud')}</ExtLink></li>
              <li><ExtLink href="https://www.digitalocean.com/community/tutorials/how-to-run-openclaw">{t('links.digitalocean')}</ExtLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] text-center text-sm text-text-muted">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
