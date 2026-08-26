import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Income Tax: Old vs New Regime Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Income Tax: Old vs New Regime", "See exactly which regime is cheaper, and by how much", "desk.jpg"),
    { ...size },
  );
}
