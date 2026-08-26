import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How do successive discounts work — is 20% + 10% the same as 30%?",
    a: "No — successive discounts multiply, not add. 20% off leaves 80% of the price; a further 10% off that leaves 90% of 80%, which is 72% of the original — a combined 28% discount, not 30%. This calculator only handles a single flat discount; for stacked discounts, apply this calculator twice, using its output as the next input.",
  },
  {
    q: "Is this the same as GST calculation?",
    a: "No — GST adds tax on top of a price, this subtracts a discount from it. See the GST calculator for adding or removing GST specifically.",
  },
];

export function DiscountContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the final price after a percentage discount, and exactly how much
          you&rsquo;re saving in rupees.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹2,000 item at 30% off &mdash; the calculator&rsquo;s own defaults &mdash; saves{" "}
          <strong>₹600</strong>, for a final price of <strong>₹1,400</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/margin-calculator/" className="text-figure hover:underline">
            Margin calculator
          </a>{" "}
          if you're pricing from the seller's side instead of shopping from the buyer's.
        </p>
      </section>
    </div>
  );
}
