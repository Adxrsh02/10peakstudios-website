import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Eyebrow, Section, TwoToneText } from '@/components/ui/primitives';

type StatementBlockProps = {
  eyebrow: string;
  quoteLead: string;
  quoteAccent: string;
  statements: readonly { title: string; body: string }[];
  surface?: 'white' | 'paper';
};

/** Large statement plus numbered principles (PRD 8.1 section 2, Philosophy). */
export function StatementBlock({
  eyebrow,
  quoteLead,
  quoteAccent,
  statements,
  surface = 'white',
}: StatementBlockProps) {
  return (
    <Section surface={surface} aria-labelledby="statement-title">
      <Reveal className="flex flex-col gap-14">
        <div className="flex max-w-4xl flex-col gap-6">
          <div data-reveal-item="">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <SplitHeading className="font-heading text-h1 font-light text-foreground" as="h2">
            <span id="statement-title">
              <TwoToneText text={quoteLead} accent={quoteAccent} />
            </span>
          </SplitHeading>
        </div>
        <ol className="grid gap-8 border-t border-border pt-10 md:grid-cols-3 md:gap-10">
          {statements.map((s, i) => (
            <li key={s.title} data-reveal-item="" className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="font-heading text-h5 font-semibold text-brand-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h4 text-foreground">{s.title}</h3>
              <p className="text-body text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
