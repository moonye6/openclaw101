'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

// Static data
const days = [
  { day: 1, title: "认识 OpenClaw", titleEn: "Meet OpenClaw", emoji: "👋", color: "from-blue-500 to-blue-600", objective: "安装 OpenClaw，连接第一个平台，与 AI 助手进行第一次对话。", objectiveEn: "Install OpenClaw, connect your first platform, and have your first conversation with the AI assistant." },
  { day: 2, title: "深度对话", titleEn: "Deep Conversation", emoji: "💬", color: "from-violet-500 to-violet-600", objective: "掌握对话技巧：上下文管理、多轮对话、人设定制。", objectiveEn: "Master conversation skills: context management, multi-turn dialogue, persona customization." },
  { day: 3, title: "文件与代码", titleEn: "Files & Code", emoji: "📁", color: "from-emerald-500 to-emerald-600", objective: "让 AI 处理文件：读取文档、编写代码、运行脚本。", objectiveEn: "Let AI handle files: read documents, write code, run scripts." },
  { day: 4, title: "网络能力", titleEn: "Web Capabilities", emoji: "🌐", color: "from-orange-500 to-orange-600", objective: "解锁网络能力：搜索互联网、抓取网页、调用 API。", objectiveEn: "Unlock web capabilities: search the internet, scrape webpages, call APIs." },
  { day: 5, title: "技能扩展", titleEn: "Skill Extensions", emoji: "🔧", color: "from-pink-500 to-pink-600", objective: "从 ClawHub 安装社区技能扩展能力。", objectiveEn: "Install community skills from ClawHub to extend capabilities." },
  { day: 6, title: "自动化", titleEn: "Automation", emoji: "⏰", color: "from-cyan-500 to-cyan-600", objective: "设置定时任务、心跳检查、主动提醒。", objectiveEn: "Set up scheduled tasks, heartbeat checks, and proactive reminders." },
  { day: 7, title: "进阶技术", titleEn: "Advanced Techniques", emoji: "🚀", color: "from-indigo-500 to-indigo-600", objective: "掌握多智能体协作、浏览器控制、自定义技能开发。", objectiveEn: "Master multi-agent collaboration, browser control, and custom skill development." },
];

export default function LearningDayPage() {
  const params = useParams();
  const locale = params.locale as string || 'zh';
  const dayParam = params.day as string;
  const dayNum = parseInt(dayParam, 10);
  const d = days.find(x => x.day === dayNum);
  
  if (!d) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">页面未找到</h1>
          <Link href={`/${locale}`} className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const isZh = locale === 'zh';
  const title = isZh ? d.title : d.titleEn;
  const objective = isZh ? d.objective : d.objectiveEn;
  const prevDay = d.day > 1 ? days.find(x => x.day === d.day - 1) : null;
  const nextDay = d.day < 7 ? days.find(x => x.day === d.day + 1) : null;

  return (
    <div className="min-h-screen bg-white">
      <section className={`py-12 bg-gradient-to-br ${d.color}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href={`/${locale}`} className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6">
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

      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-1">{isZh ? '学习目标' : 'Learning Objective'}</h2>
              <p className="text-gray-900">{objective}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {isZh ? '此页面完整内容正在建设中，敬请期待...' : 'Full content coming soon...'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center">
            {prevDay && (
              <Link href={`/${locale}/learn/${prevDay.day}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Day {prevDay.day}: {isZh ? prevDay.title : prevDay.titleEn}
              </Link>
            )}
            {!prevDay && <div />}
            {nextDay ? (
              <Link href={`/${locale}/learn/${nextDay.day}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                Day {nextDay.day}: {isZh ? nextDay.title : nextDay.titleEn}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link href={`/${locale}/tutorials`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
