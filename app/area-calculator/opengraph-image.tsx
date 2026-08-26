import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Area Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Area Calculator", "Square, rectangle, circle, triangle, or trapezoid", "watch.jpg"), {
    ...size,
  });
}
