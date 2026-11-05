import { serializeJsonLd } from '@/lib/seo';

/** Static, escaped JSON-LD (the only allowed use of dangerouslySetInnerHTML, RUL-SEC-06). */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
