import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does capitalization matter?",
    a: "Element symbols are case-sensitive by chemistry convention — Co is cobalt, but CO is carbon monoxide (carbon + oxygen). Typing a formula with the wrong case can silently mean something completely different.",
  },
  {
    q: "How are grouped formulas like Ca(OH)2 handled?",
    a: "The subscript after a closing parenthesis multiplies everything inside it — Ca(OH)2 means one calcium atom plus two full OH groups (2 oxygen, 2 hydrogen), not just two oxygens.",
  },
];

export function MolecularWeightCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the molecular weight of a compound from its chemical formula, including
          parenthesised groups, using standard IUPAC atomic weights.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          H2O has a molecular weight of about <strong>18.02 g/mol</strong> — 2 hydrogen atoms
          (1.008 each) plus 1 oxygen atom (15.999).
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/molarity-calculator/" className="text-figure hover:underline">
            Molarity calculator
          </a>{" "}
          to turn a mass of this compound into moles and concentration.
        </p>
      </section>
    </div>
  );
}
