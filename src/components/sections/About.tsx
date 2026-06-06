import type { PublicSection } from "../../lib/cms-types";

interface AboutProps { section: PublicSection; }

export function About({ section }: AboutProps) {
  if (!section.body) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-snow"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="label-uppercase mb-4">About</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <div>
          <p className="text-base leading-relaxed text-primary">{section.body}</p>
        </div>
      </div>
    </section>
  );
}
