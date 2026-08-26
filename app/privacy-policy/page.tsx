import type { Metadata } from "next";
import { UtilityPage } from "@/components/chrome/UtilityPage";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/privacy-policy/`;
const TITLE = "Privacy Policy | PaisaCalc";
const DESCRIPTION = "What PaisaCalc does and doesn't collect, how its privacy-focused analytics works, and how third-party advertising cookies work if you see ads on this site.";
const LAST_UPDATED = "26 Aug 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function PrivacyPolicyPage() {
  return (
    <UtilityPage title="Privacy Policy">
      <p className="text-xs text-muted">Last updated {LAST_UPDATED}</p>

      <p>
        PaisaCalc is a static site: every calculator runs entirely in your
        browser. The numbers you type into a calculator — your income,
        loan amount, salary, or anything else — are never sent to
        PaisaCalc&rsquo;s servers, stored, or logged anywhere. There are no
        user accounts, and nothing you enter into a calculator leaves your
        device.
      </p>

      <p>
        The only personal information PaisaCalc receives directly is
        whatever you choose to put in an email if you write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-figure hover:underline">
          {CONTACT_EMAIL}
        </a>
        , which is used only to reply to you.
      </p>

      <h2 className="font-serif text-lg text-ink">Analytics</h2>
      <p>
        PaisaCalc uses Plausible, a privacy-focused analytics tool, to see
        aggregate traffic — which pages get visited, roughly how much
        traffic the site gets, and which country or device type it comes
        from. Plausible doesn&rsquo;t use cookies, doesn&rsquo;t collect
        any personal data, and doesn&rsquo;t track you individually across
        visits or across other sites &mdash; there&rsquo;s no profile
        being built of you. It exists so this site&rsquo;s traffic can be
        understood in aggregate, not so any one visitor can be identified.
        Read more at{" "}
        <a
          href="https://plausible.io/data-policy"
          className="text-figure hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          plausible.io/data-policy
        </a>
        .
      </p>

      <h2 className="font-serif text-lg text-ink">Cookies and advertising</h2>
      <p>
        PaisaCalc itself does not set tracking cookies. If this site shows
        ads served through Google AdSense, Google and its advertising
        partners may use cookies or similar identifiers to show ads based
        on your visits here and to other sites, and to measure how those
        ads perform. This is standard for any AdSense-supported site and is
        not something PaisaCalc controls directly.
      </p>
      <p>
        You can see and adjust how Google personalises ads at{" "}
        <a
          href="https://adssettings.google.com"
          className="text-figure hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          adssettings.google.com
        </a>
        , and read Google&rsquo;s own explanation of how it uses data from
        sites that use its services at{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          className="text-figure hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/technologies/ads
        </a>
        .
      </p>

      <h2 className="font-serif text-lg text-ink">Calculator links and sharing</h2>
      <p>
        When you change an input on a calculator, the page updates its own
        URL to match (so a loan amount of ₹40,00,000 shows up as a
        parameter in the address bar). This happens entirely in your
        browser — it&rsquo;s what makes the &ldquo;copy link&rdquo; button
        work, by letting a URL carry the exact numbers you entered. It also
        means that link, and your browser&rsquo;s own history, will contain
        whatever values you typed in. Nothing about this is sent to
        PaisaCalc; it&rsquo;s only ever between your browser and its
        address bar.
      </p>

      <h2 className="font-serif text-lg text-ink">Hosting and server logs</h2>
      <p>
        Like any website, PaisaCalc&rsquo;s hosting provider automatically
        logs basic technical information for every request — things like IP
        address, browser type, and the page requested — for security and
        operational purposes. This is standard infrastructure logging, not
        anything PaisaCalc itself collects or reviews about individual
        visitors.
      </p>

      <h2 className="font-serif text-lg text-ink">Links to other sites</h2>
      <p>
        Some pages link out to other sites — official sources for a tax
        rule or an RBI rate, for instance, or (if ads are shown) an
        advertiser&rsquo;s own site. Once you leave PaisaCalc, that
        site&rsquo;s own privacy policy applies, not this one. PaisaCalc
        isn&rsquo;t responsible for how another site handles your data.
      </p>

      <h2 className="font-serif text-lg text-ink">Your choices</h2>
      <p>
        You can block or delete cookies at any time through your
        browser&rsquo;s own settings — doing so may affect how
        personalised any ads on this site are, but won&rsquo;t stop any
        calculator from working, since none of them depend on cookies to
        function. Because PaisaCalc doesn&rsquo;t create accounts or
        store your data on a server in the first place, there&rsquo;s no
        stored profile to request or delete beyond what&rsquo;s already
        described above.
      </p>

      <h2 className="font-serif text-lg text-ink">Children&rsquo;s privacy</h2>
      <p>
        PaisaCalc is not directed at children and does not knowingly
        collect information from anyone under 18.
      </p>

      <h2 className="font-serif text-lg text-ink">Changes to this policy</h2>
      <p>
        If this policy changes — for example, when ads or analytics are
        actually turned on — this page will be updated and the date above
        will change accordingly.
      </p>

      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-figure hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </UtilityPage>
  );
}
