import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How much of my NPS corpus can I withdraw as a lump sum?",
    a: "Under the PFRDA rules that took effect in December 2025, it depends on your corpus size: up to ₹8 lakh, you can take the entire thing as a lump sum; between ₹8–12 lakh, up to ₹6 lakh as lump sum with the rest going to an annuity; above ₹12 lakh, up to 80% as lump sum with a minimum 20% used to purchase an annuity. This replaced the older flat 60% lump sum / 40% annuity split for most subscribers — government employees still work under the older 40% floor.",
  },
  {
    q: "Is the NPS lump sum withdrawal taxable?",
    a: "Only 60% of the corpus is tax-exempt under Section 10(12A), even though the new rules allow withdrawing up to 80% as a lump sum in some cases — the portion between 60% and 80% may be taxable at your slab rate. The tax exemption threshold hasn't been updated to match the new withdrawal flexibility.",
  },
  {
    q: "What return should I actually assume for NPS?",
    a: "It depends entirely on which funds and asset allocation you've chosen within NPS — equity-heavy allocations have historically returned more than debt-heavy ones over long periods, but nothing is guaranteed, unlike PPF's fixed government rate. Run this calculator at a few different assumed rates rather than trusting one number.",
  },
  {
    q: "What happens to the annuity portion of my corpus?",
    a: "It's used to purchase an annuity plan from an insurer empanelled with the NPS system, which then pays you a monthly pension for life. The actual pension amount depends on the annuity rate the insurer offers at the time you retire, not a fixed government formula — this calculator shows how much corpus goes toward the annuity, not the resulting monthly pension, since that rate isn't knowable years in advance.",
  },
  {
    q: "Can I exit NPS before retirement?",
    a: "Yes, but the rules are stricter — a minimum 15-year participation period generally applies for a normal exit, and premature exit before that comes with its own, more restrictive lump sum and annuity requirements. This calculator models the normal retirement exit, not an early one.",
  },
];

export function NpsContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool projects what your National Pension System account is worth at
          retirement, from a monthly contribution growing at an assumed market-linked
          return &mdash; then shows how that corpus splits between what you can withdraw as a
          lump sum and what must go toward an annuity, under the exit rules that took
          effect in December 2025.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          The accumulation phase is identical to a monthly SIP: a fixed contribution every
          month, compounding at your assumed annual return, contribution landing at the
          start of each month. At the projected retirement corpus, the current PFRDA exit
          rule then decides the split &mdash; 100% lump sum below ₹8 lakh, a ₹6 lakh cap with
          the rest to annuity between ₹8&ndash;12 lakh, and an 80/20 lump-sum-to-annuity split
          above ₹12 lakh.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take ₹5,000 contributed every month at an assumed 10% annual return for 25 years
          &mdash; the calculator&rsquo;s own default. That grows to a corpus of roughly{" "}
          <strong>₹66.9 lakh</strong> against ₹15 lakh actually contributed. Since that
          corpus is well above ₹12 lakh, the current exit rule caps the lump sum at 80% (
          <strong>~₹53.5 lakh</strong>), with the remaining 20% (<strong>~₹13.4 lakh</strong>)
          going toward an annuity purchase.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Monthly contribution</strong> and <strong>years to retirement</strong>{" "}
          both scale the corpus, but time matters more than most people expect &mdash; the
          same total money contributed over a longer horizon compounds to noticeably more
          than the same amount crammed into fewer years. <strong>Expected return</strong> is
          the biggest unknown here, since NPS returns are market-linked rather than fixed;
          try the calculator at a lower, more conservative rate as well as your hoped-for
          one.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/ppf-calculator/" className="text-figure hover:underline">
            PPF calculator
          </a>{" "}
          to compare against a fixed, government-guaranteed rate instead of a market-linked
          one, and{" "}
          <a href="/sip-returns/" className="text-figure hover:underline">
            SIP returns
          </a>{" "}
          for the same accumulation math outside a retirement account.
        </p>
      </section>
    </div>
  );
}
