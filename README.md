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
- **Media in a stack gallery** (full-width, its own height: zoon, lifeindots, sunsetpredictor, fingerpaint) → add its width / height to `RATIOS` in `src/data/media.ts`. The skeleton holds exactly that much room until the file arrives, so nothing below it jumps; a missing entry gets a 3:2 box.

## Skeleton loading

Anything with the `.sk` class is a placeholder (`src/styles/skeleton.css`): give it `data-ready="true"` once what it stands for has arrived and it fades away. The helpers in `src/components/mediaReady.ts` tell a cell when its picture or poster is in. While the scripts download, `index.html` shows a text-free page skeleton inside `#root` built from the real layout classes; the app replaces it when it mounts. Keep the page skeleton free of web fonts (it is set in a system font on purpose, see the note in `skeleton.css`).

Caching is set in `vercel.json`: `/assets` and `/fonts` are immutable for a year, `/works` is cached for a day (and served stale for a week while it revalidates), so keep new versions of a file under a new name if it must change right away.
