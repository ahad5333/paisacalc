import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is FD maturity value calculated?",
    a: "A = P × (1 + r/4/100)^(4t), where P is the amount deposited, r is the annual interest rate, and t is the tenure in years. The 4 is there because Indian banks compound FD interest quarterly by default — interest earned each quarter gets added to the principal before the next quarter's interest is calculated.",
  },
  {
    q: "Why quarterly compounding specifically?",
    a: "It's the convention virtually every Indian bank — SBI, HDFC, ICICI, and the rest — uses for standard FDs by default, publishes in their own FD calculators, and quotes on their rate cards. Some banks offer monthly or half-yearly compounding options too, but quarterly is what you get unless you specifically ask for something else.",
  },
  {
    q: "Is FD interest taxable?",
    a: "Yes, in full — FD interest is added to your total income and taxed at your slab rate, it isn't a flat rate. Banks deduct TDS at 10% if your total interest from that bank exceeds ₹40,000 in a year (₹50,000 for senior citizens) under Section 194A, but TDS being deducted doesn't mean your final tax liability is settled — you still declare the full interest as income when filing.",
  },
  {
    q: "What happens if I withdraw an FD early?",
    a: "Most banks charge a premature-withdrawal penalty, typically 0.5–1% shaved off the interest rate that applies for however long the money was actually deposited — not the rate you were originally quoted for the full tenure. This calculator assumes the deposit runs its full term; check your specific bank's premature-withdrawal terms before assuming you can exit early at no cost.",
  },
  {
    q: "Is a longer FD tenure always better?",
    a: "Only if the rate holds up — a longer tenure means more quarters of compounding, but banks don't always offer their best rate on their longest tenures; sometimes a 1–2 year FD actually pays more than a 5-year one. Compare the specific rate quoted for the tenure you're considering rather than assuming longer automatically means more return.",
  },
];

export function FdContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out what a fixed deposit is worth at maturity — the amount you
          get back after depositing a lump sum for a fixed period at a fixed interest
          rate, with the interest compounding quarterly the way Indian banks actually
          calculate it, not a simplified annual approximation.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          A fixed deposit earns compound interest, credited quarterly: at the end of each
          three-month period, that quarter&rsquo;s interest is added to the balance, and the
          next quarter&rsquo;s interest is calculated on the new, larger balance. The formula
          for the amount at maturity is:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          A = P × (1 + r/4/100)⁴ᵗ
        </p>
        <p className="mt-3">
          <strong>P</strong> is the amount deposited. <strong>r</strong> is the annual
          interest rate the bank quotes. <strong>t</strong> is the tenure in years. The 4
          appears twice: once dividing the annual rate down to a quarterly rate, and once
          multiplying the tenure up into a number of quarters.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take ₹1,00,000 deposited at 7% per annum for 1 year — the calculator&rsquo;s own
          default. The quarterly rate is 7 ÷ 4 ÷ 100 = 1.75%, compounded over 4 quarters.
          Plugging P = 1,00,000, r = 0.0175 per quarter, and 4 quarters into the formula
          above gives a maturity amount of <strong>₹1,07,186</strong> &mdash; ₹7,186 in
          interest on the original ₹1,00,000, slightly more than a simple 7% would give
          you (₹7,000) because of the quarterly compounding.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Deposit amount</strong> scales the maturity value directly &mdash; double it
          and both the maturity amount and the interest earned double too.{" "}
          <strong>Interest rate</strong> compounds, so its effect grows with tenure: a
          1-point difference barely matters over 3 months but adds up meaningfully over 5
          years. <strong>Tenure</strong> has the biggest effect of the three, since more
          quarters means more compounding cycles &mdash; but only if the rate for that longer
          tenure is actually as good as the rate for a shorter one, which isn&rsquo;t always
          true.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/rd-calculator/" className="text-figure hover:underline">
            RD calculator
          </a>{" "}
          if you&rsquo;d rather build up savings with monthly deposits instead of one lump
          sum, and{" "}
          <a href="/income-tax/" className="text-figure hover:underline">
            income tax: old vs new regime
          </a>{" "}
          to see how FD interest income affects your overall tax.
        </p>
      </section>
    </div>
  );
}
