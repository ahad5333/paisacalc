import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Where does simple interest actually show up in India?",
    a: "Non-cumulative fixed deposits (where interest is paid out periodically rather than reinvested) are calculated this way, as are most loan penalty and late-payment charges, and some short-term or informal lending arrangements. Almost every mainstream savings and loan product, by contrast, compounds.",
  },
  {
    q: "Why is simple interest lower than compound interest at the same rate?",
    a: "Because compound interest earns interest on interest already credited, while simple interest only ever earns on the original principal. Over short periods the difference is small; over many years it grows substantially — see the interest calculator for the compounding version at the same inputs.",
  },
  {
    q: "Is this the same formula used for loan processing fees or penalties?",
    a: "The underlying math is the same I = P × R × T, though a specific lender's penalty clause may define the principal, rate, or time period differently (e.g. only the overdue amount, only the days actually late) — check the specific terms rather than assuming this maps exactly.",
  },
];

export function SimpleInterestContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out simple interest &mdash; interest on the original principal alone, for
          the entire period, with no compounding along the way.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          ₹2,00,000 at 8% for 3 years &mdash; the calculator&rsquo;s own defaults &mdash; earns{" "}
          <strong>₹48,000</strong> in interest, for a maturity value of ₹2,48,000. Compare that
          to the same numbers compounding quarterly on the interest calculator, and the
          compounded version comes out noticeably higher.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/interest-calculator/" className="text-figure hover:underline">
            Interest calculator
          </a>{" "}
          for the compounding version of the same starting numbers.
        </p>
      </section>
    </div>
  );
}
