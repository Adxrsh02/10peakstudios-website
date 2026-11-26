import { ArrowRight, MessageCircle } from 'lucide-react';
import type { ServicePageContent } from '@/content/services/types';
import { ServiceCtaLink } from './ServiceCtaLink';

type ServiceCtaProps = {
  slug: string;
  finalCta: ServicePageContent['finalCta'];
  whatsappHref: string | null;
};

export function ServiceCta({ slug, finalCta, whatsappHref }: ServiceCtaProps) {
  return (
    <section aria-labelledby="service-final-cta-heading" className="relative pt-4 pb-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto max-w-4xl rounded-full bg-gradient-to-r from-[#480bb4] via-[#8e21fc] to-[#4cd7f6] opacity-25 blur-[110px]"
      />

      <div className="glass-card-strong glass-specular relative flex flex-col items-center gap-5 overflow-hidden rounded-lg p-8 text-center sm:p-12 md:p-14">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.12em] text-(--glass-cyan) uppercase">
          {finalCta.eyebrow}
        </span>

        <h2
          id="service-final-cta-heading"
          className="m-0 max-w-3xl font-heading text-display leading-[1.1] font-bold tracking-[-0.03em] text-(--glass-text)"
        >
          <span className="block">{finalCta.titleLead}</span>
          <span className="glass-gradient-text mt-1 block">{finalCta.titleAccent}</span>
        </h2>

        <p className="max-w-xl text-body-lg leading-relaxed text-(--glass-text-muted)">
          {finalCta.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <ServiceCtaLink
            href={`/contact?service=${encodeURIComponent(slug)}`}
            serviceSlug={slug}
            position="final_cta"
            className="glass-cta-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-8 py-3.5 text-small font-semibold tracking-wide"
          >
            <span>{finalCta.primaryLabel}</span>
            <ArrowRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
          </ServiceCtaLink>

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-cta-location="service_final_cta"
              className="glass-cta-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-7 py-3.5 text-small font-semibold tracking-wide backdrop-blur-md"
            >
              <MessageCircle
                className="size-4.5 text-(--glass-cyan)"
                aria-hidden="true"
                strokeWidth={1.75}
              />
              <span>{finalCta.whatsappLabel}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
