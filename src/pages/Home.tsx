import Shell from "../components/Shell";
import WorkGrid from "../components/WorkGrid";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./home.css";

export default function Home() {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <Shell>
      <div className="hero">
        <p>{t.home.line1}</p>
        <p>
          {t.home.line2Prefix}
          <a href="https://www.tandie.app" target="_blank" rel="noreferrer">
            @Tandie
          </a>
          .
        </p>
      </div>

      <WorkGrid />
    </Shell>
  );
}
