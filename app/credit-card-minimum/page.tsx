import type { Metadata } from "next";
import { CreditCardMinimumCalculatorLoader } from "./CreditCardMinimumCalculatorLoader";
import { CreditCardMinimumContent, FAQS } from "./CreditCardMinimumContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/credit-card-minimum/`;
const TITLE = "Credit Card Minimum Payment Calculator | PaisaCalc";
const DESCRIPTION =
  "What paying only the minimum actually costs — the payment shrinks as the balance shrinks, stretching payoff far longer than a fixed payment would.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Credit Card Minimum Payment Calculator",
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
    { "@type": "ListItem", position: 2, name: "Credit Card Minimum Payment Calculator", item: PAGE_URL },
  ],
};

export default function CreditCardMinimumPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CreditCardMinimumCalculatorLoader content={<CreditCardMinimumContent />} />
    </>
  );
}
