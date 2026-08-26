import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do I need a common denominator to add or subtract fractions?",
    a: "A fraction's denominator defines the size of each piece — you can only add or subtract counts of pieces that are the same size. Multiplying each fraction to a shared denominator makes the pieces comparable first.",
  },
  {
    q: "Why does dividing by a fraction flip it upside down?",
    a: "Dividing by a number is the same as multiplying by its reciprocal — this is true for whole numbers too (dividing by 2 is multiplying by 1/2), fractions just make it more visible.",
  },
];

export function FractionContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This adds, subtracts, multiplies, or divides two fractions, and simplifies the result
          to lowest terms.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          1/2 + 1/3 = <strong>5/6</strong>, or 0.8333 as a decimal.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
