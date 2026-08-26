import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is SIP return calculated?",
    a: "Each month's contribution is assumed to earn the same fixed rate of return, compounding monthly, for however long is left in the investment. The standard formula is FV = P × ((1+r)ⁿ − 1) ÷ r × (1+r), where r is the monthly return and n the number of months — see the derivation panel above for it worked out with your own numbers.",
  },
  {
    q: "Can SIP returns be negative?",
    a: "Yes. This calculator assumes a constant, positive return, but real mutual fund returns move with the market and can be negative over any given stretch, especially a short one. SIPs are built to handle this by buying more units when prices are down and fewer when they're up — over long periods this has historically smoothed out, but it isn't guaranteed.",
  },
  {
    q: "What is a step-up SIP?",
    a: "A step-up SIP increases your monthly investment by a fixed percentage every year, typically in line with salary growth, instead of staying flat for the whole duration. A 10% annual step-up on the same base amount and duration can very roughly double the final corpus compared to a flat SIP, because both the contributions and the return on those larger contributions compound over time.",
  },
  {
    q: "What is XIRR and why isn't it shown here?",
    a: "XIRR is the actual annualised return of a real SIP, accounting for the exact dates and amounts of every instalment — useful for measuring an SIP you've already run. This calculator does the opposite: it projects forward from an assumed constant return, so there's no XIRR to compute yet. Once you've actually invested, your fund platform will show you the XIRR.",
  },
  {
    q: "Is SIP better than a lump sum investment?",
    a: "Neither is universally better — it depends on timing and discipline. A lump sum invested right before a downturn does worse than spreading the same amount over an SIP; a lump sum invested right before a rally does better. SIPs mainly help by making regular investing automatic rather than dependent on picking a good moment.",
  },
  {
    q: "What return rate should I assume?",
    a: "There's no correct answer — it's an assumption, not a promise. Equity mutual funds in India have historically returned somewhere in the 10-14% range annually over long periods, but any single year can be far outside that band in either direction. Try the calculator at a few different rates rather than trusting one number.",
  },
];

export function SipContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool projects what a monthly SIP could grow into, given an
          assumed rate of return — and, if you use it, an annual step-up
          that increases your contribution over time. It splits the result
          into what you actually put in versus what growth added on top,
          since that split is usually the more interesting number.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Every monthly contribution is assumed to land at the start of the
          month and then compound at the same monthly rate for however long
          is left. For a flat SIP, that simplifies to a standard formula:
          FV = P × ((1+r)ⁿ − 1) ÷ r × (1+r), where P is the monthly amount,
          r is the monthly return (annual rate ÷ 12 ÷ 100), and n is the
          total number of months.
        </p>
        <p className="mt-2">
          A step-up SIP doesn&rsquo;t have a clean formula like that, because
          the contribution itself changes every year — so this calculator
          simulates it month by month instead: each year&rsquo;s
          contribution compounds on its own, and the total is the sum of all
          of them. Set the step-up to 0% and this collapses back to the same
          flat-SIP formula above.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹10,000 monthly SIP at an assumed 12% annual return over 20
          years, stepping up 10% every year — the calculator&rsquo;s own
          defaults. Total investment over the 20 years comes to roughly
          ₹68.7 lakh, growing to a projected corpus of around{" "}
          <strong>₹1.99 crore</strong>.
        </p>
        <p className="mt-2">
          Compare that to the same ₹10,000 with no step-up at all: total
          investment is a flat ₹24 lakh, growing to roughly{" "}
          <strong>₹1 crore</strong>. The step-up roughly doubles the final
          corpus — not because the return rate changed, but because more
          money was invested earlier, when it had longer left to compound.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Duration</strong> matters more than almost any other
          input, because compounding is multiplicative over time — the
          difference between a 15-year and 25-year SIP is much larger than
          the extra 10 years alone would suggest. <strong>Step-up</strong>
          {" "}is the second-biggest lever and the easiest one to actually
          act on, since it&rsquo;s usually just matching a raise rather than
          finding new money. <strong>Return rate</strong> has an outsized
          effect precisely because it compounds — small changes here move
          the projection by a lot, which is exactly why it deserves
          skepticism rather than optimism when you pick a number.
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
          if you&rsquo;re weighing an SIP against paying down a loan faster, and{" "}
          <a href="/loan-prepayment/" className="text-figure hover:underline">
            loan prepayment impact
          </a>{" "}
          for the guaranteed-return side of that comparison.
        </p>
      </section>
    </div>
  );
}
