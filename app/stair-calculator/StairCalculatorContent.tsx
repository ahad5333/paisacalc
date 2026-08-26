import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does the number of treads differ from the number of risers?",
    a: "The top step's \"tread\" is the upper floor itself, and the bottom riser starts from the lower floor — so a staircase with N risers only has N−1 physical tread boards.",
  },
  {
    q: "Why does riser height matter for safety?",
    a: "Inconsistent riser heights are a leading cause of stair falls — building codes require risers within a fairly narrow height range, and every riser on the same staircase should be identical, since people unconsciously expect a consistent step height.",
  },
];

export function StairCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the riser height, tread depth, and stringer (diagonal support) length for
          a staircase, from the total rise, run, and number of steps.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
