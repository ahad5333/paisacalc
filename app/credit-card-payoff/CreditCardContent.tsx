import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do card issuers quote a monthly rate instead of an annual one?",
    a: "It's how interest is actually charged — on whatever balance is outstanding each billing cycle, every month. A 3.5% monthly rate compounds to roughly 42% a year if a balance is carried the whole time, which is why credit card debt is one of the most expensive kinds to carry.",
  },
  {
    q: "Why does paying only the minimum take so long?",
    a: "Minimum payments are typically set low enough (often 2-5% of the balance) that a large share of each payment goes to interest rather than principal, especially early on — the same reducing-balance mechanics as a loan EMI, just at a much higher rate. Paying more than the minimum, even a little, cuts the payoff time and total interest dramatically.",
  },
  {
    q: "What happens if my payment doesn't cover the interest?",
    a: "The balance actually grows every month instead of shrinking, since the unpaid interest gets added to what you owe — this calculator flags that case explicitly rather than showing a misleading payoff time, because there isn't one at that payment level.",
  },
  {
    q: "Does this account for new spending on the card?",
    a: "No — it assumes the balance you enter is fixed and no new charges are added while you're paying it down. Continuing to spend on the card while trying to pay it off will extend the actual payoff time well beyond what this shows.",
  },
];

export function CreditCardContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out how many months a fixed monthly payment takes to clear a
          credit card balance, and how much interest that costs in total &mdash; the same
          month-by-month simulation the loan prepayment calculator uses, adapted for a
          monthly-quoted card rate instead of an annual loan rate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹1,00,000 balance at 3.5% per month, paying ₹5,000 every month &mdash; the
          calculator&rsquo;s own default. That clears the balance in <strong>35 months</strong>,
          at a total interest cost of <strong>₹74,990</strong> &mdash; nearly as much as the
          original balance itself, entirely from carrying it at a card&rsquo;s rate rather than
          paying it off immediately.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/personal-loan-emi/" className="text-figure hover:underline">
            Personal loan EMI
          </a>{" "}
          to compare against consolidating card debt into a lower-rate personal loan
          instead.
        </p>
      </section>
    </div>
  );
}
