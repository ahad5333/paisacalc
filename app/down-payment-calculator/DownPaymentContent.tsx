import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does the down payment percentage matter so much?",
    a: "It's the single biggest lever on both the loan amount and the EMI — a higher down payment shrinks both directly. It also affects how long saving for it takes, which is the real tradeoff: a bigger down payment lowers your EMI for the entire loan tenure, but delays when you can actually buy.",
  },
  {
    q: "Is there a minimum down payment lenders require?",
    a: "Yes — Indian home loans are capped on loan-to-value (LTV) by regulation, which effectively sets a minimum down payment: roughly 10% on loans above ₹75 lakh, up to 25% on smaller-ticket loans, though the exact slabs vary. 20% is a common planning figure that comfortably clears most of these caps.",
  },
  {
    q: "Does this account for the home price changing while I save?",
    a: "No — it assumes the target home price stays fixed for the whole saving period. In a market where prices are rising, the actual down payment needed by the time you've saved enough could be higher than this calculator shows on day one.",
  },
  {
    q: "What about registration and stamp duty?",
    a: "Not included here — those are separate purchase costs on top of the down payment itself, commonly another 5-8% of the property value depending on the state. See the real estate returns calculator for how that factors into the bigger picture.",
  },
];

export function DownPaymentContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out how much down payment a target home price requires, the loan and EMI
          that down payment unlocks, and how long saving for it takes at your own monthly
          savings rate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹60,00,000 target home price at 20% down, with an 8.5% loan over 20 years and
          ₹30,000 set aside monthly &mdash; the calculator&rsquo;s own defaults &mdash; needs a{" "}
          <strong>₹12,00,000</strong> down payment, unlocking a ₹48,00,000 loan at ₹41,656 a
          month. At ₹30,000 saved monthly, that down payment takes about{" "}
          <strong>3 years 4 months</strong> to put together.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/home-loan-eligibility/" className="text-figure hover:underline">
            Home loan eligibility
          </a>{" "}
          to work in the opposite direction &mdash; from income to maximum loan &mdash; and{" "}
          <a href="/savings-goal/" className="text-figure hover:underline">
            savings goal
          </a>{" "}
          if you'd rather assume an investment return while saving instead of a flat monthly
          amount.
        </p>
      </section>
    </div>
  );
}
