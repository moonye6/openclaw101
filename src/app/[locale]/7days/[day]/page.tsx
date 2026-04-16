import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Target, BookOpen, ExternalLink } from 'lucide-react';
import { sevenDays, getDayContent } from '@/data/seven-days';
import { getTutorialById } from '@/data/tutorials';
import { Link } from '@/i18n/routing';

const SITE_URL = 'https://openclaw101.vip';

export const dynamicParams = false;

export async function generateStaticParams() {
  return sevenDays.map((d) => ({ day: String(d.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}): Promise<Metadata> {
  const { locale, day: dayStr } = await params;
  const dayNum = parseInt(dayStr, 10);
  const dayContent = getDayContent(dayNum);
  if (!dayContent) return {};

  const isZh = locale === 'zh';
  const title = isZh ? dayContent.titleZh : dayContent.titleEn;
  const description = isZh ? dayContent.subtitleZh : dayContent.subtitleEn;

  return {
    title: `Day ${dayNum}: ${title} — ${isZh ? '7天学习路径' : '7-Day Learning Path'}`,
    description,
    openGraph: {
      title: `Day ${dayNum}: ${title}`,
      description,
      url: `${SITE_URL}/7days/${dayNum}`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/learn/${dayNum}`,
      languages: {
        en: `${SITE_URL}/en/7days/${dayNum}`,
        zh: `${SITE_URL}/zh/7days/${dayNum}`,
        'x-default': `${SITE_URL}/en/7days/${dayNum}`,
      },
    },
  };
}

export default async function SevenDaysPage({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}) {
  const { locale, day: dayStr } = await params;
  const dayNum = parseInt(dayStr, 10);
  const dayContent = getDayContent(dayNum);

  if (!dayContent || isNaN(dayNum) || dayNum < 1 || dayNum > 7) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? dayContent.titleZh : dayContent.titleEn;
  const subtitle = isZh ? dayContent.subtitleZh : dayContent.subtitleEn;
  const objectives = isZh ? dayContent.objectivesZh : dayContent.objectivesEn;
  const sections = isZh ? dayContent.sectionsZh : dayContent.sectionsEn;
  const duration = isZh ? dayContent.durationZh : dayContent.duration;
  const deliverable = isZh ? dayContent.deliverableZh : dayContent.deliverableEn;

  const prevDay = dayNum > 1 ? getDayContent(dayNum - 1) : null;
  const nextDay = dayNum < 7 ? getDayContent(dayNum + 1) : null;

  const relatedTutorials = dayContent.relatedTutorialIds
    .map((id) => getTutorialById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`py-16 bg-gradient-to-br ${dayContent.color}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/#learning-path"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回学习路径' : 'Back to Learning Path'}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{dayContent.emoji}</span>
            <span className="text-sm font-bold uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
              Day {dayNum} / 7
            </span>
            <span className="flex items-center gap-1 text-sm text-white/70">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="flex items-center gap-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i + 1 <= dayNum ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-white/60 mt-2">
              {isZh ? `第 ${dayNum} 天，共 7 天` : `Day ${dayNum} of 7`}
            </p>
          </div>
        </div>
      </section>

      {/* Deliverable */}
      <section className="pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 md:p-8">
            <h2 className="text-lg font-bold text-green-800 mb-2">
              🎯 {isZh ? '今日产出' : "Today's Deliverable"}
            </h2>
            <p className="text-green-700 text-base leading-relaxed">{deliverable}</p>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {isZh ? '学习目标' : 'Learning Objectives'}
              </h2>
            </div>
            <ul className="space-y-3">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {sections.map((section, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  {section.title}
                </h3>
              </div>
              <div className="prose prose-gray max-w-none">
                {section.content.split('\n\n').map((paragraph, pi) => {
                  if (paragraph.startsWith('```')) {
                    const lines = paragraph.split('\n');
                    const lang = lines[0].replace('```', '');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                      <pre
                        key={pi}
                        className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm my-4"
                      >
                        {lang && (
                          <span className="text-xs text-gray-400 block mb-2">
                            {lang}
                          </span>
                        )}
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p
                      key={pi}
                      className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(
                            /`([^`]+)`/g,
                            '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>'
                          )
                          .replace(/\n- /g, '<br/>• ')
                          .replace(/\n(\d+)\. /g, '<br/>$1. '),
                      }}
                    />
                  );
                })}
              </div>
              {section.tip && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>💡 {isZh ? '提示' : 'Tip'}:</strong> {section.tip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Tutorials */}
      {relatedTutorials.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {isZh ? '相关教程' : 'Related Tutorials'}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedTutorials.map((tutorial) => (
                <a
                  key={tutorial!.id}
                  href={tutorial!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">
                      {tutorial!.source}
                    </span>
                    <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                      {tutorial!.language === 'en' ? 'EN' : '中文'}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {tutorial!.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            {prevDay ? (
              <Link
                href={`/7days/${prevDay.day}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex-1"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="text-left">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {isZh ? '上一天' : 'Previous'}
                  </span>
                  <p className="font-semibold text-gray-900 text-sm">
                    Day {prevDay.day}: {isZh ? prevDay.titleZh : prevDay.titleEn}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextDay ? (
              <Link
                href={`/7days/${nextDay.day}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex-1"
              >
                <div className="text-right flex-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {isZh ? '下一天' : 'Next'}
                  </span>
                  <p className="font-semibold text-gray-900 text-sm">
                    Day {nextDay.day}: {isZh ? nextDay.titleZh : nextDay.titleEn}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </Link>
            ) : (
              <Link
                href="/tutorials"
                className="flex items-center gap-3 p-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all flex-1"
              >
                <div className="text-right flex-1">
                  <span className="text-xs text-white/70 uppercase tracking-wider">
                    {isZh ? '完成！' : 'Complete!'}
                  </span>
                  <p className="font-semibold text-white text-sm">
                    {isZh ? '浏览所有教程' : 'Browse All Tutorials'}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
