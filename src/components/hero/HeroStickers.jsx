import { useParallax } from './HeroParallaxContext'
import { PARALLAX } from './heroConstants'

// Apple + Android floating logos. Carry the cross-platform meaning in the
// hero (other logos — Google Photos, iCloud, OneDrive — live further down
// the page per Hero.md §1). Stickers do not move during phase changes;
// they parallax only. See Hero.md §7.

export default function HeroStickers() {
  return (
    <>
      <AppleSticker />
      <AndroidSticker />
    </>
  )
}

function AppleSticker() {
  const ref = useParallax(PARALLAX.sticker)
  return (
    <div ref={ref} className="hero-sticker" data-platform="apple" aria-hidden="true">
      <AppleGlyph />
    </div>
  )
}

function AndroidSticker() {
  const ref = useParallax(PARALLAX.sticker)
  return (
    <div ref={ref} className="hero-sticker" data-platform="android" aria-hidden="true">
      <AndroidGlyph />
    </div>
  )
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="#0a0a0a" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.04 12.85c-.02-2.04 1.66-3.02 1.74-3.07-.95-1.39-2.43-1.58-2.95-1.6-1.26-.13-2.46.74-3.1.74-.64 0-1.63-.72-2.68-.7-1.38.02-2.65.8-3.36 2.04-1.43 2.48-.37 6.16 1.03 8.18.68.99 1.49 2.1 2.55 2.06 1.02-.04 1.41-.66 2.64-.66 1.23 0 1.58.66 2.66.64 1.1-.02 1.79-1 2.46-2 .78-1.15 1.1-2.27 1.12-2.32-.02-.01-2.15-.83-2.17-3.31zM15.07 6.46c.57-.69.95-1.65.85-2.6-.82.03-1.81.54-2.39 1.23-.52.61-.98 1.58-.86 2.52.91.07 1.83-.46 2.4-1.15z"/>
    </svg>
  )
}

function AndroidGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="#3ddc84" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6 9.48l1.84-3.18a.4.4 0 00-.69-.4l-1.87 3.22a11.96 11.96 0 00-9.76 0L5.25 5.9a.4.4 0 00-.69.4l1.84 3.18A11.34 11.34 0 001 18.4h22a11.34 11.34 0 00-5.4-8.92zM7 15.25a1 1 0 11.001-2.001A1 1 0 017 15.25zm10 0a1 1 0 11.001-2.001A1 1 0 0117 15.25z"/>
    </svg>
  )
}
