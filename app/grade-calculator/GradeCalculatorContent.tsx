import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why do my weights need to add up to 100%?",
    a: "They don't strictly have to — the calculator still computes a correct weighted average using whatever weights you enter — but most course syllabi define weights that sum to 100%, so a mismatch usually means a typo or a category left out.",
  },
  {
    q: "How is this different from the GPA calculator?",
    a: "This works within a single course, combining assignment/exam scores by their percentage weight into one overall grade. The GPA calculator instead combines final grades across multiple courses, weighted by credit hours, onto the 4.0 scale.",
  },
];

export function GradeCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds your overall grade in a course from individual assignment or exam scores, each weighted by its percentage of the final grade.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/gpa-calculator/" className="text-figure hover:underline">
            GPA calculator
          </a>{" "}
          to combine final grades across courses on the 4.0 scale.
        </p>
      </section>
    </div>
  );
}
