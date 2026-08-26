import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Which strategy should I actually use?",
    a: "Avalanche if you're purely optimising for the lowest total interest — it's mathematically always the best or tied-best order. Snowball if you know you're the kind of person who needs the motivation of seeing individual debts disappear quickly to stay disciplined; the interest cost of that motivation is usually modest, as the calculator's own example shows (₹9,792 more, not a fortune).",
  },
  {
    q: "Why do avalanche and snowball sometimes give the exact same answer?",
    a: "When the debt with the highest rate also happens to have the smallest balance, both strategies pick the same debt first — and if that pattern holds all the way down, the two methods converge to identical results. It's when rate order and balance order disagree that the strategies genuinely diverge, which is the more common real-world case.",
  },
  {
    q: "What happens to a debt's minimum payment once it's paid off?",
    a: "It gets redirected — the total monthly budget stays fixed throughout, so a cleared debt's old minimum becomes extra firepower for whichever debt is next in line. This is what makes both strategies accelerate as debts get knocked out one by one.",
  },
  {
    q: "How is this different from the debt consolidation calculator?",
    a: "Debt consolidation compares keeping debts separate against rolling them into one new loan. This assumes you're keeping the debts separate either way, and is purely about which order to pay extra money toward them in.",
  },
];

export function DebtPayoffContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares two standard strategies for paying off three debts at once with a
          fixed total monthly budget: avalanche (extra money always goes to the highest-rate
          debt first) and snowball (extra money always goes to the smallest-balance debt
          first).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Three debts &mdash; ₹1,50,000 at 36%, ₹50,000 at 9%, and ₹2,50,000 at 15% &mdash; with
          a ₹5,000 extra monthly budget on top of their combined minimums &mdash; the
          calculator&rsquo;s own defaults. Avalanche clears everything in 27 months at
          ₹1,08,092 total interest; snowball takes 28 months at ₹1,17,884 &mdash; avalanche
          saves <strong>₹9,792</strong> here.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/debt-consolidation/" className="text-figure hover:underline">
            Debt consolidation
          </a>{" "}
          if rolling these debts into one new loan is also on the table, and{" "}
          <a href="/debt-to-income-ratio/" className="text-figure hover:underline">
            debt-to-income ratio
          </a>{" "}
          for a quick health check on the overall load.
        </p>
      </section>
    </div>
  );
}
