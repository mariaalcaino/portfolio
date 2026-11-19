// Vercel Web Analytics (counts visitors and page views, no cookies, nothing stored in the visitor's browser).
//
// Vercel serves the script from the site's own address (/_vercel/insights/script.js), and only on deployments made AFTER
// Analytics was switched on for the project in the Vercel dashboard; before that the address answers 404 and nothing happens.
// The script counts the first page view and every client-side route change by itself.
//
// This is what the `@vercel/analytics` package's inject() does, written out so the site needs no extra dependency:
// the queue stub lets calls made before the script loads (window.va) wait for it.
declare global {
  interface Window {
    va?: (...params: unknown[]) => void
    vaq?: unknown[][]
  }
}

const SCRIPT = '/_vercel/insights/script.js'

export function initAnalytics() {
  // Production only: in `npm run dev` the address does not exist.
  if (!import.meta.env.PROD || typeof document === 'undefined') return
  window.va =
    window.va ||
    function va(...params: unknown[]) {
      ;(window.vaq = window.vaq || []).push(params)
    }
  if (document.head.querySelector(`script[src="${SCRIPT}"]`)) return
  const script = document.createElement('script')
  script.defer = true
  script.src = SCRIPT
  document.head.appendChild(script)
}
