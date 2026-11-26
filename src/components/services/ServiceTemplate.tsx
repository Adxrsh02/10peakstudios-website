import { JsonLd } from '@/components/seo/JsonLd';
import { findServiceSection } from '@/content/services/registry';
import type { ServicePageContent, ServiceSectionBlock } from '@/content/services/types';
import { faqJsonLd } from '@/lib/seo';
import { serviceBreadcrumbJsonLd, serviceJsonLd } from '@/lib/seo-service';
import { AudienceGrid } from './AudienceGrid';
import { FeatureBento } from './FeatureBento';
import { Packages } from './Packages';
import { PerformanceSecurity } from './PerformanceSecurity';
import { ProblemCards } from './ProblemCards';
import { ProcessTimeline } from './ProcessTimeline';
import { SearchVisibility } from './SearchVisibility';
import { ServiceCta } from './ServiceCta';
import { ServiceFaq } from './ServiceFaq';
import { ServiceHero } from './ServiceHero';
import { TrustMarquee } from './TrustMarquee';
import { TypeTabs } from './TypeTabs';
import { WorkTeaser } from './WorkTeaser';
import { AuroraBackground } from './motion/AuroraBackground';

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
    default:
      return null;
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
        {content.sections.map((block, idx) =>
          renderSection(block, idx, content.slug, whatsappHref),
        )}
      </div>

      <JsonLd data={structuredData} />
    </div>
  );
}
