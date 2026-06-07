import type { PublicSection } from"../../lib/cms-types";

interface ProcessProps { section: PublicSection; }

export function Process({ section }: ProcessProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative border-b border-border bg-surface"
    >
      <span
        className="display-number pointer-events-none absolute left-6 top-6 text-[10rem] opacity-50 md:left-12 md:top-10 md:text-[14rem]"
        aria-hidden="true"
      >
        05
      </span>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="label-uppercase accent-rule mb-6">Process</p>
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
        <ol className="relative grid gap-6 md:grid-cols-2">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="group relative card-primary p-8 transition-all duration-300 hover:border-primary hover:shadow-[0_16px_40px_-20px_rgba(23,23,28,0.18)]"
            >
              <span className="font-mono text-sm text-muted transition-colors duration-200 group-hover:text-accent">
                {String(i + 1).padStart(2,"0")}
              </span>
              {item.title && (
                <h3 className="mt-2 text-xl text-primary">{item.title}</h3>
              )}
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
