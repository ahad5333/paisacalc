import type { Metadata } from "next";
import { CapitalGainsCalculatorLoader } from "./CapitalGainsCalculatorLoader";
import { CapitalGainsContent, FAQS } from "./CapitalGainsContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/capital-gains/`;
const TITLE = "Capital Gains Tax Calculator | PaisaCalc";
const DESCRIPTION =
  "Work out the tax on a gain from equity or property, including the property indexation choice where it applies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Capital Gains Tax Calculator",
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
    { "@type": "ListItem", position: 2, name: "Capital Gains Tax Calculator", item: PAGE_URL },
  ],
};

export default function CapitalGainsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CapitalGainsCalculatorLoader content={<CapitalGainsContent />} />
    </>
  );
}
