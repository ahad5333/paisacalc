import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What counts as debt in this calculation?",
    a: "Every fixed EMI or minimum payment you're committed to each month — home loan, car loan, personal loan, credit card minimums, education loan EMI. It doesn't include rent, utilities, groceries, or other everyday spending, since those aren't debt obligations a lender is checking for.",
  },
  {
    q: "Why do lenders care about this number?",
    a: "It's their shorthand for how much more debt you can realistically handle — a high DTI signals that a large chunk of income is already committed elsewhere, leaving less room (and less cushion) for a new EMI. This is essentially the same FOIR concept the home loan eligibility calculator uses, applied to your overall financial picture rather than one specific loan application.",
  },
  {
    q: "Is there one official DTI threshold in India?",
    a: "No — RBI doesn't mandate a specific DTI cap, and different lenders draw the line differently. Under 36% is widely considered healthy, 36-43% is generally still workable, and above 43% is where most lenders start getting cautious, but these are industry conventions, not a regulated rule.",
  },
  {
    q: "How do I actually lower my DTI?",
    a: "Either increase income or reduce fixed debt payments — paying off a smaller loan entirely (rather than a large one partially) often moves the ratio more, since it removes an entire EMI rather than shrinking one. Avoiding new debt while an existing DTI is already high is usually the simplest lever.",
  },
];

export function DtiContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out what share of your net monthly income is already committed to
          debt payments — a quick health check on your overall financial picture, and the
          same style of ratio a lender checks before approving anything new.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹1,00,000 net monthly income with ₹25,000 in existing EMIs and minimum
          payments &mdash; the calculator&rsquo;s own default. That&rsquo;s a debt-to-income ratio of{" "}
          <strong>25.0%</strong>, comfortably in the healthy range with real room left for
          another EMI if needed.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/home-loan-eligibility/" className="text-figure hover:underline">
            Home loan eligibility
          </a>{" "}
          to see how this same idea works out the maximum loan you could actually take on.
        </p>
      </section>
    </div>
  );
}
