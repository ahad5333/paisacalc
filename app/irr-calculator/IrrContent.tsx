import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is IRR different from CAGR?",
    a: "CAGR needs a single starting value and a single ending value, assuming steady growth in between. IRR handles any shaped series of cash flows in and out — uneven rental income, a lump-sum exit, an investment that pays back in irregular chunks — and finds the one rate that makes them all balance out to zero net present value.",
  },
  {
    q: "Why solve this numerically instead of with a formula?",
    a: "Because there's no algebraic formula for \"the rate\" once you have more than two cash flows at different times — it has to be found by trial, checking rates until the net present value of every flow lands at zero. This calculator does that automatically via binary search rather than requiring manual trial and error.",
  },
  {
    q: "What does the calculator's own example represent?",
    a: "A ₹5,00,000 initial investment returning ₹1,00,000, ₹1,20,000, ₹1,40,000, ₹1,60,000, and ₹3,00,000 over five years (that last, larger figure often standing in for an exit or resale value) works out to a 15.73% IRR — the single steady rate that would have produced the exact same total return pattern.",
  },
  {
    q: "What's the reinvestment assumption everyone mentions with IRR?",
    a: "IRR implicitly assumes every cash inflow gets reinvested at the IRR itself for the rest of the period, which can overstate the real-world return if there's nowhere to actually reinvest at that rate. This is a known, widely-discussed limitation of IRR as a metric, not a flaw specific to this calculator.",
  },
];

export function IrrContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This solves for the internal rate of return (IRR) across an initial investment and
          five years of cash flows that don't have to be even &mdash; the rate that makes the
          net present value of every flow, in and out, equal exactly zero.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹5,00,000 investment returning ₹1,00,000, ₹1,20,000, ₹1,40,000, ₹1,60,000, and
          ₹3,00,000 across five years &mdash; the calculator&rsquo;s own defaults &mdash; totals
          ₹8,20,000 back, a ₹3,20,000 net gain, working out to a{" "}
          <strong>15.73%</strong> IRR.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/average-return/" className="text-figure hover:underline">
            Average return
          </a>{" "}
          for the CAGR-vs-average comparison on a simpler even series, and{" "}
          <a href="/rental-yield/" className="text-figure hover:underline">
            rental yield
          </a>{" "}
          for a year-by-year income view of a property investment specifically.
        </p>
      </section>
    </div>
  );
}
