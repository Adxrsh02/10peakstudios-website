'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navTriggerClass,
} from '@/components/ui/navigation-menu';
import { companyLinks, contactPath, megaMenu } from '@/content/navigation';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

/** Desktop navigation (PRD 6.3): Services mega-menu, Company dropdown, Contact. */
export function DesktopNav() {
  return (
    <NavigationMenu aria-label="Main" className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[min(1200px,calc(100vw-48px))] max-w-[1200px] grid-cols-[15.5rem_repeat(3,minmax(0,1fr))] gap-3 p-3">
              {/* Column 0: Brand Sidebar */}
              <div className="flex animate-in flex-col justify-between gap-6 rounded-sm bg-surface-sunken p-6 delay-0 duration-150 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none motion-reduce:delay-0">
                <div className="flex flex-col gap-4">
                  <Logo variant="mark-3d-light" decorative className="h-auto w-16" />
                  <p className="font-heading text-h5 text-foreground">{site.tagline}</p>
                  <p className="text-small text-muted-foreground">
                    Eight services in three pillars. Build and Automate lead; Grow supports.
                  </p>
                </div>
                <NavigationMenuLink asChild>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-0 font-semibold text-link [@media(hover:hover)]:hover:bg-transparent [@media(hover:hover)]:hover:underline"
                  >
                    View all services
                    <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
                  </Link>
                </NavigationMenuLink>
              </div>

              {/* Columns 1, 2, 3: Service Pillars */}
              {megaMenu.map((col, colIdx) => (
                <div
                  key={col.id}
                  className={cn(
                    'flex min-w-0 flex-col gap-1 p-1',
                    'animate-in duration-150 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none motion-reduce:delay-0',
                    colIdx === 0 && 'delay-[15ms]',
                    colIdx === 1 && 'delay-[30ms]',
                    colIdx === 2 && 'delay-[45ms]',
                  )}
                >
                  <NavigationMenuLink asChild>
                    <Link href={col.href} className="mb-1 rounded-sm px-3 py-2">
                      <span className="block font-sans text-[0.8125rem] font-medium tracking-[0.12em] text-brand-accent uppercase">
                        {col.name}
                      </span>
                      <span className="mt-1 block text-small text-pretty break-words text-muted-foreground">
                        {col.definition}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                  <ul className="flex flex-col gap-0.5">
                    {col.items.map((item) => (
                      <li key={item.href} className="min-w-0">
                        <NavigationMenuLink asChild>
                          <Link href={item.href} className="rounded-sm px-3 py-2.5">
                            <span className="block font-semibold text-pretty break-words text-foreground">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-small text-pretty break-words text-muted-foreground">
                              {item.description}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-[22rem] flex-col gap-0.5 p-2">
              {companyLinks.map((item, index) => (
                <li
                  key={item.href}
                  className={cn(
                    'min-w-0',
                    'animate-in duration-150 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none motion-reduce:delay-0',
                    index === 0 && 'delay-0',
                    index === 1 && 'delay-[15ms]',
                    index === 2 && 'delay-[30ms]',
                    index === 3 && 'delay-[45ms]',
                  )}
                >
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="rounded-sm px-4 py-3">
                      <span className="block font-semibold text-pretty break-words text-foreground">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-small text-pretty break-words text-muted-foreground">
                        {item.description}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navTriggerClass}>
            <Link href={contactPath}>Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
