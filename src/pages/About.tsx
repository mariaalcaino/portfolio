import Brand from "../components/Brand";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./about.css";

export default function About() {
  return (
    <div className="page about-bg">
      <header className="page-header">
        <Brand />
        <Nav />
      </header>

      <main className="page-content about-content">
        <h1 className="visually-hidden">About</h1>

        <p>
          I believe design is most powerful in the small moments — the interactions people barely notice but
          always feel.
        </p>
        <p>
          My work is driven by a simple obsession: making everyday life easier to navigate and more human
          while doing it.
        </p>
        <p>
          Outside of screens, I work with my hands. I do silversmithing and have a weakness for any artist's
          studio — I'll always walk in.
        </p>
        <p>
          I think a lot about craft and about the kind of beauty that comes from things made slowly and with
          intention.
        </p>
        <p className="about-dog-line">
          When I'm not in my studio, you can find me training, reading or walking through the countryside
          with my dog Linguini.
          <img src="/works/dog.png" alt="" className="about-dog" width={35} height={24} />
        </p>

        <div className="about-cta">
          <p>Open to selected projects</p>
          <p className="about-cta-sub">Product design, design systems, creative strategy and research.</p>
        </div>

        <div className="about-studio">
          <p>
            The Studio <a href="mailto:hello@mariaalcaino.com">[ Book a visit ]</a>
          </p>
          <p className="about-cta-sub">Arquitecto Teodoro Bendjerodt 1978, Vitacura.</p>
        </div>
      </main>

      <Footer variant="stack" />
    </div>
  );
}
