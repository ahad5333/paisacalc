import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is this fair, like a real die?",
    a: "Yes — each roll gives every side an equal chance, the same as a well-made physical die, using standard random number generation.",
  },
];

export function DiceRollerContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this does</h2>
        <p className="mt-2">This rolls any number of dice with any number of sides, useful for tabletop games or quick random decisions.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
