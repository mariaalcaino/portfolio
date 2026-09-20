import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { projects } from "../data/projects";
import "./home.css";

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="home-shell">
      <aside className="sidebar">
        <Brand />
        <Nav />
        <div className="sidebar-contact">
          <p className="contact-label">Contact</p>
          <a href="mailto:hello@mariaalcaino.com">hello@mariaalcaino.com</a>
        </div>
      </aside>

      <div className="home-content">
        <div className="home-main">
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

            <div className="work-preview" aria-hidden="true">
              {projects.map(
                (project) =>
                  project.images[0] && (
                    <img
                      key={project.slug}
                      src={project.images[0]}
                      alt=""
                      className={`work-preview-img${hovered === project.slug ? " is-visible" : ""}`}
                    />
                  ),
              )}
            </div>
          </div>
        </div>

        <Footer variant="spread" className="footer-wide" />
        <Footer variant="stack" className="footer-narrow" />
      </div>
    </div>
  );
}
