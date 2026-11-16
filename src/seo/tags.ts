/** One head tag, described as data so the build (a string) and the browser (the DOM) write exactly the same ones. */
export type HeadTag =
  | { kind: "meta"; attr: "name" | "property"; key: string; content: string }
  | { kind: "link"; rel: string; href: string; hreflang?: string }
  | { kind: "jsonld"; json: unknown };

export type Head = { title: string; tags: HeadTag[] };

const esc = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Every tag we manage carries data-seo, so the browser can swap them on navigation without touching anything else. */
export function renderHead(head: Head): string {
  const lines = [`<title>${esc(head.title)}</title>`];
  for (const tag of head.tags) {
    if (tag.kind === "meta") {
      lines.push(`<meta ${tag.attr}="${esc(tag.key)}" content="${esc(tag.content)}" data-seo />`);
    } else if (tag.kind === "link") {
      const lang = tag.hreflang ? ` hreflang="${esc(tag.hreflang)}"` : "";
      lines.push(`<link rel="${esc(tag.rel)}"${lang} href="${esc(tag.href)}" data-seo />`);
    } else {
      // "<" is escaped so nothing inside the data can close the script element
      lines.push(`<script type="application/ld+json" data-seo>${JSON.stringify(tag.json).replace(/</g, "\\u003c")}</script>`);
    }
  }
  return lines.join("\n    ");
}

/** Browser side: replace the managed tags with the new page's. */
export function applyHead(head: Head) {
  document.title = head.title;
  document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove());
  for (const tag of head.tags) {
    const node =
      tag.kind === "meta"
        ? Object.assign(document.createElement("meta"), { content: tag.content })
        : tag.kind === "link"
          ? Object.assign(document.createElement("link"), { rel: tag.rel, href: tag.href })
          : Object.assign(document.createElement("script"), { type: "application/ld+json", textContent: JSON.stringify(tag.json) });
    if (tag.kind === "meta") node.setAttribute(tag.attr, tag.key);
    if (tag.kind === "link" && tag.hreflang) node.setAttribute("hreflang", tag.hreflang);
    node.setAttribute("data-seo", "");
    document.head.appendChild(node);
  }
}
