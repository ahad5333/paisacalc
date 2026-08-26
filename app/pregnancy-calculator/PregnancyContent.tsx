import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is pregnancy dated from my last period, not from conception?",
    a: "Because the last menstrual period (LMP) is a date most people know precisely, while the actual date of conception usually isn't — ovulation happens roughly two weeks after LMP, but that can vary. Clinicians standardised on LMP-based dating for consistency, even though it means \"40 weeks pregnant\" is really about 38 weeks from conception.",
  },
  {
    q: "How reliable is the estimated due date?",
    a: "It's an estimate, not a prediction — only about 5% of babies are actually born on their estimated due date, and a range of a week or two either side is entirely normal. An early ultrasound (typically 8-13 weeks) usually refines this estimate further, since it measures the fetus directly rather than relying on cycle dates.",
  },
  {
    q: "What if my cycle isn't a regular 28 days?",
    a: "This calculator adjusts the due date for your actual average cycle length, since a longer cycle means ovulation (and conception) happens later, shifting the whole pregnancy back. If your cycles are irregular enough that you don't have a reliable average, an early ultrasound will be more accurate than any LMP-based estimate.",
  },
];

export function PregnancyContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out how far along a pregnancy is and its estimated due date, from the first
          day of the last menstrual period (LMP) &mdash; the standard clinical dating method,
          adjusted here for average cycle length.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          An LMP of 1 January 2026 with a 28-day cycle gives an estimated due date of{" "}
          <strong>8 October 2026</strong> &mdash; 280 days later &mdash; and an estimated
          conception date of <strong>15 January 2026</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/due-date-calculator/" className="text-figure hover:underline">
            Due date calculator
          </a>{" "}
          to estimate the due date from a known conception date instead of LMP, or{" "}
          <a href="/pregnancy-weight-gain/" className="text-figure hover:underline">
            pregnancy weight gain calculator
          </a>{" "}
          for the recommended weight gain range at your current stage.
        </p>
      </section>
    </div>
  );
}
