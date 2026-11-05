import { AudienceGrid } from '@/components/sections/AudienceGrid';
import { CalloutSection } from '@/components/sections/CalloutSection';
import { Differentiators } from '@/components/sections/Differentiators';
import { FaqSection } from '@/components/sections/FaqSection';
import { FeatureTrio } from '@/components/sections/FeatureTrio';
import { Hero } from '@/components/sections/Hero';
import { PillarBento } from '@/components/sections/PillarBento';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { SplitFeature } from '@/components/sections/SplitFeature';
import { StatementBlock } from '@/components/sections/StatementBlock';
import { UseCaseShowcase } from '@/components/sections/UseCaseShowcase';
import { BuildVisual } from '@/components/sections/visuals/BuildVisual';
import { JsonLd } from '@/components/seo/JsonLd';
import { HeroVisual } from '@/components/three/HeroVisual';
import { homeFaqs } from '@/content/faqs';
import { home } from '@/content/home';
import { servicesByPillar } from '@/content/services';
import { faqJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: '/',
  absoluteTitle: true,
});

/**
 * Home (PRD 8.1). Section order and surfaces: White, White, Paper, White, Obsidian, White, Paper,
 * White, Paper, White, Paper, then the Obsidian CTA band + footer from the layout (2 Obsidian total).
 * Every section is a generic component fed by src/content/home.ts.
 */
export default function HomePage() {
  return (
    <>
      <Hero {...home.hero} visual={<HeroVisual />} />
      <StatementBlock {...home.philosophy} />
      <PillarBento {...home.pillars} />
      <SplitFeature
        id="build"
        eyebrow={home.build.eyebrow}
        titleLead={home.build.titleLead}
        titleAccent={home.build.titleAccent}
        lead={home.build.lead}
        items={home.build.capabilities}
        cta={home.build.cta}
        visual={<BuildVisual />}
      />
      <div className="bg-background px-2 sm:px-4">
        <UseCaseShowcase id="automate" {...home.automate} />
      </div>
      <FeatureTrio id="grow" {...home.grow} services={servicesByPillar('grow')} />
      <ProcessSteps id="process" {...home.process} />
      <AudienceGrid id="audience" {...home.audience} />
      <Differentiators id="why" {...home.why} />
      <CalloutSection {...home.security} />
      <FaqSection id="faq" {...home.faq} faqs={homeFaqs} />

      <JsonLd
        data={[
          webPageJsonLd({ path: '/', name: home.meta.title, description: home.meta.description }),
          faqJsonLd(homeFaqs),
        ]}
      />
    </>
  );
}
