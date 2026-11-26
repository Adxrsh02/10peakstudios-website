import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { PORTFOLIO_COPY, PORTFOLIO_WORKFLOW_STEPS } from '@/content/portfolio-config';

/**
 * Seven-stage engineering workflow band on Paper surface.
 * Uses semantic ordered list <ol> for screen reader and DOM structure fidelity.
 */
export function EngineeringWorkflowBand() {
  return (
    <Section surface="paper" aria-labelledby="engineering-approach-heading">
      <Reveal className="flex flex-col gap-12">
        <SectionHeading
          id="engineering-approach-heading"
          eyebrow={PORTFOLIO_COPY.approach.eyebrow}
          title={
            <TwoToneText
              text={PORTFOLIO_COPY.approach.titleLead}
              accent={PORTFOLIO_COPY.approach.titleAccent}
            />
          }
          lead={PORTFOLIO_COPY.approach.lead}
        />

        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {PORTFOLIO_WORKFLOW_STEPS.map((step, index) => (
            <li
              key={step.number}
              data-reveal-item=""
              className="relative flex flex-col gap-3 rounded-md border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-pill border border-primary/30 bg-surface-sunken font-heading text-small font-semibold text-primary"
                >
                  {step.number}
                </span>
                {index < PORTFOLIO_WORKFLOW_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-0.5 flex-1 rounded-pill bg-arrow-rise xl:block"
                  />
                )}
              </div>
              <h3 className="text-h5 text-foreground">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="text-small text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
