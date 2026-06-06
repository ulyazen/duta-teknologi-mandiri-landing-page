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
import { id as idContent } from "./content/id";
import { en as enContent } from "./content/en";
import { STUB_SECTIONS } from "./lib/stub-cms";
import type { Locale } from "./lib/cms-types";

interface AppProps {
  locale?: Locale;
  pathname?: string;
}

export function App({ locale = "id", pathname = "/" }: AppProps) {
  const content = locale === "id" ? idContent : enContent;
  const sections = STUB_SECTIONS;

  const renderSection = (key: string) => {
    const section = sections.find((s) => s.sectionKey === key);
    if (!section) return null;
    switch (key) {
      case "HERO": return <Hero key={key} section={section} />;
      case "ABOUT": return <About key={key} section={section} />;
      case "SERVICES": return <Services key={key} section={section} />;
      case "WHY_US": return <WhyUs key={key} section={section} />;
      case "PROCESS": return <Process key={key} section={section} />;
      case "STATS": return <Stats key={key} section={section} />;
      case "TESTIMONIALS": return <Testimonials key={key} section={section} />;
      case "CLIENTS": return <Clients key={key} section={section} />;
      case "PARTNERS": return <Partners key={key} section={section} />;
      case "IMAGE_GALLERY": return <Gallery key={key} section={section} />;
      case "FAQ": return <Faq key={key} section={section} />;
      case "CTA_BANNER": return <CtaBanner key={key} section={section} />;
      default: return null;
    }
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-surface focus:px-4 focus:py-2 focus:text-primary">
        {content.nav.skipToContent}
      </a>
      <Nav locale={locale} pathname={pathname} />
      <main id="main">
        {renderSection("HERO")}
        {renderSection("ABOUT")}
        {renderSection("SERVICES")}
        {renderSection("WHY_US")}
        {renderSection("PROCESS")}
        {renderSection("STATS")}
        {renderSection("TESTIMONIALS")}
        {renderSection("CLIENTS")}
        {renderSection("PARTNERS")}
        {renderSection("IMAGE_GALLERY")}
        {renderSection("FAQ")}
        {renderSection("CTA_BANNER")}
      </main>
      <Footer locale={locale} />
    </>
  );
}

export default App;
