import { describe, expect, it } from 'vitest';
import { getStudioStatus } from '@/lib/business-hours';

describe('getStudioStatus (Asia/Kolkata timezone calculations)', () => {
  it('returns Open Now during active weekday hours (e.g. Wednesday 11:30 AM IST = 06:00 UTC)', () => {
    // 2026-11-04 is a Wednesday. 06:00 UTC = 11:30 IST
    const wedMidday = new Date('2026-11-04T06:00:00Z');
    const status = getStudioStatus(wedMidday);
    expect(status.isOpen).toBe(true);
    expect(status.statusText).toBe('Open Now');
    expect(status.detailText).toBe('Closes at 9:00 PM IST');
  });

  it('returns Closed Now before 7:00 AM IST (e.g. Wednesday 6:30 AM IST = 01:00 UTC)', () => {
    const wedEarly = new Date('2026-11-04T01:00:00Z');
    const status = getStudioStatus(wedEarly);
    expect(status.isOpen).toBe(false);
    expect(status.statusText).toBe('Closed Now');
    expect(status.detailText).toContain('Opens today at 7:00 AM IST');
  });

  it('returns Closed Now after 9:00 PM IST on weekday (e.g. Wednesday 9:30 PM IST = 16:00 UTC)', () => {
    const wedLate = new Date('2026-11-04T16:00:00Z');
    const status = getStudioStatus(wedLate);
    expect(status.isOpen).toBe(false);
    expect(status.statusText).toBe('Closed Now');
    expect(status.detailText).toContain('Opens tomorrow at 7:00 AM IST');
  });

  it('returns Closed Today on Sunday (e.g. Sunday 2:00 PM IST = 08:30 UTC)', () => {
    // 2026-11-08 is a Sunday
    const sundayAfternoon = new Date('2026-11-08T08:30:00Z');
    const status = getStudioStatus(sundayAfternoon);
    expect(status.isOpen).toBe(false);
    expect(status.statusText).toBe('Closed Today');
    expect(status.detailText).toContain('Opens Monday at 7:00 AM IST');
  });

  it('returns Closed Now on Saturday night opening Monday morning', () => {
    // 2026-11-07 is Saturday. 16:00 UTC = 21:30 IST
    const satLate = new Date('2026-11-07T16:00:00Z');
    const status = getStudioStatus(satLate);
    expect(status.isOpen).toBe(false);
    expect(status.detailText).toContain('Opens Monday at 7:00 AM IST');
  });
});
