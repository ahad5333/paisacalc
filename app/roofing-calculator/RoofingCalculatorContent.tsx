import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is roof area bigger than the building's footprint?",
    a: "A pitched roof is a slanted surface, so its actual area is always larger than the flat footprint below it — the steeper the pitch, the bigger the difference.",
  },
  {
    q: "What's a \"roofing square\"?",
    a: "It's the standard unit roofers use to price and order material — one square equals 100 square feet of roof surface, regardless of the roof's shape or pitch.",
  },
  {
    q: "Should I order exactly the calculated number of bundles?",
    a: "Order extra — this doesn't account for hips, valleys, ridge caps, or cutting waste around vents and chimneys, all of which use additional shingles beyond the flat coverage math.",
  },
];

export function RoofingCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the actual roof surface area (accounting for pitch) from the building
          footprint, plus roofing squares and shingle bundles needed.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
