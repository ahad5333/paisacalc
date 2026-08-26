import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's the difference between molarity and moles?",
    a: "Moles measure a fixed quantity of substance, while molarity measures concentration — how many moles are dissolved per litre of solution. The same 1 mole of solute has a different molarity depending on how much liquid it's dissolved in.",
  },
  {
    q: "Why \"per litre of solution,\" not \"per litre of solvent\"?",
    a: "This is a common mix-up — molarity is defined relative to the total final solution volume (solute plus solvent combined), not just the solvent you started with, since dissolving a solid also adds to the total volume.",
  },
];

export function MolarityCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This solves for molarity, moles of solute, or solution volume, given the other two.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/molecular-weight-calculator/" className="text-figure hover:underline">
            Molecular weight calculator
          </a>{" "}
          to convert a mass of solute into moles first.
        </p>
      </section>
    </div>
  );
}
