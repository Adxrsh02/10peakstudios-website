import { StubPage } from '@/components/layout/StubPage';
import { stubMetadata } from '@/lib/stub';

export const metadata = stubMetadata('Privacy Policy', '/privacy');

/** Stub (PRD 8.9). Replace with the full page when it is built. */
export default function PrivacyPage() {
  return <StubPage title="Privacy Policy" prd="8.9" />;
}
