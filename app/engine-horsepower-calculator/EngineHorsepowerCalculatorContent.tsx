import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the horsepower calculator?",
    a: "That one computes horsepower directly from a torque and RPM spec — useful if you already know those numbers. This one estimates horsepower from real-world quarter-mile performance, useful when you don't have dyno figures but do have a timed run.",
  },
  {
    q: "Why does weight matter for this estimate?",
    a: "A heavier car needs more power to reach the same trap speed — the formula effectively backs out how much power was needed to accelerate that specific weight to that specific speed over a quarter mile.",
  },
];

export function EngineHorsepowerCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates horsepower from vehicle weight and quarter-mile trap speed, using the
          widely used drag-racing trap-speed method.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/horsepower-calculator/" className="text-figure hover:underline">
            Horsepower calculator
          </a>{" "}
          to compute horsepower directly from a torque and RPM spec.
        </p>
      </section>
    </div>
  );
}
