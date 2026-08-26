import type { Metadata } from "next";
import { GasMileageCalculatorLoader } from "./GasMileageCalculatorLoader";
import { GasMileageCalculatorContent, FAQS } from "./GasMileageCalculatorContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/gas-mileage-calculator/`;
const TITLE = "Gas Mileage Calculator | PaisaCalc";
const DESCRIPTION = "Actual fuel efficiency from distance driven and fuel used.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gas Mileage Calculator",
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
    { "@type": "ListItem", position: 2, name: "Gas Mileage Calculator", item: PAGE_URL },
  ],
};

export default function GasMileageCalculatorRoutePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GasMileageCalculatorLoader content={<GasMileageCalculatorContent />} />
    </>
  );
}
