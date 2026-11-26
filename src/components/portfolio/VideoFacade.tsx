'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { track } from '@/lib/analytics';
import type { ProjectVideo } from '@/lib/portfolio/schema';

type VideoFacadeProps = {
  video: ProjectVideo;
  projectSlug: string;
};

/**
 * Click-to-load video demonstration facade (zero third-party embed network cost until click).
 */
export function VideoFacade({ video, projectSlug }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    track('video_play', { project_slug: projectSlug, provider: video.provider });
  };

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-obsidian">
        {video.provider === 'youtube' ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.src)}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0"
          />
        ) : (
          <video controls autoPlay playsInline poster={video.posterUrl} className="size-full">
            <source src={video.src} />
            Your browser does not support HTML5 video playback.
          </video>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={`Play demonstration video: ${video.title}`}
      className="group relative aspect-video w-full overflow-hidden rounded-md border border-border bg-ink text-left shadow-sm"
    >
      <Image
        src={video.posterUrl}
        alt={video.title}
        fill
        sizes="(max-width: 1023px) 100vw, 65vw"
        className="object-cover opacity-80 transition-transform duration-(--duration-base) [@media(hover:hover)]:group-hover:scale-[1.02]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-obsidian/45"
      >
        <span className="grid size-16 place-items-center rounded-pill bg-primary text-primary-foreground shadow-lg transition-transform duration-(--duration-fast) [@media(hover:hover)]:group-hover:scale-105">
          <Play className="ml-0.5 size-7" strokeWidth={1.75} />
        </span>
        <span className="rounded-pill border border-inverse-rule bg-obsidian/80 px-4 py-1 text-small font-semibold text-summit-white">
          Watch demonstration
        </span>
      </div>
    </button>
  );
}
