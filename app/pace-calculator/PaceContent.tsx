import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How do I use this to plan a race?",
    a: "Enter the race distance and your goal finishing time to see the average pace you'd need to hold. If that pace feels unrealistic for the whole distance, it's a useful early warning before race day rather than during it.",
  },
  {
    q: "Why does this show an average pace instead of splits?",
    a: "It only knows total distance and total time, so it can only report the average across the whole run. A real run's actual pace varies with terrain, fatigue, and pacing strategy (negative splits, even splits, and so on) — this is a planning tool, not a GPS watch.",
  },
  {
    q: "What's a good pace for a beginner?",
    a: "There's no single answer — it depends entirely on fitness level, distance, and goals. This calculator is for checking the pace/time/distance relationship for your own numbers, not for judging what pace is \"good.\"",
  },
];

export function PaceContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out average pace (minutes per km) and speed (km/h) from a distance and a
          total time.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 10km run finished in 52 minutes &mdash; the calculator&rsquo;s own defaults &mdash;
          works out to a pace of <strong>5:12/km</strong>, an average speed of 11.54 km/h.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
