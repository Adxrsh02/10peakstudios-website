import '@/styles/process-ascent.css';
import type { BreadcrumbList, WithContext } from 'schema-dts';
import { JsonLd } from '@/components/seo/JsonLd';
import type { ResolvedProcessContent } from '@/content/process';
import { site } from '@/content/site';
import { faqJsonLd, webPageJsonLd } from '@/lib/seo';
import { ApprovalGates } from './ApprovalGates';
import { AscentSection } from './AscentSection';
import { MeetingOptions } from './MeetingOptions';
import { ProcessFaq } from './ProcessFaq';
import { ProcessHero } from './ProcessHero';
import { ProcessSummitCta } from './ProcessSummitCta';

type ProcessPageShellProps = {
  content: ResolvedProcessContent;
  whatsappHref: string | null;
};

export function ProcessPageShell({ content, whatsappHref }: ProcessPageShellProps) {
  const breadcrumb: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${site.url}/about` },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.seo.title,
        item: `${site.url}${content.seo.path}`,
      },
    ],
  };

  const faqSchema = faqJsonLd(
    content.faq.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  );

  const webPageSchema = webPageJsonLd({
    path: content.seo.path,
    name: `${content.seo.title} | ${site.name}`,
    description: content.seo.description,
  });

  return (
    <div data-theme="ascent" className="relative min-h-screen">
      <ProcessHero hero={content.hero} />
      <MeetingOptions meeting={content.meeting} />
      <AscentSection ascent={content.ascent} />
      <ApprovalGates gates={content.gates} />
      <ProcessFaq faq={content.faq} />
      <ProcessSummitCta cta={content.cta} whatsappHref={whatsappHref} />
      <JsonLd data={[webPageSchema, breadcrumb, faqSchema]} />
    </div>
  );
}
