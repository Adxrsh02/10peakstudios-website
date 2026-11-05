import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { contactPath } from '@/content/navigation';
import { DesktopNav } from './DesktopNav';
import { HeaderFrame } from './HeaderFrame';
import { MobileNav } from './MobileNav';

type SiteHeaderProps = { whatsappHref: string | null };

/**
 * Global header (PRD 6.3, 6.4; Design.md 10.3). Logo left, centred links, two CTAs right.
 * Logo: 3D horizontal at 40 px height on desktop (artwork ~170 px >= 160 px minimum);
 * flat horizontal at 32 px below 1024 px (artwork ~136 px >= 120 px minimum).
 */
export function SiteHeader({ whatsappHref }: SiteHeaderProps) {
  return (
    <HeaderFrame>
      <div className="container-wide flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="10PeakStudio home" className="shrink-0 rounded-sm">
          <Logo
            variant="horizontal-flat-light"
            lgVariant="horizontal-3d-light"
            decorative
            priority
            className="h-8 w-auto lg:h-10"
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          {whatsappHref && (
            <Button asChild variant="secondary" size="sm" className="hidden lg:inline-flex">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-cta-location="header"
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} />
                WhatsApp us
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={contactPath} data-cta="header-start" data-cta-location="header">
              Start a project
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </Link>
          </Button>
          <MobileNav whatsappHref={whatsappHref} />
        </div>
      </div>
    </HeaderFrame>
  );
}
