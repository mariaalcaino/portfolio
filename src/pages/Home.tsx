import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useImageLoaded, useImageReady, useReadyWhen } from "../components/mediaReady";
import Shell from "../components/Shell";
import { thumbOf } from "../data/media";
import { getPreviewMedia, pick, posterOf, projects, type PreviewMedia } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./home.css";

/** A cover video downloads and plays only once its card is close to the screen. */
function CoverVideo({ src, onReady }: { src: string; onReady: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  // The card shows its skeleton until the poster (what the visitor sees before the video starts) is in.
  useReadyWhen(useImageLoaded(posterOf(src)), onReady);
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

/** Each cover has a light "-thumb.jpg" next to it; if one is missing, the original takes over. */
function CoverImage({ src, index, onReady }: { src: string; index: number; onReady: () => void }) {
  const { attach, onLoad } = useImageReady(thumbOf(src), onReady);
  const fallBack = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.src.endsWith(src)) onReady(); // the original failed too: nothing left to wait for
    else image.src = src;
  };
  return (
    // the first row is what the visitor sees first, so it is not lazy; the very first image is the priority
    <img
      src={thumbOf(src)}
      alt=""
      loading={index < 4 ? "eager" : "lazy"}
      fetchPriority={index === 0 ? "high" : undefined}
      decoding="async"
      ref={attach}
      onLoad={onLoad}
      onError={fallBack}
    />
  );
}

/** The cover of a card: a skeleton until the picture is in, then it fades away (see styles/skeleton.css). */
function CoverThumb({ media, index }: { media: PreviewMedia | null; index: number }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  return (
    <div className="work-card-thumb sk" data-ready={ready || !media}>
      {media &&
        (media.type === "video" ? (
          <CoverVideo src={media.src} onReady={markReady} />
        ) : (
          <CoverImage src={media.src} index={index} onReady={markReady} />
        ))}
    </div>
  );
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
                <CoverThumb media={media} index={index} />
                {meta && <p className="work-card-meta">{meta}</p>}
              </Link>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}
