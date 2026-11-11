import { posterOf } from "./projects";

/*
 * Light copies of the media. Every gallery video has "<name>-sm.mp4" and "<name>-sm.jpg" next to it (960 px wide, a third
 * of the weight), and every cover has "<name>-thumb.jpg". Phones and slow connections get the light ones.
 */

export const smallOf = (src: string) => src.replace(/\.mp4$/i, "-sm.mp4");
export const smallPosterOf = (src: string) => posterOf(src).replace(/\.jpg$/i, "-sm.jpg");
export const thumbOf = (src: string) => src.replace(/\.[a-z0-9]+$/i, "-thumb.jpg");

/*
 * Width / height of the media that sits in a "stack" gallery (full width, its own height). The skeleton holds exactly that
 * much room until the file arrives, so nothing below it jumps. Anything missing here gets a 3:2 box. Strip galleries
 * don't need it (their cells are always 4:3).
 */
const RATIOS: Record<string, number> = {
  "/works/zoon-1.png": 1600 / 1187,
  "/works/zoon-2.png": 1600 / 1187,
  "/works/lifeindots-1.png": 1600 / 910,
  "/works/lifeindots-2.png": 1600 / 910,
  "/works/sunset-4.png": 1800 / 1334,
  "/works/fingerpaint-1.mp4": 1800 / 1130,
};
export const ratioOf = (src: string) => RATIOS[src] ?? 3 / 2;

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
