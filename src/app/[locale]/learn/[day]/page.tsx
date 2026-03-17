import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';

// Simple static data
const learningDays = [
  { day: 1, title: "认识 OpenClaw", titleEn: "Meet OpenClaw", emoji: "👋", color: "from-blue-500 to-blue-600" },
  { day: 2, title: "深度对话", titleEn: "Deep Conversation", emoji: "💬", color: "from-violet-500 to-violet-600" },
  { day: 3, title: "文件与代码", titleEn: "Files & Code", emoji: "📁", color: "from-emerald-500 to-emerald-600" },
  { day: 4, title: "网络能力", titleEn: "Web Capabilities", emoji: "🌐", color: "from-orange-500 to-orange-600" },
  { day: 5, title: "技能扩展", titleEn: "Skill Extensions", emoji: "🔧", color: "from-pink-500 to-pink-600" },
  { day: 6, title: "自动化", titleEn: "Automation", emoji: "⏰", color: "from-cyan-500 to-cyan-600" },
  { day: 7, title: "进阶技术", titleEn: "Advanced Techniques", emoji: "🚀", color: "from-indigo-500 to-indigo-600" },
];

export async function generateStaticParams() {
  return learningDays.map((day) => ({ day: String(day.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}): Promise<Metadata> {
  const { locale, day } = await params;
  const learningDay = learningDays.find(d => d.day === Number(day));
  if (!learningDay) return {};

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;

  return {
    title: `Day ${learningDay.day}: ${title} — OpenClaw 101`,
  };
}

export default async function LearningDayPage({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}) {
  const { locale, day } = await params;
  const learningDay = learningDays.find(d => d.day === Number(day));

  if (!learningDay) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;

  const prevDay = learningDay.day > 1 ? learningDays.find(d => d.day === learningDay.day - 1) : null;
  const nextDay = learningDay.day < 7 ? learningDays.find(d => d.day === learningDay.day + 1) : null;

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

      {/* Content placeholder */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {isZh 
                ? '此页面内容正在建设中，请稍后再访问。' 
                : 'This page content is under construction. Please check back later.'}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isZh
                ? '您可以在首页查看完整的学习路径概览，或浏览我们的教程资源。'
                : 'You can view the learning path overview on the homepage, or browse our tutorial resources.'}
            </p>
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
