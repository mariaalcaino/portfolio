import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { getPreviewMedia, projects } from "../data/projects";
import "./home.css";

export default function Home() {
  return (
    <Shell>
      <div className="hero">
        <p>Designer / Engineer.</p>
        <p>Currently building @Nuptio.</p>
      </div>

      <ol className="work-grid">
        {projects.map((project) => {
          const media = getPreviewMedia(project);
          const meta = project.listCategory;
          return (
            <li key={project.slug} className="work-card">
              <Link to={`/${project.slug}`}>
                <p className="work-card-name">{project.name}</p>
                <div className="work-card-thumb">
                  {media &&
                    (media.type === "video" ? (
                      <video src={media.src} autoPlay muted loop playsInline />
                    ) : (
                      <img src={media.src} alt="" loading="lazy" />
                    ))}
                </div>
                {meta && <p className="work-card-meta">{meta}</p>}
              </Link>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}
