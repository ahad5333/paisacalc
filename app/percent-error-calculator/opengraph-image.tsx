import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Percent Error Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Percent Error Calculator", "Measured vs. theoretical value, as a percentage", "watch.jpg"), {
    ...size,
  });
}
