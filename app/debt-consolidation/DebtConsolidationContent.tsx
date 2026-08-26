import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Isn't a lower EMI always better?",
    a: "Not on its own. A longer tenure lowers the EMI but spreads interest over more months — the calculator's own default (₹1.5L credit card debt at 36% plus a ₹2.5L personal loan at 15%, consolidated at 13%) saves money at a 3-year tenure, but stretch that same consolidated loan to 7 years and the EMI drops further while total interest actually goes up by about ₹82,000. Total interest, not the EMI, is the number that tells you whether consolidating actually helped.",
  },
  {
    q: "When does consolidating actually make sense?",
    a: "When the new loan's rate is meaningfully lower than the weighted average of what you're currently paying, AND the new tenure isn't stretched out so far that the lower rate gets cancelled out by more months of interest. High-rate debt like credit card balances (often 30%+ annualised) rolled into a lower-rate personal or top-up loan is the classic case where it helps.",
  },
  {
    q: "What if I have more than two debts?",
    a: "Add up the balances and current monthly payments across all of them, and use a rough balance-weighted average for the combined interest rate as debt 2's rate (keep debt 1 as your single highest-rate debt for a clearer picture). The two-debt structure here is simplified, but the same trade-off — total interest, not just the EMI — applies regardless of how many debts you're actually rolling in.",
  },
  {
    q: "What isn't this accounting for?",
    a: "Processing fees on the new loan, and foreclosure or prepayment charges on the debts being closed out — both can eat into any savings shown here. It also assumes every payment is made on time and in full on both sides of the comparison.",
  },
];

export function DebtConsolidationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares paying off two existing debts separately, each at its own rate and EMI,
          against rolling both into a single new loan &mdash; on total interest paid, not just
          the monthly payment.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹1,50,000 credit card balance at 36% and a ₹2,50,000 personal loan at 15%
          &mdash; the calculator&rsquo;s own defaults &mdash; consolidated into a single loan at
          13% over 3 years. The combined monthly payment drops from ₹17,500 to{" "}
          <strong>₹13,478</strong>, and total interest drops from ₹1,28,809 to{" "}
          <strong>₹85,189</strong> &mdash; a clear win on both counts. Stretch that same
          consolidated loan to 7 years instead, and the EMI falls further to ₹7,277, but total
          interest rises to <strong>₹2,11,238</strong> &mdash; more than paying the two debts
          separately would have cost.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/debt-to-income-ratio/" className="text-figure hover:underline">
            Debt-to-income ratio
          </a>{" "}
          for a quick health check on your overall debt load, and{" "}
          <a href="/credit-card-payoff/" className="text-figure hover:underline">
            credit card payoff
          </a>{" "}
          if you're only dealing with a single card balance.
        </p>
      </section>
    </div>
  );
}
