import type { ReactNode } from "react";
import Brand from "./Brand";
import Nav from "./Nav";
import Footer from "./Footer";
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
  return (
    <div className={`site-shell${wrapperClassName ? ` ${wrapperClassName}` : ""}`}>
      <aside className="sidebar">
        <Brand />
        <Nav />
        <div className="sidebar-contact">
          <p className="contact-label">Contact</p>
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
