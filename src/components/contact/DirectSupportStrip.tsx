import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TwoToneText } from '@/components/ui/primitives';
import { contact } from '@/content/contact';
import { whatsappUrl } from '@/lib/whatsapp';

type DirectSupportStripProps = {
  whatsappNumber?: string | undefined;
};

export function DirectSupportStrip({ whatsappNumber }: DirectSupportStripProps) {
  const waHref = whatsappUrl(
    whatsappNumber || '917678083589',
    'Hi 10PeakStudio, I need immediate assistance with a project.',
  );

  return (
    <div className="surface-inverse relative isolate overflow-hidden py-section">
      {/* Glow Violet ambient aura */}
      <div
        aria-hidden="true"
        className="glow-violet pointer-events-none absolute top-0 left-1/2 -z-10 h-[28rem] w-[min(50rem,100vw)] -translate-x-1/2 -translate-y-1/3 opacity-30"
      />

      <div className="container-content flex flex-col items-center gap-6 text-center">
        <p className="text-[0.8125rem] font-medium tracking-[0.14em] text-brand-accent uppercase">
          {contact.directSupport.eyebrow}
        </p>

        <h2 className="max-w-2xl text-h2 text-foreground sm:text-h1">
          <TwoToneText
            text={contact.directSupport.titleLead}
            accent={contact.directSupport.titleAccent}
          />
        </h2>

        <p className="max-w-[48ch] text-body-lg text-muted-foreground">
          {contact.directSupport.lead}
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {waHref && (
            <Button asChild size="lg">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="click_whatsapp"
                data-cta-location="direct_support_strip"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {contact.directSupport.ctaWhatsApp}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}

          <Button asChild size="lg" variant="secondary">
            <a
              href="tel:+917678083589"
              data-track="click_call"
              data-cta-location="direct_support_strip"
            >
              <Phone className="size-5" aria-hidden="true" />
              {contact.directSupport.ctaCall}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
