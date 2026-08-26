import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Protein Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Protein Calculator", "Daily protein target from bodyweight and activity", "watch.jpg"),
    { ...size },
  );
}
