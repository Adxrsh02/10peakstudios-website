import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getResolvedProcessContent,
  isProcessPageIndexable,
  processContent,
  resolveProcessImage,
} from '@/content/process';
import { getServiceStickyCta } from '@/content/services/glass-routes';

const BANNED_WORDS = [
  'elevate',
  'unlock',
  'seamless',
  'cutting-edge',
  'revolutionize',
  'empower',
  'game-changer',
  'next-level',
  'synergy',
  'harness',
  'robust',
  'leverage',
  'journey',
];

describe('/about/process content and integrity', () => {
  it('resolves all content cleanly with zero [PLACEHOLDER], [CONFIRM], or [CLOUDINARY_URL] text', () => {
    const resolved = getResolvedProcessContent();
    const serialized = JSON.stringify(resolved);
    expect(serialized).not.toContain('[PLACEHOLDER');
    expect(serialized).not.toContain('[CONFIRM');
    expect(serialized).not.toContain('[CLOUDINARY_URL');

    const lower = serialized.toLowerCase();
    for (const banned of BANNED_WORDS) {
      expect(lower).not.toContain(banned);
    }
  });

  it('orders the 6 camps cleanly and keeps PRD/Home step alignment', () => {
    const resolved = getResolvedProcessContent();
    expect(resolved.ascent.camps.map((c) => c.step)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(resolved.ascent.camps.map((c) => c.title)).toEqual([
      'Discover',
      'Plan & scope',
      'Design & prototype',
      'Validate',
      'Build & test',
      'Launch & grow',
    ]);
  });

  it('meets SEO length budgets and is indexable now that image slots are filled', () => {
    expect(processContent.seo.title.length).toBeLessThanOrEqual(45);
    expect(`${processContent.seo.title} | 10PeakStudio`.length).toBeLessThanOrEqual(60);
    expect(processContent.seo.description.length).toBeGreaterThanOrEqual(110);
    expect(processContent.seo.description.length).toBeLessThanOrEqual(160);
    expect(isProcessPageIndexable()).toBe(true);
  });

  it('swaps Cloudinary URLs cleanly via resolveProcessImage when a URL is supplied', () => {
    const pendingFixture = {
      ...processContent.hero.image,
      src: '',
    };
    expect(resolveProcessImage(pendingFixture).src).toBeUndefined();

    const populated = resolveProcessImage(processContent.hero.image);
    expect(populated.src).toBe(
      'https://res.cloudinary.com/lta722n4/image/upload/v1795792385/hww-hero-meeting.png',
    );
  });

  it('configures the /about/process sticky bar override without modifying glass navbar routes', () => {
    expect(getServiceStickyCta('/about/process')).toEqual(processContent.stickyCta);
  });

  it('contains zero raw hex color values inside src/components/process (RUL-ST-01)', () => {
    const dir = path.join(process.cwd(), 'src', 'components', 'process');
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      expect(content, file).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
    }
  });
});
