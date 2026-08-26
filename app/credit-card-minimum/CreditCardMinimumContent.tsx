import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does the payment shrink over time?",
    a: "Because the minimum due is set as a percentage of whatever the CURRENT balance is, recalculated every month — not a fixed amount like an EMI. As the balance slowly shrinks, the required minimum shrinks right along with it, so less and less actually goes toward the balance each month, stretching payoff out for years.",
  },
  {
    q: "How is this different from the credit card payoff calculator?",
    a: "That calculator assumes you commit to a FIXED payment every month regardless of the shrinking balance — which pays off far faster. This one models what actually happens if you only ever pay the card issuer's stated minimum, which declines as the balance does. The gap between the two, on the same starting balance, is often dramatic.",
  },
  {
    q: "Why can total interest exceed the original balance?",
    a: "Because a shrinking minimum payment takes so long to clear the balance that interest keeps compounding for years — the calculator's own default (a ₹1,00,000 balance) racks up ₹1,40,488 in interest, more than the balance itself, over roughly 12 years of minimum-only payments.",
  },
  {
    q: "What if the minimum payment doesn't even cover the interest?",
    a: "The balance never shrinks — every month the interest charged exceeds what you're paying, so the balance actually grows. The calculator flags this directly rather than showing a misleading payoff timeline.",
  },
];

export function CreditCardMinimumContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This simulates what actually happens paying only a credit card&rsquo;s minimum due
          every month &mdash; a percentage of the current balance (or a flat floor, whichever
          is higher), recalculated fresh each month as the balance shrinks.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹1,00,000 balance at 3% a month, with a 5% minimum payment (₹500 floor) &mdash; the
          calculator&rsquo;s own defaults &mdash; starts with a ₹5,000 first payment but takes{" "}
          <strong>145 months</strong> (just over 12 years) to clear, racking up{" "}
          <strong>₹1,40,488</strong> in interest &mdash; more than the original balance.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/credit-card-payoff/" className="text-figure hover:underline">
            Credit card payoff
          </a>{" "}
          to see how much faster a fixed monthly payment clears the same balance.
        </p>
      </section>
    </div>
  );
}
