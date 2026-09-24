import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";

export default function NotFound() {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <p className="mono muted" style={{ marginBottom: 8 }}>
        404
      </p>
      <h1 style={{ fontSize: 32, margin: "0 0 24px" }}>{t.notFound.title}</h1>
      <Link to="/" style={{ borderBottom: "1px solid currentColor" }}>
        {t.notFound.back}
      </Link>
    </section>
  );
}
