# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Tags on a project page

A project can list `tags` in `src/data/projects.ts` (for example `tags: ["brand", "web", "product"]`); they show as coloured pills in an "Areas" row at the end of the facts (role, year…), with the label on the left like the other rows. The kinds of work are defined in `src/data/tags.ts` (name in English and Spanish, and what each kind means) and their colours in `src/components/Tags.css` (`.work-tag-<key>`; a kind with no colour yet shows grey). To add a new kind, add its key in both places. The page skeleton in `index.html` draws that row with two pills (most projects have one or two); their height (22px) and widths (49 / 60px, the rendered "Brand" and "Product") are copied from the real pills, so re-measure them if the pill's font size, weight or padding changes. The label ("Areas" / "Áreas") is `work.tags` in `src/i18n/strings.ts`.

## Media in `public/works`

Phones and slow connections get lighter copies of the media, so every new asset needs its siblings:

- **Gallery video** `name.mp4` (+ poster `name.jpg`) → also `name-sm.mp4` (960 px wide, about 1 Mbps) and `name-sm.jpg`. The gallery picks the `-sm` files on screens up to 767 px, with data saver, or on 2G/3G; if one is missing it falls back to the full file.
- **Cover on the Home grid** `name.jpg` / `name.png` (or the poster of the first video) → also `name-thumb.jpg` (800 px wide, JPEG ~78). Home falls back to the original if the thumb is missing.
- Videos must be fast-start (`moov` before `mdat`) so they can play while they download.
- **Media in a stack gallery** (full-width, its own height: lifeindots, sunsetpredictor, fingerpaint) → add its width / height to `RATIOS` in `src/data/media.ts`. The skeleton holds exactly that much room until the file arrives, so nothing below it jumps; a missing entry gets a 3:2 box.

## Skeleton loading

Anything with the `.sk` class is a placeholder (`src/styles/skeleton.css`): give it `data-ready="true"` once what it stands for has arrived and it fades away. The helpers in `src/components/mediaReady.ts` tell a cell when its picture or poster is in. While the scripts download, `index.html` shows a text-free page skeleton inside `#root` built from the real layout classes; the app replaces it when it mounts. Keep the page skeleton free of web fonts (it is set in a system font on purpose, see the note in `skeleton.css`).

Caching is set in `vercel.json`: `/assets` and `/fonts` are immutable for a year, `/works` is cached for a day (and served stale for a week while it revalidates), so keep new versions of a file under a new name if it must change right away.

## Language

The site opens in the visitor's browser language: the first of the browser's preferred languages that the site has (`es…` → Spanish, `en…` → English, anything else → English). A choice made with the switch is remembered in `localStorage` (`lang`) and wins over the browser from then on; the automatic choice is never saved, so it keeps following the browser. The rule lives twice, in `src/i18n/LanguageContext.tsx` and in the inline script of `index.html` (which sets `<html lang>` before the app arrives): change both. The HTML a bot or a visitor without JavaScript gets is always English, and so are the tags search engines read.

## SEO and search engines

- **One place for the host.** `SITE_URL` in `src/seo/site.ts` is the only code that knows the address (canonical links, Open Graph URLs, JSON-LD, `sitemap.xml`, `robots.txt`); it reads the `VITE_SITE_URL` variable at build time and falls back to the `*.vercel.app` address. Moving to a custom domain means setting `VITE_SITE_URL` in Vercel, adding a host-scoped permanent redirect from the old `*.vercel.app` host in `vercel.json`, and redeploying. Her real LinkedIn / GitHub addresses go in `SITE.profiles` (they also feed `Person.sameAs`); the footer links still point at the generic linkedin.com / github.com until they are filled in.
- **Every page has its own head.** `vite-plugins/seo.ts` runs after `vite build` and writes one HTML file per route (`/`, `/about`, `/contact` and every non-hidden project in `src/data/projects.ts`) with its own title, description, canonical, robots, Open Graph / Twitter tags, JSON-LD and the page's own text for bots without JavaScript, plus `404.html`, `robots.txt` and `sitemap.xml`. `src/seo/meta.ts` holds the copy (English and Spanish; the Spanish one only shows in the tab, search engines only see English because the language lives in the browser, not in the URL). `SeoHead` keeps the same tags in step while the visitor navigates or switches language. A project with no paragraphs or sections yet is `noindex` and left out of the sitemap; a hidden project or an unknown address is a real 404 (`noindex`).
- **No project pictures in Google.** Everything under `/works` is served with `X-Robots-Tag: noindex` (`vercel.json`) and the pages say `noimageindex, max-image-preview:none, max-video-preview:0`. Do not also `Disallow` `/works` in `robots.txt`: Google could never read the header then. Social previews (LinkedIn, WhatsApp, Slack) still fetch the images.
- **No catch-all rewrite.** Every real page is a file, so unknown addresses get the real 404. A new route in `App.tsx` must also be added to `routes()` in `src/seo/build.ts`, or it will answer 404 on a direct visit.
- After a deploy: `node scripts/verify-seo.mjs https://<host>` (robots, sitemap, titles, canonicals, 404s, headers).

## Contact form

`src/pages/Contact.tsx` posts to `/api/contact` (`api/contact.ts`, a Vercel Function) which sends the message through Resend to the owner's inbox. The secrets live only in Vercel environment variables: `RESEND_API_KEY`, `CONTACT_TO` (and optionally `CONTACT_FROM`, once a domain is verified in Resend). A change to them needs a new deployment. When a send fails the notice ends with a short code (`[not_configured]` = a variable is missing, `[upstream_403]` = Resend refused with that status, `[network]`, `[timeout]`…); the code is meant to be enough to diagnose, because runtime logs on the Hobby plan last only 1 hour (the Resend dashboard logs every call too). The function only accepts JSON posted from the site itself, but anyone can still post to it from a computer: add a rate-limit rule for the path `/api/contact` in Vercel > Firewall (for example 5 requests per minute per IP), otherwise a script can use up Resend's 100 e-mails a day. `vite dev` does not serve `/api`: test the form on a deployment, or mock the request.
