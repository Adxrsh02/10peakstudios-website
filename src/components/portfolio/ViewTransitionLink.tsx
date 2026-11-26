'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMotion } from '@/components/motion/MotionProvider';

type ViewTransitionLinkProps = {
  href: string;
  transitionSlug?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  children: ReactNode;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> };
};

/**
 * Progressive View Transitions wrapper for card -> case study thumbnail continuity.
 * Falls back cleanly to standard Next Link navigation at Tier 0 or unsupported browsers.
 */
export function ViewTransitionLink({
  href,
  transitionSlug,
  className,
  ariaLabel,
  onClick,
  children,
}: ViewTransitionLinkProps) {
  const router = useRouter();
  const { tier } = useMotion();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (
      tier === 0 ||
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    const doc = document as DocumentWithViewTransition;
    if (typeof doc.startViewTransition !== 'function') return;

    e.preventDefault();
    const targetMedia = transitionSlug
      ? document.querySelector<HTMLElement>(`[data-vt-slug="${transitionSlug}"]`)
      : null;

    if (targetMedia) {
      targetMedia.style.viewTransitionName = 'tps-case-hero';
    }

    const transition = doc.startViewTransition(() => {
      router.push(href);
    });

    void transition.finished.finally(() => {
      if (targetMedia) targetMedia.style.viewTransitionName = '';
    });
  };

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
