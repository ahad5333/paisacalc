import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Molecular Weight Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(ogImageTemplate("Molecular Weight Calculator", "From a chemical formula, IUPAC atomic weights", "watch.jpg"), {
    ...size,
  });
}
