import { posterOf } from "./projects";

/*
 * Light copies of the media. Every gallery video has "<name>-sm.mp4" and "<name>-sm.jpg" next to it (960 px wide, a third
 * of the weight), and every cover has "<name>-thumb.jpg". Phones and slow connections get the light ones.
 */

export const smallOf = (src: string) => src.replace(/\.mp4$/i, "-sm.mp4");
export const smallPosterOf = (src: string) => posterOf(src).replace(/\.jpg$/i, "-sm.jpg");
export const thumbOf = (src: string) => src.replace(/\.[a-z0-9]+$/i, "-thumb.jpg");

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** True on phones, with data saver on, or on a 2G/3G connection. Read once per page: it only picks which file to fetch. */
export function prefersLightMedia(): boolean {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    Boolean(connection?.saveData) ||
    /^(slow-2g|2g|3g)$/.test(connection?.effectiveType ?? "")
  );
}
