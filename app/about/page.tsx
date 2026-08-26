import type { Metadata } from "next";
import { UtilityPage } from "@/components/chrome/UtilityPage";
import { FaqAccordion } from "@/components/calculator/FaqAccordion";
import { CALCULATORS, CALCULATOR_CATEGORIES } from "@/lib/calculators";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/about/`;
const TITLE = "About | PaisaCalc";
const DESCRIPTION =
  "What PaisaCalc is, why it shows its working, and how its rules are sourced and kept current.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

const FAQS = [
  {
    q: "Can I link to a calculator page?",
    a: "Yes — link to any calculator or article on the site freely, no permission needed.",
  },
  {
    q: "Is there an API?",
    a: "Not currently. Every calculator runs client-side in your browser; there's no backend endpoint to call.",
  },
  {
    q: "Is PaisaCalc free?",
    a: "Yes. Every calculator is free, with no account, signup, or paywall. The site may show ads to help cover hosting costs — see the privacy policy for how those work.",
  },
  {
    q: "Can I request a new calculator?",
    a: `Yes — email ${CONTACT_EMAIL} with what you'd find useful. New calculators and rule updates are logged on the changelog as they ship.`,
  },
  {
    q: "Does PaisaCalc store or sell the numbers I enter?",
    a: "No. Every calculator computes in your browser — what you type into a calculator is never sent to a server, stored, or shared. See the privacy policy for the full detail.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UtilityPage
        title="About PaisaCalc"
        heroImage="/images/hero-pen.webp"
        heroObjectPosition="65% 55%"
      >
      <p>
        Most calculators online give you a single number and nothing
        else. PaisaCalc exists because the number alone isn&rsquo;t the
        useful part &mdash; the useful part is seeing how it was
        arrived at: which slab you fell into, which rule applied, what
        got added and what got taken away. Every calculator on this
        site shows that working alongside the result, not buried in a
        PDF or hidden behind &ldquo;view details.&rdquo;
      </p>

      <h2 className="font-serif text-lg text-ink">Why this exists</h2>
      <p>
        This site was built for anyone who&rsquo;s stared at an EMI
        figure, a tax notice, or a due date estimate and had no real way
        to check whether it was right &mdash; a first-time borrower
        comparing a lender&rsquo;s quote against their own math, a
        salaried employee trying to work out whether the old or new tax
        regime actually saves them more, a student who just needs a
        formula worked correctly, an expecting parent trying to make
        sense of a due-date calculation, or just someone who wants a
        second opinion on a number before acting on it. Not everyone has
        a chartered accountant or a doctor on call for every small
        question, and a bank&rsquo;s own EMI calculator or a generic
        health app has no particular incentive to show its work. This
        site does, because that&rsquo;s the whole reason it was built:
        to give people who need a clear, honest answer a free way to get
        one, without an account, a paywall, or a sales pitch attached to
        it.
      </p>

      <p>
        Each calculator is built in three layers: a rules file that
        holds the actual rates, slabs, and thresholds &mdash; each one
        cited to an official source such as the Income Tax Department,
        RBI, or the relevant Finance Act &mdash; a calculation layer
        that is pure arithmetic with no hidden assumptions, and a
        display layer that renders the derivation step by step. When a
        Budget or a Finance Act changes a rule, the rules file is what
        gets updated, and that update is logged on the{" "}
        <a href="/changelog/" className="text-figure hover:underline">
          changelog
        </a>{" "}
        with a date.
      </p>
      <p>
        That said, tax and financial rules are detailed, and inputs
        vary from person to person in ways a general-purpose calculator
        can&rsquo;t always anticipate. Treat every result here as a
        starting point for understanding a calculation, not as a
        final answer &mdash; see the{" "}
        <a href="/disclaimer/" className="text-figure hover:underline">
          disclaimer
        </a>{" "}
        for the full picture.
      </p>

      <h2 className="font-serif text-lg text-ink">How formulas are chosen</h2>
      <p>
        Most calculators on this site use a single well-established
        formula &mdash; the kind found in a textbook or an official
        publication, not something invented for the site. Where
        professionals genuinely disagree on the right formula, the
        answer isn&rsquo;t to quietly pick one: the{" "}
        <a href="/ideal-weight-calculator/" className="text-figure hover:underline">
          Ideal Weight Calculator
        </a>
        , for instance, shows four different clinical formulas (Hamwi,
        Devine, Robinson, and Miller) side by side rather than
        presenting one as the answer, because they don&rsquo;t agree
        with each other and that spread is itself useful information.
      </p>
      <p>
        A handful of calculators, like the{" "}
        <a href="/love-calculator/" className="text-figure hover:underline">
          Love Calculator
        </a>
        , exist purely for fun and say so directly on the page &mdash;
        they&rsquo;re not built on a real formula and shouldn&rsquo;t be
        mistaken for one. And chart visualisations across the site are
        rendered with{" "}
        <a
          href="https://recharts.org"
          className="text-figure hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Recharts
        </a>
        , an open-source library &mdash; credited here since it&rsquo;s
        the one third-party piece involved in how a result actually gets
        drawn on the page.
      </p>

      <h2 className="font-serif text-lg text-ink">What&rsquo;s on PaisaCalc</h2>
      <p>
        {CALCULATORS.length} calculators across {CALCULATOR_CATEGORIES.length}{" "}
        categories &mdash; {CALCULATOR_CATEGORIES.join(", ")} &mdash; each
        with a full derivation, not just a final figure. Search or browse
        by category from the{" "}
        <a href="/" className="text-figure hover:underline">
          homepage
        </a>
        .
      </p>

      <h2 className="font-serif text-lg text-ink">Who this is for</h2>
      <p>
        Salaried employees comparing tax regimes at filing time. First-time
        borrowers trying to sanity-check an EMI a lender quoted them.
        Students and professionals who just need a formula worked
        correctly, shown step by step, instead of retyping it into a
        generic calculator app. People planning around a pregnancy,
        tracking fitness goals, or converting units for a home
        renovation. None of these need a login, a subscription, or
        anyone&rsquo;s permission &mdash; just the calculator, and the
        working behind it.
      </p>

      <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
      <FaqAccordion items={FAQS} />

      <p>
        Anything else &mdash; a result that looks wrong, a rule that&rsquo;s
        gone stale, or a calculator you&rsquo;d like to see &mdash; is
        welcome on the{" "}
        <a href="/contact/" className="text-figure hover:underline">
          contact page
        </a>
        .
      </p>
      </UtilityPage>
    </>
  );
}
