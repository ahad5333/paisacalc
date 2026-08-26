import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Home Loan EMI Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Home Loan EMI Calculator", "EMI, amortisation schedule, and the formula worked out", "house.jpg"),
    { ...size },
  );
}
