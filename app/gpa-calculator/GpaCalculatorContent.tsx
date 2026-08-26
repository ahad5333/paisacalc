import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does a course's credit count matter for GPA?",
    a: "A 4-credit course represents more coursework than a 1-credit course, so it's weighted more heavily — this is why GPA is a weighted average (quality points ÷ total credits), not a simple average of grade points across courses.",
  },
  {
    q: "Do all schools use the same grade-point values?",
    a: "Most use a similar 4.0 scale, but the exact points for +/- grades can vary slightly by institution — check your school's official scale if you need an exact match.",
  },
];

export function GpaCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds your weighted GPA on the standard 4.0 scale, from each course's grade and credit hours.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
