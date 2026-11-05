import { homeFaqs } from '@/content/faqs';
import { routes } from '@/content/navigation';
import { pillars, servicePath, servicesByPillar } from '@/content/services';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** /llms.txt (PRD-SEO-12): site summary for answer engines, generated from the typed content. */
export function GET() {
  const live = routes.filter((r) => r.status === 'live');
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.entityDescription}`,
    '',
    `Philosophy: ${site.philosophy}`,
    `Focus: ${site.tagline} Build and Automate are the primary offers; Grow is the supporting capability.`,
    '',
    '## Services',
    ...pillars.flatMap((p) => [
      '',
      `### ${p.name}: ${p.definition}`,
      ...servicesByPillar(p.id).map(
        (s) => `- [${s.name}](${site.url}${servicePath(s.slug)}): ${s.offerings.join(', ')}`,
      ),
    ]),
    '',
    '## Key pages',
    ...live.map((r) => `- [${r.title}](${site.url}${r.path === '/' ? '/' : r.path})`),
    '',
    '## FAQ',
    ...homeFaqs
      .filter((f) => !f.answer.includes('[PLACEHOLDER'))
      .flatMap((f) => ['', `### ${f.question}`, f.answer]),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
