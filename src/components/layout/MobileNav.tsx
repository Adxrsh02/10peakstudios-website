'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';

const MobileDrawer = dynamic(() => import('./MobileDrawer').then((m) => m.MobileDrawer), {
  ssr: false,
});

type MobileNavProps = { whatsappHref: string | null };

/**
 * Lightweight menu button. The drawer (Radix Dialog + accordion) loads on first intent (hover,
 * focus or touch) and opens on click, keeping it out of the critical bundle (ui-ux-pro-max:
 * "preload on user intent"). Focus returns to this button when the drawer closes.
 */
export function MobileNav({ whatsappHref }: MobileNavProps) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const prefetch = () => setLoaded(true);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        onTouchStart={prefetch}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        className="grid size-11 place-items-center rounded-pill text-foreground transition-colors lg:hidden [@media(hover:hover)]:hover:bg-secondary"
      >
        <Menu strokeWidth={1.75} className="size-6" aria-hidden="true" />
      </button>
      {loaded && (
        <MobileDrawer
          whatsappHref={whatsappHref}
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) requestAnimationFrame(() => button.current?.focus());
          }}
        />
      )}
    </>
  );
}
