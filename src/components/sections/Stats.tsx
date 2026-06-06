import type { PublicSection } from "../../lib/cms-types";
import { parseStatsSubtitle } from "../../lib/parse-stats-subtitle";

interface StatsProps { section: PublicSection; }

export function Stats({ section }: StatsProps) {
  const stats = parseStatsSubtitle(section);
  if (stats.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative overflow-hidden border-b border-border bg-snow"
    >
      <span
        className="display-number pointer-events-none absolute right-6 top-6 text-[10rem] opacity-40 md:right-12 md:top-10 md:text-[14rem]"
        aria-hidden="true"
      >
        06
      </span>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="reveal mb-16 max-w-2xl">
          <p className="label-uppercase accent-rule mb-6">Stats</p>
          <h2
            id={`${section.sectionKey.toLowerCase()}-title`}
            className="text-display-lg text-primary"
          >
            {section.title}
          </h2>
        </div>
        <dl className="reveal-stagger grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group border-l-2 border-primary pl-6 transition-colors duration-200 hover:border-accent"
            >
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-3 text-5xl text-primary transition-colors duration-200 group-hover:text-accent">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
