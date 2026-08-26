import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "SIP Returns Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("SIP Returns Calculator", "Project your SIP's future value, with an optional yearly step-up", "chart.jpg"),
    { ...size },
  );
}
