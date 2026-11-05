import type { Metadata } from 'next';
import { ArrowLink, Section, SectionHeading } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

/** Custom 404 (PRD 8.10). Served by Cloudflare with HTTP 404 (not_found_handling: "404-page"). */
export default function NotFound() {
  return (
    <Section surface="white" className="min-h-[60dvh]">
      <div className="flex flex-col gap-8">
        <SectionHeading
          as="h1"
          size="h1"
          eyebrow="Error 404"
          title="Page not found"
          lead="The page you were looking for does not exist or has moved. These links will get you back on track."
        />
        <div className="flex flex-wrap gap-6">
          <ArrowLink href="/">Home</ArrowLink>
          <ArrowLink href="/services">Services</ArrowLink>
          <ArrowLink href="/contact">Contact</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
