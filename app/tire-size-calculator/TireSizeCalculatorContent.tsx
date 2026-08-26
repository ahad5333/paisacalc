import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How do I read a tire size like 225/45R17?",
    a: "225 is the tread width in millimetres, 45 is the aspect ratio (sidewall height as a percentage of that width), R means radial construction, and 17 is the rim diameter in inches — every tire's sidewall is printed with this same format.",
  },
  {
    q: "Why does changing tire size affect my speedometer?",
    a: "A speedometer is calibrated for a specific tire circumference — fitting a tire with a different overall diameter changes how far the car actually travels per wheel revolution, so the same wheel speed reading no longer means the same true road speed.",
  },
];

export function TireSizeCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds a tire's sidewall height, overall diameter, circumference, and revolutions per mile from its size notation.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
