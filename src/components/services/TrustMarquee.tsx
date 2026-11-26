import type { TrustMarqueeData } from '@/content/services/types';
import { Marquee } from './motion/Marquee';

export function TrustMarquee({ marquee }: { marquee: TrustMarqueeData }) {
  return (
    <section aria-label={marquee.label}>
      <Marquee label={marquee.label} items={marquee.items} />
    </section>
  );
}
