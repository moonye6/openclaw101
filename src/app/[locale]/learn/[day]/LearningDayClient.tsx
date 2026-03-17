'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, Target, CheckCircle, Lightbulb } from 'lucide-react';
import { learningPath } from '@/data/learning-path';
import { Link } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function LearningDayClient() {
  const params = useParams();
  const locale = params.locale as string;
  const day = Number(params.day);

  const learningDay = learningPath.find(d => d.day === day);

  if (!learningDay) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Day not found</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;
  const objective = isZh ? learningDay.objective : learningDay.objectiveEn;
  const content = isZh ? learningDay.content : learningDay.contentEn;
  const exercises = isZh ? learningDay.exercises : learningDay.exercisesEn;
  const nextStep = isZh ? learningDay.nextStep : learningDay.nextStepEn;

  const prevDay = learningDay.day > 1 ? learningPath.find(d => d.day === learningDay.day - 1) : null;
  const nextDay = learningDay.day < 7 ? learningPath.find(d => d.day === learningDay.day + 1) : null;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: isZh ? '首页' : 'Home', href: '/' },
    { label: isZh ? '学习路径' : 'Learning Path', href: '/#learning-path' },
    { label: `Day ${learningDay.day}: ${title}` },
  ];

  // Simple markdown to HTML conversion
  const markdownToHtml = (text: string) => {
    return text
      // Code blocks (must be first)
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      // Headers
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
      // Lists
      .replace(/^- (.+)$/gm, '<li class="text-gray-700 ml-6 list-disc">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-700 ml-6 list-decimal">$2</li>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">');
  };

  const htmlContent = markdownToHtml(content);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b py-3">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

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
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p class="text-gray-700 leading-relaxed mb-4">${htmlContent}</p>` }}
          />
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
