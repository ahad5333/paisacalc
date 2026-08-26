import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What inflation rate should I actually use?",
    a: "India's headline CPI inflation has run roughly 3.5-4.5% through the first half of 2026, per the Ministry of Statistics' official releases, and the RBI targets 4% (within a 2-6% band) over the medium term. That's a reasonable baseline, but specific categories like education and healthcare have historically run hotter than the headline figure — run this at a couple of different rates if you're projecting a specific goal like education costs.",
  },
  {
    q: "Is this the same as calculating investment returns?",
    a: "No — this projects what something will cost in the future, not what an investment grows to. A related question is whether your savings are actually keeping pace: if your FD or PPF earns 7% and inflation runs 5%, your money is genuinely growing in real terms, just more slowly than the headline return suggests.",
  },
  {
    q: "Why does a small rate difference matter so much over long periods?",
    a: "Because it compounds — the same mechanics as any compound-interest calculation, just working against your purchasing power instead of for a balance. Over 30 years, 4% and 6% inflation produce dramatically different future costs, even though the yearly difference feels small.",
  },
];

export function InflationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This projects what today&rsquo;s amount will actually cost in the future, at an
          inflation rate you choose &mdash; useful for sanity-checking a long-term goal like
          retirement or a child&rsquo;s education, where the sticker price you see today isn&rsquo;t
          what you&rsquo;ll actually need to have saved.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">How the calculation works</h2>
        <p className="mt-2">
          It&rsquo;s ordinary compound growth, applied to a cost instead of an investment
          balance:
        </p>
        <p className="mt-3 rounded border border-rule bg-paper/60 px-4 py-3 font-mono text-sm">
          Future cost = Present amount × (1 + rate)ⁿ
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Take ₹1,00,000 today at 5% inflation over 10 years &mdash; the calculator&rsquo;s own
          default. The same goods or services cost <strong>₹1,62,889</strong> in 10 years
          &mdash; ₹62,889 more than today, purely from prices rising at 5% a year.
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
          to check whether an investment&rsquo;s growth is actually outpacing inflation, and{" "}
          <a href="/ppf-calculator/" className="text-figure hover:underline">
            PPF calculator
          </a>{" "}
          for a fixed-rate comparison over a similarly long horizon.
        </p>
      </section>
    </div>
  );
}
