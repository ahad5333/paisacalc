import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the SIP returns calculator?",
    a: "SIP returns projects forward: pick a monthly amount, see what it grows to. This works backward: pick a target amount, see what monthly contribution actually gets you there. Same underlying math, opposite direction — this is the SIP formula solved for the contribution instead of the final value.",
  },
  {
    q: "What return rate should I use for a short-term goal?",
    a: "For anything under 2-3 years, a low or 0% rate is the safer assumption — markets can be volatile over short periods, and a goal with a fixed deadline (like a down payment you need by a specific date) usually isn't the place to bank on equity-level returns showing up exactly on schedule.",
  },
  {
    q: "What if I already have some savings toward this goal?",
    a: "This calculator assumes you're starting from zero. If you already have a lump sum saved, the honest way to use this is to first check what that lump sum alone grows to by your deadline (using the FD, RD, or SIP calculator depending on where it's invested), then only enter the shortfall as your goal amount here.",
  },
];

export function SavingsGoalContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the fixed monthly amount you&rsquo;d need to save, starting now, to
          reach a target amount by a chosen date &mdash; assuming that saving grows at a
          return rate you set along the way.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹20,00,000 goal &mdash; a typical down payment target &mdash; at an assumed 10%
          annual return over 5 years, the calculator&rsquo;s own default. That works out to{" "}
          <strong>₹25,614</strong> needed every month. Your own contributions over those 5
          years add up to ₹15,36,840; the remaining ₹4,63,160 comes from the assumed return
          compounding along the way.
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
          to project forward from a monthly amount instead, and{" "}
          <a href="/home-loan-eligibility/" className="text-figure hover:underline">
            home loan eligibility
          </a>{" "}
          if this goal is a home down payment specifically.
        </p>
      </section>
    </div>
  );
}
