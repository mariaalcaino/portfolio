import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { getPreviewMedia, pick, projects } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./home.css";

export default function Home() {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <Shell>
      <div className="hero">
        <p>{t.home.line1}</p>
        <p>{t.home.line2}</p>
      </div>

      <ol className="work-grid">
        {projects.map((project) => {
          const media = getPreviewMedia(project);
          const meta = pick(project.listCategory, lang);
          return (
            <li key={project.slug} className="work-card">
              <Link to={`/${project.slug}`}>
                <p className="work-card-name">{project.name}</p>
                <div className="work-card-thumb">
                  {media &&
                    (media.type === "video" ? (
                      <video src={media.src} autoPlay muted loop playsInline />
                    ) : (
                      <img src={media.src} alt="" loading="lazy" />
                    ))}
                </div>
                {meta && <p className="work-card-meta">{meta}</p>}
              </Link>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}
