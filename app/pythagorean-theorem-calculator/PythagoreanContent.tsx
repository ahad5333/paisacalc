import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Does this only work for right triangles?",
    a: "Yes — a² + b² = c² is specifically a property of right triangles. For a triangle without a right angle, the law of cosines is the more general relationship (see the triangle calculator).",
  },
  {
    q: "How is this different from the right triangle calculator?",
    a: "This is narrowly focused on the theorem itself — solving for one missing side. The right triangle calculator goes further, also computing area, perimeter, and both non-right angles from the two legs.",
  },
];

export function PythagoreanContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This solves the Pythagorean theorem (a² + b² = c²) for any one side of a right
          triangle, given the other two.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Legs of 3 and 4 give a hypotenuse of <strong>5</strong>.
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
          for area, perimeter, and angles too.
        </p>
      </section>
    </div>
  );
}
