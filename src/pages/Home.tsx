import { useEffect, useRef, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { thumbOf } from "../data/media";
import { getPreviewMedia, pick, posterOf, projects } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./home.css";

// Each cover has a light "-thumb.jpg" next to it; if one is missing, the original takes over.
const fallBackTo = (src: string) => (event: SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;
  if (!image.src.endsWith(src)) image.src = src;
};

/** A cover video downloads and plays only once its card is close to the screen. */
function CoverVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={posterOf(src)} muted loop playsInline preload="none" />;
}

export default function Home() {
  const { lang } = useLang();
  const t = useStrings(lang);

  return (
    <Shell>
      <div className="hero">
        <p>{t.home.line1}</p>
        <p>
          {t.home.line2Prefix}
          <a href="https://www.tandie.app" target="_blank" rel="noreferrer">
            @Tandie
          </a>
          .
        </p>
      </div>

      <ol className="work-grid">
        {projects.map((project, index) => {
          const media = getPreviewMedia(project);
          const meta = pick(project.listCategory, lang);
          return (
            <li key={project.slug} className="work-card">
              <Link to={`/${project.slug}`}>
                <p className="work-card-name">{project.name}</p>
                <div className="work-card-thumb">
                  {media &&
                    (media.type === "video" ? (
                      <CoverVideo src={media.src} />
                    ) : (
                      // the first row is what the visitor sees first, so it is not lazy; the very first image is the priority
                      <img
                        src={thumbOf(media.src)}
                        alt=""
                        loading={index < 4 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : undefined}
                        decoding="async"
                        onError={fallBackTo(media.src)}
                      />
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
