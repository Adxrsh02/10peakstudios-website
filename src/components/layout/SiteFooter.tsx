import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { PrivacyChoicesButton } from '@/components/consent/PrivacyChoicesButton';
import { footerColumns } from '@/content/navigation';
import { site } from '@/content/site';
import { CtaBand } from './CtaBand';

type SiteFooterProps = {
  email: string;
  whatsappHref: string | null;
  cta?: { titleLead: string; titleAccent: string; body: string } | null;
};

const linkClass =
  'inline-flex min-h-11 items-center text-inverse-muted transition-colors duration-(--duration-fast) [@media(hover:hover)]:hover:text-summit-white sm:min-h-0 sm:py-1';

/**
 * Obsidian footer (PRD 6.5, D6): final CTA band, dark 3D logo (>= 200 px), link columns,
 * Privacy choices, contact. No phone number or address (D5). Social links only when active (D4).
 */
export function SiteFooter({ email, whatsappHref, cta }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-inverse relative -mt-10 rounded-t-[2rem] sm:rounded-t-[2.5rem]">
      {cta && <CtaBand {...cta} whatsappHref={whatsappHref} />}

      <div className="container-content border-t border-border pt-14 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link href="/" aria-label="10PeakStudio home" className="w-fit rounded-sm">
              <Logo variant="horizontal-3d-dark" decorative className="h-auto w-[13.5rem]" />
            </Link>
            <p className="max-w-[36ch] text-body text-inverse-muted">{site.philosophy}</p>
            <p className="font-heading text-h5 text-summit-white">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-[1.3fr_1fr_1fr_1.7fr]">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-4 font-sans text-[0.8125rem] font-medium tracking-[0.12em] text-summit-white uppercase">
                  {col.title}
                </h2>
                <ul className="flex flex-col gap-1 sm:gap-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  {col.title === 'Legal' && (
                    <li>
                      <PrivacyChoicesButton className={linkClass} />
                    </li>
                  )}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="mb-4 font-sans text-[0.8125rem] font-medium tracking-[0.12em] text-summit-white uppercase">
                Contact
              </h2>
              <ul className="flex flex-col gap-1 sm:gap-2">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className={`${linkClass} [overflow-wrap:anywhere]`}
                    data-track="email_click"
                    data-cta-location="footer"
                  >
                    {email}
                  </a>
                </li>
                {whatsappHref && (
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                      data-track="whatsapp_click"
                      data-cta-location="footer"
                    >
                      WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className={linkClass}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-caption text-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}
            {site.legalName ? `. ${site.legalName}` : ''}
          </p>
          <p>Designed and engineered by {site.name}.</p>
        </div>
      </div>
    </footer>
  );
}
