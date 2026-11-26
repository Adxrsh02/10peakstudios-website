import { notFound } from 'next/navigation';
import { ExternalLink, GitBranch } from 'lucide-react';
import { ArchitectureShowcase } from '@/components/portfolio/ArchitectureShowcase';
import { CaseStudyAnalyticsTracker } from '@/components/portfolio/CaseStudyAnalyticsTracker';
import { CaseStudyHero } from '@/components/portfolio/CaseStudyHero';
import { CaseStudyToc } from '@/components/portfolio/CaseStudyToc';
import { CaseStudyWorkflow } from '@/components/portfolio/CaseStudyWorkflow';
import { ChallengesSolutions } from '@/components/portfolio/ChallengesSolutions';
import { InShortSummaryStrip } from '@/components/portfolio/InShortSummaryStrip';
import { MarkdownContent } from '@/components/portfolio/MarkdownContent';
import { MetricCounter } from '@/components/portfolio/MetricCounter';
import { ProjectPagination } from '@/components/portfolio/ProjectPagination';
import { ReadingProgressBar } from '@/components/portfolio/ReadingProgressBar';
import { ResearchPaperCard } from '@/components/portfolio/ResearchPaperCard';
import { ScreenshotGallery } from '@/components/portfolio/ScreenshotGallery';
import { TechStackGroups } from '@/components/portfolio/TechStackGroups';
import { TrackedLink } from '@/components/portfolio/TrackedLink';
import { VideoFacade } from '@/components/portfolio/VideoFacade';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/primitives';
import {
  getAdjacentAndRelatedProjects,
  getProjectBySlug,
  getPublishedSlugs,
} from '@/lib/portfolio/loader';
import {
  portfolioCaseStudyBreadcrumbJsonLd,
  portfolioCaseStudyJsonLd,
  portfolioCaseStudyMetadata,
} from '@/lib/seo-portfolio';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return portfolioCaseStudyMetadata(project);
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const byKey = new Map(
    project.sections
      .filter((s) => s.canonicalKey !== 'extra')
      .map((s) => [s.canonicalKey, s] as const),
  );

  const overview = byKey.get('overview');
  const problem = byKey.get('problem');
  const objective = byKey.get('objective');
  const solution = byKey.get('solution');
  const performance = byKey.get('performance');
  const lessonsLearned = byKey.get('lessonsLearned');
  const futureImprovements = byKey.get('futureImprovements');

  const { prev, next, related } = getAdjacentAndRelatedProjects(project.slug);

  return (
    <>
      <ReadingProgressBar targetSelector="#case-study-article" />
      <CaseStudyAnalyticsTracker projectSlug={project.slug} industry={project.industry} />

      <CaseStudyHero project={project} />
      <InShortSummaryStrip project={project} />

      <Section surface="white" aria-label="Case study technical deep dive">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <CaseStudyToc items={project.tocItems} projectSlug={project.slug} />

          <article id="case-study-article" className="flex min-w-0 flex-col gap-14 lg:col-span-9">
            {overview && (
              <section
                id="project-overview"
                aria-labelledby="h-project-overview"
                className="flex flex-col gap-4"
              >
                <h2 id="h-project-overview" className="text-h2 text-foreground">
                  {overview.heading}
                </h2>
                <MarkdownContent blocks={overview.blocks} />
              </section>
            )}

            {problem && (
              <section
                id="problem-statement"
                aria-labelledby="h-problem-statement"
                className="flex flex-col gap-4"
              >
                <h2 id="h-problem-statement" className="text-h2 text-foreground">
                  {problem.heading}
                </h2>
                <MarkdownContent blocks={problem.blocks} />
              </section>
            )}

            {objective && (
              <section
                id="business-objective"
                aria-labelledby="h-business-objective"
                className="flex flex-col gap-4"
              >
                <h2 id="h-business-objective" className="text-h2 text-foreground">
                  {objective.heading}
                </h2>
                <MarkdownContent blocks={objective.blocks} />
              </section>
            )}

            {solution && (
              <section id="solution" aria-labelledby="h-solution" className="flex flex-col gap-4">
                <h2 id="h-solution" className="text-h2 text-foreground">
                  {solution.heading}
                </h2>
                <MarkdownContent blocks={solution.blocks} />
              </section>
            )}

            {project.architecture &&
              (project.architecture.diagrams.length > 0 || project.architecture.mermaid) && (
                <section
                  id="architecture"
                  aria-labelledby="h-architecture"
                  className="flex flex-col gap-4"
                >
                  <h2 id="h-architecture" className="text-h2 text-foreground">
                    System Architecture
                  </h2>
                  <ArchitectureShowcase
                    architecture={project.architecture}
                    projectSlug={project.slug}
                  />
                </section>
              )}

            {project.techList.length > 0 && (
              <section
                id="technology-stack"
                aria-labelledby="h-technology-stack"
                className="flex flex-col gap-5"
              >
                <h2 id="h-technology-stack" className="text-h2 text-foreground">
                  Technology Stack
                </h2>
                <TechStackGroups techStack={project.techStack} />
              </section>
            )}

            {project.features.length > 0 && (
              <section id="features" aria-labelledby="h-features" className="flex flex-col gap-5">
                <h2 id="h-features" className="text-h2 text-foreground">
                  Key Capabilities & Features
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.features.map((feat) => (
                    <div
                      key={feat.title}
                      className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-5"
                    >
                      <h3 className="text-h5 text-primary">{feat.title}</h3>
                      {feat.description && (
                        <p className="text-body text-muted-foreground">{feat.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.workflowSteps.length > 0 && (
              <section
                id="development-workflow"
                aria-labelledby="h-development-workflow"
                className="flex flex-col gap-5"
              >
                <h2 id="h-development-workflow" className="text-h2 text-foreground">
                  Development Workflow
                </h2>
                <CaseStudyWorkflow steps={project.workflowSteps} />
              </section>
            )}

            {project.challenges.length > 0 && (
              <section
                id="challenges-and-solutions"
                aria-labelledby="h-challenges"
                className="flex flex-col gap-5"
              >
                <h2 id="h-challenges" className="text-h2 text-foreground">
                  Challenges & Solutions
                </h2>
                <ChallengesSolutions pairs={project.challenges} />
              </section>
            )}

            {(performance || project.confirmedMetrics.length > 0) && (
              <section
                id="performance"
                aria-labelledby="h-performance"
                className="flex flex-col gap-6"
              >
                <h2 id="h-performance" className="text-h2 text-foreground">
                  Performance & Evaluation
                </h2>
                {project.confirmedMetrics.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {project.confirmedMetrics.map((metric) => (
                      <MetricCounter
                        key={metric.label}
                        value={metric.value}
                        label={metric.label}
                        {...(metric.context ? { context: metric.context } : {})}
                      />
                    ))}
                  </div>
                )}
                {performance && <MarkdownContent blocks={performance.blocks} />}
              </section>
            )}

            {project.gallery.length > 0 && (
              <section
                id="screenshots"
                aria-labelledby="h-screenshots"
                className="flex flex-col gap-5"
              >
                <h2 id="h-screenshots" className="text-h2 text-foreground">
                  Visual Evidence & Screenshots
                </h2>
                <ScreenshotGallery items={project.gallery} projectSlug={project.slug} />
              </section>
            )}

            {project.video && (
              <section
                id="video-demonstration"
                aria-labelledby="h-video"
                className="flex flex-col gap-4"
              >
                <h2 id="h-video" className="text-h2 text-foreground">
                  Video Demonstration
                </h2>
                <VideoFacade video={project.video} projectSlug={project.slug} />
              </section>
            )}

            {project.publication && (
              <section
                id="research-publication"
                aria-labelledby="h-publication"
                className="flex flex-col gap-4"
              >
                <h2 id="h-publication" className="text-h2 text-foreground">
                  Research Publication
                </h2>
                <ResearchPaperCard publication={project.publication} />
              </section>
            )}

            {project.extraSections.map((extra) => (
              <section
                key={extra.id}
                id={extra.id}
                aria-labelledby={`h-${extra.id}`}
                className="flex flex-col gap-4"
              >
                <h2 id={`h-${extra.id}`} className="text-h2 text-foreground">
                  {extra.heading}
                </h2>
                <MarkdownContent blocks={extra.blocks} />
              </section>
            ))}

            {lessonsLearned && (
              <section
                id="lessons-learned"
                aria-labelledby="h-lessons"
                className="flex flex-col gap-4"
              >
                <h2 id="h-lessons" className="text-h2 text-foreground">
                  {lessonsLearned.heading}
                </h2>
                <MarkdownContent blocks={lessonsLearned.blocks} />
              </section>
            )}

            {futureImprovements && (
              <section
                id="future-improvements"
                aria-labelledby="h-future"
                className="flex flex-col gap-4"
              >
                <h2 id="h-future" className="text-h2 text-foreground">
                  {futureImprovements.heading}
                </h2>
                <MarkdownContent blocks={futureImprovements.blocks} />
              </section>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-surface-sunken p-5">
                <span className="mr-auto font-heading text-h5 text-foreground">
                  Project Repositories & Links
                </span>
                {project.githubUrl && (
                  <Button asChild variant="secondary" size="md">
                    <TrackedLink
                      href={project.githubUrl}
                      external
                      event="github_click"
                      params={{ project_slug: project.slug, location: 'case_study_links' }}
                    >
                      <GitBranch aria-hidden="true" strokeWidth={1.75} />
                      GitHub Repository
                    </TrackedLink>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild size="md">
                    <TrackedLink
                      href={project.liveUrl}
                      external
                      event="live_demo_click"
                      params={{ project_slug: project.slug, location: 'case_study_links' }}
                    >
                      Live Demo
                      <ExternalLink aria-hidden="true" strokeWidth={1.75} />
                    </TrackedLink>
                  </Button>
                )}
              </div>
            )}
          </article>
        </div>
      </Section>

      <ProjectPagination
        capabilities={project.capabilities}
        prev={prev}
        next={next}
        related={related}
      />

      <JsonLd
        data={[portfolioCaseStudyJsonLd(project), portfolioCaseStudyBreadcrumbJsonLd(project)]}
      />
    </>
  );
}
