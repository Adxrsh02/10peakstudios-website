'use client';

import { useState, type ReactNode } from 'react';
import { Check, Link2 } from 'lucide-react';

type LegalSectionProps = {
  id: string;
  number: string;
  title: string;
  inShort: string;
  children: ReactNode;
};

/**
 * Accessible legal clause section with anchor link + copy-link button and "In short" summary.
 */
export function LegalSection({ id, number, title, inShort, children }: LegalSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, '', `#${id}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.hash = id;
    }
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-b border-border pb-10 last:border-b-0 last:pb-0"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id={`${id}-heading`} className="text-h3 text-foreground">
          <a href={`#${id}`} className="hover:underline focus-visible:rounded-sm">
            <span className="price mr-2 text-primary">{number}.</span>
            {title}
          </a>
        </h2>

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={`Copy direct link to section ${number}: ${title}`}
          className="no-print grid size-11 shrink-0 place-items-center rounded-sm border border-border bg-surface-sunken text-muted-foreground transition-colors [@media(hover:hover)]:hover:border-primary/40 [@media(hover:hover)]:hover:text-primary"
        >
          {copied ? (
            <Check className="size-4 text-success" aria-hidden="true" strokeWidth={1.75} />
          ) : (
            <Link2 className="size-4" aria-hidden="true" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? `Copied link to ${title}` : ''}
      </span>

      <div className="mt-4 rounded-r-md border border-l-4 border-border border-l-primary bg-surface-sunken px-4 py-3">
        <p className="max-w-[70ch] text-small text-foreground">
          <strong className="font-semibold text-primary">In short:</strong> {inShort}
        </p>
      </div>

      <div className="mt-5 flex max-w-[70ch] flex-col gap-4 text-body text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
