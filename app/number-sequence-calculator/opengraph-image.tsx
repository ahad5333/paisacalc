import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Number Sequence Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Number Sequence Calculator", "Generate arithmetic or geometric sequences", "watch.jpg"), {
    ...size,
  });
}
