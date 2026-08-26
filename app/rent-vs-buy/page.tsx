import type { Metadata } from "next";
import { RentVsBuyCalculatorLoader } from "./RentVsBuyCalculatorLoader";
import { RentVsBuyContent, FAQS } from "./RentVsBuyContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/rent-vs-buy/`;
const TITLE = "Rent vs. Buy Calculator | PaisaCalc";
const DESCRIPTION =
  "Compare net worth from buying a home versus renting and investing the difference, over the years you actually plan to stay.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rent vs. Buy Calculator",
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
    { "@type": "ListItem", position: 2, name: "Rent vs. Buy Calculator", item: PAGE_URL },
  ],
};

export default function RentVsBuyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RentVsBuyCalculatorLoader content={<RentVsBuyContent />} />
    </>
  );
}
