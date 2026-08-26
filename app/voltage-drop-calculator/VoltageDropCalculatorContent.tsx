import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does voltage drop matter in practice?",
    a: "Excessive drop means the device at the end of a long wire run receives less voltage than intended — motors run hotter and less efficiently, lights dim, and electronics can misbehave. Most electrical codes recommend keeping drop under 3% for a branch circuit, 5% total.",
  },
  {
    q: "How do I fix a voltage drop that's too high?",
    a: "Use a thicker wire gauge (lower resistance) or shorten the run — both directly reduce the resistance the current has to push through, cutting the voltage lost along the way.",
  },
];

export function VoltageDropCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the voltage lost over a copper wire run, from the wire gauge, one-way
          length, and current draw.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
