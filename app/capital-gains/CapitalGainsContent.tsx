import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is the LTCG exemption limit for equity?",
    a: "₹1,25,000 per financial year, across all your long-term equity gains combined — not per stock or fund, and not per transaction. Only the amount above that threshold is taxed, at 12.5%.",
  },
  {
    q: "What is indexation and why does it only apply to property?",
    a: "Indexation adjusts your purchase price upward for inflation before calculating the gain, using the Cost Inflation Index, so you're not taxed on gains that are really just inflation. Since the Finance (No. 2) Act, 2024, it only survives as an option for property bought before 23 July 2024 — every other asset class, and property bought after that date, uses a flat rate with no indexation at all.",
  },
  {
    q: "Can I choose indexation even if it gives me a higher tax?",
    a: "No — if you're eligible for the choice at all (property bought before 23 July 2024), the calculation is required to use whichever of the two methods results in lower tax, not whichever you'd prefer for other reasons.",
  },
  {
    q: "Can I avoid capital gains tax on property by reinvesting?",
    a: "Section 54 exempts long-term capital gains on a residential property if you reinvest in another residential property within 2 years of the sale (or construct one within 3 years) — for individuals and HUFs only, and subject to its own conditions and caps. This calculator doesn't model that exemption; treat its output as the tax before any Section 54 reinvestment relief.",
  },
  {
    q: "Why is short-term property gain not shown as a tax amount?",
    a: "Because it isn't taxed at a flat rate — short-term property gains are added to your other income for the year and taxed at whatever your income tax slab works out to, which depends on your total income, not just this one transaction. Run the gain through the income tax calculator alongside your other income to see the actual impact.",
  },
  {
    q: "Does this apply to inherited or gifted property?",
    a: "The holding period for inherited or gifted property is counted from when the original owner acquired it, not from when you received it, and the cost is generally what the original owner paid. This calculator assumes you're entering your own effective purchase details directly.",
  },
];

export function CapitalGainsContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out the capital gains tax on selling equity shares,
          equity mutual funds, or property — including the choice between
          indexed and non-indexed tax on older property, which most
          calculators either skip or get wrong given how recently the rules
          changed.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          <strong>Equity</strong> held for more than 12 months is long-term,
          taxed at 12.5% on gains above a ₹1,25,000 annual exemption; held
          12 months or less, it&rsquo;s short-term, taxed at 20% on the full
          gain with no exemption at all.
        </p>
        <p className="mt-2">
          <strong>Property</strong> held for more than 24 months is
          long-term. If you bought it before 23 July 2024, you get to pick
          whichever costs less: 20% tax on the gain after adjusting your
          purchase price for inflation (indexation), or a flat 12.5% on the
          plain, unadjusted gain. Property bought on or after that date only
          gets the 12.5% flat rate — no indexation, no choice. Short-term
          property gains skip all of this and just get added to your other
          income at your slab rate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a property bought in FY 2010-11 for ₹20,00,000 and sold now
          for ₹60,00,000 — held around 200 months, comfortably long-term,
          and old enough to qualify for the indexation choice. The plain
          gain is ₹40,00,000.
        </p>
        <p className="mt-2">
          Indexing the purchase price using the Cost Inflation Index (167
          for FY 2010-11, 384 for FY 2026-27) inflates the effective cost to
          ₹45,98,802, bringing the indexed gain down to ₹14,01,198. Tax at
          20% on that comes to <strong>₹2,80,240</strong>. Tax at a flat
          12.5% on the plain ₹40,00,000 gain, with no indexation, would be
          ₹5,00,000 — nearly double. The calculator picks the cheaper
          option automatically: <strong>₹2,80,240</strong>.
        </p>
        <p className="mt-2">
          That gap narrows, and can reverse, for properties with much larger
          real appreciation relative to inflation — a ten-fold gain over a
          shorter, more recent hold can end up cheaper under the flat 12.5%
          rate instead, since indexation only removes the inflation portion
          of the gain, not the rest.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Purchase year</strong> is the single biggest lever for
          property — it determines both whether you get the indexation
          choice at all, and how large the inflation adjustment is if you
          do. <strong>How much the asset actually appreciated relative to
          inflation</strong> decides which of the two property options wins:
          modest, inflation-tracking appreciation favours indexation; sharp,
          well-above-inflation appreciation favours the flat rate. For
          equity, <strong>holding period</strong> alone decides the rate —
          there&rsquo;s no partial credit for being close to 12 months.
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
          for the slab-rate tax on short-term property gains this tool
          doesn&rsquo;t compute, and{" "}
          <a href="/sip-returns/" className="text-figure hover:underline">
            SIP returns
          </a>{" "}
          if the equity gain you&rsquo;re calculating came from a systematic
          investment.
        </p>
      </section>
    </div>
  );
}
