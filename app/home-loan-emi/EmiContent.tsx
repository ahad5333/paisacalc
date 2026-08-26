import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is EMI on a home loan?",
    a: "EMI stands for equated monthly instalment — a fixed amount you pay your lender every month until the loan is repaid. Each instalment is part interest (on what you still owe) and part principal (what actually reduces your debt). The total stays the same every month; the split between the two changes.",
  },
  {
    q: "How is home loan EMI calculated?",
    a: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the tenure in months. It's the standard reducing-balance formula every lender uses — see the derivation panel above for it worked out with your own numbers.",
  },
  {
    q: "Why is more of my EMI going to interest than principal?",
    a: "Interest each month is charged on whatever balance is still outstanding, and early on that balance is close to the full loan amount. On a ₹40,00,000 loan at 8.5% for 20 years, month one alone is ₹28,333 interest against just ₹6,380 principal. That ratio flips gradually — by the final year, almost the whole EMI is principal — but it's slow: even after 10 years, roughly 70% of the original amount is still outstanding.",
  },
  {
    q: "Does a longer tenure always mean a cheaper loan?",
    a: "It means a lower EMI, not a cheaper loan. Stretching the same ₹40,00,000 at 8.5% from 20 to 30 years drops the EMI, but adds well over a decade of extra interest payments, since you're carrying a balance for longer. A longer tenure eases monthly cash flow; it doesn't reduce what the loan actually costs.",
  },
  {
    q: "How much of my salary should go towards EMI?",
    a: "Most lenders and financial planners cap total EMI obligations (this loan plus any others) at 40–50% of monthly take-home pay, and comfort is a tighter number than eligibility — a bank may approve more than you'd want to actually commit to for 15–20 years.",
  },
  {
    q: "Does prepayment actually save much interest?",
    a: "Yes, and disproportionately so early in the loan, because a rupee of principal repaid now is a rupee that stops accruing interest for every remaining month of the tenure. A prepayment in year 2 saves far more total interest than the same amount in year 15. This calculator doesn't model prepayment scenarios directly — that's a separate tool.",
  },
];

export function EmiContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out your fixed monthly home loan payment — the EMI — from three
          numbers: how much you&rsquo;re borrowing, the interest rate, and how many years
          you&rsquo;ll take to repay it. It also breaks that EMI into how much is interest and how much
          is principal, for every single month of the loan, so you can see exactly where
          your money goes rather than just the monthly total.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          A home loan is repaid using the reducing-balance method: interest is charged only
          on whatever principal is still outstanding, recalculated every month. Because the
          lender needs a{" "}
          <em>fixed</em> monthly payment rather than a shrinking one, the standard EMI
          formula works out what flat instalment — paid every month for the full tenure —
          exactly pays off both the principal and all the interest that will ever accrue on
          it:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)
        </p>
        <p className="mt-3">
          <strong>P</strong> is the principal — the amount you borrow.{" "}
          <strong>r</strong> is the interest rate per month, which is the annual rate the
          lender quotes divided by 12 and by 100. <strong>n</strong> is the number of
          monthly instalments — the tenure in years, multiplied by 12. Every EMI calculator,
          regardless of which bank publishes it, uses this same formula; it&rsquo;s how amortising
          loans work everywhere, not a rule specific to any one lender.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹40,00,000 loan at 8.5% per annum over 20 years (240 months) — the
          calculator&rsquo;s own default, so you can follow along above. The monthly rate is 8.5 ÷
          12 ÷ 100 = 0.7083%. Plugging P = 40,00,000, r = 0.007083, and n = 240 into the
          formula above gives an EMI of <strong>₹34,713</strong>.
        </p>
        <p className="mt-2">
          In month one, interest is charged on the full ₹40,00,000: 40,00,000 × 0.7083% =
          ₹28,333. The remaining ₹6,380 of that month&rsquo;s EMI goes to principal, taking
          the balance down to ₹39,93,620. Over the first full year, only ₹79,610 of
          principal gets repaid against ₹3,36,946 of interest — on paper you&rsquo;ve made
          12 payments, but you&rsquo;ve barely dented the loan.
        </p>
        <p className="mt-2">
          Across all 240 months, this loan costs ₹83,31,065 in total — the original ₹40 lakh
          plus ₹43,31,065 in interest, very nearly doubling the amount actually borrowed.
          That total-interest figure, not the EMI itself, is usually the number worth paying
          attention to.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Loan amount</strong> scales the EMI directly — double the principal at the
          same rate and tenure, and the EMI doubles too. <strong>Interest rate</strong> has
          an outsized effect on total cost precisely because it&rsquo;s compounding on a large
          balance for years before that balance meaningfully shrinks; even a 0.5-point
          difference on a 20-year loan is a real sum. <strong>Tenure</strong> is the lever
          most people underuse: extending it lowers the EMI, which helps monthly
          affordability, but every extra year is another year of interest on a balance that
          hasn&rsquo;t dropped much yet — so it typically raises the total cost of the loan even as
          it lowers the monthly one.
        </p>
        <p className="mt-2">
          None of these move independently in practice — a lender&rsquo;s rate offer often depends
          on the tenure and amount you request — so it&rsquo;s worth changing one input at a time
          above and watching how the derivation and total interest respond.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/loan-prepayment/" className="text-figure hover:underline">
            Loan prepayment impact
          </a>{" "}
          to see how much a lump-sum payment against this same loan actually saves, and{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            in-hand salary from CTC
          </a>{" "}
          to check what EMI your actual take-home pay can comfortably support.
        </p>
      </section>
    </div>
  );
}
