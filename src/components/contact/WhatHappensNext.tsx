import { ShieldCheck } from 'lucide-react';
import { contact } from '@/content/contact';

export function WhatHappensNext() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface-sunken/40 p-6 sm:p-8">
      <div>
        <p className="text-[0.8125rem] font-medium tracking-[0.12em] text-primary uppercase">
          {contact.whatHappensNext.eyebrow}
        </p>
        <h3 className="mt-1 font-heading text-h3 font-semibold text-foreground">
          {contact.whatHappensNext.title}
        </h3>
        <p className="mt-1.5 text-small text-muted-foreground">{contact.whatHappensNext.lead}</p>
      </div>

      <ol className="flex flex-col gap-5 border-t border-border/60 pt-5">
        {contact.whatHappensNext.steps.map((step) => (
          <li key={step.number} className="flex items-start gap-4">
            <span
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm bg-primary/10 font-mono text-small font-bold text-primary"
              aria-hidden="true"
            >
              {step.number}
            </span>
            <div className="flex flex-col gap-1">
              <h4 className="font-heading text-small font-semibold text-foreground">
                {step.title}
              </h4>
              <p className="text-caption leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-2 flex items-start gap-3 rounded-sm border border-border/60 bg-background p-4 text-caption text-muted-foreground">
        <ShieldCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <strong className="text-foreground">Confidentiality Assured:</strong> We respect
          intellectual property. Mutual NDAs are readily executed before proprietary system reviews.
        </div>
      </div>
    </div>
  );
}
