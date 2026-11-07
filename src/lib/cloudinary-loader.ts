/**
 * next/image custom loader for static export (Architecture.md 7, ADR-003).
 * - Local paths (starting with "/") are returned unchanged.
 * - Full Cloudinary URLs have f_auto,q_<quality|auto>,w_<width> inserted after /image/upload/
 *   while preserving any existing transformations.
 * - Cloudinary public IDs are delivered with f_auto,q_<quality|auto>,w_<width>.
 */
type LoaderArgs = { src: string; width: number; quality?: number };

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith('/')) {
    return src;
  }

  const q = quality ? `q_${quality}` : 'q_auto';
  const transform = `f_auto,${q},w_${width}`;

  if (src.includes('/image/upload/')) {
    // If an f_auto,q_*,w_* segment is already present directly after /image/upload/, update it
    if (/\/image\/upload\/f_auto,[^/]+\//.test(src)) {
      return src.replace(/\/image\/upload\/f_auto,[^/]+\//, `/image/upload/${transform}/`);
    }
    // Otherwise insert after /image/upload/, keeping existing transformations
    return src.replace('/image/upload/', `/image/upload/${transform}/`);
  }

  if (CLOUD_NAME === '') {
    return src;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${src}`;
}
