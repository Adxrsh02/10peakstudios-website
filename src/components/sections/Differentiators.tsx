import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';

type DifferentiatorsProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead?: string;
  items: readonly { title: string; body: string }[];
  surface?: 'white' | 'paper';
};

/**
 * Why 10PeakStudio (PRD 8.1 section 9). Heading block is CSS-sticky on desktop (no JS pin).
 * Every point must be true at launch; no metrics.
 */
export function Differentiators({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  items,
  surface = 'paper',
}: DifferentiatorsProps) {
  return (
    <Section surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id={`${id}-title`}
              eyebrow={eyebrow}
              title={<TwoToneText text={titleLead} accent={titleAccent} />}
              lead={lead}
            />
          </div>
        </div>
        <ol className="flex flex-col lg:col-span-7">
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal-item=""
              className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-7 last:border-b sm:grid-cols-[4rem_1fr] sm:gap-6"
            >
              <span
                aria-hidden="true"
                className="font-heading text-h4 font-semibold text-brand-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h4 text-foreground">{item.title}</h3>
                <p className="text-body text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
