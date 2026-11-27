import dynamic from 'next/dynamic';
import { JsonLd } from '@/components/seo/JsonLd';
import { findServiceSection } from '@/content/services/registry';
import type { ServicePageContent, ServiceSectionBlock } from '@/content/services/types';
import { faqJsonLd } from '@/lib/seo';
import { serviceBreadcrumbJsonLd, serviceJsonLd } from '@/lib/seo-service';
import { AppWindowHero } from './AppWindowHero';
import { AudienceGrid } from './AudienceGrid';
import { DigitalMarketingSimulatorProvider } from './DigitalMarketingSimulator';
import { ExplodedArchitecture } from './ExplodedArchitecture';
import { FeatureBento } from './FeatureBento';
import { GrowthPath } from './GrowthPath';
import { Packages } from './Packages';
import { PerformanceSecurity } from './PerformanceSecurity';
import { ProblemCards } from './ProblemCards';
import { ProcessTimeline } from './ProcessTimeline';
import { ReportPreview } from './ReportPreview';
import { SearchVisibility } from './SearchVisibility';
import { ServiceCta } from './ServiceCta';
import { ServiceFaq } from './ServiceFaq';
import { ServiceHero } from './ServiceHero';
import { SignalHero } from './SignalHero';
import { SignalPath } from './SignalPath';
import { TerminalCta } from './TerminalCta';
import { TrustMarquee } from './TrustMarquee';
import { TrustNeverAlways } from './TrustNeverAlways';
import { TypeTabs } from './TypeTabs';
import { WorkTeaser } from './WorkTeaser';
import { AuroraBackground } from './motion/AuroraBackground';

/* Dynamic JS bundle code-splitting WITH SSR enabled (no `ssr: false`) so static HTML renders
   full readable text and final layout immediately while hydrating heavy interactive islands separately. */
const BeforeAfterSlider = dynamic(() =>
  import('./BeforeAfterSlider').then((m) => m.BeforeAfterSlider),
);
const ProductSwitcher = dynamic(() => import('./ProductSwitcher').then((m) => m.ProductSwitcher));
const FingerprintScan = dynamic(() => import('./FingerprintScan').then((m) => m.FingerprintScan));
const RoleSwitcher = dynamic(() => import('./RoleSwitcher').then((m) => m.RoleSwitcher));
const ActivityIntegrations = dynamic(() =>
  import('./ActivityIntegrations').then((m) => m.ActivityIntegrations),
);
const SprintBoard = dynamic(() => import('./SprintBoard').then((m) => m.SprintBoard));
const EngineRoom = dynamic(() => import('./EngineRoom').then((m) => m.EngineRoom));
const EngagementModels = dynamic(() =>
  import('./EngagementModels').then((m) => m.EngagementModels),
);
const VisibilityLadder = dynamic(() =>
  import('./VisibilityLadder').then((m) => m.VisibilityLadder),
);
const VisibilityQuiz = dynamic(() => import('./VisibilityQuiz').then((m) => m.VisibilityQuiz));
const TrafficFlow = dynamic(() => import('./TrafficFlow').then((m) => m.TrafficFlow));
const GrowthControlRoom = dynamic(() =>
  import('./GrowthControlRoom').then((m) => m.GrowthControlRoom),
);
const CodeFlip = dynamic(() => import('./CodeFlip').then((m) => m.CodeFlip));
const GrowthSpeedSlider = dynamic(() =>
  import('./GrowthSpeedSlider').then((m) => m.GrowthSpeedSlider),
);

type ServiceTemplateProps = {
  serviceName: string;
  content: ServicePageContent;
  whatsappHref: string | null;
};

function renderSection(
  block: ServiceSectionBlock,
  idx: number,
  slug: string,
  whatsappHref: string | null,
) {
  switch (block.type) {
    case 'serviceHero':
      return <ServiceHero key={`serviceHero-${idx}`} slug={slug} hero={block.data} />;
    case 'trustMarquee':
      return <TrustMarquee key={`trustMarquee-${idx}`} marquee={block.data} />;
    case 'problemCards':
      return <ProblemCards key={`problemCards-${idx}`} problems={block.data} />;
    case 'featureBento':
      return <FeatureBento key={`featureBento-${idx}`} features={block.data} />;
    case 'typeTabs':
      return <TypeTabs key={`typeTabs-${idx}`} slug={slug} typeTabs={block.data} />;
    case 'searchVisibility':
      return <SearchVisibility key={`searchVisibility-${idx}`} searchVisibility={block.data} />;
    case 'audienceGrid':
      return <AudienceGrid key={`audienceGrid-${idx}`} audience={block.data} />;
    case 'processTimeline':
      return <ProcessTimeline key={`processTimeline-${idx}`} process={block.data} />;
    case 'performanceSecurity':
      return <PerformanceSecurity key={`performanceSecurity-${idx}`} benchmarks={block.data} />;
    case 'packages':
      return <Packages key={`packages-${idx}`} slug={slug} packages={block.data} />;
    case 'workTeaser':
      return <WorkTeaser key={`workTeaser-${idx}`} slug={slug} workTeaser={block.data} />;
    case 'serviceFaq':
      return (
        <ServiceFaq
          key={`serviceFaq-${idx}`}
          slug={slug}
          eyebrow={block.data.eyebrow}
          title={block.data.title}
          items={block.data.items}
        />
      );
    case 'serviceCta':
      return (
        <ServiceCta
          key={`serviceCta-${idx}`}
          slug={slug}
          finalCta={block.data}
          whatsappHref={whatsappHref}
        />
      );
    case 'appWindowHero':
      return <AppWindowHero key={`appWindowHero-${idx}`} slug={slug} hero={block.data} />;
    case 'beforeAfterSlider':
      return <BeforeAfterSlider key={`beforeAfterSlider-${idx}`} slug={slug} data={block.data} />;
    case 'productSwitcher':
      return <ProductSwitcher key={`productSwitcher-${idx}`} slug={slug} data={block.data} />;
    case 'explodedArchitecture':
      return <ExplodedArchitecture key={`explodedArchitecture-${idx}`} data={block.data} />;
    case 'fingerprintScan':
      return <FingerprintScan key={`fingerprintScan-${idx}`} data={block.data} />;
    case 'roleSwitcher':
      return <RoleSwitcher key={`roleSwitcher-${idx}`} slug={slug} data={block.data} />;
    case 'activityIntegrations':
      return <ActivityIntegrations key={`activityIntegrations-${idx}`} data={block.data} />;
    case 'sprintBoard':
      return <SprintBoard key={`sprintBoard-${idx}`} data={block.data} />;
    case 'growthPath':
      return <GrowthPath key={`growthPath-${idx}`} data={block.data} />;
    case 'engineRoom':
      return <EngineRoom key={`engineRoom-${idx}`} data={block.data} />;
    case 'engagementModels':
      return <EngagementModels key={`engagementModels-${idx}`} slug={slug} data={block.data} />;
    case 'terminalCta':
      return (
        <TerminalCta
          key={`terminalCta-${idx}`}
          slug={slug}
          data={block.data}
          whatsappHref={whatsappHref}
        />
      );
    case 'signalHero':
      return <SignalHero key={`signalHero-${idx}`} slug={slug} data={block.data} />;
    case 'visibilityLadder':
      return <VisibilityLadder key={`visibilityLadder-${idx}`} slug={slug} data={block.data} />;
    case 'visibilityQuiz':
      return <VisibilityQuiz key={`visibilityQuiz-${idx}`} slug={slug} data={block.data} />;
    case 'trafficFlow':
      return <TrafficFlow key={`trafficFlow-${idx}`} slug={slug} data={block.data} />;
    case 'growthControlRoom':
      return <GrowthControlRoom key={`growthControlRoom-${idx}`} slug={slug} data={block.data} />;
    case 'codeFlip':
      return <CodeFlip key={`codeFlip-${idx}`} slug={slug} data={block.data} />;
    case 'trustNeverAlways':
      return <TrustNeverAlways key={`trustNeverAlways-${idx}`} data={block.data} />;
    case 'reportPreview':
      return <ReportPreview key={`reportPreview-${idx}`} data={block.data} />;
    case 'signalPath':
      return <SignalPath key={`signalPath-${idx}`} data={block.data} />;
    case 'growthSpeedSlider':
      return <GrowthSpeedSlider key={`growthSpeedSlider-${idx}`} slug={slug} data={block.data} />;
  }
}

/**
 * Composable SSG Service Page Template ("Dark Glass Aurora").
 * Renders any ordered `sections[]` array declared in `src/content/services/*.ts`.
 */
export function ServiceTemplate({ serviceName, content, whatsappHref }: ServiceTemplateProps) {
  const faqSection = findServiceSection(content, 'serviceFaq');
  const faqSchemaItems =
    faqSection?.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })) ?? [];

  const structuredData = [
    serviceJsonLd({
      slug: content.slug,
      name: serviceName,
      description: content.seo.description,
    }),
    serviceBreadcrumbJsonLd({ slug: content.slug, name: serviceName }),
    ...(faqSchemaItems.length > 0 ? [faqJsonLd(faqSchemaItems)] : []),
  ];

  return (
    <div data-theme="glass" className="relative min-h-screen overflow-x-clip">
      <AuroraBackground />

      <div className="relative z-10 container-wide flex flex-col gap-16 pb-16 sm:gap-20 sm:pb-24 lg:gap-24">
        <DigitalMarketingSimulatorProvider>
          {content.sections.map((block, idx) =>
            renderSection(block, idx, content.slug, whatsappHref),
          )}
        </DigitalMarketingSimulatorProvider>
      </div>

      <JsonLd data={structuredData} />
    </div>
  );
}
