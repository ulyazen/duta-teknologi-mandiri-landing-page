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
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="label-uppercase mb-4">Process</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <ol className="space-y-6">
          {section.items.map((item, i) => (
            <li key={i} className="grid gap-4 border-b border-border pb-6 last:border-b-0 md:grid-cols-[3rem_1fr]">
              <span className="text-3xl font-display text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                {item.title && <h3 className="text-lg font-display text-primary">{item.title}</h3>}
                {item.description && <p className="mt-2 text-base text-muted">{item.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
