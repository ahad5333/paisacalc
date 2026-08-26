import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Isn't a fund's quoted return already net of fees?",
    a: "Yes — a fund's published NAV and historical returns already reflect the expense ratio deducted daily. What this calculator shows is a different, equally useful comparison: given the same underlying market return, how much less an investor ends up with because of the fee, versus a hypothetical zero-fee version of the same fund. That gap is real money, even though it never appears as a separate line item on any statement.",
  },
  {
    q: "How is this different from the SIP returns calculator?",
    a: "SIP returns projects a series of periodic monthly contributions. This is a single lumpsum investment, held for the full period without adding more — the more common way to model a one-time investment like a bonus or maturity payout from another instrument.",
  },
  {
    q: "What's a reasonable expense ratio to expect?",
    a: "SEBI caps Total Expense Ratio (TER) on a sliding scale that comes down as a fund grows larger, roughly 2.25% at the low end of assets for actively managed equity funds, lower for bigger funds, and typically well under 1% — often 0.1-0.5% — for passive index funds and ETFs. Check the specific fund's factsheet rather than assuming a number.",
  },
  {
    q: "Why does a small percentage difference matter so much over time?",
    a: "Because the fee is compounding against you every year, the same way a return compounds for you — a small annual drag repeated for 15-20 years adds up to a large absolute number, exactly as the calculator's own example shows. This is the central argument for comparing expense ratios closely between similar funds.",
  },
];

export function MutualFundContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This projects a lumpsum mutual fund investment's maturity value, and separately shows
          exactly how much the fund's expense ratio (TER) costs over the holding period &mdash;
          in rupees, not just as a percentage.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹5,00,000 lumpsum at a 12% expected annual return with a 1.5% expense ratio, held
          for 15 years &mdash; the calculator&rsquo;s own defaults. At the full 12% gross
          return it would grow to ₹27,36,783; net of the 1.5% fee, it actually grows to{" "}
          <strong>₹22,35,652</strong> &mdash; the expense ratio costs{" "}
          <strong>₹5,01,131</strong> over those 15 years.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/sip-returns/" className="text-figure hover:underline">
            SIP returns
          </a>{" "}
          for periodic monthly contributions instead of a single lumpsum, and{" "}
          <a href="/capital-gains/" className="text-figure hover:underline">
            capital gains tax
          </a>{" "}
          for what happens on withdrawal.
        </p>
      </section>
    </div>
  );
}
