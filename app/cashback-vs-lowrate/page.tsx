import type { Metadata } from "next";
import { CashbackVsLowRateCalculatorLoader } from "./CashbackVsLowRateCalculatorLoader";
import { CashbackVsLowRateContent, FAQS } from "./CashbackVsLowRateContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/cashback-vs-lowrate/`;
const TITLE = "Cash Back vs. Low Interest Calculator | PaisaCalc";
const DESCRIPTION =
  "Which actually costs less on a car loan — taking the cash rebate at the regular rate, or a promotional low rate on the full price.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cash Back vs. Low Interest Calculator",
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
    { "@type": "ListItem", position: 2, name: "Cash Back vs. Low Interest Calculator", item: PAGE_URL },
  ],
};

export default function CashbackVsLowRatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CashbackVsLowRateCalculatorLoader content={<CashbackVsLowRateContent />} />
    </>
  );
}
