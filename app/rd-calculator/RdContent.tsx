import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is RD maturity value calculated?",
    a: "Unlike an FD, a recurring deposit doesn't have one clean compound-interest formula — every monthly instalment sits in the account for a different length of time before maturity, each earning its own share of interest. Indian banks use the IBA-prescribed formula M = R × [(1+i)ⁿ − 1] ÷ (1 − (1+i)^(−⅓)), where R is your monthly deposit, i is the quarterly rate (annual rate ÷ 400), and n is the number of quarters — it's mathematically equivalent to valuing each instalment separately and summing them, just condensed into one expression.",
  },
  {
    q: "Why does RD use \"quarters\" when I deposit monthly?",
    a: "Because the bank still compounds interest quarterly, same as an FD — the formula's job is to correctly value 3 monthly deposits landing partway through each compounding cycle, not just deposits that happen to land on quarter boundaries. That's what the unusual (1+i)^(−⅓) term in the formula does.",
  },
  {
    q: "Is RD interest taxed the same way as FD interest?",
    a: "Yes — RD interest is added to your total income and taxed at your slab rate, with the same TDS treatment under Section 194A (10% deducted once your interest from a bank crosses ₹40,000 in a year, ₹50,000 for senior citizens). There's no special tax treatment that makes an RD different from an FD on the tax side.",
  },
  {
    q: "What if I miss a monthly instalment?",
    a: "Most banks charge a small penalty per missed or delayed instalment, typically a fraction of a percent of the instalment amount per month it's late, and some banks close the RD automatically after a fixed number of consecutive misses. This calculator assumes every instalment is paid on schedule — real returns will be slightly lower if any are missed.",
  },
  {
    q: "RD or FD — which gives a better return?",
    a: "They're not really comparable head to head, since an RD only exists because you're building up the deposit over time rather than having the lump sum already — if you actually have the full amount today, a lump-sum FD invested immediately will always out-earn drip-feeding the same total into an RD, purely because the FD's money is earning interest from day one instead of gradually.",
  },
];

export function RdContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out what a recurring deposit is worth at maturity &mdash; the total
          you get back after depositing a fixed amount every month for a fixed number of
          months, with interest compounding quarterly the way Indian banks actually
          calculate it.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Every monthly instalment earns interest for a different length of time &mdash; the
          first deposit is in the account for the whole tenure, the last deposit for just
          one month. Banks handle this with a single closed-form formula (the IBA standard)
          rather than valuing each instalment separately:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          M = R × ((1+i)ⁿ − 1) ÷ (1 − (1+i)^(−⅓))
        </p>
        <p className="mt-3">
          <strong>R</strong> is the monthly deposit. <strong>i</strong> is the quarterly
          interest rate &mdash; the annual rate divided by 400. <strong>n</strong> is the
          number of quarters in the tenure. The formula is mathematically equivalent to
          treating each of the monthly deposits as its own mini-investment and summing all
          their individual maturity values, just worked out in one step instead of one per
          month.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take ₹5,000 deposited every month at 7% per annum for 12 months &mdash; the
          calculator&rsquo;s own default. The quarterly rate is 7 ÷ 400 = 1.75%, over 4
          quarters. Plugging R = 5,000, i = 0.0175, and n = 4 into the formula above gives
          a maturity amount of <strong>₹62,311</strong>.
        </p>
        <p className="mt-2">
          Across the year you deposit ₹5,000 × 12 = ₹60,000 out of pocket. The remaining{" "}
          <strong>₹2,311</strong> is interest &mdash; noticeably less, in percentage terms,
          than the same total deposited as a one-shot FD would earn, simply because most of
          this money wasn&rsquo;t actually sitting in the account earning interest for the
          full 12 months &mdash; the last few instalments barely had any time to compound at
          all.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Monthly deposit</strong> scales the maturity value directly. <strong>
            Interest rate
          </strong>{" "}
          matters more the longer the tenure runs, since a longer tenure gives more
          quarters for compounding to actually do something. <strong>Tenure</strong> has an
          outsized effect for a different reason than on an FD: a longer tenure doesn&rsquo;t
          just add compounding time to the existing deposits, it also means more total
          deposits going in &mdash; both effects push the maturity value up together.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/fd-calculator/" className="text-figure hover:underline">
            FD calculator
          </a>{" "}
          if you already have the full amount to deposit as a lump sum instead of building
          it up monthly, and{" "}
          <a href="/sip-returns/" className="text-figure hover:underline">
            SIP returns
          </a>{" "}
          to compare against investing the same monthly amount in equity instead of a bank
          deposit.
        </p>
      </section>
    </div>
  );
}
