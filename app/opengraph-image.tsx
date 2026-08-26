import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "PaisaCalc";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate(
      "Indian personal-finance calculators that show their working.",
      "Not just a number — the actual derivation, every time",
      "rupee.jpg",
    ),
    { ...size },
  );
}
