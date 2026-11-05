import { ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { CalloutCard } from '@/components/ui/cards';
import { Section } from '@/components/ui/primitives';

type CalloutSectionProps = {
  title: string;
  body: string;
  cta: { label: string; href: string };
  surface?: 'white' | 'paper';
};

/** Narrow callout (PRD 8.1 section 10, Security teaser). Implemented controls only (PRD-SEC-01). */
export function CalloutSection({ title, body, cta, surface = 'white' }: CalloutSectionProps) {
  return (
    <Section surface={surface} aria-labelledby="callout-title">
      <Reveal className="mx-auto max-w-4xl">
        <CalloutCard
          icon={ShieldCheck}
          title={title}
          body={body}
          cta={cta}
          headingLevel="h2"
          headingId="callout-title"
        />
      </Reveal>
    </Section>
  );
}
