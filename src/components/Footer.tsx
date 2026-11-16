import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./Footer.css";

const Copyright = ({ t }: { t: ReturnType<typeof useStrings> }) => (
  <div className="footer-copyright">
    <p>2026 © María Alcaíno</p>
    <p className="footer-muted">{t.footer.rights}</p>
  </div>
);

const Links = ({ t }: { t: ReturnType<typeof useStrings> }) => (
  <div className="footer-links">
    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
      {t.footer.linkedin}
    </a>
    <a href="https://github.com" target="_blank" rel="noreferrer">
      {t.footer.github}
    </a>
  </div>
);

const Flower = ({ className }: { className?: string }) => (
  <img src="/works/flower.png" alt="" className={className} width={25} height={38} />
);

export default function Footer({
  variant,
  className,
}: {
  variant: "spread" | "stack";
  className?: string;
}) {
  const { lang } = useLang();
  const t = useStrings(lang);

  if (variant === "stack") {
    return (
      <footer className={`site-footer footer-stack ${className ?? ""}`}>
        <Links t={t} />
        <Copyright t={t} />
        <Flower className="footer-flower" />
      </footer>
    );
  }

  // Tablet and desktop: two vertical columns (the copyright and the links) and the flower.
  return (
    <footer className={`site-footer footer-spread ${className ?? ""}`}>
      <Copyright t={t} />
      <Links t={t} />
      <Flower className="footer-flower" />
    </footer>
  );
}
