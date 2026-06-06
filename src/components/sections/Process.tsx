import type { PublicSection } from "../../lib/cms-types";

interface ProcessProps { section: PublicSection; }

export function Process({ section }: ProcessProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="label-uppercase mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
            Process
          </p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <ol className="grid gap-6 md:grid-cols-2">
          {section.items.map((item, i) => (
            <li key={i} className="card-primary p-8">
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              {item.title && <h3 className="mt-2 text-xl font-display text-primary">{item.title}</h3>}
              {item.description && <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
