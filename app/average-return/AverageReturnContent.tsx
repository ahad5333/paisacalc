import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why isn't the average return the number I actually earn?",
    a: "Because returns compound, not add. A -50% year followed by a +50% year averages to 0%, but ₹100 that drops to ₹50 and then gains 50% only reaches ₹75 — a -13.4% CAGR, not 0%. The more volatile the year-to-year returns, the bigger this gap gets, which is exactly what the calculator's own default (an 8% average but a 6.11% CAGR) demonstrates.",
  },
  {
    q: "Is CAGR always lower than the average?",
    a: "Always less than or equal to — the two are only equal when every year returns exactly the same, as the uniform-returns example in the calculator confirms (10% every year gives an 8% CAGR). The moment returns vary at all, CAGR drops below the average, and it drops further the more volatile the returns are.",
  },
  {
    q: "Why does a single bad year hurt so much?",
    a: "Losses and gains aren't symmetric once you're compounding. A -50% year needs a +100% gain just to get back to even — not another 50%. This is why a fund with wild swings can post an impressive-looking average return while its actual realised CAGR, the number that determines what you end up with, is meaningfully lower.",
  },
  {
    q: "Which number should I actually trust when comparing funds?",
    a: "CAGR — it's the rate that, applied uniformly every year, would have produced the same total growth. An average return can make a volatile fund look better than a steadier one with the same CAGR, which is exactly the kind of misleading comparison this calculator is built to catch.",
  },
];

export function AverageReturnContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares the plain arithmetic average of five yearly returns against the CAGR
          &mdash; the single steady rate that would have produced the same total growth &mdash;
          and names the gap between them &ldquo;volatility drag.&rdquo;
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Five years of 30%, -20%, 25%, -10%, and 15% returns &mdash; the calculator&rsquo;s own
          defaults &mdash; average out to 8% a year. But the actual cumulative growth over
          those five years is only 34.55%, which works out to a{" "}
          <strong>6.11%</strong> CAGR &mdash; a <strong>1.89-point</strong> volatility drag
          between what the average suggests and what actually happened.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/sip-returns/" className="text-figure hover:underline">
            SIP returns
          </a>{" "}
          and{" "}
          <a href="/mutual-fund-calculator/" className="text-figure hover:underline">
            mutual fund calculator
          </a>{" "}
          both project forward using a single assumed rate — this one instead looks backward at
          an actual series of returns.
        </p>
      </section>
    </div>
  );
}
