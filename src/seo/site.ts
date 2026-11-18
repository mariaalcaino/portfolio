/**
 * Where the site lives and who it is about: the one place the SEO code (head tags, sitemap, robots.txt) reads from.
 * The host comes from the VITE_SITE_URL variable at build time (Vercel > Settings > Environment Variables), so moving to a
 * custom domain is: set it to the new address, add the redirect from the old *.vercel.app host (see README, "SEO"), redeploy.
 * Without it the production alias below is used.
 */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || "https://portfolio-five-eosin-56.vercel.app").replace(/\/+$/, "");

/**
 * Search engines. FALSE = nothing of this site may show up in a search engine: every page says `noindex` (meta tag here and the
 * X-Robots-Tag header in vercel.json), and there is no sitemap, no canonical link and no structured data.
 * robots.txt must keep ALLOWING crawling: a crawler that cannot fetch a page never sees its noindex (and pages that are already
 * listed would stay listed).
 * To open the site to Google again: set this to true, take the site-wide X-Robots-Tag rule out of vercel.json (keep the /works one)
 * and redeploy (README, "SEO and search engines").
 */
export const SEARCH_INDEXING = false;

export const SITE = {
  name: "María Alcaíno",
  fullName: "María Ignacia Alcaíno",
  /** The same names without accents: what people type. */
  alternateNames: ["Maria Alcaino", "Maria Ignacia Alcaino"],
  jobTitle: "Product Designer & Design Engineer",
  /** A 1200×630 share card inside public/works (that folder is sent with X-Robots-Tag: noindex, so it stays out of Google Images). "" = none yet. */
  shareImage: "",
  /** Her real profile URLs. Empty until she gives them: an empty one is simply not listed in Person.sameAs. (The footer links still go to the generic linkedin.com / github.com home pages until the real addresses are known.) */
  profiles: { linkedin: "", github: "" } as Record<"linkedin" | "github", string>,
};

/** Absolute URL of a path on this site ("/" → "https://host/", "/about" → "https://host/about"). */
export const abs = (path: string) => `${SITE_URL}${path}`;
