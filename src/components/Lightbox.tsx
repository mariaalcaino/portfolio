import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { isVideo, posterOf } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./Lightbox.css";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const TAP_THRESHOLD = 6;
const DOUBLE_TAP_MS = 300;

type View = { scale: number; x: number; y: number };
type Point = { x: number; y: number };
type Gesture = {
  mode: "none" | "pan" | "swipe" | "pinch";
  startX: number;
  startY: number;
  startView: View;
  startDist: number;
  startMid: Point;
  moved: boolean;
  startTime: number;
  pointerType: string;
};

const RESET: View = { scale: 1, x: 0, y: 0 };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function Lightbox({
  images,
  startIndex,
  name,
  onClose,
}: {
  images: string[];
  startIndex: number;
  name: string;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const t = useStrings(lang).gallery;
  const last = images.length - 1;

  const [index, setIndex] = useState(startIndex);
  const [view, setView] = useState<View>(RESET);
  const [dragX, setDragX] = useState(0);
  const [interacting, setInteracting] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLElement | null>(null);
  const setCurrentMedia = useCallback((el: HTMLElement | null) => {
    imgRef.current = el;
  }, []);
  const viewRef = useRef<View>(RESET);
  const pointers = useRef(new Map<number, Point>());
  const lastTap = useRef({ time: 0, x: 0, y: 0 });
  const gesture = useRef<Gesture>({
    mode: "none",
    startX: 0,
    startY: 0,
    startView: RESET,
    startDist: 1,
    startMid: { x: 0, y: 0 },
    moved: false,
    startTime: 0,
    pointerType: "mouse",
  });

  const commit = useCallback((next: View) => {
    viewRef.current = next;
    setView(next);
  }, []);

  const clampView = useCallback((v: View): View => {
    const stage = stageRef.current;
    const img = imgRef.current;
    const scale = clamp(v.scale, MIN_SCALE, MAX_SCALE);
    if (!stage || !img || scale <= MIN_SCALE) return { scale, x: 0, y: 0 };
    const maxX = Math.max(0, (img.offsetWidth * scale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (img.offsetHeight * scale - stage.clientHeight) / 2);
    return { scale, x: clamp(v.x, -maxX, maxX), y: clamp(v.y, -maxY, maxY) };
  }, []);

  // px/py are relative to the stage centre, which is also the image's transform origin.
  const zoomAt = useCallback(
    (nextScale: number, px: number, py: number) => {
      const base = viewRef.current;
      const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
      if (scale <= MIN_SCALE) return commit(RESET);
      const ratio = scale / base.scale;
      commit(clampView({ scale, x: px - (px - base.x) * ratio, y: py - (py - base.y) * ratio }));
    },
    [clampView, commit],
  );

  const toggleZoom = useCallback(
    (px: number, py: number) => {
      if (viewRef.current.scale > 1.05) return commit(RESET);
      const img = imgRef.current;
      const naturalWidth = img instanceof HTMLVideoElement ? img.videoWidth : (img as HTMLImageElement | null)?.naturalWidth;
      const natural = img && img.offsetWidth && naturalWidth ? naturalWidth / img.offsetWidth : 2;
      zoomAt(clamp(natural, 2, 3.5), px, py);
    },
    [commit, zoomAt],
  );

  const goTo = useCallback(
    (next: number) => {
      setDragX(0);
      if (next < 0 || next > last || next === index) return;
      commit(RESET);
      setIndex(next);
    },
    [commit, index, last],
  );

  const stageCenter = (clientX: number, clientY: number): Point => {
    const rect = stageRef.current!.getBoundingClientRect();
    return { x: clientX - (rect.left + rect.width / 2), y: clientY - (rect.top + rect.height / 2) };
  };

  const beginPinch = () => {
    const [a, b] = [...pointers.current.values()];
    const g = gesture.current;
    g.mode = "pinch";
    g.startView = viewRef.current;
    g.startDist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    g.startMid = stageCenter((a.x + b.x) / 2, (a.y + b.y) / 2);
    g.moved = true;
    setDragX(0);
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // synthetic / already-released pointers can't be captured; gestures still work without capture
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setInteracting(true);

    if (pointers.current.size === 2) return beginPinch();
    if (pointers.current.size > 2) return;

    const g = gesture.current;
    g.mode = viewRef.current.scale > 1 ? "pan" : "swipe";
    g.startX = e.clientX;
    g.startY = e.clientY;
    g.startView = viewRef.current;
    g.moved = false;
    g.startTime = Date.now();
    g.pointerType = e.pointerType;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;

    if (g.mode === "pinch" && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = stageCenter((a.x + b.x) / 2, (a.y + b.y) / 2);
      const scale = clamp(g.startView.scale * (dist / g.startDist), MIN_SCALE, MAX_SCALE);
      const ratio = scale / g.startView.scale;
      commit(
        clampView({
          scale,
          x: mid.x - (g.startMid.x - g.startView.x) * ratio,
          y: mid.y - (g.startMid.y - g.startView.y) * ratio,
        }),
      );
      return;
    }

    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (!g.moved && Math.hypot(dx, dy) > TAP_THRESHOLD) g.moved = true;
    if (!g.moved) return;

    if (g.mode === "pan") {
      commit(clampView({ ...g.startView, x: g.startView.x + dx, y: g.startView.y + dy }));
    } else if (g.mode === "swipe" && Math.abs(dx) >= Math.abs(dy)) {
      const pastEdge = (index === 0 && dx > 0) || (index === last && dx < 0);
      setDragX(pastEdge ? dx / 3 : dx);
    }
  };

  const handleTap = (e: ReactPointerEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    const rect = img?.getBoundingClientRect();
    const onImage =
      rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!onImage) return onClose();

    const { x, y } = stageCenter(e.clientX, e.clientY);
    if (gesture.current.pointerType === "mouse") return toggleZoom(x, y);

    const now = Date.now();
    const prev = lastTap.current;
    if (now - prev.time < DOUBLE_TAP_MS && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 30) {
      lastTap.current = { time: 0, x: 0, y: 0 };
      toggleZoom(x, y);
    } else {
      lastTap.current = { time: now, x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const g = gesture.current;

    if (pointers.current.size > 0) {
      // one finger lifted mid-pinch: carry on as a pan with the remaining finger
      const [rest] = [...pointers.current.values()];
      g.mode = viewRef.current.scale > 1 ? "pan" : "none";
      g.startX = rest.x;
      g.startY = rest.y;
      g.startView = viewRef.current;
      g.moved = true;
      return;
    }

    setInteracting(false);
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    const cancelled = e.type === "pointercancel";

    if (g.mode === "pinch") {
      if (viewRef.current.scale < 1.05) commit(RESET);
    } else if (g.mode === "swipe" && g.moved) {
      const width = stageRef.current?.clientWidth ?? 1;
      const velocity = Math.abs(dx) / Math.max(1, Date.now() - g.startTime);
      if (!cancelled && Math.abs(dy) > 100 && Math.abs(dy) > Math.abs(dx) * 1.5) {
        onClose();
      } else if (!cancelled && Math.abs(dx) >= Math.abs(dy) && (Math.abs(dx) > width * 0.2 || (velocity > 0.5 && Math.abs(dx) > 30))) {
        goTo(index + (dx < 0 ? 1 : -1));
      } else {
        setDragX(0);
      }
    } else if (!g.moved && !cancelled && g.mode !== "none") {
      handleTap(e);
    }
    g.mode = "none";
  };

  const stepZoom = (factor: number) => zoomAt(viewRef.current.scale * factor, 0, 0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = viewRef.current;
      if (e.ctrlKey || e.metaKey) {
        const rect = stage.getBoundingClientRect();
        const px = e.clientX - (rect.left + rect.width / 2);
        const py = e.clientY - (rect.top + rect.height / 2);
        zoomAt(v.scale * Math.exp(-clamp(e.deltaY, -50, 50) * 0.01), px, py);
      } else if (v.scale > 1) {
        commit(clampView({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [clampView, commit, zoomAt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowLeft") return goTo(index - 1);
      if (e.key === "ArrowRight") return goTo(index + 1);
      if (e.key === "+" || e.key === "=") return stepZoom(1.5);
      if (e.key === "-" || e.key === "_") return stepZoom(1 / 1.5);
      if (e.key === "0") return commit(RESET);
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && active === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
      if (Number(video.dataset.index) === index) video.play().catch(() => {});
      else video.pause();
    });
  }, [index]);

  const zoomed = view.scale > 1.01;
  const fill = (template: string, values: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (_, key) => String(values[key]));

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={t.dialog} tabIndex={-1} ref={dialogRef}>
      <div className="lb-bar">
        <p className="lb-count" aria-live="polite">
          {images.length > 1 ? `${index + 1} / ${images.length}` : ""}
        </p>
        <div className="lb-actions">
          <button type="button" className="lb-text-btn" onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>

      <button
        type="button"
        className="lb-nav lb-prev"
        aria-label={t.prev}
        disabled={index === 0}
        hidden={images.length < 2}
        onClick={() => goTo(index - 1)}
      >
        ←
      </button>

      <div
        className="lb-stage"
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className={`lb-track${interacting ? " is-interacting" : ""}`}
          style={{ transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)` }}
        >
          {images.map((src, i) => (
            <div className="lb-slide" key={src} aria-hidden={i !== index}>
              {Math.abs(i - index) <= 1 &&
                (isVideo(src) ? (
                  <video
                    src={src}
                    poster={posterOf(src)}
                    aria-label={fill(t.imageLabel, { name, i: i + 1, n: images.length })}
                    data-index={i}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    ref={i === index ? setCurrentMedia : undefined}
                    className={i === index ? (zoomed ? "is-current is-zoomed" : "is-current") : undefined}
                    style={
                      i === index
                        ? { transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }
                        : undefined
                    }
                  />
                ) : (
                  <img
                    src={src}
                    alt={fill(t.imageLabel, { name, i: i + 1, n: images.length })}
                    draggable={false}
                    ref={i === index ? setCurrentMedia : undefined}
                    className={i === index ? (zoomed ? "is-current is-zoomed" : "is-current") : undefined}
                    style={
                      i === index
                        ? { transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }
                        : undefined
                    }
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="lb-nav lb-next"
        aria-label={t.next}
        disabled={index === last}
        hidden={images.length < 2}
        onClick={() => goTo(index + 1)}
      >
        →
      </button>
    </div>,
    document.body,
  );
}
