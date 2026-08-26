import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Per SEO spec §9: disallow nothing except query-parameter URLs — indexing
// itself is controlled by the noindex meta tag (app/layout.tsx), not by
// blocking crawling here. Blocking crawling would stop Google from ever
// seeing that noindex tag in the first place.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/*?*",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
