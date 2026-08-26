import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the ovulation calculator?",
    a: "Same underlying math, different direction: the ovulation calculator predicts an upcoming fertile window for someone trying to conceive, while this one explains a conception that's already resulted in a confirmed pregnancy — so it shows a due date instead of a next-period date.",
  },
  {
    q: "Why is there a window instead of one exact date?",
    a: "Conception can happen anywhere sperm survival (up to ~5 days before ovulation) and the egg's short viability (~24 hours after) overlap — the exact day within that window depends on details this calculator doesn't know, like the specific day intercourse occurred.",
  },
  {
    q: "My due date from this calculator doesn't match what my doctor gave me — why?",
    a: "An early ultrasound measures the fetus directly and is generally considered more accurate than LMP-based dating, especially if your cycles are irregular. Trust your doctor's ultrasound-based date over this calculator's estimate.",
  },
];

export function PregnancyConceptionContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          For a pregnancy already confirmed, this works out roughly when conception happened,
          from the first day of your last menstrual period and your average cycle length.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          An LMP of 1 January 2026 on a 28-day cycle gives a most-likely conception date of{" "}
          <strong>15 January 2026</strong>, within a window of{" "}
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
          <a href="/pregnancy-calculator/" className="text-figure hover:underline">
            Pregnancy calculator
          </a>{" "}
          for how far along you are today, or the{" "}
          <a href="/conception-calculator/" className="text-figure hover:underline">
            conception calculator
          </a>{" "}
          to work backward from a due date or birth date instead of LMP.
        </p>
      </section>
    </div>
  );
}
