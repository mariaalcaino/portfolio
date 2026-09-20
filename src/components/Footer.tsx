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
  if (variant === "stack") {
    return (
      <footer className={`site-footer footer-stack ${className ?? ""}`}>
        <Links />
        <Studio />
        <Copyright />
        <Flower className="footer-flower" />
      </footer>
    );
  }

  return (
    <footer className={`site-footer footer-spread ${className ?? ""}`}>
      <Copyright />
      <Links />
      <Studio />
      <Flower className="footer-flower" />
    </footer>
  );
}
