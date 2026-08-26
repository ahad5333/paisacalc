import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What happens if adding a month lands on a day that doesn't exist?",
    a: "It clamps to the last valid day of that month — 31 January plus 1 month gives 28 February (or 29 in a leap year), not an overflow into March.",
  },
  {
    q: "How is this different from the day counter?",
    a: "This adds or subtracts a duration to get a resulting date (\"what date is 6 weeks from today\"). The day counter instead finds the number of days between two dates you already know (\"how many days between these two dates\").",
  },
];

export function DateCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This adds or subtracts years, months, weeks, and days from a start date, calendar-aware.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/day-counter/" className="text-figure hover:underline">
            Day counter
          </a>{" "}
          for the difference between two known dates.
        </p>
      </section>
    </div>
  );
}
