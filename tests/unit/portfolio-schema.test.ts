import { describe, expect, it } from 'vitest';
import {
  getAllPortfolioProjects,
  getPortfolioStats,
  isPortfolioIndexable,
  validatePortfolioMarkdown,
} from '@/lib/portfolio/loader';

const SAMPLE_VALID = `---
published: true
slug: "sample-project"
title: "Sample Engineering Project"
tagline: "Scalable full-stack platform with AI automation."
shortDescription: "End-to-end web platform delivering clean workflow automation."
inShort: "10PeakStudio engineered a reliable cloud workflow platform for streamlined team operations and analytics."
type: "in-house"
clientName: null
clientPermission: false
status: "Completed"
industry: "SaaS & Startups"
capabilities:
  - "Web Apps & SaaS"
complexity: "Intermediate"
platform: "Web Application"
role: "Full-Stack Engineering"
year: 2026
duration: "6 weeks"
teamSummary: "Studio Engineering Team"
teamMembers: []
thumbnail:
  url: "https://res.cloudinary.com/lta722n4/image/upload/v1/thumb.png"
  alt: "Sample project dashboard thumbnail"
  width: 1200
  height: 750
heroImage:
  url: "https://res.cloudinary.com/lta722n4/image/upload/v1/hero.png"
  alt: "Sample project architecture hero view"
  width: 1600
  height: 900
techStack:
  frontend: ["Next.js", "React"]
  backend: ["FastAPI"]
metrics:
  - value: "99.9%"
    label: "Confirmed Uptime"
    confirmed: true
  - value: "50%"
    label: "Unconfirmed Speedup"
    confirmed: false
seo:
  title: "Sample Project Case Study"
  description: "Explore how 10PeakStudio engineered a full-stack SaaS platform using Next.js, FastAPI, and automated data workflows."
---

## Project Overview

A clean technical overview.

## Challenges and Solutions

### Challenge: Slow cold starts
**Solution:** Moved static assets to the edge and precomputed read models.
`;

describe('portfolio schema & markdown pipeline', () => {
  it('loads and validates all real project files cleanly', () => {
    const projects = getAllPortfolioProjects();
    expect(projects.length).toBeGreaterThanOrEqual(1);
    const p1 = projects.find((p) => p.slug === 'automated-fundus-image-screening');
    expect(p1).toBeDefined();
    expect(p1?.type).toBe('in-house');
    expect(p1?.disclaimer).toContain('Not a certified medical device');
    expect(p1?.publication?.paperId).toBe('1940');
    expect(p1?.confirmedMetrics.length).toBe(4);
  });

  it('keeps portfolio non-indexable until threshold (>= 3 projects) is met', () => {
    const projects = getAllPortfolioProjects();
    expect(isPortfolioIndexable()).toBe(projects.length >= 3);
  });

  it('computes deterministic portfolio stats from real files', () => {
    const projects = getAllPortfolioProjects();
    const stats = getPortfolioStats(projects);
    expect(stats.projectCount).toBe(projects.length);
    expect(stats.industryCount).toBeGreaterThanOrEqual(1);
    expect(stats.technologyCount).toBeGreaterThan(0);
  });

  it('strips unconfirmed metrics from confirmedMetrics', () => {
    const parsed = validatePortfolioMarkdown(SAMPLE_VALID, 'sample-project', 'sample-project.md');
    expect(parsed.confirmedMetrics).toEqual([
      { value: '99.9%', label: 'Confirmed Uptime', confirmed: true },
    ]);
    expect(parsed.challenges).toEqual([
      {
        challenge: 'Slow cold starts',
        solution: 'Moved static assets to the edge and precomputed read models.',
      },
    ]);
  });

  it('fails clearly on invalid industry, slug mismatch, or un-uploaded local Section_images', () => {
    const badSlug = SAMPLE_VALID.replace('slug: "sample-project"', 'slug: "wrong-slug"');
    expect(() =>
      validatePortfolioMarkdown(badSlug, 'sample-project', 'content/portfolio/sample-project.md'),
    ).toThrow(/Slug mismatch.*sample-project\.md/);

    const badImage = SAMPLE_VALID.replace(
      'https://res.cloudinary.com/lta722n4/image/upload/v1/thumb.png',
      'Section_images\\Projects\\local.jpg',
    );
    expect(() =>
      validatePortfolioMarkdown(badImage, 'sample-project', 'content/portfolio/sample-project.md'),
    ).toThrow(/content\/portfolio\/sample-project\.md.*thumbnail\.url/);

    const missingTitle = SAMPLE_VALID.replace(/title: "Sample Engineering Project"\n/, '');
    expect(() =>
      validatePortfolioMarkdown(
        missingTitle,
        'sample-project',
        'content/portfolio/sample-project.md',
      ),
    ).toThrow(/content\/portfolio\/sample-project\.md.*title/);
  });
});
