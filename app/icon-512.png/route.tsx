import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Same mark as icon-192.png/route.tsx, scaled to 512x512 — see that file
// for why this is a Route Handler rather than the icon.tsx convention.
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
          gap: 45,
          paddingBottom: 85,
          backgroundColor: "#2B3A8F",
        }}
      >
        <div style={{ width: 80, height: 131, background: "#F7F7FB", borderRadius: 14 }} />
        <div style={{ width: 80, height: 222, background: "#F7F7FB", borderRadius: 14 }} />
        <div style={{ width: 80, height: 318, background: "#F7F7FB", borderRadius: 14 }} />
      </div>
    ),
    { width: 512, height: 512 },
  );
}
