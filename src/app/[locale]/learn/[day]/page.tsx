import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, Target, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { learningPath } from '@/data/learning-path';
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
  const learningDay = learningPath.find(d => d.day === Number(day));
  if (!learningDay) return {};

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;

  return {
    title: `Day ${learningDay.day}: ${title} — OpenClaw 101`,
    description: isZh ? learningDay.objective : learningDay.objectiveEn,
  };
}

export default async function LearningDayPage({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}) {
  const { locale, day } = await params;
  const learningDay = learningPath.find(d => d.day === Number(day));

  if (!learningDay) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;
  const objective = isZh ? learningDay.objective : learningDay.objectiveEn;
  const content = isZh ? learningDay.content : learningDay.contentEn;
  const exercises = isZh ? learningDay.exercises : learningDay.exercisesEn;
  const nextStep = isZh ? learningDay.nextStep : learningDay.nextStepEn;

  const prevDay = learningDay.day > 1 ? learningPath.find(d => d.day === learningDay.day - 1) : null;
  const nextDay = learningDay.day < 7 ? learningPath.find(d => d.day === learningDay.day + 1) : null;

  return (
    <div className="min-h-screen bg-white">
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

      {/* Content - Simple plain text rendering */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            {content.split('\n\n').map((paragraph, idx) => {
              // Skip empty paragraphs
              if (!paragraph.trim()) return null;
              
              // Headers
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
              }
              
              // Code blocks
              if (paragraph.startsWith('```')) {
                const lines = paragraph.split('\n');
                const lang = lines[0].replace('```', '').trim();
                const code = lines.slice(1, -1).join('\n');
                return (
                  <pre key={idx} className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm">
                    <code>{code}</code>
                  </pre>
                );
              }
              
              // Horizontal rule
              if (paragraph === '---') {
                return <hr key={idx} className="my-8 border-gray-200" />;
              }
              
              // Regular paragraph - handle inline formatting
              return (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, i) => {
                    if (part.startsWith('`') && part.endsWith('`')) {
                      return <code key={i} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
                    }
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>
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
