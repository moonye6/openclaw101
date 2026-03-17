import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { ArrowLeft, CheckCircle, Clock, Target, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { getLearningDay, learningPath } from '@/data/learning-path';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/routing';

const SITE_URL = 'https://openclaw101.vip';

export async function generateStaticParams() {
  return learningPath.map((day) => ({ day: String(day.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}): Promise<Metadata> {
  const { locale, day } = await params;
  const learningDay = getLearningDay(Number(day));
  if (!learningDay) return {};

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;

  return {
    title: `Day ${learningDay.day}: ${title} — OpenClaw 101`,
    description: isZh ? learningDay.objective : learningDay.objectiveEn,
    openGraph: {
      title: `Day ${learningDay.day}: ${title}`,
      description: isZh ? learningDay.objective : learningDay.objectiveEn,
      url: `${SITE_URL}/${locale}/learn/${day}`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/learn/${day}`,
      languages: {
        en: `${SITE_URL}/en/learn/${day}`,
        zh: `${SITE_URL}/zh/learn/${day}`,
      },
    },
  };
}

export default async function LearningDayPage({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}) {
  const { locale, day } = await params;
  const learningDay = getLearningDay(Number(day));

  if (!learningDay) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;
  const objective = isZh ? learningDay.objective : learningDay.objectiveEn;
  const content = isZh ? learningDay.content : learningDay.contentEn;
  const exercises = isZh ? learningDay.exercises : learningDay.exercisesEn;
  const nextStep = isZh ? learningDay.nextStep : learningDay.nextStepEn;

  const prevDay = learningDay.day > 1 ? getLearningDay(learningDay.day - 1) : null;
  const nextDay = learningDay.day < 7 ? getLearningDay(learningDay.day + 1) : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '7天学习路径' : '7-Day Learning Path',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Day ${learningDay.day}: ${title}`,
        item: `${SITE_URL}/${locale}/learn/${day}`,
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Day ${learningDay.day}: ${title}`,
    description: objective,
    author: {
      '@type': 'Organization',
      name: 'OpenClaw 101',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenClaw 101',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'OpenClaw',
      applicationCategory: 'AI Assistant',
    },
    inLanguage: isZh ? 'zh-CN' : 'en',
    position: learningDay.day,
  };

  // Simple markdown-like content rendering
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm">
              <code>{codeContent}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += (codeContent ? '\n' : '') + line;
        return;
      }

      // Headers
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} className="text-gray-700 ml-6 list-disc">
            {renderInline(line.slice(2))}
          </li>
        );
        return;
      }

      // Numbered lists
      const numMatch = line.match(/^(\d+)\.\s/);
      if (numMatch) {
        elements.push(
          <li key={index} className="text-gray-700 ml-6 list-decimal">
            {renderInline(line.slice(numMatch[0].length))}
          </li>
        );
        return;
      }

      // Table (simple)
      if (line.startsWith('|')) {
        if (line.includes('---')) return; // Skip separator
        const cells = line.split('|').filter(c => c.trim());
        if (elements[elements.length - 1]?.type === 'tr') {
          // Continue table
        } else {
          elements.push(
            <div key={index} className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                  <tr>
                    {cells.map((cell, i) => (
                      <td key={i} className="px-4 py-2 text-sm text-gray-700 border">{renderInline(cell.trim())}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
        return;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={index} className="my-8 border-gray-200" />);
        return;
      }

      // Empty lines
      if (!line.trim()) {
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    });

    return elements;
  };

  // Inline formatting
  const renderInline = (text: string): (string | React.JSX.Element)[] => {
    const parts: (string | React.JSX.Element)[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      if (boldMatch) {
        const before = remaining.slice(0, boldMatch.index);
        if (before) parts.push(before);
        parts.push(
          <strong key={key++} className="font-semibold text-gray-900">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice((boldMatch.index || 0) + boldMatch[0].length);
        continue;
      }

      // Inline code
      const codeMatch = remaining.match(/`([^`]+)`/);
      if (codeMatch) {
        const before = remaining.slice(0, codeMatch.index);
        if (before) parts.push(before);
        parts.push(
          <code key={key++} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice((codeMatch.index || 0) + codeMatch[0].length);
        continue;
      }

      // No more matches
      parts.push(remaining);
      break;
    }

    return parts;
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <section className={`py-12 bg-gradient-to-br ${learningDay.color}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回首页' : 'Back to Home'}
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              {learningDay.emoji}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-white/90 bg-white/10 px-3 py-0.5 rounded-full">
                  {isZh ? `第 ${learningDay.day} 天` : `Day ${learningDay.day}`}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Objective */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                {isZh ? '学习目标' : 'Learning Objective'}
              </h2>
              <p className="text-gray-900">{objective}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-gray max-w-none">
            {renderContent(content)}
          </article>
        </div>
      </section>

      {/* Exercises */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isZh ? '实践练习' : 'Practice Exercises'}
            </h2>
          </div>
          <ul className="space-y-3">
            {exercises.map((exercise, index) => (
              <li key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{exercise}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next Step */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-600 mb-1">
                {isZh ? '下一步' : 'Next Step'}
              </h3>
              <p className="text-gray-700">{nextStep}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center">
            {prevDay ? (
              <Link
                href={`/learn/${prevDay.day}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Day {prevDay.day}: {isZh ? prevDay.title : prevDay.titleEn}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextDay ? (
              <Link
                href={`/learn/${nextDay.day}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>Day {nextDay.day}: {isZh ? nextDay.title : nextDay.titleEn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/tutorials"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>{isZh ? '浏览更多教程' : 'Browse More Tutorials'}</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
