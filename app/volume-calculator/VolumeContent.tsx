import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does a cone hold exactly a third of the matching cylinder's volume?",
    a: "It's a genuine geometric result — a cone and cylinder sharing the same base radius and height always have volumes in exactly a 1:3 ratio, provable using integral calculus (or, historically, Archimedes' geometric arguments).",
  },
  {
    q: "What units does this use?",
    a: "Whatever unit you enter the dimensions in — the result comes out in that unit cubed (e.g. cm³ if you entered centimetres). Make sure every dimension uses the same unit before calculating.",
  },
];

export function VolumeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the volume of a cube, rectangular box, sphere, cylinder, or cone.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A cube with 3-unit sides has a volume of <strong>27</strong> cubic units.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/surface-area-calculator/" className="text-figure hover:underline">
            Surface area calculator
          </a>{" "}
          for the same shapes.
        </p>
      </section>
    </div>
  );
}
