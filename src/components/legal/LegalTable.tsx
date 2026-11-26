import type { ReactNode } from 'react';

type LegalTableProps = {
  caption: string;
  headers: string[];
  children: ReactNode;
};

/**
 * Responsive legal disclosure table with horizontal scroll hint on mobile and semantic headers.
 */
export function LegalTable({ caption, headers, children }: LegalTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="no-print text-caption font-medium text-muted-foreground md:hidden">
        Scroll horizontally to read all columns &rarr;
      </p>
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="overflow-x-auto rounded-md border border-border bg-card shadow-xs"
      >
        <table className="w-full min-w-[38rem] border-collapse text-left text-small">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border bg-surface-sunken">
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 font-heading text-small font-semibold whitespace-nowrap text-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
