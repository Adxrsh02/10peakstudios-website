import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Calendar, Clock, ExternalLink, GitBranch, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEAM_MEMBERS } from '@/content/team';
import type { PortfolioProject } from '@/lib/portfolio/loader';
import { TrackedLink } from './TrackedLink';

const TYPE_LABELS: Record<PortfolioProject['type'], string> = {
  client: 'Client project',
  'in-house': 'In-house build',
  concept: 'Concept',
};

type CaseStudyHeroProps = {
  project: PortfolioProject;
};

/**
 * Obsidian Case Study Hero (.surface-inverse). Renders H1 immediately (RUL-MOT-03),
 * shows conditional public GitHub/Live links only, and respects medical/research disclaimers.
 */
export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const resolvedMembers = project.teamMembers
    .map((id) => TEAM_MEMBERS.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section
      aria-labelledby="case-study-heading"
      className="surface-inverse relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <div
        aria-hidden="true"
        className="glow-violet pointer-events-none absolute -top-24 left-1/2 -z-10 h-[32rem] w-[min(64rem,115vw)] -translate-x-1/2"
      />

      <div className="container-content flex flex-col gap-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-small text-muted-foreground">
            <li>
              <Link
                href="/"
                className="transition-colors [@media(hover:hover)]:hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/portfolio"
                className="transition-colors [@media(hover:hover)]:hover:text-foreground"
              >
                Portfolio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="max-w-[34ch] truncate font-medium text-foreground">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Narrative */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-pill border border-border bg-card px-3 py-1 text-caption font-medium text-link">
                {project.industry}
              </span>
              <span className="rounded-pill border border-border bg-card px-3 py-1 text-caption font-medium text-foreground">
                {TYPE_LABELS[project.type]}
              </span>
              <span className="rounded-pill border border-border bg-card px-3 py-1 text-caption font-medium text-foreground">
                {project.statusNote ? `${project.status} · ${project.statusNote}` : project.status}
              </span>
              <span className="rounded-pill border border-border bg-card px-3 py-1 text-caption font-medium text-muted-foreground">
                {project.complexity}
              </span>
            </div>

            {project.clientPermission && project.clientName && (
              <p className="text-small font-medium text-link">Client: {project.clientName}</p>
            )}

            <h1 id="case-study-heading" className="text-h1 text-foreground">
              {project.title}
            </h1>

            <p className="max-w-[58ch] text-body-lg text-muted-foreground">{project.tagline}</p>

            {/* Year, Duration & Team Credits */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-small text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar
                  className="size-4 text-brand-accent"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span className="price">{project.year}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-brand-accent" aria-hidden="true" strokeWidth={1.75} />
                <span>{project.duration}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="size-4 text-brand-accent" aria-hidden="true" strokeWidth={1.75} />
                <span>
                  {resolvedMembers.length > 0
                    ? resolvedMembers.map((m) => m.name).join(', ')
                    : project.teamSummary}
                </span>
              </span>
            </div>

            {/* Medical / Research Compliance Disclaimer (if present) */}
            {project.disclaimer && (
              <div
                role="note"
                className="flex items-start gap-3 rounded-md border border-warning-inverse/40 bg-card/80 px-4 py-3 text-small text-foreground"
              >
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-warning-inverse"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span>{project.disclaimer}</span>
              </div>
            )}

            {/* Public Links (Rendered only if verified public URL exists) */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="mt-2 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button asChild size="md">
                    <TrackedLink
                      href={project.liveUrl}
                      external
                      event="live_demo_click"
                      params={{ project_slug: project.slug, location: 'case_study_hero' }}
                    >
                      Live Demo
                      <ExternalLink aria-hidden="true" strokeWidth={1.75} />
                    </TrackedLink>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant={project.liveUrl ? 'secondary' : 'primary'} size="md">
                    <TrackedLink
                      href={project.githubUrl}
                      external
                      event="github_click"
                      params={{ project_slug: project.slug, location: 'case_study_hero' }}
                    >
                      <GitBranch aria-hidden="true" strokeWidth={1.75} />
                      View Repository
                    </TrackedLink>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
              <Image
                src={project.heroImage.url}
                alt={project.heroImage.alt}
                width={project.heroImage.width}
                height={project.heroImage.height}
                priority
                sizes="(max-width: 1023px) 100vw, 42vw"
                data-vt-slug={`case-hero-${project.slug}`}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
