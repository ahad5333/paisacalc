import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why isn't a 50% markup a 50% margin?",
    a: "Because they're the same profit divided by two different numbers. A ₹300 profit on a ₹600 cost is a 50% markup (profit ÷ cost), but that same ₹300 profit on a ₹900 selling price is only a 33.33% margin (profit ÷ selling price) — the selling price is the bigger denominator, so margin is always the smaller percentage of the two for a profitable sale.",
  },
  {
    q: "Which one should I use to price something?",
    a: "It depends on what you're solving for. If you know your cost and want to hit a specific margin percentage of the selling price, you'd work from margin. If you're used to thinking \"add X% on top of what it cost me,\" that's markup. Many pricing mistakes come from using a markup percentage while believing it's the margin, which understates how much profit is actually baked in.",
  },
  {
    q: "What isn't included here?",
    a: "Any other cost beyond the direct cost price you enter — overhead, shipping, payment processing fees, and so on. A true net margin would need those factored into the cost side as well.",
  },
];

export function MarginContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out profit margin (profit as a percentage of selling price) and markup
          (profit as a percentage of cost price) from the same cost and selling price &mdash;
          two different numbers that describe the same profit.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹600 cost price sold at ₹900 &mdash; the calculator&rsquo;s own defaults &mdash;
          makes a ₹300 profit: a <strong>33.33%</strong> margin, but a{" "}
          <strong>50%</strong> markup on cost.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/discount-calculator/" className="text-figure hover:underline">
            Discount calculator
          </a>{" "}
          for working the price the other direction &mdash; from a discount percentage instead.
        </p>
      </section>
    </div>
  );
}
