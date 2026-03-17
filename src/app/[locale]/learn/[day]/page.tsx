import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';

// Static data
const days = [
  { day: 1, title: "认识 OpenClaw", titleEn: "Meet OpenClaw", emoji: "👋", color: "from-blue-500 to-blue-600" },
  { day: 2, title: "深度对话", titleEn: "Deep Conversation", emoji: "💬", color: "from-violet-500 to-violet-600" },
  { day: 3, title: "文件与代码", titleEn: "Files & Code", emoji: "📁", color: "from-emerald-500 to-emerald-600" },
  { day: 4, title: "网络能力", titleEn: "Web Capabilities", emoji: "🌐", color: "from-orange-500 to-orange-600" },
  { day: 5, title: "技能扩展", titleEn: "Skill Extensions", emoji: "🔧", color: "from-pink-500 to-pink-600" },
  { day: 6, title: "自动化", titleEn: "Automation", emoji: "⏰", color: "from-cyan-500 to-cyan-600" },
  { day: 7, title: "进阶技术", titleEn: "Advanced Techniques", emoji: "🚀", color: "from-indigo-500 to-indigo-600" },
];

// Pre-generate static params
export const dynamicParams = true;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return days.map((d) => ({ day: String(d.day) }));
}

type PageProps = {
  params: { locale: string; day: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const dayNum = parseInt(params.day, 10);
  const d = days.find(x => x.day === dayNum);
  if (!d) return { title: 'Not Found' };
  const title = params.locale === 'zh' ? d.title : d.titleEn;
  return { title: `Day ${d.day}: ${title} — OpenClaw 101` };
}

function DayPage({ params }: PageProps) {
  const dayNum = parseInt(params.day, 10);
  const d = days.find(x => x.day === dayNum);
  
  if (!d) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">页面未找到</h1>
          <Link href="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const isZh = params.locale === 'zh';
  const title = isZh ? d.title : d.titleEn;
  const prevDay = d.day > 1 ? days.find(x => x.day === d.day - 1) : null;
  const nextDay = d.day < 7 ? days.find(x => x.day === d.day + 1) : null;

  return (
    <div className="min-h-screen bg-white">
      <section className={`py-12 bg-gradient-to-br ${d.color}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回首页' : 'Back to Home'}
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              {d.emoji}
            </div>
            <div>
              <span className="text-sm font-medium text-white/90 bg-white/10 px-3 py-0.5 rounded-full">
                {isZh ? `第 ${d.day} 天` : `Day ${d.day}`}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-gray-700">
            {isZh ? '此页面内容正在建设中...' : 'Content under construction...'}
          </p>
        </div>
      </section>

      <section className="py-8 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center">
            {prevDay && (
              <Link href={`/learn/${prevDay.day}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Day {prevDay.day}: {isZh ? prevDay.title : prevDay.titleEn}
              </Link>
            )}
            {nextDay ? (
              <Link href={`/learn/${nextDay.day}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                Day {nextDay.day}: {isZh ? nextDay.title : nextDay.titleEn}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link href="/tutorials" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <BookOpen className="w-4 h-4" />
                {isZh ? '浏览更多教程' : 'Browse More Tutorials'}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DayPage;
