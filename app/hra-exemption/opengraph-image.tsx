import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "HRA Exemption Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("HRA Exemption Calculator", "The three-way minimum rule, worked out with your own numbers", "skyline.jpg"),
    { ...size },
  );
}
