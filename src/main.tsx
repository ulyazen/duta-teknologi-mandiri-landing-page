import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Reveal-on-scroll observer. Adds `is-revealed` to every element with
// the `reveal` or `reveal-stagger` class once it enters the viewport.
// For visual review (Playwright fullPage screenshots, etc.) we add
// `?reveal=all` to the URL to reveal everything immediately.
function setupRevealObserver(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const forceReveal =
    new URLSearchParams(window.location.search).get("reveal") === "all";
  if (forceReveal) {
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
