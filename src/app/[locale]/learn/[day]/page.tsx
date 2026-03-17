import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';

// Simple static data for each day
const learningDaysData = [
  { 
    day: 1, 
    title: "认识 OpenClaw", 
    titleEn: "Meet OpenClaw", 
    emoji: "👋", 
    color: "from-blue-500 to-blue-600",
    objective: "安装 OpenClaw，连接第一个平台，与 AI 助手进行第一次对话。",
    objectiveEn: "Install OpenClaw, connect your first platform, and have your first conversation with the AI assistant."
  },
  { 
    day: 2, 
    title: "深度对话", 
    titleEn: "Deep Conversation", 
    emoji: "💬", 
    color: "from-violet-500 to-violet-600",
    objective: "掌握对话技巧：上下文管理、多轮对话、人设定制。",
    objectiveEn: "Master conversation skills: context management, multi-turn dialogue, persona customization."
  },
  { 
    day: 3, 
    title: "文件与代码", 
    titleEn: "Files & Code", 
    emoji: "📁", 
    color: "from-emerald-500 to-emerald-600",
    objective: "让 AI 处理文件：读取文档、编写代码、运行脚本。",
    objectiveEn: "Let AI handle files: read documents, write code, run scripts."
  },
  { 
    day: 4, 
    title: "网络能力", 
    titleEn: "Web Capabilities", 
    emoji: "🌐", 
    color: "from-orange-500 to-orange-600",
    objective: "解锁网络能力：搜索互联网、抓取网页、调用 API。",
    objectiveEn: "Unlock web capabilities: search the internet, scrape webpages, call APIs."
  },
  { 
    day: 5, 
    title: "技能扩展", 
    titleEn: "Skill Extensions", 
    emoji: "🔧", 
    color: "from-pink-500 to-pink-600",
    objective: "从 ClawHub 安装社区技能扩展能力。",
    objectiveEn: "Install community skills from ClawHub to extend capabilities."
  },
  { 
    day: 6, 
    title: "自动化", 
    titleEn: "Automation", 
    emoji: "⏰", 
    color: "from-cyan-500 to-cyan-600",
    objective: "设置定时任务、心跳检查、主动提醒。",
    objectiveEn: "Set up scheduled tasks, heartbeat checks, and proactive reminders."
  },
  { 
    day: 7, 
    title: "进阶技术", 
    titleEn: "Advanced Techniques", 
    emoji: "🚀", 
    color: "from-indigo-500 to-indigo-600",
    objective: "掌握多智能体协作、浏览器控制、自定义技能开发。",
    objectiveEn: "Master multi-agent collaboration, browser control, and custom skill development."
  },
];

export async function generateStaticParams() {
  // Return array of { day: "1" }, { day: "2" }, etc.
  return [1, 2, 3, 4, 5, 6, 7].map((d) => ({ day: String(d) }));
}

type Props = {
  params: Promise<{ locale: string; day: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, day } = await params;
  const dayNum = parseInt(day, 10);
  const learningDay = learningDaysData.find(d => d.day === dayNum);
  
  if (!learningDay) return {};

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;

  return {
    title: `Day ${learningDay.day}: ${title} — OpenClaw 101`,
  };
}

export default async function LearningDayPage({ params }: Props) {
  const { locale, day } = await params;
  const dayNum = parseInt(day, 10);
  const learningDay = learningDaysData.find(d => d.day === dayNum);

  if (!learningDay) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;
  const objective = isZh ? learningDay.objective : learningDay.objectiveEn;

  const prevDay = learningDay.day > 1 ? learningDaysData.find(d => d.day === learningDay.day - 1) : null;
  const nextDay = learningDay.day < 7 ? learningDaysData.find(d => d.day === learningDay.day + 1) : null;

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
            <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">🎯</div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">
                {isZh ? '学习目标' : 'Learning Objective'}
              </h2>
              <p className="text-gray-900">{objective}</p>
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
