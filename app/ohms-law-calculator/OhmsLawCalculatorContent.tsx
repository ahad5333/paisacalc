import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Does Ohm's law apply to every electrical component?",
    a: "It applies directly to simple resistive components under DC (or AC at a single frequency, treating resistance as impedance). Components like capacitors and inductors behave differently under AC, where impedance depends on frequency too.",
  },
];

export function OhmsLawCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This solves for voltage, current, or resistance given the other two, using Ohm's law (V = I × R).</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
