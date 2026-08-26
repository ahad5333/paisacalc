import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How far ahead can I trust these predictions?",
    a: "Less far than the table suggests — this assumes every future cycle matches your average length exactly, and that error compounds with each projected cycle. The first predicted period is usually the most reliable; the sixth is more of a rough guide than a forecast.",
  },
  {
    q: "Why does the predicted ovulation date shift for each cycle?",
    a: "It's recalculated per cycle as 14 days before that cycle's following period — the same fixed-luteal-phase logic the ovulation calculator uses, just applied to each projected future cycle in turn.",
  },
  {
    q: "What should I do if my actual periods don't match these predictions?",
    a: "Occasional variation is normal — stress, travel, illness, and many other factors shift individual cycles. If your actual cycle length consistently differs from what you entered, update the average cycle length input, or track a few cycles to get a more accurate personal average.",
  },
];

export function PeriodContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This projects your next several period dates forward from the first day of your last
          period, at your average cycle length, along with each cycle&rsquo;s predicted ovulation
          date.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A last period starting 1 January 2026 on a 28-day cycle, 5-day period, gives a next
          predicted period of <strong>29 January 2026</strong>, with each following cycle 28 days
          after the last.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/ovulation-calculator/" className="text-figure hover:underline">
            Ovulation calculator
          </a>{" "}
          for a closer look at just the upcoming fertile window.
        </p>
      </section>
    </div>
  );
}
