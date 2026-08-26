import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does a negative exponent mean?",
    a: "It means take the reciprocal of the positive-exponent result — 2^-2 is 1 ÷ 2^2, or 0.25.",
  },
  {
    q: "What does a fractional exponent mean?",
    a: "It's a root — x^(1/2) is the square root of x, x^(1/3) is the cube root, and so on. A fractional exponent like x^(2/3) is the cube root of x, squared.",
  },
];

export function ExponentContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This raises any base to any power, including negative and fractional exponents.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          2^10 = <strong>1,024</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
