import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What are the current GST slabs?",
    a: "Since the GST 2.0 rate reform took effect on 22 September 2025, the slabs are 0% (exempt items), 3% (gold, silver, precious stones), 5% (daily essentials, processed food), 18% (the standard rate, covering most goods and services), and 40% (luxury and sin goods). The older 12% and 28% slabs were removed — most 12%-slab goods moved to 5%, most 28%-slab goods moved to 18%.",
  },
  {
    q: "How do I calculate the base price from a GST-inclusive price?",
    a: "Divide, don't subtract a percentage of the total. A ₹118 price that already includes 18% GST has a base price of ₹118 ÷ 1.18 = ₹100, not ₹118 − (18% of ₹118). Subtracting a percentage of the total over-removes, because the original 18% was calculated on the smaller base amount, not on the total.",
  },
  {
    q: "Is GST the same across all of India?",
    a: "The total rate is the same nationally, but it's split differently depending on the transaction: within a state it's charged as CGST + SGST (each half the total rate), between states it's charged as one combined IGST at the full rate. Either way, the total tax paid on the same item at the same rate is identical — this calculator shows the combined total, not the CGST/SGST split.",
  },
  {
    q: "Which rate applies to my specific product or service?",
    a: "That depends on the HSN (goods) or SAC (services) classification the government has assigned it, not just which of the five bands feels closest — check the current official rate notification or your GST portal for the exact classification rather than guessing from a general description.",
  },
];

export function GstContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool adds GST to a base price, or works backwards from a GST-inclusive
          price to find the base amount — pick whichever direction matches what you
          already know, and the current GST rate that applies.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Adding GST is straightforward multiplication: GST amount = base price × rate ÷
          100, and the final price is the base plus that GST amount. Removing GST from an
          already-inclusive price works the other way &mdash; the base price is the total
          divided by (1 + rate ÷ 100), not the total with a flat percentage subtracted,
          since that would remove more tax than was actually included.
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          Base = Total × 100 ÷ (100 + rate)
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹10,000 base price at the standard 18% rate &mdash; the calculator&rsquo;s own
          default. GST = 10,000 × 18 ÷ 100 = <strong>₹1,800</strong>, making the
          GST-inclusive price <strong>₹11,800</strong>. Switching to &ldquo;remove
          GST&rdquo; on that same ₹11,800 recovers the original ₹10,000 base exactly.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/income-tax/" className="text-figure hover:underline">
            Income tax: old vs new regime
          </a>{" "}
          for the tax on your income rather than on a purchase.
        </p>
      </section>
    </div>
  );
}
