import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do I only enter the two legs, not the hypotenuse?",
    a: "The two legs alone fully determine a right triangle — the hypotenuse, angles, area, and perimeter can all be derived from them, so entering it separately would be redundant (and could even conflict with the legs given).",
  },
  {
    q: "Why do the two non-right angles always add up to 90°?",
    a: "Every triangle's angles sum to 180°, and a right triangle already has one 90° angle — that leaves exactly 90° to split between the other two.",
  },
];

export function RightTriangleContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the hypotenuse, area, perimeter, and both non-right angles of a right
          triangle, from its two legs.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Legs of 3 and 4 give a hypotenuse of 5, an area of <strong>6</strong>, and a perimeter
          of <strong>12</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/triangle-calculator/" className="text-figure hover:underline">
            Triangle calculator
          </a>{" "}
          for triangles that aren't right triangles.
        </p>
      </section>
    </div>
  );
}
