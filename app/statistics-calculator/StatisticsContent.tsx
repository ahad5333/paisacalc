import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does this show both sample and population standard deviation?",
    a: "They answer different questions and this calculator doesn't know which one applies to your data — sample standard deviation is for data that's a subset used to estimate a larger population; population standard deviation is for data that already covers everything you care about.",
  },
  {
    q: "How is this different from the dedicated Mean/Median/Mode/Range or Standard Deviation calculators?",
    a: "Same underlying formulas, but this one reports everything at once in a single table, for when you want the full picture rather than one specific figure with a focused explanation.",
  },
];

export function StatisticsContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This produces a full descriptive statistics report for a data set: count, sum, mean,
          median, mode, range, variance, and standard deviation (both sample and population).
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
