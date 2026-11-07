'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/content/contact';
import { track } from '@/lib/analytics';
import {
  BUDGET_BANDS,
  leadSchema,
  TIMELINES,
  type BudgetBand,
  type ServiceSlug,
  type Timeline,
} from '@/lib/schemas/lead';
import { whatsappUrl } from '@/lib/whatsapp';
import { FormErrorSummary } from './FormErrorSummary';
import { FormField } from './FormField';
import { ServiceSelector } from './ServiceSelector';
import { TurnstileWidget } from './TurnstileWidget';

type EnquiryFormProps = {
  turnstileSiteKey: string;
  whatsappNumber?: string | undefined;
};

export function EnquiryForm({ turnstileSiteKey, whatsappNumber }: EnquiryFormProps) {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [selectedServices, setSelectedServices] = useState<ServiceSlug[]>([]);
  const [budgetBand, setBudgetBand] = useState<BudgetBand | ''>('');
  const [timeline, setTimeline] = useState<Timeline | ''>('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // UI & Submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'server_error' | 'turnstile_failed' | 'rate_limited'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [turnstileResetCount, setTurnstileResetCount] = useState(0);

  const startedAtRef = useRef<number>(0);
  const hasTrackedStartRef = useRef(false);

  // Capture UTM parameters and start timer
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const handleFieldFocus = () => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      track('form_start', { form_id: 'contact_enquiry' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus('idle');

    // 1. Client-side Zod validation
    const payload = {
      name,
      email,
      phone: phone.trim() === '+91' ? '' : phone,
      services: selectedServices,
      budgetBand: budgetBand ? (budgetBand as BudgetBand) : undefined,
      timeline: timeline ? (timeline as Timeline) : undefined,
      message,
      consent,
      website: websiteHoneypot,
      startedAt: startedAtRef.current,
      turnstileToken,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] || 'general');
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      track('form_error', { form_id: 'contact_enquiry', error_type: 'client_validation' });
      return;
    }

    // 2. Dispatch to /api/contact
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const result = (await res.json()) as {
        ok: boolean;
        leadId?: string;
        error?: string;
        fields?: Record<string, string>;
        message?: string;
      };

      if (res.ok && result.ok) {
        // Store verification token in sessionStorage for thank-you conversion
        if (typeof window !== 'undefined' && result.leadId) {
          sessionStorage.setItem('tps.lead_submitted', result.leadId);
        }
        router.push('/contact/thank-you');
        return;
      }

      // Handle specific API error responses
      if (res.status === 429) {
        setStatus('rate_limited');
        setStatusMessage(
          'Submission limit reached from your IP. Please connect directly via WhatsApp or phone.',
        );
        track('form_error', { form_id: 'contact_enquiry', error_type: 'rate_limited' });
      } else if (res.status === 403 && result.error === 'turnstile_failed') {
        setStatus('turnstile_failed');
        setStatusMessage('Security verification check failed. Please solve the challenge again.');
        setTurnstileResetCount((c) => c + 1);
        track('form_error', { form_id: 'contact_enquiry', error_type: 'turnstile_failed' });
      } else if (result.fields) {
        setErrors(result.fields);
        setStatus('idle');
        track('form_error', { form_id: 'contact_enquiry', error_type: 'server_validation' });
      } else {
        setStatus('server_error');
        setStatusMessage(result.message || 'An unexpected error occurred. Please try again.');
        track('form_error', { form_id: 'contact_enquiry', error_type: 'server_error' });
      }
    } catch {
      setStatus('server_error');
      setStatusMessage(
        'Unable to submit enquiry due to a network interruption. Please try again or reach out on WhatsApp.',
      );
      track('form_error', { form_id: 'contact_enquiry', error_type: 'network_error' });
    }
  };

  const waHref = whatsappUrl(whatsappNumber, "Hi 10PeakStudio, I'd like to discuss a project.");

  return (
    <div className="flex flex-col gap-8 rounded-lg border border-border bg-card p-6 shadow-xs sm:p-8 md:p-10">
      <div>
        <p className="text-[0.8125rem] font-medium tracking-[0.12em] text-primary uppercase">
          {contact.form.eyebrow}
        </p>
        <h2 className="mt-1 font-heading text-h2 font-semibold text-foreground">
          {contact.form.titleLead} <span className="text-primary">{contact.form.titleAccent}</span>
        </h2>
        <p className="mt-2 text-body text-muted-foreground">{contact.form.lead}</p>
      </div>

      {/* Top Error Summary Banner */}
      <FormErrorSummary errors={errors} />

      {/* Status Warning / Fallback Banner */}
      {status !== 'idle' && status !== 'submitting' && (
        <div
          id="form-status-alert"
          role="alert"
          className="flex flex-col gap-3 rounded-md border border-warning/40 bg-warning/10 p-4 text-small text-foreground"
        >
          <p className="font-semibold text-warning">{statusMessage}</p>
          <div className="flex flex-wrap gap-3">
            {waHref && (
              <Button asChild size="sm" variant="secondary">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4 text-emerald-600" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </Button>
            )}
            <Button asChild size="sm" variant="secondary">
              <a href="tel:+917678083589">
                <Phone className="size-4" aria-hidden="true" />
                Call +91 7678083589
              </a>
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Honeypot field (hidden off-screen for bot trap) */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0 }}
        >
          <label htmlFor="website-field">Leave this empty</label>
          <input
            id="website-field"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={websiteHoneypot}
            onChange={(e) => setWebsiteHoneypot(e.target.value)}
          />
        </div>

        {/* 1. Service Selection Chips */}
        <ServiceSelector
          selected={selectedServices}
          onChange={setSelectedServices}
          error={errors.services}
        />

        {/* 2. Contact Details: Name & Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="name" label="Your Name" required error={errors.name}>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              data-clarity-mask="true"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onFocus={handleFieldFocus}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'submitting'}
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-body text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
            />
          </FormField>

          <FormField id="email" label="Work Email" required error={errors.email}>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              data-clarity-mask="true"
              placeholder="rahul@company.com"
              value={email}
              onFocus={handleFieldFocus}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-body text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
            />
          </FormField>
        </div>

        {/* 3. Phone/WhatsApp (Optional) */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="phone"
            label="Phone / WhatsApp"
            helperText="Optional, but enables direct WhatsApp project scoping."
            error={errors.phone}
          >
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              data-clarity-mask="true"
              placeholder="+91 98765 43210"
              value={phone}
              onFocus={handleFieldFocus}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === 'submitting'}
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-body text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
            />
          </FormField>

          {/* Budget Band (Optional) */}
          <FormField
            id="budget"
            label="Estimated Budget"
            helperText="Select an approximate budget range."
            error={errors.budgetBand}
          >
            <select
              id="budget"
              value={budgetBand}
              onFocus={handleFieldFocus}
              onChange={(e) => setBudgetBand(e.target.value as BudgetBand)}
              disabled={status === 'submitting'}
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-body text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
            >
              <option value="">Select a range (optional)</option>
              {BUDGET_BANDS.map((band) => (
                <option key={band} value={band}>
                  {band === 'under-50k' && 'Under ₹50,000'}
                  {band === '50k-100k' && '₹50,000 – ₹1,00,000'}
                  {band === '100k-250k' && '₹1,00,000 – ₹2,50,000'}
                  {band === '250k-plus' && '₹2,50,000+'}
                  {band === 'prefer-not-to-say' && 'Prefer not to say'}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* 4. Timeline (Optional Radio chips) */}
        <div className="flex flex-col gap-2">
          <span className="text-small font-semibold text-foreground">
            Project Timeline (Optional)
          </span>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => {
              const isSelected = timeline === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(isSelected ? '' : t)}
                  className={`rounded-pill border px-3.5 py-1.5 text-caption font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-surface-sunken text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {t === 'asap' && 'ASAP (Immediate)'}
                  {t === '1-3-months' && '1 – 3 Months'}
                  {t === '3-6-months' && '3 – 6 Months'}
                  {t === 'flexible' && 'Flexible'}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Project Description */}
        <FormField
          id="message"
          label="Project Requirements & Objectives"
          required
          helperText="Min 20 characters. Outline your goals, desired features, or existing challenges."
          error={errors.message}
        >
          <textarea
            id="message"
            required
            rows={4}
            data-clarity-mask="true"
            placeholder="Tell us what you are looking to build or automate..."
            value={message}
            onFocus={handleFieldFocus}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === 'submitting'}
            className="min-h-[120px] w-full rounded-sm border border-input bg-background p-4 text-body text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50"
          />
        </FormField>

        {/* 6. Turnstile Verification Widget */}
        <div className="flex flex-col gap-1.5">
          <TurnstileWidget
            siteKey={turnstileSiteKey}
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken('')}
            onError={() => setTurnstileToken('')}
            resetTrigger={turnstileResetCount}
          />
          {errors.turnstileToken && (
            <p role="alert" className="text-caption font-medium text-destructive">
              {errors.turnstileToken}
            </p>
          )}
        </div>

        {/* 7. Privacy Consent Checkbox */}
        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3 select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === 'submitting'}
              className="mt-1 size-4 rounded-xs border-input text-primary focus:ring-primary"
            />
            <span className="text-caption leading-relaxed text-muted-foreground">
              I consent to 10PeakStudio collecting my contact details to evaluate and respond to my
              project enquiry in accordance with the{' '}
              <Link href="/privacy" className="text-primary underline hover:text-primary-hover">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p role="alert" className="text-caption font-medium text-destructive">
              {errors.consent}
            </p>
          )}
        </div>

        {/* 8. Submit Button */}
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={status === 'submitting'}
            aria-busy={status === 'submitting'}
            className="w-full min-w-[200px] sm:w-auto"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Submitting Enquiry...
              </>
            ) : (
              <>
                Send Project Enquiry
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
