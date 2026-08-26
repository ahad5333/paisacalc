import type { Metadata } from "next";
import { EligibilityCalculatorLoader } from "./EligibilityCalculatorLoader";
import { EligibilityContent, FAQS } from "./EligibilityContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/home-loan-eligibility/`;
const TITLE = "Home Loan Eligibility Calculator | PaisaCalc";
const DESCRIPTION =
  "Find the maximum home loan you're likely eligible for, based on your income, existing EMIs, and the FOIR lenders actually use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Home Loan Eligibility Calculator",
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
    { "@type": "ListItem", position: 2, name: "Home Loan Eligibility Calculator", item: PAGE_URL },
  ],
};

export default function EligibilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <EligibilityCalculatorLoader content={<EligibilityContent />} />
    </>
  );
}
