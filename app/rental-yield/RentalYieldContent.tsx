import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is the monthly cash flow negative in the default example?",
    a: "Because Indian rental yields are typically low — 2-4% gross in most cities — while home loan rates usually run higher, often 8-9%. The calculator's own default (₹60L property, 25% down, 8.5% loan, ₹22,000 rent) has a 4.4% gross yield but an EMI sized for the full 8.5% cost of the loan, so the rent doesn't cover it: monthly cash flow comes out to about −₹30,913. This is common, not a bug — most leveraged rental property in India runs on appreciation, not on rent covering the EMI.",
  },
  {
    q: "So is rental property a bad investment?",
    a: "Not necessarily — but this calculator deliberately only looks at the income side. Many landlords accept negative cash flow because they're betting on the property's resale value appreciating faster than the cash shortfall costs them; the real estate returns calculator covers that side. Treat rental yield and appreciation as two separate questions, not one.",
  },
  {
    q: "What's the difference between gross and net yield?",
    a: "Gross yield is rent alone against the property price — a quick, comparable headline figure. Net yield subtracts vacancy and running expenses (maintenance, property tax, insurance) first, which is the more honest number for judging actual income, though it still ignores the EMI, which is a financing choice rather than a property-level cost.",
  },
  {
    q: "What is cash-on-cash return telling me?",
    a: "It's annual cash flow measured against only the cash you actually put in — the down payment — rather than the full property price. Financing most of the purchase with a loan (high leverage) amplifies this number in both directions: it can make a marginal property look worse on cash-on-cash terms specifically because so little of your own cash is at work relative to the EMI drag.",
  },
];

export function RentalYieldContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out gross and net rental yield, plus the actual monthly cash flow once
          the home loan EMI is factored in &mdash; the income side of owning a rental
          property, separate from any appreciation in the property's value.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹60,00,000 property with 25% down, an 8.5% loan over 15 years, and ₹22,000 monthly
          rent &mdash; the calculator&rsquo;s own defaults &mdash; gives a 4.4% gross yield and
          a <strong>2.7%</strong> net yield after expenses and vacancy. But the EMI on the
          borrowed ₹45,00,000 comes to ₹44,313 a month, more than the rent brings in &mdash;
          monthly cash flow runs <strong>−₹30,913</strong>, a cash-on-cash return of −24.7% on
          the down payment actually invested.
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
          for the appreciation side of the same property, and{" "}
          <a href="/home-loan-emi/" className="text-figure hover:underline">
            home loan EMI
          </a>{" "}
          to work out the financing details on their own.
        </p>
      </section>
    </div>
  );
}
