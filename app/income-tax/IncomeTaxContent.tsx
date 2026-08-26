import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is the difference between the old and new tax regime?",
    a: "The new regime has lower slab rates but almost no deductions — you can't claim 80C, 80D, or HRA. The old regime has higher rates but lets you reduce your taxable income first through those deductions. Which one costs less depends entirely on how much you actually claim.",
  },
  {
    q: "Which tax regime is better for salaried employees?",
    a: "There's no universal answer — it depends on your deductions, not your salary alone. Someone with a home loan, HRA, and full 80C investments often does better under the old regime; someone with few deductions almost always does better under the new one. Run both numbers rather than guessing.",
  },
  {
    q: "Is the new tax regime the default now?",
    a: "Yes. The new regime is the default since FY 2023-24 — if you don't actively choose the old regime when filing (or, for salaried employees, inform your employer), you're taxed under the new one automatically.",
  },
  {
    q: "How much income is tax-free under the new regime?",
    a: "Up to ₹12,00,000 of taxable income pays no tax under the new regime for FY 2026-27, because the Section 87A rebate (up to ₹60,000) cancels out the tax entirely. With the ₹75,000 standard deduction added on top, a salaried employee's gross income can reach ₹12,75,000 before any tax applies.",
  },
  {
    q: "What happens if my income is just above ₹12 lakh?",
    a: "Marginal relief applies. Without it, crossing ₹12,00,000 by even ₹1 would otherwise trigger the full slab tax — a steep cliff. Marginal relief caps your tax at exactly the amount your income exceeds ₹12,00,000, so a small rise in income never costs more than that rise in tax. The relief tapers off by roughly ₹12,75,000.",
  },
  {
    q: "Can I switch between the old and new regime every year?",
    a: "Salaried individuals with no business income can choose either regime each year when filing their return. If you have business or professional income, switching back to the old regime after opting into the new one is more restricted — check the current rules before assuming you can switch freely.",
  },
];

export function IncomeTaxContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This tool works out your income tax under both the new and old
          regimes side by side, using your actual income and deductions, and
          tells you plainly which one costs less and by how much. Most
          calculators make you pick a regime first; this one compares both
          so you don&rsquo;t have to guess.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Both regimes tax your income in slabs — the portion in each
          bracket is taxed at that bracket&rsquo;s rate, not your whole
          income at one flat rate. The new regime applies a ₹75,000 standard
          deduction and then its own slabs (0% to ₹4L, rising to 30% above
          ₹24L); the old regime applies a ₹50,000 standard deduction plus
          whatever you claim under 80C, 80D, HRA, and similar sections, then
          its own slabs (0% to ₹2.5L, rising to 30% above ₹10L).
        </p>
        <p className="mt-2">
          After slab tax, a 4% Health &amp; Education Cess applies to both.
          Above ₹50 lakh, a surcharge applies too — capped at 25% under the
          new regime, but able to reach 37% under the old regime above ₹5
          crore. Section 87A then wipes out tax entirely below ₹12,00,000
          (new regime) or ₹5,00,000 (old regime) taxable income, with
          marginal relief softening the transition just above each
          threshold — worked out in the derivation panel above with your
          own numbers.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹15,00,000 salary with ₹1,50,000 claimed in old-regime
          deductions — the calculator&rsquo;s own defaults.
        </p>
        <p className="mt-2">
          <strong>New regime:</strong> taxable income is ₹14,25,000
          (₹15,00,000 − ₹75,000 standard deduction). Slab tax comes to
          ₹93,750, plus ₹3,750 cess — <strong>₹97,500 total</strong>. No
          surcharge, no deductions to apply.
        </p>
        <p className="mt-2">
          <strong>Old regime:</strong> taxable income is ₹13,00,000
          (₹15,00,000 − ₹50,000 standard deduction − ₹1,50,000 claimed
          deductions). Slab tax comes to ₹2,02,500, plus ₹8,100 cess —{" "}
          <strong>₹2,10,600 total</strong>.
        </p>
        <p className="mt-2">
          The new regime wins here by <strong>₹1,13,100</strong> — even
          after accounting for ₹1.5 lakh of deductions. That gap narrows or
          reverses as claimed deductions grow, particularly with a home
          loan or significant HRA in the mix; the exact crossover point
          depends on your income level, which is exactly what the
          calculator above works out for your own numbers.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Deductions claimed</strong> are what actually move the
          comparison — the new regime barely responds to them at all
          (almost none are allowed), while every rupee claimed under the old
          regime directly reduces taxable income there. <strong>Income
          level</strong> matters too: at lower incomes the new regime&rsquo;s
          rebate often wins outright regardless of deductions, while at
          higher incomes with heavy deductions (a large home loan, full 80C
          and 80D, substantial HRA) the old regime can pull ahead.{" "}
          <strong>Age category</strong> only affects the old regime — senior
          and super senior citizens get a higher tax-free band there, with
          no equivalent adjustment under the new regime.
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
          if a home loan is part of what you&rsquo;re comparing — old-regime
          home loan interest is one of the larger deductions this
          calculator lets you fold into &ldquo;deductions claimed.&rdquo;{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            In-hand salary from CTC
          </a>{" "}
          turns this result into an actual take-home number, and the{" "}
          <a href="/hra-exemption/" className="text-figure hover:underline">
            HRA exemption calculator
          </a>{" "}
          works out the exact figure to plug into the old-regime side of this
          comparison.
        </p>
      </section>
    </div>
  );
}
