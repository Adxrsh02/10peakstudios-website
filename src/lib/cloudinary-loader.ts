/**
 * next/image custom loader for static export (Architecture.md 7, ADR-003).
 * Local paths (starting with "/") are returned unchanged; anything else is treated
 * as a Cloudinary public ID and delivered with f_auto,q_auto.
 */
type LoaderArgs = { src: string; width: number; quality?: number };

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith('/') || CLOUD_NAME === '') {
    return src;
  }
  const q = quality ? `q_${quality}` : 'q_auto';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,${q},c_limit,w_${width}/${src}`;
}
