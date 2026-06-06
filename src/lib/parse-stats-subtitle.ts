import type { PublicSection } from "./cms-types";

export interface StatItem {
  label: string;
  value: string;
}

export function parseStatsSubtitle(section: PublicSection): StatItem[] {
  if (!section.subtitle) return [];
  try {
    const parsed = JSON.parse(section.subtitle);
    if (Array.isArray(parsed)) {
      return parsed
        .filter(
          (x): x is StatItem =>
            typeof x === "object" &&
            x !== null &&
            typeof x.label === "string" &&
            typeof x.value === "string"
        )
        .map((x) => ({ label: x.label, value: x.value }));
    }
  } catch {
    // fall through to empty
  }
  return [];
}
