import type { Metadata } from "next";
import { BalanceTransferCalculatorLoader } from "./BalanceTransferCalculatorLoader";
import { BalanceTransferContent, FAQS } from "./BalanceTransferContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/balance-transfer/`;
const TITLE = "Home Loan Balance Transfer Calculator | PaisaCalc";
const DESCRIPTION =
  "Whether moving your outstanding home loan to a new lender at a lower rate actually pays off, once the transfer cost is netted out.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Home Loan Balance Transfer Calculator",
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
    { "@type": "ListItem", position: 2, name: "Home Loan Balance Transfer Calculator", item: PAGE_URL },
  ],
};

export default function BalanceTransferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BalanceTransferCalculatorLoader content={<BalanceTransferContent />} />
    </>
  );
}
