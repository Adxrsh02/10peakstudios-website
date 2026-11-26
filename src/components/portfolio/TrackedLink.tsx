'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { track, type AnalyticsEvent } from '@/lib/analytics';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  params: Record<string, string | number | undefined>;
  external?: boolean;
};

/** Thin analytics click tracker preserving Server Components as parents. */
export function TrackedLink({
  event,
  params,
  external = false,
  href,
  children,
  ...rest
}: TrackedLinkProps) {
  const onClick = () => track(event, params);

  if (external && typeof href === 'string') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={rest.className}
        aria-label={rest['aria-label']}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
