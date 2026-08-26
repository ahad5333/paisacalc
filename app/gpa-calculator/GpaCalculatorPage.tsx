"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGpa, type Course, type LetterGrade } from "@/lib/calc/gpa";

const LAST_VERIFIED = "19 Aug 2026";

const GRADE_OPTIONS: { value: LetterGrade; label: string }[] = [
  "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F",
].map((g) => ({ value: g as LetterGrade, label: g }));

const DEFAULT_COURSES: Course[] = [
  { grade: "A", credits: 3 },
  { grade: "B+", credits: 4 },
  { grade: "A-", credits: 3 },
  { grade: "B", credits: 3 },
  { grade: "A", credits: 2 },
];

export function GpaCalculatorPage({ content }: { content: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);

  function updateCourse(index: number, patch: Partial<Course>) {
    setCourses((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  const result = calculateGpa({ courses });
  const { gpa, totalCredits } = result.value;

  return (
    <CalculatorPage
      title="GPA calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Weighted GPA on the standard 4.0 scale, from your courses' grades and credit hours."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="flex flex-col gap-3">
          {courses.map((course, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr] items-end gap-3">
              <ChoiceInput label={`Course ${i + 1} grade`} value={course.grade} onChange={(v) => updateCourse(i, { grade: v })} options={GRADE_OPTIONS} />
              <NumericInput label="Credits" value={course.credits} onChange={(v) => updateCourse(i, { credits: v })} min={0} max={6} step={1} />
            </div>
          ))}
        </div>
      }
      result={<ResultDisplay value={`${gpa}`} caption={`GPA — ${totalCredits} total credits`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
