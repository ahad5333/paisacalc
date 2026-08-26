import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is it safe to drive if this shows a low number?",
    a: "No. This is an educational estimate, not a measurement — it cannot account for your specific metabolism, medication, food intake, or fatigue, all of which affect actual impairment independent of BAC. The only safe BAC for driving is 0.00%; never use this calculator to decide whether to drive.",
  },
  {
    q: "Why do men and women get different estimates for the same drinks and weight?",
    a: "The Widmark formula uses a body-water distribution ratio (r) that differs by sex — alcohol distributes through body water, and average body water composition differs between men and women, which affects how concentrated the same amount of alcohol becomes.",
  },
  {
    q: "How accurate is this compared to a breathalyzer?",
    a: "Not accurate enough to rely on for any legal or safety decision. The Widmark formula uses population averages for elimination rate and distribution ratio; actual BAC can differ meaningfully between individuals with the same inputs. A breathalyzer or blood test measures the real thing — this estimates it.",
  },
];

export function BacContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates blood alcohol content (BAC) from the number of standard drinks
          consumed, body weight, sex, and time elapsed, using the Widmark formula &mdash; for
          general education only.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          An 80kg male who has had 3 standard drinks over the last 2 hours has an estimated BAC
          of <strong>0.047%</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section className="rounded-lg border border-rule bg-paper/90 p-4 text-sm text-muted">
        This calculator is for general education only. It cannot measure your actual blood
        alcohol content and must never be used to decide whether it is safe to drive, operate
        machinery, or make any other safety-critical decision. If you have been drinking, do not
        drive — arrange a taxi, a sober driver, or public transport instead.
      </section>
    </div>
  );
}
