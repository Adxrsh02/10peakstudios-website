/**
 * WhatsApp click-to-chat URL (PRD 8.7). Returns null when no number is configured, which hides
 * every WhatsApp CTA (PRD OQ-3). The number appears in the URL but is never shown as text.
 */
export function whatsappUrl(number: string | undefined, message?: string): string | null {
  if (!number || !/^\d{8,15}$/.test(number)) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export const WHATSAPP_DEFAULT_MESSAGE = "Hi 10PeakStudio, I'd like to discuss a project.";
