import type { Metadata } from "next";
import { InHandSalaryCalculatorLoader } from "./InHandSalaryCalculatorLoader";
import { InHandSalaryContent, FAQS } from "./InHandSalaryContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/in-hand-salary/`;
const TITLE = "In-Hand Salary from CTC Calculator | PaisaCalc";
const DESCRIPTION =
  "See your real monthly take-home from your CTC — PF, gratuity, professional tax, and income tax under both regimes worked out.";

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
  name: "In-Hand Salary from CTC Calculator",
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
    { "@type": "ListItem", position: 2, name: "In-Hand Salary from CTC", item: PAGE_URL },
  ],
};

export default function InHandSalaryPage() {
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
      <InHandSalaryCalculatorLoader content={<InHandSalaryContent />} />
    </>
  );
}
