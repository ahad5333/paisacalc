import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Rent vs. Buy Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Rent vs. Buy Calculator", "Which comes out ahead over the years you'll actually stay", "house.jpg"),
    { ...size },
  );
}
