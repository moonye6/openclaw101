import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { SkillsStats } from '@/components/home/SkillsStats';
import { TutorialsSection } from '@/components/home/TutorialsSection';
import { SecurityWarning } from '@/components/home/SecurityWarning';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <SkillsStats />
      <TutorialsSection />
      <SecurityWarning />
    </main>
  );
}
