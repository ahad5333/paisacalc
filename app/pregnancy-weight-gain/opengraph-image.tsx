import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Pregnancy Weight Gain Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Pregnancy Weight Gain Calculator", "IOM-recommended gain range for your BMI", "watch.jpg"),
    { ...size },
  );
}
