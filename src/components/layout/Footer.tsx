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
      className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Open source banner */}
        <div className="mb-10 p-6 rounded-xl bg-gray-800/50 border border-gray-700 text-center">
          <p className="text-sm text-gray-300">
            {t('openSourceBanner')}
          </p>
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Github className="h-4 w-4" />
            {t('contribute')}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-2">OpenClaw 101</h3>
            <p className="text-sm text-gray-400">{t('description')}</p>
          </div>

          {/* Official */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('sections.official')}
            </h4>
            <ul className="space-y-2">
              <li><ExtLink href="https://openclaw.ai" follow>OpenClaw Website</ExtLink></li>
              <li><ExtLink href="https://docs.openclaw.ai" follow>{t('links.docs')}</ExtLink></li>
              <li><ExtLink href="https://github.com/openclaw/openclaw" follow>{t('links.github')} (314k+ ⭐)</ExtLink></li>
              <li><ExtLink href="https://clawhub.com" follow>ClawHub Skills</ExtLink></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('sections.learn')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tutorials" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('links.allResources')}
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('links.featuredSkills')}
                </Link>
              </li>
              <li><ExtLink href="https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf">{t('links.feishuWiki')}</ExtLink></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('sections.community')}
            </h4>
            <ul className="space-y-2">
              <li><ExtLink href="https://discord.com/invite/clawd">Discord</ExtLink></li>
              <li><ExtLink href="https://reddit.com/r/openclaw">Reddit</ExtLink></li>
              <li><ExtLink href="https://oc-role.com">OC Compass</ExtLink></li>
            </ul>
          </div>

          {/* Cloud Platforms */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('sections.cloudPlatforms')}
            </h4>
            <ul className="space-y-2">
              <li><ExtLink href="https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw">{t('links.alibabaCloud')}</ExtLink></li>
              <li><ExtLink href="https://cloud.tencent.com/developer/article/2625073">{t('links.tencentCloud')}</ExtLink></li>
              <li><ExtLink href="https://www.digitalocean.com/community/tutorials/how-to-run-openclaw">DigitalOcean</ExtLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
