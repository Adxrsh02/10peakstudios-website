import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createConsent,
  isGpcEnabled,
  parseConsent,
  withdrawAnalyticsTracking,
} from '@/lib/consent';
import { legalConfig } from '@/content/legal-config';
import {
  buildMailtoUrl,
  COOKIE_AND_STORAGE_TABLE,
  DATA_REQUEST_OPTIONS,
  THIRD_PARTY_PROCESSORS,
} from '@/content/legal-content';

describe('Global Privacy Control (GPC) helper', () => {
  it('returns true only when globalPrivacyControl is strictly true', () => {
    expect(
      isGpcEnabled({ globalPrivacyControl: true } as Navigator & { globalPrivacyControl: boolean }),
    ).toBe(true);
    expect(
      isGpcEnabled({ globalPrivacyControl: false } as Navigator & {
        globalPrivacyControl: boolean;
      }),
    ).toBe(false);
    expect(isGpcEnabled({} as Navigator)).toBe(false);
    expect(isGpcEnabled(undefined)).toBe(false);
  });
});

describe('withdrawAnalyticsTracking', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('denies GA4/Clarity consent, removes live scripts, and clears tracking cookies', () => {
    const gtag = vi.fn();
    const clarity = vi.fn();
    const removedIds: string[] = [];
    const cookieWrites: string[] = [];

    const mockWindow: Record<string, unknown> = { gtag, clarity };
    const mockDocument = {
      get cookie() {
        return '_ga=GA1.1.1; _clck=abc; CLID=xyz; unrelated=keep';
      },
      set cookie(val: string) {
        cookieWrites.push(val);
      },
      getElementById(id: string) {
        if (id === 'ga4' || id === 'clarity') {
          return {
            remove: () => removedIds.push(id),
          };
        }
        return null;
      },
    };

    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('document', mockDocument);
    vi.stubGlobal('location', { hostname: '10peakstudios.com' });

    const hadLiveScripts = withdrawAnalyticsTracking('G-TEST123');

    expect(hadLiveScripts).toBe(true);
    expect(mockWindow['ga-disable-G-TEST123']).toBe(true);
    expect(gtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    expect(clarity).toHaveBeenCalledWith('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'denied',
    });
    expect(removedIds).toEqual(['ga4', 'clarity']);
    expect(cookieWrites.some((c) => c.startsWith('_ga=; Max-Age=0'))).toBe(true);
    expect(cookieWrites.some((c) => c.startsWith('_clck=; Max-Age=0'))).toBe(true);
    expect(cookieWrites.some((c) => c.startsWith('CLID=; Max-Age=0'))).toBe(true);
    expect(cookieWrites.some((c) => c.startsWith('unrelated='))).toBe(false);
  });

  it('returns false when no live analytics script tags are present', () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {
      cookie: '',
      getElementById: () => null,
    });
    expect(withdrawAnalyticsTracking()).toBe(false);
  });
});

describe('Consent creation and parsing', () => {
  it('stores versioned boolean flags', () => {
    const state = createConsent(false, false, new Date('2026-11-26T10:00:00Z'));
    expect(parseConsent(JSON.stringify(state), Date.parse('2026-11-26T12:00:00Z'))).toEqual(state);
  });
});

describe('Legal configuration & disclosure tables integrity', () => {
  it('has non-empty core legalConfig fields', () => {
    const requiredStrings = [
      legalConfig.brandName,
      legalConfig.websiteUrl,
      legalConfig.legalEntityName,
      legalConfig.entityType,
      legalConfig.registeredAddress,
      legalConfig.city,
      legalConfig.contactEmail,
      legalConfig.privacyEmail,
      legalConfig.grievanceOfficer.name,
      legalConfig.grievanceOfficer.title,
      legalConfig.grievanceOfficer.email,
      legalConfig.jurisdictionCity,
      legalConfig.requestResponseTime,
      legalConfig.effectiveDate,
      legalConfig.lastUpdated,
    ];
    for (const val of requiredStrings) {
      expect(val.trim().length).toBeGreaterThan(0);
    }
    expect(typeof legalConfig.legalReviewed).toBe('boolean');
  });

  it('contains populated disclosure tables and valid mailto links', () => {
    expect(COOKIE_AND_STORAGE_TABLE.length).toBeGreaterThanOrEqual(4);
    expect(THIRD_PARTY_PROCESSORS.length).toBeGreaterThanOrEqual(4);
    expect(DATA_REQUEST_OPTIONS.length).toBeGreaterThanOrEqual(4);
    for (const opt of DATA_REQUEST_OPTIONS) {
      const url = buildMailtoUrl(legalConfig.privacyEmail, opt.subject, opt.bodyTemplate);
      expect(url.startsWith(`mailto:${legalConfig.privacyEmail}?subject=`)).toBe(true);
    }
  });
});
