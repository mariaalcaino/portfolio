/*
 * Makes it awkward to save the artwork (pictures, mockups, videos) the usual ways: a right click ("Save image as…",
 * "Save video as…"), a long press on a phone, dragging it out of the page, a video's own download / picture-in-picture
 * buttons. The CSS half is the "artwork" block at the end of index.css.
 *
 * It only stops casual saving. Anything a browser shows can still be fetched by someone who knows how (dev tools, a
 * screenshot), so it is not a protection beyond that.
 */

/** Props for every <video>: no download entry, no picture-in-picture, no casting. */
export const protectedVideoProps = {
  controlsList: "nodownload noremoteplayback",
  disablePictureInPicture: true,
  disableRemotePlayback: true,
} as const;

const isMedia = (target: EventTarget | null) => target instanceof HTMLImageElement || target instanceof HTMLVideoElement;

/**
 * Call once at start-up. The menu is only cancelled on the media itself (not on links or buttons around it, so "open in a
 * new tab" keeps working on the Home covers), and canvases are left alone: an experiment drawn on one may offer its own
 * save button.
 */
export function protectMedia() {
  const block = (event: Event) => {
    if (isMedia(event.target)) event.preventDefault();
  };
  document.addEventListener("contextmenu", block);
  document.addEventListener("dragstart", block);
}
