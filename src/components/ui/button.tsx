import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/cn';

/**
 * Button (Design.md 10.1). Pill CTAs; colours come from semantic tokens so the same variants
 * work inside `.surface-inverse` (Obsidian) sections. Hover only on hover-capable devices.
 */
export const buttonVariants = cva(
  [
    'group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'rounded-pill font-sans font-semibold select-none',
    'transition-[background-color,border-color,color] duration-(--duration-fast) ease-(--ease-standard)',
    'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'touch-manipulation',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          '[@media(hover:hover)]:hover:bg-primary-hover active:bg-primary-active',
        ],
        secondary: [
          'border-[1.5px] border-foreground bg-transparent text-foreground',
          '[@media(hover:hover)]:hover:bg-secondary active:border-primary',
          '[.surface-inverse_&]:[@media(hover:hover)]:hover:bg-white/[0.08]',
        ],
        ghost: [
          'h-auto rounded-sm px-0 text-link underline-offset-[6px]',
          '[@media(hover:hover)]:hover:underline active:text-primary-active',
        ],
      },
      size: {
        sm: 'h-10 px-5 text-[0.9375rem] [&_svg]:size-[18px]',
        md: 'h-12 px-6 text-base [&_svg]:size-5',
        lg: 'h-14 px-7 text-[1.0625rem] [&_svg]:size-5',
      },
    },
    compoundVariants: [{ variant: 'ghost', className: 'h-auto px-0' }],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
