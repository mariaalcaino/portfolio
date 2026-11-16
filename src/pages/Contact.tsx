import { useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from "react";
import PixelFlower from "../components/PixelFlower";
import Shell from "../components/Shell";
import { useLang } from "../i18n/LanguageContext";
import { useStrings } from "../i18n/strings";
import "./contact.css";

const ENDPOINT = "/api/contact"; // Vercel Function (api/contact.ts): same origin, no third-party form service
const PUBLIC_EMAIL = "hello@mariaalcaino.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT_MS = 15000;

// The flower is for tablet and desktop; on phones it isn't even drawn.
const TABLET_UP = "(min-width: 768px)";
const subscribeToTabletUp = (onChange: () => void) => {
  const query = window.matchMedia(TABLET_UP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isTabletUp = () => window.matchMedia(TABLET_UP).matches;

type FieldName = "name" | "email" | "message";
type Values = Record<FieldName, string>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Values = { name: "", email: "", message: "" };
const ORDER: FieldName[] = ["name", "email", "message"];

// Sends the message. Resolves to null when it went out, otherwise to a short, non-sensitive failure code
// ("timeout", "network", "invalid", "not_configured", "upstream_rejected", "http_502"...) so the notice can
// say what failed without leaking anything. The real cause is in the Vercel function logs.
async function sendMessage(payload: Values, signal: AbortSignal): Promise<string | null> {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal,
    });
    const data: unknown = await response.json().catch(() => null);
    const body = typeof data === "object" && data !== null ? (data as { ok?: unknown; code?: unknown }) : {};
    if (response.ok && body.ok === true) return null;
    // only a short word is shown: whatever else a proxy might answer is not
    return typeof body.code === "string" && /^[a-z0-9_]{1,32}$/.test(body.code) ? body.code : `http_${response.status}`;
  } catch (error) {
    return error instanceof DOMException && error.name === "AbortError" ? "timeout" : "network";
  }
}

export default function Contact() {
  const { lang } = useLang();
  const t = useStrings(lang).contactPage;

  const [values, setValues] = useState<Values>(EMPTY);
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const showFlower = useSyncExternalStore(subscribeToTabletUp, isTabletUp, () => true);
  const formRef = useRef<HTMLFormElement>(null);

  const errorText: Record<FieldName, string> = {
    name: t.errorName,
    email: t.errorEmail,
    message: t.errorMessage,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (invalid[field]) setInvalid((prev) => ({ ...prev, [field]: false }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const clean: Values = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    const problems = {
      name: !clean.name,
      email: !EMAIL_PATTERN.test(clean.email),
      message: !clean.message,
    };
    setInvalid(problems);

    const firstInvalid = ORDER.find((field) => problems[field]);
    if (firstInvalid) {
      (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Bots fill the hidden field; humans never see it. Pretend it worked and send nothing.
    const trap = formRef.current?.elements.namedItem("_honey") as HTMLInputElement | null;
    if (trap?.value) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    const code = await sendMessage(clean, controller.signal);
    window.clearTimeout(timer);

    if (code === null) {
      setFailure("");
      setValues(EMPTY);
      setStatus("sent");
    } else {
      console.warn("[contact] send failed:", code);
      setFailure(code);
      setStatus("error");
    }
  };

  return (
    <Shell mainClassName="contact-content">
      <div className="contact-layout">
        <div className="contact-main">
          <h1 className="contact-title">{t.title}</h1>

          {status === "sent" ? (
            <div className="contact-sent" role="status">
              <p>{t.sentTitle}</p>
              <p className="contact-sent-body">{t.sentBody}</p>
              <button type="button" className="contact-action" onClick={() => setStatus("idle")}>
                {t.sendAnother}
              </button>
            </div>
          ) : (
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
              {ORDER.map((field) => (
                <div key={field} className={`contact-field${field === "message" ? " contact-field-wide" : ""}${invalid[field] ? " has-error" : ""}`}>
                  <label htmlFor={`contact-${field}`}>{t[field]}</label>
                  {field === "message" ? (
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      maxLength={5000}
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={invalid.message || undefined}
                      aria-describedby={invalid.message ? "contact-message-error" : undefined}
                    />
                  ) : (
                    <input
                      id={`contact-${field}`}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      inputMode={field === "email" ? "email" : undefined}
                      autoComplete={field === "email" ? "email" : "name"}
                      maxLength={field === "email" ? 254 : 120}
                      value={values[field]}
                      onChange={handleChange}
                      aria-invalid={invalid[field] || undefined}
                      aria-describedby={invalid[field] ? `contact-${field}-error` : undefined}
                    />
                  )}
                  {invalid[field] && (
                    <p className="contact-error" id={`contact-${field}-error`}>
                      {errorText[field]}
                    </p>
                  )}
                </div>
              ))}

              <div className="contact-trap" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" && (
                <p className="contact-error contact-failed" role="alert">
                  {t.failedBefore}
                  <a href={`mailto:${PUBLIC_EMAIL}`}>{PUBLIC_EMAIL}</a>
                  {t.failedAfter}
                  {failure && <span className="contact-failed-code"> [{failure}]</span>}
                </p>
              )}

              <button type="submit" className="contact-action contact-submit" disabled={status === "sending"}>
                {status === "sending" ? t.sending : t.send}
              </button>
            </form>
          )}
        </div>

        {showFlower && <PixelFlower className="contact-flower" />}
      </div>
    </Shell>
  );
}
