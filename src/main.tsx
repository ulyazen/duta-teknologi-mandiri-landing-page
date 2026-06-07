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
// can fade each element in. There's a brief flash of the visible state
// on JS-enabled loads, which is the trade-off for the page being
// resilient to the observer never firing.
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupRevealObserver, { once: true });
} else {
  setupRevealObserver();
}
