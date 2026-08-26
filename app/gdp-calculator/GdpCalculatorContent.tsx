import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why are imports subtracted rather than ignored?",
    a: "Consumption, investment, and government spending figures all include money spent on imported goods too — subtracting imports removes that foreign-made spending, leaving only the value of domestic production.",
  },
  {
    q: "Is this the only way to calculate GDP?",
    a: "No — the expenditure approach used here is one of three standard methods (the others being the income approach and the production/output approach); all three should, in theory, arrive at the same total.",
  },
];

export function GdpCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This computes Gross Domestic Product via the expenditure approach: consumption plus
          investment plus government spending plus net exports.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
