import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Quadratic Formula Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Quadratic Formula Calculator", "Solve ax² + bx + c = 0, including complex roots", "watch.jpg"), {
    ...size,
  });
}
