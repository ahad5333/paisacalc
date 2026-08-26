import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is the fertile window 6 days, not just the ovulation day itself?",
    a: "Sperm can survive in the reproductive tract for up to about 5 days, so intercourse in the days before ovulation can still result in conception. The egg itself is only viable for roughly 24 hours after release, which is why the window closes the day after predicted ovulation.",
  },
  {
    q: "Why does ovulation move if my cycle length changes, instead of always being 14 days after my period?",
    a: "Ovulation is estimated backward from the next period, not forward from the last one — the luteal phase (ovulation to next period) is consistently about 14 days, while the days leading up to ovulation vary more. A longer cycle almost always means later ovulation, not a longer luteal phase.",
  },
  {
    q: "How accurate is this for irregular cycles?",
    a: "Less accurate — this assumes a consistent average cycle length, so the more your cycles vary month to month, the less reliable a single predicted date becomes. Ovulation predictor kits or basal body temperature tracking give a more precise read for any individual cycle.",
  },
];

export function OvulationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This predicts the ovulation date and fertile window for your upcoming cycle, from the
          first day of your last period and your average cycle length.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A last period starting 1 January 2026 on a 28-day cycle gives a predicted ovulation
          date of <strong>15 January 2026</strong>, with a fertile window of{" "}
          <strong>10&ndash;16 January 2026</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/period-calculator/" className="text-figure hover:underline">
            Period calculator
          </a>{" "}
          to project several cycles ahead, or{" "}
          <a href="/pregnancy-calculator/" className="text-figure hover:underline">
            pregnancy calculator
          </a>{" "}
          once you know your due date.
        </p>
      </section>
    </div>
  );
}
