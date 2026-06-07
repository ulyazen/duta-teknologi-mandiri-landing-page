#!/usr/bin/env tsx
/**
 * Zero-dependency static file server for the prerendered `dist/`.
 *
 * Why this exists: `vite preview` pulls in esbuild + a WebAssembly
 * runtime that easily blows past the 4 GB address-space limit on
 * constrained hosts (Biznet Neo, shared LVE). This server is plain
 * Node `http` + `fs`, no WASM, ~10 MB RSS.
 *
 * Usage: `npm start`  (port 5000, host 0.0.0.0)
 *        `PORT=8080 npm start`  (override)
 *
 * Behavior:
 *   - Serves files from `./dist` (the prerender output).
 *   - Falls back to `dist/<path>/index.html` for directory requests
 *     so client routes like `/contact/` resolve correctly.
 *   - Falls back to `dist/200.html` then `dist/index.html` for
 *     unknown routes (SPA fallback).
 *   - Sets `Cache-Control: public, max-age=300` for `assets/` (hashed
 *     filenames) and `no-cache` for everything else.
 *   - Streams large files instead of buffering.
 */
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { createReadStream, statSync, existsSync, readFileSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = resolve(process.cwd(), "dist");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".mjs":  "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico":  "image/x-icon",
  ".woff":  "font/woff",
  ".woff2": "font/woff2",
  ".txt":  "text/plain; charset=utf-8",
  ".xml":  "application/xml; charset=utf-8",
};

function safeJoin(root: string, urlPath: string): string | null {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const cleaned = normalize(decoded).replace(/^[/\\]+/, "");
  const full = resolve(root, cleaned);
  if (!full.startsWith(root + sep) && full !== root) return null;
  return full;
}

function sendFile(absPath: string, res: ServerResponse): void {
  const stat = statSync(absPath);
  if (!stat.isFile()) {
    send404(res);
    return;
  }
  const ext = extname(absPath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
  res.setHeader("Content-Length", String(stat.size));
  res.setHeader("Cache-Control", absPath.includes(`${sep}assets${sep}`) || absPath.includes(`${sep}files${sep}`) ? "public, max-age=31536000, immutable" : "public, max-age=300");
  createReadStream(absPath).pipe(res);
}

function send404(res: ServerResponse): void {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not found");
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    if (!req.url) return send404(res);
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    let abs = safeJoin(ROOT, urlPath);
    if (!abs) return send404(res);

    // If it's a directory, append index.html
    if (existsSync(abs) && statSync(abs).isDirectory()) {
      abs = join(abs, "index.html");
    }

    if (!existsSync(abs)) {
      // SPA fallback chain: try 200.html (Netlify-style), then index.html
      const fallback200 = join(ROOT, "200.html");
      if (existsSync(fallback200)) return sendFile(fallback200, res);
      const fallbackIndex = join(ROOT, "index.html");
      if (existsSync(fallbackIndex)) {
        res.statusCode = 200;
        res.setHeader("Content-Type", MIME[".html"] ?? "text/html; charset=utf-8");
        res.end(readFileSync(fallbackIndex));
        return;
      }
      return send404(res);
    }

    sendFile(abs, res);
  } catch (err) {
    console.error("[serve] error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
    }
    res.end("Internal server error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[serve] listening on http://${HOST}:${PORT}  (root: ${ROOT})`);
});
