import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

const STORAGE_KEY = "lang";

// The first language in the browser's list of preferred languages that the site has, in the visitor's own order
// (["fr-FR", "es-CL", "en"] → Spanish, ["en-US", "es"] → English). Nothing in the list that the site has → English.
function browserLang(): Lang {
  const preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const primary = String(tag ?? "").toLowerCase().split(/[-_]/)[0];
    if (primary === "es" || primary === "en") return primary;
  }
  return "en";
}

// What the visitor chose with the switch wins (it is remembered); until then the site follows the browser's language, and that is not
// saved, so it keeps following it if the browser's language changes. The inline script in index.html applies the same rule (so <html lang>
// is right before this code arrives): change one, change the other.
function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    // storage unavailable (private mode…): go by the browser's language
  }
  return browserLang();
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode…): the choice just lasts until the page is closed
    }
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
