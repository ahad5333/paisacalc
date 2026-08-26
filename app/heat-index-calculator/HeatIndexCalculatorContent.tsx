import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does humidity make heat feel worse?",
    a: "Sweating cools you by evaporating off your skin — high humidity means the surrounding air is already close to saturated with moisture, so sweat evaporates more slowly and your body's main cooling mechanism becomes less effective.",
  },
  {
    q: "How is this different from wind chill?",
    a: "They're opposite-season counterparts measuring the same idea — how a combination of weather factors makes temperature feel different from the thermometer reading. Heat index adds humidity's effect in hot weather; wind chill adds wind's effect in cold weather.",
  },
];

export function HeatIndexCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds how hot it actually feels (heat index) from air temperature and relative humidity, using the US National Weather Service's standard formula.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
