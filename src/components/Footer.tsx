import "./Footer.css";

const Copyright = () => (
  <div className="footer-copyright">
    <p>2026 © María Alcaíno</p>
    <p className="footer-muted">All rights reserved.</p>
  </div>
);

const Links = () => (
  <div className="footer-links">
    <a href="mailto:hello@mariaalcaino.com">[ Contact ]</a>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
      [ Linkedin ]
    </a>
    <a href="https://github.com" target="_blank" rel="noreferrer">
      [ Github ]
    </a>
  </div>
);

const Studio = () => (
  <div className="footer-studio">
    <p>
      The Studio. <a href="mailto:hello@mariaalcaino.com">[ Book a visit ]</a>
    </p>
    <p className="footer-muted">Santiago, Chile.</p>
  </div>
);

export default function Footer({ variant }: { variant: "spread" | "stack" }) {
  if (variant === "stack") {
    return (
      <footer className="site-footer footer-stack">
        <Links />
        <Studio />
        <Copyright />
        <img src="/works/asterisk.png" alt="" className="footer-asterisk" width={14} height={14} />
      </footer>
    );
  }

  return (
    <footer className="site-footer footer-spread">
      <Copyright />
      <Links />
      <Studio />
      <img src="/works/asterisk.png" alt="" className="footer-asterisk footer-asterisk-corner" width={14} height={14} />
    </footer>
  );
}
