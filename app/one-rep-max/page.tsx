import type { Metadata } from "next";
import { OneRepMaxCalculatorLoader } from "./OneRepMaxCalculatorLoader";
import { OneRepMaxContent, FAQS } from "./OneRepMaxContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/one-rep-max/`;
const TITLE = "One Rep Max Calculator | PaisaCalc";
const DESCRIPTION = "Estimated one-rep max from a sub-maximal set, using the Epley and Brzycki formulas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "One Rep Max Calculator",
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
    { "@type": "ListItem", position: 2, name: "One Rep Max Calculator", item: PAGE_URL },
  ],
};

export default function OneRepMaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OneRepMaxCalculatorLoader content={<OneRepMaxContent />} />
    </>
  );
}
