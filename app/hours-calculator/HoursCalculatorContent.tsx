import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What are \"decimal hours\" for?",
    a: "Payroll systems typically want hours as a decimal (8.5) rather than hours and minutes (8h 30m) — this is the same duration, just expressed the way most timesheet software expects it.",
  },
  {
    q: "What happens if my end time is earlier than my start time?",
    a: "It's treated as an overnight shift crossing midnight — for example 22:00 to 06:00 is read as 8 hours, not a negative duration.",
  },
];

export function HoursCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the total hours worked between a start and end time, minus any unpaid break.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          9:00 to 17:30, minus a 30-minute break, is <strong>8h 0m</strong> worked.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/time-card-calculator/" className="text-figure hover:underline">
            Time card calculator
          </a>{" "}
          to total a full week instead of a single shift.
        </p>
      </section>
    </div>
  );
}
