import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is the current PPF interest rate?",
    a: "7.1% per annum, compounded annually — the rate the Ministry of Finance has notified for Q2 FY 2026-27. It's reviewed every quarter and can change, but it has actually held at 7.1% for every quarter since 1 April 2020.",
  },
  {
    q: "How much can I invest in PPF each year?",
    a: "A minimum of ₹500 and a maximum of ₹1,50,000 per financial year, across all your PPF accounts combined if you have more than one. Depositing above ₹1,50,000 doesn't earn extra interest on the excess.",
  },
  {
    q: "Is PPF interest and maturity amount taxable?",
    a: "No — PPF is one of the few investments with EEE (Exempt-Exempt-Exempt) tax status in India: the contribution is deductible under Section 80C (within the overall ₹1.5 lakh limit), the interest earned every year is tax-exempt, and the maturity amount is fully tax-exempt too.",
  },
  {
    q: "Can I withdraw from PPF before 15 years?",
    a: "Partial withdrawal is allowed from the 7th financial year onward, capped at a fraction of the balance a few years prior. Full premature closure is otherwise restricted to specific situations like medical emergencies or higher education, and typically comes with a lower interest rate as a penalty on the account's history.",
  },
  {
    q: "What happens after the 15-year lock-in ends?",
    a: "You can withdraw the full maturity amount, or extend the account in blocks of 5 years — either continuing to contribute, or leaving the existing balance to keep earning interest without adding more money. Both extension options are common; which one makes sense depends on whether you still want to be actively saving.",
  },
];

export function PpfContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out what a Public Provident Fund account is worth at maturity —
          depositing a fixed amount every year for 15 years (or longer, if extended), with
          interest compounding annually at the government-notified rate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          PPF deposits are conventionally made at the start of each financial year to
          maximise that year&rsquo;s interest, and interest compounds once a year. The
          maturity value is the future value of that yearly deposit stream:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          M = P × ((1+r)ⁿ − 1) ÷ r × (1+r)
        </p>
        <p className="mt-3">
          <strong>P</strong> is the amount deposited each year. <strong>r</strong> is the
          annual interest rate. <strong>n</strong> is the number of years. The trailing ×
          (1+r) accounts for each deposit being made at the start of its year rather than
          the end, so it earns a full year of interest immediately.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take the maximum ₹1,50,000 deposited every year at 7.1% for 15 years &mdash; the
          calculator&rsquo;s own default, and a figure widely quoted for exactly this reason.
          Plugging P = 1,50,000, r = 0.071, and n = 15 into the formula above gives a
          maturity amount of <strong>₹40,68,209</strong> &mdash; against ₹22,50,000 actually
          deposited over the 15 years, so <strong>₹18,18,209</strong> is interest, entirely
          tax-free.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/fd-calculator/" className="text-figure hover:underline">
            FD calculator
          </a>{" "}
          to compare against a bank fixed deposit, and{" "}
          <a href="/sip-returns/" className="text-figure hover:underline">
            SIP returns
          </a>{" "}
          to compare against equity investing over the same kind of long horizon.
        </p>
      </section>
    </div>
  );
}
