import { EngineeringWorkflowBand } from '@/components/portfolio/EngineeringWorkflowBand';
import { FeaturedCaseStudy } from '@/components/portfolio/FeaturedCaseStudy';
import { PortfolioCatalog } from '@/components/portfolio/PortfolioCatalog';
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPortfolioProjects, getPortfolioStats, toCardData } from '@/lib/portfolio/loader';
import {
  portfolioIndexBreadcrumbJsonLd,
  portfolioIndexJsonLd,
  portfolioIndexMetadata,
} from '@/lib/seo-portfolio';

export const metadata = portfolioIndexMetadata();

/**
 * Portfolio Index (/portfolio). Static SSG page (output: 'export').
 * Renders inside RootLayout's <main id="main"> with RootLayout's SiteFooter closing CTA band.
 */
export default function PortfolioPage() {
  const projects = getAllPortfolioProjects();
  const cards = projects.map(toCardData);
  const featured = cards.find((p) => p.featured) ?? cards[0];
  const stats = getPortfolioStats(projects);

  return (
    <>
      <PortfolioHero stats={stats} />
      {featured && <FeaturedCaseStudy project={featured} />}
      <PortfolioCatalog
        projects={cards}
        topTech={stats.topTech}
        approachSection={<EngineeringWorkflowBand />}
      />
      <JsonLd data={[portfolioIndexJsonLd(projects), portfolioIndexBreadcrumbJsonLd()]} />
    </>
  );
}
