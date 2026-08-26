import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What are the two charges that make up a lease payment?",
    a: "The depreciation charge covers the value the car is expected to lose over the lease term, spread evenly across every month. The finance charge is essentially interest — but calculated on the average of the vehicle's price and its expected residual value, since both are effectively tied up by the leasing company for the lease's duration, not on a shrinking loan balance the way an EMI amortises.",
  },
  {
    q: "Do I own the car at the end of a lease?",
    a: "No — that's the fundamental difference from a loan. At lease end you typically return the vehicle (worth its residual value to the leasing company) or, on some leases, have the option to buy it at that same residual value. A car loan, by contrast, leaves you owning the vehicle outright once the EMIs are done.",
  },
  {
    q: "Why does a higher residual value lower the monthly payment?",
    a: "Because the depreciation charge is based on how much value the car loses over the lease — a higher residual value means it's expected to lose less, so there's less to spread across the monthly payments. This is also why leasing tends to suit vehicles that hold their value well.",
  },
  {
    q: "Is auto leasing common in India?",
    a: "It's a smaller, newer segment next to outright car loans — mostly corporate fleet leasing, with a growing set of consumer leasing services in some cities. The lease-payment mechanics themselves are the same worldwide; what varies more locally is how common the option actually is and what's bundled into it (insurance, maintenance).",
  },
];

export function AutoLeaseContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the monthly lease payment for a car from its price, expected residual
          value at lease end, term, and interest rate &mdash; split into the depreciation
          charge and the finance charge every lease payment is built from.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹15,00,000 vehicle expected to retain 50% of its value over a 36-month lease at 8%
          &mdash; the calculator&rsquo;s own defaults &mdash; comes to a{" "}
          <strong>₹20,833</strong> monthly depreciation charge plus a ₹15,000 finance charge,
          for a <strong>₹35,833</strong> monthly lease payment and ₹12,89,988 total over the
          lease.
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
          to compare against buying the same vehicle outright with a loan instead.
        </p>
      </section>
    </div>
  );
}
