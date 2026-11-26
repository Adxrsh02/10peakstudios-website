import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/primitives';
import type { PortfolioCardData } from '@/lib/portfolio/loader';
import { ViewTransitionLink } from './ViewTransitionLink';

const TYPE_LABEL: Record<PortfolioCardData['type'], string> = {
  client: 'Client project',
  'in-house': 'In-house build',
  concept: 'Concept',
};

type FeaturedCaseStudyProps = {
  project: PortfolioCardData;
};

/**
 * Elevated Ink (#14111E) inset showcase inside Paper band, keeping total Obsidian bands <= 2 (Design.md 6.5).
 */
export function FeaturedCaseStudy({ project }: FeaturedCaseStudyProps) {
  const href = `/portfolio/${project.slug}`;
  const visibleTech = project.techList.slice(0, 5);
  const extraCount = Math.max(0, project.techList.length - visibleTech.length);

  return (
    <Section
      surface="paper"
      roundedTop
      className="-mt-8 pt-12 sm:-mt-10 sm:pt-16"
      aria-labelledby="featured-case-heading"
    >
      <div className="overflow-hidden rounded-lg border border-inverse-rule bg-ink text-summit-white shadow-lg">
        <div className="grid items-center lg:grid-cols-12">
          {/* Left: High-aspect Cloudinary Preview */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-inverse-rule bg-obsidian lg:col-span-7 lg:h-full lg:border-r lg:border-b-0">
            <ViewTransitionLink
              href={href}
              transitionSlug={`featured-${project.slug}`}
              ariaLabel={`Read featured case study: ${project.title}`}
              className="group block size-full"
            >
              <Image
                src={project.thumbnail.url}
                alt={project.thumbnail.alt}
                width={project.thumbnail.width}
                height={project.thumbnail.height}
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                data-vt-slug={`featured-${project.slug}`}
                className="size-full object-cover transition-transform duration-(--duration-base) ease-(--ease-standard) [@media(hover:hover)]:group-hover:scale-[1.03]"
              />
            </ViewTransitionLink>
          </div>

          {/* Right: Engineering Narrative */}
          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-inverse-rule bg-obsidian px-3 py-1 text-caption font-medium text-inverse-link">
                <Sparkles className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                Featured Case Study
              </span>
              <span className="rounded-pill border border-inverse-rule px-3 py-1 text-caption font-medium text-inverse-muted">
                {project.industry}
              </span>
              <span className="rounded-pill border border-inverse-rule px-3 py-1 text-caption font-medium text-inverse-muted">
                {TYPE_LABEL[project.type]}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h2 id="featured-case-heading" className="text-h3 text-summit-white">
                {project.title}
              </h2>
              <p className="text-body font-medium text-inverse-link">{project.tagline}</p>
              <p className="text-body text-inverse-muted">{project.shortDescription}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {visibleTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-pill border border-inverse-rule bg-obsidian/70 px-3 py-1 text-caption text-summit-white"
                >
                  {tech}
                </span>
              ))}
              {extraCount > 0 && (
                <span className="rounded-pill border border-inverse-rule bg-obsidian/70 px-3 py-1 text-caption text-inverse-muted">
                  +{extraCount}
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button asChild size="md">
                <ViewTransitionLink href={href} transitionSlug={`featured-${project.slug}`}>
                  Read case study
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} />
                </ViewTransitionLink>
              </Button>
              <span className="text-small text-inverse-muted">
                {project.complexity} &middot; {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
