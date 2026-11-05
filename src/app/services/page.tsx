import Link from 'next/link';
import { StubPage } from '@/components/layout/StubPage';
import { pillars, servicePath, servicesByPillar } from '@/content/services';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('Services', '/services');

/** Stub (PRD 8.2). Pillar anchors (#build, #automate, #grow) are real so landing links resolve. */
export default function ServicesPage() {
  return (
    <StubPage title="Services" prd="8.2" eyebrow="Build. Automate. Grow.">
      <div className="grid gap-10 md:grid-cols-3">
        {pillars.map((p) => (
          <section
            key={p.id}
            id={p.id}
            aria-labelledby={`${p.id}-title`}
            className="flex flex-col gap-3"
          >
            <h2 id={`${p.id}-title`} className="text-h4">
              {p.name}
            </h2>
            <p className="text-small text-muted-foreground">{p.definition}</p>
            <ul className="flex flex-col gap-2">
              {servicesByPillar(p.id).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={servicePath(s.slug)}
                    className="font-semibold text-link hover:underline"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </StubPage>
  );
}
