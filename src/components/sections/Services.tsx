import type { PublicSection } from "../../lib/cms-types";
import { Card } from "../ui/Card";
import { Globe, Coins, Truck, Boxes, ClipboardList, ShieldCheck } from "lucide-react";

interface ServicesProps { section: PublicSection; }

const ICON_BY_INDEX = [Globe, Coins, Truck, Boxes, ClipboardList, ShieldCheck];

export function Services({ section }: ServicesProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="label-uppercase mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
            Services
          </p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => {
            const Icon = ICON_BY_INDEX[i % ICON_BY_INDEX.length];
            return (
              <Card key={i} bordered>
                <Icon size={28} className="text-primary" aria-hidden="true" />
                {item.title && <h3 className="mt-5 text-xl font-display text-primary">{item.title}</h3>}
                {item.description && <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
