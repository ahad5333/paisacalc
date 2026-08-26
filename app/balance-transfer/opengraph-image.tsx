import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Home Loan Balance Transfer Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Balance Transfer Calculator", "Whether switching lenders actually pays off, after fees", "house.jpg"),
    { ...size },
  );
}
