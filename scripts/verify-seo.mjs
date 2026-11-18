// Usage: node scripts/verify-seo.mjs https://host [slug-that-must-404]      (no dependencies; Node 20+)
// Vercel adds "X-Robots-Tag: noindex" to preview deployments AND to any deployment opened by its unique URL (also a staged production one),
// so run it with PREVIEW=1 there. A deployment behind Vercel Authentication needs VERCEL_AUTOMATION_BYPASS_SECRET=<secret> (project settings > Deployment Protection).
const base = (process.argv[2] ?? "http://localhost:4173").replace(/\/$/, "");
const hidden = process.argv[3] ?? "josefinaconlledo"; // a slug that must NOT exist
let failures = 0;
const check = (ok, label, extra = "") => { if (!ok) failures++; console.log(`${ok ? "ok  " : "FAIL"} ${label}${extra ? "  " + extra : ""}`); };
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const get = async (path, init = {}) => { const r = await fetch(base + path, { redirect: "manual", ...init, headers: { ...(bypass ? { "x-vercel-protection-bypass": bypass } : {}), ...(init.headers ?? {}) } }); return { r, text: await r.text() }; };
const tag = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
// The policy to check: closed to search engines (SEARCH_INDEXING = false in src/seo/site.ts: the default here) or open (INDEXING=on).
const indexing = process.env.INDEXING === "on";
const local = base.startsWith("http://localhost");

if (indexing) {
// robots.txt
const robots = await get("/robots.txt");
check(robots.r.status === 200 && /text\/plain/.test(robots.r.headers.get("content-type")), "robots.txt is 200 text/plain");
check(/^Sitemap:\s*https?:\/\/\S+\/sitemap\.xml$/m.test(robots.text), "robots.txt names the sitemap (absolute URL)");
check(!/^Disallow:\s*\/\s*$/m.test(robots.text), "robots.txt does not block the whole site");

// sitemap.xml
const sm = await get("/sitemap.xml");
check(sm.r.status === 200 && /xml/.test(sm.r.headers.get("content-type")), "sitemap.xml is 200 and XML");
const locs = tag(sm.text, /<loc>([^<]+)<\/loc>/g);
check(locs.length > 3, `sitemap has ${locs.length} URLs`);
check(sm.text.startsWith("<?xml") && sm.text.trimEnd().endsWith("</urlset>") && (sm.text.match(/<url>/g) || []).length === locs.length, "sitemap is well-formed (balanced <url>/<loc>)");
check(locs.every((u) => /^https:\/\//.test(u) && new URL(u).host === new URL(locs[0]).host), "all sitemap URLs are absolute https on one host");

// every sitemap URL: raw HTML (what a bot that does not run JS gets)
for (const loc of locs) {
  const path = new URL(loc).pathname;
  const { r, text } = await get(path);
  const titles = tag(text, /<title>([^<]*)<\/title>/g);
  const canon = tag(text, /<link rel="canonical"[^>]*href="([^"]+)"/g);
  const robotsMeta = tag(text, /<meta name="robots" content="([^"]+)"/g);
  const desc = tag(text, /<meta name="description" content="([^"]+)"/g);
  const ld = tag(text, /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);
  const ok = r.status === 200 && titles.length === 1 && canon.length === 1 && canon[0] === loc && desc.length === 1 && robotsMeta.length === 1 && !/noindex/.test(robotsMeta[0]);
  check(ok, `${path || "/"}`, `title="${titles[0]}" canonical=${canon[0] === loc ? "self" : canon[0]}`);
  check(desc[0]?.length >= 70 && desc[0].length <= 175, `${path || "/"} description length ${desc[0]?.length}`);
  for (const j of ld) { try { JSON.parse(j); } catch { check(false, `${path} JSON-LD parses`); } }
  check(/<h1[^>]*>[^<]+<\/h1>/.test(text.split("<!--seo-body:start-->")[1] ?? ""), `${path || "/"} has an <h1> with text in the raw HTML`);
}
// titles and descriptions must be unique
// (collected above only for display; recheck quickly)
const seen = new Map();
for (const loc of locs) { const t = tag((await get(new URL(loc).pathname)).text, /<title>([^<]*)<\/title>/g)[0]; seen.set(t, (seen.get(t) ?? 0) + 1); }
check([...seen.values()].every((n) => n === 1), "titles are unique across the sitemap");

} else {
  // closed: robots.txt still allows crawling (so the noindex can be read) and names no sitemap; there is no sitemap; every page and file says noindex
  const robots = await get("/robots.txt");
  check(robots.r.status === 200 && /text\/plain/.test(robots.r.headers.get("content-type")), "robots.txt is 200 text/plain");
  check(!/^Sitemap:/mi.test(robots.text), "robots.txt names no sitemap (the site is closed to search engines)");
  check(!/^Disallow:\s*\/\s*$/m.test(robots.text), "robots.txt still ALLOWS crawling (a crawler has to be able to read the noindex)");
  const sm = await get("/sitemap.xml");
  check(sm.r.status === 404, "there is no sitemap.xml", `status ${sm.r.status}`);
  const home = await get("/");
  const paths = ["/", "/about", "/contact", ...tag(home.text.split("<!--seo-body:start-->")[1] ?? "", /href="(\/[a-z0-9-]+)"/g)].filter((p, i, all) => all.indexOf(p) === i);
  check(paths.length >= 6, `${paths.length} pages found to check (home, about, contact and the projects linked from the home page)`);
  const CLOSED = ["noindex", "nofollow", "noarchive", "nosnippet", "noimageindex"];
  for (const path of paths) {
    const { r, text } = await get(path);
    const robotsMeta = tag(text, /<meta name="robots" content="([^"]+)"/g);
    check(r.status === 200 && robotsMeta.length === 1 && CLOSED.every((d) => robotsMeta[0].split(/,\s*/).includes(d)), `${path} says "${robotsMeta[0]}"`);
    check(!/<link rel="canonical"/.test(text) && !/application\/ld\+json/.test(text) && !/property="og:url"/.test(text), `${path} has no canonical, og:url or JSON-LD`);
    if (!local) check(/noindex/.test(r.headers.get("x-robots-tag") ?? ""), `${path} has X-Robots-Tag: noindex`, r.headers.get("x-robots-tag") ?? "(none)");
  }
  if (!local) {
    const script = tag(home.text, /src="(\/assets\/[^"]+\.js)"/g)[0];
    for (const path of [script, "/robots.txt", "/works/zoon-10-thumb.jpg", "/works/zoon-10.mp4", "/this-does-not-exist"].filter(Boolean)) {
      const { r } = await get(path, { headers: { Range: "bytes=0-1" } });
      check(/noindex/.test(r.headers.get("x-robots-tag") ?? ""), `${path} has X-Robots-Tag: noindex`, r.headers.get("x-robots-tag") ?? "(none)");
    }
  }
}
// real 404s
for (const path of ["/this-does-not-exist", `/${hidden}`, "/a/b", "/works/missing-file.jpg"]) {
  const { r, text } = await get(path);
  check(r.status === 404, `${path} is a real 404`, `status ${r.status}`);
  if (!path.startsWith("/works")) check(/noindex/.test(text), `${path} 404 page says noindex`);
}
// trailing slash is one URL, not two
const slash = await get("/about/");
check([301, 308].includes(slash.r.status) && slash.r.headers.get("location") === "/about", "/about/ redirects to /about", `status ${slash.r.status}`);
// media is kept out of Google (only meaningful against the Vercel deployment: the header comes from vercel.json)
if (!local && indexing) {
  for (const path of ["/works/zoon-10-thumb.jpg", "/works/zoon-10.mp4"]) {
    const { r } = await get(path, { headers: { Range: "bytes=0-1" } });
    check(/noindex/.test(r.headers.get("x-robots-tag") ?? ""), `${path} has X-Robots-Tag: noindex`, r.headers.get("x-robots-tag") ?? "(none)");
  }
  if (process.env.PREVIEW !== "1") {
    const h = await get("/");
    check(!/noindex/.test(h.r.headers.get("x-robots-tag") ?? ""), "pages themselves have no X-Robots-Tag: noindex");
  }
}
// the contact function (a Vercel deployment only): GET must answer 405 JSON, never the page; HTML pages are revalidated
if (!base.startsWith("http://localhost")) {
  const fn = await get("/api/contact");
  check(fn.r.status === 405 && /json/.test(fn.r.headers.get("content-type") ?? "") && fn.r.headers.get("cache-control") === "no-store", "GET /api/contact is a 405 JSON function reply", `status ${fn.r.status}`);
  const page = await get("/about");
  check(/must-revalidate/.test(page.r.headers.get("cache-control") ?? ""), "HTML pages are always revalidated", page.r.headers.get("cache-control") ?? "(none)");
}
console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
