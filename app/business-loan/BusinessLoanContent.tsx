import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why are business loan rates higher than a home or car loan?",
    a: "Business loans, especially to smaller enterprises, are frequently unsecured — no property or vehicle backing the loan the way a home or car loan has. Lenders price that extra risk into the rate, and also typically cap the tenure shorter (often 5-7 years) than a secured retail loan.",
  },
  {
    q: "Why is the processing fee bigger here than on other loans?",
    a: "Business loan underwriting usually involves more due diligence — reviewing financials, cash flow, sometimes collateral valuation — than a standard salaried-individual retail loan, and lenders commonly price that into a proportionally larger fee, often 1-3% versus a fraction of a percent elsewhere.",
  },
  {
    q: "Does the EMI change based on the processing fee?",
    a: "No — the EMI is calculated on the full sanctioned loan amount, exactly as the lender bills it every month. The processing fee only affects how much actually lands in your account at disbursement, not the ongoing repayment.",
  },
  {
    q: "What if my loan is secured against collateral instead?",
    a: "A secured business loan typically commands a lower rate than an unsecured one, reflecting the reduced risk to the lender — if collateral is involved, use the lower end of the typical rate range, or check directly with the specific lender.",
  },
];

export function BusinessLoanContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the EMI on a business or MSME loan, plus what&rsquo;s actually
          disbursed once the processing fee &mdash; typically bigger on business loans than on
          retail loans &mdash; is deducted.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹10,00,000 loan at 14% over 5 years with a 2% processing fee &mdash; the
          calculator&rsquo;s own defaults &mdash; comes to a <strong>₹23,268</strong> monthly
          EMI, ₹3,96,104 in total interest, and only ₹9,80,000 actually disbursed after the
          ₹20,000 fee.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/apr-calculator/" className="text-figure hover:underline">
            APR calculator
          </a>{" "}
          for the effective rate once the processing fee is folded in, and{" "}
          <a href="/depreciation-calculator/" className="text-figure hover:underline">
            depreciation calculator
          </a>{" "}
          if this loan is financing an asset for the business.
        </p>
      </section>
    </div>
  );
}
