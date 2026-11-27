'use client';

import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ResolvedProcessContent } from '@/content/process';
import { track } from '@/lib/analytics';

type ProcessFaqProps = {
  faq: ResolvedProcessContent['faq'];
};

export function ProcessFaq({ faq }: ProcessFaqProps) {
  const defaultOpenIds = faq.items.filter((item) => item.defaultOpen).map((item) => item.id);
  const openIdsRef = useRef<Set<string>>(new Set(defaultOpenIds));

  const handleValueChange = (nextIds: string[]) => {
    for (const id of nextIds) {
      if (!openIdsRef.current.has(id)) {
        const faqIndex = faq.items.findIndex((item) => item.id === id);
        if (faqIndex >= 0) {
          track('process_faq_open', { faq_index: faqIndex + 1 });
        }
      }
    }
    openIdsRef.current = new Set(nextIds);
  };

  return (
    <section
      aria-labelledby="process-faq-heading"
      className="border-t border-(--ascent-glass-border) bg-(--ascent-white) py-section text-(--ascent-ink)"
    >
      <div className="container-content">
        <div className="mb-10 max-w-2xl lg:mb-12">
          <span className="mb-2 block font-mono text-caption font-medium tracking-[0.08em] text-(--color-deep-violet) uppercase">
            [ {faq.eyebrow} ]
          </span>
          <h2
            id="process-faq-heading"
            className="m-0 font-heading text-h2 font-bold tracking-tight text-(--ascent-ink)"
          >
            {faq.title}
          </h2>
        </div>

        <div className="max-w-3xl">
          <Accordion
            type="multiple"
            defaultValue={defaultOpenIds}
            onValueChange={handleValueChange}
            className="space-y-3"
          >
            {faq.items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="overflow-hidden rounded-2xl border border-(--ascent-glass-border) bg-(--ascent-paper) px-5 sm:px-6"
              >
                <AccordionTrigger className="py-5 text-left font-heading text-h5 font-semibold text-(--ascent-ink) hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-body leading-relaxed text-(--ascent-ink-muted)">
                  <p className="m-0">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
