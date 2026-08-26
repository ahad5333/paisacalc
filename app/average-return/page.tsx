import type { Metadata } from "next";
import { AverageReturnCalculatorLoader } from "./AverageReturnCalculatorLoader";
import { AverageReturnContent, FAQS } from "./AverageReturnContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/average-return/`;
const TITLE = "Average Return Calculator | PaisaCalc";
const DESCRIPTION =
  "The gap between a plain average of yearly returns and the CAGR you actually realise — volatility drag, explained with your own numbers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Average Return Calculator",
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
    { "@type": "ListItem", position: 2, name: "Average Return Calculator", item: PAGE_URL },
  ],
};

export default function AverageReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AverageReturnCalculatorLoader content={<AverageReturnContent />} />
    </>
  );
}
