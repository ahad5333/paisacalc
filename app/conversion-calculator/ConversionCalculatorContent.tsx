import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does a mile convert to more than 1.6 kilometres?",
    a: "A mile (1,609.344 metres) is simply longer than a kilometre (1,000 metres) — the exact conversion factor, 1.609344, is fixed by international agreement, not a rounded approximation.",
  },
];

export function ConversionCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts a length between metric units (mm, cm, m, km) and imperial units (in, ft, yd, mi).</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
