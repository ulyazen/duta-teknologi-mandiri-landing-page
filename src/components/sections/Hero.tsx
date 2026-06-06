import type { PublicSection } from "../../lib/cms-types";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  section: PublicSection;
}

export function Hero({ section }: HeroProps) {
  if (!section.title && !section.subtitle) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative overflow-hidden border-b border-border bg-surface"
    >
      {/* Subtle dot grid behind the heading (Cohere-style) */}
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      {/* Decorative giant number behind the heading */}
      <div
        className="display-number pointer-events-none absolute -right-8 -top-12 select-none text-[16rem] text-snow md:text-[22rem]"
        aria-hidden="true"
      >
        01
      </div>
      {/* Subtle gradient overlay on the right */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 bg-linear-to-l from-lightest-gray to-transparent md:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 md:pb-36 md:pt-32">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="label-uppercase accent-rule mb-8">
              Industrial parts supply
            </p>
            <h1
              id={`${section.sectionKey.toLowerCase()}-title`}
              className="text-display-hero text-gradient animate-fade-up"
            >
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-secondary animate-fade-up [animation-delay:80ms]">
                {section.subtitle}
              </p>
            )}
            {section.ctaText && section.ctaLink && (
              <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:160ms]">
                <a href={section.ctaLink} className="btn-solid">
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

          {/* Right-side visual: prefer the CMS image (hero photo from the
           * dashboard's media library); fall back to the Cohere-style
           * "command deck" stat strip when no image is provided. */}
          {section.imageUrl ? (
            <div className="hidden animate-fade-up md:block [animation-delay:160ms]">
              <figure className="overflow-hidden rounded-card border border-border bg-snow">
                <img
                  src={section.imageUrl}
                  alt={section.imageAlt ?? ""}
                  width={640}
                  height={480}
                  loading="eager"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </figure>
            </div>
          ) : (
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
                    <p className="mt-2 text-2xl font-display text-primary">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
