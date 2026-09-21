import Shell from "../components/Shell";
import "./about.css";

export default function About() {
  return (
    <Shell wrapperClassName="about-bg" mainClassName="about-content">
      <h1 className="about-title">About</h1>

      <div className="about-columns">
        <div className="about-col">
          <p>
            I’m a Design Engineer who defines, designs and builds digital products. I help turn ambiguous
            ideas and complex systems into clear, useful products, working from early definition through
            launch.
          </p>
        </div>
        <div className="about-col">
          <p>
            My experience spans SaaS, B2B marketplaces and engagement platforms. I’m interested in what sits
            beneath an interface: the behavior it encourages, the business rules that shape it and the
            systems that make it work. I draw on behavioral science and systems thinking to bring structure
            to complexity, while staying close to the details that shape the final experience.
          </p>
        </div>
        <div className="about-col">
          <p>
            I believe good design should feel intuitive without becoming generic. I value clarity, restraint
            and character, and I care as much about how a product works as how it looks and feels.
          </p>
          <p>
            Outside digital products, I practice silversmithing and have a weakness for artists’ studios — I’ll
            always walk in. You’ll also find me training, reading or walking through the countryside with my
            dog Linguini.
            <img src="/works/dog.png" alt="" className="about-dog" width={32} height={22} />
          </p>
        </div>
      </div>

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
    </Shell>
  );
}
