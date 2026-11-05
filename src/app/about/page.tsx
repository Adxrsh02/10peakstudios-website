import { StubPage } from '@/components/layout/StubPage';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('About', '/about');

/** Stub (PRD 8.4). Replace with the full page when it is built. */
export default function AboutPage() {
  return <StubPage title="About" prd="8.4" />;
}
