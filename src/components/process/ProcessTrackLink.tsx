'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { track, type AnalyticsEvent } from '@/lib/analytics';

type ProcessTrackLinkProps = {
  href: string;
  event: AnalyticsEvent;
  params?: Record<string, string | number | undefined>;
  className?: string;
  external?: boolean;
  children: ReactNode;
};

export function ProcessTrackLink({
  href,
  event,
  params,
  className,
  external = false,
  children,
}: ProcessTrackLinkProps) {
  const handleClick = () => track(event, params);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
