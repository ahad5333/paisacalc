import type { Metadata } from "next";
import { UtilityPage } from "@/components/chrome/UtilityPage";
import { CHANGELOG_ENTRIES } from "@/lib/changelog";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/changelog/`;
const TITLE = "Changelog | PaisaCalc";
const DESCRIPTION = "Every rule update and calculator launch on PaisaCalc, dated.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function ChangelogPage() {
  return (
    <UtilityPage title="Changelog">
      <p>
        Every calculator launch and every rule update, dated. If a
        figure you relied on changes here, it&rsquo;s because a Budget
        announcement, a Finance Act, or a CBDT notification actually
        changed the underlying rule — not because of an unannounced
        correction.
      </p>
      <div className="mt-2 flex flex-col gap-6">
        {CHANGELOG_ENTRIES.map((entry) => (
          <div key={entry.title} className="border-t border-rule pt-4 first:border-0 first:pt-0">
            <p className="font-mono text-xs text-muted">{entry.date}</p>
            <p className="mt-1 font-medium text-ink">{entry.title}</p>
            <p className="mt-1 text-muted">{entry.body}</p>
          </div>
        ))}
      </div>
    </UtilityPage>
  );
}
