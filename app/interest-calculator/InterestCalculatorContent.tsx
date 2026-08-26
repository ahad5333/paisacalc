import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the FD or RD calculator?",
    a: "FD and RD are specific Indian deposit products with their own fixed conventions — FD compounds quarterly on a lump sum, RD uses the IBA-prescribed formula for monthly instalments. This is the general-purpose version: pick any starting sum, any monthly contribution, and any compounding frequency, for any use case those two products don't cover.",
  },
  {
    q: "Why does compounding frequency matter?",
    a: "More frequent compounding means interest starts earning its own interest sooner, so the same nominal annual rate produces a slightly higher return the more often it compounds — monthly compounding beats quarterly, which beats yearly, all else equal. The gap is usually small but real, especially over longer periods.",
  },
  {
    q: "When is a monthly contribution added relative to compounding?",
    a: "At the start of each month, before that period's compounding gets applied — so a contribution made just before a compounding date earns that period's interest, while the underlying principal has already been growing for the months prior.",
  },
  {
    q: "What if I just want a lump sum with no monthly contribution?",
    a: "Set monthly contribution to 0 — this reduces to a standard compound interest calculation on the starting principal alone.",
  },
];

export function InterestCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This projects the maturity value of a starting sum plus an optional monthly
          contribution, compounding at whatever frequency you choose &mdash; a general-purpose
          tool, not tied to any specific deposit product's own rules.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹1,00,000 starting sum at 7%, with ₹5,000 contributed monthly over 5 years,
          compounding quarterly &mdash; the calculator&rsquo;s own defaults. Total contributions
          come to ₹4,00,000, and the maturity value works out to{" "}
          <strong>₹5,03,224</strong> &mdash; ₹1,03,224 of that is interest earned.
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
          and{" "}
          <a href="/rd-calculator/" className="text-figure hover:underline">
            RD calculator
          </a>{" "}
          for India's actual deposit products with their own specific conventions.
        </p>
      </section>
    </div>
  );
}
