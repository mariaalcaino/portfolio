/**
 * Build-time entry: vite-plugins/seo.ts loads this file and writes the results into dist/.
 * Everything here is plain TypeScript (no React, no DOM), so it also runs in Node.
 */
import { projects } from "../data/projects";
import { strings } from "../i18n/strings";
import { headFor, isThin, pageFor } from "./meta";
import { abs } from "./site";
import { renderHead } from "./tags";

const esc = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const plain = (text: string) => text.replace(/\[([^\]]+)\]\(https?:\/\/[^)\s]+\)/g, "$1");

/** Every real page (the hidden projects are not in `projects`, so they are not here). */
const RESERVED = new Set(["about", "contact", "assets", "works", "fonts", "api", "404", "index.html", "robots.txt", "sitemap.xml"]);

export const routes = (): string[] => {
  const slugs = projects.map((p) => p.slug);
  const bad = slugs.filter((slug, i) => slugs.indexOf(slug) !== i || RESERVED.has(slug) || !/^[a-z0-9-]+$/.test(slug));
  if (bad.length > 0) throw new Error(`seo: these project slugs are duplicated, reserved or not plain lowercase: ${bad.join(", ")}`);
  return ["/", "/about", "/contact", ...slugs.map((slug) => `/${slug}`)];
};

export const headHtmlFor = (path: string) => renderHead(headFor(path, "en").head);

/** What a visitor without JavaScript (and a bot that does not run it) gets in place of the app: the page's own text. */
export function bodyHtmlFor(path: string): string {
  const page = pageFor(path);
  const { head } = headFor(path, "en");
  let inner = "";
  if (page.kind === "home") {
    inner =
      `<h1>${esc(head.title)}</h1><p>${esc(strings.en.home.line1)}</p>` +
      `<ul>${projects.map((p) => `<li><a href="/${p.slug}">${esc(p.title ?? p.name)}</a></li>`).join("")}</ul>` +
      `<p><a href="/about">${esc(strings.en.nav.about)}</a> · <a href="/contact">${esc(strings.en.nav.contact)}</a></p>`;
  } else if (page.kind === "about") {
    inner = `<h1>${esc(strings.en.about.title)}</h1><p>${esc(strings.en.about.body)}</p>`;
  } else if (page.kind === "contact") {
    inner = `<h1>${esc(strings.en.contactPage.title)}</h1><p><a href="mailto:hello@mariaalcaino.com">hello@mariaalcaino.com</a></p>`;
  } else if (page.kind === "work" && page.project) {
    const p = page.project;
    inner =
      `<h1>${esc(p.title ?? p.name)}</h1>` +
      (p.paragraphs?.en ?? []).map((text) => `<p>${esc(plain(text))}</p>`).join("") +
      `<p><a href="/">${esc(strings.en.nav.works)}</a></p>`;
  } else {
    inner = `<h1>${esc(strings.en.notFound.title)}</h1><p><a href="/">${esc(strings.en.notFound.back)}</a></p>`;
  }
  // always English (the build has one language), whatever <html lang> says once the inline script in index.html has run
  return `<div class="visually-hidden" lang="en" data-seo-static>${inner}</div>`;
}

export const notFoundPage = () => ({ head: headHtmlFor("/__not-found__"), body: bodyHtmlFor("/__not-found__") });

export function sitemapXml(): string {
  const paths = ["/", "/about", "/contact", ...projects.filter((p) => !isThin(p)).map((p) => `/${p.slug}`)];
  const urls = paths.map((path) => `  <url><loc>${esc(abs(path))}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`;
