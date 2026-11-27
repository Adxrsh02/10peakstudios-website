import { ProcessPageShell } from '@/components/process/ProcessPageShell';
import {
  getResolvedProcessContent,
  isProcessPageIndexable,
  processContent,
} from '@/content/process';
import { env } from '@/lib/env';
import { pageMetadata } from '@/lib/seo';
import { WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: processContent.seo.title,
  description: processContent.seo.description,
  path: processContent.seo.path,
  noindex: !isProcessPageIndexable(),
  ogImage: processContent.seo.ogImage,
});

/** How We Work (PRD 8.5): light-to-dark "The Ascent" storytelling flow. */
export default function ProcessPage() {
  const content = getResolvedProcessContent();
  const whatsappHref = whatsappUrl(env.NEXT_PUBLIC_WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);

  return <ProcessPageShell content={content} whatsappHref={whatsappHref} />;
}
