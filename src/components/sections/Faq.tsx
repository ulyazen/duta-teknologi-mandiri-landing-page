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
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="label-uppercase mb-4">FAQ</p>
        <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
          {section.title}
        </h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {section.items.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="cursor-pointer list-none text-lg font-display text-primary flex items-center justify-between gap-4">
                <span>{item.title}</span>
                <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              {item.description && (
                <p className="mt-3 text-base text-muted">{item.description}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
