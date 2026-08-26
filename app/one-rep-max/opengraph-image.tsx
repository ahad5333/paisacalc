import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "One Rep Max Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("One Rep Max Calculator", "Epley and Brzycki formulas, shown side by side", "watch.jpg"),
    { ...size },
  );
}
