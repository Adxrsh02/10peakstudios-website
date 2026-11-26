import { AboutHero } from '@/components/about/AboutHero';
import { AboutUnifiedSection } from '@/components/sections/AboutUnifiedSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us: Story, Mission & Team',
  description:
    'Learn who 10PeakStudio is: our mission, engineering philosophy, and the team building web platforms, custom software, and AI automation.',
  path: '/about',
});

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
