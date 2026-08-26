import type { Metadata } from "next";
import { AnnuityPayoutCalculatorLoader } from "./AnnuityPayoutCalculatorLoader";
import { AnnuityPayoutContent, FAQS } from "./AnnuityPayoutContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/annuity-payout/`;
const TITLE = "Annuity Payout Calculator | PaisaCalc";
const DESCRIPTION =
  "How much a lump sum can pay out every month over a chosen period, while the balance keeps earning a return.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Annuity Payout Calculator",
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
    { "@type": "ListItem", position: 2, name: "Annuity Payout Calculator", item: PAGE_URL },
  ],
};

export default function AnnuityPayoutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AnnuityPayoutCalculatorLoader content={<AnnuityPayoutContent />} />
    </>
  );
}
