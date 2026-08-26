import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is the mantissa always between 1 and 10?",
    a: "That's the standard convention for scientific notation — it guarantees a unique representation for every number, so 1,234,000 is always written 1.234 × 10^6, never 12.34 × 10^5.",
  },
  {
    q: "What does a negative exponent mean here?",
    a: "It means the number is smaller than 1 — 4.5 × 10^-4 is 0.00045, since a negative exponent divides by powers of 10 instead of multiplying.",
  },
];

export function ScientificNotationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts between ordinary decimal numbers and scientific notation, in either direction.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          1,234,000 in scientific notation is <strong>1.234 × 10^6</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
