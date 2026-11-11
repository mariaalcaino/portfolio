import { TAGS, type Tag } from "../data/tags";
import { useLang } from "../i18n/LanguageContext";
import "./Tags.css";

/**
 * The coloured pills that say what kind of work a project was (brand, web, product…). They sit in the value column of the
 * last row of a project's facts, so the row's label ("Areas") is the list's name.
 */
export default function Tags({ tags }: { tags: Tag[] }) {
  const { lang } = useLang();

  return (
    // role="list": Safari drops the list semantics of a <ul> that has no bullets
    <ul className="work-tags" role="list">
      {tags.map((tag) => (
        <li key={tag} className={`work-tag work-tag-${tag}`}>
          {TAGS[tag][lang]}
        </li>
      ))}
    </ul>
  );
}
