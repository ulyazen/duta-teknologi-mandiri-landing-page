#!/usr/bin/env tsx
/**
 * Copy the @fontsource woff/woff2 files referenced by src/styles.css
 * (latin subsets only) from node_modules into dist/assets/files/, so the
 * relative `url(./files/...)` references in the bundled CSS resolve at
 * runtime.
 *
 * Run automatically via the `postbuild` script in package.json.
 * The script is idempotent — safe to re-run.
 */
import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_DIRS = [
  resolve(ROOT, "node_modules/@fontsource/inter/files"),
  resolve(ROOT, "node_modules/@fontsource/space-grotesk/files"),
];
const OUT_DIR = resolve(ROOT, "dist/assets/files");

// Subset + weights we actually ship (matches src/styles.css).
// Anything outside this list is left in node_modules.
const PATTERNS = [
  /^inter-latin-(400|500)-normal\.(woff2?|ttf)$/,
  /^space-grotesk-latin-(400|500)-normal\.(woff2?|ttf)$/,
];

async function main(): Promise<void> {
  let totalCopied = 0;
  let totalBytes = 0;

  for (const srcDir of SRC_DIRS) {
    let entries: string[];
    try {
      entries = await readdir(srcDir);
    } catch {
      console.warn(`[copy-fonts] skip (missing): ${srcDir}`);
      continue;
    }
    for (const name of entries) {
      if (!PATTERNS.some((re) => re.test(name))) continue;
      const src = resolve(srcDir, name);
      const dest = resolve(OUT_DIR, name);
      await mkdir(dirname(dest), { recursive: true });
      await cp(src, dest);
      const s = await stat(dest);
      totalCopied += 1;
      totalBytes += s.size;
    }
  }

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`[copy-fonts] copied ${totalCopied} font files (${(totalBytes / 1024).toFixed(1)} KB) -> ${OUT_DIR}`);
}

main().catch((err) => {
  console.error("[copy-fonts] fatal:", err);
  process.exit(1);
});
