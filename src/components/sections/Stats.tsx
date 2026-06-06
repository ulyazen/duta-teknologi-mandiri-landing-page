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
      className="border-b border-border bg-snow"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="label-uppercase mb-4">Stats</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
        </div>
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="border-l border-border pl-6">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-2 text-4xl font-display text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
