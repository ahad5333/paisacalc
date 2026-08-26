import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is this the same math as an EMI calculator?",
    a: "Because both are the same problem from opposite sides: an EMI reduces a loan balance to zero over a fixed period at a fixed payment, and this reduces a lump sum to zero over a fixed period at a fixed payout — the balance earns a return along the way instead of accruing interest owed, but the reducing-balance arithmetic is identical.",
  },
  {
    q: "Does the payout keep up with inflation?",
    a: "No — this models a level, fixed monthly payout for the whole period, the same way an EMI stays fixed. A payout that needs to grow with inflation each year would need a different, more complex model.",
  },
  {
    q: "Is this the same as a lifetime annuity from an insurer?",
    a: "Not quite — a true lifetime annuity pays out for as long as you live, priced using mortality tables the insurer maintains, so it can outlast (or fall short of) a fixed period depending on how long you actually live. This calculator instead answers a more concrete question: what payout empties this lump sum over a period you choose.",
  },
  {
    q: "How does this connect to NPS?",
    a: "NPS requires a portion of your corpus (currently 20% for most subscribers, down from the historical 40% mandatory minimum) to buy an annuity at exit. This calculator can approximate what monthly payout that annuity portion might sustain over a chosen period, at an assumed return.",
  },
];

export function AnnuityPayoutContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the fixed monthly payout a lump sum can sustain over a chosen period,
          assuming the remaining balance keeps earning a return &mdash; the reverse of an EMI
          calculation.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹20,00,000 lump sum earning 6% during payout, spread over 20 years &mdash; the
          calculator&rsquo;s own defaults &mdash; sustains a{" "}
          <strong>₹14,329</strong> monthly payout, totalling ₹34,38,960 paid out over the
          period, of which ₹14,38,960 is interest earned along the way.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/nps-calculator/" className="text-figure hover:underline">
            NPS calculator
          </a>{" "}
          for the corpus and mandatory annuity split this payout might come from.
        </p>
      </section>
    </div>
  );
}
