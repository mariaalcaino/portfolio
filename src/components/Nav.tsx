import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";

  return (
    <nav className="site-nav">
      <Link to="/" className={isAbout ? "" : "active"}>
        Works
      </Link>
      <Link to="/about" className={isAbout ? "active" : ""}>
        About
      </Link>
    </nav>
  );
}
