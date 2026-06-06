import type { PublicSection } from "../../lib/cms-types";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps { section: PublicSection; }

export function CtaBanner({ section }: CtaBannerProps) {
  if (!section.title && !section.subtitle) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative overflow-hidden bg-deep-dark text-surface"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-card bg-accent opacity-10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-card bg-accent opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <p className="label-uppercase mb-6 text-muted">Get in touch</p>
        <h2
          id={`${section.sectionKey.toLowerCase()}-title`}
          className="text-display-xl font-normal"
        >
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-6 text-lg opacity-90">{section.subtitle}</p>
        )}
        {section.ctaText && section.ctaLink && (
          <div className="mt-10 inline-flex">
            <a
              href={section.ctaLink}
              className="inline-flex items-center gap-2 rounded-pill bg-surface text-primary px-6 py-3 font-medium hover:bg-snow transition-colors"
            >
              {section.ctaText}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
