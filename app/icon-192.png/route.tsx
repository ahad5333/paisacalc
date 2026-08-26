import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Web app manifest icon — same three-bar mark as app/icon.tsx and
// app/apple-icon.tsx, scaled to the 192x192 size manifests conventionally
// need. Named as a literal .png folder (rather than the reserved icon.tsx
// convention) so the static export writes it with a real .png extension —
// Vercel infers Content-Type from that directly, no header override needed.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 17,
          paddingBottom: 32,
          backgroundColor: "#2B3A8F",
        }}
      >
        <div style={{ width: 30, height: 49, background: "#F7F7FB", borderRadius: 5 }} />
        <div style={{ width: 30, height: 83, background: "#F7F7FB", borderRadius: 5 }} />
        <div style={{ width: 30, height: 119, background: "#F7F7FB", borderRadius: 5 }} />
      </div>
    ),
    { width: 192, height: 192 },
  );
}
