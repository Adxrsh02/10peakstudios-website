import { StubPage } from '@/components/layout/StubPage';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('Terms and Conditions', '/terms');

/** Stub (PRD 8.9). Replace with the full page when it is built. */
export default function TermsPage() {
  return <StubPage title="Terms and Conditions" prd="8.9" />;
}
