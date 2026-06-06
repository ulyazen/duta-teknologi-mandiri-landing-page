import type { PublicSection } from "../../lib/cms-types";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

interface HeroProps { section: PublicSection; }

export function Hero({ section }: HeroProps) {
  if (!section.title && !section.subtitle) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative overflow-hidden border-b border-border bg-surface"
    >
      <div className="pointer-events-none absolute right-[-2rem] top-[-4rem] select-none font-display text-[16rem] font-normal leading-none text-snow" aria-hidden="true">
        01
      </div>
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 bg-gradient-to-l from-snow to-transparent md:block" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
          <div>
            <p className="label-uppercase mb-6 flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-primary" aria-hidden="true" />
              Duta Teknologi Mandiri
            </p>
            <h1
              id={`${section.sectionKey.toLowerCase()}-title`}
              className="text-display-hero font-normal text-primary"
            >
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{section.subtitle}</p>
            )}
            {section.ctaText && section.ctaLink && (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button as="a" href={section.ctaLink}>
                  {section.ctaText}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <a href="#services" className="btn-ghost text-sm">
                  See what we do
                </a>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Sourcing", value: "Global" },
                { label: "Currencies", value: "Multi" },
                { label: "Stock", value: "Real-time" },
                { label: "Audit", value: "100%" },
              ].map((s) => (
                <div key={s.label} className="card-bordered p-5">
                  <p className="label-uppercase">{s.label}</p>
                  <p className="mt-2 text-2xl font-display text-primary">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
