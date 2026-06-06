import type { PublicSection } from "../../lib/cms-types";
import { Card } from "../ui/Card";
import { CheckCircle2 } from "lucide-react";

interface AboutProps { section: PublicSection; }

export function About({ section }: AboutProps) {
  if (!section.body) return null;
  const bullets = [
    "Capability across the full chain",
    "Multi-currency purchasing in one system",
    "Real-time stock visibility",
    "Full audit trail on every order",
  ];
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-snow"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="label-uppercase mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-primary" aria-hidden="true" />
            About
          </p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
          <p className="mt-6 text-base leading-relaxed text-primary">{section.body}</p>
        </div>
        <Card bordered className="self-start">
          <p className="label-uppercase mb-4">What you get</p>
          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base text-primary">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
