import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's the main limitation of payback period?",
    a: "It ignores the time value of money — a rupee received in year 5 counts exactly the same as a rupee received today — and it says nothing about what happens after the payback point. Two investments with the same payback period can end up with very different total returns; see the IRR calculator for a metric that accounts for both timing and magnitude of every cash flow.",
  },
  {
    q: "Why is payback period still useful despite that?",
    a: "It's a quick, intuitive risk check — how long is your money actually at risk before you've recovered it. A shorter payback period generally means less exposure to things changing (a business shutting down, a market shifting) before you've broken even, which is valuable information even without a discounted analysis.",
  },
  {
    q: "What if my cash inflow isn't the same every year?",
    a: "This calculator assumes a uniform annual inflow. For uneven cash flows, the real payback period is found by tracking cumulative cash received year by year until it crosses the initial cost — the IRR calculator's inputs can help with that kind of series.",
  },
];

export function PaybackPeriodContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out how long a uniform annual cash inflow takes to pay back an initial
          investment cost &mdash; the simplest, most intuitive capital-budgeting check there
          is.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹5,00,000 initial cost against a ₹1,50,000 annual cash inflow &mdash; the
          calculator&rsquo;s own defaults &mdash; pays back in{" "}
          <strong>3 years 4 months</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/irr-calculator/" className="text-figure hover:underline">
            IRR calculator
          </a>{" "}
          for a fuller picture that accounts for the timing and size of every cash flow, not
          just when they break even.
        </p>
      </section>
    </div>
  );
}
