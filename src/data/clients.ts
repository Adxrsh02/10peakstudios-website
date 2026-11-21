import type { ClientLogo } from '@/types/clients';

/**
 * Verified Real Client Logos.
 * DO NOT add fake or placeholder companies.
 * To add future clients, simply append them to this verified array.
 */
export const VERIFIED_CLIENTS: ClientLogo[] = [
  {
    id: 'sai-prestige',
    name: 'Sai Prestige',
    logoUrl:
      'https://res.cloudinary.com/lta722n4/image/upload/v1795284955/Sai_prestige__logo_HD.jpg',
    width: 512,
    height: 180,
    description: 'Automotive & Luxury Services Partner',
  },
  {
    id: 'waahanm',
    name: 'Waahanm',
    logoUrl:
      'https://res.cloudinary.com/lta722n4/image/upload/v1795284888/file_0000000005348243a82c4bafc974d6f2.png',
    width: 500,
    height: 160,
    description: 'Fleet Management & Mobility Platform',
  },
];
