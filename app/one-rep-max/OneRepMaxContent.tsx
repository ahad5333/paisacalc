import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why two formulas instead of one?",
    a: "Epley (1985) and Brzycki (1993) are both widely used and neither is universally more accurate — they're derived from different data and can diverge noticeably, especially at higher rep counts. Showing both, rather than picking one, is more honest about how much an estimate like this can vary.",
  },
  {
    q: "Why estimate a one-rep max instead of just testing it?",
    a: "Actually lifting a true single-rep max needs a spotter, a warm-up protocol, and carries real injury risk if form breaks down under maximal load. Estimating from a lighter, sub-maximal set you can perform safely gets you a usable number without that risk.",
  },
  {
    q: "How accurate is this, and when should I not trust it?",
    a: "Both formulas are most reliable under about 10 reps; accuracy degrades well before 15-20 reps, where the strength/endurance relationship they assume stops holding. Neither accounts for how close to failure the set was taken — a set stopped two reps short of failure will overestimate the true max.",
  },
];

export function OneRepMaxContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates a one-rep max (1RM) &mdash; the most weight you could lift for a single
          rep &mdash; from a lighter set taken for more than one rep, using the Epley and Brzycki
          formulas.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          100kg for 5 reps &mdash; the calculator&rsquo;s own defaults &mdash; gives an Epley
          estimate of <strong>116.7kg</strong> and a Brzycki estimate of{" "}
          <strong>112.5kg</strong>, averaging to <strong>114.6kg</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
