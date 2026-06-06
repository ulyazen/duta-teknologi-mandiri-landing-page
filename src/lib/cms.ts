// Server-only CMS client. Reads from CMS_API_BASE_URL at build time.
// Throws a typed CmsError on failure. The build fails loudly if the
// API is unreachable (no silent half-empty sites).

import { parsePublicSection, parsePublicSections } from "./cms-schema";
import type { PublicSection } from "./cms-types";

export type CmsError =
  | { kind: "network"; message: string }
  | { kind: "http"; status: number; message: string }
  | { kind: "parse"; message: string };

const DEFAULT_TIMEOUT_MS = 5_000;

function getApiBase(): string {
  const base = (import.meta.env?.VITE_CMS_API_BASE_URL ?? process.env.CMS_API_BASE_URL) as string | undefined;
  if (!base) {
    throw new Error("CMS_API_BASE_URL is not set");
  }
  return base.replace(/\/+$/, "");
}

function toCmsError(err: unknown): CmsError {
  if (err instanceof Error) {
    if (err.name === "AbortError" || /fetch|network|ENOTFOUND|ECONNREFUSED/i.test(err.message)) {
      return { kind: "network", message: err.message };
    }
    if (/^CMS (response|section) validation failed/.test(err.message)) {
      return { kind: "parse", message: err.message };
    }
  }
  return { kind: "network", message: String(err) };
}

interface FetchOpts {
  signal?: AbortSignal;
  timeoutMs?: number;
}

export async function getLandingPage(opts: FetchOpts = {}): Promise<{ sections: PublicSection[]; fetchedAt: string }> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, signal } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const composedSignal = signal
    ? mergeSignals([signal, controller.signal])
    : controller.signal;
  try {
    const base = getApiBase();
    const url = `${base}/api/landing-page`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: composedSignal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err: CmsError = {
        kind: "http",
        status: res.status,
        message: `CMS responded ${res.status}: ${text.slice(0, 200)}`,
      };
      throw err;
    }
    const json: unknown = await res.json();
    const sections = parsePublicSections(json);
    return { sections, fetchedAt: new Date().toISOString() };
  } catch (err) {
    throw toCmsError(err);
  } finally {
    clearTimeout(timer);
  }
}

export async function getLandingPageSection(key: PublicSection["sectionKey"], opts: FetchOpts = {}): Promise<PublicSection> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, signal } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const composedSignal = signal
    ? mergeSignals([signal, controller.signal])
    : controller.signal;
  try {
    const base = getApiBase();
    const url = `${base}/api/landing-page?key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: composedSignal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err: CmsError = {
        kind: "http",
        status: res.status,
        message: `CMS responded ${res.status}: ${text.slice(0, 200)}`,
      };
      throw err;
    }
    const json: unknown = await res.json();
    return parsePublicSection(json);
  } catch (err) {
    throw toCmsError(err);
  } finally {
    clearTimeout(timer);
  }
}

function mergeSignals(signals: AbortSignal[]): AbortSignal {
  // Simple merging: if any signal is aborted, the composed signal is aborted.
  // For v1 we use the first signal's already-aborted state and chain listeners.
  const composed = new AbortController();
  for (const s of signals) {
    if (s.aborted) {
      composed.abort(s.reason);
      break;
    }
    s.addEventListener("abort", () => composed.abort(s.reason), { once: true });
  }
  return composed.signal;
}
