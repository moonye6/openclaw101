import { Metadata } from 'next';
import LearningDayClient from './LearningDayClient';

// Static data
const days = [
  { day: 1, title: "认识 OpenClaw", titleEn: "Meet OpenClaw" },
  { day: 2, title: "深度对话", titleEn: "Deep Conversation" },
  { day: 3, title: "文件与代码", titleEn: "Files & Code" },
  { day: 4, title: "网络能力", titleEn: "Web Capabilities" },
  { day: 5, title: "技能扩展", titleEn: "Skill Extensions" },
  { day: 6, title: "自动化", titleEn: "Automation" },
  { day: 7, title: "进阶技术", titleEn: "Advanced Techniques" },
];

type Props = {
  params: Promise<{ locale: string; day: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, day } = await params;
  const dayNum = parseInt(day, 10);
  const d = days.find(x => x.day === dayNum);
  if (!d) return { title: 'Not Found' };
  const title = locale === 'zh' ? d.title : d.titleEn;
  return { title: `Day ${d.day}: ${title} — OpenClaw 101` };
}

export default function LearningDayPage({ params }: Props) {
  return <LearningDayClient />;
}
