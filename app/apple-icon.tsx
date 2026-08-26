import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.tsx, scaled up. No rounded corners — iOS applies
// its own corner mask to home-screen icons, so a full square is expected.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 16,
          paddingBottom: 30,
          backgroundColor: "#2B3A8F",
        }}
      >
        <div style={{ width: 28, height: 46, background: "#F7F7FB", borderRadius: 5 }} />
        <div style={{ width: 28, height: 78, background: "#F7F7FB", borderRadius: 5 }} />
        <div style={{ width: 28, height: 112, background: "#F7F7FB", borderRadius: 5 }} />
      </div>
    ),
    { ...size },
  );
}
