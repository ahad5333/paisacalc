import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Does this include GST on the commission?",
    a: "No — brokers and agents commonly charge GST on top of their commission itself, as a separate line item. This calculator shows the commission alone; check whether GST applies on top for the actual total cost.",
  },
  {
    q: "What if my commission is tiered, not a flat rate?",
    a: "This calculator assumes one flat rate across the entire sale amount. A tiered structure (e.g. 2% on the first ₹50L, 1% beyond that) would need each slab calculated and added separately — this is the simple, single-rate case.",
  },
];

export function CommissionContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out commission earned on a sale at a flat percentage rate, and what
          remains net of that commission.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹10,00,000 sale at a 2% commission rate &mdash; the calculator&rsquo;s own defaults
          &mdash; earns <strong>₹20,000</strong>, leaving ₹9,80,000 net.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/real-estate-returns/" className="text-figure hover:underline">
            Real estate returns
          </a>{" "}
          if this is a property sale &mdash; brokerage is already folded into its selling cost
          input.
        </p>
      </section>
    </div>
  );
}
