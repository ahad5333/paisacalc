import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Which comes out ahead — buying or renting?",
    a: "It depends entirely on your inputs, especially how long you plan to stay and the assumed investment return on the money renting frees up. There's no universal answer — the calculator's own default (10-year hold, 10% investment return) actually favours renting & investing, but a longer hold or a lower assumed market return tips it toward buying.",
  },
  {
    q: "Why does the number of years matter so much?",
    a: "Buying has large upfront and ongoing costs (down payment, maintenance) that only pay off as home equity builds and appreciation compounds over time. A short stay rarely lets that outweigh what the same down payment could have earned invested instead — which is why years to compare is usually the single biggest lever in this comparison.",
  },
  {
    q: "What does \"renting & investing\" assume?",
    a: "That whatever you're not spending on a down payment and EMI gets invested at the return rate you set, every month the EMI exceeds rent. It's a deliberately optimistic assumption about renter discipline — in practice, that gap has to actually get invested, not spent, for this comparison to hold.",
  },
  {
    q: "What isn't this accounting for?",
    a: "Taxes (on rent, on investment gains, or home loan interest deductions), transaction costs like registration and brokerage, and the non-financial value of owning versus renting. This is a pure net-worth comparison at a single point in time, not a complete financial or lifestyle picture.",
  },
];

export function RentVsBuyContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares your net worth under two paths over the same number of years &mdash;
          buying this home with a loan, versus renting a comparable place and investing
          whatever the down payment and the EMI-minus-rent gap would otherwise have cost.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take an ₹80,00,000 home with 20% down at 8.5% over 20 years, against ₹25,000
          comparable rent rising 5% a year &mdash; the calculator&rsquo;s own defaults, compared
          over 10 years. Buying nets out to <strong>₹87,92,777</strong>; renting & investing
          the difference at an assumed 10% return nets out to <strong>₹93,80,241</strong> &mdash;
          renting comes out ahead by about ₹5.9L over that particular decade.
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
          to work out the buying side in more detail, and{" "}
          <a href="/home-loan-eligibility/" className="text-figure hover:underline">
            home loan eligibility
          </a>{" "}
          to check what loan amount you'd actually qualify for.
        </p>
      </section>
    </div>
  );
}
