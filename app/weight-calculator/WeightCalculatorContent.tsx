import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Isn't \"weight\" just what I see on the bathroom scale, in kg?",
    a: "In everyday language, yes — a bathroom scale reading in kg is really measuring mass. In physics, weight specifically means the force of gravity on that mass (measured in newtons), which is why the same person's weight changes on the Moon even though their mass doesn't.",
  },
  {
    q: "Why is weight on Jupiter more than double Earth's, despite Jupiter's low average density?",
    a: "Gravitational pull depends on both mass and radius — Jupiter is so much more massive than Earth that its surface gravity ends up stronger, even though its huge size (and correspondingly larger radius) works in the opposite direction.",
  },
];

export function WeightCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds weight — the physics definition, the force of gravity acting on a mass — on
          Earth and a few other worlds.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
