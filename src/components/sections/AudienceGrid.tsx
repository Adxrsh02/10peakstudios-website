import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { ICONS } from '@/components/ui/icons';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import type { IconKey } from '@/content/types';

type AudienceGridProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  items: readonly { icon: IconKey; label: string }[];
  cta: { label: string; href: string };
  surface?: 'white' | 'paper';
};

/** Who we work with (PRD 8.1 section 8): facts from the Company_info audience list. */
export function AudienceGrid({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  items,
  cta,
  surface = 'white',
}: AudienceGridProps) {
  return (
    <Section surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal className="flex flex-col gap-12">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={<TwoToneText text={titleLead} accent={titleAccent} />}
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.label}
                data-reveal-item=""
                className="flex flex-col gap-4 rounded-md border border-border bg-card p-5 sm:p-6"
              >
                <Icon aria-hidden="true" strokeWidth={1.75} className="size-8 text-brand-accent" />
                <span className="text-body font-semibold text-foreground">{item.label}</span>
              </li>
            );
          })}
        </ul>
        <div data-reveal-item="">
          <Button asChild size="md">
            <Link href={cta.href} data-cta="audience-start" data-cta-location="audience">
              {cta.label}
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
