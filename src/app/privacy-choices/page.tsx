import { LegalHero } from '@/components/legal/LegalHero';
import { PrivacyChoicesPanel } from '@/components/legal/PrivacyChoicesPanel';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/primitives';
import { env } from '@/lib/env';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';
import { legalBreadcrumbJsonLd } from '@/lib/seo-legal';

export const metadata = pageMetadata({
  title: 'Privacy Choices & Cookie Preferences',
  description:
    'Manage your cookie, analytics, and session insight preferences on 10PeakStudio, check Global Privacy Control status, and submit personal data requests.',
  path: '/privacy-choices',
  noindex: true,
});

export default function PrivacyChoicesPage() {
  return (
    <>
      <LegalHero
        titleLead="Privacy"
        titleAccent="Choices."
        summary="Control optional analytics tools on 10PeakStudio, verify Global Privacy Control support, or send a personal data request directly to our privacy desk."
        breadcrumbLabel="Privacy Choices"
      />
      <Section surface="white" aria-label="Cookie and data request preferences">
        <PrivacyChoicesPanel ga4Id={env.NEXT_PUBLIC_GA4_ID} />
      </Section>
      <JsonLd
        data={[
          webPageJsonLd({
            path: '/privacy-choices',
            name: 'Privacy Choices & Cookie Preferences | 10PeakStudio',
            description:
              'Manage cookie preferences, Global Privacy Control opt-out, and data rights requests on 10PeakStudio.',
          }),
          legalBreadcrumbJsonLd('Privacy Choices', '/privacy-choices'),
        ]}
      />
    </>
  );
}
