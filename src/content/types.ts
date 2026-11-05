/** Content types. All copy lives in src/content (RUL-CNT-09). */

export type PillarId = 'build' | 'automate' | 'grow';

export type IconKey =
  | 'globe'
  | 'layout-dashboard'
  | 'smartphone'
  | 'boxes'
  | 'bot'
  | 'trending-up'
  | 'palette'
  | 'clapperboard'
  | 'rocket'
  | 'store'
  | 'building'
  | 'shopping-bag'
  | 'utensils'
  | 'landmark'
  | 'message-square'
  | 'route'
  | 'refresh'
  | 'file-text'
  | 'monitor-smartphone'
  | 'accessibility'
  | 'search'
  | 'gauge'
  | 'shield-check';

export type Service = {
  slug: string;
  name: string;
  pillar: PillarId;
  /** One line for menus and cards. */
  oneLine: string;
  /** Verbatim scope from Company_info.md (PRD 5.2). */
  offerings: string[];
  icon: IconKey;
};

export type Pillar = {
  id: PillarId;
  name: string;
  role: 'primary' | 'supporting';
  definition: string;
  title: string;
  description: string;
};

export type RouteEntry = {
  path: string;
  title: string;
  /** "stub" routes are noindex and excluded from the sitemap until their page is built. */
  status: 'live' | 'stub';
  prd?: string;
};

export type Faq = { question: string; answer: string };

export type NavLink = { label: string; href: string; description?: string };
