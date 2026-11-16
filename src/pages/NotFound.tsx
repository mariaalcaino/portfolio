import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./notfound.css";

// Shown for an address that is not a page (and for a hidden project). The server answers it with a real 404 (404.html)
// and the head says "noindex" (see src/seo/meta.ts), so it never ends up in Google.
export default function NotFound() {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <Shell mainClassName="notfound-content">
      <h1 className="notfound-title">{t.notFound.title}</h1>
      <p>
        <Link to="/">{t.notFound.back}</Link>
      </p>
    </Shell>
  );
}
