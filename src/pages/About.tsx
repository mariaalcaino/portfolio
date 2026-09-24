import Shell from "../components/Shell";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./about.css";

const education = {
  en: [
    { title: "Diploma in Web Development", place: "Pontificia Universidad Católica de Chile", year: "2023" },
    { title: "MSc in Design & Innovation", place: "Universidad Adolfo Ibáñez", year: "2020–2021" },
    { title: "Design Engineering", place: "Universidad Adolfo Ibáñez", year: "2016–2020" },
  ],
  es: [
    { title: "Diplomado en Desarrollo Web", place: "Pontificia Universidad Católica de Chile", year: "2023" },
    { title: "Magíster en Diseño e Innovación", place: "Universidad Adolfo Ibáñez", year: "2020–2021" },
    { title: "Ingeniería en Diseño", place: "Universidad Adolfo Ibáñez", year: "2016–2020" },
  ],
};

const recognition = {
  en: [
    { title: "Finalist — ARCHIMIA", place: "Chile", year: "2021" },
    { title: "Product Design Winner — Reshape", place: "Barcelona", year: "2018" },
  ],
  es: [
    { title: "Finalista — ARCHIMIA", place: "Chile", year: "2021" },
    { title: "Ganadora Diseño de Producto — Reshape", place: "Barcelona", year: "2018" },
  ],
};

export default function About() {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <Shell mainClassName="about-content">
      <h1 className="about-title">{t.about.title}</h1>

      <p>
        {t.about.body}
        <img src="/works/dog.png" alt="" className="about-dog" width={46} height={31} />
      </p>

      <div className="about-groups">
        <section className="about-group">
          <h2 className="about-group-title">{t.about.educationTitle}</h2>
          <ul className="about-entries">
            {education[lang].map((entry) => (
              <li key={entry.title} className="about-entry">
                <p className="about-entry-title">{entry.title}</p>
                <p className="about-entry-sub">{entry.place}</p>
                <p className="about-entry-year">{entry.year}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-group">
          <h2 className="about-group-title">{t.about.recognitionTitle}</h2>
          <ul className="about-entries">
            {recognition[lang].map((entry) => (
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
        {t.about.studioLine} <a href="mailto:hello@mariaalcaino.com">{t.about.bookVisit}</a>
      </p>
    </Shell>
  );
}
