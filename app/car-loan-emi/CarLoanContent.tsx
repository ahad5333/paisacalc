import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is a car loan EMI calculated?",
    a: "The same way as any amortising loan: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the amount borrowed, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months. There's no car-specific rule — it's the standard reducing-balance formula every lender uses, whether the collateral is a house or a car.",
  },
  {
    q: "Why are car loan interest rates higher than home loan rates?",
    a: "A car depreciates fast and isn't worth much as collateral a few years in, so lenders price car loans as higher risk than home loans, which are secured against an appreciating asset. New-car loans in India typically run somewhere in the 8–12% range depending on the lender and your credit profile; used-car loans usually run a few points higher still.",
  },
  {
    q: "Does a bigger down payment actually help?",
    a: "Yes, more than it might look like at first — a bigger down payment shrinks the principal you're borrowing, which shrinks the EMI directly and cuts the total interest paid over the loan, since interest is charged on a smaller opening balance every single month. It also improves your loan-to-value ratio, which can sometimes get you a better rate.",
  },
  {
    q: "What's a typical car loan tenure in India?",
    a: "Most lenders cap car loans at 7 years, and 5 years is the most commonly chosen tenure. Longer tenures lower the EMI but — exactly as with a home loan — mean paying more total interest, and a car loses value faster than a house, so a very long tenure risks owing more than the car is worth partway through.",
  },
  {
    q: "Should I take the dealership's finance offer or a bank loan?",
    a: "Compare the actual annual interest rate, not just the advertised EMI — dealership \"0% finance\" offers sometimes fold the interest cost into a higher sticker price instead. Run the dealership's quoted numbers through this calculator and compare the EMI and total interest against what your bank quotes for the same loan amount and tenure.",
  },
  {
    q: "Can I prepay a car loan early?",
    a: "Most lenders allow it, though some charge a prepayment penalty on car loans (more commonly than on home loans, where regulation restricts such charges). Check your loan agreement's foreclosure terms before assuming prepayment is free — the interest saved needs to be weighed against any penalty.",
  },
];

export function CarLoanContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out your fixed monthly car loan payment — the EMI — from three
          numbers: how much you&rsquo;re borrowing, the interest rate, and how many years
          you&rsquo;ll take to repay it. It also breaks that EMI into interest and principal for
          every month of the loan, the same way the home loan EMI calculator does, since a
          car loan is amortised on identical terms — just usually a smaller amount over a
          shorter tenure.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          A car loan is repaid using the same reducing-balance method as any other
          amortising loan: interest is charged only on whatever principal is still
          outstanding, recalculated every month. The standard EMI formula works out the flat
          monthly instalment that exactly pays off both the principal and all the interest
          that will accrue on it over the tenure:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)
        </p>
        <p className="mt-3">
          <strong>P</strong> is the amount borrowed &mdash; the car&rsquo;s on-road price minus
          your down payment. <strong>r</strong> is the interest rate per month, the annual
          rate the lender quotes divided by 12 and by 100. <strong>n</strong> is the number
          of monthly instalments &mdash; the tenure in years, multiplied by 12.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take an ₹8,00,000 car loan at 9.5% per annum over 5 years (60 months) &mdash; the
          calculator&rsquo;s own default. The monthly rate is 9.5 ÷ 12 ÷ 100 = 0.7917%. Plugging
          P = 8,00,000, r = 0.007917, and n = 60 into the formula above gives an EMI of{" "}
          <strong>₹16,801</strong>.
        </p>
        <p className="mt-2">
          In month one, interest is charged on the full ₹8,00,000: 8,00,000 × 0.7917% =
          ₹6,333. The remaining ₹10,468 of that month&rsquo;s EMI goes to principal, taking the
          balance down to ₹7,89,532 &mdash; already a much faster dent than a home loan makes in
          its first month, simply because the loan is smaller and the tenure shorter.
        </p>
        <p className="mt-2">
          Across all 60 months, this loan costs ₹10,08,092 in total &mdash; the original
          ₹8,00,000 plus ₹2,08,092 in interest. That works out to interest costing about 26%
          of the amount borrowed, well below a 20-year home loan&rsquo;s roughly 108%, purely
          because the tenure is so much shorter.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Loan amount</strong> scales the EMI directly &mdash; this is the lever a bigger
          down payment pulls, since every rupee you put down is a rupee you don&rsquo;t borrow
          and don&rsquo;t pay interest on. <strong>Interest rate</strong> matters less in absolute
          terms than on a home loan simply because the loan is smaller and shorter-lived, but
          it still moves the EMI directly. <strong>Tenure</strong> trades a lower EMI for more
          total interest, same as any amortising loan &mdash; but on a car specifically, a long
          tenure also risks outlasting the car&rsquo;s useful resale value.
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
          for the same amortisation math on a larger, longer-tenure loan, and{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            in-hand salary from CTC
          </a>{" "}
          to check what this EMI would actually cost against your real take-home pay.
        </p>
      </section>
    </div>
  );
}
