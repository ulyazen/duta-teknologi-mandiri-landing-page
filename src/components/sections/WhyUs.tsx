import type { PublicSection } from "../../lib/cms-types";
import { Card } from "../ui/Card";

interface WhyUsProps { section: PublicSection; }

export function WhyUs({ section }: WhyUsProps) {
  if (section.items.length === 0) return null;
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-snow"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="label-uppercase mb-4">Why us</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {section.items.map((item, i) => (
            <li key={i}>
              <Card>
                {item.title && <h3 className="text-lg font-display text-primary">{item.title}</h3>}
                {item.description && <p className="mt-2 text-sm text-muted">{item.description}</p>}
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
