import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does the discriminant actually tell you?",
    a: "Its sign alone tells you what kind of roots to expect before doing any more work: positive means two distinct real roots, zero means one repeated real root (the parabola just touches the x-axis), and negative means no real roots at all — the parabola never crosses the x-axis.",
  },
  {
    q: "What do complex roots mean graphically?",
    a: "They mean the parabola y = ax² + bx + c never crosses the x-axis — it stays entirely above or entirely below it, so there's no real value of x where y = 0.",
  },
];

export function QuadraticContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This solves any quadratic equation ax² + bx + c = 0 for x, using the quadratic
          formula, including complex roots when they occur.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          x² − 5x + 6 = 0 has roots <strong>x = 3</strong> and <strong>x = 2</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
