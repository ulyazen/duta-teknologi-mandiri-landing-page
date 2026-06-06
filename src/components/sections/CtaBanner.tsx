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
      {/* Subtle purple gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-soft/10"
        aria-hidden="true"
      />
      {/* Decorative offset blocks */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-card bg-accent opacity-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-card bg-accent-soft opacity-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-3rem] top-[-3rem] select-none text-[12rem] leading-none text-accent/15 md:text-[20rem]"
        aria-hidden="true"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.04em" }}
      >
        12
      </div>
      <div
        className="pointer-events-none absolute bottom-[-3rem] left-[-3rem] select-none text-[12rem] leading-none text-accent-soft/15 md:text-[20rem]"
        aria-hidden="true"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.04em" }}
      >
        09
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
        <p className="reveal label-uppercase mb-6 text-muted">Get in touch</p>
        <h2
          id={`${section.sectionKey.toLowerCase()}-title`}
          className="reveal text-display-xl"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.72) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="reveal mt-6 text-lg text-white/85">{section.subtitle}</p>
        )}
        {section.ctaText && section.ctaLink && (
          <div className="reveal mt-10 inline-flex">
            <a
              href={section.ctaLink}
              className="group inline-flex items-center gap-2 rounded-pill bg-surface px-7 py-3.5 text-base font-medium text-primary transition-all duration-200 hover:scale-[1.02] hover:bg-snow"
            >
              {section.ctaText}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
