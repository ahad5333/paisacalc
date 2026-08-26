import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why two different formulas?",
    a: "DuBois & DuBois (1916) was the original, based on a small study of just 9 people, and became the historical basis for many reference ranges. Mosteller (1987) is a simpler formula that closely approximates DuBois for most adults and is now more commonly used in practice. Clinical convention hasn't fully standardised on one, so both are shown.",
  },
  {
    q: "What is BSA actually used for?",
    a: "Most commonly for calculating chemotherapy drug doses, since many drugs have a narrower therapeutic window than body-weight dosing alone would account for. It's also used for burn surface area assessment and to normalise cardiac output into a cardiac index.",
  },
  {
    q: "Is BSA the same as skin surface area you could measure with a tape?",
    a: "It's an estimate derived from height and weight, not a direct measurement — actual skin surface area varies with body shape and composition in ways these formulas don't capture individually.",
  },
];

export function BodySurfaceAreaContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates body surface area (BSA) from height and weight, using both the
          Mosteller and DuBois formulas &mdash; the two most commonly referenced clinically.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A height of 175cm and weight of 75kg gives a BSA of <strong>1.91 m²</strong> by the
          Mosteller formula, or <strong>1.90 m²</strong> by DuBois &mdash; the two formulas
          typically agree within a few hundredths of a square metre.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
