import { JsonLd } from '@/components/seo/JsonLd';
import type { ServicePageContent } from '@/content/services/types';
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

/**
 * Reusable SSG Service Page Template ("Dark Glass Aurora").
 * Adding a new service page requires only registering a typed content object under
 * `src/content/services/`, with zero duplicate JSX or section markup.
 */
export function ServiceTemplate({ serviceName, content, whatsappHref }: ServiceTemplateProps) {
  const faqSchemaItems = content.faq.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

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
        <ServiceHero slug={content.slug} hero={content.hero} />
        <TrustMarquee marquee={content.marquee} />
        <ProblemCards problems={content.problems} />
        <FeatureBento features={content.features} />
        <TypeTabs slug={content.slug} typeTabs={content.typeTabs} />
        <SearchVisibility searchVisibility={content.searchVisibility} />
        <AudienceGrid audience={content.audience} />
        <ProcessTimeline process={content.process} />
        <PerformanceSecurity benchmarks={content.benchmarks} />
        <Packages slug={content.slug} packages={content.packages} />
        <WorkTeaser slug={content.slug} workTeaser={content.workTeaser} />
        <ServiceFaq
          slug={content.slug}
          eyebrow={content.faq.eyebrow}
          title={content.faq.title}
          items={content.faq.items}
        />
        <ServiceCta slug={content.slug} finalCta={content.finalCta} whatsappHref={whatsappHref} />
      </div>

      <JsonLd data={structuredData} />
    </div>
  );
}
