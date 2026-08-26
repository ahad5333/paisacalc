import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, ogImageTemplate } from "@/lib/og-image";

export const alt = "Loan Prepayment Impact Calculator";
export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate("Loan Prepayment Impact", "Lower EMI or shorter tenure — see which actually saves more", "house.jpg"),
    { ...size },
  );
}
