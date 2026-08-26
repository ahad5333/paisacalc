import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is dew point considered a better \"muggy\" indicator than relative humidity?",
    a: "Relative humidity is relative to the current temperature, so the same relative humidity feels very different at different temperatures. Dew point is an absolute measure of moisture in the air, so a dew point above about 65°F (18°C) reliably feels muggy regardless of the air temperature.",
  },
  {
    q: "Why can dew point never exceed the air temperature?",
    a: "Dew point is the temperature air would need to cool to in order to become fully saturated (100% humidity) — since the current air is already below saturation at its actual temperature, cooling to reach saturation can only ever require cooling down, never up.",
  },
];

export function DewPointCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the dew point — the temperature air would need to cool to for dew (condensation) to form — from air temperature and relative humidity.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
