import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Where do I find my car's actual fuel efficiency?",
    a: "The most accurate figure comes from your own driving — fill the tank, note the odometer, drive normally until the next fill-up, then divide distance driven by fuel added. Manufacturer-rated figures are usually optimistic compared to real-world driving.",
  },
  {
    q: "How is this different from the gas mileage calculator?",
    a: "This projects a cost forward from an assumed efficiency figure. The gas mileage calculator does the reverse — measuring your actual efficiency from a real trip's distance and fuel used.",
  },
];

export function FuelCostCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the total fuel cost for a trip, from distance, fuel efficiency, and fuel price.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/gas-mileage-calculator/" className="text-figure hover:underline">
            Gas mileage calculator
          </a>{" "}
          to measure your actual efficiency instead.
        </p>
      </section>
    </div>
  );
}
