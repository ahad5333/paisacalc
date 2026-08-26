import type { Metadata } from "next";
import { DebtConsolidationCalculatorLoader } from "./DebtConsolidationCalculatorLoader";
import { DebtConsolidationContent, FAQS } from "./DebtConsolidationContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/debt-consolidation/`;
const TITLE = "Debt Consolidation Calculator | PaisaCalc";
const DESCRIPTION =
  "Compare paying off two debts separately against rolling them into one new loan — on total interest, not just the monthly payment.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Debt Consolidation Calculator",
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
    { "@type": "ListItem", position: 2, name: "Debt Consolidation Calculator", item: PAGE_URL },
  ],
};

export default function DebtConsolidationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DebtConsolidationCalculatorLoader content={<DebtConsolidationContent />} />
    </>
  );
}
