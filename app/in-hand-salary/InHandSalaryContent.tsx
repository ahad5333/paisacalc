import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is my in-hand salary so much lower than my CTC?",
    a: "CTC bundles in costs your employer pays that never touch your bank account — its own PF contribution and a gratuity provision, mainly. On top of that, your own PF contribution, professional tax, and income tax all come out before the rest reaches you. For a typical salary, in-hand ends up somewhere around 70-85% of CTC.",
  },
  {
    q: "What is the difference between CTC and gross salary?",
    a: "CTC is everything the company spends on you, including money that never appears on your payslip — employer PF and gratuity provisioning. Gross salary is what actually appears on your payslip before deductions: CTC minus those two non-cash components. Take-home is gross salary minus your own PF, professional tax, and income tax.",
  },
  {
    q: "Is employer PF contribution part of my salary?",
    a: "It's part of your CTC, not your salary. It goes directly into your EPF account, not your bank account, and you can't access it until you withdraw your provident fund — typically on leaving a job or at retirement.",
  },
  {
    q: "Do I get the gratuity amount every month?",
    a: "No. Gratuity is provisioned annually as part of your CTC but paid out as a single lump sum, and only if you complete 5 years of continuous service with that employer. Leave before that and you typically don't receive it at all, even though it was counted in your CTC the whole time.",
  },
  {
    q: "Why does professional tax vary by state?",
    a: "Professional tax is levied by state governments, not the central government, so each state sets its own slabs and its own maximum — capped at ₹2,500 a year everywhere under the Constitution. Some states, like Delhi, don't charge it at all. Set the input to 0 if yours doesn't.",
  },
  {
    q: "Which tax regime gives a higher in-hand salary?",
    a: "It depends on how much you claim in old-regime deductions relative to your income — there's no fixed answer. This calculator computes both and shows which one currently works out cheaper for the numbers you've entered, the same comparison the dedicated old vs new regime calculator does in more depth.",
  },
];

export function InHandSalaryContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool takes the CTC number from your offer letter and works
          out what actually lands in your bank account each month — after
          provident fund, gratuity provisioning, professional tax, and
          income tax under whichever regime costs you less. Most people see
          a CTC figure and assume it&rsquo;s close to their take-home; it
          rarely is.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Basic salary is assumed at 50% of CTC — the minimum required under
          the Code on Wages, in effect since November 2025. Employer PF (12%
          of basic) and a gratuity provision (basic × 15 days ÷ 26, per year
          of service) are set aside from CTC before anything reaches your
          payslip; neither is cash you receive monthly. What&rsquo;s left is
          your gross salary — the number that actually appears on your
          payslip.
        </p>
        <p className="mt-2">
          From gross salary, your own PF contribution (matching your
          employer&rsquo;s 12%) and professional tax come out, along with
          income tax — computed the same way the{" "}
          <a href="/income-tax/" className="text-figure hover:underline">
            old vs new regime calculator
          </a>{" "}
          works it out, comparing both regimes and using whichever is
          cheaper for your numbers. What&rsquo;s left, divided by twelve, is
          your monthly in-hand salary.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹12,00,000 CTC — the calculator&rsquo;s own default. Basic
          salary is ₹6,00,000 (50%). Employer PF is ₹72,000 and the gratuity
          provision is ₹28,846, leaving a gross salary of ₹10,99,154 — the
          figure that would actually appear on the payslip.
        </p>
        <p className="mt-2">
          Employee PF matches the employer&rsquo;s ₹72,000. Taxable income
          under the new regime comes to ₹10,24,154 after the ₹75,000
          standard deduction — under the ₹12,00,000 rebate ceiling, so tax
          is <strong>zero</strong>. After employee PF and ₹2,400 of
          professional tax, in-hand works out to{" "}
          <strong>₹85,396 a month</strong> — about 85% of the CTC, and
          notably close to it precisely because this income level pays no
          tax at all under the new regime.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Income tax</strong> is the biggest lever once CTC climbs
          past the new regime&rsquo;s ₹12,00,000-taxable-income rebate
          ceiling — the gap between CTC and in-hand widens noticeably past
          that point, since PF and gratuity stay roughly proportional but
          tax doesn&rsquo;t. <strong>Old-regime deductions</strong> only
          help if you&rsquo;re actually claiming them — 80C, 80D, and
          similar aren&rsquo;t automatic, and this calculator assumes
          nothing beyond your own PF contribution unless you enter more.{" "}
          <strong>Professional tax</strong> is small in absolute terms but
          worth setting correctly for your state rather than leaving the
          default in place.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/income-tax/" className="text-figure hover:underline">
            Income tax: old vs new regime
          </a>{" "}
          for a deeper look at the tax comparison behind this calculator&rsquo;s
          numbers, and{" "}
          <a href="/home-loan-emi/" className="text-figure hover:underline">
            home loan EMI
          </a>{" "}
          if you&rsquo;re weighing how a loan repayment fits against what you take
          home.
        </p>
      </section>
    </div>
  );
}
