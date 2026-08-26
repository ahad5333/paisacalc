import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's the difference between arithmetic and geometric sequences?",
    a: "An arithmetic sequence adds the same fixed amount to get each next term (2, 5, 8, 11...). A geometric sequence multiplies by the same fixed ratio instead (1, 2, 4, 8...) — geometric sequences grow (or shrink) much faster.",
  },
  {
    q: "Can the common difference or ratio be negative?",
    a: "Yes — a negative common difference produces a decreasing arithmetic sequence, and a negative common ratio produces a geometric sequence that alternates between positive and negative terms.",
  },
];

export function NumberSequenceContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This generates an arithmetic or geometric sequence from a first term and a common
          difference or ratio, and sums the resulting terms.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Starting at 2, adding 3 each time, for 5 terms: <strong>2, 5, 8, 11, 14</strong> — sum{" "}
          <strong>40</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
