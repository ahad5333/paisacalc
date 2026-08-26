import type { Metadata } from "next";
import { UtilityPage } from "@/components/chrome/UtilityPage";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/terms-of-service/`;
const TITLE = "Terms of Service | PaisaCalc";
const DESCRIPTION = "The terms that apply to using PaisaCalc's calculators and content.";
const LAST_UPDATED = "19 Aug 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function TermsOfServicePage() {
  return (
    <UtilityPage title="Terms of Service">
      <p className="text-xs text-muted">Last updated {LAST_UPDATED}</p>

      <p>
        These terms apply to anyone using PaisaCalc. Using the site means
        you accept them. If that doesn&rsquo;t work for you, the only
        recourse is not to use the site — there&rsquo;s no account to
        cancel or subscription to opt out of.
      </p>

      <h2 className="font-serif text-lg text-ink">What PaisaCalc is</h2>
      <p>
        PaisaCalc provides calculators and reference content for personal
        finance, health, math, and everyday use, free of charge. Every
        result is informational, not professional advice — see the{" "}
        <a href="/disclaimer/" className="text-figure hover:underline">
          disclaimer
        </a>{" "}
        for the full explanation of what that means and doesn&rsquo;t mean.
      </p>

      <h2 className="font-serif text-lg text-ink">Eligibility and acceptable use</h2>
      <p>
        PaisaCalc is intended for general use by anyone capable of
        understanding that its results are informational, not
        professional advice; if you&rsquo;re a minor, use it with a
        parent or guardian&rsquo;s involvement for anything that matters
        financially or medically. You agree not to misuse the site —
        attempting to disrupt it, scrape it at a scale that degrades it
        for other visitors, or use it for anything unlawful.
      </p>

      <h2 className="font-serif text-lg text-ink">No warranty</h2>
      <p>
        PaisaCalc is provided &ldquo;as is,&rdquo; without any warranty of
        accuracy, completeness, or fitness for a particular purpose. Rules,
        rates, and formulas are verified as of each calculator&rsquo;s
        stated &ldquo;last verified&rdquo; date, but no guarantee is made
        that a result matches your actual tax liability, loan terms, or any
        other real-world outcome.
      </p>

      <h2 className="font-serif text-lg text-ink">Limitation of liability</h2>
      <p>
        PaisaCalc, and the person who built it, are not liable for any
        loss or damage arising from your use of, or inability to use, this
        site — including decisions made based on a calculator&rsquo;s
        output. This applies to the fullest extent permitted by law.
      </p>

      <h2 className="font-serif text-lg text-ink">Availability</h2>
      <p>
        PaisaCalc is run as a free resource, not a service with an
        uptime guarantee. It may be unavailable, changed, or discontinued
        at any time without notice, though there&rsquo;s no plan to do
        any of that — calculators that ship stay up, and rule updates get
        logged rather than silently changed.
      </p>

      <h2 className="font-serif text-lg text-ink">Content and intellectual property</h2>
      <p>
        The text, formula explanations, design, and code that make up
        PaisaCalc belong to the person who built it, except where a
        calculator explicitly cites an external source (tax slabs, RBI
        rates, and similar official figures, which are public information).
        You&rsquo;re welcome to link to any page on this site. Reproducing
        or republishing PaisaCalc&rsquo;s written content elsewhere without
        permission isn&rsquo;t.
      </p>

      <h2 className="font-serif text-lg text-ink">Third-party links and ads</h2>
      <p>
        Pages on this site may link to third-party resources, and may show
        advertising served by third-party networks such as Google AdSense.
        PaisaCalc doesn&rsquo;t control and isn&rsquo;t responsible for the
        content, accuracy, or practices of any third-party site an ad or
        link leads to. See the{" "}
        <a href="/privacy-policy/" className="text-figure hover:underline">
          privacy policy
        </a>{" "}
        for how advertising cookies work.
      </p>

      <h2 className="font-serif text-lg text-ink">Changes</h2>
      <p>
        Calculators, rules, and these terms may all be updated over time —
        rule changes are logged on the{" "}
        <a href="/changelog/" className="text-figure hover:underline">
          changelog
        </a>
        , and this page&rsquo;s date above changes whenever the terms
        themselves do.
      </p>

      <h2 className="font-serif text-lg text-ink">If one part of these terms doesn&rsquo;t hold up</h2>
      <p>
        If any part of these terms turns out to be unenforceable, the
        rest still stands — only that part is affected. These terms,
        together with the{" "}
        <a href="/disclaimer/" className="text-figure hover:underline">
          disclaimer
        </a>{" "}
        and{" "}
        <a href="/privacy-policy/" className="text-figure hover:underline">
          privacy policy
        </a>
        , are the whole agreement between you and PaisaCalc about using
        the site.
      </p>

      <h2 className="font-serif text-lg text-ink">Governing law</h2>
      <p>These terms are governed by the laws of India.</p>

      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-figure hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </UtilityPage>
  );
}
