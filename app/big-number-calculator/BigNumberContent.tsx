import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do I need a special calculator for big numbers?",
    a: "Ordinary JavaScript numbers (and most calculators) lose exact precision beyond about 9 quadrillion (2^53) — past that point, some integers can no longer be represented exactly. This calculator uses arbitrary-precision arithmetic instead, so results stay exact no matter how many digits long.",
  },
  {
    q: "Can I use decimals here?",
    a: "No — this calculator only handles whole numbers (integers). Decimal input isn't supported.",
  },
];

export function BigNumberContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This adds, subtracts, or multiplies integers of any size, with exact precision.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          99,999,999,999,999,999,999 + 1 = <strong>100,000,000,000,000,000,000</strong> exactly —
          a result ordinary floating-point arithmetic could not represent precisely.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
