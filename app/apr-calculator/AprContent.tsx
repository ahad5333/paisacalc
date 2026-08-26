import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why isn't APR just the stated rate plus the fee percentage?",
    a: "Because the fee is deducted once, upfront, from the loan amount, while the EMI keeps getting paid on the full amount for the entire tenure — so the fee's real cost, spread over every EMI, works out to more than just adding it once. The calculator's own default (12% stated rate, 2% fee, 3 years) works out to a 13.41% APR, not 14%.",
  },
  {
    q: "Does a longer tenure make the fee's impact bigger or smaller?",
    a: "Smaller — a one-time fee gets spread across more EMIs on a longer loan, so its effect on the annualised rate shrinks. A short-tenure loan with the same fee percentage sees a proportionally bigger APR bump, since there are fewer payments to absorb it.",
  },
  {
    q: "Is APR the number I should compare between lenders?",
    a: "Yes — comparing stated rates alone can be misleading if lenders charge different processing fees. Two loans quoted at the same stated rate but different fees have different real costs; APR puts them on the same footing.",
  },
  {
    q: "What isn't included here?",
    a: "GST charged on the processing fee itself, and any other one-time charges like documentation fees or bundled insurance — all of which would push the real APR higher still if added.",
  },
];

export function AprContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the effective annual rate (APR) once a processing fee is factored in
          &mdash; the rate that would produce the same EMI if the fee had been rolled into the
          loan instead of deducted upfront from what you actually receive.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹5,00,000 loan at a stated 12% rate over 3 years, with a 2% processing fee &mdash;
          the calculator&rsquo;s own defaults. The EMI is ₹16,607, but only ₹4,90,000 is
          actually disbursed after the ₹10,000 fee is deducted. Paying that EMI against that
          smaller amount works out to an effective APR of <strong>13.41%</strong>, not the 12%
          on the paperwork.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/personal-loan-emi/" className="text-figure hover:underline">
            Personal loan EMI
          </a>{" "}
          to work out the EMI on its own, and{" "}
          <a href="/debt-consolidation/" className="text-figure hover:underline">
            debt consolidation
          </a>{" "}
          if you're comparing this loan against rolling in existing debt.
        </p>
      </section>
    </div>
  );
}
