import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { getPreviewMedia, pick, projects } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";

const OFFSET = 6;
const HIDE_DELAY = 120;

type Ring = { x: number; y: number; w: number; h: number; visible: boolean; animate: boolean };

export default function WorkGrid() {
  const { lang } = useLang();
  const [ring, setRing] = useState<Ring | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<HTMLElement | null>(null);
  const hideTimer = useRef<number>(0);
  const visible = useRef(false);

  const measure = (thumb: HTMLElement) => {
    const wrap = wrapRef.current!.getBoundingClientRect();
    const box = thumb.getBoundingClientRect();
    return {
      x: box.left - wrap.left - OFFSET,
      y: box.top - wrap.top - OFFSET,
      w: box.width + OFFSET * 2,
      h: box.height + OFFSET * 2,
    };
  };

  const show = (link: HTMLElement) => {
    const thumb = link.querySelector<HTMLElement>(".work-card-thumb");
    if (!thumb) return;
    window.clearTimeout(hideTimer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activeThumb.current = thumb;
    setRing({ ...measure(thumb), visible: true, animate: visible.current && !reduced });
    visible.current = true;
  };

  // The ring only disappears if the pointer doesn't land on another card right away, so it can slide between them.
  const hide = () => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      activeThumb.current = null;
      visible.current = false;
      setRing((prev) => prev && { ...prev, visible: false, animate: false });
    }, HIDE_DELAY);
  };

  useEffect(() => {
    const onResize = () => {
      if (activeThumb.current) setRing((prev) => prev && { ...prev, ...measure(activeThumb.current!), animate: false });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  const onEnter = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "touch") show(e.currentTarget);
  };
  const onLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "touch") hide();
  };
  const onFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.matches(":focus-visible")) show(e.currentTarget);
  };

  return (
    <div className="work-grid-wrap" ref={wrapRef} onPointerLeave={hide}>
      <ol className="work-grid">
        {projects.map((project) => {
          const media = getPreviewMedia(project);
          const meta = pick(project.listCategory, lang);
          return (
            <li key={project.slug} className="work-card">
              <Link
                to={`/${project.slug}`}
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                onFocus={onFocus}
                onBlur={hide}
              >
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

      <span
        className={`work-ring${ring?.visible ? " is-visible" : ""}${ring?.animate ? " is-animated" : ""}`}
        aria-hidden="true"
        style={
          ring
            ? { width: ring.w, height: ring.h, transform: `translate(${ring.x}px, ${ring.y}px)` }
            : undefined
        }
      />
    </div>
  );
}
