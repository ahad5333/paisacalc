import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do torque and horsepower always cross at exactly 5252 RPM on a dyno chart?",
    a: "It's a mathematical consequence of the units, not a coincidence about any particular engine — the formula HP = torque × RPM ÷ 5252 means that whenever RPM equals 5252, the RPM and 5252 cancel out, leaving horsepower numerically equal to torque.",
  },
  {
    q: "What's the practical difference between torque and horsepower?",
    a: "Torque is the twisting force available right now, at a given RPM — it's what you feel as acceleration. Horsepower factors in RPM too, capturing how quickly that force can do work — it's more closely tied to top speed and sustained power output.",
  },
];

export function HorsepowerCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds horsepower from torque and engine RPM, using the standard automotive formula.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/engine-horsepower-calculator/" className="text-figure hover:underline">
            Engine horsepower calculator
          </a>{" "}
          to estimate horsepower from quarter-mile performance instead of a torque spec.
        </p>
      </section>
    </div>
  );
}
