import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Loader } from '@/components/brand/Loader';
import { ConsentRoot } from '@/components/consent/ConsentRoot';
import { BackToTop } from '@/components/layout/BackToTop';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { StickyCtaBar } from '@/components/layout/StickyCtaBar';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { env } from '@/lib/env';
import { BOOTSTRAP_SCRIPT } from '@/lib/motion-tier';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from '@/lib/whatsapp';
import { inter, sora } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: home.meta.title, template: `%s | ${site.name}` },
  description: home.meta.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const whatsappHref = whatsappUrl(env.NEXT_PUBLIC_WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);
  const email = env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    // The head bootstrap adds data-motion-tier / data-loader / data-js before hydration.
    <html lang="en-IN" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Static bootstrap (no user data) must run synchronously before first paint; next/script
            beforeInteractive defers it in the App Router. Documented exception to RUL-SEC-06. */}
        <script id="tps-bootstrap" dangerouslySetInnerHTML={{ __html: BOOTSTRAP_SCRIPT }} />
      </head>
      <body>
        <span id="top" tabIndex={-1} className="sr-only" />
        <SkipLink />
        <Loader />
        <MotionProvider>
          <SiteHeader whatsappHref={whatsappHref} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter email={email} whatsappHref={whatsappHref} cta={home.ctaBand} />
        </MotionProvider>
        <StickyCtaBar whatsappHref={whatsappHref} />
        <BackToTop />
        <ConsentRoot
          ga4Id={env.NEXT_PUBLIC_GA4_ID}
          clarityId={env.NEXT_PUBLIC_CLARITY_ID}
          cfToken={env.NEXT_PUBLIC_CF_WA_TOKEN}
        />
        <JsonLd data={[organizationJsonLd(email), websiteJsonLd()]} />
      </body>
    </html>
  );
}
