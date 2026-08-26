import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does waking up mid-cycle feel worse than waking at the same total sleep time on a cycle boundary?",
    a: "Deep sleep, which happens mid-cycle, is harder to wake from cleanly than the lighter sleep near a cycle's end — being pulled out of deep sleep is what causes that groggy, disoriented feeling even after a normal amount of total sleep.",
  },
  {
    q: "Is 90 minutes exactly how long every sleep cycle lasts?",
    a: "It's a commonly cited average — actual cycle length varies somewhat by individual and even by night for the same person, so treat these times as a solid estimate to aim near, not an exact science.",
  },
];

export function SleepCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds bedtime or wake-up time options based on completing whole 90-minute sleep
          cycles, aiming to avoid waking up mid-cycle during deep sleep.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
