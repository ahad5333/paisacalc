import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Mean, Median, Mode, Range Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Mean, Median, Mode & Range", "The four basic descriptive statistics", "watch.jpg"), {
    ...size,
  });
}
