import { StubPage } from '@/components/layout/StubPage';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('How We Work', '/about/process');

/** Stub (PRD 8.5). Replace with the full page when it is built. */
export default function ProcessPage() {
  return <StubPage title="How We Work" prd="8.5" />;
}
