import Link from 'next/link';
import { LegalHero } from '@/components/legal/LegalHero';
import { LegalSection } from '@/components/legal/LegalSection';
import { LegalToc, type LegalTocItem } from '@/components/legal/LegalToc';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/primitives';
import { legalConfig } from '@/content/legal-config';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';
import { legalBreadcrumbJsonLd } from '@/lib/seo-legal';

export const metadata = pageMetadata({
  title: 'Terms and Conditions',
  description:
    'Terms and conditions governing access to 10peakstudios.com, intellectual property, portfolio case studies, disclaimers, and Indian governing law.',
  path: '/terms',
});

const TERMS_TOC: LegalTocItem[] = [
  { id: 'acceptance', number: '01', title: 'Acceptance of Terms' },
  { id: 'who-we-are', number: '02', title: 'Who We Are' },
  { id: 'acceptable-use', number: '03', title: 'Using This Website' },
  { id: 'services-and-proposals', number: '04', title: 'Services &amp; Proposals' },
  { id: 'intellectual-property', number: '05', title: 'Intellectual Property' },
  { id: 'portfolio-case-studies', number: '06', title: 'Portfolio &amp; Research Projects' },
  { id: 'third-party-services', number: '07', title: 'Third-Party Links &amp; Tools' },
  { id: 'disclaimers', number: '08', title: 'Disclaimers' },
  { id: 'limitation-of-liability', number: '09', title: 'Limitation of Liability' },
  { id: 'indemnity', number: '10', title: 'Indemnity' },
  { id: 'privacy', number: '11', title: 'Privacy &amp; Cookies' },
  { id: 'changes', number: '12', title: 'Changes to Terms' },
  { id: 'governing-law', number: '13', title: 'Governing Law &amp; Jurisdiction' },
  { id: 'contact', number: '14', title: 'Contact' },
];

export default function TermsPage() {
  return (
    <>
      <LegalHero
        titleLead="Terms and"
        titleAccent="Conditions."
        summary="The clear rules governing your use of 10peakstudios.com, our brand and portfolio content, disclaimers, and applicable Indian law."
        breadcrumbLabel="Terms and Conditions"
      />

      <Section surface="white" aria-label="Terms and Conditions full text">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <LegalToc items={TERMS_TOC} articleSelector="#terms-document" />

          <article id="terms-document" className="flex min-w-0 flex-col gap-10 lg:col-span-8">
            <LegalSection
              id="acceptance"
              number="01"
              title="Acceptance of These Terms"
              inShort="By accessing or using 10peakstudios.com, you agree to follow these Terms and Conditions."
            >
              <p>
                By browsing, submitting an enquiry, or interacting with any page on{' '}
                <strong className="text-foreground">{legalConfig.websiteUrl}</strong>, you agree to
                be bound by these Terms and Conditions. If you do not agree with any part of these
                terms, please discontinue use of the website.
              </p>
            </LegalSection>

            <LegalSection
              id="who-we-are"
              number="02"
              title="Who We Are"
              inShort={`This site is operated by ${legalConfig.brandName} in ${legalConfig.city}.`}
            >
              <p>
                This website is published by{' '}
                <strong className="text-foreground">{legalConfig.legalEntityName}</strong> (
                {legalConfig.entityType}), operating from{' '}
                <strong className="text-foreground">{legalConfig.registeredAddress}</strong>.
              </p>
            </LegalSection>

            <LegalSection
              id="acceptable-use"
              number="03"
              title="Using This Website"
              inShort="Use this site lawfully without automated scraping, security probing, or contact form abuse."
            >
              <p>You agree to use this website strictly for lawful business or personal evaluation:</p>
              <ul className="list-disc space-y-1.5 pl-6">
                <li>
                  Do not run aggressive scraping, automated harvesting, or traffic floods that
                  degrade availability for other visitors.
                </li>
                <li>
                  Do not attempt to bypass Cloudflare security controls, probe Worker endpoints,
                  bypass Turnstile verification, or test unauthorized access.
                </li>
                <li>
                  Do not misuse our <code>/contact</code> enquiry form to send spam, unsolicited
                  solicitations, unlawful material, or false identity data.
                </li>
              </ul>
            </LegalSection>

            <LegalSection
              id="services-and-proposals"
              number="04"
              title="Our Services &amp; Proposals"
              inShort="Website descriptions are general information only; project terms exist solely in signed contracts."
            >
              <p>
                Descriptions of web development, software engineering, AI automation, design, and
                marketing capabilities on this website are provided for general informational
                purposes and do not constitute a binding contractual offer or fixed fee schedule.
              </p>
              <p>
                Actual deliverables, scope, fees, timelines, intellectual property assignment,
                support SLAs, and warranties for client work are governed exclusively by a separate
                written proposal, Statement of Work (SoW), or Master Services Agreement signed by
                both parties.
              </p>
            </LegalSection>

            <LegalSection
              id="intellectual-property"
              number="05"
              title="Intellectual Property"
              inShort="The 10PeakStudio brand, logomark, UI, copy, and site code belong to 10PeakStudio."
            >
              <p>
                All visual assets, layouts, 10PeakStudio trademarks, the &ldquo;1P&rdquo; rising
                arrow logomark, written copy, custom architecture diagrams, and website source code
                published on this site are owned by or licensed to {legalConfig.brandName}.
              </p>
              <p>
                You are granted a limited, non-exclusive, revocable license to view and print pages
                for legitimate personal or prospective business evaluation. You may not copy, modify,
                republish, mirror, or commercially exploit our brand assets or site code without
                prior written consent.
              </p>
            </LegalSection>

            <LegalSection
              id="portfolio-case-studies"
              number="06"
              title="Portfolio, Case Studies &amp; Research Projects"
              inShort="Case studies showcase engineering capabilities; in-house research prototypes (including medical AI) are not certified commercial or clinical products."
            >
              <p>
                Our{' '}
                <Link href="/portfolio" className="font-medium text-link underline underline-offset-2">
                  Portfolio
                </Link>{' '}
                showcases engineering case studies, in-house builds, and technical R&amp;D work.
                Where third-party trademarks, logos, or open-source repository marks appear, they
                remain the property of their respective owners.
              </p>
              <p>
                <strong className="text-foreground">Important Notice on Research &amp; Demo Builds:</strong>{' '}
                Research-stage or prototype systems (for example, deep-learning medical imaging R&amp;D
                such as our Automated Fundus Image Screening case study) are shared solely as
                technical capability demonstrations. They are{' '}
                <strong className="text-foreground">
                  not certified medical devices, regulated commercial products, or substitutes for
                  qualified clinical, financial, or legal advice
                </strong>{' '}
                and must not be used for medical diagnosis or professional decision-making.
              </p>
            </LegalSection>

            <LegalSection
              id="third-party-services"
              number="07"
              title="Third-Party Links &amp; External Services"
              inShort="We are not responsible for external websites linked from case studies or contact tools."
            >
              <p>
                Pages on this site may link to external resources such as GitHub repositories,
                academic conference portals, LinkedIn profiles, WhatsApp click-to-chat, or optional
                YouTube video embeds. We do not control and are not responsible for the content,
                uptime, or privacy practices of third-party websites.
              </p>
            </LegalSection>

            <LegalSection
              id="disclaimers"
              number="08"
              title="Disclaimers"
              inShort='The website is provided "as is" and "as available" without guarantees of uninterrupted uptime.'
            >
              <p>
                We take care to keep technical documentation and service descriptions accurate, but
                this website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis. We do not warrant uninterrupted server availability, complete error-free
                operation, or suitability for any specific purpose beyond signed client agreements.
              </p>
            </LegalSection>

            <LegalSection
              id="limitation-of-liability"
              number="09"
              title="Limitation of Liability"
              inShort="To the maximum extent permitted by applicable Indian law, 10PeakStudio is not liable for indirect losses arising from website browsing."
            >
              <p>
                To the maximum extent permitted under applicable Indian law, {legalConfig.brandName}{' '}
                and its team members shall not be liable for any indirect, incidental, consequential,
                or special damages—or loss of data, revenue, or business opportunity—arising from
                your access to, inability to access, or reliance upon free informational content on
                this website. Nothing in these terms limits liability that cannot legally be excluded
                under Indian law.
              </p>
            </LegalSection>

            <LegalSection
              id="indemnity"
              number="10"
              title="Indemnity"
              inShort="You are responsible for claims or damages resulting from your misuse of the site or breach of these terms."
            >
              <p>
                You agree to indemnify and hold harmless {legalConfig.brandName} from reasonable
                third-party claims, losses, or liabilities arising directly from your unlawful use
                of this website, automated attack/abuse of <code>/api/contact</code>, or violation of
                these Terms and Conditions.
              </p>
            </LegalSection>

            <LegalSection
              id="privacy"
              number="11"
              title="Privacy &amp; Cookies"
              inShort="Data handling and cookie preferences are governed by our Privacy Policy and Privacy Choices."
            >
              <p>
                Your use of this website is also subject to our{' '}
                <Link href="/privacy" className="font-medium text-link underline underline-offset-2">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-choices"
                  className="font-medium text-link underline underline-offset-2"
                >
                  Privacy Choices
                </Link>
                , which explain how form enquiries, cookies, and analytics preferences are handled.
              </p>
            </LegalSection>

            <LegalSection
              id="changes"
              number="12"
              title="Changes to These Terms"
              inShort="Updated terms apply from the revised date shown at the top of this page."
            >
              <p>
                We may update these Terms and Conditions periodically to reflect legal, operational,
                or site changes. Continued use of {legalConfig.websiteUrl} after an updated version is
                published constitutes acceptance of the revised terms.
              </p>
            </LegalSection>

            <LegalSection
              id="governing-law"
              number="13"
              title="Governing Law &amp; Jurisdiction"
              inShort={`These terms are governed by the laws of India, with courts at ${legalConfig.jurisdictionCity}.`}
            >
              <p>
                These Terms and Conditions are governed by and construed in accordance with the
                laws of <strong className="text-foreground">India</strong>. Any disputes arising out
                of or relating to this website shall be subject to the exclusive jurisdiction of the
                competent courts at <strong className="text-foreground">{legalConfig.jurisdictionCity}</strong>.
              </p>
            </LegalSection>

            <LegalSection
              id="contact"
              number="14"
              title="Contact"
              inShort={`Email ${legalConfig.contactEmail} regarding these Terms and Conditions.`}
            >
              <p>
                Questions regarding these Terms and Conditions may be directed to{' '}
                <a
                  href={`mailto:${legalConfig.contactEmail}`}
                  className="font-medium text-link underline underline-offset-2"
                >
                  {legalConfig.contactEmail}
                </a>{' '}
                or sent via{' '}
                <Link href="/contact" className="font-medium text-link underline underline-offset-2">
                  /contact
                </Link>
                .
              </p>
            </LegalSection>
          </article>
        </div>
      </Section>

      <JsonLd
        data={[
          webPageJsonLd({
            path: '/terms',
            name: 'Terms and Conditions | 10PeakStudio',
            description:
              'Terms and conditions for 10peakstudios.com, covering acceptable use, intellectual property, portfolio research notices, and Indian governing law.',
          }),
          legalBreadcrumbJsonLd('Terms and Conditions', '/terms'),
        ]}
      />
    </>
  );
}
