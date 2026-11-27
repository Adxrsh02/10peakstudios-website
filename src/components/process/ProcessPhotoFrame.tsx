import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import type { ResolvedProcessImage } from '@/content/process';
import { cn } from '@/lib/cn';

type ProcessPhotoFrameProps = {
  image: ResolvedProcessImage;
  sizes: string;
  priority?: boolean;
  dark?: boolean;
  className?: string;
  imageClassName?: string;
};

/**
 * Renders Cloudinary-backed photography via next/image custom loader (`f_auto,q_auto,w_<width>`),
 * or an atmospheric fixed-aspect fallback frame when a `[CLOUDINARY_URL]` slot is not yet filled.
 */
export function ProcessPhotoFrame({
  image,
  sizes,
  priority = false,
  dark = false,
  className,
  imageClassName,
}: ProcessPhotoFrameProps) {
  return (
    <div className={cn('relative overflow-hidden', image.aspectClass, className)}>
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          sizes={sizes}
          className={cn('h-full w-full object-cover', imageClassName)}
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className={cn(
            'relative flex h-full w-full flex-col justify-between p-5',
            dark
              ? 'bg-gradient-to-br from-(--ascent-dark-dusk) via-(--ascent-dark-elevated) to-(--ascent-dark-canvas) text-(--ascent-dark-text)'
              : 'bg-gradient-to-br from-(--ascent-paper) via-(--ascent-white) to-(--ascent-glass-border) text-(--ascent-ink)',
          )}
          style={{
            backgroundImage: dark
              ? undefined
              : `radial-gradient(circle at 80% 18%, rgb(167 67 248 / 0.18), transparent 55%), url("${image.blurDataURL}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0',
              dark ? 'bg-(--ascent-dark-canvas)/70' : 'bg-(--ascent-white)/78 backdrop-blur-md',
            )}
          />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase',
                dark
                  ? 'border-(--ascent-dark-border) bg-(--ascent-dark-elevated)/75 text-(--ascent-cyan)'
                  : 'border-(--ascent-glass-border) bg-(--ascent-white)/90 text-(--color-deep-violet)',
              )}
            >
              <Sparkles className="size-3" aria-hidden="true" strokeWidth={1.75} />
              <span>Studio preview</span>
            </span>
          </div>
          <div
            aria-hidden="true"
            className="relative z-10 flex flex-1 items-center justify-center py-4"
          >
            <svg viewBox="0 0 240 110" className="h-auto w-4/5 max-w-60" fill="none">
              <path
                d="M12 96 L72 42 L116 74 L170 20 L228 84"
                stroke={dark ? 'var(--ascent-cyan)' : 'var(--color-peak-violet)'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.85"
              />
              <path
                d="M28 96 L92 52 L134 80 L190 28"
                stroke="var(--color-lilac-spark)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.65"
              />
              <circle cx="170" cy="20" r="5" fill="var(--ascent-cyan)" />
            </svg>
          </div>
          <div className="relative z-10 pb-8">
            <span
              className={cn(
                'block font-mono text-caption font-medium',
                dark ? 'text-(--ascent-dark-muted)' : 'text-(--ascent-ink-muted)',
              )}
            >
              {image.fallbackLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
