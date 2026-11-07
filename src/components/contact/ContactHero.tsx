import Image from 'next/image';
import Link from 'next/link';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip, Eyebrow, TwoToneText } from '@/components/ui/primitives';
import { contact } from '@/content/contact';
import { whatsappUrl } from '@/lib/whatsapp';

type ContactHeroProps = {
  whatsappNumber?: string | undefined;
};

export function ContactHero({ whatsappNumber }: ContactHeroProps) {
  const waHref = whatsappUrl(
    whatsappNumber || '917678083589',
    "Hi 10PeakStudio, I'd like to discuss a project.",
  );

  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative overflow-hidden bg-background pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Background visual with contrast-safe gradient scrim */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={contact.hero.bgImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-30 md:object-center md:opacity-40"
        />
        {/* Soft gradient masks for text readability (WCAG AA compliant) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50 md:bg-gradient-to-r md:from-background md:via-background/90 md:to-transparent"
        />
      </div>

      <div className="container-wide">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-caption text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        <div className="flex max-w-3xl flex-col gap-5 sm:gap-6">
          <div>
            <Eyebrow>{contact.hero.eyebrow}</Eyebrow>
          </div>

          <h1 id="contact-hero-title" className="text-display text-foreground">
            <TwoToneText
              text={contact.hero.titleLead}
              accent={contact.hero.titleAccent}
              tone="gradient"
              sweep
            />
          </h1>

          <p className="max-w-[54ch] text-body-lg text-muted-foreground">{contact.hero.lead}</p>

          {/* Quick-action 1-tap communication strip */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button asChild size="md">
              <a href="tel:+917678083589" data-track="click_call" data-cta-location="contact_hero">
                <Phone className="size-4" aria-hidden="true" />
                Call +91 7678083589
              </a>
            </Button>

            {waHref && (
              <Button asChild size="md" variant="secondary">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="click_whatsapp"
                  data-cta-location="contact_hero"
                >
                  <MessageCircle className="size-4 text-emerald-600" aria-hidden="true" />
                  Message on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            )}

            <Button asChild size="md" variant="secondary">
              <a
                href="mailto:connect@10peakstudios.com"
                data-track="click_email"
                data-cta-location="contact_hero"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email Us
              </a>
            </Button>
          </div>

          {/* Honest trust assurance line */}
          <div className="mt-2 flex items-center gap-2">
            <Chip className="border-border/80 bg-surface-sunken/80 text-[0.8125rem]">
              {contact.hero.trustLine}
            </Chip>
          </div>
        </div>
      </div>
    </section>
  );
}
