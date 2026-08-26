import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why add a waste allowance at all?",
    a: "Cutting tiles to fit around edges, corners, and fixtures wastes material, and some tiles break during handling or installation — 10% is the standard recommendation for a simple layout.",
  },
  {
    q: "When should I use more than 10% waste?",
    a: "For diagonal layouts, herringbone patterns, or rooms with lots of corners and cutouts, 15-20% is more realistic, since diagonal cuts waste more of each tile than straight cuts.",
  },
];

export function TileCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds how many tiles to buy for a room, including a waste allowance for cuts and breakage.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
