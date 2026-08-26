import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Should I tip before or after tax?",
    a: "Conventions vary by country and even by preference — some tip on the pre-tax subtotal, others on the total including tax. Enter whichever amount you intend to tip on as the bill amount.",
  },
  {
    q: "What's a reasonable tip percentage?",
    a: "It varies widely by country and service context — there's no universal answer, so this calculator just does the arithmetic once you've decided on a percentage that fits your situation.",
  },
];

export function TipCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the tip amount, total bill, and per-person split when sharing a bill.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
