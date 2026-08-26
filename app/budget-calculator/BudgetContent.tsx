import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Where does the 50/30/20 split come from?",
    a: "It's a popular budgeting framework, not an Indian regulatory rule or bank requirement — a commonly cited starting point for splitting income into fixed needs, discretionary wants, and savings/extra debt repayment. All three percentages here are yours to adjust; there's no rule enforcing 50/30/20 specifically.",
  },
  {
    q: "What counts as a \"need\" versus a \"want\"?",
    a: "Needs are obligations you'd struggle to cut without real consequences — rent or EMI, groceries, utilities, insurance premiums. Wants are everything discretionary — dining out, subscriptions, upgrades. The line is genuinely personal; what's a need for one household's situation is a want for another's.",
  },
  {
    q: "Why lump savings and extra debt repayment together?",
    a: "Both represent money going toward your future financial position rather than current consumption — paying down debt faster than the required minimum is, in a real sense, a guaranteed return equal to that debt's interest rate, which often makes it comparable to or better than a savings allocation.",
  },
  {
    q: "What if my needs are more than 50% of my income?",
    a: "That's common, especially in high-cost cities — it just means less room for wants and savings than the standard split assumes. Use this as a diagnostic (\"needs are eating 70% of my income\") rather than a target to force yourself into immediately.",
  },
];

export function BudgetContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This splits your monthly income into needs, wants, and savings using percentages you
          set &mdash; the well-known 50/30/20 rule as a starting default, not a fixed
          requirement.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹60,000 monthly income at the standard 50/30/20 split &mdash; the
          calculator&rsquo;s own defaults &mdash; works out to <strong>₹30,000</strong> for
          needs, ₹18,000 for wants, and ₹12,000 for savings and extra debt repayment.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/debt-to-income-ratio/" className="text-figure hover:underline">
            Debt-to-income ratio
          </a>{" "}
          for a closer look at what's inside your "needs," and{" "}
          <a href="/savings-goal/" className="text-figure hover:underline">
            savings goal
          </a>{" "}
          to turn that savings allocation into a concrete target.
        </p>
      </section>
    </div>
  );
}
