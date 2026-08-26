import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is the annualised return lower than the appreciation rate I entered?",
    a: "Because buying and selling a property both cost real money that never shows up in the headline appreciation figure. In the calculator's own default — 8% annual appreciation over 5 years, with 7% buying cost and 2% selling cost — the actual annualised return works out to about 6.1%, not 8%. That gap is entirely stamp duty, registration, and brokerage.",
  },
  {
    q: "What's a realistic buying cost percentage?",
    a: "Stamp duty alone typically runs 3-10% of the property value depending on the state — India has no single national rate, and some states offer discounts for women buyers or on certain property types. Add registration charges (commonly around 1%) and buyer-side brokerage if any, and a combined figure of 6-8% is a reasonable planning estimate for most states, but check your specific state's current rates before relying on this.",
  },
  {
    q: "Does this include rental income while holding the property?",
    a: "No — this is a pure buy-and-later-sell calculation. If you're also collecting rent during the holding period, see the rental property calculator for cash-flow analysis; combining both would give the fuller investment picture.",
  },
  {
    q: "What about home loan interest if the purchase was financed?",
    a: "Not included — this treats the purchase price as paid in cash. If you're financing with a home loan, the interest paid over the holding period is a real cost on top of what's shown here, and would further reduce the actual annualised return.",
  },
];

export function RealEstateReturnsContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the net profit and annualised return from buying a property and
          selling it after a chosen holding period &mdash; accounting for the buying and
          selling costs that eat into the headline appreciation rate, not just the raw price
          change.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹60,00,000 property at 8% annual appreciation, held for 5 years, with a 7% buying
          cost and 2% selling cost &mdash; the calculator&rsquo;s own defaults &mdash; sells for
          ₹88,15,968 before costs. After buying cost (pushing the real outlay to ₹64,20,000)
          and selling cost, net profit comes to <strong>₹22,19,649</strong> &mdash; an
          annualised return of <strong>6.1%</strong>, noticeably below the 8% appreciation rate
          that went in.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/rent-vs-buy/" className="text-figure hover:underline">
            Rent vs. buy
          </a>{" "}
          to compare this against renting and investing instead, and{" "}
          <a href="/capital-gains/" className="text-figure hover:underline">
            capital gains tax
          </a>{" "}
          for what the tax bill on this profit would actually look like.
        </p>
      </section>
    </div>
  );
}
