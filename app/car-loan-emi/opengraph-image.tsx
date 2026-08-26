import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Car Loan EMI Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Car Loan EMI Calculator", "EMI, repayment schedule, and the formula worked out", "highway.jpg"),
    { ...size },
  );
}
