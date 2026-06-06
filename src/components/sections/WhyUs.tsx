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
      className="relative border-b border-border bg-snow"
    >
      <span
        className="display-number pointer-events-none absolute right-6 top-6 text-[10rem] opacity-50 md:right-12 md:top-10 md:text-[14rem]"
        aria-hidden="true"
      >
        04
      </span>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="reveal mb-16 max-w-2xl">
          <p className="label-uppercase accent-rule mb-6">Why us</p>
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
        <ul className="reveal-stagger grid gap-6 md:grid-cols-2">
          {section.items.map((item, i) => {
            const Icon = ICON_BY_INDEX[i % ICON_BY_INDEX.length];
            return (
              <li key={i}>
                <Card bordered>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-lightest-gray">
                      <Icon
                        size={20}
                        className="text-primary"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      {item.title && (
                        <h3 className="text-lg text-primary">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      )}
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
