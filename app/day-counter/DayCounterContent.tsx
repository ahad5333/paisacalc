import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the date calculator?",
    a: "This finds the difference between two dates you already know (\"how many days between these two dates\"). The date calculator instead adds or subtracts a duration from one date to find a resulting date (\"what date is 6 weeks from today\").",
  },
  {
    q: "Does the count include both the start and end date?",
    a: "It counts the number of days that pass between the two dates, not the number of calendar dates touched — 1 Jan to 2 Jan is 1 day, not 2.",
  },
];

export function DayCounterContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the number of days between two dates, split into weekdays and weekend days.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/date-calculator/" className="text-figure hover:underline">
            Date calculator
          </a>{" "}
          to add or subtract time from a date instead.
        </p>
      </section>
    </div>
  );
}
