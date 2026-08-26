import { readFileSync } from "node:fs";
import path from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// Satori (next/og's renderer) needs a format it can decode reliably —
// JPEG, not the WebP used for the on-page hero images — so OG images get
// their own pre-cropped 1200x630 copies in /assets/og, read once per build
// and inlined as a data URI (no server to fetch from during static export).
const dataUriCache = new Map<string, string>();

function ogImageDataUri(assetName: string): string {
  const cached = dataUriCache.get(assetName);
  if (cached) return cached;
  const bytes = readFileSync(path.join(process.cwd(), "assets", "og", assetName));
  const dataUri = `data:image/jpeg;base64,${bytes.toString("base64")}`;
  dataUriCache.set(assetName, dataUri);
  return dataUri;
}

// Shared across every opengraph-image.tsx (ticket I-09: "per-calculator,
// generated from a template") so the brand look lives in one place rather
// than nine copies. next/og's renderer only supports a constrained CSS
// subset (Satori) — no custom @font-face here, just system sans-serif and
// the site's own colour tokens.
export function ogImageTemplate(title: string, subtitle: string, heroAsset: string) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundImage: `linear-gradient(100deg, rgba(11,23,48,0.93) 0%, rgba(11,23,48,0.62) 48%, rgba(11,23,48,0.22) 100%), url(${ogImageDataUri(heroAsset)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#F7F7FB",
          opacity: 0.75,
        }}
      >
        PaisaCalc
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 60,
          fontWeight: 600,
          color: "#F7F7FB",
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 30,
          color: "#F7F7FB",
          opacity: 0.85,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}
