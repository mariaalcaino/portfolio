import { getPreviewMedia, pick, posterOf, projects, type Project } from "../data/projects";
import { thumbOf } from "../data/media";
import type { Lang } from "../i18n/LanguageContext";
import { abs, SITE } from "./site";
import type { Head, HeadTag } from "./tags";

export type PageKind = "home" | "about" | "contact" | "work" | "notfound";
export type Page = { kind: PageKind; path: string; project?: Project };

const COPY = {
  en: {
    home: {
      title: `${SITE.name} — Product Designer & Design Engineer`,
      description:
        "María Alcaíno is a product designer and design engineer who defines, designs and builds digital products for SaaS, B2B marketplaces and loyalty platforms.",
    },
    about: {
      title: `About — ${SITE.name}, Product Designer & Design Engineer`,
      description:
        "María Alcaíno is a Design Engineer building and evolving digital products across SaaS, B2B marketplaces and loyalty platforms, from product definition to development.",
    },
    contact: {
      title: `Contact — ${SITE.name}`,
      description:
        "Get in touch with María Alcaíno about product design, design engineering or a new project.",
    },
    notfound: { title: `Page not found — ${SITE.name}`, description: "This page does not exist." },
    locale: "en_US",
  },
  es: {
    home: {
      title: `${SITE.name} — Product Designer · Diseñadora de producto`,
      description:
        "María Alcaíno, diseñadora de producto e ingeniera en diseño (Design Engineer): define, diseña y construye productos digitales para SaaS, marketplaces B2B y plataformas de fidelización.",
    },
    about: {
      title: `Acerca de — ${SITE.name}, Product Designer`,
      description:
        "María Alcaíno es Ingeniera en Diseño: construye y hace evolucionar productos digitales en SaaS, marketplaces B2B y plataformas de fidelización.",
    },
    contact: {
      title: `Contacto — ${SITE.name}`,
      description:
        "Escríbele a María Alcaíno para hablar de diseño de producto, ingeniería en diseño o un nuevo proyecto.",
    },
    notfound: { title: `Página no encontrada — ${SITE.name}`, description: "Esta página no existe." },
    locale: "es_CL",
  },
} as const;

/** Which page a URL path is. Anything that is not a known page (or is a hidden project) is "notfound". */
export function pageFor(pathname: string): Page {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { kind: "home", path };
  if (path === "/about") return { kind: "about", path };
  if (path === "/contact") return { kind: "contact", path };
  const project = projects.find((p) => `/${p.slug}` === path); // `projects` already leaves out the hidden ones
  return project ? { kind: "work", path, project } : { kind: "notfound", path };
}

/** A project with no case study yet ("Case study coming soon") is a thin page: it stays out of the index and the sitemap. */
export const isThin = (project: Project) => !(project.paragraphs?.en.some((text) => text.trim()) || project.sections?.en.length);

const stripLinks = (text: string) => text.replace(/\[([^\]]+)\]\(https?:\/\/[^)\s]+\)/g, "$1");

/** "Category. First sentence(s) of the case study", as many whole sentences as fit in about 155 characters. */
function describeProject(project: Project, lang: Lang) {
  const category = pick(project.listCategory, lang) ?? pick(project.detailMeta, lang) ?? "";
  const first = pick(project.paragraphs, lang)?.[0] ?? "";
  const max = 158;
  let out = category ? `${category}. ` : "";
  let added = 0;
  // one sentence per piece, split after ". ", "! " or "? " (no regex lookbehind: it is a syntax error in Safari before 16.4, and this file ships to the browser)
  for (const sentence of stripLinks(first).replace(/([.!?])\s+/g, "$1\u0000").split("\u0000").filter(Boolean)) {
    if (added > 0 && (out + sentence).length > max) break;
    if (added === 0 && (out + sentence).length > max) {
      out = `${(out + sentence).slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
      added++;
      break;
    }
    out += `${sentence} `;
    added++;
  }
  return out.trim() || `${project.title ?? project.name}, a project by ${SITE.name}.`;
}

function projectTitle(project: Project, lang: Lang) {
  const name = project.title ?? project.name;
  const category = pick(project.listCategory, lang) ?? pick(project.detailMeta, lang);
  const long = category ? `${name} — ${category} | ${SITE.name}` : "";
  return long && long.length <= 62 ? long : `${name} | ${SITE.name}`;
}

function projectImage(project: Project): string | null {
  const media = getPreviewMedia(project);
  if (!media) return null;
  return media.type === "video" ? posterOf(media.src) : thumbOf(media.src);
}

const sameAs = Object.values(SITE.profiles).filter(Boolean);

const person = {
  "@type": "Person",
  "@id": abs("/#person"),
  name: SITE.fullName,
  alternateName: [SITE.name, ...SITE.alternateNames],
  jobTitle: SITE.jobTitle,
  url: abs("/"),
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

function jsonLd(page: Page, lang: Lang): unknown[] {
  if (page.kind === "home") {
    return [
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", "@id": abs("/#website"), name: SITE.name, alternateName: [SITE.fullName], url: abs("/"), inLanguage: lang },
          person,
        ],
      },
    ];
  }
  if (page.kind === "about") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: abs("/about"),
        mainEntity: {
          ...person,
          // only what the About page itself shows
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "Universidad Adolfo Ibáñez" },
            { "@type": "CollegeOrUniversity", name: "Pontificia Universidad Católica de Chile" },
          ],
        },
      },
    ];
  }
  return [];
}

/** Everything the head of a page needs. `indexable` is false for pages that must stay out of Google. */
export function headFor(pathname: string, lang: Lang): { page: Page; indexable: boolean; head: Head } {
  const page = pageFor(pathname);
  const copy = COPY[lang];
  let title: string;
  let description: string;
  let image: string | null = SITE.shareImage || null;
  let indexable = true;

  if (page.kind === "work" && page.project) {
    title = projectTitle(page.project, lang);
    description = describeProject(page.project, lang);
    image = projectImage(page.project) ?? image;
    indexable = !isThin(page.project);
  } else {
    const key = page.kind === "work" ? "notfound" : page.kind; // "work" without a project cannot happen
    ({ title, description } = copy[key]);
    indexable = key !== "notfound";
  }

  const tags: HeadTag[] = [
    { kind: "meta", attr: "name", key: "description", content: description },
    {
      kind: "meta",
      attr: "name",
      key: "robots",
      // noimageindex / max-image-preview:none / max-video-preview:0: no pictures or video previews of the work in Google (the files also carry X-Robots-Tag: noindex)
      content: indexable ? "index, follow, noimageindex, max-image-preview:none, max-video-preview:0" : "noindex, follow",
    },
  ];
  if (indexable) tags.push({ kind: "link", rel: "canonical", href: abs(page.path) });

  tags.push(
    { kind: "meta", attr: "property", key: "og:site_name", content: SITE.name },
    { kind: "meta", attr: "property", key: "og:type", content: "website" },
    { kind: "meta", attr: "property", key: "og:locale", content: copy.locale },
    { kind: "meta", attr: "property", key: "og:title", content: title },
    { kind: "meta", attr: "property", key: "og:description", content: description },
  );
  if (indexable) tags.push({ kind: "meta", attr: "property", key: "og:url", content: abs(page.path) });
  if (image) {
    tags.push(
      { kind: "meta", attr: "property", key: "og:image", content: abs(image) },
      { kind: "meta", attr: "name", key: "twitter:card", content: "summary_large_image" },
      { kind: "meta", attr: "name", key: "twitter:image", content: abs(image) },
    );
  } else {
    tags.push({ kind: "meta", attr: "name", key: "twitter:card", content: "summary" });
  }
  tags.push({ kind: "meta", attr: "name", key: "twitter:title", content: title }, { kind: "meta", attr: "name", key: "twitter:description", content: description });

  if (indexable) for (const json of jsonLd(page, lang)) tags.push({ kind: "jsonld", json });

  return { page, indexable, head: { title, tags } };
}
