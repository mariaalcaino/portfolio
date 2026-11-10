import { useState } from "react";
import { pick, type Demo } from "../data/projects";
import { useLang } from "../i18n/LanguageContext";
import "./ProjectDemo.css";

/**
 * A live piece the visitor can run inside the page. It starts as a quiet box with a button and only loads the iframe
 * after a click, so nothing is downloaded and the camera is never requested until the visitor asks for it.
 */
export default function ProjectDemo({ demo }: { demo: Demo }) {
  const { lang } = useLang();
  const [running, setRunning] = useState(false);

  return (
    <div className="project-demo">
      {running ? (
        <iframe className="project-demo-frame" src={demo.src} title={pick(demo.title, lang)} allow="camera" />
      ) : (
        <button type="button" className="project-demo-start" onClick={() => setRunning(true)}>
          <span className="project-demo-label">{pick(demo.button, lang)}</span>
          <span className="project-demo-note">{pick(demo.note, lang)}</span>
        </button>
      )}
    </div>
  );
}
