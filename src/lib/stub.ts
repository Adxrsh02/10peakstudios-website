import type { Metadata } from 'next';
import { pageMetadata } from './seo';

/** Metadata for stub routes: public pages indexed per GSC requirements (PRD-SEO-03). */
export function stubMetadata(title: string, path: string): Metadata {
  return pageMetadata({
    title,
    path,
    noindex: false,
    description: `${title} at 10PeakStudio, a premium digital innovation and technology studio that designs and engineers websites, full-stack web applications and AI automation.`,
  });
}
