import { Navigate, useParams } from "react-router-dom";
import Brand from "../components/Brand";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { projects } from "../data/projects";
import "./work.css";

export default function Work() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="page">
      <header className="page-header">
        <Brand />
        <Nav />
      </header>

      <main className="page-content work-content">
        <h1 className="work-name">{project.name}</h1>
        <p className="work-meta">{project.detailMeta}</p>

        <p className="work-tagline">{project.tagline}</p>

        <div className="work-body">
          {project.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

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
      </main>

      <Footer variant="stack" />
    </div>
  );
}
