import type { ReactNode } from 'react';
import { ArrowLink, Section, SectionHeading } from '@/components/ui/primitives';

type StubPageProps = { title: string; prd: string; eyebrow?: string; children?: ReactNode };

/**
 * Temporary page shell for routes linked from the landing page but not built yet (plan Q3).
 * Routes using it are noindex and excluded from the sitemap; replace page by page.
 */
export function StubPage({ title, prd, eyebrow, children }: StubPageProps) {
  return (
    <Section surface="white" className="min-h-[60dvh]">
      <div className="flex flex-col gap-8">
        <SectionHeading as="h1" size="h1" eyebrow={eyebrow ?? '10PeakStudio'} title={title} />
        <p className="max-w-[60ch] text-body-lg text-muted-foreground">
          {`[PLACEHOLDER: ${title} page content, specified in PRD.md section ${prd}]`}
        </p>
        {children}
        <div className="flex flex-wrap gap-6">
          <ArrowLink href="/">Back to home</ArrowLink>
          <ArrowLink href="/contact">Start a project</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
