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
      <div className="pointer-events-none absolute right-[-2rem] bottom-[-4rem] select-none font-display text-[12rem] font-normal leading-none text-surface" aria-hidden="true">
        02
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="label-uppercase mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
            Stats
          </p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
        </div>
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="border-l-2 border-primary pl-6">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-3 text-5xl font-display font-normal text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
