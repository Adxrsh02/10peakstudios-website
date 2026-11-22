import { AboutHero } from '@/components/about/AboutHero';
import { AboutUnifiedSection } from '@/components/sections/AboutUnifiedSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('About', '/about');

/** About page (PRD 8.4). Hero, About Unified Section, and Team Section implemented. */
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutUnifiedSection />
      <TeamSection />
    </main>
  );
}
