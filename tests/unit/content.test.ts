import { describe, expect, it } from 'vitest';
import { homeFaqs } from '@/content/faqs';
import { home } from '@/content/home';
import { megaMenu, routes } from '@/content/navigation';
import { pillars, services } from '@/content/services';
import { site } from '@/content/site';

const words = (s: string) => s.trim().split(/\s+/).length;

describe('content integrity', () => {
  it('has the 8 services with the fixed PRD 5.2 slugs', () => {
    expect(services.map((s) => s.slug)).toEqual([
      'website-development',
      'web-app-development',
      'mobile-app-development',
      'custom-software',
      'ai-automation',
      'digital-marketing',
      'branding-design',
      'video-ugc-ads',
    ]);
  });

  it('orders pillars Build, Automate, Grow with Grow supporting', () => {
    expect(pillars.map((p) => p.id)).toEqual(['build', 'automate', 'grow']);
    expect(pillars.find((p) => p.id === 'grow')?.role).toBe('supporting');
    expect(megaMenu.flatMap((c) => c.items)).toHaveLength(8);
  });

  it('keeps FAQ answers between 40 and 80 words (PRD-SEO-16)', () => {
    for (const f of homeFaqs) {
      expect(words(f.answer), f.question).toBeGreaterThanOrEqual(40);
      expect(words(f.answer), f.question).toBeLessThanOrEqual(80);
    }
  });

  it('starts the hero lead with the entity sentence (PRD-SEO-11)', () => {
    expect(
      home.hero.lead.startsWith(
        '10PeakStudio is a premium digital innovation and technology studio',
      ),
    ).toBe(true);
    expect(home.hero.lead).toBe(site.entityDescription);
  });

  it('meets metadata length rules (PRD 8)', () => {
    expect(home.meta.title.length).toBeLessThanOrEqual(60);
    expect(home.meta.title.endsWith('| 10PeakStudio')).toBe(true);
    expect(home.meta.description.length).toBeGreaterThanOrEqual(110);
    expect(home.meta.description.length).toBeLessThanOrEqual(160);
  });

  it('contains no fabricated proof (PRD-HOME-05)', () => {
    const text = JSON.stringify(home).toLowerCase();
    for (const banned of [
      'testimonial',
      'award',
      'certified',
      'trusted by',
      '% ',
      'clients served',
      '5-star',
    ]) {
      expect(text).not.toContain(banned);
    }
  });

  it('lists every route exactly once', () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(routes.filter((r) => r.status === 'live').map((r) => r.path)).toEqual(['/']);
  });
});
