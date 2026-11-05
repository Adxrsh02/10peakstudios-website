import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { ICONS } from '@/components/ui/icons';
import {
  ArrowLink,
  IconBadge,
  Section,
  SectionHeading,
  TwoToneText,
} from '@/components/ui/primitives';
import type { IconKey } from '@/content/types';
import { cn } from '@/lib/cn';

type SplitFeatureProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  items: readonly { icon: IconKey; title: string; body: string }[];
  cta: { label: string; href: string };
  visual: ReactNode;
  reverse?: boolean;
  surface?: 'white' | 'paper';
};

/** Text plus capabilities on one side, a visual on the other (PRD 8.1 section 4, Build spotlight). */
export function SplitFeature({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  items,
  cta,
  visual,
  reverse = false,
  surface = 'white',
}: SplitFeatureProps) {
  return (
    <Section surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={cn('flex flex-col gap-10 lg:col-span-6', reverse && 'lg:order-2')}>
          <SectionHeading
            id={`${id}-title`}
            eyebrow={eyebrow}
            title={<TwoToneText text={titleLead} accent={titleAccent} />}
            lead={lead}
          />
          <ul className="grid gap-6 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.title} data-reveal-item="" className="flex gap-4">
                <IconBadge icon={ICONS[item.icon]} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-h5 text-foreground">{item.title}</h3>
                  <p className="text-small text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal-item="">
            <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
          </div>
        </div>
        <div className={cn('lg:col-span-6', reverse && 'lg:order-1')} data-reveal-item="">
          {visual}
        </div>
      </Reveal>
    </Section>
  );
}
