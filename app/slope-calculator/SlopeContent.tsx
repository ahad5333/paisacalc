import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does a negative slope mean?",
    a: "The line falls as it moves left to right — a positive slope rises, a negative slope falls, a slope of zero is perfectly flat (horizontal).",
  },
  {
    q: "Why is a vertical line's slope undefined rather than infinite?",
    a: "The slope formula divides by the change in x, which is zero for a vertical line — division by zero has no defined result in ordinary arithmetic, so \"undefined\" is the mathematically correct answer, not a very large number.",
  },
];

export function SlopeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the slope, full line equation, and straight-line distance between two points.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          The line through (1, 2) and (4, 8) has a slope of <strong>2</strong> and the equation{" "}
          <strong>y = 2x</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
