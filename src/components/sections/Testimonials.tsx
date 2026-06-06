import type { PublicSection } from "../../lib/cms-types";
import { Card } from "../ui/Card";

interface TestimonialsProps { section: PublicSection; }

export function Testimonials({ section }: TestimonialsProps) {
  const items = section.items.filter((i) => i.type === "TESTIMONIAL");
  if (items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="label-uppercase mb-4">Testimonials</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Card key={i} bordered>
              {item.description && (
                <blockquote className="text-lg text-primary">"{item.description}"</blockquote>
              )}
              {(item.authorName || item.authorTitle || item.authorCompany) && (
                <footer className="mt-6 text-sm text-muted">
                  {item.authorName && <span className="font-medium text-primary">{item.authorName}</span>}
                  {item.authorTitle && <span> &middot; {item.authorTitle}</span>}
                  {item.authorCompany && <span> &middot; {item.authorCompany}</span>}
                </footer>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
