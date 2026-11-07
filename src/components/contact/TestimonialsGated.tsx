import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { contact } from '@/content/contact';

export function TestimonialsGated() {
  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === 'true';

  if (!showTestimonials) {
    return null;
  }

  return (
    <Section surface="white" aria-labelledby="testimonials-heading">
      <div className="container-wide flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            eyebrow={contact.testimonials.eyebrow}
            title={
              <TwoToneText
                text={contact.testimonials.titleLead}
                accent={contact.testimonials.titleAccent}
              />
            }
            lead={contact.testimonials.lead}
          />
        </Reveal>

        <Reveal className="grid gap-6 sm:grid-cols-2">
          {contact.testimonials.items.map((item, idx) => (
            <article
              key={idx}
              data-reveal-item=""
              className="flex flex-col justify-between gap-6 rounded-md border border-border bg-card p-6 shadow-xs sm:p-8"
            >
              <blockquote className="text-body-lg leading-relaxed text-foreground italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="flex flex-col">
                  <span className="font-heading text-small font-semibold text-foreground">
                    {item.clientName}
                  </span>
                  <span className="text-caption text-muted-foreground">
                    {item.role}, {item.company}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
