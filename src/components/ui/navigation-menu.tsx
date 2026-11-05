'use client';

import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import { cn } from '@/lib/cn';

/**
 * Desktop navigation primitives (Design.md 10.3). Radix provides keyboard support
 * (Enter, Space, arrow keys, Escape) and hover-intent opening.
 */
function NavigationMenu({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      delayDuration={150}
      className={cn('relative flex flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <div className="absolute top-full left-1/2 z-(--z-dropdown) flex -translate-x-1/2 justify-center pt-3">
        <NavigationMenuPrimitive.Viewport
          data-slot="navigation-menu-viewport"
          className={cn(
            'relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top overflow-hidden',
            'rounded-md border border-border bg-popover text-popover-foreground shadow-lg',
            'transition-[width,height] duration-(--duration-base) ease-(--ease-standard)',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn('flex list-none items-center gap-1', className)}
      {...props}
    />
  );
}

function NavigationMenuItem(props: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

export const navTriggerClass = cn(
  'group/nav inline-flex h-10 items-center gap-1.5 rounded-pill px-4 font-sans text-[0.9375rem] font-medium text-foreground',
  'transition-colors duration-(--duration-fast) [@media(hover:hover)]:hover:bg-secondary data-[state=open]:bg-secondary',
  'aria-[current=page]:text-primary',
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navTriggerClass, className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        strokeWidth={1.75}
        aria-hidden="true"
        className="size-4 transition-transform duration-(--duration-base) group-data-[state=open]/nav:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'top-0 left-0 w-full',
        'data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out',
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'block rounded-sm outline-offset-2 transition-colors duration-(--duration-fast) [@media(hover:hover)]:hover:bg-secondary',
        className,
      )}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
