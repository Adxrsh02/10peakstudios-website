'use client';

import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { isGlassServiceRoute } from '@/content/services/glass-routes';

/**
 * Selects the light-ink Logo variant across the site and swaps cleanly to `horizontal-3d-dark`
 * on dark-glass service routes driven by `glass-routes.ts`.
 */
export function SiteLogo({ variantOverride }: { variantOverride?: 'default' | 'dark-glass' }) {
  const pathname = usePathname();
  const isDarkGlass =
    variantOverride === 'dark-glass' ||
    (variantOverride !== 'default' && isGlassServiceRoute(pathname));

  if (isDarkGlass) {
    return <Logo variant="horizontal-3d-dark" decorative priority className="h-8 w-auto lg:h-10" />;
  }

  return (
    <Logo
      variant="horizontal-flat-light"
      lgVariant="horizontal-3d-light"
      decorative
      priority
      className="h-8 w-auto lg:h-10"
    />
  );
}
