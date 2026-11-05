import { Reveal } from '@/components/motion/Reveal';
import { FeatureCard } from '@/components/ui/cards';
import { ICONS } from '@/components/ui/icons';
import { ArrowLink, Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { servicePath } from '@/content/services';
import type { Service } from '@/content/types';

type FeatureTrioProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  services: Service[];
  cta: { label: string; href: string };
  surface?: 'white' | 'paper';
};

/** Compact row of linked service cards (PRD 8.1 section 6, Grow; supporting visual weight). */
export function FeatureTrio({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  services,
  cta,
  surface = 'white',
}: FeatureTrioProps) {
  return (
    <Section surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal className="flex flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id={`${id}-title`}
            eyebrow={eyebrow}
            title={<TwoToneText text={titleLead} accent={titleAccent} />}
            lead={lead}
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:justify-self-end" data-reveal-item="">
            <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
          </div>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <FeatureCard
                icon={ICONS[s.icon]}
                title={s.name}
                description={s.offerings.join(', ') + '.'}
                href={servicePath(s.slug)}
                linkLabel="Learn more"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
