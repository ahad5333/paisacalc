import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why can't I convert 0 or a negative number?",
    a: "The Roman numeral system as commonly used has no symbol for zero and no way to represent negative numbers — it was designed for counting positive quantities.",
  },
  {
    q: "Why does IX mean 9 instead of writing VIIII?",
    a: "Subtractive notation — placing a smaller numeral before a larger one means subtract, so IX is X (10) minus I (1). This convention keeps numerals shorter, but only specific pairs (like IV, IX, XL, XC) are considered valid, not every possible placement.",
  },
];

export function RomanNumeralCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts between decimal numbers (1-3999) and Roman numerals, in either direction.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          1994 in Roman numerals is <strong>MCMXCIV</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
