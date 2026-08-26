import type { Metadata } from "next";
import { Base64CalculatorLoader } from "./Base64CalculatorLoader";
import { Base64CalculatorContent, FAQS } from "./Base64CalculatorContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/base64-encode-decode/`;
const TITLE = "Base64 Encode / Decode | PaisaCalc";
const DESCRIPTION = "Encode text to Base64, or decode Base64 back to text, in your browser.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Base64 Encode / Decode",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description: DESCRIPTION,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Base64 Encode / Decode", item: PAGE_URL },
  ],
};

export default function Base64CalculatorRoutePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Base64CalculatorLoader content={<Base64CalculatorContent />} />
    </>
  );
}
