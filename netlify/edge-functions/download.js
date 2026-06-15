// Server-side download router for the invitation-email CTA (and any other
// link to /download). A single email CTA can't know the recipient's device,
// so this edge function sniffs the User-Agent at click time and issues a real
// 302 to the correct destination:
//
//   Android  -> Google Play listing
//   iOS       -> App Store listing
//   anything else (desktop, iPadOS-as-desktop, bots) -> marketing homepage,
//                which shows both store badges + a desktop QR modal.
//
// Store URLs are imported from src/data/storeUrls.js — the same single source
// the on-page badges (StoreCTAs.jsx) use — so the email path and the website
// can never drift apart. Bound to /download via the exported `config.path`;
// Netlify auto-discovers files in netlify/edge-functions, so no netlify.toml
// entry is required. Edge functions run before the SPA _redirects fallback,
// so /download is intercepted here rather than served index.html.
//
// See planning/backlog/Invitation_Email_Spotify_Model.md § "App Store URL
// externalization" and spec/Store_Listings.md.

import { STORE_URLS, STORE_FALLBACK_URL } from '../../src/data/storeUrls.js'

export default (request) => {
  const ua = request.headers.get('user-agent') || ''

  // Android is checked first: Android UAs also contain "Linux", and we want the
  // explicit Android signal to win. iPadOS Safari reports a desktop ("Macintosh")
  // UA and intentionally falls through to the homepage — iPad isn't a claimed
  // listing target, and the homepage hands off cleanly there.
  if (/android/i.test(ua)) {
    return Response.redirect(STORE_URLS.google ?? STORE_FALLBACK_URL, 302)
  }
  if (/iphone|ipod|ipad/i.test(ua)) {
    return Response.redirect(STORE_URLS.apple ?? STORE_FALLBACK_URL, 302)
  }
  return Response.redirect(STORE_FALLBACK_URL, 302)
}

export const config = { path: '/download' }
