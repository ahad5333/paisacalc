import type { Metadata } from "next";
import { BodySurfaceAreaCalculatorLoader } from "./BodySurfaceAreaCalculatorLoader";
import { BodySurfaceAreaContent, FAQS } from "./BodySurfaceAreaContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/body-surface-area/`;
const TITLE = "Body Surface Area Calculator | PaisaCalc";
const DESCRIPTION = "BSA from height and weight, Mosteller and DuBois formulas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Body Surface Area Calculator",
  url: PAGE_URL,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description: DESCRIPTION,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Body Surface Area Calculator", item: PAGE_URL },
  ],
};

export default function BodySurfaceAreaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BodySurfaceAreaCalculatorLoader content={<BodySurfaceAreaContent />} />
    </>
  );
}
