import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why are personal loan rates so much higher than home or car loan rates?",
    a: "A personal loan is unsecured — there's no property or vehicle backing it that the lender can repossess if you stop paying. That extra risk to the lender is priced directly into the rate, which typically runs from around 9.5% for the strongest credit profiles up to 24% or more for weaker ones.",
  },
  {
    q: "Why is the maximum tenure so much shorter?",
    a: "Lenders want unsecured debt off their books faster precisely because there's no collateral to fall back on — most cap personal loans at 5 years, against 30 for a home loan. A shorter tenure also means less total interest, which partly offsets the higher rate.",
  },
  {
    q: "What determines the exact rate I'll be offered?",
    a: "Mainly your credit score, income stability, existing debt, and relationship with the lender — pre-approved offers to existing customers with strong credit scores (750+) often start near the bottom of the range, while a first-time or riskier applicant sees the upper end.",
  },
  {
    q: "Are there other charges beyond the interest rate?",
    a: "Almost always a processing fee (commonly 1-3% of the loan amount, sometimes a flat fee), and often a prepayment or foreclosure charge if you pay it off early. Check the actual annual percentage rate a lender quotes, not just the headline interest rate, since fees push the real cost higher.",
  },
];

export function PersonalLoanContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out your fixed monthly personal loan payment from the amount
          borrowed, the interest rate, and the tenure — the same reducing-balance
          amortisation every EMI-based loan uses, just at the higher rates and shorter
          tenures that come with an unsecured loan.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹5,00,000 personal loan at 13% per annum over 3 years (36 months) — the
          calculator&rsquo;s own default. Compare that same ₹5,00,000 at a home loan&rsquo;s typical
          8.5% and you&rsquo;d pay dramatically less interest &mdash; the unsecured nature of a
          personal loan is expensive specifically because there&rsquo;s nothing backing it.
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
          to see how much less the same amount costs when it&rsquo;s secured, and{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            in-hand salary from CTC
          </a>{" "}
          to check what EMI your actual take-home pay can comfortably support.
        </p>
      </section>
    </div>
  );
}
