import Shell from "../components/Shell";
import "./about.css";

const education = [
  {
    title: "Diploma in Web Development",
    place: "Pontificia Universidad Católica de Chile",
    year: "2023",
  },
  {
    title: "MSc in Design & Innovation",
    place: "Universidad Adolfo Ibáñez",
    year: "2020–2021",
  },
  {
    title: "Design Engineering",
    place: "Universidad Adolfo Ibáñez",
    year: "2016–2020",
  },
];

const recognition = [
  { title: "Finalist — ARCHIMIA", place: "Chile", year: "2021" },
  { title: "Product Design Winner — Reshape", place: "Barcelona", year: "2018" },
];

export default function About() {
  return (
    <Shell wrapperClassName="about-bg" mainClassName="about-content">
      <h1 className="about-title">About</h1>

      <p>
        I’m a Design Engineer who defines, designs and builds digital products. I help turn ambiguous ideas
        and complex systems into clear, useful products, working from early definition through launch. My
        experience spans SaaS, B2B marketplaces and engagement platforms. I’m interested in what sits
        beneath an interface: the behavior it encourages, the business rules that shape it and the systems
        that make it work. I draw on behavioral science and systems thinking to bring structure to
        complexity, while staying close to the details that shape the final experience. I believe good
        design should feel intuitive without becoming generic. I value clarity, restraint and character, and
        I care as much about how a product works as how it looks and feels. Outside digital products, I
        practice silversmithing and have a weakness for artists’ studios — I’ll always walk in. You’ll also
        find me training, reading or walking through the countryside with my dog Linguini.
        <img src="/works/dog.png" alt="" className="about-dog" width={46} height={31} />
      </p>

      <div className="about-groups">
        <section className="about-group">
          <h2 className="about-group-title">Education</h2>
          <ul className="about-entries">
            {education.map((entry) => (
              <li key={entry.title} className="about-entry">
                <p className="about-entry-title">{entry.title}</p>
                <p className="about-entry-sub">{entry.place}</p>
                <p className="about-entry-year">{entry.year}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-group">
          <h2 className="about-group-title">Selected Recognition</h2>
          <ul className="about-entries">
            {recognition.map((entry) => (
              <li key={entry.title} className="about-entry">
                <p className="about-entry-title">{entry.title}</p>
                <p className="about-entry-sub">
                  {entry.place} · {entry.year}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="about-studio-line">
        Visit the Studio (by appointment): Arquitecto Teodoro Bendjerodt 1978, Vitacura.{" "}
        <a href="mailto:hello@mariaalcaino.com">[ Book a visit ]</a>
      </p>
    </Shell>
  );
}
