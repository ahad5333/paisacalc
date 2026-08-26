import type { Metadata } from "next";
import { EpsPensionCalculatorLoader } from "./EpsPensionCalculatorLoader";
import { EpsPensionContent, FAQS } from "./EpsPensionContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/eps-pension/`;
const TITLE = "EPS Pension Calculator | PaisaCalc";
const DESCRIPTION = "Your monthly pension under EPFO's Employees' Pension Scheme — the actual government formula, salary ceiling and service bonus included.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EPS Pension Calculator",
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
    { "@type": "ListItem", position: 2, name: "EPS Pension Calculator", item: PAGE_URL },
  ],
};

export default function EpsPensionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <EpsPensionCalculatorLoader content={<EpsPensionContent />} />
    </>
  );
}
