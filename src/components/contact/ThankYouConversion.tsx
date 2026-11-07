'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

export function ThankYouConversion() {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (hasFiredRef.current) return;

    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('tps.lead_submitted');
      if (token) {
        hasFiredRef.current = true;
        track('generate_lead', { form_id: 'contact_enquiry' });
        // Consume token to prevent duplicate tracking on page reload (PRD-TY-01)
        sessionStorage.removeItem('tps.lead_submitted');
      }
    }
  }, []);

  return null;
}
