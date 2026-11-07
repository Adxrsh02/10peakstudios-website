import { describe, expect, it } from 'vitest';
import cloudinaryLoader from '@/lib/cloudinary-loader';

describe('cloudinaryLoader', () => {
  it('returns local paths unchanged', () => {
    expect(cloudinaryLoader({ src: '/hero-poster.avif', width: 640 })).toBe('/hero-poster.avif');
  });

  it('inserts f_auto,q_auto,w_<width> after /image/upload/ in Cloudinary URLs', () => {
    const url =
      'https://res.cloudinary.com/qlxaljlj/image/upload/v1793422198/Sai_prestige__logo_HD.jpg';
    expect(cloudinaryLoader({ src: url, width: 384 })).toBe(
      'https://res.cloudinary.com/qlxaljlj/image/upload/f_auto,q_auto,w_384/v1793422198/Sai_prestige__logo_HD.jpg',
    );
  });

  it('supports custom quality parameter', () => {
    const url =
      'https://res.cloudinary.com/qlxaljlj/image/upload/v1793422198/Sai_prestige__logo_HD.jpg';
    expect(cloudinaryLoader({ src: url, width: 384, quality: 85 })).toBe(
      'https://res.cloudinary.com/qlxaljlj/image/upload/f_auto,q_85,w_384/v1793422198/Sai_prestige__logo_HD.jpg',
    );
  });

  it('preserves existing transformations in the URL', () => {
    const url =
      'https://res.cloudinary.com/qlxaljlj/image/upload/c_scale,e_sharpen/v1793422198/Sai_prestige__logo_HD.jpg';
    expect(cloudinaryLoader({ src: url, width: 256 })).toBe(
      'https://res.cloudinary.com/qlxaljlj/image/upload/f_auto,q_auto,w_256/c_scale,e_sharpen/v1793422198/Sai_prestige__logo_HD.jpg',
    );
  });

  it('updates existing f_auto,q_*,w_* transform segment cleanly', () => {
    const url =
      'https://res.cloudinary.com/qlxaljlj/image/upload/f_auto,q_auto,w_144/v1793422198/Sai_prestige__logo_HD.jpg';
    expect(cloudinaryLoader({ src: url, width: 288 })).toBe(
      'https://res.cloudinary.com/qlxaljlj/image/upload/f_auto,q_auto,w_288/v1793422198/Sai_prestige__logo_HD.jpg',
    );
  });
});
