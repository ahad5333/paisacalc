import type { Metadata } from "next";
import { UtilityPage } from "@/components/chrome/UtilityPage";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/disclaimer/`;
const TITLE = "Disclaimer | PaisaCalc";
const DESCRIPTION = "PaisaCalc is an informational tool, not tax or investment advice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function DisclaimerPage() {
  return (
    <UtilityPage title="Disclaimer">
      <p>
        PaisaCalc is an informational tool. It is not tax advice,
        investment advice, or legal advice, and nothing on this site
        should be treated as a recommendation to take or avoid any
        particular financial action. Verify any figure that matters to
        your actual filing or financial decisions with a qualified
        chartered accountant, tax advisor, or financial planner before
        acting on it.
      </p>
      <p>
        Every calculator on this site computes results using rules —
        tax slabs, rates, thresholds, formulas — sourced from official
        publications (the Income Tax Department, RBI, the relevant
        Finance Act, and similar) and cited where the calculator&rsquo;s
        content explains how it works. Those rules are verified as of
        each calculator&rsquo;s own &ldquo;last verified&rdquo; date, shown
        on the calculator itself. Tax and financial rules change,
        sometimes with little notice, and a rule that was correct on
        that date may no longer be current by the time you use it.
      </p>
      <p>
        Fitness and health calculators &mdash; BMI, calorie and macro
        targets, pregnancy and ovulation dates, GFR, BAC, and similar
        &mdash; are for general informational and educational purposes
        only. They are not a medical diagnosis, and they do not replace
        the judgement of a doctor, dietitian, or other qualified health
        professional who knows your actual medical history. Formulas
        like BMI or GFR are population-level estimates; they can be
        meaningfully wrong for a specific individual (athletes,
        pregnant people, and older adults are common examples). Consult
        a qualified professional before making a health decision based
        on any result from this site, and treat anything date- or
        pregnancy-related here as an estimate, not a clinical timeline.
      </p>

      <p>
        Math, conversion, and general-utility calculators (unit
        conversions, statistics, date arithmetic, and similar) implement
        standard, publicly documented formulas and are checked against
        independently worked examples before publishing. They carry less
        real-world stake than a tax or medical figure, but the same rule
        applies: verify anything that matters before relying on it.
      </p>

      <p>
        Calculations depend entirely on the numbers you enter. An error
        in an input, an assumption that doesn&rsquo;t match your actual
        situation, or a nuance of your specific circumstances that a
        general-purpose calculator can&rsquo;t account for can all produce
        a result that doesn&rsquo;t match what you actually owe or are
        entitled to. Each calculator states its assumptions explicitly —
        read them before relying on the result.
      </p>
      <p>
        PaisaCalc, and the person who built it, accept no liability for
        decisions made or losses incurred based on figures produced by
        these calculators. Use them to understand how a calculation
        works and to sanity-check numbers you&rsquo;ve been given
        elsewhere — not as a substitute for professional advice on
        anything that materially affects your finances or your tax
        filing.
      </p>
      <p>
        Found a calculator producing a result that looks wrong, or a
        rule that&rsquo;s gone stale? Report it at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-figure hover:underline">
          {CONTACT_EMAIL}
        </a>{" "}
        — corrections get logged on the{" "}
        <a href="/changelog/" className="text-figure hover:underline">
          changelog
        </a>
        .
      </p>
    </UtilityPage>
  );
}
