import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import Lightbox from "./Lightbox";

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();
  const t = useStrings(lang).gallery;

  return (
    <>
      <div className="work-gallery">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="work-gallery-item"
            aria-label={t.open.replace("{i}", String(i + 1)).replace("{n}", String(images.length))}
            onClick={() => setOpenIndex(i)}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox images={images} startIndex={openIndex} name={name} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}
