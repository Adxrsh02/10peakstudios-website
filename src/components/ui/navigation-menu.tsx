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
      className={cn('static flex flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <div className="absolute top-full left-1/2 z-(--z-dropdown) flex -translate-x-1/2 justify-center pt-3">
        <NavigationMenuPrimitive.Viewport
          data-slot="navigation-menu-viewport"
          className={cn(
            'relative origin-top overflow-hidden',
            'h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width)',
            'rounded-md border border-border bg-popover text-popover-foreground shadow-2xl',
            'transition-[opacity,transform] duration-200 ease-out',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2',
            'motion-reduce:animate-none motion-reduce:transition-none',
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
        'top-0 left-0 w-max',
        'data-[motion^=from-]:animate-in data-[motion^=from-]:duration-150 data-[motion^=from-]:fade-in-0',
        'data-[motion^=to-]:animate-out data-[motion^=to-]:duration-150 data-[motion^=to-]:fade-out-0',
        'motion-reduce:animate-none',
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
