import { StubPage } from '@/components/layout/StubPage';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('Contact', '/contact');

/** Stub (PRD 8.7). Replace with the full page when it is built. */
export default function ContactPage() {
  return <StubPage title="Contact" prd="8.7" />;
}
