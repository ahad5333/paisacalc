import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does the mileage rate actually cover?",
    a: "It's meant to be an all-in figure covering fuel, maintenance, depreciation, and insurance combined — not just fuel cost — which is why it's usually well above the pure fuel cost per mile.",
  },
  {
    q: "Where do I find the correct rate to use?",
    a: "Check your employer's expense policy, or your tax authority's officially published standard mileage rate if you're claiming a deduction — rates are typically updated annually and vary by country.",
  },
];

export function MileageCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the travel reimbursement owed for business miles driven, at a given rate per mile.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
