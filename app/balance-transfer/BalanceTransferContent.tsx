import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is a lower rate always worth transferring for?",
    a: "Not automatically — the transfer cost (new lender's processing fee plus the old lender's foreclosure charge) has to be smaller than the interest it saves. On the calculator's own default (₹30L outstanding, 9.5% to 8.3%, 15 years, 1% transfer cost), it saves ₹3,54,366 net — clearly worth it. But shorten the remaining tenure or narrow the rate gap and that transfer cost can eat the entire saving.",
  },
  {
    q: "Why does resetting the tenure matter?",
    a: "Extending the tenure back to a full term when you transfer lowers the EMI, but restarts the interest clock — you'd pay interest on the balance for longer, which can quietly erase some or all of the rate advantage. Keeping the new tenure equal to whatever's actually remaining on the old loan gives the cleanest apples-to-apples comparison.",
  },
  {
    q: "Can I transfer a loan on a floating rate?",
    a: "Yes — most Indian home loans are floating-rate, and balance transfers are common specifically because a competing lender is offering a lower spread. Just remember both the current and new rate are snapshots — a floating rate can move in either direction after the transfer, same as if you'd stayed put.",
  },
  {
    q: "What costs does this leave out?",
    a: "Legal and property valuation fees the new lender may charge, and stamp duty on the new loan agreement in states that levy it. Both are typically smaller than the processing fee but worth checking before deciding.",
  },
];

export function BalanceTransferContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This compares staying with your current home loan against transferring the
          outstanding balance to a new lender at a lower rate &mdash; on net savings after the
          transfer cost, not just the rate difference.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹30,00,000 outstanding balance at 9.5%, with 15 years remaining, transferred to a
          new lender at 8.3% for the same 15-year tenure and a 1% transfer cost &mdash; the
          calculator&rsquo;s own defaults. The EMI drops from ₹31,327 to{" "}
          <strong>₹29,192</strong>, and after netting out the ₹30,000 transfer cost against the
          interest saved, the transfer is worth <strong>₹3,54,366</strong> over the remaining
          term.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/home-loan-emi/" className="text-figure hover:underline">
            Home loan EMI
          </a>{" "}
          to work out your current loan's own numbers first, and{" "}
          <a href="/loan-prepayment/" className="text-figure hover:underline">
            loan prepayment
          </a>{" "}
          if a lump sum toward the existing loan is the alternative you're weighing instead.
        </p>
      </section>
    </div>
  );
}
