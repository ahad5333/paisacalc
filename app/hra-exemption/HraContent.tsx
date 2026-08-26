import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is the HRA exemption rule?",
    a: "The exempt part of your House Rent Allowance is the lowest of three amounts: the actual HRA you received, 50% (metro) or 40% (non-metro) of your basic salary plus DA, and your actual rent paid minus 10% of that same basic salary. Whichever of the three is smallest is what you get — not a formula you can pick and choose from.",
  },
  {
    q: "Can I claim HRA exemption if I pay rent to my parents?",
    a: "Yes, if it's a genuine arrangement — a rent agreement, rent paid through a bank transfer (not cash), receipts, and your parents declaring that rent as income on their own return. Without that paper trail, it doesn't hold up to scrutiny. You can't pay rent to a spouse under joint ownership in most interpretations, so check that separately.",
  },
  {
    q: "Do I need rent receipts to claim HRA?",
    a: "Yes, and increasingly your employer or the tax department may ask for a rental agreement too, especially for larger claims. If annual rent exceeds ₹1,00,000, you also need your landlord's PAN — or a signed Form 60 declaration if they don't have one.",
  },
  {
    q: "Which cities count as metro for the 50% HRA rate?",
    a: "For FY 2026-27: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, and Ahmedabad. This list expanded from the traditional four cities specifically for this financial year — Bengaluru, Hyderabad, Pune, and Ahmedabad are new additions. Every other city uses the 40% rate.",
  },
  {
    q: "Can I claim HRA exemption under the new tax regime?",
    a: "No. HRA exemption under Section 10(13A) is only available if you file under the old regime. Under the new regime, your entire HRA is taxable regardless of rent paid.",
  },
  {
    q: "What if I don't pay any rent?",
    a: "Then none of your HRA is exempt, even if your employer pays it as part of your salary. The rent-paid figure is one of the three limits, and it's zero if you don't actually pay rent — for instance, if you live in a family-owned home rent-free.",
  },
  {
    q: "Can I claim both HRA exemption and a home loan interest deduction?",
    a: "Yes, if the situations are genuinely different — commonly, you rent in the city you work in while your own home (bought with a loan) is elsewhere, is under construction, or is let out. Claiming both for the same property you live in is the kind of claim that draws scrutiny.",
  },
];

export function HraContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          If you get House Rent Allowance as part of your salary and pay
          rent, part of that HRA is exempt from tax — but not automatically
          all of it, and not a simple percentage either. This tool applies
          the actual rule and shows you exactly how much of your HRA is
          exempt, and how much stays taxable.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          Section 10(13A) exempts the <em>lowest</em> of three amounts, never
          the highest and never an average:
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>The actual HRA your employer paid you</li>
          <li>
            50% of your basic salary plus DA, if you live in one of eight
            metro cities — Delhi, Mumbai, Kolkata, Chennai, Bengaluru,
            Hyderabad, Pune, or Ahmedabad — or 40% anywhere else
          </li>
          <li>Your actual rent paid, minus 10% of basic salary plus DA</li>
        </ol>
        <p className="mt-2">
          &ldquo;Salary&rdquo; here means basic pay plus dearness allowance
          only — not your HRA itself, and not other allowances. This is
          also strictly an old-regime benefit; the new regime taxes HRA in
          full, which is one of the reasons the two-regime comparison
          matters for anyone paying meaningful rent.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take a ₹6,00,000 annual basic salary, ₹3,60,000 HRA received, and
          ₹4,20,000 rent paid, living in a metro city — the calculator&rsquo;s
          own defaults.
        </p>
        <p className="mt-2">
          The three limits: actual HRA received is ₹3,60,000. Fifty percent
          of basic salary is ₹3,00,000. Rent paid minus 10% of basic
          (₹4,20,000 − ₹60,000) is ₹3,60,000. The lowest of the three is{" "}
          <strong>₹3,00,000</strong> — the 50%-of-salary limit — so that&rsquo;s
          the exempt amount, even though both other limits allowed more.
        </p>
        <p className="mt-2">
          The remaining ₹60,000 of HRA received counts as ordinary taxable
          salary. Note how close two of the three limits were here — a
          small change in rent or city classification can shift which limit
          actually binds.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">What changes the result</h2>
        <p className="mt-2">
          <strong>City</strong> is the single biggest lever — the same
          numbers can produce a materially different exemption depending on
          whether the 50% or 40% rate applies, which is exactly why the
          FY 2026-27 expansion to eight metro cities matters if you&rsquo;re
          in Bengaluru, Hyderabad, Pune, or Ahmedabad.{" "}
          <strong>Rent paid</strong> only helps up to a point — once it
          comfortably clears 10% of your basic salary, the salary-percentage
          limit usually takes over as the binding constraint instead.{" "}
          <strong>HRA received</strong> matters only when it&rsquo;s the
          smallest of the three — a low HRA component relative to a high
          basic salary caps your exemption regardless of rent.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/income-tax/" className="text-figure hover:underline">
            Income tax: old vs new regime
          </a>{" "}
          to see how this exemption feeds into your overall tax comparison,
          and{" "}
          <a href="/in-hand-salary/" className="text-figure hover:underline">
            in-hand salary from CTC
          </a>{" "}
          for the fuller take-home picture.
        </p>
      </section>
    </div>
  );
}
