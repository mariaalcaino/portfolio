import { Navigate, useParams } from "react-router-dom";
import Shell from "../components/Shell";
import { pick, projects } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./work.css";

export default function Work() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { lang } = useLang();
  const t = useStrings(lang);

  if (!project) return <Navigate to="/" replace />;

  const detailMeta = pick(project.detailMeta, lang);
  const tagline = pick(project.tagline, lang);
  const paragraphs = pick(project.paragraphs, lang);
  const linkLabel = pick(project.link?.label, lang);
  const hasCaseStudy = Boolean(tagline || paragraphs?.length);

  return (
    <Shell mainClassName="work-content">
      <h1 className="work-name">{project.name}</h1>
      {detailMeta && <p className="work-meta">{detailMeta}</p>}

      {tagline && <p className="work-tagline">{tagline}</p>}

      {paragraphs && paragraphs.length > 0 && (
        <div className="work-body">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {!hasCaseStudy && <p className="work-soon">{t.work.caseStudySoon}</p>}

      {project.link && (
        <a className="work-link" href={project.link.href} target="_blank" rel="noreferrer">
          {linkLabel}
        </a>
      )}

      {project.images.length > 0 && (
        <div className="work-gallery">
          {project.images.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
      )}
    </Shell>
  );
}
