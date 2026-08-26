import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why work backward from a birth date at all — isn't the due date already the answer?",
    a: "A due date is itself already an estimate built on an assumed 266-day gestation, so working back from it just reverses the same assumption used to create it. Working back from the actual birth date is different: it tells you when conception likely happened for the pregnancy that actually occurred, which may have run longer or shorter than the original estimate.",
  },
  {
    q: "How does this differ from the pregnancy conception calculator?",
    a: "That one works forward from a known last menstrual period for a pregnancy already in progress. This one works backward from an end point — a due date or an actual birth date — which is useful once a pregnancy is already over, or when LMP isn't known.",
  },
  {
    q: "Is this precise enough to answer a specific legal or paternity question?",
    a: "No — this gives a general estimate based on average gestation length, not a precise determination. Full-term deliveries normally range from 37 to 42 weeks, and actual conception timing for any individual pregnancy can fall outside the window shown here.",
  },
];

export function ConceptionContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works backward from a due date or an actual birth date to estimate when conception
          likely happened, using the average 266-day gestation length.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A birth date of 8 October 2026 gives an estimated conception date of{" "}
          <strong>15 January 2026</strong>, within a likely window of{" "}
          <strong>12&ndash;18 January 2026</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/pregnancy-conception/" className="text-figure hover:underline">
            Pregnancy conception calculator
          </a>{" "}
          to work forward from a known last menstrual period instead.
        </p>
      </section>
    </div>
  );
}
