import { DrawLine } from '@/components/motion/DrawLine';
import { Reveal } from '@/components/motion/Reveal';
import { FeatureCard } from '@/components/ui/cards';
import { ICONS } from '@/components/ui/icons';
import {
  ArrowLink,
  Eyebrow,
  Section,
  SectionHeading,
  TwoToneText,
} from '@/components/ui/primitives';
import type { IconKey } from '@/content/types';

type UseCaseShowcaseProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  examplesLabel: string;
  examples: readonly { icon: IconKey; title: string; body: string }[];
  cta: { label: string; href: string };
};

/** Arrow-rise workflow line linking nodes (decorative "arrow draw" motif). */
function WorkflowLine() {
  return (
    <DrawLine className="hidden md:block">
      <svg viewBox="0 0 1000 60" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient
            id="wf-rise"
            x1="0"
            y1="0"
            x2="1000"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" style={{ stopColor: 'var(--color-deep-violet)' }} />
            <stop offset="0.25" style={{ stopColor: 'var(--color-rise-mid)' }} />
            <stop offset="0.6" style={{ stopColor: 'var(--color-rise-high)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-lilac-spark)' }} />
          </linearGradient>
        </defs>
        <path d="M20 30 H960" stroke="url(#wf-rise)" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M950 18 L976 30 L950 42"
          className="stroke-lilac-spark"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[125, 375, 625, 875].map((x) => (
          <g key={x}>
            <circle
              cx={x}
              cy="30"
              r="13"
              className="fill-ink"
              stroke="url(#wf-rise)"
              strokeWidth="3"
            />
            <circle cx={x} cy="30" r="4" className="fill-lilac-spark" />
          </g>
        ))}
      </svg>
    </DrawLine>
  );
}

/**
 * Obsidian showcase of example use cases (PRD 8.1 section 5, Automate spotlight). Cards are
 * labelled as examples, never client work (RUL-CNT-05). Accent text uses the inverse link token on Ink cards.
 */
export function UseCaseShowcase({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  examplesLabel,
  examples,
  cta,
}: UseCaseShowcaseProps) {
  return (
    <Section
      surface="inverse"
      aria-labelledby={`${id}-title`}
      className="rounded-[2rem] sm:rounded-[2.5rem]"
    >
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
        <div className="flex flex-col gap-6">
          <div data-reveal-item="">
            <Eyebrow variant="dot">{examplesLabel}</Eyebrow>
          </div>
          <WorkflowLine />
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {examples.map((e, i) => (
              <li key={e.title}>
                <FeatureCard
                  icon={ICONS[e.icon]}
                  title={e.title}
                  description={e.body}
                  index={String(i + 1).padStart(2, '0')}
                />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
