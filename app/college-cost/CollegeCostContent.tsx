import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why use a different inflation rate than the general inflation calculator?",
    a: "Education costs — tuition, hostel fees, professional course fees especially — have historically risen faster than general consumer prices in India, commonly estimated at 10-12% a year versus a 5-6% headline CPI figure. Using the general inflation rate here would understate the real number you're planning for.",
  },
  {
    q: "Why does each year of the course cost more than the last?",
    a: "Because inflation doesn't stop the day your child enrolls — fees typically keep rising year over year through the course itself. Year 1 of a 4-year course is priced at the enrollment year's rate; year 4 has had three more years of inflation applied on top.",
  },
  {
    q: "What should I do with this number?",
    a: "Use it as the target for the savings goal calculator or a dedicated SIP — treating the total course cost as a single future goal you're saving toward, ideally with several years of runway to let compounding do some of the work.",
  },
  {
    q: "What isn't included?",
    a: "One-time costs some institutions charge separately, like admission or donation fees, and any living or accommodation costs beyond what's baked into your \"current annual cost\" estimate.",
  },
];

export function CollegeCostContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This projects today&rsquo;s annual education cost forward to what it&rsquo;ll
          actually cost by enrollment, then totals the full course &mdash; each year priced
          higher than the last, since education inflation doesn&rsquo;t stop once the course
          starts.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹2,00,000 current annual cost, 10 years before enrollment, 10% education inflation,
          and a 4-year course &mdash; the calculator&rsquo;s own defaults. The first year alone
          costs <strong>₹5,18,748</strong> by then; the full course totals{" "}
          <strong>₹24,07,511</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/savings-goal/" className="text-figure hover:underline">
            Savings goal
          </a>{" "}
          to work out the monthly saving needed to hit this number, and{" "}
          <a href="/education-loan-emi/" className="text-figure hover:underline">
            education loan EMI
          </a>{" "}
          if part of it will be financed instead.
        </p>
      </section>
    </div>
  );
}
