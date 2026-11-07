import { ClientMarquee } from '@/components/contact/ClientMarquee';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactMethods } from '@/components/contact/ContactMethods';
import { DirectSupportStrip } from '@/components/contact/DirectSupportStrip';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { StatsCounter } from '@/components/contact/StatsCounter';
import { TestimonialsGated } from '@/components/contact/TestimonialsGated';
import { WhatHappensNext } from '@/components/contact/WhatHappensNext';
import { Reveal } from '@/components/motion/Reveal';
import { FaqSection } from '@/components/sections/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { contact } from '@/content/contact';
import { env } from '@/lib/env';
import { faqJsonLd, pageMetadata } from '@/lib/seo';
import { contactBreadcrumbJsonLd, contactPageJsonLd } from '@/lib/seo-contact';

export const metadata = pageMetadata({
  title: contact.meta.title,
  description: contact.meta.description,
  path: '/contact',
});

/**
 * Contact Us Page (PRD §8.7, Design.md §10.15, §14, §15).
 * Built section-by-section at agency quality. Fully static export compatible.
 */
export default function ContactPage() {
  return (
    <>
      {/* 1. Hero Section with 1-tap communication strip */}
      <ContactHero whatsappNumber={env.NEXT_PUBLIC_WHATSAPP_NUMBER} />

      {/* 2. Direct Channels: Phone, Email, Location, Business Hours */}
      <ContactMethods />

      {/* 3 & 4. Primary Conversion Section: Lead Form (7/12) & What Happens Next (5/12) */}
      <section
        id="enquiry"
        aria-labelledby="enquiry-title"
        className="relative overflow-hidden bg-background py-section"
      >
        <div className="container-wide">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Main Enquiry Form (7 cols) */}
            <div className="lg:col-span-7" data-reveal-item="">
              <EnquiryForm
                turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                whatsappNumber={env.NEXT_PUBLIC_WHATSAPP_NUMBER}
              />
            </div>

            {/* Sticky Expectations & Assurance Panel (5 cols) */}
            <div className="lg:sticky lg:top-24 lg:col-span-5" data-reveal-item="">
              <WhatHappensNext />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Metrics & Proven Numbers */}
      <StatsCounter />

      {/* 6. Selected Clients & Partners */}
      <ClientMarquee />

      {/* 7. Flag-Gated Testimonials (default false) */}
      <TestimonialsGated />

      {/* 8. Frequently Asked Questions */}
      <FaqSection
        id="contact-faq"
        eyebrow={contact.faq.eyebrow}
        titleLead={contact.faq.titleLead}
        titleAccent={contact.faq.titleAccent}
        lead={contact.faq.lead}
        faqs={contact.faq.items}
        surface="paper"
      />

      {/* 9. Direct Assistance Closing Strip (replaces generic CtaBand) */}
      <DirectSupportStrip whatsappNumber={env.NEXT_PUBLIC_WHATSAPP_NUMBER} />

      {/* Structured Data (Schema.org) */}
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd data={contactBreadcrumbJsonLd()} />
      <JsonLd data={faqJsonLd([...contact.faq.items])} />
    </>
  );
}
