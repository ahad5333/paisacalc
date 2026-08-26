import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's the difference between rounding \"up\" and \"nearest\"?",
    a: "\"Nearest\" rounds to whichever value is closer, which can go either direction. \"Up\" always rounds away from zero (2.1 becomes 3, and -2.1 becomes -3), regardless of which is closer.",
  },
  {
    q: "How do negative decimal places work?",
    a: "A decimal-places value of -2 rounds to the nearest hundred instead of to a fraction — useful for rounding large numbers like 1,234 to 1,200.",
  },
];

export function RoundingContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This rounds any number to a chosen number of decimal places, nearest, up, or down.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          2.567 rounded to 2 decimal places, nearest, is <strong>2.57</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
