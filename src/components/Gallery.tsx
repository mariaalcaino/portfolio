import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { isVideo, posterOf } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import Lightbox from "./Lightbox";
import "./Gallery.css";

function Media({
  src,
  videoRef,
  onPlay,
  onPause,
}: {
  src: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  onPlay: () => void;
  onPause: () => void;
}) {
  if (!isVideo(src)) return <img src={src} alt="" loading="lazy" />;
  // No autoPlay: GalleryItem starts the video once it is on screen (and pauses it again when it leaves).
  return (
    <video
      ref={videoRef}
      src={src}
      poster={posterOf(src)}
      muted
      loop
      playsInline
      preload="auto"
      onPlay={onPlay}
      onPause={onPause}
    />
  );
}

/** One gallery cell: the button that opens the lightbox and, for videos, a small pause/play toggle at the bottom right. */
function GalleryItem({
  src,
  className,
  label,
  pauseLabel,
  playLabel,
  onOpen,
}: {
  src: string;
  className: string;
  label: string;
  pauseLabel: string;
  playLabel: string;
  onOpen: () => void;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Follows the real state of the video (its play/pause events), so the icon is right whether the visitor paused it,
  // the observer paused it, or the browser refused to start it.
  const [paused, setPaused] = useState(true);
  const pausedByUser = useRef(false);

  // A video plays only while at least half of its cell is on screen (this also accounts for the strip's own
  // horizontal scroll). Leaving the screen pauses it; coming back resumes it unless it was paused with the button.
  useEffect(() => {
    const cell = cellRef.current;
    const video = videoRef.current;
    if (!cell || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else if (!pausedByUser.current) {
          video.play().catch(() => {}); // refused (e.g. iOS low-power mode) or interrupted: it simply stays paused
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(cell);
    return () => observer.disconnect();
  }, [src]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <div ref={cellRef} className={className}>
      <button type="button" className="gallery-open" aria-label={label} onClick={onOpen}>
        <Media src={src} videoRef={videoRef} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} />
      </button>
      {isVideo(src) && (
        <button
          type="button"
          className="gallery-pause"
          aria-label={paused ? playLabel : pauseLabel}
          onClick={toggle}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#fff" aria-hidden="true">
            {paused ? (
              <path d="M12 9.5 23 16 12 22.5Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            ) : (
              <>
                <rect x="10" y="9" width="4" height="14" rx="1" />
                <rect x="18" y="9" width="4" height="14" rx="1" />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  );
}

export default function Gallery({
  images,
  name,
  layout = "stack",
  children,
}: {
  images: string[];
  name: string;
  layout?: "stack" | "strip";
  /** Shown after the last item (e.g. a live demo), spaced like one more gallery item. */
  children?: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const t = useStrings(lang).gallery;

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const items = Array.from(track.children) as HTMLElement[];
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    let nearest = 0;
    let nearestDistance = Infinity;
    items.forEach((item, i) => {
      const distance = Math.abs(item.offsetLeft - pad - track.scrollLeft);
      if (distance < nearestDistance) {
        nearest = i;
        nearestDistance = distance;
      }
    });
    setActive(atEnd ? items.length - 1 : nearest);
    setEdges({ start: track.scrollLeft <= 2, end: atEnd });
  }, []);

  useEffect(() => {
    if (layout !== "strip") return;
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [layout, sync]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const target = items[Math.min(items.length - 1, Math.max(0, active + direction))];
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft - pad, behavior: reduced ? "auto" : "smooth" });
  };

  const label = (i: number) => t.open.replace("{i}", String(i + 1)).replace("{n}", String(images.length));

  return (
    <>
      {layout === "strip" ? (
        <div className="gallery-strip" role="region" aria-label={t.dialog}>
          <div className="gallery-strip-track" ref={trackRef} onScroll={sync}>
            {images.map((src, i) => (
              <GalleryItem
                key={src}
                src={src}
                className="gallery-strip-item"
                label={label(i)}
                pauseLabel={t.pauseVideo}
                playLabel={t.playVideo}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </div>

          <div className="gallery-strip-bar" hidden={images.length < 2}>
            <p className="gallery-strip-count" aria-live="polite">
              {active + 1} / {images.length}
            </p>
            <div className="gallery-strip-arrows">
              <button type="button" aria-label={t.prev} disabled={edges.start} onClick={() => step(-1)}>
                [&nbsp;←&nbsp;]
              </button>
              <button type="button" aria-label={t.next} disabled={edges.end} onClick={() => step(1)}>
                [&nbsp;→&nbsp;]
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="work-gallery">
          {images.map((src, i) => (
            <GalleryItem
              key={src}
              src={src}
              className="work-gallery-item"
              label={label(i)}
              pauseLabel={t.pauseVideo}
              playLabel={t.playVideo}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
          {children}
        </div>
      )}
      {layout === "strip" && children}

      {openIndex !== null && (
        <Lightbox images={images} startIndex={openIndex} name={name} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}
