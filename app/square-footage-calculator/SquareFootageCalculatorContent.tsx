import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How do I handle an L-shaped or irregular room?",
    a: "Split it into rectangular sections, calculate each one separately, and add them together — this calculator handles one rectangle at a time.",
  },
];

export function SquareFootageCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the area of a rectangular room in square feet, with an optional material cost estimate.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
