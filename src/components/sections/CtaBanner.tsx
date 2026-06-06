import type { PublicSection } from "../../lib/cms-types";
// Button used inline below

interface CtaBannerProps { section: PublicSection; }

export function CtaBanner({ section }: CtaBannerProps) {
  if (!section.title && !section.subtitle) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="bg-deep-dark text-surface"
    >
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal">
          {section.title}
        </h2>
        {section.subtitle && <p className="mt-4 text-lg opacity-90">{section.subtitle}</p>}
        {section.ctaText && section.ctaLink && (
          <div className="mt-8 inline-flex">
            <a
              href={section.ctaLink}
              className="inline-flex items-center gap-2 rounded-pill bg-surface text-primary px-6 py-3 font-medium hover:bg-snow transition-colors"
            >
              {section.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
