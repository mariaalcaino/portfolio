import type { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import Shell from "../components/Shell";
import { pick, projects } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./work.css";

// Paragraphs are plain strings; "[text](https://…)" becomes an inline link.
const INLINE_LINK = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/;
const withLinks = (text: string): ReactNode[] =>
  text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((part, i) => {
    const match = INLINE_LINK.exec(part);
    return match ? (
      <a key={i} href={match[2]} target="_blank" rel="noreferrer">
        {match[1]}
      </a>
    ) : (
      part
    );
  });

export default function Work() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { lang } = useLang();
  const t = useStrings(lang);

  if (!project) return <Navigate to="/" replace />;

  const detailMeta = pick(project.detailMeta, lang);
  const paragraphs = pick(project.paragraphs, lang);
  const sections = pick(project.sections, lang);
  const gallery =
    project.images.length > 0 ? (
      <Gallery key={project.slug} images={project.images} name={project.name} layout={project.galleryLayout} />
    ) : null;
  const hasCaseStudy = Boolean(paragraphs?.length || sections?.length);
  const facts =
    project.facts && project.facts.length > 0 ? (
      <dl className="work-facts">
        {project.facts.map((fact) => (
          <div key={fact.label.en} className="work-fact">
            <dt>{fact.label[lang]}</dt>
            <dd>{fact.value[lang]}</dd>
          </div>
        ))}
      </dl>
    ) : null;

  return (
    <Shell mainClassName="work-content">
      <h1 className="work-name">{project.title ?? project.name}</h1>
      {detailMeta && <p className="work-meta">{detailMeta}</p>}

      {facts}

      {gallery}

      {paragraphs && paragraphs.length > 0 && (
        <div className="work-body">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{withLinks(paragraph)}</p>
          ))}
        </div>
      )}

      {sections?.map((section) => (
        <section key={section.heading} className="work-section">
          <h2 className="work-heading">{section.heading}</h2>
          <div className="work-body">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{withLinks(paragraph)}</p>
            ))}
          </div>
        </section>
      ))}

      {!hasCaseStudy && <p className="work-soon">{t.work.caseStudySoon}</p>}

      {project.links && project.links.length > 0 && (
        <div className="work-links">
          {project.links.map((link) => (
            <a key={link.href} className="work-link" href={link.href} target="_blank" rel="noreferrer">
              {pick(link.label, lang)}
            </a>
          ))}
        </div>
      )}
    </Shell>
  );
}
