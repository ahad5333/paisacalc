// Next.js 16's static exporter writes segment-cache RSC payloads as nested
// directories (out/home-loan-emi/__next.home-loan-emi/__PAGE__.txt), but the
// client router requests the flattened, dot-separated filename
// (__next.home-loan-emi.__PAGE__.txt) — a confirmed upstream bug on Windows
// builds (vercel/next.js#85374). Left unfixed, every client-side <Link>
// navigation 404s on this payload and falls back to a full reload after a
// ~10s delay. This script flattens the mismatched files after each build;
// safe to delete once upstream ships a fix.
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const OUT_DIR = "out";

function walkFiles(dir, onFile) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, onFile);
    } else {
      onFile(full);
    }
  }
}

function flatten(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      walkFiles(full, (filePath) => {
        const relPath = relative(dir, filePath);
        const flatName = relPath.split(/[\\/]/).join(".");
        const target = join(dir, flatName);
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(filePath, target);
      });
      rmSync(full, { recursive: true, force: true });
    } else {
      flatten(full);
    }
  }
}

flatten(OUT_DIR);
console.log("Fixed segment-cache RSC path mismatch in", OUT_DIR, "(vercel/next.js#85374)");
