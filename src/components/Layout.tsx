import { Link, NavLink, Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link to="/" className="brand">
            María Ignacia Alcaíno<span className="brand-mark">*</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Works
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
            <a href="mailto:hello@mariaalcaino.com">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div className="footer-col">
            <p>2026 © María Alcaíno</p>
            <p className="muted">All rights reserved.</p>
          </div>
          <div className="footer-col">
            <a href="mailto:hello@mariaalcaino.com">Contact</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="footer-col">
            <p>The Studio — Santiago, Chile.</p>
            <a href="mailto:hello@mariaalcaino.com">Book a visit →</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
