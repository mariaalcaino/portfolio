import "./about.css";

export default function About() {
  return (
    <section className="wrap about-page">
      <h1 className="visually-hidden">About</h1>

      <p className="about-lede">
        I believe design is most powerful in the small moments — the interactions people barely notice but
        always feel.
      </p>

      <div className="about-body">
        <p>
          My work is driven by a simple obsession: making everyday life easier to navigate, and more human
          while doing it.
        </p>
        <p>
          Outside of screens, I work with my hands. I do silversmithing, and have a weakness for any
          artist's studio — I'll always walk in.
        </p>
        <p>
          I think a lot about craft, and about the kind of beauty that comes from things made slowly and
          with intention.
        </p>
        <p>
          When I'm not in my studio, you can find me training, reading, or walking through the countryside
          with my dog Linguini.
        </p>
      </div>

      <div className="about-cta">
        <p className="about-cta-title">Open to selected projects.</p>
        <p className="muted">Product design, design systems, creative strategy and research.</p>
        <a className="about-cta-link" href="mailto:hello@mariaalcaino.com">
          hello@mariaalcaino.com →
        </a>
      </div>

      <div className="about-studio">
        <p>The Studio — Arquitecto Teodoro Bendjerodt 1978, Vitacura, Santiago.</p>
        <a href="mailto:hello@mariaalcaino.com">Book a visit →</a>
      </div>
    </section>
  );
}
