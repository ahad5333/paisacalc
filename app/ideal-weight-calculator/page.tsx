import type { Metadata } from "next";
import { IdealWeightCalculatorLoader } from "./IdealWeightCalculatorLoader";
import { IdealWeightContent, FAQS } from "./IdealWeightContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/ideal-weight-calculator/`;
const TITLE = "Ideal Weight Calculator | PaisaCalc";
const DESCRIPTION =
  "Four different clinical formulas for ideal body weight — Hamwi, Devine, Robinson, and Miller — shown together since they don't agree.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ideal Weight Calculator",
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
    { "@type": "ListItem", position: 2, name: "Ideal Weight Calculator", item: PAGE_URL },
  ],
};

export default function IdealWeightPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IdealWeightCalculatorLoader content={<IdealWeightContent />} />
    </>
  );
}
