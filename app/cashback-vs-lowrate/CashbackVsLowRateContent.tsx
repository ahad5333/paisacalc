import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Isn't the low rate always the better deal?",
    a: "Not necessarily — it depends on how big the cashback is relative to the rate gap. In the calculator's own default (₹10L car, ₹50,000 cashback at 10% vs. a 5% promotional rate), the low rate wins by ₹78,799. But raise the cashback to ₹1,50,000 with the same rates, and taking the cashback becomes the cheaper option — the rebate is now worth more than the rate difference over the loan term.",
  },
  {
    q: "Why does the loan tenure matter to this decision?",
    a: "A longer tenure gives the rate difference more time to compound, so it tends to favour the low rate more; a shorter tenure gives the rate gap less time to matter, so a fixed cashback amount carries relatively more weight. Try the same numbers at a 3-year tenure versus a 7-year one to see the difference.",
  },
  {
    q: "What if the promotional rate is 0%?",
    a: "Set the promotional rate input to 0 — the calculator handles it directly, since 0% financing (paying back exactly what you borrowed, no interest) is a normal input, not a special case here.",
  },
  {
    q: "Does this account for a difference in down payment or trade-in value?",
    a: "No — it assumes whatever you're putting down or trading in is identical either way, so those amounts cancel out of the comparison and don't need to be entered. Only what's actually financed differs between the two options.",
  },
];

export function CashbackVsLowRateContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares two common car-financing offers &mdash; a cash rebate financed at the
          regular rate, versus a promotional low rate on the full price with no rebate &mdash;
          on total cost over the loan.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹10,00,000 car with a ₹50,000 cash rebate financed at 10%, against a 5% promotional
          rate on the full price, over 5 years &mdash; the calculator&rsquo;s own defaults. The
          rebate route costs ₹12,11,073 in total; the low-rate route costs ₹11,32,274 &mdash;
          the low rate wins here by <strong>₹78,799</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/car-loan-emi/" className="text-figure hover:underline">
            Car loan EMI
          </a>{" "}
          to work out either option's EMI schedule on its own.
        </p>
      </section>
    </div>
  );
}
