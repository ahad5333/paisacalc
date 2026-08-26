import type { Metadata } from "next";
import { RealEstateReturnsCalculatorLoader } from "./RealEstateReturnsCalculatorLoader";
import { RealEstateReturnsContent, FAQS } from "./RealEstateReturnsContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/real-estate-returns/`;
const TITLE = "Real Estate Returns Calculator | PaisaCalc";
const DESCRIPTION =
  "Net profit and annualised return from buying a property and selling it later, after stamp duty, registration, and selling costs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Real Estate Returns Calculator",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
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
    { "@type": "ListItem", position: 2, name: "Real Estate Returns Calculator", item: PAGE_URL },
  ],
};

export default function RealEstateReturnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RealEstateReturnsCalculatorLoader content={<RealEstateReturnsContent />} />
    </>
  );
}
