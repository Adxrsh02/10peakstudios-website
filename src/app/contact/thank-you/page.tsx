import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { ThankYouConversion } from '@/components/contact/ThankYouConversion';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/primitives';
import { env } from '@/lib/env';
import { pageMetadata } from '@/lib/seo';
import { whatsappUrl } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Thank You | 10PeakStudio',
  description: 'Your project enquiry has been securely received by 10PeakStudio.',
  path: '/contact/thank-you',
  noindex: true,
});

export default function ThankYouPage() {
  const waHref = whatsappUrl(
    env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917678083589',
    'Hi 10PeakStudio, I just submitted an enquiry on your website.',
  );

  return (
    <>
      <ThankYouConversion />
      <Section
        surface="white"
        className="flex min-h-[75dvh] items-center justify-center py-16 sm:py-24"
      >
        <div className="container-content flex max-w-2xl flex-col items-center text-center">
          <div className="mb-6 inline-grid size-16 place-items-center rounded-pill bg-primary/10 text-primary">
            <CheckCircle2 className="size-8" strokeWidth={2} aria-hidden="true" />
          </div>

          <h1 className="font-heading text-display font-bold text-foreground">
            Thank you for reaching out.
          </h1>

          <p className="mt-4 max-w-[50ch] text-body-lg text-muted-foreground">
            Your project enquiry has been securely received. Our lead engineering team reviews
            submissions during active studio hours (Mon–Sat, 7:00 AM – 9:00 PM IST).
          </p>

          <div className="mt-8 flex w-full flex-col gap-4 rounded-md border border-border bg-surface-sunken/40 p-6 text-left sm:p-8">
            <h2 className="font-heading text-small font-semibold tracking-wider text-foreground uppercase">
              What to Expect Next:
            </h2>
            <ol className="flex list-decimal flex-col gap-3 pl-5 text-small text-muted-foreground">
              <li>
                <strong className="text-foreground">Technical Review:</strong> We review your
                requirements and feasibility against our engineering standards.
              </li>
              <li>
                <strong className="text-foreground">Direct Outreach:</strong> We reach out via email
                or WhatsApp to coordinate a 30-minute discovery call.
              </li>
              <li>
                <strong className="text-foreground">Transparent Scope:</strong> You receive a
                milestone-driven plan with fixed scope and timeline commitments.
              </li>
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {waHref && (
              <Button asChild size="lg">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5 text-emerald-600" aria-hidden="true" />
                  Message on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            )}

            <Button asChild size="lg" variant="secondary">
              <Link href="/services">
                Explore Our Services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-caption text-muted-foreground">
            Want to learn more about our engineering standards?{' '}
            <Link href="/about/process" className="text-primary underline hover:text-primary-hover">
              Read how we work
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
