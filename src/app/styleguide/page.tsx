import type { ReactNode } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CalloutCard, FeatureCard, PillarCard } from '@/components/ui/cards';
import { ICONS } from '@/components/ui/icons';
import {
  ArrowLink,
  Chip,
  Eyebrow,
  IconBadge,
  Section,
  SectionHeading,
  TwoToneText,
} from '@/components/ui/primitives';
import { homeFaqs } from '@/content/faqs';
import { pillars, servicePath, servicesByPillar } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

/**
 * Component review page (PRD M2 exit criterion; plan step 4/5). Internal only: noindex, excluded
 * from the sitemap, disallowed in robots.txt and not linked from the site. Remove before launch.
 * Every component here is the production component, rendered with real content where it exists.
 */
export const metadata = pageMetadata({
  title: 'Styleguide',
  path: '/styleguide',
  noindex: true,
  description:
    'Internal component review page for the 10PeakStudio design system: tokens, type, buttons, cards and interactive components.',
});

// Hex values are shown as labels only; the swatch colour comes from the token utility.
const SWATCHES = [
  { name: 'Peak Violet', token: '--color-peak-violet', hex: '#8E21FC', cls: 'bg-peak-violet' },
  { name: 'Deep Violet', token: '--color-deep-violet', hex: '#480BB4', cls: 'bg-deep-violet' },
  { name: 'Lilac Spark', token: '--color-lilac-spark', hex: '#A743F8', cls: 'bg-lilac-spark' },
  { name: 'Glow Violet', token: '--color-glow-violet', hex: '#5B10E0', cls: 'bg-glow-violet' },
  { name: 'Obsidian', token: '--color-obsidian', hex: '#000000', cls: 'bg-obsidian' },
  { name: 'Ink', token: '--color-ink', hex: '#14111E', cls: 'bg-ink' },
  {
    name: 'Slate Lavender',
    token: '--color-slate-lavender',
    hex: '#8D8CA4',
    cls: 'bg-slate-lavender',
  },
  { name: 'Mist', token: '--color-mist', hex: '#D7D6E1', cls: 'bg-mist' },
  { name: 'Summit White', token: '--color-summit-white', hex: '#FCFCFC', cls: 'bg-summit-white' },
  { name: 'Paper', token: '--color-paper', hex: '#F6F5FA', cls: 'bg-paper' },
  { name: 'Muted', token: '--color-ink-muted', hex: '#5E5A70', cls: 'bg-ink-muted' },
  { name: 'Link / hover', token: '--color-violet-hover', hex: '#7A1AE0', cls: 'bg-violet-hover' },
] as const;

const GRADIENTS = [
  { name: 'Band', cls: 'bg-band' },
  { name: 'Arrow rise', cls: 'bg-arrow-rise' },
  { name: 'Summit light', cls: 'bg-summit-light' },
] as const;

const TYPE_SCALE = [
  { name: 'Display', cls: 'font-heading text-display' },
  { name: 'H1', cls: 'font-heading text-h1' },
  { name: 'H2', cls: 'font-heading text-h2' },
  { name: 'H3', cls: 'font-heading text-h3' },
  { name: 'H4', cls: 'font-heading text-h4' },
  { name: 'H5', cls: 'font-heading text-h5' },
  { name: 'Body large', cls: 'text-body-lg' },
  { name: 'Body', cls: 'text-body' },
  { name: 'Small', cls: 'text-small' },
  { name: 'Caption', cls: 'text-caption' },
] as const;

export default function StyleguidePage() {
  const build = pillars[0];
  const buildServices = servicesByPillar('build');
  return (
    <>
      <Section surface="white">
        <SectionHeading
          as="h1"
          size="h1"
          eyebrow="Internal"
          title={<TwoToneText text="Design system" accent="review" />}
          lead="Tokens and components exactly as they render on the site. Use this page for visual, keyboard and screen-reader review at 360, 768, 1024 and 1440 px."
        />
      </Section>

      <Block id="colour" title="Colour primitives" surface="paper">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SWATCHES.map((s) => (
            <li key={s.token} className="flex flex-col gap-2">
              <span
                className={`block aspect-[4/3] rounded-md border border-border ${s.cls}`}
                aria-hidden="true"
              />
              <span className="text-small font-semibold text-foreground">{s.name}</span>
              <code className="font-mono text-caption text-muted-foreground">
                {s.hex} {s.token}
              </code>
            </li>
          ))}
        </ul>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {GRADIENTS.map((g) => (
            <li key={g.name} className="flex flex-col gap-2">
              <span className={`block h-20 rounded-md ${g.cls}`} aria-hidden="true" />
              <span className="text-small font-semibold text-foreground">{g.name}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="type" title="Typography (fluid scale)">
        <ul className="flex flex-col divide-y divide-border">
          {TYPE_SCALE.map((t) => (
            <li
              key={t.name}
              className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-8"
            >
              <span className="w-28 shrink-0 text-caption text-muted-foreground">{t.name}</span>
              <span className={`${t.cls} text-foreground`}>Build. Automate. Grow.</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Eyebrow>Bracket eyebrow</Eyebrow>
          <Eyebrow variant="dot">Dot eyebrow</Eyebrow>
          <span className="font-heading text-h3 text-foreground">
            <TwoToneText text="Two-tone" accent="colour" />
          </span>
          <span className="font-heading text-h3 text-foreground">
            <TwoToneText text="Two-tone" accent="gradient" tone="gradient" />
          </span>
        </div>
      </Block>

      <Block id="buttons" title="Buttons and links" surface="paper">
        <ButtonMatrix />
      </Block>

      <Section surface="inverse" aria-labelledby="sg-inverse-title">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="sg-inverse-title"
            eyebrow="Obsidian scope"
            title={<TwoToneText text="Inverse" accent="surface" />}
            lead="Components inside .surface-inverse switch to the inverse semantic tokens."
          />
          <ButtonMatrix />
          <ul className="grid gap-5 md:grid-cols-3">
            {buildServices.slice(0, 3).map((s) => (
              <li key={s.slug}>
                <FeatureCard
                  icon={ICONS[s.icon]}
                  title={s.name}
                  description={s.offerings.join(', ') + '.'}
                />
              </li>
            ))}
          </ul>
          <Logo variant="horizontal-3d-dark" className="h-auto w-[13.5rem]" />
        </div>
      </Section>

      <Block id="cards" title="Cards">
        <div className="flex flex-col gap-6">
          {build && (
            <PillarCard
              eyebrow={build.name}
              title={build.title}
              description={build.description}
              links={buildServices.map((s) => ({ label: s.name, href: servicePath(s.slug) }))}
              cta={{ label: 'Explore Build services', href: '/services#build' }}
            />
          )}
          <ul className="grid gap-5 md:grid-cols-3">
            {buildServices.slice(0, 2).map((s, i) => (
              <li key={s.slug}>
                <FeatureCard
                  icon={ICONS[s.icon]}
                  title={s.name}
                  description={s.offerings.join(', ') + '.'}
                  href={servicePath(s.slug)}
                  linkLabel="Learn more"
                  index={String(i + 1).padStart(2, '0')}
                />
              </li>
            ))}
            <li>
              <FeatureCard
                title="Feature card without link"
                description="Used for offerings and capabilities that are not navigable."
              />
            </li>
          </ul>
          <CalloutCard
            icon={ShieldCheck}
            title="Callout card"
            body="A narrow card for a single message and one link, as used by the security teaser."
            cta={{ label: 'Read our security approach', href: '/security' }}
          />
        </div>
      </Block>

      <Block id="misc" title="Chips, icon badges, logos" surface="paper">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-3">
            <Chip>Websites</Chip>
            <Chip>Web apps</Chip>
            <Chip>AI automation</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <IconBadge icon={ICONS.globe} />
            <IconBadge icon={ICONS.bot} size="lg" />
          </div>
          <div className="flex flex-wrap items-center gap-10">
            <Logo variant="horizontal-3d-light" className="h-10 w-auto" />
            <Logo variant="horizontal-flat-light" className="h-8 w-auto" />
            <Logo variant="mark-3d-light" className="h-auto w-16" />
          </div>
        </div>
      </Block>

      <Block id="accordion" title="Accordion">
        <Accordion type="multiple" className="max-w-[68ch]">
          {homeFaqs.slice(0, 3).map((f, i) => (
            <AccordionItem key={f.question} value={`sg-${i}`}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>
                <p>{f.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Block>
    </>
  );
}

function Block({
  id,
  title,
  surface = 'white',
  children,
}: {
  id: string;
  title: string;
  surface?: 'white' | 'paper';
  children: ReactNode;
}) {
  return (
    <Section surface={surface} aria-labelledby={`sg-${id}`}>
      <h2 id={`sg-${id}`} className="mb-8 font-heading text-h3 text-foreground">
        {title}
      </h2>
      {children}
    </Section>
  );
}

function ButtonMatrix() {
  return (
    <div className="flex flex-col gap-6">
      {(['lg', 'md', 'sm'] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-4">
          <Button size={size}>
            Start a project
            <ArrowRight aria-hidden="true" strokeWidth={1.75} />
          </Button>
          <Button size={size} variant="secondary">
            <MessageCircle aria-hidden="true" strokeWidth={1.75} />
            WhatsApp us
          </Button>
          <Button size={size} disabled>
            Disabled
          </Button>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-6">
        <Button variant="ghost">Ghost button</Button>
        <ArrowLink href="/services">Explore services</ArrowLink>
        <ArrowLink href="https://example.com" external>
          External link
        </ArrowLink>
        <p className="text-body text-foreground">
          Inline{' '}
          <a href="/privacy" className="text-link underline underline-offset-[3px]">
            text link
          </a>{' '}
          in body copy.
        </p>
      </div>
    </div>
  );
}
