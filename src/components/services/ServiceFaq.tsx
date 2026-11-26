'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ServiceFaqItem } from '@/content/services/types';
import { track } from '@/lib/analytics';

type ServiceFaqProps = {
  slug: string;
  eyebrow: string;
  title: string;
  items: ServiceFaqItem[];
};

export function ServiceFaq({ slug, eyebrow, title, items }: ServiceFaqProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="service-faq-heading" className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {eyebrow}
        </span>
        <h2
          id="service-faq-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {title}
        </h2>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={items[0]?.id ?? ''}
        onValueChange={(value) => {
          if (!value) return;
          const idx = items.findIndex((i) => i.id === value);
          track('service_faq_open', { service_slug: slug, faq_index: idx + 1 });
        }}
        className="space-y-3"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="glass-card overflow-hidden rounded-md border border-white/14 px-5 first:border-t"
          >
            <AccordionTrigger className="min-h-14 py-4 font-heading text-body font-semibold text-(--glass-text) [&>span]:border-white/20 [&>span]:text-[#c38bff] [@media(hover:hover)]:hover:text-[#c38bff]">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-body leading-relaxed text-(--glass-text-muted)">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
