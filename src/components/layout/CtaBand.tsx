import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TwoToneText } from '@/components/ui/primitives';
import { contactPath } from '@/content/navigation';

type CtaBandProps = {
  titleLead: string;
  titleAccent: string;
  body: string;
  whatsappHref: string | null;
};

/**
 * Final CTA band (PRD-GLB-07, Design.md 10.14). Renders inside the Obsidian footer surface.
 * Accent words use Lilac Spark at >= 28 px on Obsidian (4.8:1).
 */
export function CtaBand({ titleLead, titleAccent, body, whatsappHref }: CtaBandProps) {
  return (
    <div className="relative isolate overflow-hidden py-section" data-reveal-group="">
      <div
        aria-hidden="true"
        className="glow-violet pointer-events-none absolute top-0 left-1/2 -z-10 h-[34rem] w-[min(60rem,120vw)] -translate-x-1/2 -translate-y-1/3"
      />
      <div className="container-content flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-3xl text-h1 text-foreground" data-reveal-item="">
          <TwoToneText text={titleLead} accent={titleAccent} />
        </h2>
        <p className="max-w-[48ch] text-body-lg text-muted-foreground" data-reveal-item="">
          {body}
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" data-reveal-item="">
          <Button asChild size="lg">
            <Link href={contactPath} data-cta="cta-band-start" data-cta-location="cta_band">
              Start a project
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </Link>
          </Button>
          {whatsappHref && (
            <Button asChild size="lg" variant="secondary">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-cta-location="cta_band"
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} />
                WhatsApp us
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
