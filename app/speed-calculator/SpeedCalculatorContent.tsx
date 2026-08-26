import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is this the same as average speed for a trip that changed pace?",
    a: "Yes, if the distance and time are the total trip figures — but the result is the average over the whole trip, not the speed at any single moment, which may have been faster or slower along the way.",
  },
  {
    q: "Do I need to use consistent units?",
    a: "Yes — the result's units follow directly from your inputs (distance ÷ time), so entering distance in km and time in hours gives speed in km/h, while mixing km with minutes would give a meaningless unit.",
  },
];

export function SpeedCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This solves for speed, distance, or time, given the other two — speed = distance ÷ time.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
