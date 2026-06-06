import type { PublicSection } from "../../lib/cms-types";

interface FaqProps { section: PublicSection; }

export function Faq({ section }: FaqProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="label-uppercase mb-4 flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
          FAQ
        </p>
        <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
          {section.title}
        </h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {section.items.map((item, i) => (
            <details key={i} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-display text-primary">
                <span>{item.title}</span>
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              {item.description && <p className="mt-4 text-base leading-relaxed text-muted">{item.description}</p>}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
