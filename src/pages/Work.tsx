import { Navigate, useParams } from "react-router-dom";
import Shell from "../components/Shell";
import { projects } from "../data/projects";
import "./work.css";

export default function Work() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  const hasCaseStudy = Boolean(project.tagline || project.paragraphs?.length);

  return (
    <Shell mainClassName="work-content">
      <h1 className="work-name">{project.name}</h1>
      {project.detailMeta && <p className="work-meta">{project.detailMeta}</p>}

      {project.tagline && <p className="work-tagline">{project.tagline}</p>}

      {project.paragraphs && project.paragraphs.length > 0 && (
        <div className="work-body">
          {project.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {!hasCaseStudy && <p className="work-soon">Case study coming soon.</p>}

      {project.link && (
        <a className="work-link" href={project.link.href} target="_blank" rel="noreferrer">
          {project.link.label}
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
