import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the day counter?",
    a: "The day counter only counts whole calendar days between two dates. This one includes time of day too, so \"2 days and 8 hours\" comes out precisely, rather than rounding to whole days.",
  },
];

export function TimeDurationCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the precise duration between two full dates and times, in days, hours, and minutes.</p>
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
          for whole calendar days only.
        </p>
      </section>
    </div>
  );
}
