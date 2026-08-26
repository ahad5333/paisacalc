import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the hours calculator?",
    a: "This adds or subtracts two durations you already have (like combining two stopwatch splits). The hours calculator instead works out elapsed time between a start and end clock time, like a work shift.",
  },
  {
    q: "What does a negative result mean?",
    a: "It means the amount you subtracted was larger than the amount you started with — the result shows how much further past zero that leaves you.",
  },
];

export function TimeCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This adds or subtracts two clock-time durations (hours, minutes, seconds).</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          2:30:00 + 1:45:00 = <strong>4:15:00</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
