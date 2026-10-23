import { useCallback, useEffect, useRef, useState } from "react";
import { isVideo, posterOf } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import Lightbox from "./Lightbox";

function Media({ src }: { src: string }) {
  if (!isVideo(src)) return <img src={src} alt="" loading="lazy" />;
  return (
    <video
      src={src}
      poster={posterOf(src)}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
    />
  );
}

export default function Gallery({
  images,
  name,
  layout = "stack",
}: {
  images: string[];
  name: string;
  layout?: "stack" | "strip";
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
              <button
                key={src}
                type="button"
                className="gallery-strip-item"
                aria-label={label(i)}
                onClick={() => setOpenIndex(i)}
              >
                <Media src={src} />
              </button>
            ))}
          </div>

          <div className="gallery-strip-bar">
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
            <button
              key={src}
              type="button"
              className="work-gallery-item"
              aria-label={label(i)}
              onClick={() => setOpenIndex(i)}
            >
              <Media src={src} />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <Lightbox images={images} startIndex={openIndex} name={name} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}
