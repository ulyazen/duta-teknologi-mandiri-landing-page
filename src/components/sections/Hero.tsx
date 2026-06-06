import type { PublicSection } from "../../lib/cms-types";
import { Button } from "../ui/Button";

interface HeroProps { section: PublicSection; }

export function Hero({ section }: HeroProps) {
  if (!section.title && !section.subtitle) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="label-uppercase mb-6">Duta Teknologi Mandiri</p>
        <h1 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-hero font-normal text-primary">
          {section.title}
        </h1>
        {section.subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-muted">{section.subtitle}</p>
        )}
        {section.ctaText && section.ctaLink && (
          <div className="mt-10">
            <Button as="a" href={section.ctaLink}>{section.ctaText}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
