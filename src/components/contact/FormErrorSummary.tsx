'use client';

import { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

type ErrorSummaryProps = {
  errors: Record<string, string>;
};

export function FormErrorSummary({ errors }: ErrorSummaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const entries = Object.entries(errors);

  useEffect(() => {
    if (entries.length > 0 && containerRef.current) {
      containerRef.current.focus();
    }
  }, [entries.length]);

  if (entries.length === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-destructive"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
        <h3
          id="error-summary-title"
          className="font-heading text-small font-semibold text-destructive"
        >
          There was a problem with your submission
        </h3>
      </div>
      <ul className="mt-2.5 list-disc space-y-1 pl-5 text-caption text-foreground">
        {entries.map(([field, msg]) => (
          <li key={field}>
            <a
              href={`#${field}`}
              className="text-foreground underline underline-offset-2 hover:text-destructive focus-visible:ring-1 focus-visible:ring-destructive focus-visible:outline-none"
            >
              {msg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
