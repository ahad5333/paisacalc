import type { Metadata } from "next";
import { TargetHeartRateCalculatorLoader } from "./TargetHeartRateCalculatorLoader";
import { TargetHeartRateContent, FAQS } from "./TargetHeartRateContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/target-heart-rate/`;
const TITLE = "Target Heart Rate Calculator | PaisaCalc";
const DESCRIPTION = "Training heart rate zones from age and resting heart rate, using the Karvonen formula.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Target Heart Rate Calculator",
  url: PAGE_URL,
  applicationCategory: "HealthApplication",
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
    { "@type": "ListItem", position: 2, name: "Target Heart Rate Calculator", item: PAGE_URL },
  ],
};

export default function TargetHeartRatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TargetHeartRateCalculatorLoader content={<TargetHeartRateContent />} />
    </>
  );
}
