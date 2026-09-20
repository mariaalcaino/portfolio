import { useState } from "react";
import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { getPreviewMedia, projects } from "../data/projects";
import "./home.css";

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Shell>
      <div className="hero">
        <p>Designer / Engineer.</p>
        <p>Currently building @Nuptio.</p>
      </div>

      <div className="work-list-wrap" onMouseLeave={() => setHovered(null)}>
        <ol className="work-list">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/${project.slug}`}
                className={`work-row${hovered && hovered !== project.slug ? " is-dimmed" : ""}`}
                onMouseEnter={() => setHovered(project.slug)}
              >
                <span className="work-name">{project.name}</span>
                <span className="work-category">{project.listCategory}</span>
                <span className="work-dash" aria-hidden="true" />
                <span className="work-years">{project.listYears}</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className={`work-preview${hovered ? " is-active" : ""}`} aria-hidden="true">
          {projects.map((project) => {
            const media = getPreviewMedia(project);
            if (!media) return null;
            const className = `work-preview-img${hovered === project.slug ? " is-visible" : ""}`;
            return media.type === "video" ? (
              <video key={project.slug} src={media.src} className={className} autoPlay muted loop playsInline />
            ) : (
              <img key={project.slug} src={media.src} alt="" className={className} />
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
