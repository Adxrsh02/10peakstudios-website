import { getAllPortfolioProjects, toSearchRecord } from '@/lib/portfolio/loader';

export const dynamic = 'force-static';

export function GET() {
  const records = getAllPortfolioProjects().map(toSearchRecord);
  return Response.json(records, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
