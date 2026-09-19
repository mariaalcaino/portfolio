import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <p className="mono muted" style={{ marginBottom: 8 }}>
        404
      </p>
      <h1 style={{ fontSize: 32, margin: "0 0 24px" }}>Page not found.</h1>
      <Link to="/" style={{ borderBottom: "1px solid currentColor" }}>
        ← Back home
      </Link>
    </section>
  );
}
