import { PinnedSteps } from '@/components/motion/PinnedSteps';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowLink, Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';

type ProcessStepsProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  steps: readonly { title: string; body: string }[];
  cta?: { label: string; href: string };
  surface?: 'white' | 'paper';
};

/**
 * Process (PRD 8.1 section 7, Design.md 10.6). Always an <ol> in the DOM (PRD-PRC-01).
 * Mobile: vertical timeline. Tablet/desktop default: grid. Tier 2 at >= 1024 px: PinnedSteps adds
 * data-pinned and the track becomes a pinned horizontal sequence with an Arrow-rise progress line.
 */
export function ProcessSteps({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  steps,
  cta,
  surface = 'paper',
}: ProcessStepsProps) {
  return (
    <Section surface={surface} aria-labelledby={`${id}-title`} bare padded={false}>
      <PinnedSteps className="group/pin py-section data-pinned:flex data-pinned:min-h-dvh data-pinned:flex-col data-pinned:justify-center">
        <Reveal className="container-content flex flex-col gap-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id={`${id}-title`}
              eyebrow={eyebrow}
              title={<TwoToneText text={titleLead} accent={titleAccent} />}
              className="lg:col-span-8"
            />
            {cta && (
              <div className="lg:col-span-4 lg:justify-self-end" data-reveal-item="">
                <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
              </div>
            )}
          </div>

          <div className="relative">
            {/* Progress line (pinned mode only) */}
            <div className="mb-8 hidden h-0.5 w-full overflow-hidden rounded-pill bg-border group-data-pinned/pin:block">
              <div data-pin-progress="" className="h-full w-full origin-left bg-arrow-rise" />
            </div>

            <div data-pin-viewport="" className="group-data-pinned/pin:overflow-visible">
              {/* Mobile timeline line */}
              <div
                data-pin-line=""
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[1.1875rem] w-0.5 origin-top bg-arrow-rise-vertical md:hidden"
              />
              <ol
                data-pin-track=""
                className="relative grid gap-8 group-data-pinned/pin:flex group-data-pinned/pin:w-max group-data-pinned/pin:gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
              >
                {steps.map((step, i) => (
                  <li
                    key={step.title}
                    data-reveal-item=""
                    className="relative flex gap-5 group-data-pinned/pin:w-[24rem] group-data-pinned/pin:shrink-0 md:flex-col md:gap-6 md:rounded-md md:border md:border-border md:bg-card md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="relative z-10 grid size-10 shrink-0 place-items-center rounded-pill border-2 border-primary bg-background font-heading text-small font-semibold text-primary md:size-12 md:text-body"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-2 pb-2">
                      <h3 className="text-h4 text-foreground">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="text-body text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </PinnedSteps>
    </Section>
  );
}
