import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { InlineSpan, MarkdownBlock } from '@/lib/portfolio/markdown';
import { cn } from '@/lib/cn';

function RenderInlineSpans({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((span, idx) => {
        const key = `${span.type}-${idx}`;
        switch (span.type) {
          case 'bold':
            return (
              <strong key={key} className="font-semibold text-foreground">
                {span.text}
              </strong>
            );
          case 'italic':
            return (
              <em key={key} className="italic">
                {span.text}
              </em>
            );
          case 'code':
            return (
              <code
                key={key}
                className="rounded-sm border border-border bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
              >
                {span.text}
              </code>
            );
          case 'link': {
            const isExternal = span.href.startsWith('https://');
            if (isExternal) {
              return (
                <a
                  key={key}
                  href={span.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-medium text-link underline underline-offset-[3px] [@media(hover:hover)]:hover:text-primary"
                >
                  {span.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              );
            }
            return (
              <Link
                key={key}
                href={span.href}
                className="font-medium text-link underline underline-offset-[3px] [@media(hover:hover)]:hover:text-primary"
              >
                {span.label}
              </Link>
            );
          }
          case 'text':
          default:
            return <span key={key}>{span.text}</span>;
        }
      })}
    </>
  );
}

type MarkdownContentProps = {
  blocks: MarkdownBlock[];
  className?: string;
};

/**
 * Pure React JSX renderer for build-time parsed Markdown AST blocks.
 * Uses zero dangerouslySetInnerHTML (RUL-SEC-06) and enforces left-aligned readable prose (RUL-ST-05).
 */
export function MarkdownContent({ blocks, className }: MarkdownContentProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {blocks.map((block, idx) => {
        const key = `${block.type}-${idx}`;
        switch (block.type) {
          case 'heading3':
            return (
              <h3 key={key} id={block.id} className="mt-3 text-h4 text-foreground">
                {block.text}
              </h3>
            );

          case 'paragraph':
            return (
              <p key={key} className="max-w-[68ch] text-body-lg text-muted-foreground">
                <RenderInlineSpans spans={block.spans} />
              </p>
            );

          case 'blockquote':
            return (
              <blockquote
                key={key}
                className="max-w-[68ch] rounded-r-md border-l-4 border-primary bg-surface-sunken px-5 py-4 text-body text-foreground"
              >
                <RenderInlineSpans spans={block.spans} />
              </blockquote>
            );

          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul';
            return (
              <ListTag
                key={key}
                className={cn(
                  'flex max-w-[68ch] flex-col gap-2.5 pl-6 text-body text-muted-foreground',
                  block.ordered ? 'list-decimal' : 'list-disc marker:text-brand-accent',
                )}
              >
                {block.items.map((itemSpans, itemIdx) => (
                  <li key={`${key}-item-${itemIdx}`} className="pl-1">
                    <RenderInlineSpans spans={itemSpans} />
                  </li>
                ))}
              </ListTag>
            );
          }

          case 'code':
            return (
              <div
                key={key}
                className="overflow-hidden rounded-md border border-inverse-rule bg-ink text-summit-white"
              >
                <div className="flex items-center justify-between border-b border-inverse-rule px-4 py-2 text-caption text-inverse-muted">
                  <span className="font-mono uppercase">{block.lang}</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-small leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          case 'table':
            return (
              <div key={key} className="flex flex-col gap-2">
                <p className="text-caption font-medium text-muted-foreground md:hidden">
                  Scroll horizontally to compare all columns &rarr;
                </p>
                <div
                  role="region"
                  aria-label="Comparison data table"
                  tabIndex={0}
                  className="overflow-x-auto rounded-md border border-border bg-card shadow-sm"
                >
                  <table className="w-full min-w-[34rem] border-collapse text-left text-small">
                    <thead>
                      <tr className="border-b border-border bg-surface-sunken">
                        {block.headers.map((headerSpans, hIdx) => {
                          const align = block.alignments[hIdx] ?? 'left';
                          return (
                            <th
                              key={`${key}-h-${hIdx}`}
                              scope="col"
                              className={cn(
                                'px-4 py-3.5 font-heading text-small font-semibold whitespace-nowrap text-foreground',
                                align === 'right' && 'text-right',
                                align === 'center' && 'text-center',
                              )}
                            >
                              <RenderInlineSpans spans={headerSpans} />
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {block.rows.map((row, rIdx) => (
                        <tr
                          key={`${key}-r-${rIdx}`}
                          className="transition-colors [@media(hover:hover)]:hover:bg-surface-sunken/70"
                        >
                          {row.map((cellSpans, cIdx) => {
                            const align = block.alignments[cIdx] ?? 'left';
                            return (
                              <td
                                key={`${key}-r-${rIdx}-c-${cIdx}`}
                                className={cn(
                                  'px-4 py-3 text-muted-foreground',
                                  cIdx === 0 && 'font-medium text-foreground',
                                  align === 'right' && 'price text-right',
                                  align === 'center' && 'text-center',
                                )}
                              >
                                <RenderInlineSpans spans={cellSpans} />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
