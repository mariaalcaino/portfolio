import { useCallback, useLayoutEffect, useState } from "react";

/*
 * Helpers for the skeleton placeholders (styles/skeleton.css): they tell a placeholder when the media it stands for
 * has arrived, so it can fade away.
 */

/** Pictures already loaded (or failed) during this visit: going back to a page finds them ready on the very first render. */
const settled = new Set<string>();

/** True if the picture at `url` already loaded (or failed) earlier in this visit. */
export const isSettled = (url: string) => settled.has(url);

/**
 * The ref callback (`attach`) and load handler for the <img> at `src`, which should call `onReady` once it is on screen. An image
 * that is already complete (cached) is ready before the first paint, so it shows no skeleton. A failure is the caller's to
 * report (`onError`): there is nothing left to wait for. It reads the element's own events, so a lazy image is not fetched
 * earlier than the browser would.
 */
export function useImageReady(src: string, onReady: () => void) {
  const ready = useCallback(() => {
    settled.add(src);
    onReady();
  }, [src, onReady]);
  const attach = useCallback(
    (element: HTMLImageElement | null) => {
      if (element?.complete && element.naturalWidth > 0) ready();
    },
    [ready],
  );
  return { attach, onLoad: ready };
}

/**
 * True once the image at `src` has loaded or failed. Meant for posters and for media that is loaded right away
 * anyway; a lazy <img> should use `useImageReady` instead, because this one starts the request itself.
 * A picture seen earlier in the visit (or one the browser has in memory) answers before the first paint.
 */
export function useImageLoaded(src: string | null): boolean {
  const [loaded, setLoaded] = useState<string | null>(null);
  useLayoutEffect(() => {
    if (!src || settled.has(src)) return;
    const image = new Image();
    const done = () => {
      settled.add(src);
      setLoaded(src);
    };
    image.onload = done;
    image.onerror = done;
    image.src = src;
    if (image.complete) done();
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);
  return src !== null && (settled.has(src) || loaded === src);
}

/** Calls `onReady` as soon as `ready` is true, before the browser paints (so nothing that is already at hand flashes its skeleton). */
export function useReadyWhen(ready: boolean, onReady: () => void) {
  useLayoutEffect(() => {
    if (ready) onReady();
  }, [ready, onReady]);
}
