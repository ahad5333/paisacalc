import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does a trapezoid's formula average the two parallel sides?",
    a: "A trapezoid can be thought of as sitting between a shape with the shorter parallel side stretched the full height and one with the longer side — averaging the two parallel sides before multiplying by height gives exactly the area in between.",
  },
  {
    q: "What units does this use?",
    a: "Whatever unit you enter the dimensions in — the result comes out in that unit squared (e.g. m² if you entered metres). Make sure every dimension uses the same unit.",
  },
];

export function AreaContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the area of a square, rectangle, circle, triangle, or trapezoid.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A rectangle 5 units by 3 units has an area of <strong>15</strong> square units.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
