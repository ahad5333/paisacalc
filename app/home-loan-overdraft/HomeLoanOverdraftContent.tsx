import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Isn't this just a US-style HELOC?",
    a: "Not quite — a HELOC is a separate revolving credit line against home equity. India's equivalent product (sold as SBI Maxgain, ICICI Home Overdraft, and similar names elsewhere) links a current account directly to the loan itself: any balance sitting in that account reduces the loan balance interest is calculated on, that month, without actually being a separate withdrawal or repayment.",
  },
  {
    q: "Does parking surplus lower my EMI?",
    a: "No — the EMI stays exactly what a regular loan of the same amount, rate, and tenure would carry. What changes is how much of each EMI goes to interest versus principal: with less interest charged, more of the same EMI reduces the balance, so the loan clears faster and for less total interest.",
  },
  {
    q: "Can I withdraw the parked surplus back out?",
    a: "Yes — that's the entire point of an overdraft-linked loan over a plain prepayment. Money parked in the linked account remains accessible; a straight prepayment on a regular loan, by contrast, is gone for good. The tradeoff is a facility like this typically costs a slightly higher rate or processing fee than an equivalent plain home loan.",
  },
  {
    q: "What if my parked balance isn't constant?",
    a: "This calculator assumes one constant average balance for the whole comparison, which is a simplification — in practice, a salary that arrives monthly and gets spent down would see the effective average parked balance fluctuate, generally saving somewhat less than a truly constant balance would.",
  },
];

export function HomeLoanOverdraftContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out how much interest and tenure a home loan overdraft facility saves by
          keeping a surplus balance parked in the account linked to the loan &mdash; against
          paying the same EMI on a regular loan with nothing parked.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹50,00,000 loan at 9% over 20 years, with ₹5,00,000 kept parked in the linked
          account &mdash; the calculator&rsquo;s own defaults. The EMI stays ₹44,986 either
          way, but total interest drops from ₹57,96,818 to ₹38,51,971 &mdash; a saving of{" "}
          <strong>₹19,44,847</strong> &mdash; and the loan clears about 3 years 7 months early.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/loan-prepayment/" className="text-figure hover:underline">
            Loan prepayment
          </a>{" "}
          for the equivalent effect on a regular loan where the money isn't accessible again,
          and{" "}
          <a href="/home-loan-emi/" className="text-figure hover:underline">
            home loan EMI
          </a>{" "}
          for the plain loan this compares against.
        </p>
      </section>
    </div>
  );
}
