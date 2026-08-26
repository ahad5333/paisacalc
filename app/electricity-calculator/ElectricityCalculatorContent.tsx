import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Where do I find an appliance's wattage?",
    a: "It's usually printed on a label on the appliance itself, in the manual, or on the manufacturer's spec sheet — look for a number in watts (W) or kilowatts (kW; 1 kW = 1000 W).",
  },
  {
    q: "Where do I find my cost per kWh?",
    a: "It's on your electricity bill, usually labeled as the per-unit or per-kWh rate — rates often vary by usage slab or time of day, so this calculator uses a single flat rate as an estimate.",
  },
];

export function ElectricityCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates the running cost of an appliance, from its power rating, how many
          hours a day it runs, and your electricity rate.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 1000W appliance running 5 hours a day at ₹8/kWh costs about{" "}
          <strong>₹40/day</strong>, or <strong>₹1,200/month</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
