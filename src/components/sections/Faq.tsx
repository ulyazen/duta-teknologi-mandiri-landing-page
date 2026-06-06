import type { PublicSection } from "../../lib/cms-types";

interface FaqProps { section: PublicSection; }

export function Faq({ section }: FaqProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative border-b border-border bg-surface"
    >
      <span
        className="display-number pointer-events-none absolute right-6 top-6 text-[10rem] opacity-50 md:right-12 md:top-10 md:text-[14rem]"
        aria-hidden="true"
      >
        08
      </span>
      <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
        <div className="reveal mb-12">
          <p className="label-uppercase accent-rule mb-6">FAQ</p>
          <h2
            id={`${section.sectionKey.toLowerCase()}-title`}
            className="text-display-lg text-primary"
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-secondary">
              {section.subtitle}
            </p>
          )}
        </div>
        <div className="reveal-stagger divide-y divide-border border-y border-border">
          {section.items.map((item, i) => (
            <details
              key={i}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg text-primary transition-colors hover:text-accent">
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-border text-muted transition-all duration-300 group-open:rotate-45 group-open:border-accent group-open:text-accent"
                >
                  +
                </span>
              </summary>
              {item.description && (
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
