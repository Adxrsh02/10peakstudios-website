'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Fires GA4 case_study_view once per page visit (no-op until consented). */
export function CaseStudyAnalyticsTracker({
  projectSlug,
  industry,
}: {
  projectSlug: string;
  industry: string;
}) {
  useEffect(() => {
    track('case_study_view', { project_slug: projectSlug, industry });
  }, [projectSlug, industry]);

  return null;
}
