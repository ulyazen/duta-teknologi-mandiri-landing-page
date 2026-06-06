import type { PublicSection } from "../../lib/cms-types";
import { Card } from "../ui/Card";
import { Globe, Coins, Truck, Boxes, ClipboardList, ShieldCheck, ArrowUpRight } from "lucide-react";

interface ServicesProps { section: PublicSection; }

const ICON_BY_INDEX = [Globe, Coins, Truck, Boxes, ClipboardList, ShieldCheck];

export function Services({ section }: ServicesProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative border-b border-border bg-surface"
    >
      <span
        className="display-number pointer-events-none absolute left-6 top-6 text-[10rem] opacity-50 md:left-12 md:top-10 md:text-[14rem]"
        aria-hidden="true"
      >
        03
      </span>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="reveal mb-16 max-w-2xl">
          <p className="label-uppercase accent-rule mb-6">Services</p>
          <h2
            id={`${section.sectionKey.toLowerCase()}-title`}
            className="text-display-lg text-primary"
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-secondary">
              {section.subtitle}
            </p>
          )}
        </div>
        <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => {
            const Icon = ICON_BY_INDEX[i % ICON_BY_INDEX.length];
            return (
              <Card key={i} bordered>
                <div className="flex items-start justify-between">
                  <Icon
                    size={28}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    size={18}
                    className="text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                {item.title && (
                  <h3 className="mt-5 text-xl text-primary">{item.title}</h3>
                )}
                {item.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
