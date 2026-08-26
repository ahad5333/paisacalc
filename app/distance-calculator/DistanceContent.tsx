import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this related to the Pythagorean theorem?",
    a: "It's the same formula in disguise — the horizontal and vertical differences between the two points form the two legs of a right triangle, and the straight-line distance is its hypotenuse.",
  },
  {
    q: "Does this measure distance along a grid or in a straight line?",
    a: "A straight line (Euclidean distance) — it cuts directly between the two points, not along horizontal and vertical grid steps the way a taxicab or city-block distance would.",
  },
];

export function DistanceContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the straight-line distance between two points on a coordinate plane.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          The distance from (0, 0) to (3, 4) is <strong>5</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
