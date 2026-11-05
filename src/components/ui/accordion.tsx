'use client';

import type { ComponentProps } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { cn } from '@/lib/cn';

/** FAQ accordion (Design.md 10.8). All answers stay in the DOM for search engines (forceMount). */
function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b border-border first:border-t', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/trigger flex min-h-14 flex-1 items-center justify-between gap-6 py-5 text-left',
          'font-sans text-body-lg font-semibold text-foreground',
          'transition-colors duration-(--duration-fast) [@media(hover:hover)]:hover:text-primary',
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="relative grid size-8 shrink-0 place-items-center rounded-pill border border-border text-brand-accent"
        >
          <PlusIcon
            strokeWidth={1.75}
            className="size-4 transition-opacity duration-(--duration-fast) group-data-[state=open]/trigger:opacity-0"
          />
          <MinusIcon
            strokeWidth={1.75}
            className="absolute size-4 opacity-0 transition-opacity duration-(--duration-fast) group-data-[state=open]/trigger:opacity-100"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className={cn(
        'overflow-hidden data-[state=closed]:hidden',
        'data-[state=open]:animate-accordion-down',
      )}
      {...props}
    >
      <div className={cn('max-w-[68ch] pb-6 text-body text-muted-foreground', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
