import { Reveal } from '@/components/motion/Reveal';
import { PillarCard } from '@/components/ui/cards';
import { ICONS } from '@/components/ui/icons';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { pillarHref } from '@/content/navigation';
import { pillars, servicePath, servicesByPillar } from '@/content/services';
import type { PillarId } from '@/content/types';
import { cn } from '@/lib/cn';

type PillarBentoProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead?: string;
};

const SPAN: Record<PillarId, string> = {
  build: 'lg:col-span-7',
  automate: 'lg:col-span-5',
  grow: 'lg:col-span-12',
};

/** Row of the pillar's service icons (decorative, shows what the pillar contains). */
function PillarIcons({ id }: { id: PillarId }) {
  return (
    <div className="flex gap-2">
      {servicesByPillar(id).map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <span
            key={s.slug}
            className={cn(
              'grid size-11 place-items-center rounded-sm border',
              id === 'grow'
                ? 'border-border bg-background text-brand-accent'
                : 'border-transparent bg-band text-white',
            )}
          >
            <Icon strokeWidth={1.75} className="size-5" />
          </span>
        );
      })}
    </div>
  );
}

/** Bento grid of the three pillars (PRD 8.1 section 3). Build and Automate lead; Grow supports. */
export function PillarBento({ eyebrow, titleLead, titleAccent, lead }: PillarBentoProps) {
  return (
    <Section surface="paper" aria-labelledby="pillars-title">
      <Reveal className="flex flex-col gap-12">
        <SectionHeading
          id="pillars-title"
          eyebrow={eyebrow}
          title={<TwoToneText text={titleLead} accent={titleAccent} />}
          lead={lead}
        />
        <div className="grid gap-5 lg:grid-cols-12">
          {pillars.map((p) => (
            <PillarCard
              key={p.id}
              eyebrow={p.name}
              title={p.title}
              description={p.description}
              emphasis={p.role}
              className={SPAN[p.id]}
              visual={<PillarIcons id={p.id} />}
              links={servicesByPillar(p.id).map((s) => ({
                label: s.name,
                href: servicePath(s.slug),
              }))}
              cta={{ label: `All ${p.name} services`, href: pillarHref(p.id) }}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
