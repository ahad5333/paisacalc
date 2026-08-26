import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does the weight-per-volume figure vary between gravel types?",
    a: "Different stone types and sizes pack differently — crushed stone, pea gravel, and river rock all have somewhat different densities, so 1.4 tons per cubic yard is a reasonable planning average, not an exact figure for every product.",
  },
  {
    q: "How deep should a gravel driveway or path be?",
    a: "3-4 inches is typical for a walking path, while a driveway that needs to support vehicle weight usually wants a deeper base layer (often multiple layers of different stone sizes) — check your specific application's requirements.",
  },
];

export function GravelCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds how much gravel to buy, by volume and weight, for a path or driveway.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
