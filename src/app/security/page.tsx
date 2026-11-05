import { StubPage } from '@/components/layout/StubPage';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('Security by Design', '/security');

/** Stub (PRD 8.6). Replace with the full page when it is built. */
export default function SecurityPage() {
  return <StubPage title="Security by Design" prd="8.6" />;
}
