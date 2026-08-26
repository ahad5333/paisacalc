import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is pensionable salary capped at ₹15,000, when my actual basic pay is higher?",
    a: "EPFO applies a statutory wage ceiling to EPS calculations — currently ₹15,000/month — regardless of your actual basic + DA. This ceiling has stayed unchanged since September 2014, even as salaries have risen, which is a major reason EPS pensions often look modest relative to final salary.",
  },
  {
    q: "What's the 2-year service bonus?",
    a: "EPFO's own formula adds 2 years to your actual pensionable service once it exceeds 20 years, before applying the ÷70 divisor. Someone with exactly 20 years gets no bonus; someone with 21 years is treated as having 23 for the calculation.",
  },
  {
    q: "What about the 2022 Supreme Court ruling on higher EPS contributions?",
    a: "Employees who exercised the option to contribute EPS on their actual (uncapped) salary, following that ruling, have a different, higher pensionable salary than the ₹15,000 ceiling modelled here — this calculator covers the standard, capped-salary case that applies to most EPFO members.",
  },
  {
    q: "Am I even eligible for an EPS pension?",
    a: "You need at least 10 years of pensionable service and to reach 58 years of age for the full pension (reduced early-pension options exist from age 50). This calculator assumes eligibility is already met and just works out the amount.",
  },
];

export function EpsPensionContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out your monthly pension under EPFO&rsquo;s Employees&rsquo; Pension Scheme,
          1995 &mdash; using the exact government formula: pensionable salary (capped at
          ₹15,000) × pensionable service (with a 2-year bonus past 20 years) ÷ 70.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹15,000 pensionable salary with 25 years of service &mdash; the calculator&rsquo;s
          own defaults &mdash; gets the 2-year bonus, giving an effective 27 years of service.
          15,000 × 27 ÷ 70 works out to a <strong>₹5,786</strong> monthly pension.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/ppf-calculator/" className="text-figure hover:underline">
            PPF calculator
          </a>{" "}
          and{" "}
          <a href="/nps-calculator/" className="text-figure hover:underline">
            NPS calculator
          </a>{" "}
          for the other pieces of a typical Indian retirement plan.
        </p>
      </section>
    </div>
  );
}
