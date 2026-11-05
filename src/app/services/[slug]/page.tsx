import { notFound } from 'next/navigation';
import { StubPage } from '@/components/layout/StubPage';
import { pillars, servicePath, services } from '@/content/services';
import { stubMetadata } from '@/lib/stub';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return stubMetadata(service?.name ?? 'Service', servicePath(slug));
}

/** Stub (PRD 8.3): one template, eight instances. */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const pillar = pillars.find((p) => p.id === service.pillar);
  return (
    <StubPage title={service.name} prd="8.3" eyebrow={pillar?.name ?? 'Service'}>
      <ul className="flex flex-wrap gap-2">
        {service.offerings.map((o) => (
          <li key={o} className="rounded-pill border border-border px-3.5 py-1.5 text-small">
            {o}
          </li>
        ))}
      </ul>
    </StubPage>
  );
}
