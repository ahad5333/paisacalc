import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Should I buy exactly the number of bags calculated?",
    a: "Buy a small surplus — spillage, uneven ground, and minor measurement error are normal, and running short mid-pour is a bigger problem than a leftover bag or two.",
  },
  {
    q: "60lb or 80lb bags — which should I choose?",
    a: "80lb bags cover more volume per bag (fewer bags to carry and mix, but each one is heavier) — the right choice mostly comes down to how much weight you can comfortably handle per bag.",
  },
];

export function ConcreteCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the volume of concrete needed for a slab, and how many standard bags to buy.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 10ft × 10ft slab, 4 inches deep, needs about <strong>1.23 cubic yards</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
