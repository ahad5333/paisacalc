import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Debt Consolidation Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Debt Consolidation Calculator", "Whether rolling debts into one loan actually saves money", "desk.jpg"),
    { ...size },
  );
}
