import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "In-Hand Salary from CTC Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("In-Hand Salary from CTC", "PF, gratuity, and income tax worked out to your real take-home", "coins.jpg"),
    { ...size },
  );
}
