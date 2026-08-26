import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why 30%, and why 40% combined?",
    a: "Neither is a regulated number — they're widely cited budgeting conventions, not a rule any landlord or lender enforces. 30% of income on rent alone is a common comfort threshold; 40% combined for rent plus every existing EMI is a common ceiling before a budget gets genuinely tight. Treat both as a sanity check, not a hard cap — a tighter budget elsewhere might make a higher ratio manageable, and vice versa.",
  },
  {
    q: "Why does existing debt lower my rent budget by more than the debt itself?",
    a: "It doesn't lower it rupee-for-rupee by coincidence — it's because the 40% combined cap is fixed regardless of how it's split. Every rupee going to an EMI is a rupee that no longer counts toward the 40%, so it comes directly out of what's left for rent. Someone with ₹28,000 in EMIs on an ₹80,000 income has only ₹4,000 of that 40% ceiling left for rent, even though the plain 30% ratio alone would suggest ₹24,000.",
  },
  {
    q: "How is this different from the debt-to-income ratio calculator?",
    a: "Debt-to-income ratio looks backward — it checks how much of your income existing debt already eats up. This looks forward — it answers how much NEW rent fits on top of that existing debt, using the same style of income-based ceiling.",
  },
  {
    q: "Does this include the security deposit or brokerage?",
    a: "No — this is purely the ongoing monthly rent figure. A security deposit (commonly 2-10 months' rent depending on the city) and any brokerage fee are one-time costs on top of what this calculator estimates you can sustain every month.",
  },
];

export function RentAffordabilityContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out how much monthly rent comfortably fits your budget &mdash; checking
          both a straightforward rent-to-income ratio and a combined rent-plus-existing-debt
          ceiling, then recommending whichever one is lower.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          On an ₹80,000 monthly income with ₹5,000 in existing EMIs and a 30% target ratio
          &mdash; the calculator&rsquo;s own defaults &mdash; the ratio alone allows{" "}
          <strong>₹24,000</strong> of rent, and the 40% combined cap still leaves room for
          ₹27,000, so the ratio is what actually limits things: recommended rent is ₹24,000.
          Raise existing debt to ₹28,000 instead, and the combined cap collapses to just{" "}
          <strong>₹4,000</strong> &mdash; existing debt, not the ratio, becomes the real limit.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/debt-to-income-ratio/" className="text-figure hover:underline">
            Debt-to-income ratio
          </a>{" "}
          to check your existing debt load on its own, and{" "}
          <a href="/rent-vs-buy/" className="text-figure hover:underline">
            rent vs. buy
          </a>{" "}
          if you're weighing renting against buying a home instead.
        </p>
      </section>
    </div>
  );
}
