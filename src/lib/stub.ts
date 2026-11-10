import type { Metadata } from 'next';
import { pageMetadata } from './seo';

/** Metadata for stub routes: noindex until the page is built (plan Q3, indexing safety). */
export function stubMetadata(title: string, path: string): Metadata {
  return pageMetadata({
    title,
    path,
    noindex: true,
    description: `${title} at 10PeakStudio, a premium digital innovation and technology studio. This page is being prepared.`,
  });
}
