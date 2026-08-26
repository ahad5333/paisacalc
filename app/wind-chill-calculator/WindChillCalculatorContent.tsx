import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does wind make it feel colder than the actual temperature?",
    a: "Your body constantly warms a thin layer of air right against your skin — wind strips that layer away faster than your body can reheat it, speeding up heat loss and making the air feel colder than a thermometer alone would suggest.",
  },
  {
    q: "Why is there a minimum wind speed for this formula?",
    a: "Below about 3 mph, there's essentially no wind-driven heat loss beyond normal still-air conditions, so the formula isn't calibrated for — or meaningful at — very light wind.",
  },
];

export function WindChillCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds how cold it actually feels (wind chill) from air temperature and wind speed, using the US National Weather Service's standard formula.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
