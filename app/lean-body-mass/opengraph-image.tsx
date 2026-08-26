import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Lean Body Mass Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Lean Body Mass Calculator", "Lean mass from height and weight, the Boer formula", "watch.jpg"),
    { ...size },
  );
}
