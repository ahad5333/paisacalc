import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is the GCF used for?",
    a: "Most commonly for simplifying a fraction to lowest terms — dividing both the numerator and denominator by their GCF. It's also called the greatest common divisor (GCD).",
  },
  {
    q: "What if the numbers share no common factor?",
    a: "The GCF is 1 — this means the numbers are coprime, sharing no prime factors at all.",
  },
];

export function GcfContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the greatest common factor (GCF, also called GCD) of three numbers, via
          prime factorisation.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          gcf(12, 18, 24) = <strong>6</strong> — the largest number that divides all three evenly.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
