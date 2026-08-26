import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Pythagorean Theorem Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Pythagorean Theorem Calculator", "Solve a² + b² = c² for any side", "watch.jpg"), {
    ...size,
  });
}
