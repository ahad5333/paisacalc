import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why might this differ from the manufacturer's rated fuel economy?",
    a: "Rated figures come from standardised lab tests, while real-world driving includes traffic, hills, weather, cargo weight, and driving style — all of which typically push actual mileage below the rated figure.",
  },
  {
    q: "How can I get a more accurate reading?",
    a: "Fill the tank completely at both ends of the measurement period and reset your trip odometer at the first fill-up — measuring across several tanks and averaging smooths out short-term variation from a single unusual trip.",
  },
];

export function GasMileageCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This measures your car's actual fuel efficiency from a real trip's distance and fuel used.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/fuel-cost-calculator/" className="text-figure hover:underline">
            Fuel cost calculator
          </a>{" "}
          to project the cost of a future trip using this efficiency figure.
        </p>
      </section>
    </div>
  );
}
