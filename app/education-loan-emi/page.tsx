import type { Metadata } from "next";
import { EducationLoanCalculatorLoader } from "./EducationLoanCalculatorLoader";
import { EducationLoanContent, FAQS } from "./EducationLoanContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/education-loan-emi/`;
const TITLE = "Education Loan EMI Calculator | PaisaCalc";
const DESCRIPTION =
  "Calculate your education loan EMI including moratorium-period interest, worked out step by step using your own numbers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Education Loan EMI Calculator",
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
    { "@type": "ListItem", position: 2, name: "Education Loan EMI Calculator", item: PAGE_URL },
  ],
};

export default function EducationLoanEmiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <EducationLoanCalculatorLoader content={<EducationLoanContent />} />
    </>
  );
}
