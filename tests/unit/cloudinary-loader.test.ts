import { describe, expect, it } from 'vitest';
import cloudinaryLoader from '@/lib/cloudinary-loader';

describe('cloudinaryLoader', () => {
  it('returns local paths unchanged', () => {
    expect(cloudinaryLoader({ src: '/hero-poster.avif', width: 640 })).toBe('/hero-poster.avif');
  });
});
