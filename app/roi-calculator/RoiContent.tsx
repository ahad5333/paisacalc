import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why show both total and annualised ROI?",
    a: "Total ROI alone can't be compared fairly across investments held for different lengths of time — a 75% return over 4 years and a 75% return over 10 years are very different outcomes. Annualised ROI (the CAGR equivalent) puts every investment on the same yearly footing, however long it was actually held.",
  },
  {
    q: "What isn't included in this calculation?",
    a: "Any cash flows in between the starting and ending value — dividends received, fees paid, additional money added. This is the simplest possible version, taking only a start and end point; for cash flows along the way, see the IRR calculator instead.",
  },
  {
    q: "How is this different from the average return calculator?",
    a: "Average return works from a series of individual yearly returns you already know. This works from just two numbers — where you started and where you ended up — and figures out the annualised rate that connects them.",
  },
];

export function RoiContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out total return on investment and its annualised equivalent, from a
          starting sum, an ending value, and how long it took to get there.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          ₹2,00,000 growing to ₹3,50,000 over 4 years &mdash; the calculator&rsquo;s own
          defaults &mdash; is a <strong>75%</strong> total return, working out to a{" "}
          <strong>15.02%</strong> annualised return.
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
          if there were cash flows along the way, not just a start and end value.
        </p>
      </section>
    </div>
  );
}
