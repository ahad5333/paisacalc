import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Cash Back vs. Low Interest Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Cash Back vs. Low Interest", "Which car financing offer actually costs less", "highway.jpg"),
    { ...size },
  );
}
