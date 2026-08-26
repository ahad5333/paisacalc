import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How do I mark a day off?",
    a: "Set clock-in and clock-out to the same time (e.g. both 0:00) — that day contributes zero hours to the weekly total.",
  },
  {
    q: "Does the overtime threshold match labor law automatically?",
    a: "No — overtime rules vary by country, state, and employment type, so the threshold defaults to a common 40 hours/week but should be adjusted to match whatever rule actually applies to you.",
  },
];

export function TimeCardCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This totals hours worked across a full week from daily clock-in/out times and breaks,
          split into regular and overtime hours.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/hours-calculator/" className="text-figure hover:underline">
            Hours calculator
          </a>{" "}
          for a single shift instead of a full week.
        </p>
      </section>
    </div>
  );
}
