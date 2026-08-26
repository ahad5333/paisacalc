import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why can't I enter any three numbers as sides?",
    a: "The triangle inequality: each side must be shorter than the sum of the other two, or the sides simply can't close into a triangle — try 1, 1, and 10, and you'll see why (the two short sides can't reach far enough to meet).",
  },
  {
    q: "How does this work with only three side lengths (no angles)?",
    a: "Heron's formula finds the area directly from the three sides, and once the area and sides are known, the law of cosines can solve for each angle in turn — no angle measurements are needed as inputs.",
  },
];

export function TriangleContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the area, perimeter, and all three angles of a triangle, from its three
          side lengths (SSS), using Heron's formula and the law of cosines.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 3-4-5 triangle has an area of <strong>6</strong> and one 90° angle &mdash; it's a
          right triangle.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/right-triangle-calculator/" className="text-figure hover:underline">
            Right triangle calculator
          </a>{" "}
          if you already know it has a right angle.
        </p>
      </section>
    </div>
  );
}
