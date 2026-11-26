import { notFound } from 'next/navigation';
import { StubPage } from '@/components/layout/StubPage';
import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { pillars, servicePath, services } from '@/content/services';
import { getServicePageContent } from '@/content/services/registry';
import { env } from '@/lib/env';
import { servicePageMetadata } from '@/lib/seo-service';
import { stubMetadata } from '@/lib/stub';
import { WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from '@/lib/whatsapp';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const content = getServicePageContent(slug);
  if (content) {
    return servicePageMetadata(content);
  }
  return stubMetadata(service?.name ?? 'Service', servicePath(slug));
}

/** Service detail template (PRD 8.3). Renders reusable Dark Glass template when implemented, else stub. */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const content = getServicePageContent(slug);
  if (content) {
    const whatsappHref = whatsappUrl(env.NEXT_PUBLIC_WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);
    return (
      <ServiceTemplate serviceName={service.name} content={content} whatsappHref={whatsappHref} />
    );
  }

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
