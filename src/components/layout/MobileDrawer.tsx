'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { companyLinks, contactPath, megaMenu } from '@/content/navigation';

type MobileDrawerProps = {
  whatsappHref: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Mobile drawer content (PRD-NAV-05 to 07): focus trap, Escape, closes on navigation, focus returns
 * to the menu button. Loaded on first intent by MobileNav to keep it out of the critical bundle.
 */
export function MobileDrawer({ whatsappHref, open, onOpenChange }: MobileDrawerProps) {
  const groups = [
    ...megaMenu.map((c) => ({
      id: c.id,
      title: c.name,
      links: [{ label: `All ${c.name} services`, href: c.href }, ...c.items],
    })),
    { id: 'company', title: 'Company', links: companyLinks },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent aria-describedby="mobile-nav-desc">
        <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription id="mobile-nav-desc" className="sr-only">
            Site navigation
          </SheetDescription>
          <SheetClose asChild>
            <Link href="/" aria-label="10PeakStudio home" className="rounded-sm">
              <Logo variant="horizontal-flat-light" decorative className="h-8 w-auto" />
            </Link>
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <AccordionPrimitive.Root type="single" collapsible className="flex flex-col">
            {groups.map((g) => (
              <AccordionPrimitive.Item key={g.id} value={g.id} className="border-b border-border">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group/acc flex min-h-14 w-full items-center justify-between py-3 font-heading text-h5 text-foreground">
                    {g.title}
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-5 text-brand-accent transition-transform duration-(--duration-base) group-data-[state=open]/acc:rotate-90"
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <ul className="flex flex-col pb-4">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <SheetClose asChild>
                          <Link
                            href={l.href}
                            className="flex min-h-12 flex-col justify-center rounded-sm px-2 py-2"
                          >
                            <span className="font-semibold text-foreground">{l.label}</span>
                            {'description' in l && l.description && (
                              <span className="text-small text-muted-foreground">
                                {l.description}
                              </span>
                            )}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
          <SheetClose asChild>
            <Link
              href={contactPath}
              className="flex min-h-14 items-center font-heading text-h5 text-foreground"
            >
              Contact
            </Link>
          </SheetClose>
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <SheetClose asChild>
            <Button asChild size="md" className="w-full">
              <Link href={contactPath} data-cta="drawer-start" data-cta-location="drawer">
                Start a project
                <ArrowRight aria-hidden="true" strokeWidth={1.75} />
              </Link>
            </Button>
          </SheetClose>
          {whatsappHref && (
            <Button asChild variant="secondary" size="md" className="w-full">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-cta-location="drawer"
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} />
                WhatsApp us
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
