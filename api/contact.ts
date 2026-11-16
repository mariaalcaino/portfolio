/// <reference types="node" />
// Vercel Function: POST /api/contact -> Resend -> the owner's inbox.
// Secrets live only in Vercel environment variables, never in the browser bundle:
//   RESEND_API_KEY  required  (Resend dashboard > API Keys, "Sending access")
//   CONTACT_TO      required  (the inbox that receives the messages; with the free
//                              onboarding@resend.dev sender it MUST be the e-mail of the Resend account)
//   CONTACT_FROM    optional  (default "Portfolio <onboarding@resend.dev>"; after verifying a domain
//                              in Resend, e.g. "Portfolio <hello@mariaalcaino.com>")
//
// Replies are JSON { ok: true } or { ok: false, code } where code is a short, non-sensitive word.
// The real cause (Resend's answer, a missing variable...) only goes to the Vercel function logs.

const RESEND_URL = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPSTREAM_TIMEOUT_MS = 10000;

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

const reply = (status: number, body: { ok: boolean; code?: string }): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

// (a cut that lands in the middle of an emoji would leave half of it: drop that half)
const field = (source: unknown, key: string, max: number): string => {
  const value = typeof source === "object" && source !== null ? (source as Record<string, unknown>)[key] : undefined;
  return typeof value === "string" ? value.trim().slice(0, max).replace(/[\uD800-\uDBFF]$/, "") : "";
};

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") return reply(405, { ok: false, code: "method" });

    // Only our own page sends here, with JSON. Both checks stop a form or script on ANOTHER website from making a visitor's browser post
    // to this address (a JSON content type forces a CORS preflight that we never allow). They do not stop a script run from a computer:
    // for that, add a rate-limit rule for /api/contact in the Vercel Firewall (see README, "Contact form").
    if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) return reply(415, { ok: false, code: "content_type" });
    const site = request.headers.get("sec-fetch-site");
    if (site && site !== "same-origin") return reply(403, { ok: false, code: "origin" });

    let input: unknown;
    try {
      input = await request.json();
    } catch {
      return reply(400, { ok: false, code: "bad_request" });
    }

    const name = field(input, "name", 120);
    const email = field(input, "email", 254);
    const message = field(input, "message", 5000);
    if (!name || !EMAIL_PATTERN.test(email) || !message) return reply(400, { ok: false, code: "invalid" });

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    if (!apiKey || !to) {
      console.error("[contact] RESEND_API_KEY or CONTACT_TO is not set in this Vercel environment");
      return reply(503, { ok: false, code: "not_configured" });
    }

    const subject = `Portfolio — message from ${name}`.replace(/[\r\n]+/g, " ");
    let upstream: Response;
    try {
      upstream = await fetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject,
          text: `${name} <${email}>\n\n${message}`,
          html:
            `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>` +
            `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch (error) {
      console.error("[contact] Resend unreachable", error);
      return reply(502, { ok: false, code: "upstream_unreachable" });
    }

    if (!upstream.ok) {
      console.error("[contact] Resend refused the message", upstream.status, await upstream.text().catch(() => ""));
      return reply(502, { ok: false, code: `upstream_${upstream.status}` }); // e.g. upstream_403 (the visitor-facing code is enough to diagnose: Hobby logs last 1 hour)
    }
    return reply(200, { ok: true });
  },
};
