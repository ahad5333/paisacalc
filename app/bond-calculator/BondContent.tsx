import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is bond price inversely related to yield?",
    a: "Because a bond's coupon payments are fixed once issued. If market yields rise above the coupon rate, new bonds offer more, so an existing bond with a lower fixed coupon has to sell for less to offer a competitive effective return — a discount. If yields fall below the coupon rate, the opposite happens and the bond commands a premium. The calculator's own default (7% coupon against an 8% market yield) prices at a discount for exactly this reason.",
  },
  {
    q: "What's the difference between coupon rate and yield to maturity?",
    a: "Coupon rate is fixed at issue and determines the cash payments — it never changes. Yield to maturity is the market's current required return for a bond of this risk and maturity, which moves with market conditions and is what actually determines the bond's price today.",
  },
  {
    q: "Why does this price at exactly face value when the rates are equal?",
    a: "When the yield exactly matches the coupon rate, the bond's payments are worth precisely what the market currently demands for that risk and maturity — no more, no less — so there's no premium or discount to apply. This is a useful sanity check: set both rates equal and the price should always come back to face value.",
  },
  {
    q: "Is this relevant for Indian retail investors?",
    a: "Increasingly, yes — RBI's Retail Direct platform lets individuals buy government securities directly, and corporate bonds are also available through stock exchanges. Understanding that a bond's market price moves opposite to yield is the first thing that trips up new bond investors used to thinking in terms of the coupon rate alone.",
  },
];

export function BondContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This prices a bond today from its face value, coupon rate, and the market's current
          yield to maturity &mdash; the present value of every remaining coupon payment plus
          the present value of the face value returned at maturity, both discounted at the
          yield.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A ₹1,00,000 face value bond with a 7% coupon, a 10-year maturity, semi-annual
          payments, and an 8% market yield &mdash; the calculator&rsquo;s own defaults &mdash;
          prices at <strong>₹93,205</strong>, a ₹6,795 discount to face value, since the market
          yield exceeds what the bond's own coupon pays.
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
          for a fixed-rate deposit alternative without market price fluctuation.
        </p>
      </section>
    </div>
  );
}
