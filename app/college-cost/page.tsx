import type { Metadata } from "next";
import { CollegeCostCalculatorLoader } from "./CollegeCostCalculatorLoader";
import { CollegeCostContent, FAQS } from "./CollegeCostContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/college-cost/`;
const TITLE = "College Cost Calculator | PaisaCalc";
const DESCRIPTION =
  "What a course will actually cost by the time enrollment arrives, and across its full duration — education inflation runs well above general inflation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "College Cost Calculator",
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
    { "@type": "ListItem", position: 2, name: "College Cost Calculator", item: PAGE_URL },
  ],
};

export default function CollegeCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CollegeCostCalculatorLoader content={<CollegeCostContent />} />
    </>
  );
}
