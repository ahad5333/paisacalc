import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Conversion Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Conversion Calculator", "Length units, metric and imperial", "watch.jpg"), { ...size });
}
