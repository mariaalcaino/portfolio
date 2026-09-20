import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { projects } from "../data/projects";
import "./home.css";

export default function Home() {
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

          <ol className="work-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={`/${project.slug}`} className="work-row">
                  <span className="work-name">{project.name}</span>
                  <span className="work-category">{project.listCategory}</span>
                  <span className="work-dash" aria-hidden="true" />
                  <span className="work-years">{project.listYears}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <Footer variant="spread" className="footer-wide" />
        <Footer variant="stack" className="footer-narrow" />
      </div>
    </div>
  );
}
