import fs from 'node:fs';
import path from 'node:path';
import {
  PORTFOLIO_INDEXABLE_THRESHOLD,
  PORTFOLIO_INDUSTRIES,
  PORTFOLIO_WORKFLOW_STEPS,
  type EngineeringStep,
} from '@/content/portfolio-config';
import {
  extractChallengePairs,
  extractFeatures,
  extractWorkflowSteps,
  parseMarkdownSections,
  splitFrontmatterAndBody,
  type ChallengeSolutionPair,
  type ExtractedFeature,
  type MarkdownSection,
} from './markdown';
import {
  portfolioFrontmatterSchema,
  type CapabilityValue,
  type ComplexityLevel,
  type IndustryValue,
  type PortfolioFrontmatter,
  type ProjectMetric,
} from './schema';

const PORTFOLIO_DIR = path.join(process.cwd(), 'content', 'portfolio');

export type PortfolioCardData = {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  type: PortfolioFrontmatter['type'];
  status: PortfolioFrontmatter['status'];
  statusNote: string | undefined;
  industry: IndustryValue;
  capabilities: CapabilityValue[];
  complexity: ComplexityLevel;
  year: number;
  duration: string;
  featured: boolean;
  order: number;
  thumbnail: PortfolioFrontmatter['thumbnail'];
  techList: string[];
  githubUrl: string | null | undefined;
  liveUrl: string | null | undefined;
  featuresText: string[];
};

export type PortfolioProject = PortfolioFrontmatter & {
  techList: string[];
  confirmedMetrics: ProjectMetric[];
  sections: MarkdownSection[];
  features: ExtractedFeature[];
  workflowSteps: EngineeringStep[];
  challenges: ChallengeSolutionPair[];
  extraSections: MarkdownSection[];
  tocItems: Array<{ id: string; label: string }>;
};

export type PortfolioSearchRecord = {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  industry: IndustryValue;
  capabilities: CapabilityValue[];
  tech: string[];
  features: string[];
  complexity: ComplexityLevel;
  status: PortfolioFrontmatter['status'];
  year: number;
  order: number;
};

function flattenTechStack(techStack: PortfolioFrontmatter['techStack']): string[] {
  const all = [
    ...techStack.frontend,
    ...techStack.backend,
    ...techStack.aiMl,
    ...techStack.database,
    ...techStack.cloud,
    ...techStack.deployment,
    ...techStack.devops,
    ...techStack.tools,
  ];
  return [...new Set(all)];
}

export function validatePortfolioMarkdown(
  rawMarkdown: string,
  expectedSlug: string,
  filePathForError: string,
): PortfolioProject {
  const { frontmatter, body } = splitFrontmatterAndBody(rawMarkdown);
  const parsed = portfolioFrontmatterSchema.safeParse(frontmatter);

  if (!parsed.success) {
    const issueText = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
      .join('; ');
    throw new Error(`[portfolio] Invalid frontmatter in "${filePathForError}": ${issueText}`);
  }

  const data = parsed.data;
  if (data.slug !== expectedSlug) {
    throw new Error(
      `[portfolio] Slug mismatch in "${filePathForError}": frontmatter slug "${data.slug}" must match filename "${expectedSlug}.md"`,
    );
  }

  // Filter strictly confirmed metrics so unconfirmed figures never leak into production HTML/JSON
  const unconfirmedCount = data.metrics.filter((m) => !m.confirmed).length;
  if (unconfirmedCount > 0 && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[portfolio] [CONFIRM] "${filePathForError}" has ${unconfirmedCount} unconfirmed metric(s); omitted from rendered output.`,
    );
  }
  const confirmedMetrics = data.metrics.filter((m) => m.confirmed);

  const sections = parseMarkdownSections(body);
  const byKey = new Map<string, MarkdownSection>();
  const extraSections: MarkdownSection[] = [];

  for (const s of sections) {
    if (s.canonicalKey === 'extra') {
      extraSections.push(s);
    } else if (!byKey.has(s.canonicalKey)) {
      byKey.set(s.canonicalKey, s);
    }
  }

  const features = extractFeatures(byKey.get('features'));
  const extractedSteps = extractWorkflowSteps(byKey.get('workflow'));
  const workflowSteps: EngineeringStep[] =
    extractedSteps.length > 0
      ? extractedSteps.map((step, idx) => ({
          number: String(idx + 1).padStart(2, '0'),
          title: step.title,
          description: step.description,
        }))
      : PORTFOLIO_WORKFLOW_STEPS;
  const challenges = extractChallengePairs(byKey.get('challenges'));
  const techList = flattenTechStack(data.techStack);

  const tocItems: Array<{ id: string; label: string }> = [];
  const pushToc = (id: string, label: string, present: boolean) => {
    if (present) tocItems.push({ id, label });
  };
  pushToc('project-overview', 'Project Overview', byKey.has('overview'));
  pushToc('problem-statement', 'Problem Statement', byKey.has('problem'));
  pushToc('business-objective', 'Business Objective', byKey.has('objective'));
  pushToc('solution', 'Solution', byKey.has('solution'));
  pushToc(
    'architecture',
    'Architecture',
    Boolean(
      data.architecture && (data.architecture.diagrams.length > 0 || data.architecture.mermaid),
    ),
  );
  pushToc('technology-stack', 'Technology Stack', techList.length > 0);
  pushToc('features', 'Features', features.length > 0);
  pushToc('development-workflow', 'Development Workflow', workflowSteps.length > 0);
  pushToc('challenges-and-solutions', 'Challenges & Solutions', challenges.length > 0);
  pushToc('performance', 'Performance', byKey.has('performance') || confirmedMetrics.length > 0);
  pushToc('screenshots', 'Screenshots', data.gallery.length > 0);
  pushToc('video-demonstration', 'Video Demonstration', Boolean(data.video));
  pushToc('research-publication', 'Research Publication', Boolean(data.publication));
  for (const extra of extraSections) {
    pushToc(extra.id, extra.heading, true);
  }
  pushToc('lessons-learned', 'Lessons Learned', byKey.has('lessonsLearned'));
  pushToc('future-improvements', 'Future Improvements', byKey.has('futureImprovements'));

  return {
    ...data,
    techList,
    confirmedMetrics,
    sections,
    features,
    workflowSteps,
    challenges,
    extraSections,
    tocItems,
  };
}

let cachedProjects: PortfolioProject[] | null = null;

export function getAllPortfolioProjects(dir: string = PORTFOLIO_DIR): PortfolioProject[] {
  if (dir === PORTFOLIO_DIR && cachedProjects && process.env.NODE_ENV === 'production') {
    return cachedProjects;
  }

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .sort();

  const loaded: PortfolioProject[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const expectedSlug = file.replace(/\.md$/, '');
    const project = validatePortfolioMarkdown(raw, expectedSlug, `content/portfolio/${file}`);
    if (project.published) {
      loaded.push(project);
    }
  }

  loaded.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return b.year - a.year;
  });

  if (dir === PORTFOLIO_DIR) {
    cachedProjects = loaded;
  }
  return loaded;
}

export function getPublishedSlugs(): string[] {
  return getAllPortfolioProjects().map((p) => p.slug);
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return getAllPortfolioProjects().find((p) => p.slug === slug);
}

export function isPortfolioIndexable(): boolean {
  return getAllPortfolioProjects().length >= PORTFOLIO_INDEXABLE_THRESHOLD;
}

export function toCardData(project: PortfolioProject): PortfolioCardData {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    shortDescription: project.shortDescription,
    type: project.type,
    status: project.status,
    statusNote: project.statusNote,
    industry: project.industry,
    capabilities: project.capabilities,
    complexity: project.complexity,
    year: project.year,
    duration: project.duration,
    featured: project.featured,
    order: project.order,
    thumbnail: project.thumbnail,
    techList: project.techList,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    featuresText: project.features.map((f) => `${f.title} ${f.description}`.trim()),
  };
}

export function toSearchRecord(project: PortfolioProject): PortfolioSearchRecord {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    shortDescription: project.shortDescription,
    industry: project.industry,
    capabilities: project.capabilities,
    tech: project.techList,
    features: project.features.map((f) => f.title),
    complexity: project.complexity,
    status: project.status,
    year: project.year,
    order: project.order,
  };
}

export function getPortfolioStats(projects: PortfolioProject[]) {
  const activeIndustries = new Set(projects.map((p) => p.industry));
  const uniqueTech = new Set(projects.flatMap((p) => p.techList));
  const industryCounts = PORTFOLIO_INDUSTRIES.map((ind) => ({
    ...ind,
    count: projects.filter((p) => p.industry === ind.id).length,
  }));

  const techFrequency = new Map<string, number>();
  for (const project of projects) {
    for (const tech of project.techList) {
      techFrequency.set(tech, (techFrequency.get(tech) ?? 0) + 1);
    }
  }
  const topTech = [...techFrequency.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([name]) => name);

  return {
    projectCount: projects.length,
    industryCount: activeIndustries.size,
    technologyCount: uniqueTech.size,
    industryCounts,
    topTech,
  };
}

export function getAdjacentAndRelatedProjects(slug: string): {
  prev: PortfolioCardData | null;
  next: PortfolioCardData | null;
  related: PortfolioCardData[];
} {
  const all = getAllPortfolioProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null, related: [] };

  const current = all[idx];
  const prevProject = idx > 0 ? all[idx - 1] : undefined;
  const nextProject = idx < all.length - 1 ? all[idx + 1] : undefined;

  const related = all
    .filter((p) => p.slug !== slug)
    .map((candidate) => {
      let score = 0;
      if (current && candidate.industry === current.industry) score += 3;
      if (current) {
        score += candidate.capabilities.filter((c) => current.capabilities.includes(c)).length;
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => toCardData(item.candidate));

  return {
    prev: prevProject ? toCardData(prevProject) : null,
    next: nextProject ? toCardData(nextProject) : null,
    related,
  };
}
