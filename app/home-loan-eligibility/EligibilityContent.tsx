import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is FOIR?",
    a: "Fixed Obligation to Income Ratio — the share of your net monthly income that all your EMIs combined (existing loans plus the new one) are allowed to take up. It's the formula lenders actually use to size a loan around your income, not a made-up simplification.",
  },
  {
    q: "Is there an official FOIR limit set by RBI?",
    a: "No — RBI doesn't mandate a specific FOIR for home loans. Each lender sets its own limit as part of its credit policy, but 40-50% of net income is the de facto standard most public and private banks use, with some extending to 55-65% for higher earners. That's why this calculator makes FOIR an adjustable input rather than a fixed rule.",
  },
  {
    q: "Why is my eligible loan amount different from what a bank actually offers?",
    a: "This calculator works out the mathematical maximum based on FOIR alone. A real bank also weighs your credit score, employment stability, existing relationship with the lender, the property's own valuation and loan-to-value cap, and its own risk appetite that week — any of those can pull the actual offer below what pure FOIR math suggests.",
  },
  {
    q: "Does a longer tenure increase how much I can borrow?",
    a: "Yes, for the same reason a longer tenure lowers an EMI on a loan you've already picked — spreading the same affordable EMI over more months lets it cover a larger principal. It's the same trade-off in reverse: more borrowing power now, more total interest paid over the life of the loan.",
  },
  {
    q: "Should I include my spouse's income?",
    a: "Only if you're applying for the loan jointly — lenders combine incomes for a genuine joint application, which raises the eligible amount, but this calculator models a single income stream. Run it once per applicant's income if you want to compare individual vs joint eligibility.",
  },
];

export function EligibilityContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          Rather than telling you the EMI on a loan amount you&rsquo;ve already picked, this
          works backwards: from your income and existing obligations, it finds the maximum
          monthly EMI a lender would typically allow, then the maximum loan amount that EMI
          actually supports.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          First, FOIR sets the ceiling: (all EMIs, including the new one) ÷ net monthly
          income, capped at the FOIR percentage. Subtracting your existing EMIs from that
          ceiling leaves the maximum EMI available for the new loan. Then that EMI is run
          through the standard EMI formula in reverse &mdash; solving for the principal that
          produces exactly that EMI at your chosen rate and tenure:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          Max loan = EMI × ((1+r)ⁿ − 1) ÷ (r × (1+r)ⁿ)
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹1,00,000 net monthly income, no existing EMIs, a 50% FOIR cap, 8.5%
          interest, over 20 years &mdash; the calculator&rsquo;s own default. The FOIR ceiling is
          1,00,000 × 50% = ₹50,000, and with no existing EMIs to subtract, that&rsquo;s the full
          amount available for the new loan. Working that EMI backwards through the
          reversed formula gives a maximum loan amount of{" "}
          <strong>₹57,61,542</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/home-loan-emi/" className="text-figure hover:underline">
            Home loan EMI
          </a>{" "}
          once you know the actual amount you&rsquo;re borrowing, and{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            in-hand salary from CTC
          </a>{" "}
          to get an accurate net monthly income to plug in here.
        </p>
      </section>
    </div>
  );
}
