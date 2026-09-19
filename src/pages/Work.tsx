import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import "./work.css";

export default function Work() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) return <Navigate to="/" replace />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="wrap work-page">
      <Link to="/" className="back-link">
        ← Works
      </Link>

      <header className="work-header">
        <h1>{project.name}</h1>
        <p className="work-meta muted mono">
          {project.category} · {project.years}
        </p>
      </header>

      <p className="work-tagline">{project.tagline}</p>

      <div className="work-body">
        {project.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {project.link && (
        <a className="work-external" href={project.link} target="_blank" rel="noreferrer">
          {project.linkLabel ?? project.link} ↗
        </a>
      )}

      <nav className="work-nav" aria-label="More work">
        <Link to={`/work/${prev.slug}`} className="work-nav-link">
          <span className="muted mono">← Prev</span>
          <span>{prev.name}</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="work-nav-link align-end">
          <span className="muted mono">Next →</span>
          <span>{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
