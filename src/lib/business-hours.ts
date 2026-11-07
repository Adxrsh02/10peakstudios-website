export type StudioStatus = {
  isOpen: boolean;
  statusText: string;
  detailText: string;
};

/**
 * Computes whether 10PeakStudio is currently open based on Asia/Kolkata timezone.
 * Operating hours: Mon-Sat 7:00 AM to 9:00 PM IST. Sunday closed.
 */
export function getStudioStatus(date: Date = new Date()): StudioStatus {
  // Convert date to IST parts
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const weekday = partMap.weekday || ''; // 'Mon', 'Tue', ... 'Sun'
  const hour = parseInt(partMap.hour || '0', 10);
  const isSunday = weekday === 'Sun';

  if (isSunday) {
    return {
      isOpen: false,
      statusText: 'Closed Today',
      detailText: 'Opens Monday at 7:00 AM IST',
    };
  }

  if (hour >= 7 && hour < 21) {
    return {
      isOpen: true,
      statusText: 'Open Now',
      detailText: 'Closes at 9:00 PM IST',
    };
  }

  if (hour < 7) {
    return {
      isOpen: false,
      statusText: 'Closed Now',
      detailText: 'Opens today at 7:00 AM IST',
    };
  }

  // hour >= 21
  const opensNext = weekday === 'Sat' ? 'Monday' : 'tomorrow';
  return {
    isOpen: false,
    statusText: 'Closed Now',
    detailText: `Opens ${opensNext} at 7:00 AM IST`,
  };
}
