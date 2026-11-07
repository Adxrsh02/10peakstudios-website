'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { contact, type ClientEntry } from '@/content/contact';

function ClientLogoCard({ client }: { client: ClientEntry }) {
  if (client.logoUrl) {
    return (
      <div className="group/logo relative flex h-20 w-48 shrink-0 items-center justify-center rounded-md border border-border bg-white p-3 shadow-xs transition-all duration-(--duration-fast) hover:border-primary/40 hover:shadow-md">
        <div className="relative h-12 w-36">
          <Image
            src={client.logoUrl}
            alt={client.name}
            fill
            sizes="144px"
            className="object-contain grayscale transition-all duration-(--duration-fast) group-hover/logo:grayscale-0"
          />
        </div>
      </div>
    );
  }

  // Fallback for placeholder logos (e.g. Gogs India)
  return (
    <div className="group/logo flex h-20 w-48 shrink-0 flex-col items-center justify-center rounded-md border border-dashed border-border bg-card p-3 shadow-xs transition-colors hover:border-primary/40">
      <span className="font-heading text-small font-bold text-foreground/90 group-hover/logo:text-primary">
        {client.name}
      </span>
      <span className="text-[0.6875rem] text-muted-foreground">{client.industry}</span>
    </div>
  );
}

export function ClientMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const items = contact.clients.items;
  const isAdaptiveRow = items.length < 5;

  return (
    <Section surface="paper" aria-labelledby="clients-heading">
      <div className="container-wide flex flex-col gap-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              id="clients-heading"
              eyebrow={contact.clients.eyebrow}
              title={
                <TwoToneText
                  text={contact.clients.titleLead}
                  accent={contact.clients.titleAccent}
                  tone="gradient"
                />
              }
              lead={contact.clients.lead}
            />

            {/* Keyboard-accessible Pause/Play toggle (WCAG 2.2.2) when running marquee */}
            {!isAdaptiveRow && (
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Resume client marquee' : 'Pause client marquee'}
                className="inline-flex items-center gap-2 self-start rounded-pill border border-border bg-background px-3.5 py-1.5 text-caption font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {isPaused ? (
                  <>
                    <Play className="size-3.5" aria-hidden="true" />
                    <span>Play animation</span>
                  </>
                ) : (
                  <>
                    <Pause className="size-3.5" aria-hidden="true" />
                    <span>Pause animation</span>
                  </>
                )}
              </button>
            )}
          </div>
        </Reveal>

        {isAdaptiveRow ? (
          /* Static centered row when fewer than 5 logos */
          <Reveal className="flex flex-wrap items-center justify-center gap-8 py-4 sm:gap-12">
            {items.map((client) => (
              <div key={client.name} data-reveal-item="">
                <ClientLogoCard client={client} />
              </div>
            ))}
          </Reveal>
        ) : (
          /* Infinite marquee when 5 or more logos */
          <div
            className="marquee-container relative overflow-hidden py-4"
            data-paused={isPaused ? 'true' : 'false'}
          >
            <div className="marquee-track flex gap-8">
              {items.map((client, idx) => (
                <ClientLogoCard key={`${client.name}-${idx}`} client={client} />
              ))}
              {/* Duplicated track for seamless loop */}
              {items.map((client, idx) => (
                <div key={`dup-${client.name}-${idx}`} aria-hidden="true">
                  <ClientLogoCard client={client} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
