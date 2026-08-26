import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is mass different from weight?",
    a: "Mass is the amount of matter in an object and stays constant everywhere; weight is the force gravity exerts on that mass, which changes depending on location (see the weight calculator for the distinction in practice).",
  },
];

export function MassCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds mass from density and volume.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/density-calculator/" className="text-figure hover:underline">
            Density calculator
          </a>{" "}
          to solve for density instead, given mass and volume.
        </p>
      </section>
    </div>
  );
}
