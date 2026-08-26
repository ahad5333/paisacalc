import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is the moratorium period interest-free?",
    a: "No — this is the single most common misunderstanding about education loans. Interest keeps accruing on the full loan amount throughout the moratorium (course duration plus a grace period after, typically 6-12 months), then gets added to the principal once, right before EMIs start. A ₹10 lakh loan can easily grow to ₹14 lakh or more before repayment even begins, purely from moratorium interest.",
  },
  {
    q: "Can I avoid the interest getting added to my principal?",
    a: "Yes, if you or your family can afford to pay the interest as it accrues during the moratorium (called \"simple interest servicing\") rather than letting it capitalise — many lenders offer a small rate discount for doing this too. This calculator models the more common case, where nothing is paid until the moratorium ends.",
  },
  {
    q: "What is the Central Sector Interest Subsidy?",
    a: "A government scheme that pays the full moratorium-period interest on behalf of the borrower, for students from families earning under ₹4.5 lakh a year, on loans up to ₹7.5 lakh through eligible institutions. If you qualify, your actual capitalised principal would be lower than what this calculator shows, since it doesn't model the subsidy.",
  },
  {
    q: "Why do education loan rates vary so much by institute?",
    a: "Lenders price the loan partly on the graduate's expected future earning capacity — premier institutes (like the IITs or top study-abroad programs) get preferential rates because default risk is judged lower, sometimes 2-3 percentage points below a standard rate for a less selective institution.",
  },
];

export function EducationLoanContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out your EMI once repayment actually starts &mdash; but the number that
          usually surprises people isn&rsquo;t the EMI, it&rsquo;s how much the loan grows during
          the moratorium first. Interest accrues the whole time you&rsquo;re studying, then gets
          folded into the principal before your first EMI is even calculated.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          During the moratorium, simple interest builds up on the original loan amount:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          Accrued interest = Loan amount × rate × (moratorium months ÷ 12)
        </p>
        <p className="mt-3">
          That accrued interest is added to the loan amount once, giving a larger
          &ldquo;capitalised principal.&rdquo; From there, it&rsquo;s a standard EMI calculation &mdash; the
          same reducing-balance formula every other loan on this site uses &mdash; just run on
          the capitalised amount instead of the original disbursed amount.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹10,00,000 loan at 9.5%, a 54-month moratorium (a 4-year course plus 6
          months), repaid over 10 years &mdash; the calculator&rsquo;s own default. Moratorium
          interest alone comes to <strong>₹4,27,500</strong>, capitalising the loan to{" "}
          <strong>₹14,27,500</strong> before a single EMI is paid. That works out to an EMI
          of <strong>₹18,472</strong> a month &mdash; noticeably more than a straight EMI
          calculation on the original ₹10,00,000 would suggest.
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
          for the standard amortisation formula this builds on, and{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            in-hand salary from CTC
          </a>{" "}
          to check what EMI your first job&rsquo;s take-home pay can actually support.
        </p>
      </section>
    </div>
  );
}
