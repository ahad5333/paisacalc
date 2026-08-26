import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Three ascending bars — the site's "figure" colour, on the same ledger
// idea as the result panels. Drawn as flex/div blocks (not a font glyph
// or nested <svg>) since that's the one Satori pattern already proven
// reliable in this codebase (see lib/og-image.tsx).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          paddingBottom: 5,
          backgroundColor: "#2B3A8F",
          borderRadius: 7,
        }}
      >
        <div style={{ width: 5, height: 8, background: "#F7F7FB", borderRadius: 1 }} />
        <div style={{ width: 5, height: 14, background: "#F7F7FB", borderRadius: 1 }} />
        <div style={{ width: 5, height: 20, background: "#F7F7FB", borderRadius: 1 }} />
      </div>
    ),
    { ...size },
  );
}
