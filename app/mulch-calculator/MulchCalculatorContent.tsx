import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How deep should mulch be?",
    a: "2-3 inches is the typical recommendation for most garden beds — deeper can suffocate roots and hold too much moisture against the plant stems, while shallower doesn't suppress weeds or retain moisture as effectively.",
  },
  {
    q: "Bagged or bulk mulch — which is cheaper?",
    a: "Bulk (delivered by the cubic yard) is almost always cheaper per unit volume for larger areas, while bagged mulch is more convenient for small beds or when you don't need a full truckload.",
  },
];

export function MulchCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds how much mulch to buy for a garden bed, from its area and desired depth.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
