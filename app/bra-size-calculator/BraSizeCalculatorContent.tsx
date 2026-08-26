import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How should I take these measurements?",
    a: "Measure underbust snugly around the ribcage, directly under the bust, and bust around the fullest point — both without a bra on, with the tape parallel to the floor, for the most accurate starting estimate.",
  },
  {
    q: "Why doesn't this size match what actually fits me?",
    a: "This method is a widely used starting point, but real fit varies significantly by brand, style, and body shape — cup and band proportions aren't perfectly standardized across manufacturers, so trying on a few nearby sizes is still the most reliable approach.",
  },
];

export function BraSizeCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This estimates bra size from underbust and bust measurements, using a widely cited sizing method.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
