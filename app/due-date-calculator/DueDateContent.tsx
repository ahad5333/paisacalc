import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Which method should I use — last period or conception date?",
    a: "Use last period (LMP) if you're not certain of the exact conception date, which is most people — it's the standard clinical method. Use conception date only if you know it precisely, for example from IVF, ovulation tracking, or a single-cycle conception. Both converge on the same due date when the underlying dates agree.",
  },
  {
    q: "How is \"full term\" different from the due date?",
    a: "The due date (40 weeks) is a single estimated point; \"full term\" is a range, starting at 39 weeks, during which a baby born is considered to have reached full development. Babies born from 37 weeks are no longer considered preterm, but 39-40 weeks is when the lowest complication rates are seen.",
  },
  {
    q: "What does \"viability\" at 24 weeks mean?",
    a: "It's the gestational age from which a baby born prematurely has a meaningful chance of survival with intensive neonatal care, based on outcomes data — not a guarantee, and outcomes still improve significantly with each additional week beyond that point.",
  },
];

export function DueDateContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates a due date from either the first day of your last period or a known
          conception date, along with the viability and full-term milestone dates obstetric
          guidance is built around.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A conception date of 15 January 2026 gives an estimated due date of{" "}
          <strong>8 October 2026</strong> &mdash; 266 days later &mdash; the same date an LMP of
          1 January 2026 on a 28-day cycle would produce.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/pregnancy-calculator/" className="text-figure hover:underline">
            Pregnancy calculator
          </a>{" "}
          for how far along you are today, or{" "}
          <a href="/pregnancy-conception/" className="text-figure hover:underline">
            pregnancy conception calculator
          </a>{" "}
          to work out roughly when conception happened.
        </p>
      </section>
    </div>
  );
}
