import type { PublicSection } from "../../lib/cms-types";
import { Card } from "../ui/Card";
import { Zap, Calculator, Eye, Layers } from "lucide-react";

interface WhyUsProps { section: PublicSection; }

const ICON_BY_INDEX = [Zap, Calculator, Eye, Layers];

export function WhyUs({ section }: WhyUsProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-snow"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="label-uppercase mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
            Why us
          </p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {section.items.map((item, i) => {
            const Icon = ICON_BY_INDEX[i % ICON_BY_INDEX.length];
            return (
              <li key={i}>
                <Card bordered>
                  <div className="flex items-start gap-4">
                    <Icon size={24} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      {item.title && <h3 className="text-lg font-display text-primary">{item.title}</h3>}
                      {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
