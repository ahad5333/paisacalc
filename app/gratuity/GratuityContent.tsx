import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is gratuity calculated?",
    a: "For an employer covered under the Payment of Gratuity Act, gratuity is your last drawn basic salary plus dearness allowance, multiplied by 15, multiplied by your years of service, divided by 26 — 26 being the standard number of working days used in the Act's calculation, not a calendar month.",
  },
  {
    q: "What if I resign before completing 5 years?",
    a: "You generally forfeit gratuity entirely if you leave before 5 years of continuous service, with two exceptions: death and permanent disablement, where the 5-year requirement is waived completely regardless of how long you'd worked.",
  },
  {
    q: "Does my notice period count toward the 5 years?",
    a: "Yes — if serving out your notice period takes you past the 5-year mark, that counts as continuous service and you become eligible. Timing your resignation around this is common and legitimate.",
  },
  {
    q: "Is gratuity taxable?",
    a: "Up to ₹20,00,000 is exempt from tax for employees covered under the Act — a lifetime ceiling across every employer you've worked for, not a per-job limit. Anything an employer pays beyond the statutory formula amount, as a voluntary extra, is fully taxable as salary income.",
  },
  {
    q: "Can my employer refuse to pay gratuity?",
    a: "Not routinely. Forfeiture is only lawful in specific situations — termination for causing the employer financial loss (capped at the loss amount), or for riotous conduct, violence, or an offence involving moral turpitude during employment — and even then, generally only after due process, not automatically on dismissal.",
  },
  {
    q: "Do government employees follow the same rules?",
    a: "Government employees fall under a separate scheme with its own rules, and their gratuity is typically fully exempt from tax with no ceiling, unlike the ₹20 lakh cap that applies to private-sector employees under the Payment of Gratuity Act. This calculator is built for the private-sector case.",
  },
];

export function GratuityContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          If you&rsquo;ve worked for the same employer for years, gratuity is a
          lump sum they owe you on leaving — separate from your salary,
          separate from any provident fund. This tool works out how much
          you&rsquo;re entitled to, and how much of that is tax-free.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          The formula is fixed by the Payment of Gratuity Act, 1972:
          last-drawn basic salary plus dearness allowance, × 15, × years of
          service, ÷ 26. You need at least 5 years of continuous service to
          be eligible at all — this isn&rsquo;t a sliding scale that phases in,
          it&rsquo;s a hard cutoff, waived only for death or permanent
          disablement.
        </p>
        <p className="mt-2">
          Whatever the formula computes, the amount actually payable — and
          the amount that&rsquo;s tax-free — is capped at ₹20,00,000. That&rsquo;s a
          lifetime ceiling across every employer, not something that resets
          each time you change jobs.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a last-drawn monthly salary of ₹50,000 and 10 years of
          service — the calculator&rsquo;s own defaults. The formula gives
          ₹50,000 × 15 × 10 ÷ 26 = <strong>₹2,88,462</strong>. That&rsquo;s
          comfortably under the ₹20 lakh ceiling, so the full amount is
          payable and entirely tax-free.
        </p>
        <p className="mt-2">
          For someone higher up the pay scale — say ₹5,00,000 monthly
          salary and 30 years of service — the formula computes ₹86,53,846,
          but the ceiling caps what&rsquo;s actually payable (and exempt) at
          ₹20,00,000. The remaining ₹66,53,846 the formula would otherwise
          give simply isn&rsquo;t paid under the Act; an employer paying it
          anyway would be making a voluntary payment, taxed differently from
          the statutory amount.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>Years of service</strong> and <strong>salary</strong> both
          scale the result directly, but the <strong>₹20 lakh ceiling</strong>{" "}
          means that scaling stops mattering past a certain point — long
          tenure at a high salary hits the cap well before the formula
          would otherwise suggest. <strong>Whether your employer is
          covered</strong> under the Act changes the divisor from 26 to 30
          and swaps last-drawn salary for an average of your last 10
          months&rsquo; pay — a smaller practical difference than it looks,
          but worth getting right if you&rsquo;re unsure which applies to
          you.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            In-hand salary from CTC
          </a>{" "}
          to see how gratuity fits into your overall CTC structure, and{" "}
          <a href="/income-tax/" className="text-figure hover:underline">
            income tax: old vs new regime
          </a>{" "}
          if any part of your gratuity ends up taxable.
        </p>
      </section>
    </div>
  );
}
