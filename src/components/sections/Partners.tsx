import type { PublicSection } from "../../lib/cms-types";

interface PartnersProps { section: PublicSection; }

export function Partners({ section }: PartnersProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="label-uppercase mb-4">Partners</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-center justify-center p-4">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.title ?? ""}
                  loading="lazy"
                  decoding="async"
                  width={120}
                  height={48}
                  className="max-h-12 w-auto opacity-70"
                />
              ) : item.title ? (
                <span className="text-sm text-muted">{item.title}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
