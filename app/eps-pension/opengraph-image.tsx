import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "EPS Pension Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("EPS Pension Calculator", "Your monthly pension under EPFO's actual formula", "skyline.jpg"),
    { ...size },
  );
}
