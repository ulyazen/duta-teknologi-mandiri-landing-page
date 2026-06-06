import type { PublicSection } from "../../lib/cms-types";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps { section: PublicSection; }

export function Hero({ section }: HeroProps) {
  if (!section.title && !section.subtitle) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative overflow-hidden border-b border-border bg-surface"
    >
      {/* Decorative giant number behind the heading */}
      <div className="pointer-events-none absolute right-[-2rem] top-[-3rem] select-none font-display text-[18rem] font-normal leading-none text-snow" aria-hidden="true">
        01
      </div>
      {/* Subtle gradient overlay on the right */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 bg-gradient-to-l from-lightest-gray to-transparent md:block" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <p className="label-uppercase accent-rule mb-8">Duta Teknologi Mandiri</p>
            <h1
              id={`${section.sectionKey.toLowerCase()}-title`}
              className="text-display-hero text-gradient animate-fade-up"
            >
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted animate-fade-up [animation-delay:80ms]">
                {section.subtitle}
              </p>
            )}
            {section.ctaText && section.ctaLink && (
              <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:160ms]">
                <a
                  href={section.ctaLink}
                  className="btn-solid"
                >
                  {section.ctaText}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#services" className="btn-ghost text-sm">
                  See what you get
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Cohere-style "command deck" stat strip */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Sourcing", value: "Global" },
                { label: "Currencies", value: "Multi" },
                { label: "Stock", value: "Real-time" },
                { label: "Audit", value: "100%" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="card-bordered p-5 animate-fade-up"
                  style={{ animationDelay: `${120 + i * 60}ms` }}
                >
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
