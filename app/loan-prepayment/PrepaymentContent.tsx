import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Should I reduce my EMI or my tenure after a prepayment?",
    a: "Reducing tenure while keeping the same EMI almost always saves more total interest, often dramatically more, because the loan clears sooner and stops accruing interest earlier. Reducing EMI gives you monthly breathing room instead — useful if cash flow is tight, but it costs you materially more over the life of the loan for the same prepayment.",
  },
  {
    q: "Does my bank charge a penalty for prepaying a home loan?",
    a: "For floating-rate home loans, RBI rules mean individual borrowers generally can't be charged a prepayment penalty. Fixed-rate loans are a different story — check your loan agreement, since charges can still apply there.",
  },
  {
    q: "Is it better to prepay early or later in the loan?",
    a: "Earlier, by a wide margin. Interest in the early years is calculated on a much larger outstanding balance, so a rupee of principal repaid in year 2 saves far more future interest than the same rupee repaid in year 15, when most of the balance is already gone.",
  },
  {
    q: "Should I prepay my loan or invest the money instead?",
    a: "It depends on the loan's interest rate versus what you'd realistically earn investing, after tax on both sides. A prepayment is a guaranteed, risk-free return equal to your loan's interest rate; an investment's return isn't guaranteed. This calculator only measures the loan side of that comparison.",
  },
  {
    q: "Can I make multiple smaller prepayments instead of one lump sum?",
    a: "Yes, and many borrowers do — each one recalculates the same way, against whatever the outstanding balance is at that point. This calculator models a single lump sum for clarity; repeat the calculation with the updated balance and remaining tenure to model a second prepayment.",
  },
  {
    q: "Does prepaying affect my credit score?",
    a: "Prepaying doesn't hurt it, and closing a loan in good standing is generally viewed favourably. It won't meaningfully boost your score either — credit scoring weighs your repayment history and current utilisation more than how a loan eventually closed.",
  },
];

export function PrepaymentContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          If you pay a lump sum towards your home loan beyond your regular
          EMI, this tool shows exactly how much interest that saves you —
          and the difference between the two things your lender can do with
          it: lower your EMI, or shorten how long you&rsquo;re paying.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Every EMI you&rsquo;ve already paid reduces the outstanding
          balance a little; a prepayment reduces it by a lot, all at once.
          From that new, smaller balance, your lender offers two paths.{" "}
          <strong>Lower my EMI, same end date</strong> recalculates a
          smaller EMI over whatever tenure was originally left.{" "}
          <strong>Keep my EMI, finish earlier</strong> keeps paying the
          original EMI amount, which now clears the smaller balance in
          fewer months than originally scheduled.
        </p>
        <p className="mt-2">
          Both save interest, because less principal is outstanding for the
          rest of the loan either way. But shortening the tenure saves
          substantially more, because the higher ongoing payment attacks
          the (already-reduced) principal faster than a lowered EMI would —
          see the worked example below for how large that gap actually is.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹40,00,000 loan at 8.5% over 20 years (EMI ₹34,713),
          with a ₹5,00,000 prepayment made after 2 years — the
          calculator&rsquo;s own defaults. By month 24, the outstanding
          balance has only dropped to about ₹38.3 lakh; the prepayment
          takes it down to roughly ₹33.3 lakh.
        </p>
        <p className="mt-2">
          <strong>Lower my EMI:</strong> the EMI drops to ₹30,186 for the
          remaining 216 months, saving <strong>₹4,77,969</strong> in total
          interest over the life of the loan.
        </p>
        <p className="mt-2">
          <strong>Keep my EMI, finish earlier:</strong> paying the same
          ₹34,713 clears the loan in 186 months instead of 240 — nearly{" "}
          <strong>4.5 years earlier</strong> — and saves{" "}
          <strong>₹13,90,129</strong> in interest. Nearly three times the
          saving, from the exact same ₹5,00,000 prepayment.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Timing</strong> matters more than almost anything else —
          the same prepayment made in year 2 saves dramatically more than
          the same amount in year 15, because early interest is calculated
          on a much larger balance. <strong>Which strategy</strong> you pick
          trades certainty for savings: a lower EMI is a permanent reduction
          in your monthly obligation, useful if you need the cash-flow
          room, while keeping the EMI and finishing early only pays off if
          you can comfortably sustain the higher payment. <strong>Prepayment
          size</strong> scales roughly linearly with savings, but larger
          prepayments made earlier compound the timing advantage too.
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
          for the original amortisation schedule this tool builds on, and{" "}
          <a href="/income-tax/" className="text-figure hover:underline">
            income tax: old vs new regime
          </a>{" "}
          if you&rsquo;re weighing prepayment against claiming home loan interest
          as a deduction instead.
        </p>
      </section>
    </div>
  );
}
