import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the interest calculator?",
    a: "The interest calculator also handles a monthly contribution and lets you pick any compounding frequency. This is the bare single-lump-sum, once-a-year-compounding version, for anyone who just wants the plain FV = PV × (1+r)ⁿ formula without the extra inputs.",
  },
  {
    q: "How is this different from present value?",
    a: "Opposite direction, same formula. Future value projects a sum you have today forward to what it becomes later; present value works backward from a known future amount to what it's worth today.",
  },
  {
    q: "What growth rate should I use?",
    a: "Whatever return you're actually assuming — a bank deposit rate for a conservative estimate, a fund's expected return for an equity projection. This is a projection tool, not a promise; the rate you choose is the assumption doing all the work.",
  },
];

export function FutureValueContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This projects a present lump sum forward to what it grows to at a chosen annual rate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          ₹5,00,000 growing at 10% for 15 years &mdash; the calculator&rsquo;s own defaults
          &mdash; becomes <strong>₹20,88,624</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/present-value/" className="text-figure hover:underline">
            Present value calculator
          </a>{" "}
          for the opposite direction, and{" "}
          <a href="/interest-calculator/" className="text-figure hover:underline">
            interest calculator
          </a>{" "}
          if you also want to add a monthly contribution.
        </p>
      </section>
    </div>
  );
}
