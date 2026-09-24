import type { ReactNode } from "react";
import Brand from "./Brand";
import Nav from "./Nav";
import Footer from "./Footer";
import LangSwitch from "./LangSwitch";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "../styles/shell.css";

export default function Shell({
  children,
  wrapperClassName,
  mainClassName,
}: {
  children: ReactNode;
  wrapperClassName?: string;
  mainClassName?: string;
}) {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <div className={`site-shell${wrapperClassName ? ` ${wrapperClassName}` : ""}`}>
      <aside className="sidebar">
        <Brand />
        <div className="sidebar-nav-row">
          <Nav />
          <LangSwitch />
        </div>
        <div className="sidebar-contact">
          <p className="contact-label">{t.contact.label}</p>
          <a href="mailto:hello@mariaalcaino.com">hello@mariaalcaino.com</a>
        </div>
      </aside>

      <div className="shell-content">
        <div className={`shell-main${mainClassName ? ` ${mainClassName}` : ""}`}>{children}</div>

        <Footer variant="spread" className="footer-wide" />
        <Footer variant="stack" className="footer-narrow" />
      </div>
    </div>
  );
}
