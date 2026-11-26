import type { PortfolioCardData } from './loader';
import { portfolioQuerySchema, type ComplexityLevel, type PortfolioQueryState } from './schema';

const COMPLEXITY_RANK: Record<ComplexityLevel, number> = {
  Enterprise: 4,
  Advanced: 3,
  Intermediate: 2,
  Foundational: 1,
};

export type SearchResultItem = {
  project: PortfolioCardData;
  score: number;
};

export type HighlightSegment = {
  text: string;
  matched: boolean;
};

export function tokenizeQuery(raw: string): string[] {
  return raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

/** Bounded Damerau-Levenshtein distance with fast early exit when exceeding maxDist. */
function editDistanceWithin(a: string, b: string, maxDist: number): number {
  const lenA = a.length;
  const lenB = b.length;
  if (Math.abs(lenA - lenB) > maxDist) return maxDist + 1;
  if (lenA === 0) return lenB;
  if (lenB === 0) return lenA;

  const prev = new Array<number>(lenB + 1);
  const curr = new Array<number>(lenB + 1);
  for (let j = 0; j <= lenB; j += 1) prev[j] = j;

  for (let i = 1; i <= lenA; i += 1) {
    curr[0] = i;
    let rowMin = i;
    const chA = a[i - 1];
    for (let j = 1; j <= lenB; j += 1) {
      const cost = chA === b[j - 1] ? 0 : 1;
      const del = (prev[j] ?? maxDist + 1) + 1;
      const ins = (curr[j - 1] ?? maxDist + 1) + 1;
      const sub = (prev[j - 1] ?? maxDist + 1) + cost;
      const val = Math.min(del, ins, sub);
      curr[j] = val;
      if (val < rowMin) rowMin = val;
    }
    if (rowMin > maxDist) return maxDist + 1;
    for (let j = 0; j <= lenB; j += 1) prev[j] = curr[j] ?? maxDist + 1;
  }

  return prev[lenB] ?? maxDist + 1;
}

function scoreFieldTokenMatch(fieldText: string, queryToken: string): number {
  const lower = fieldText.toLowerCase();
  if (lower.includes(queryToken)) {
    // Word-start or exact token hits outrank mid-word substrings
    const words = lower.split(/[^a-z0-9]+/).filter(Boolean);
    if (words.some((w) => w === queryToken)) return 1.0;
    if (words.some((w) => w.startsWith(queryToken))) return 0.9;
    return 0.75;
  }

  const maxDist = queryToken.length >= 7 ? 2 : queryToken.length >= 4 ? 1 : 0;
  if (maxDist === 0) return 0;

  const words = lower.split(/[^a-z0-9]+/).filter(Boolean);
  for (const word of words) {
    if (word.length < 3) continue;
    // Compare against full word or matching-length prefix for typo+prefix queries
    const distFull = editDistanceWithin(word, queryToken, maxDist);
    if (distFull <= maxDist) return distFull === 1 ? 0.55 : 0.4;
    if (word.length > queryToken.length + 1) {
      const distPrefix = editDistanceWithin(word.slice(0, queryToken.length), queryToken, maxDist);
      if (distPrefix <= maxDist) return 0.45;
    }
  }

  return 0;
}

export function scoreProject(project: PortfolioCardData, tokens: string[]): number {
  if (tokens.length === 0) return 1;

  const techJoined = project.techList.join(' ');
  const capabilitiesJoined = project.capabilities.join(' ');
  const featuresJoined = project.featuresText.join(' ');

  let totalScore = 0;
  for (const token of tokens) {
    const titleScore = scoreFieldTokenMatch(project.title, token) * 5;
    const taglineScore = scoreFieldTokenMatch(project.tagline, token) * 3.5;
    const tagScore =
      Math.max(
        scoreFieldTokenMatch(techJoined, token),
        scoreFieldTokenMatch(capabilitiesJoined, token),
        scoreFieldTokenMatch(project.industry, token),
      ) * 3;
    const featureScore = scoreFieldTokenMatch(featuresJoined, token) * 2;
    const descScore = scoreFieldTokenMatch(project.shortDescription, token) * 1.5;

    const bestForToken = Math.max(titleScore, taglineScore, tagScore, featureScore, descScore);
    if (bestForToken === 0) {
      return 0; // Require all query terms to match somewhere for precision
    }
    totalScore += bestForToken;
  }

  return totalScore;
}

export function filterAndSortProjects(
  projects: PortfolioCardData[],
  query: PortfolioQueryState,
): SearchResultItem[] {
  const tokens = tokenizeQuery(query.q);

  const matched = projects
    .filter((project) => {
      if (query.industry !== 'all' && project.industry !== query.industry) return false;
      if (query.capability !== 'all' && !project.capabilities.includes(query.capability)) {
        return false;
      }
      if (
        query.tech !== 'all' &&
        !project.techList.some((t) => t.toLowerCase() === query.tech.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .map((project) => ({
      project,
      score: scoreProject(project, tokens),
    }))
    .filter((item) => item.score > 0);

  matched.sort((a, b) => {
    // When actively searching, sort by relevance score first
    if (tokens.length > 0 && Math.abs(b.score - a.score) > 0.25) {
      return b.score - a.score;
    }

    switch (query.sort) {
      case 'newest':
        return b.project.year - a.project.year || a.project.order - b.project.order;
      case 'complexity':
        return (
          COMPLEXITY_RANK[b.project.complexity] - COMPLEXITY_RANK[a.project.complexity] ||
          a.project.order - b.project.order
        );
      case 'featured':
      default:
        if (a.project.featured !== b.project.featured) return a.project.featured ? -1 : 1;
        return a.project.order - b.project.order || b.project.year - a.project.year;
    }
  });

  return matched;
}

export function findMatchSegments(text: string, tokens: string[]): HighlightSegment[] {
  if (tokens.length === 0 || text.length === 0) {
    return [{ text, matched: false }];
  }

  const escaped = tokens
    .filter((t) => t.length >= 2)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) return [{ text, matched: false }];

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      matched: escaped.some((esc) => new RegExp(`^${esc}$`, 'i').test(part)),
    }));
}

export function parsePortfolioQuery(search: string): PortfolioQueryState {
  const params = new URLSearchParams(search);
  return portfolioQuerySchema.parse({
    q: params.get('q') ?? undefined,
    industry: params.get('industry') ?? undefined,
    capability: params.get('capability') ?? undefined,
    tech: params.get('tech') ?? undefined,
    sort: params.get('sort') ?? undefined,
  });
}

export function serializePortfolioQuery(state: PortfolioQueryState): string {
  const params = new URLSearchParams();
  if (state.q.trim() !== '') params.set('q', state.q.trim());
  if (state.industry !== 'all') params.set('industry', state.industry);
  if (state.capability !== 'all') params.set('capability', state.capability);
  if (state.tech !== 'all') params.set('tech', state.tech);
  if (state.sort !== 'featured') params.set('sort', state.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
