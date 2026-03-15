import { Metadata } from 'next';
import { SkillBrowser } from '@/components/skills/SkillBrowser';

export const metadata: Metadata = {
  title: 'Skills - OpenClaw 101',
  description: 'Browse 5490+ community skills for OpenClaw AI assistant. Install with one command to extend your AI capabilities.',
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            Community Skills
          </h1>
          <p className="mt-4 text-lg text-purple-100 text-center max-w-2xl mx-auto">
            5490+ skills from awesome-openclaw-skills across 31 categories. Install with one command.
          </p>
          <div className="mt-8 flex justify-center">
            <code className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white font-mono">
              npx clawhub@latest install &lt;skill-name&gt;
            </code>
          </div>
        </div>
      </section>

      {/* Skill Browser */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SkillBrowser />
        </div>
      </section>
    </div>
  );
}
