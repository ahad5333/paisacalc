import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Does it follow the standard order of operations?",
    a: "Yes — parentheses first, then powers, then multiplication/division/modulo left to right, then addition/subtraction left to right, the standard PEMDAS convention.",
  },
  {
    q: "Why does the angle mode matter?",
    a: "sin(90) equals 1 in degrees but a completely different value in radians — degrees and radians are two different units for measuring the same angle, so trig functions need to know which one your number is in.",
  },
];

export function ScientificContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This evaluates any mathematical expression with standard operators, trig functions,
          roots, and logarithms, following the standard order of operations.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          sqrt(16) + 2^3 = <strong>12</strong> — the square root of 16 (4) plus 2 cubed (8).
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
