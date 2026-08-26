import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Which of the three questions do I need?",
    a: "\"X% of Y\" finds a portion of a whole (e.g. a 20% discount on ₹500). \"X is what % of Y\" compares two numbers as a percentage. \"X is Y% of what\" works backward from a portion to find the whole.",
  },
  {
    q: "Can a percentage be over 100%?",
    a: "Yes — that just means X is larger than Y. For example, 150 is 150% of 100.",
  },
];

export function PercentageContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This handles the three most common percentage questions in one tool.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          25% of 200 = <strong>50</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
