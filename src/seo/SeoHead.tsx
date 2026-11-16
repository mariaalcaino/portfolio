import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { headFor } from "./meta";
import { applyHead } from "./tags";

/** Renders nothing: keeps <title>, description, canonical, robots and Open Graph in step with the page and the language. */
export default function SeoHead() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  useEffect(() => {
    applyHead(headFor(pathname, lang).head);
  }, [pathname, lang]);
  return null;
}
