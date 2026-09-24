import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./LangSwitch.css";

export default function LangSwitch() {
  const { lang, setLang } = useLang();
  const t = useStrings(lang);

  return (
    <div className="lang-switch" role="group" aria-label={t.langSwitch.label}>
      <button
        type="button"
        className={lang === "en" ? "active" : ""}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="lang-switch-sep">/</span>
      <button
        type="button"
        className={lang === "es" ? "active" : ""}
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
      >
        ES
      </button>
    </div>
  );
}
