import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does India use two different depreciation methods?",
    a: "They serve different purposes. The Income Tax Act mandates WDV on block-of-assets for computing taxable income — it front-loads deductions, giving a bigger tax benefit in earlier years. The Companies Act, 2013 generally expects SLM (or WDV based on useful life under Schedule II) for the company's own financial statements, aimed at spreading cost evenly to match how the asset is used. The same asset legitimately shows different depreciation in a tax filing versus the books.",
  },
  {
    q: "What WDV rate should I use?",
    a: "It depends on the asset's block under the Income Tax Rules — common ones are 15% for general plant & machinery, 10% for furniture & fittings, 40% for computers and software, and 5% for buildings, though many other specific rates exist. Check the exact block your asset falls into rather than assuming a default.",
  },
  {
    q: "Why does WDV never reach zero?",
    a: "Because each year's depreciation is a percentage of whatever balance is LEFT, not the original cost — a shrinking share of a shrinking number gets arbitrarily small but mathematically never hits exactly zero, the same way it never would with any percentage-of-remaining-balance calculation.",
  },
  {
    q: "What's salvage value?",
    a: "The estimated residual value an asset would fetch at the end of its useful life. SLM depreciation is calculated on cost minus salvage value, and never depreciates the asset below that floor — a common default assumption is 5% of cost when a specific estimate isn't available.",
  },
];

export function DepreciationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares an asset&rsquo;s book value under WDV (the method the Income Tax Act
          mandates for tax purposes) against SLM (the method companies typically use for their
          own books), after a chosen number of years.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹10,00,000 asset, a 15% WDV rate, a 15-year SLM useful life, 5% salvage value, after
          5 years &mdash; the calculator&rsquo;s own defaults. SLM leaves a book value of
          ₹6,83,335; WDV, having front-loaded more depreciation in the early years, leaves a
          book value of just <strong>₹4,43,705</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/business-loan/" className="text-figure hover:underline">
            Business loan calculator
          </a>{" "}
          if this asset is being financed.
        </p>
      </section>
    </div>
  );
}
