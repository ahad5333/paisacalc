import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Personal Loan EMI Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Personal Loan EMI Calculator", "Monthly EMI, worked out step by step", "rupee.jpg"),
    { ...size },
  );
}
