import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PrivacyChoicesButton } from '@/components/consent/PrivacyChoicesButton';
import { LegalHero } from '@/components/legal/LegalHero';
import { LegalSection } from '@/components/legal/LegalSection';
import { LegalTable } from '@/components/legal/LegalTable';
import { LegalToc, type LegalTocItem } from '@/components/legal/LegalToc';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/primitives';
import { legalConfig } from '@/content/legal-config';
import {
  buildMailtoUrl,
  COOKIE_AND_STORAGE_TABLE,
  DATA_REQUEST_OPTIONS,
  PRIVACY_AT_A_GLANCE,
  THIRD_PARTY_PROCESSORS,
} from '@/content/legal-content';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';
import { legalBreadcrumbJsonLd } from '@/lib/seo-legal';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How 10PeakStudio collects, uses, stores, and protects personal data on 10peakstudios.com under applicable Indian law including the DPDP Act 2023.',
  path: '/privacy',
});

const PRIVACY_TOC: LegalTocItem[] = [
  { id: 'who-we-are', number: '01', title: 'Who We Are' },
  { id: 'scope', number: '02', title: 'Scope of This Policy' },
  { id: 'data-we-collect', number: '03', title: 'Data We Collect' },
  { id: 'cookies', number: '04', title: 'Cookies & Similar Technologies' },
  { id: 'purpose-and-basis', number: '05', title: 'Why We Use Data & Legal Basis' },
  { id: 'third-party-providers', number: '06', title: 'Third-Party Service Providers' },
  { id: 'cross-border', number: '07', title: 'Cross-Border Data Transfers' },
  { id: 'retention', number: '08', title: 'Data Retention' },
  { id: 'security', number: '09', title: 'Security Safeguards' },
  { id: 'your-rights', number: '10', title: 'Your Rights & Requests' },
  { id: 'withdraw-consent', number: '11', title: 'Withdrawing Consent & GPC' },
  { id: 'children', number: '12', title: 'Children Under 18' },
  { id: 'grievance-officer', number: '13', title: 'Grievance Officer' },
  { id: 'changes', number: '14', title: 'Changes & Contact' },
];

export default function PrivacyPage() {
  return (
    <>
      <LegalHero
        titleLead="Privacy"
        titleAccent="Policy."
        summary="A clear, accurate explanation of what data 10peakstudios.com collects, which providers process it, and how you control your consent and rights under applicable Indian law."
        breadcrumbLabel="Privacy Policy"
      />

      {/* At-a-Glance Summary Cards */}
      <Section surface="paper" roundedTop className="-mt-8 pt-12 pb-12 sm:-mt-10 sm:pt-14 sm:pb-16" aria-labelledby="privacy-glance-heading">
        <div className="flex flex-col gap-6">
          <p
            id="privacy-glance-heading"
            className="font-sans text-[0.8125rem] font-semibold tracking-[0.12em] text-brand-accent uppercase"
          >
            At a Glance
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRIVACY_AT_A_GLANCE.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 rounded-md border border-border bg-card p-5"
              >
                <h2 className="text-h5 text-foreground">{item.label}</h2>
                <p className="text-small text-muted-foreground">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Main Legal Reading Body */}
      <Section surface="white" aria-label="Privacy Policy full text">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <LegalToc items={PRIVACY_TOC} articleSelector="#privacy-document" />

          <article id="privacy-document" className="flex min-w-0 flex-col gap-10 lg:col-span-8">
            <LegalSection
              id="who-we-are"
              number="01"
              title="Who We Are"
              inShort={`${legalConfig.brandName} is a digital innovation and technology studio based in ${legalConfig.city}.`}
            >
              <p>
                This website (<span className="font-medium text-foreground">{legalConfig.websiteUrl}</span>)
                is operated by <strong className="text-foreground">{legalConfig.legalEntityName}</strong>{' '}
                ({legalConfig.entityType}), operating from{' '}
                <strong className="text-foreground">{legalConfig.registeredAddress}</strong>.
              </p>
              <p>
                We handle personal data in line with applicable Indian law, including the{' '}
                <strong className="text-foreground">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>{' '}
                and its notified phased DPDP Rules framework, alongside applicable provisions of the{' '}
                <strong className="text-foreground">Information Technology Act, 2000</strong> and the{' '}
                IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or
                Information) Rules, 2011 during their statutory transition period.
              </p>
              <p>
                For any privacy questions, email{' '}
                <a
                  href={`mailto:${legalConfig.privacyEmail}`}
                  className="font-medium text-link underline underline-offset-2"
                >
                  {legalConfig.privacyEmail}
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection
              id="scope"
              number="02"
              title="Scope of This Policy"
              inShort="This policy covers visitors browsing 10peakstudios.com and enquiries sent through our contact form or email."
            >
              <p>
                This Privacy Policy applies exclusively to information processed when you visit our
                public website, manage your privacy preferences, or submit an enquiry via{' '}
                <Link href="/contact" className="font-medium text-link underline underline-offset-2">
                  /contact
                </Link>
                .
              </p>
              <p>
                Dedicated software engineering, web application, or AI automation work delivered for
                clients is governed separately by signed client service agreements and statements of
                work rather than this website policy.
              </p>
            </LegalSection>

            <LegalSection
              id="data-we-collect"
              number="03"
              title="Data We Collect"
              inShort="We collect contact details you enter into our enquiry form, automated security telemetry, and optional analytics only if you grant consent."
            >
              <h3 className="text-h5 text-foreground">Data You Give Us Directly</h3>
              <p>
                When you submit our project enquiry form (<code>/api/contact</code>), we collect
                only the fields shown on the form:
              </p>
              <ul className="list-disc space-y-1.5 pl-6">
                <li>
                  <strong className="text-foreground">Your Name</strong> (required) and{' '}
                  <strong className="text-foreground">Work Email</strong> (required)
                </li>
                <li>
                  <strong className="text-foreground">Phone / WhatsApp Number</strong> (optional)
                </li>
                <li>
                  <strong className="text-foreground">Selected Services</strong> (required checkbox selection)
                </li>
                <li>
                  <strong className="text-foreground">Estimated Budget Range</strong> and{' '}
                  <strong className="text-foreground">Project Timeline</strong> (optional)
                </li>
                <li>
                  <strong className="text-foreground">Project Requirements &amp; Objectives</strong>{' '}
                  (required message text) plus explicit privacy acknowledgement checkbox
                </li>
                <li>
                  Optional campaign attribution parameters (<code>utmSource</code>,{' '}
                  <code>utmMedium</code>, <code>utmCampaign</code>) when present in your visit
                </li>
              </ul>
              <p>
                If you contact us directly via email or WhatsApp, we receive the details you choose
                to include in that conversation (such as your company name or project brief).
              </p>

              <h3 className="mt-2 text-h5 text-foreground">Data Collected Automatically</h3>
              <ul className="list-disc space-y-1.5 pl-6">
                <li>
                  <strong className="text-foreground">Cloudflare Request &amp; Security Signals:</strong>{' '}
                  Edge hosting receives your IP address and HTTP user agent to route pages securely
                  and block abuse. On enquiry submissions, our Worker reads your IP from Cloudflare&apos;s{' '}
                  <code>cf-connecting-ip</code> header and immediately converts it into a salted{' '}
                  <code>SHA-256</code> hash (we never store raw IP addresses in lead records).
                </li>
                <li>
                  <strong className="text-foreground">Anti-Spam Verification:</strong> Cloudflare
                  Turnstile token, form-open duration check (minimum 3 seconds), and an off-screen
                  honeypot check verify automated bots cannot spam the form.
                </li>
                <li>
                  <strong className="text-foreground">Cookieless Performance Metrics:</strong>{' '}
                  Cloudflare Web Analytics records aggregate traffic and Core Web Vitals without
                  setting tracking cookies.
                </li>
                <li>
                  <strong className="text-foreground">Optional Analytics (Consent-Gated):</strong>{' '}
                  Google Analytics 4 and Microsoft Clarity load <em>only</em> after you explicitly
                  grant consent (and are blocked by default if Global Privacy Control is active).
                  All contact form inputs are tagged with <code>data-clarity-mask=&quot;true&quot;</code>{' '}
                  so keystrokes are masked in Clarity.
                </li>
                <li>
                  <strong className="text-foreground">Media Delivery &amp; On-Demand Video:</strong>{' '}
                  Images load via Cloudinary CDN. Embedded YouTube videos (<code>youtube-nocookie.com</code>)
                  on portfolio pages never connect until you click Play.
                </li>
              </ul>
            </LegalSection>

            <LegalSection
              id="cookies"
              number="04"
              title="Cookies &amp; Similar Technologies"
              inShort="We use strictly necessary browser storage for consent and security; analytics cookies run only with your explicit permission."
            >
              <p>
                Our website does not set advertising cookies. Browser storage items and optional
                third-party cookies used across the site are documented below:
              </p>
              <LegalTable
                caption="Cookies and browser storage used on 10peakstudios.com"
                headers={['Name / Provider', 'Mechanism', 'Purpose', 'Category', 'Duration', 'Consent']}
              >
                {COOKIE_AND_STORAGE_TABLE.map((row) => (
                  <tr key={row.nameOrProvider}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.nameOrProvider}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.mechanism}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-foreground">{row.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{row.duration}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground">
                      {row.consentRequired}
                    </td>
                  </tr>
                ))}
              </LegalTable>
            </LegalSection>

            <LegalSection
              id="purpose-and-basis"
              number="05"
              title="Why We Use Data &amp; Legal Basis"
              inShort="We process your enquiry data strictly to evaluate and reply to your request, protect the site from spam, and run consented site analytics."
            >
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Responding to Enquiries &amp; Proposals:</strong>{' '}
                  Processing contact form fields to notify our team, send you a confirmation
                  auto-reply, and discuss your requested services (based on your voluntary action
                  and explicit consent at submission).
                </li>
                <li>
                  <strong className="text-foreground">Spam Prevention &amp; Rate Limiting:</strong>{' '}
                  Validating Turnstile tokens and counting salted IP hashes (maximum 5 enquiries per
                  hour) to protect availability and prevent abuse.
                </li>
                <li>
                  <strong className="text-foreground">Website Improvement (Optional):</strong>{' '}
                  Understanding aggregate page journeys and UX bottlenecks via GA4 and Microsoft
                  Clarity strictly when you grant opt-in consent.
                </li>
                <li>
                  <strong className="text-foreground">Legal Obligations:</strong> Retaining necessary
                  business correspondence or responding to lawful regulatory directives when required
                  under Indian law.
                </li>
              </ul>
            </LegalSection>

            <LegalSection
              id="third-party-providers"
              number="06"
              title="Third-Party Service Providers"
              inShort="We share necessary operational data only with trusted infrastructure, email, media, and (when consented) analytics processors."
            >
              <p>
                We never sell personal data. Below are the exact third-party processors integrated
                into this website&apos;s codebase:
              </p>
              <LegalTable
                caption="Third-party processors and privacy policies"
                headers={['Provider', 'Purpose', 'Data Handled', 'When Active', 'Policy']}
              >
                {THIRD_PARTY_PROCESSORS.map((proc) => (
                  <tr key={proc.provider}>
                    <td className="px-4 py-3 font-medium text-foreground">{proc.provider}</td>
                    <td className="px-4 py-3 text-muted-foreground">{proc.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{proc.dataHandled}</td>
                    <td className="px-4 py-3 text-muted-foreground">{proc.condition}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={proc.privacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-link underline underline-offset-2"
                      >
                        Policy
                        <ArrowUpRight className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                        <span className="sr-only"> for {proc.provider} (opens in new tab)</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </LegalTable>
            </LegalSection>

            <LegalSection
              id="cross-border"
              number="07"
              title="Cross-Border Data Transfers"
              inShort="Some cloud infrastructure and email providers process operational data on servers outside India."
            >
              <p>
                Our edge hosting (Cloudflare), email delivery (Resend), media CDN (Cloudinary), and
                optional analytics tools (Google and Microsoft) operate distributed servers outside
                India. Whenever data moves internationally to deliver website assets or respond to
                your enquiry, it is processed in accordance with applicable Indian cross-border
                transfer requirements (subject to any country restrictions notified by the Central
                Government under the DPDP Act).
              </p>
            </LegalSection>

            <LegalSection
              id="retention"
              number="08"
              title="Data Retention"
              inShort="We keep personal data only as long as required for active communication, spam defence, or confirmed legal obligations."
            >
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Contact Enquiries:</strong>{' '}
                  {legalConfig.retention.contactEnquiries}
                </li>
                <li>
                  <strong className="text-foreground">Rate-Limit Salted IP Hashes:</strong>{' '}
                  {legalConfig.retention.rateLimitHashes}
                </li>
                <li>
                  <strong className="text-foreground">Resend Email Logs:</strong>{' '}
                  {legalConfig.retention.resendEmailLogs}
                </li>
                <li>
                  <strong className="text-foreground">Cloudflare Security Telemetry:</strong>{' '}
                  {legalConfig.retention.cloudflareEdgeLogs}
                </li>
                <li>
                  <strong className="text-foreground">Browser Consent Record:</strong>{' '}
                  {legalConfig.retention.consentStorage}
                </li>
                <li>
                  <strong className="text-foreground">GA4 &amp; Clarity Data (if consented):</strong>{' '}
                  {legalConfig.retention.ga4Analytics} {legalConfig.retention.claritySessions}
                </li>
              </ul>
            </LegalSection>

            <LegalSection
              id="security"
              number="09"
              title="Security Safeguards"
              inShort="We apply HTTPS/HSTS, strict CSP headers, Turnstile, schema validation, salted IP hashing, and Clarity input masking — without making unrealistic absolute guarantees."
            >
              <p>Technical safeguards implemented directly in this website include:</p>
              <ul className="list-disc space-y-1.5 pl-6">
                <li>HTTPS encryption in transit with HSTS (<code>max-age=31536000</code>)</li>
                <li>
                  Strict security headers (Content Security Policy, <code>X-Frame-Options: DENY</code>,{' '}
                  <code>X-Content-Type-Options: nosniff</code>)
                </li>
                <li>Server-side Zod schema validation on every <code>/api/contact</code> request</li>
                <li>Cloudflare Turnstile verification, origin checks, and honeypot/timing bot checks</li>
                <li>API keys and salts kept out of source code inside Cloudflare Worker secrets</li>
                <li>Form input masking in Microsoft Clarity (<code>data-clarity-mask=&quot;true&quot;</code>)</li>
              </ul>
              <p>
                No internet service or electronic storage mechanism can be guaranteed 100% secure;
                we continuously review technical safeguards against realistic risks.
              </p>
            </LegalSection>

            <LegalSection
              id="your-rights"
              number="10"
              title="Your Rights &amp; Requests"
              inShort="Under applicable Indian law including the DPDP Act 2023, you may access, correct, erase, or withdraw consent for your personal data."
            >
              <p>Depending on applicable law, you have the right to:</p>
              <ul className="list-disc space-y-1.5 pl-6">
                <li>
                  <strong className="text-foreground">Access &amp; Summary:</strong> Ask for confirmation
                  and a summary of personal data we process about you.
                </li>
                <li>
                  <strong className="text-foreground">Correction, Completion &amp; Updating:</strong>{' '}
                  Ask us to fix inaccurate or incomplete details.
                </li>
                <li>
                  <strong className="text-foreground">Erasure:</strong> Ask us to delete personal data
                  when no longer necessary for enquiry handling or legal compliance.
                </li>
                <li>
                  <strong className="text-foreground">Withdraw Consent &amp; Nomination:</strong> Withdraw
                  cookie or communication consent at any time as easily as you gave it, or nominate
                  another individual to exercise your rights in the event of incapacity or death.
                </li>
                <li>
                  <strong className="text-foreground">Grievance &amp; Regulatory Escalation:</strong>{' '}
                  Escalate concerns to our Grievance Officer first, and if unresolved, file a
                  complaint with the{' '}
                  <strong className="text-foreground">Data Protection Board of India (DPBI)</strong>.
                </li>
              </ul>
              <p>
                To exercise any right, visit{' '}
                <Link
                  href="/privacy-choices#data-requests-heading"
                  className="font-medium text-link underline underline-offset-2"
                >
                  Your Data Requests on Privacy Choices
                </Link>{' '}
                or email{' '}
                <a
                  href={buildMailtoUrl(
                    legalConfig.privacyEmail,
                    DATA_REQUEST_OPTIONS[0]?.subject ?? 'Data Request — 10PeakStudio',
                    DATA_REQUEST_OPTIONS[0]?.bodyTemplate ?? '',
                  )}
                  className="font-medium text-link underline underline-offset-2"
                >
                  {legalConfig.privacyEmail}
                </a>
                . Target response window: {legalConfig.requestResponseTime}.
              </p>
            </LegalSection>

            <LegalSection
              id="withdraw-consent"
              number="11"
              title="Withdrawing Consent &amp; Global Privacy Control"
              inShort="You can turn analytics off anytime via Privacy Choices; we also honor Global Privacy Control browser signals."
            >
              <p>
                You can review or withdraw cookie and analytics consent immediately at any time:
              </p>
              <div className="no-print flex flex-wrap items-center gap-3">
                <PrivacyChoicesButton className="inline-flex h-11 items-center rounded-pill bg-primary px-5 text-small font-semibold text-primary-foreground transition-colors [@media(hover:hover)]:hover:bg-primary-hover" />
                <Link
                  href="/privacy-choices"
                  className="inline-flex h-11 items-center rounded-pill border border-foreground px-5 text-small font-semibold text-foreground transition-colors [@media(hover:hover)]:hover:bg-secondary"
                >
                  Open full Privacy Choices page
                </Link>
              </div>
              <p>
                If your browser sends the{' '}
                <strong className="text-foreground">Global Privacy Control (GPC)</strong> signal (
                <code>navigator.globalPrivacyControl</code>), this website respects it as an opt-out
                of optional analytics and session insights by default.
              </p>
            </LegalSection>

            <LegalSection
              id="children"
              number="12"
              title="Children Under 18"
              inShort="This business website is not directed at anyone under 18, and we do not knowingly collect their personal data."
            >
              <p>
                Our website and digital engineering services are intended for businesses, founders,
                and adult professionals. In accordance with Indian privacy standards, we do not
                knowingly collect or solicit personal data from individuals under 18 years of age.
                If you believe a minor has submitted information via our enquiry form, please write
                to{' '}
                <a
                  href={`mailto:${legalConfig.privacyEmail}`}
                  className="font-medium text-link underline underline-offset-2"
                >
                  {legalConfig.privacyEmail}
                </a>{' '}
                so we can remove it promptly.
              </p>
            </LegalSection>

            <LegalSection
              id="grievance-officer"
              number="13"
              title="Grievance Officer"
              inShort="Contact our designated privacy contact for any unresolved data concerns."
            >
              <div className="rounded-md border border-border bg-surface-sunken p-5 text-small text-foreground">
                <p>
                  <strong>Name:</strong> {legalConfig.grievanceOfficer.name}
                </p>
                <p>
                  <strong>Designation:</strong> {legalConfig.grievanceOfficer.title}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${legalConfig.grievanceOfficer.email}`}
                    className="font-medium text-link underline underline-offset-2"
                  >
                    {legalConfig.grievanceOfficer.email}
                  </a>
                </p>
                <p>
                  <strong>Location:</strong> {legalConfig.city}
                </p>
              </div>
            </LegalSection>

            <LegalSection
              id="changes"
              number="14"
              title="Changes to This Policy &amp; Contact"
              inShort="Updates are posted here with a revised Last Updated date."
            >
              <p>
                We may revise this Privacy Policy whenever our data practices, infrastructure
                providers, or statutory obligations change. The &ldquo;Last updated&rdquo; and
                &ldquo;Effective&rdquo; dates at the top of this page indicate the current version.
              </p>
              <p>
                Questions? Reach us at{' '}
                <a
                  href={`mailto:${legalConfig.contactEmail}`}
                  className="font-medium text-link underline underline-offset-2"
                >
                  {legalConfig.contactEmail}
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="font-medium text-link underline underline-offset-2">
                  Contact page
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
            path: '/privacy',
            name: 'Privacy Policy | 10PeakStudio',
            description:
              'How 10PeakStudio handles website data, enquiry submissions, cookies, and privacy rights under Indian law.',
          }),
          legalBreadcrumbJsonLd('Privacy Policy', '/privacy'),
        ]}
      />
    </>
  );
}
