'use client';

import { useState } from 'react';
import { ArrowUpRight, Download, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ProjectPublication } from '@/lib/portfolio/schema';

export function ResearchPaperCard({ publication }: { publication: ProjectPublication }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-md border border-border bg-surface-sunken p-6 sm:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-sm border border-border bg-background text-brand-accent"
            >
              <FileText className="size-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-caption font-semibold tracking-[0.1em] text-brand-accent uppercase">
                Published Research Paper
                {publication.paperId ? ` · Paper ID ${publication.paperId}` : ''}
              </p>
              <h3 className="text-h4 text-foreground">{publication.title}</h3>
              <p className="text-small font-medium text-muted-foreground">{publication.venue}</p>
            </div>
          </div>

          {publication.venueUrl && (
            <a
              href={publication.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-small font-semibold text-link hover:underline"
            >
              Conference site
              <ArrowUpRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>

        <p className="max-w-[70ch] text-body text-muted-foreground">{publication.abstract}</p>

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" size="md">
                <Eye aria-hidden="true" strokeWidth={1.75} />
                Preview Paper PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl p-4 sm:p-6">
              <DialogTitle className="text-h5">{publication.title}</DialogTitle>
              <DialogDescription>
                {publication.venue} — Use browser PDF controls below or open directly in a new tab.
              </DialogDescription>
              <div className="flex flex-col gap-3">
                <iframe
                  title={`PDF preview: ${publication.title}`}
                  src={publication.pdfUrl}
                  className="h-[65dvh] w-full rounded-sm border border-border bg-surface-sunken"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={publication.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-small font-semibold text-link hover:underline"
                  >
                    Open full PDF in new tab
                    <ArrowUpRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
                  </a>
                  <Button asChild variant="secondary" size="sm">
                    <a href={publication.pdfUrl} download>
                      <Download aria-hidden="true" strokeWidth={1.75} />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button asChild variant="secondary" size="md">
            <a href={publication.pdfUrl} download>
              <Download aria-hidden="true" strokeWidth={1.75} />
              Download PDF
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
