'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { IconBadge, Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { contact } from '@/content/contact';
import { LiveStatusBadge } from './LiveStatusBadge';

export function ContactMethods() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // Clipboard fallback
    }
  };

  return (
    <Section id="channels" surface="paper" aria-labelledby="channels-heading">
      <div className="container-wide flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            id="channels-heading"
            eyebrow="Direct Channels"
            title={<TwoToneText text="Reach us directly across" accent="any channel." />}
            lead="Connect with our studio team via phone, verified email, or visit our headquarters in Navi Mumbai."
          />
        </Reveal>

        {/* Live announcer for screen readers */}
        <div className="sr-only" aria-live="polite">
          {copiedKey ? 'Copied to clipboard' : ''}
        </div>

        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Phone */}
          <div
            data-reveal-item=""
            className="flex flex-col justify-between rounded-md border border-border bg-card p-6 shadow-xs transition-shadow duration-(--duration-fast) hover:shadow-md"
          >
            <div className="flex flex-col gap-4">
              <IconBadge icon={Phone} size="md" />
              <div>
                <h3 className="font-heading text-h4 font-semibold text-foreground">
                  Call Directly
                </h3>
                <p className="mt-1 text-caption text-muted-foreground">
                  Direct voice lines to our engineering and consulting team.
                </p>
              </div>

              <div className="mt-2 flex flex-col gap-3">
                {contact.channels.phones.map((phone, idx) => {
                  const key = `phone-${idx}`;
                  const isCopied = copiedKey === key;
                  return (
                    <div
                      key={phone.number}
                      className="group/phone flex items-center justify-between rounded-sm border border-border/60 bg-surface-sunken/40 p-2.5 transition-colors hover:border-primary/40"
                    >
                      <div className="flex flex-col">
                        <span className="text-[0.6875rem] font-medium tracking-wider text-muted-foreground uppercase">
                          {phone.label}
                        </span>
                        <a
                          href={`tel:${phone.number}`}
                          data-track="click_call"
                          className="font-mono text-small font-semibold text-foreground hover:text-primary"
                        >
                          {phone.display}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(phone.number, key)}
                        aria-label={`Copy phone number ${phone.display}`}
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        {isCopied ? (
                          <Check className="size-4 text-emerald-600" aria-hidden="true" />
                        ) : (
                          <Copy className="size-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-4 text-[0.75rem] text-muted-foreground">
              Standard carrier rates apply.
            </p>
          </div>

          {/* Card 2: Email */}
          <div
            data-reveal-item=""
            className="flex flex-col justify-between rounded-md border border-border bg-card p-6 shadow-xs transition-shadow duration-(--duration-fast) hover:shadow-md"
          >
            <div className="flex flex-col gap-4">
              <IconBadge icon={Mail} size="md" />
              <div>
                <h3 className="font-heading text-h4 font-semibold text-foreground">
                  Email Inboxes
                </h3>
                <p className="mt-1 text-caption text-muted-foreground">
                  Targeted email channels for client and partnership communication.
                </p>
              </div>

              <div className="mt-2 flex flex-col gap-3">
                {contact.channels.emails.map((item, idx) => {
                  const key = `email-${idx}`;
                  const isCopied = copiedKey === key;
                  return (
                    <div
                      key={item.address}
                      className="group/email flex items-center justify-between rounded-sm border border-border/60 bg-surface-sunken/40 p-2.5 transition-colors hover:border-primary/40"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <span className="text-[0.6875rem] font-medium tracking-wider text-muted-foreground uppercase">
                          {item.label}
                        </span>
                        <a
                          href={`mailto:${item.address}`}
                          data-track="click_email"
                          className="block truncate font-mono text-[0.8125rem] font-semibold text-foreground hover:text-primary"
                        >
                          {item.address}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.address, key)}
                        aria-label={`Copy email address ${item.address}`}
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        {isCopied ? (
                          <Check className="size-4 text-emerald-600" aria-hidden="true" />
                        ) : (
                          <Copy className="size-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-4 text-[0.75rem] text-muted-foreground">
              PGP key available upon request.
            </p>
          </div>

          {/* Card 3: Location */}
          <div
            data-reveal-item=""
            className="flex flex-col justify-between rounded-md border border-border bg-card p-6 shadow-xs transition-shadow duration-(--duration-fast) hover:shadow-md"
          >
            <div className="flex flex-col gap-4">
              <IconBadge icon={MapPin} size="md" />
              <div>
                <h3 className="font-heading text-h4 font-semibold text-foreground">
                  Studio Location
                </h3>
                <p className="mt-1 text-caption text-muted-foreground">
                  Our headquarters and creative engineering base.
                </p>
              </div>

              <div className="mt-2 rounded-sm border border-border/60 bg-surface-sunken/40 p-4">
                <p className="font-heading text-base font-semibold text-foreground">
                  {contact.channels.location.city}
                </p>
                <p className="text-small text-muted-foreground">
                  {contact.channels.location.state}, {contact.channels.location.country}
                </p>
                <p className="mt-3 text-caption text-muted-foreground">
                  {contact.channels.location.note}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <a
                href={contact.channels.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-small font-semibold text-link transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Card 4: Business Hours */}
          <div
            data-reveal-item=""
            className="flex flex-col justify-between rounded-md border border-border bg-card p-6 shadow-xs transition-shadow duration-(--duration-fast) hover:shadow-md"
          >
            <div className="flex flex-col gap-4">
              <IconBadge icon={Clock} size="md" />
              <div>
                <h3 className="font-heading text-h4 font-semibold text-foreground">Studio Hours</h3>
                <p className="mt-1 text-caption text-muted-foreground">
                  Active engineering and real-time consultation window.
                </p>
              </div>

              <div className="mt-2 flex flex-col gap-3 rounded-sm border border-border/60 bg-surface-sunken/40 p-4">
                <div>
                  <span className="text-caption font-medium text-muted-foreground">
                    {contact.channels.hours.days}
                  </span>
                  <p className="font-mono text-small font-semibold text-foreground">
                    {contact.channels.hours.time}
                  </p>
                </div>
                <div>
                  <span className="text-caption text-muted-foreground">
                    {contact.channels.hours.closedDays}
                  </span>
                </div>
                <div className="border-t border-border/60 pt-3">
                  <LiveStatusBadge />
                </div>
              </div>
            </div>
            <p className="mt-4 text-[0.75rem] text-muted-foreground">
              Computed live in IST (UTC+5:30).
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
