import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import "./home.css";

export default function Home() {
  return (
    <section className="wrap home">
      <div className="hero">
        <p className="hero-role">Product Designer / Design Engineer.</p>
        <p className="hero-status">
          <span className="dot" /> Currently building @Nuptio.
        </p>
      </div>

      <ol className="work-list">
        {projects.map((project, i) => (
          <li key={project.slug} className="work-row">
            <Link to={`/work/${project.slug}`} className="work-link">
              <span className="work-index mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-name">{project.name}</span>
              <span className="work-category muted">{project.category}</span>
              <span className="work-years mono muted">{project.years}</span>
              <span className="work-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="hero-note muted">
        Open to selected projects — product design, design systems, creative strategy and research.
      </p>
    </section>
  );
}
