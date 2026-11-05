import { Reveal } from '@/components/motion/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import type { Faq } from '@/content/types';

type FaqSectionProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead?: string;
  faqs: readonly Faq[];
  surface?: 'white' | 'paper';
};

/**
 * FAQ (PRD 8.1 section 11, Design.md 10.8). Answers stay in the DOM for search engines and match the
 * FAQPage JSON-LD built from the same content.
 */
export function FaqSection({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  faqs,
  surface = 'paper',
}: FaqSectionProps) {
  return (
    <Section surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={<TwoToneText text={titleLead} accent={titleAccent} />}
          lead={lead}
          className="lg:col-span-4"
        />
        <div className="lg:col-span-8" data-reveal-item="">
          <Accordion type="multiple">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{f.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </Section>
  );
}
