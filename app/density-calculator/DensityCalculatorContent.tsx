import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does water have a density of exactly 1 g/cm³?",
    a: "It's actually how the gram was originally defined — 1 cubic centimetre of water at 4°C was set to weigh exactly 1 gram, so water's density of 1 g/cm³ is a historical reference point other materials are compared against.",
  },
  {
    q: "How does density explain why some things float?",
    a: "An object floats in a fluid if its density is lower than the fluid's — that's why wood (about 0.5-0.9 g/cm³) floats on water, but a steel ball (about 7.8 g/cm³) sinks, even though a large enough steel-hulled ship still floats because of its overall shape.",
  },
];

export function DensityCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds density from mass and volume.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/mass-calculator/" className="text-figure hover:underline">
            Mass calculator
          </a>{" "}
          to solve for mass instead, given density and volume.
        </p>
      </section>
    </div>
  );
}
