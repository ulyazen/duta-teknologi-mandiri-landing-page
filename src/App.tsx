import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { WhyUs } from "./components/sections/WhyUs";
import { Process } from "./components/sections/Process";
import { Stats } from "./components/sections/Stats";
import { Testimonials } from "./components/sections/Testimonials";
import { Clients } from "./components/sections/Clients";
import { Partners } from "./components/sections/Partners";
import { Gallery } from "./components/sections/Gallery";
import { Faq } from "./components/sections/Faq";
import { CtaBanner } from "./components/sections/CtaBanner";
import { ContactPage } from "./components/pages/ContactPage";
import { id as idContent } from "./content/id";
import { en as enContent } from "./content/en";
import { STUB_SECTIONS } from "./lib/stub-cms";
import { parseEmbeddedSections } from "./lib/cms-schema";
import type { Locale, PublicSection } from "./lib/cms-types";

interface AppProps {
  locale?: Locale;
  pathname?: string;
}

function loadSections(): PublicSection[] {
  if (typeof document !== "undefined") {
    const el = document.getElementById("__CMS_DATA__");
    if (el?.textContent) {
      try {
        const parsed = JSON.parse(el.textContent);
        // The prerender embeds { sections, fetchedAt, source } — not the
        // API envelope { success, data }. Unwrap the array, then validate
        // each section with the Zod schema.
        const sections = Array.isArray(parsed?.sections)
          ? parsed.sections
          : Array.isArray(parsed?.data)
            ? parsed.data
            : parsed;
        return parseEmbeddedSections(sections);
      } catch (err) {
        // Embedded CMS data failed to parse — log to the console so the
        // issue is visible during dev/build, then fall through to stub.
        console.error("[cms] embedded __CMS_DATA__ failed to parse, using stub:", err);
      }
    }
  }
  return STUB_SECTIONS;
}

function isContactPath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, "");
  return p === "/contact" || p === "/en/contact";
}

function detectLocale(pathname: string): Locale {
  const p = pathname.replace(/\/+$/, "");
  if (p === "/en" || p.startsWith("/en/")) return "en";
  return "id";
}

function detectPathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

const SECTION_RENDERERS: Record<string, (props: { section: PublicSection }) => React.ReactNode> = {
  HERO: ({ section }) => <Hero section={section} />,
  ABOUT: ({ section }) => <About section={section} />,
  SERVICES: ({ section }) => <Services section={section} />,
  WHY_US: ({ section }) => <WhyUs section={section} />,
  PROCESS: ({ section }) => <Process section={section} />,
  STATS: ({ section }) => <Stats section={section} />,
  TESTIMONIALS: ({ section }) => <Testimonials section={section} />,
  CLIENTS: ({ section }) => <Clients section={section} />,
  PARTNERS: ({ section }) => <Partners section={section} />,
  IMAGE_GALLERY: ({ section }) => <Gallery section={section} />,
  FAQ: ({ section }) => <Faq section={section} />,
  CTA_BANNER: ({ section }) => <CtaBanner section={section} />,
};

const SECTION_ORDER: (keyof typeof SECTION_RENDERERS)[] = [
  "HERO", "ABOUT", "SERVICES", "WHY_US", "PROCESS", "STATS",
  "TESTIMONIALS", "CLIENTS", "PARTNERS", "IMAGE_GALLERY", "FAQ", "CTA_BANNER",
];

function HomePage({ locale, pathname }: { locale: Locale; pathname: string }) {
  const content = locale === "id" ? idContent : enContent;
  const sections = loadSections();
  const byKey = new Map<string, PublicSection>(sections.map((s) => [s.sectionKey, s]));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-surface focus:px-4 focus:py-2 focus:text-primary">
        {content.nav.skipToContent}
      </a>
      <Nav locale={locale} pathname={pathname} />
      <main id="main">
        {SECTION_ORDER.map((key) => {
          const section = byKey.get(key);
          if (!section) return null;
          const Renderer = SECTION_RENDERERS[key];
          return <Renderer key={key} section={section as PublicSection} />;
        })}
      </main>
      <Footer locale={locale} />
    </>
  );
}

export function App(props: AppProps) {
  const pathname = props.pathname ?? detectPathname();
  const locale = props.locale ?? detectLocale(pathname);
  if (isContactPath(pathname)) {
    return <ContactPage locale={locale} pathname={pathname} />;
  }
  return <HomePage locale={locale} pathname={pathname} />;
}

export default App;
