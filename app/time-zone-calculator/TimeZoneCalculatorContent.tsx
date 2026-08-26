import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Does this account for daylight saving time?",
    a: "No — it uses a fixed UTC offset you enter, which is accurate most of the year for most zones but won't automatically adjust during the weeks a given region shifts its clocks for daylight saving. Check the current offset for your specific dates if it matters.",
  },
  {
    q: "Where do I find a location's UTC offset?",
    a: "It's commonly written as \"UTC+5:30\" or \"GMT+5:30\" style notation — e.g. India Standard Time is UTC+5:30, and Eastern Time in the US is UTC-5 (or UTC-4 during daylight saving).",
  },
];

export function TimeZoneCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts a time from one UTC offset to another, including which day it falls on.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          14:30 in India (UTC+5:30) is <strong>09:00</strong> the same day in UTC+0.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
