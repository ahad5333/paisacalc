import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why doesn't total days lived divided by 365 give the same years figure?",
    a: "Because years aren't a fixed 365 days — leap years add an extra day roughly every 4 years, so a simple division drifts further off the longer the span. This calculator walks actual calendar years, months, and days instead, matching how a birthday really works.",
  },
  {
    q: "Can I use this to calculate age as of a past or future date, not just today?",
    a: "Yes — the \"as of\" date defaults to today but can be set to any date, useful for figuring out how old someone was on a specific past date, or will be on a future one.",
  },
];

export function AgeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds exact age in years, months, and days between a birth date and any
          reference date, plus the countdown to the next birthday.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
