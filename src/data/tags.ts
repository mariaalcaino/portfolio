/*
 * The kinds of work a project can be tagged with. They show as coloured pills in the last row of the project's facts,
 * labelled "Areas" (components/Tags.tsx), in the order they are listed in the project's `tags`. The lists are written in
 * the order below, so the colours follow the same sequence on every page.
 *
 * The names are English in both languages on purpose: they are the keywords recruiters search for, so the Spanish
 * version keeps them as they are (the same goes for the role in each project's facts).
 *
 * What each kind means, so the tagging stays consistent:
 * - brand:   I created the identity (not just applied an existing one).
 * - web:     a website is part of the work: a marketing or campaign site, or the web experience of a product (landing,
 *            marketplace, RSVP pages).
 * - product: an application or service people keep using (SaaS, apps, loyalty programs), even when it runs in a browser.
 * - code:    I wrote the implementation.
 * - data:    data or information visualisation (including technical infographics).
 *
 * To add a kind: give it a name here and a colour in components/Tags.css (`.work-tag-<key>`, grey until it has one),
 * then list it in a project's `tags`.
 */
export const TAGS = {
  brand: "Brand",
  web: "Web",
  product: "Product",
  code: "Code",
  data: "Data",
} as const satisfies Record<string, string>;

export type Tag = keyof typeof TAGS;
