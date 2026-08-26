import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Does this work for dates far in the past or future?",
    a: "Yes — it works for any date the underlying calendar supports, using the proleptic Gregorian calendar (today's calendar rules applied backward), which is the standard way computers handle historical dates before the Gregorian calendar's actual 1582 adoption.",
  },
];

export function DayOfWeekCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds what day of the week any date falls on.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
