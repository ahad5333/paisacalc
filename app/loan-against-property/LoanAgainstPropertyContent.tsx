import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from a home loan?",
    a: "A home loan finances buying the property; a loan against property (LAP) borrows against a property you already own, for any purpose — business capital, another investment, medical or education expenses. Because the lender isn't financing the asset being purchased, LAP typically comes with a lower LTV cap and a somewhat higher interest rate than a fresh home purchase loan.",
  },
  {
    q: "Why is LTV capped so much lower than a home loan?",
    a: "Home purchase loans in India often go up to 75-90% LTV since the property itself is the security for money actually spent buying it. LAP lenders are more conservative — commonly capping at 50-70% — because they're extending fresh credit against an asset without the transaction discipline of an actual purchase, and want a bigger equity cushion.",
  },
  {
    q: "Does the property type affect the LTV cap?",
    a: "Yes — residential property usually gets the higher end of the LTV range, while commercial or industrial property is typically capped lower, reflecting differences in how easily each can be valued and, if needed, sold.",
  },
  {
    q: "What isn't included here?",
    a: "The lender's processing fee, and the property valuation and legal verification most lenders commission before sanctioning — both add real upfront cost beyond the EMI shown here.",
  },
];

export function LoanAgainstPropertyContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the EMI on a loan against an already-owned property &mdash; starting
          from the loan-to-value (LTV) cap lenders actually apply to this kind of loan, not the
          full property value.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          An ₹80,00,000 property at a 60% LTV cap, 10.5% interest, over 10 years &mdash; the
          calculator&rsquo;s own defaults &mdash; gives an eligible loan amount of{" "}
          <strong>₹48,00,000</strong> and a monthly EMI of <strong>₹64,769</strong>, with total
          interest of ₹29,72,233 over the full tenure.
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
          if you're financing a purchase instead of borrowing against an existing property, and{" "}
          <a href="/debt-consolidation/" className="text-figure hover:underline">
            debt consolidation
          </a>{" "}
          if the purpose is rolling in existing higher-rate debt.
        </p>
      </section>
    </div>
  );
}
