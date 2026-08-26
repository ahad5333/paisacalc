import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do different brands fit differently at the \"same\" size?",
    a: "Shoe sizing isn't governed by one universal international standard the way, say, a kilogram is — each brand designs around its own \"last\" (the foot-shaped mold shoes are built on), so the same labeled size can fit differently between brands.",
  },
  {
    q: "Is this conversion exact?",
    a: "It's a widely used approximation, accurate for most purposes, but exact conversions can shift by half a size near certain boundaries — when it matters, checking the specific brand's own size chart is more reliable than any general formula.",
  },
];

export function ShoeSizeCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts a shoe size between US Men's, US Women's, UK, and EU sizing systems.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
