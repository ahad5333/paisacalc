import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the volume calculator?",
    a: "Volume measures the space inside a shape (cubic units); surface area measures the total area of its outer surface (square units) — useful for things like how much material would wrap or paint the shape, rather than how much it can hold.",
  },
  {
    q: "Why does the cone formula need a \"slant height\"?",
    a: "A cone's curved side isn't vertical, so its surface unrolls into a flat sector whose size depends on the slant distance from the tip to the base edge, not the straight vertical height — this calculator derives that slant height automatically from the radius and height you enter.",
  },
];

export function SurfaceAreaContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the surface area of a cube, rectangular box, sphere, cylinder, or cone.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A cube with 3-unit sides has a surface area of <strong>54</strong> square units — six
          faces, each 9 square units.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/volume-calculator/" className="text-figure hover:underline">
            Volume calculator
          </a>{" "}
          for the same shapes.
        </p>
      </section>
    </div>
  );
}
