import { Link, useLocation } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./Nav.css";

export default function Nav() {
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <nav className="site-nav">
      <Link to="/" className={isAbout ? "" : "active"}>
        {t.nav.works}
      </Link>
      <Link to="/about" className={isAbout ? "active" : ""}>
        {t.nav.about}
      </Link>
    </nav>
  );
}
