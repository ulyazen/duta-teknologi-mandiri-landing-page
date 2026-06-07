import { Nav } from "../layout/Nav";
import { Footer } from "../layout/Footer";
import { ContactForm } from "../contact/ContactForm";
import { Card } from "../ui/Card";
import { site } from "../../content/site";
import { id as idContent } from "../../content/id";
import { en as enContent } from "../../content/en";
import type { Locale } from "../../lib/cms-types";
import { Clock, FileCheck2, MessagesSquare } from "lucide-react";

interface ContactPageProps {
  locale: Locale;
  pathname: string;
}

const NEXT_ICONS = [Clock, FileCheck2, MessagesSquare];

export function ContactPage({ locale, pathname }: ContactPageProps) {
  const content = locale === "id" ? idContent : enContent;
  const c = content.contact;
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-surface focus:px-4 focus:py-2 focus:text-primary">
        {content.nav.skipToContent}
      </a>
      <Nav locale={locale} pathname={pathname} />
      <main id="main">
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="relative border-b border-border bg-surface"
        >
          <span
            className="display-number pointer-events-none absolute right-6 top-6 text-[10rem] opacity-50 md:right-12 md:top-10 md:text-[14rem]"
            aria-hidden="true"
          >
            11
          </span>
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="reveal max-w-3xl">
              <p className="label-uppercase accent-rule mb-6">{c.eyebrow}</p>
              <h1 id="contact-title" className="text-display-xl text-gradient">
                {c.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
                {c.subtitle}
              </p>
            </div>

            <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-start">
              <div className="reveal [--reveal-delay:120ms]">
                <ContactForm locale={locale} />
              </div>
              <div className="reveal [--reveal-delay:240ms] space-y-6">
                <p className="label-uppercase mb-2">{c.nextTitle}</p>
                <Card bordered>
                  <ul className="space-y-4">
                    {c.nextSteps.map((s, i) => {
                      const Icon = NEXT_ICONS[i] ?? Clock;
                      return (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-primary">
                          <Icon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                          <span>{s}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-6 border-t border-border pt-4 text-sm text-muted">
                    <p>
                      {c.responseLead} <strong className="text-primary">{c.responseTime}</strong>.
                    </p>
                    <p className="mt-2">
                      Email:{" "}
                      <a href={`mailto:${site.contactEmail}`} className="text-accent hover:underline">
                        {site.contactEmail}
                      </a>
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
