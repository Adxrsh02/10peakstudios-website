'use client';

import { useState } from 'react';
import { ArrowRight, MessageCircle, Pause, Play } from 'lucide-react';
import type { TerminalCtaData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { ServiceCtaLink } from './ServiceCtaLink';

type TerminalCtaProps = {
  slug: string;
  data: TerminalCtaData;
  whatsappHref: string | null;
};

/**
 * Closing call-to-action card with a clean terminal prompt badge (including Pause control
 * for its blinking cursor indicator), white-on-violet primary CTA, and optional WhatsApp link.
 */
export function TerminalCta({ slug, data, whatsappHref }: TerminalCtaProps) {
  const [cursorPaused, setCursorPaused] = useState(false);

  return (
    <section aria-labelledby="terminal-cta-heading" className="relative pt-4 pb-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto max-w-4xl rounded-full bg-gradient-to-r from-[#480bb4] via-[#8e21fc] to-[#4cd7f6] opacity-25 blur-[96px]"
      />

      <div className="glass-card-strong glass-specular relative flex flex-col items-center gap-5 overflow-hidden rounded-lg p-8 text-center sm:p-12 md:p-14">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2 font-mono text-caption text-[#e1c4ff]">
          <span className="text-(--glass-cyan)" aria-hidden="true">
            &gt;
          </span>
          <span>{data.promptText}</span>
          <span
            aria-hidden="true"
            data-paused={cursorPaused ? 'true' : 'false'}
            className="service-cursor-blink inline-block h-3.5 w-2 bg-[#c38bff]"
          />
          <button
            type="button"
            aria-label={cursorPaused ? 'Resume prompt cursor' : 'Pause prompt cursor'}
            aria-pressed={cursorPaused}
            onClick={() => setCursorPaused((p) => !p)}
            className={cn(
              'ml-1 inline-flex size-6 items-center justify-center rounded-full border border-white/15 bg-white/8 text-(--glass-text-muted) hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
            )}
          >
            {cursorPaused ? (
              <Play className="size-2.5" aria-hidden="true" />
            ) : (
              <Pause className="size-2.5" aria-hidden="true" />
            )}
          </button>
        </div>

        <h2
          id="terminal-cta-heading"
          className="m-0 max-w-2xl font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.titleLead} <span className="glass-gradient-text">{data.titleAccent}</span>{' '}
          {data.titleEnd}
        </h2>

        <p className="max-w-xl text-body leading-relaxed text-(--glass-text-muted)">
          {data.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <ServiceCtaLink
            href={`/contact?service=${slug}`}
            serviceSlug={slug}
            position="footer"
            className="glass-cta-primary inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 font-heading text-small font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
          >
            <span>{data.primaryLabel}</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </ServiceCtaLink>

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'service_footer' })}
              className="glass-cta-secondary inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 font-heading text-small font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              <MessageCircle className="size-4 text-(--glass-emerald)" aria-hidden="true" />
              <span>{data.whatsappLabel}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
