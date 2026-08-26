import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does simplifying a ratio mean?",
    a: "It means dividing both sides by their greatest common divisor, the same idea as simplifying a fraction — 2:4 and 1:2 describe the same relative proportion.",
  },
  {
    q: "What is a proportion?",
    a: "Two ratios set equal to each other, like a:b = c:d — if three of the four values are known, the fourth can always be solved for by cross-multiplication.",
  },
];

export function RatioContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This simplifies a ratio to lowest terms, and solves a proportion for a missing term.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          2:4 simplifies to <strong>1:2</strong>, and if 2:4 = 5:d, then <strong>d = 10</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
