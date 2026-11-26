import { Section } from '@/components/ui/primitives';
import type { PortfolioProject } from '@/lib/portfolio/loader';

type InShortSummaryStripProps = {
  project: PortfolioProject;
};

/**
 * GEO/AEO Answer-Ready "In Short" block + 5-cell At-a-Glance metadata strip.
 */
export function InShortSummaryStrip({ project }: InShortSummaryStripProps) {
  const topTech = project.techList.slice(0, 4).join(', ');
  const atAGlance = [
    { label: 'Industry', value: project.industry },
    { label: 'Our Role', value: project.role },
    { label: 'Timeline', value: `${project.duration} (${project.year})` },
    { label: 'Platform', value: project.platform },
    { label: 'Core Stack', value: topTech },
  ];

  return (
    <Section
      surface="paper"
      roundedTop
      className="-mt-8 pt-12 pb-12 sm:-mt-10 sm:pt-14 sm:pb-16"
      aria-labelledby="in-short-heading"
    >
      <div className="flex flex-col gap-8">
        <div className="rounded-md border border-l-4 border-border border-l-primary bg-card p-6 shadow-sm sm:p-7">
          <p
            id="in-short-heading"
            className="mb-2 font-sans text-[0.8125rem] font-semibold tracking-[0.12em] text-brand-accent uppercase"
          >
            In Short
          </p>
          <p className="max-w-[74ch] text-body-lg text-foreground">{project.inShort}</p>
        </div>

        <dl className="grid grid-cols-1 gap-4 rounded-md border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:p-6">
          {atAGlance.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 border-b border-border pb-3 last:border-b-0 last:pb-0 lg:border-r lg:border-b-0 lg:pr-4 lg:pb-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <dt className="text-caption font-medium tracking-[0.06em] text-muted-foreground uppercase">
                {item.label}
              </dt>
              <dd className="text-small font-semibold text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
