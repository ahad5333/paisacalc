import type { Metadata } from "next";
import { PermutationCombinationCalculatorLoader } from "./PermutationCombinationCalculatorLoader";
import { PermutationCombinationContent, FAQS } from "./PermutationCombinationContent";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/permutation-combination-calculator/`;
const TITLE = "Permutation and Combination Calculator | PaisaCalc";
const DESCRIPTION = "nPr and nCr — the number of ways to choose r items from n.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Permutation and Combination Calculator",
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
    { "@type": "ListItem", position: 2, name: "Permutation and Combination Calculator", item: PAGE_URL },
  ],
};

export default function PermutationCombinationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PermutationCombinationCalculatorLoader content={<PermutationCombinationContent />} />
    </>
  );
}
