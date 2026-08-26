import type { Metadata } from "next";
import { BusinessLoanCalculatorLoader } from "./BusinessLoanCalculatorLoader";
import { BusinessLoanContent, FAQS } from "./BusinessLoanContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/business-loan/`;
const TITLE = "Business Loan Calculator | PaisaCalc";
const DESCRIPTION =
  "EMI on a business or MSME loan, at the typically higher rates and shorter tenures these loans carry.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Business Loan Calculator",
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
    { "@type": "ListItem", position: 2, name: "Business Loan Calculator", item: PAGE_URL },
  ],
};

export default function BusinessLoanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BusinessLoanCalculatorLoader content={<BusinessLoanContent />} />
    </>
  );
}
