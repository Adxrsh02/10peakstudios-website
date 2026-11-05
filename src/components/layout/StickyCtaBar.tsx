'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactPath } from '@/content/navigation';
import { cn } from '@/lib/cn';

/**
 * Mobile sticky CTA bar (PRD-NAV-08, Design.md 10.3). Shown below 1024 px after the user scrolls
 * past the first viewport; hidden while the drawer or a dialog is open (body scroll-locked), while
 * the consent banner is open, or while the on-screen keyboard is visible.
 */
export function StickyCtaBar({ whatsappHref }: { whatsappHref: string | null }) {
  const [pastHero, setPastHero] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const vv = window.visualViewport;
    const onViewport = () => {
      if (vv) setKeyboard(window.innerHeight - vv.height > 150);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    vv?.addEventListener('resize', onViewport);
    return () => {
      window.removeEventListener('scroll', onScroll);
      vv?.removeEventListener('resize', onViewport);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const visible = pastHero && !keyboard;

  return (
    <div
      data-sticky-cta=""
      data-visible={visible ? '' : undefined}
      className={cn(
        'fixed inset-x-0 bottom-0 z-(--z-sticky-cta) border-t border-border bg-background/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-[8px] lg:hidden',
        'transition-[transform,visibility] duration-(--duration-base) ease-(--ease-standard)',
        visible ? 'visible translate-y-0' : 'invisible translate-y-full',
      )}
    >
      <div
        className={cn('mx-auto grid max-w-xl gap-3', whatsappHref ? 'grid-cols-2' : 'grid-cols-1')}
      >
        <Button asChild size="md" className="w-full px-4">
          <Link href={contactPath} data-cta="sticky-start" data-cta-location="sticky_bar">
            Start a project
            <ArrowRight aria-hidden="true" strokeWidth={1.75} />
          </Link>
        </Button>
        {whatsappHref && (
          <Button asChild size="md" variant="secondary" className="w-full px-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-cta-location="sticky_bar"
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.75} />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
