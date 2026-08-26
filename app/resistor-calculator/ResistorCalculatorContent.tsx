import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does a resistor use colors instead of printing the number directly?",
    a: "Colored bands stay readable from any angle and don't rub off or fade the way printed text can, and the convention predates cheap, precise printing on tiny components — it's stuck around because it still works well.",
  },
  {
    q: "What's the difference between a 4-band and 5-band resistor?",
    a: "A 5-band resistor adds a third significant-digit band for higher precision (typically ±1% or better), while 4-band resistors are the more common general-purpose type with ±5% or ±10% tolerance.",
  },
];

export function ResistorCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This decodes a standard 4-band resistor color code into its resistance value and tolerance.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Brown-Black-Red-Gold reads as <strong>1 kΩ ± 5%</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
