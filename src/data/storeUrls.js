// Single source of truth for app store listing URLs, consumed by
// StoreCTAs.jsx and FinalCTA.jsx (badges + QR modal).
//
// A null URL means the listing isn't live yet: badges fall back to
// STORE_FALLBACK_URL on touch devices and the desktop modal shows the
// "coming soon" notice instead of a QR code. When the Google Play
// listing goes live, replace the null below — nothing else to update.

export const STORE_URLS = {
  apple: 'https://apps.apple.com/us/app/ember-photos/id6770519373',
  google: 'https://play.google.com/store/apps/details?id=com.emberstories.ember',
}

export const STORE_FALLBACK_URL = 'https://emberstories.com'
