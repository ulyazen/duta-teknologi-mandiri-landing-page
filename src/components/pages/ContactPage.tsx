import { Nav } from "../layout/Nav";
import { Footer } from "../layout/Footer";
import { ContactForm } from "../contact/ContactForm";
import { site } from "../../content/site";
import { id as idContent } from "../../content/id";
import { en as enContent } from "../../content/en";
import type { Locale } from "../../lib/cms-types";

interface ContactPageProps {
  locale: Locale;
  pathname: string;
}

const COPY = {
  id: {
    title: "Hubungi kami",
    subtitle: "Ceritakan kebutuhan Anda. Kami akan membalas dalam satu hari kerja.",
    response: "Kami biasanya membalas dalam",
    responseTime: "satu hari kerja",
  },
  en: {
    title: "Contact us",
    subtitle: "Tell us what you need. We will reply within one business day.",
    response: "We usually reply within",
    responseTime: "one business day",
  },
} as const;

export function ContactPage({ locale, pathname }: ContactPageProps) {
  const content = locale === "id" ? idContent : enContent;
  const copy = COPY[locale];
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-surface focus:px-4 focus:py-2 focus:text-primary">
        {content.nav.skipToContent}
      </a>
      <Nav locale={locale} pathname={pathname} />
      <main id="main">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <p className="label-uppercase mb-4">Contact</p>
            <h1 className="text-display-lg font-normal text-primary">{copy.title}</h1>
            <p className="mt-4 text-lg text-muted">{copy.subtitle}</p>
            <div className="mt-12">
              <ContactForm locale={locale} />
            </div>
            <div className="mt-12 border-t border-border pt-8 text-sm text-muted">
              <p>
                {copy.response} <strong className="text-primary">{copy.responseTime}</strong>.
              </p>
              <p className="mt-2">
                Email: <a href={`mailto:${site.contactEmail}`} className="text-accent hover:underline">{site.contactEmail}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
