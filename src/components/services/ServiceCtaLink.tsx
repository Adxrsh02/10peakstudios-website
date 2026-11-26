'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';

type ServiceCtaLinkProps = {
  href: string;
  serviceSlug: string;
  position: string;
  className?: string;
  children: ReactNode;
};

/**
 * Client link helper for service CTAs so `service_cta_click` receives both `service_slug` and
 * `position` without modifying shared `AnalyticsScripts`.
 */
export function ServiceCtaLink({
  href,
  serviceSlug,
  position,
  className,
  children,
}: ServiceCtaLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => track('service_cta_click', { service_slug: serviceSlug, position })}
      className={className}
    >
      {children}
    </Link>
  );
}
