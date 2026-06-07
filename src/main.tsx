import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Reveal-on-scroll observer. Sets `html.js` (which makes the .reveal
// hidden start state active in CSS), then adds `is-revealed` to every
// `reveal` / `reveal-stagger` element as it enters the viewport.
//
// Default CSS state is visible — the page works without JS, screenshots
// capture the final state, and SSR / no-JS visitors see the full page.
// Setting `html.js` opts into the hidden start state, so the observer
// can fade each element in.
//
// As a safety net, we also force-reveal every reveal element after
// 1.5s. If the observer has mismeasured, the page was rendered in a
// non-standard viewport, or the user has prefers-reduced-motion set
// (which short-circuits our reduced-motion CSS), the content still
// appears.
//
// For visual review (Playwright fullPage screenshots, etc.) we add
// `?reveal=all` to the URL to reveal everything immediately.
function setupRevealObserver(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const forceReveal =
    new URLSearchParams(window.location.search).get("reveal") === "all";
  if (forceReveal) {
    document.documentElement.classList.add("js");
    document
      .querySelectorAll(".reveal, .reveal-stagger")
      .forEach((el) => el.classList.add("is-revealed"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    document.documentElement.classList.add("js");
    document
      .querySelectorAll(".reveal, .reveal-stagger")
      .forEach((el) => el.classList.add("is-revealed"));
    return;
  }
  document.documentElement.classList.add("js");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  document
    .querySelectorAll(".reveal, .reveal-stagger")
    .forEach((el) => observer.observe(el));

  // Safety net: if the observer never fires for an element (cached
  // stale state, weird viewport, third-party extension blocking,
  // browser bug, …) the page must still become usable. Reveal every
  // remaining element after 1.5s. The entry animation is 0.7s so the
  // last visible element finishes by ~2.2s, which is imperceptible.
  window.setTimeout(() => {
    document
      .querySelectorAll(".reveal:not(.is-revealed), .reveal-stagger:not(.is-revealed)")
      .forEach((el) => el.classList.add("is-revealed"));
  }, 1500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupRevealObserver, { once: true });
} else {
  setupRevealObserver();
}
